import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Problem from './pages/Problem';
import Admin from './pages/Admin';
import OopNotes from './pages/OopNotes';
import ScorecardModal from './components/ScorecardModal';
import LockScreen from './components/LockScreen';
import { verifySessionWithServer, logoutSession, purgeLegacySessions, initAntiTamperGuard } from './services/security';
import { logSiteVisitOnce, logLoginOnce, getUserName } from './services/tracker';
import NameModal from './components/NameModal';

function App() {
  const [showScorecard, setShowScorecard] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userName, setUserNameState] = useState(getUserName());
  const [ipBlockInfo, setIpBlockInfo] = useState(null);

  useEffect(() => {
    // Initialize anti-tampering inspection guard
    initAntiTamperGuard();

    // Track visitor opening the website (only once per device per day)
    logSiteVisitOnce();

    const checkToken = async () => {
      // Purge only legacy versions, preserve valid active session
      purgeLegacySessions();

      const res = await verifySessionWithServer();
      if (res.blocked) {
        setIpBlockInfo(res);
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }

      setIsAuthenticated(res.authenticated);
      const currentName = getUserName();
      setUserNameState(currentName);
      if (res.authenticated && currentName) {
        logLoginOnce(currentName);
      }
      setIsCheckingAuth(false);
    };

    checkToken();
  }, []);

  // Continuous background session heartbeat: re-verifies session validity with server periodically
  useEffect(() => {
    if (!isAuthenticated) return;

    const enforceActiveSession = async () => {
      const res = await verifySessionWithServer();
      if (res.blocked) {
        setIpBlockInfo(res);
        setIsAuthenticated(false);
      } else if (!res.authenticated) {
        setIsAuthenticated(false);
      }
    };

    const interval = setInterval(enforceActiveSession, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLockSite = async () => {
    await logoutSession();
    setIsAuthenticated(false);
  };

  const handleUnlock = () => {
    setIsAuthenticated(true);
    const currentName = getUserName();
    setUserNameState(currentName);
    if (currentName) {
      logLoginOnce(currentName);
    }
  };

  const handleNameSubmitted = (name) => {
    setUserNameState(name);
    logLoginOnce(name);
  };

  if (isCheckingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)'
      }}>
        <div style={{ fontSize: '0.9rem' }}>Verifying secure session...</div>
      </div>
    );
  }

  // 1. IP Ban Enforcement Screen
  if (ipBlockInfo) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'radial-gradient(circle at center, #1e0d0d 0%, #08080a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: "'Outfit', -apple-system, sans-serif"
      }}>
        <div style={{
          maxWidth: '520px',
          width: '100%',
          background: '#141012',
          border: '2px solid rgba(239, 71, 67, 0.6)',
          borderRadius: '24px',
          padding: '2.2rem 1.8rem',
          boxShadow: '0 25px 60px rgba(239, 71, 67, 0.25)',
          textAlign: 'center',
          color: '#fff'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 71, 67, 0.15)',
            border: '2px solid rgba(239, 71, 67, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.2rem',
            fontSize: '32px'
          }}>
            🚫
          </div>

          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '800',
            color: '#ff4d4f',
            marginBottom: '0.6rem',
            letterSpacing: '-0.5px'
          }}>
            ACCESS DENIED
          </h2>

          <div style={{
            fontSize: '1.15rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '1rem',
            lineHeight: 1.4
          }}>
            You don't have access to use this!
          </div>

          {/* User Details Badge */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '1rem',
            marginBottom: '1.4rem',
            textAlign: 'left',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Name:</span>
              <span style={{ fontWeight: '700', color: '#ffb3ba' }}>Akul Gupta</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Blocked IP:</span>
              <code style={{ background: 'rgba(239,71,67,0.2)', padding: '2px 6px', borderRadius: '4px', color: '#ff7875', fontSize: '0.85rem' }}>
                {ipBlockInfo.ip || '104.28.213.161'}
              </code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status:</span>
              <span style={{ fontWeight: '700', color: '#ff4d4f' }}>Permanently Restricted</span>
            </div>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: '#ddd',
            lineHeight: 1.5,
            marginBottom: '1.6rem'
          }}>
            To regain access or unblock this IP address, contact on WhatsApp:
          </p>

          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/919646085409?text=Hi%20Roshan%2C%20my%20name%20is%20Akul%20Gupta%20(IP%3A%20104.28.213.161).%20Please%20grant%20me%20access%20to%20examCODE."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              width: '100%',
              backgroundColor: '#25D366',
              color: '#000',
              fontWeight: '700',
              fontSize: '1.05rem',
              padding: '0.9rem 1.4rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>💬</span> Contact 9646085409 on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // If not authenticated, do not even render the app or routes in DOM!
  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} onBlockDetected={setIpBlockInfo} />;
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Header 
          userName={userName}
          onOpenScorecard={() => setShowScorecard(true)} 
          onLockSite={handleLockSite}
        />
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home onOpenScorecard={() => setShowScorecard(true)} />} />
            <Route path="/paper/:paperId" element={<Home onOpenScorecard={() => setShowScorecard(true)} />} />
            <Route path="/problem/:id" element={<Problem />} />
            <Route path="/paper/:paperId/question/:id" element={<Problem />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/oop-notes" element={<OopNotes />} />
          </Routes>
        </main>
        
        {showScorecard && (
          <ScorecardModal onClose={() => setShowScorecard(false)} />
        )}

        {/* Modal asking name right after login */}
        <NameModal 
          isOpen={!userName} 
          onSubmitName={handleNameSubmitted} 
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
