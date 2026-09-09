// Vercel Serverless Function: Secure Password Authentication
// Runs 100% on Node.js backend. Plaintext password is NEVER sent or exposed in client bundles.

import crypto from 'crypto';
import { createSignedToken } from './_auth.js';

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

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

    // Check against server-side secret environment variable APP_PASSWORD (configured in Vercel)
    const serverPassword = process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD;

    if (!serverPassword) {
      return res.status(503).json({
        success: false,
        error: 'Authentication not configured. Please set APP_PASSWORD in Vercel Environment Variables.'
      });
    }

    // Timing-safe comparison to prevent side-channel timing attacks
    const passBuf = Buffer.from(password.trim());
    const serverBuf = Buffer.from(serverPassword.trim());
    const isValid = (passBuf.length === serverBuf.length) && crypto.timingSafeEqual(passBuf, serverBuf);

    if (isValid) {
      const token = createSignedToken();

      // Set tamper-proof HttpOnly cookie. DevTools scripts and browser JS cannot access or alter HttpOnly cookies.
      const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
      const cookieFlags = [
        `examcode_session=${token}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        `Max-Age=${7 * 24 * 60 * 60}`, // 7 days
        ...(isProd ? ['Secure'] : [])
      ].join('; ');

      res.setHeader('Set-Cookie', cookieFlags);
      return res.status(200).json({ success: true, token });
    }

    // Delay slightly to mitigate brute-force guessing
    await new Promise(resolve => setTimeout(resolve, 350));
    return res.status(401).json({ success: false, error: 'Invalid password. Access denied.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
