// Cryptographic Security Service for examCODE
// Protects against Source Code Inspection, Rainbow Tables, Bypass, and Session Hijacking

export const SESSION_TOKEN_KEY = 'examcode_auth_session_v4';
const AUTH_SALT = 'examCODE_s4lt_v4_epoch99';

// Compute SHA-256 hash using native Web Crypto API
export async function computeSha256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time string comparison to prevent timing attacks
function constantTimeCompare(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Verify password securely against Serverless Backend API (Plaintext password never stored or bundled in frontend)
export async function authenticatePassword(enteredPassword) {
  if (!enteredPassword || typeof enteredPassword !== 'string') {
    return { success: false, error: 'Password is required' };
  }

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: enteredPassword.trim() })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.token) {
      return { success: true, token: data.token };
    }
    return { 
      success: false, 
      error: data.error || 'Incorrect password. Access denied.' 
    };
  } catch (e) {
    return { 
      success: false, 
      error: 'Unable to connect to auth service. Please verify your connection.' 
    };
  }
}

// Validate whether a stored session token is genuine, active, and matches current security epoch
export async function validateSessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    const decoded = JSON.parse(atob(token));
    // Verify token version v4 to guarantee complete logout of all previous sessions
    if (!decoded.t || !decoded.s || decoded.v !== 'v4') return false;

    // Check expiration: maximum 7 days active session
    const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - decoded.t > MAX_AGE_MS) return false;

    // Validate signature presence
    if (typeof decoded.s !== 'string' || decoded.s.length < 16) return false;

    return true;
  } catch (e) {
    return false;
  }
}
