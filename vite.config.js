import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { exec, spawn } from 'child_process'

function localExecutorPlugin() {
  return {
    name: 'local-executor',
    configureServer(server) {
      server.middlewares.use('/api/execute', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { language, code, stdin } = JSON.parse(body);

            const tmpDir = path.join(process.cwd(), 'node_modules', '.tmp_exec', Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7));
            fs.mkdirSync(tmpDir, { recursive: true });

            if (language === 'java') {
              const match = code.match(/class\s+([A-Za-z0-9_]+)/);
              const className = match ? match[1] : 'Main';
              const filePath = path.join(tmpDir, `${className}.java`);
              fs.writeFileSync(filePath, code);

              exec(`javac "${filePath}"`, { cwd: tmpDir }, (compileErr, stdout, stderr) => {
                if (compileErr) {
                  fs.rmSync(tmpDir, { recursive: true, force: true });
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({
                    compile: { code: 1, stderr: (stderr || compileErr.message).trim() }
                  }));
                }

                const child = spawn('java', ['-cp', tmpDir, className], { cwd: tmpDir });
                let runStdout = '';
                let runStderr = '';
                let timedOut = false;

                const timer = setTimeout(() => {
                  timedOut = true;
                  try { child.kill('SIGKILL'); } catch (err) {}
                }, 5000);

                if (stdin) {
                  child.stdin.write(stdin);
                  child.stdin.end();
                }

                child.stdout.on('data', d => { runStdout += d.toString(); });
                child.stderr.on('data', d => { runStderr += d.toString(); });

                child.on('close', exitCode => {
                  clearTimeout(timer);
                  fs.rmSync(tmpDir, { recursive: true, force: true });
                  res.setHeader('Content-Type', 'application/json');
                  if (timedOut) {
                    return res.end(JSON.stringify({
                      compile: { code: 0 },
                      run: { code: 124, stdout: runStdout, stderr: 'Time Limit Exceeded (5s)' }
                    }));
                  }
                  return res.end(JSON.stringify({
                    compile: { code: 0 },
                    run: { code: exitCode, stdout: runStdout, stderr: runStderr }
                  }));
                });
              });
            } else if (language === 'python') {
              const filePath = path.join(tmpDir, 'script.py');
              fs.writeFileSync(filePath, code);

              const child = spawn('python3', [filePath], { cwd: tmpDir });
              let runStdout = '';
              let runStderr = '';

              if (stdin) {
                child.stdin.write(stdin);
                child.stdin.end();
              }

              child.stdout.on('data', d => { runStdout += d.toString(); });
              child.stderr.on('data', d => { runStderr += d.toString(); });

              child.on('close', exitCode => {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  compile: { code: 0 },
                  run: { code: exitCode, stdout: runStdout, stderr: runStderr }
                }));
              });
            } else {
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ message: `Language ${language} not supported locally` }));
            }
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ message: e.message }));
          }
        });
      });

      server.middlewares.use('/api/auth', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method not allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { password } = JSON.parse(body || '{}');
            const crypto = await import('crypto');
            const { createSignedToken } = await import('./api/_auth.js');

            const serverPass = process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD;
            let isValid = false;
            if (serverPass && password) {
              const passBuf = Buffer.from(String(password).trim());
              const srvBuf = Buffer.from(String(serverPass).trim());
              isValid = (passBuf.length === srvBuf.length) && crypto.timingSafeEqual(passBuf, srvBuf);
            }

            res.setHeader('Content-Type', 'application/json');
            if (isValid) {
              const token = createSignedToken();
              res.setHeader('Set-Cookie', `examcode_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 3600}`);
              return res.end(JSON.stringify({ success: true, token }));
            } else {
              res.statusCode = 401;
              return res.end(JSON.stringify({ success: false, error: 'Invalid password. Access denied.' }));
            }
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: e.message }));
          }
        });
      });

      server.middlewares.use('/api/verify', async (req, res) => {
        const { extractToken, verifySignedToken } = await import('./api/_auth.js');
        const token = extractToken(req);
        const isValid = token ? verifySignedToken(token) : false;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

        if (isValid) {
          return res.end(JSON.stringify({ authenticated: true, timestamp: Date.now() }));
        }

        res.statusCode = 401;
        res.setHeader('Set-Cookie', 'examcode_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
        return res.end(JSON.stringify({ authenticated: false, error: 'Invalid or expired session' }));
      });

      server.middlewares.use('/api/logout', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Set-Cookie', 'examcode_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
        return res.end(JSON.stringify({ success: true }));
      });

      server.middlewares.use('/api/session-status', async (req, res) => {
        const { extractToken, verifySignedToken } = await import('./api/_auth.js');
        const token = extractToken(req);
        const valid = token ? verifySignedToken(token) : false;

        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ epoch: 'v5', valid, serverTime: Date.now() }));
      });

      server.middlewares.use('/api/track', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, local: true }));
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };
  return {
    plugins: [react(), localExecutorPlugin()],
  };
});
