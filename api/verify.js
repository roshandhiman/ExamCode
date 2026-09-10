// Vercel Serverless Function: Cryptographic Session Verification & IP Security Gate
// Rejects forged tokens, expired sessions, and blocked/banned IP addresses.

import { extractToken, verifySignedToken } from './_auth.js';

// Blocklist Configuration
const BLOCKED_IPS = [
  '104.28.213.161'
];

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1';
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. IP Ban Enforcement Check
  const clientIp = getClientIp(req);
  if (BLOCKED_IPS.includes(clientIp)) {
    // Clear any active session cookie immediately
    res.setHeader('Set-Cookie', 'examcode_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
    return res.status(403).json({
      authenticated: false,
      blocked: true,
      ip: clientIp,
      targetName: 'Akul Gupta',
      phone: '9646085409',
      error: 'You dont have access to use this. Contact 9646085409 on WhatsApp to access this.'
    });
  }

  const token = extractToken(req);
  const isValid = token ? verifySignedToken(token) : false;

  if (isValid) {
    return res.status(200).json({
      authenticated: true,
      clientIp,
      timestamp: Date.now()
    });
  }

  // If invalid or forged, explicitly clear cookie and reject
  res.setHeader('Set-Cookie', 'examcode_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return res.status(401).json({
    authenticated: false,
    clientIp,
    error: 'Invalid or expired session. Access denied.'
  });
}
