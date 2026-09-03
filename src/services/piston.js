// High-Speed Code Execution Service
// Supports Local Vite Runner and Wandbox OpenJDK with Parallel Concurrency & Abort Timeout

const WANDBOX_API_URL = 'https://wandbox.org/api/compile.json';

export const executeCode = async (language, code, stdin = "") => {
    // 1. Try Local Execution Plugin first (only in dev mode - skip in production for speed)
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDev) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const localResponse = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language, code, stdin }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (localResponse.ok) {
                const data = await localResponse.json();
                if (!data.error && !data.message) {
                    return data;
                }
            }
        } catch (e) {
            // Fall back to Wandbox
        }
    }

    // 2. High-speed Wandbox execution (free, reliable Java 21/22 runtime)
    if (language === 'java') {
        return await executeViaWandbox(code, stdin);
    }

    return { message: `Language "${language}" is not supported for remote execution.` };
};

// Batch parallel execution for ultra-fast multi-testcase evaluation
export const executeCodeParallel = async (language, code, stdinList) => {
    return await Promise.all(
        stdinList.map(stdin => executeCode(language, code, stdin))
    );
};

async function executeViaWandbox(code, stdin) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
        // In Java, any "public class" must match the file name (prog.java).
        // Strip "public" from all class declarations to guarantee successful compilation.
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
            return { message: `Execution server returned HTTP ${response.status}. Please try again.` };
        }

        const data = await response.json();

        // Check compiler output and errors
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
            return { message: 'Execution timed out (12s limit). Please check for infinite loops.' };
        }
        console.error("Wandbox execution error:", error);
        return { message: 'Code execution service is temporarily busy. Please click Run again.' };
    }
}
