import crypto from 'crypto';

const SERVER_SECRET_SALT = process.env.AUTH_SALT || 'ex4m_s3cur3_k3y_s4lt_v6_force_logout_epoch';

export function getServerSecret() {
  const pass = process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD || '';
  return crypto.createHash('sha256').update(`${pass}:${SERVER_SECRET_SALT}`).digest('hex');
}

export function createSignedToken() {
  const secret = getServerSecret();
  const payloadObj = {
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    v: 'v6'
  };
  const payloadStr = Buffer.from(JSON.stringify(payloadObj)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

export function verifySignedToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;
  const secret = getServerSecret();
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp || payload.v !== 'v6') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function extractToken(req) {
  // 1. Check Cookie header
  const cookieHeader = (req.headers && req.headers.cookie) || '';
  const match = cookieHeader.match(/(?:^|;\s*)examcode_session=([^;]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  // 2. Check Authorization header
  const authHeader = (req.headers && req.headers.authorization) || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  // 3. Check query param or body
  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
}
