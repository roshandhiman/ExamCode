// High-Speed, High-Reliability Code Execution Engine
// Primary: Paiza.io (Instant ~1.5-2.5s execution, no rate limits, supports high concurrency)
// Fallback: Judge0 CE with Polling (Reliable execution ~2-5s)

import { getStoredToken } from './security';

const PAIZA_CREATE_URL = 'https://api.paiza.io/runners/create';
const PAIZA_DETAILS_URL = 'https://api.paiza.io/runners/get_details';
const JUDGE0_SUBMIT_URL = 'https://ce.judge0.com/submissions';

export const executeCode = async (language, code, stdin = "") => {
    // Security check: if session is invalid or missing, terminate execution
    if (typeof window !== 'undefined') {
        const token = getStoredToken();
        if (!token) {
            return { message: "Session expired. Please log in again." };
        }
    }

    if (language === 'java') {
        // Attempt 1: Paiza.io
        try {
            const paizaResult = await executeViaPaiza(code, stdin);
            if (paizaResult && !paizaResult.shouldFallback) {
                return paizaResult;
            }
        } catch (e) {
            console.warn("Paiza attempt 1 error:", e);
        }

        // Attempt 2: Immediate retry on Paiza after brief backoff (solves burst concurrency)
        try {
            await new Promise(r => setTimeout(r, 400));
            const paizaRetry = await executeViaPaiza(code, stdin);
            if (paizaRetry && !paizaRetry.shouldFallback) {
                return paizaRetry;
            }
        } catch (e) {
            console.warn("Paiza attempt 2 error:", e);
        }

        // Attempt 3: Judge0 CE with Polling
        try {
            const judge0Result = await executeViaJudge0(code, stdin);
            if (judge0Result && !judge0Result.shouldFallback) {
                return judge0Result;
            }
        } catch (e) {
            console.warn("Judge0 execution error:", e);
        }

        return { message: 'Execution server is busy. Please click Run again in a few seconds.' };
    }

    return { message: `Language "${language}" is not supported for remote execution.` };
};

// Batch parallel execution helper
export const executeCodeParallel = async (language, code, stdinList) => {
    return await Promise.all(
        stdinList.map(stdin => executeCode(language, code, stdin))
    );
};

// Paiza.io Execution Engine (Super high availability & speed)
async function executeViaPaiza(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
        // Paiza needs public class stripped or named Main
        const fixedCode = code.replace(/\bpublic\s+class\b/g, 'class');

        const createRes = await fetch(PAIZA_CREATE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source_code: fixedCode,
                language: 'java',
                input: stdin || '',
                api_key: 'guest'
            }),
            signal: controller.signal
        });

        if (!createRes.ok) {
            clearTimeout(timeout);
            return { shouldFallback: true };
        }

        const createData = await createRes.json();
        const runId = createData.id;

        if (!runId) {
            clearTimeout(timeout);
            return { shouldFallback: true };
        }

        // Poll for completion (up to 30 attempts, starts after 400ms)
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 500));

            const pollRes = await fetch(`${PAIZA_DETAILS_URL}?id=${runId}&api_key=guest`, {
                signal: controller.signal
            });

            if (!pollRes.ok) continue;

            const data = await pollRes.json();

            if (data.status === 'completed') {
                clearTimeout(timeout);

                const buildError = (data.build_stderr || data.build_stdout || '').trim();
                if (buildError || data.build_result === 'failure') {
                    return {
                        compile: {
                            code: 1,
                            stderr: buildError || 'Compilation Error'
                        }
                    };
                }

                const runError = (data.stderr || '').trim();
                const runOutput = data.stdout || '';
                const exitCode = data.exit_code !== undefined && data.exit_code !== null ? data.exit_code : 0;

                return {
                    compile: { code: 0 },
                    run: {
                        code: exitCode,
                        stdout: runOutput,
                        stderr: runError
                    }
                };
            }
        }

        clearTimeout(timeout);
        return { shouldFallback: true };
    } catch (err) {
        clearTimeout(timeout);
        return { shouldFallback: true };
    }
}

// Judge0 CE Java Execution (Poll-based with up to 25s wait)
async function executeViaJudge0(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    try {
        // Step 1: Submit code to queue (non-blocking)
        const submitRes = await fetch(`${JUDGE0_SUBMIT_URL}?base64_encoded=false&wait=false`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language_id: 91, // Java (JDK 17.0.6)
                source_code: code,
                stdin: stdin || ''
            }),
            signal: controller.signal
        });

        if (!submitRes.ok) {
            clearTimeout(timeout);
            return { shouldFallback: true };
        }

        const submitData = await submitRes.json();
        const token = submitData.token;

        if (!token) {
            clearTimeout(timeout);
            return { shouldFallback: true };
        }

        // Step 2: Poll token until status is final
        for (let attempt = 0; attempt < 20; attempt++) {
            await new Promise(r => setTimeout(r, 1000));

            const checkRes = await fetch(`${JUDGE0_SUBMIT_URL}/${token}?base64_encoded=false`, {
                signal: controller.signal
            });

            if (!checkRes.ok) continue;

            const data = await checkRes.json();
            const statusId = data.status ? data.status.id : 0;

            // Status 1 = In Queue, Status 2 = Processing
            if (statusId === 1 || statusId === 2) {
                continue;
            }

            clearTimeout(timeout);

            // Status 6 = Compilation Error
            if (statusId === 6 || data.compile_output) {
                return {
                    compile: {
                        code: 1,
                        stderr: data.compile_output || 'Compilation Error'
                    }
                };
            }

            // Status 5 = Time Limit Exceeded
            if (statusId === 5) {
                return {
                    run: {
                        code: 1,
                        stdout: '',
                        stderr: 'Time Limit Exceeded. Please check for infinite loops.'
                    }
                };
            }

            // Status 3 = Accepted (Success)
            if (statusId === 3) {
                return {
                    compile: { code: 0 },
                    run: {
                        code: 0,
                        stdout: data.stdout || '',
                        stderr: data.stderr || ''
                    }
                };
            }

            // Runtime errors (Status 7-12)
            if (statusId >= 7 && statusId <= 12) {
                return {
                    compile: { code: 0 },
                    run: {
                        code: 1,
                        stdout: data.stdout || '',
                        stderr: (data.stderr || data.message || data.status?.description || 'Runtime Error').trim()
                    }
                };
            }

            // Fallback result
            return {
                compile: { code: 0 },
                run: {
                    code: statusId === 3 ? 0 : 1,
                    stdout: data.stdout || '',
                    stderr: data.stderr || ''
                }
            };
        }

        clearTimeout(timeout);
        return { shouldFallback: true };
    } catch (err) {
        clearTimeout(timeout);
        return { shouldFallback: true };
    }
}
