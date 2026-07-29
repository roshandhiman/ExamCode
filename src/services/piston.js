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
    const runtimes = await getRuntimes();
    const runtime = runtimes.find(r => r.language === language || r.aliases.includes(language));
    
    if (!runtime) {
        throw new Error(`Runtime for ${language} not found`);
    }

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
            language: runtime.language,
            version: runtime.version,
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
