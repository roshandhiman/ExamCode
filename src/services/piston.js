const WANDBOX_API_URL = 'https://wandbox.org/api/compile.json';

export const executeCode = async (language, code, stdin = "") => {
    // 1. Try Local Execution Plugin first (Unlimited, Free, Instant — works in dev mode)
    try {
        const localResponse = await fetch('/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language, code, stdin })
        });
        if (localResponse.ok) {
            const data = await localResponse.json();
            if (!data.error && !data.message) {
                return data;
            }
        }
    } catch (e) {
        console.log("Local execution server not available, falling back to Wandbox...");
    }

    // 2. Fallback: Wandbox API (free, no API key, supports Java)
    if (language === 'java') {
        return await executeViaWandbox(code, stdin);
    }

    return { message: `Language "${language}" is not supported for remote execution.` };
};

async function executeViaWandbox(code, stdin) {
    try {
        // Wandbox names the file prog.java, so "public class Main" causes an error.
        // Strip "public" from the main class declaration to make it compile.
        const fixedCode = code.replace(/public\s+class\s+Main\s*\{/g, 'class Main {');

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
            })
        });

        if (!response.ok) {
            return { message: `Wandbox API returned HTTP ${response.status}` };
        }

        const data = await response.json();

        // Map Wandbox response to our app's expected format
        const compileError = data.compiler_error || '';
        const compileOutput = data.compiler_output || '';
        const hasCompileError = data.status === '1' || data.status === '2' ||
            (compileError && compileError.includes('error'));

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
        console.error("Wandbox execution failed:", error);
        return { message: 'Code execution service is temporarily unavailable. Please try again.' };
    }
}
