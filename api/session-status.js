// Vercel Serverless Function: Active Session Status & Invalidation Check
import { extractToken, verifySignedToken } from './_auth.js';

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json');

  const token = extractToken(req);
  const valid = token ? verifySignedToken(token) : false;

  return res.status(200).json({
    epoch: 'v6',
    valid,
    serverTime: Date.now()
  });
}
