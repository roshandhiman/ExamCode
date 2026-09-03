import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Problem from './pages/Problem';
import Admin from './pages/Admin';
import ScorecardModal from './components/ScorecardModal';
import LockScreen from './components/LockScreen';

function App() {
  const [showScorecard, setShowScorecard] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('site_auth') === 'true';
  });

  const handleLockSite = () => {
    sessionStorage.removeItem('site_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        {!isAuthenticated && (
          <LockScreen onUnlock={() => setIsAuthenticated(true)} />
        )}

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
