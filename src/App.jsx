import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Problem from './pages/Problem';
import Admin from './pages/Admin';
import ScorecardModal from './components/ScorecardModal';
import LockScreen from './components/LockScreen';
import { validateSessionToken } from './services/security';

function App() {
  const [showScorecard, setShowScorecard] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem('examcode_secure_token');
      if (token) {
        const isValid = await validateSessionToken(token);
        setIsAuthenticated(isValid);
        if (!isValid) {
          sessionStorage.removeItem('examcode_secure_token');
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsCheckingAuth(false);
    };
    checkToken();
  }, []);

  const handleLockSite = () => {
    sessionStorage.removeItem('examcode_secure_token');
    setIsAuthenticated(false);
  };

  const handleUnlock = () => {
    setIsAuthenticated(true);
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
          </Routes>
        </main>
        
        {showScorecard && (
          <ScorecardModal onClose={() => setShowScorecard(false)} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
