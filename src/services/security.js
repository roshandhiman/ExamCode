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

    if (res.status === 403 && data.blocked) {
      return {
        success: false,
        blocked: true,
        ip: data.ip,
        targetName: data.targetName,
        phone: data.phone,
        error: data.error
      };
    }

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
// Returns an object with { authenticated, blocked, blockInfo }
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

    const data = await res.json().catch(() => ({}));

    // Check if IP is permanently banned
    if (res.status === 403 && data.blocked) {
      clearStoredToken();
      return {
        authenticated: false,
        blocked: true,
        ip: data.ip,
        targetName: data.targetName,
        phone: data.phone,
        error: data.error
      };
    }

    if (res.ok && data.authenticated) {
      return { authenticated: true, blocked: false };
    }

    // Server rejected session: clear current token
    clearStoredToken();
    return { authenticated: false, blocked: false };
  } catch {
    // If network temporarily errors, don't unlock
    return { authenticated: false, blocked: false };
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
  const res = await verifySessionWithServer(token);
  return res.authenticated;
}

export function purgeClientSession() {
  clearStoredToken();
  purgeLegacySessions();
}

// Active anti-tampering guard: prevents unauthorized DevTools inspection on locked screens
export function initAntiTamperGuard() {
  if (typeof window === 'undefined') return;

  const checkDevTools = () => {
    const threshold = 160;
    const isDevToolsOpen =
      (window.outerWidth - window.innerWidth > threshold) ||
      (window.outerHeight - window.innerHeight > threshold);

    const hasToken = getStoredToken();
    if (isDevToolsOpen && !hasToken) {
      if (document.body) {
        document.body.style.filter = 'blur(16px)';
        document.body.style.pointerEvents = 'none';
      }
    } else {
      if (document.body && document.body.style.filter === 'blur(16px)') {
        document.body.style.filter = 'none';
        document.body.style.pointerEvents = 'auto';
      }
    }
  };

  window.addEventListener('resize', checkDevTools);
  setInterval(checkDevTools, 1500);
}
