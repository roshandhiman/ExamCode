const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

let runtimesCache = null;

export const getRuntimes = async () => {
    if (runtimesCache) return runtimesCache;
    try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);
        const runtimes = await response.json();
        runtimesCache = runtimes;
        return runtimes;
    } catch (error) {
        console.error("Failed to fetch runtimes:", error);
        return [];
    }
};

export const executeCode = async (language, code, stdin = "") => {
    // 1. Try Local Execution Plugin first (Unlimited, Free, Instant, No API keys/limits)
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
        console.log("Local execution server not available, falling back...", e);
    }

    // 2. Fallback to external API
    const runtimes = await getRuntimes();
    const runtime = runtimes.find(r => r.language === language || r.aliases.includes(language));

    let fileName = 'main';
    if (language === 'java') {
        const match = code.match(/class\s+([A-Za-z0-9_]+)/);
        fileName = match ? `${match[1]}.java` : 'Main.java';
    }

    const response = await fetch(`${PISTON_API_URL}/execute`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language: runtime ? runtime.language : language,
            version: runtime ? runtime.version : '*',
            files: [
                {
                    name: fileName,
                    content: code
                }
            ],
            stdin: stdin
        })
    });

    return await response.json();
};
