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

  useEffect(() => {
    // Initialize anti-tampering inspection guard
    initAntiTamperGuard();

    // Track visitor opening the website (only once per device per day)
    logSiteVisitOnce();

    const checkToken = async () => {
      // Purge only legacy versions, preserve valid active session
      purgeLegacySessions();

      const isValid = await verifySessionWithServer();
      setIsAuthenticated(isValid);
      const currentName = getUserName();
      setUserNameState(currentName);
      if (isValid && currentName) {
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
      const isValid = await verifySessionWithServer();
      if (!isValid) {
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

  // If not authenticated, do not even render the app or routes in DOM!
  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
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
