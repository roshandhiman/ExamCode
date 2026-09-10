// High-Speed Multi-Tier Code Execution Engine
// Primary: Judge0 CE (Ultra-fast parallel execution ~0.05-0.1s per testcase)
// Fallback 1: Piston v2 (emkc.org – highly reliable, free, no auth)
// Fallback 2: Wandbox OpenJDK 22 (Reliable, high-compatibility backup)

const JUDGE0_API_URL = 'https://ce.judge0.com/submissions?wait=true';
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';
const WANDBOX_API_URL = 'https://wandbox.org/api/compile.json';

import { getStoredToken } from './security';

export const executeCode = async (language, code, stdin = "") => {
    // Security check: if session is invalid or missing, terminate execution
    if (typeof window !== 'undefined') {
        const token = getStoredToken();
        if (!token) {
            return { message: "Session expired. Please log in again." };
        }
    }

    if (language === 'java') {
        // 1. Try Judge0 CE first (Fastest: ~0.05-0.1s execution)
        try {
            const judge0Result = await executeViaJudge0(code, stdin);
            if (judge0Result && !judge0Result.shouldFallback) {
                return judge0Result;
            }
        } catch (e) {
            console.warn("Judge0 execution error, falling back:", e);
        }

        // 2. Try Piston v2 (emkc.org) — very reliable free API
        try {
            const pistonResult = await executeViaPiston(code, stdin);
            if (pistonResult && !pistonResult.shouldFallback) {
                return pistonResult;
            }
        } catch (e) {
            console.warn("Piston v2 execution error, falling back to Wandbox:", e);
        }

        // 3. Fallback to Wandbox OpenJDK 22
        try {
            const wandboxResult = await executeViaWandbox(code, stdin);
            if (wandboxResult && !wandboxResult.shouldFallback) {
                return wandboxResult;
            }
        } catch (e) {
            console.warn("Wandbox execution error:", e);
        }

        // All engines failed — retry Judge0 once more
        try {
            const retryResult = await executeViaJudge0(code, stdin);
            if (retryResult && !retryResult.shouldFallback) {
                return retryResult;
            }
        } catch (e) {
            // ignore
        }

        return { message: 'All execution servers are temporarily busy. Please click Run again in a few seconds.' };
    }

    return { message: `Language "${language}" is not supported for remote execution.` };
};

// Batch parallel execution helper
export const executeCodeParallel = async (language, code, stdinList) => {
    return await Promise.all(
        stdinList.map(stdin => executeCode(language, code, stdin))
    );
};

// Judge0 CE Java Execution (Java 17 / OpenJDK 17)
async function executeViaJudge0(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
        const response = await fetch(JUDGE0_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language_id: 91, // Java (JDK 17.0.6)
                source_code: code,
                stdin: stdin || ''
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            return { shouldFallback: true };
        }

        const data = await response.json();
        const statusId = data.status ? data.status.id : 0;

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

        // Default valid output
        if (data.stdout !== null || data.stderr !== null) {
            return {
                compile: { code: 0 },
                run: {
                    code: statusId === 3 ? 0 : 1,
                    stdout: data.stdout || '',
                    stderr: data.stderr || ''
                }
            };
        }

        return { shouldFallback: true };
    } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') {
            return { shouldFallback: true };
        }
        return { shouldFallback: true };
    }
}

// Piston v2 (emkc.org) — Reliable free execution API
async function executeViaPiston(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        // Strip public from class declarations to prevent file name mismatch
        const fixedCode = code.replace(/\bpublic\s+class\b/g, 'class');

        const response = await fetch(PISTON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: 'java',
                version: '15.0.2',
                files: [{ name: 'Main.java', content: fixedCode }],
                stdin: stdin || '',
                compile_timeout: 10000,
                run_timeout: 5000
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            return { shouldFallback: true };
        }

        const data = await response.json();

        // Check compile stage
        if (data.compile && data.compile.code !== 0) {
            return {
                compile: {
                    code: 1,
                    stderr: data.compile.stderr || data.compile.output || 'Compilation Error'
                }
            };
        }

        // Check run stage
        if (data.run) {
            return {
                compile: { code: 0 },
                run: {
                    code: data.run.code || 0,
                    stdout: data.run.stdout || '',
                    stderr: data.run.stderr || ''
                }
            };
        }

        return { shouldFallback: true };
    } catch (err) {
        clearTimeout(timeout);
        return { shouldFallback: true };
    }
}

// Fallback: Wandbox OpenJDK 22
async function executeViaWandbox(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
        // Strip public from class declarations to prevent file name mismatch
        const fixedCode = code.replace(/\bpublic\s+class\b/g, 'class');

        const response = await fetch(WANDBOX_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                compiler: 'openjdk-jdk-22+36',
                code: fixedCode,
                stdin: stdin || '',
                save: false
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            return { shouldFallback: true };
        }

        const data = await response.json();

        const compileError = data.compiler_error || '';
        const compileOutput = data.compiler_output || '';
        const hasCompileError = data.status === '1' || data.status === '2' ||
            (compileError && compileError.toLowerCase().includes('error'));

        if (hasCompileError) {
            return {
                compile: {
                    code: 1,
                    stderr: compileError || compileOutput || 'Compilation Failed'
                }
            };
        }

        const programOutput = data.program_output || '';
        const programError = data.program_error || '';
        const exitCode = parseInt(data.status) || 0;

        return {
            compile: { code: 0 },
            run: {
                code: exitCode,
                stdout: programOutput,
                stderr: programError
            }
        };
    } catch (error) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            return { shouldFallback: true };
        }
        return { shouldFallback: true };
    }
}
