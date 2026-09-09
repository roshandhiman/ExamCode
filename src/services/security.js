// Cryptographic Security Service for examCODE
// All session validations are Authoritative & Server-Side Verified via /api/verify.
// Client inspect scripts, storage forging, and fake tokens are completely blocked.

export const SESSION_TOKEN_KEY = 'examcode_auth_session_v6';

// Verify password securely against Serverless Backend API (Plaintext password never stored in frontend)
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
        try {
          sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
        } catch (e) {}
      }
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

// Server-Authoritative Session Verification:
// Communicates with backend /api/verify to validate cryptographic HMAC signature.
// Returns false if token is forged, expired, missing, or altered via DevTools.
export async function verifySessionWithServer(explicitToken) {
  try {
    const token = explicitToken || (typeof window !== 'undefined' ? sessionStorage.getItem(SESSION_TOKEN_KEY) : null);
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

    // Server rejected session: purge client storage
    purgeClientSession();
    return false;
  } catch (e) {
    // If completely offline or network fails, do not unlock!
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
    purgeClientSession();
  }
}

// Purge all tokens and legacy sessions from storage
export function purgeClientSession() {
  try {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem('examcode_auth_session_v5');
    sessionStorage.removeItem('examcode_auth_session_v4');
    sessionStorage.removeItem('examcode_auth_session_v3');
    sessionStorage.removeItem('examcode_auth_session_v2');
    sessionStorage.removeItem('examcode_secure_token');
    localStorage.removeItem('examcode_secure_token');
    localStorage.removeItem('examcode_auth_session_v4');
  } catch (e) {}
}

// Export for compatibility: Delegates directly to server verification
export async function validateSessionToken(token) {
  return await verifySessionWithServer(token);
}
