// Cryptographic Security Service for examCODE
// All session validations are Authoritative & Server-Side Verified via /api/verify.
// Client inspect scripts, storage forging, and fake tokens are completely blocked.

export const SESSION_TOKEN_KEY = 'examcode_auth_session_v6';

// Store token in both sessionStorage and localStorage for browser resilience (e.g. Brave shields)
export function setStoredToken(token) {
  try {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    localStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch {}
}

export function getStoredToken() {
  try {
    return sessionStorage.getItem(SESSION_TOKEN_KEY) || localStorage.getItem(SESSION_TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function clearStoredToken() {
  try {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);
  } catch {}
}

// Purge ONLY legacy session keys (v5, v4, v3, v2) — NEVER active session
export function purgeLegacySessions() {
  try {
    sessionStorage.removeItem('examcode_auth_session_v5');
    sessionStorage.removeItem('examcode_auth_session_v4');
    sessionStorage.removeItem('examcode_auth_session_v3');
    sessionStorage.removeItem('examcode_auth_session_v2');
    sessionStorage.removeItem('examcode_secure_token');
    localStorage.removeItem('examcode_auth_session_v5');
    localStorage.removeItem('examcode_auth_session_v4');
    localStorage.removeItem('examcode_secure_token');
  } catch {}
}

// Verify password securely against Serverless Backend API
export async function authenticatePassword(enteredPassword) {
  if (!enteredPassword || typeof enteredPassword !== 'string') {
    return { success: false, error: 'Password is required' };
  }

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Send & receive HttpOnly cookies
      body: JSON.stringify({ password: enteredPassword.trim() })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      if (data.token) {
        setStoredToken(data.token);
      }
      return { success: true, token: data.token };
    }

    return { 
      success: false, 
      error: data.error || 'Incorrect password. Access denied.' 
    };
  } catch {
    return { 
      success: false, 
      error: 'Unable to connect to auth service. Please verify your connection.' 
    };
  }
}

// Server-Authoritative Session Verification:
// Communicates with backend /api/verify to validate cryptographic HMAC signature.
// Returns false if token is forged, expired, missing, or altered via DevTools.
export async function verifySessionWithServer(explicitToken) {
  try {
    const token = explicitToken || getStoredToken();
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('/api/verify', {
      method: 'GET',
      credentials: 'include',
      headers,
      cache: 'no-store'
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.authenticated) {
        return true;
      }
    }

    // Server rejected session: clear current token
    clearStoredToken();
    return false;
  } catch {
    // If network temporarily errors, don't unlock
    return false;
  }
}

// Secure Logout: cleans server-side HttpOnly cookie and browser storage
export async function logoutSession() {
  try {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    }).catch(() => {});
  } finally {
    clearStoredToken();
    purgeLegacySessions();
  }
}

// Export for compatibility
export async function validateSessionToken(token) {
  return await verifySessionWithServer(token);
}

export function purgeClientSession() {
  clearStoredToken();
  purgeLegacySessions();
}
