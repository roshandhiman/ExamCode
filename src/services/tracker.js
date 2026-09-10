// Client-Side Visitor & Login Telemetry Logger
// Only logs ONCE per user device so your Google Sheet/Doc stays clean and never spams on reloads.

function getOrCreateVisitorId() {
  try {
    let id = localStorage.getItem('examcode_visitor_id');
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4);
      localStorage.setItem('examcode_visitor_id', id);
    }
    return id;
  } catch {
    return 'v_anon';
  }
}

export function getUserName() {
  try {
    return localStorage.getItem('examcode_user_name') || '';
  } catch {
    return '';
  }
}

export function setUserName(name) {
  try {
    if (name && typeof name === 'string') {
      localStorage.setItem('examcode_user_name', name.trim());
    }
  } catch {}
}

// Log initial site visit (Only fires once per user / browser)
export function logSiteVisitOnce() {
  if (typeof window === 'undefined') return;

  try {
    // Check if this visitor was already logged today
    const today = new Date().toISOString().slice(0, 10);
    const lastLogged = localStorage.getItem('examcode_visit_logged_date');

    if (lastLogged === today) {
      return;
    }

    localStorage.setItem('examcode_visit_logged_date', today);

    const visitorId = getOrCreateVisitorId();
    const screen = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
    const referrer = document.referrer || 'Direct';
    const name = getUserName() || 'Guest';

    const payload = JSON.stringify({
      event: 'SITE_VISIT',
      visitorId,
      screen,
      referrer,
      name
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', payload);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch {}
}

// Log successful portal login with name
export function logLoginOnce(explicitName) {
  if (typeof window === 'undefined') return;

  try {
    const name = (explicitName || getUserName() || '').trim();
    const sessionKey = `examcode_login_logged_${name || 'anon'}`;
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }
    sessionStorage.setItem(sessionKey, 'true');

    const visitorId = getOrCreateVisitorId();
    const screen = `${window.screen?.width || 0}x${window.screen?.height || 0}`;

    const payload = JSON.stringify({
      event: 'LOGIN_SUCCESS',
      visitorId,
      screen,
      name: name || 'Anonymous'
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', payload);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch {}
}

// Log name submission
export function logNameSubmitted(name) {
  if (typeof window === 'undefined' || !name) return;

  try {
    setUserName(name);
    const visitorId = getOrCreateVisitorId();
    const screen = `${window.screen?.width || 0}x${window.screen?.height || 0}`;

    const payload = JSON.stringify({
      event: 'NAME_ENTERED',
      visitorId,
      screen,
      name: name.trim()
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', payload);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch {}
}

