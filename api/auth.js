// Vercel Serverless Function: Secure Password Authentication
// Runs 100% on Node.js backend. Plaintext password is NEVER sent or exposed to frontend code.

import crypto from 'crypto';

const SALT = process.env.AUTH_SALT || 'examCODE_s4lt_x99';
const DEFAULT_HASH = 'd520d7b92b0ab61184b8b0ac6ffb0f01591a4a3fb25c93fa4078b7f682c46103';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    const { password } = body || {};

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Password is required' });
    }

    // Check against server-side secret environment variable APP_PASSWORD or VITE_APP_PASSWORD
    const serverPassword = process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD;
    let isValid = false;

    if (serverPassword) {
      // Direct comparison with server environment secret
      isValid = (password === serverPassword);
    } else {
      // Fallback: Verify against Salted SHA-256 hash
      const computedHash = crypto.createHash('sha256').update(password + SALT).digest('hex');
      isValid = crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(DEFAULT_HASH));
    }

    if (isValid) {
      const timestamp = Date.now();
      const tokenSignature = crypto.createHmac('sha256', SALT).update(`auth_${timestamp}`).digest('hex');
      const token = Buffer.from(JSON.stringify({ t: timestamp, s: tokenSignature })).toString('base64');

      return res.status(200).json({ success: true, token });
    }

    // Delay slightly to prevent timing & brute-force attacks
    await new Promise(resolve => setTimeout(resolve, 350));
    return res.status(401).json({ success: false, error: 'Invalid password. Access denied.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
