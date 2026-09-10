import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, Award, Settings, CheckCircle2, ChevronDown, Lock, BookOpen } from 'lucide-react';
import { getPracticePapers, getUserProgress, getActivePaperId, setActivePaperId } from '../data/questions';

export default function Header({ onOpenScorecard, onLockSite, userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const papers = getPracticePapers();
  const [activeId, setActiveId] = useState(getActivePaperId());
  const [progress, setProgress] = useState(getUserProgress());

  const currentPaper = papers.find(p => p.id === activeId) || papers[0];

  useEffect(() => {
    const updateProgress = () => {
      setProgress(getUserProgress());
      setActiveId(getActivePaperId());
    };
    window.addEventListener('storage', updateProgress);
    updateProgress();
    return () => window.removeEventListener('storage', updateProgress);
  }, [location]);

  const handlePaperChange = (e) => {
    const newId = e.target.value;
    setActivePaperId(newId);
    setActiveId(newId);
    navigate('/');
    window.dispatchEvent(new Event('storage'));
  };

  let totalEarned = 0;
  let fullSolvedCount = 0;
  currentPaper.questions.forEach(q => {
    const p = progress[q.id];
    if (p) {
      totalEarned += (p.marksEarned || 0);
      if (p.status === 'passed') fullSolvedCount++;
    }
  });

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/" className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffa116 0%, #ff5722 100%)', 
            borderRadius: '8px', 
            padding: '5px 7px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame color="#000" size={20} />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            exam<span style={{ color: 'var(--accent-primary)' }}>CODE</span>
          </span>
        </Link>

        {/* Paper Switcher Dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <select 
            value={activeId}
            onChange={handlePaperChange}
            style={{
              backgroundColor: 'var(--bg-card)',
              color: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.45rem 2.2rem 0.45rem 0.85rem',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none'
            }}
          >
            {papers.map(p => (
              <option key={p.id} value={p.id}>
                {p.day}: {p.title}
              </option>
            ))}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '10px', pointerEvents: 'none', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
        {/* Student Name Badge */}
        {userName && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: '#fff',
            backgroundColor: 'rgba(255, 161, 22, 0.12)',
            border: '1px solid rgba(255, 161, 22, 0.35)',
            borderRadius: '8px',
            padding: '0.4rem 0.8rem'
          }}>
            <span style={{ color: 'var(--accent-primary)' }}>👤</span> {userName}
          </div>
        )}

        {/* Live Score Pill */}
        <div 
          onClick={onOpenScorecard}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem',
            background: 'rgba(255, 161, 22, 0.1)',
            border: '1px solid rgba(255, 161, 22, 0.3)',
            borderRadius: '8px',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title="Click to view detailed Scorecard"
        >
          <Award size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Score:</span>
          <span style={{ fontWeight: '700', color: 'var(--accent-primary)', fontSize: '0.95rem' }}>
            {totalEarned} / {currentPaper.totalMarks}
          </span>
          <span style={{ 
            fontSize: '0.75rem', 
            backgroundColor: fullSolvedCount === currentPaper.questions.length ? 'var(--success)' : 'rgba(255,255,255,0.1)',
            color: fullSolvedCount === currentPaper.questions.length ? '#000' : 'var(--text-muted)',
            padding: '0.1rem 0.4rem',
            borderRadius: '999px',
            fontWeight: '600'
          }}>
            {fullSolvedCount}/{currentPaper.questions.length} Solved
          </span>
        </div>

        <Link 
          to="/oop-notes"
          className="btn"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            padding: '0.45rem 0.85rem', 
            fontSize: '0.88rem',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            color: '#60a5fa',
            fontWeight: '600'
          }}
          title="Complete Java OOP Notes & Exam Traps"
        >
          <BookOpen size={16} /> OOP Notes
        </Link>

        <button 
          onClick={onOpenScorecard} 
          className="btn btn-primary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.88rem' }}
        >
          <CheckCircle2 size={16} /> View Scorecard
        </button>

        <Link to="/admin" className="btn" title="Assignment / Paper Manager" style={{ padding: '0.45rem' }}>
          <Settings size={17} />
        </Link>

        {onLockSite && (
          <button 
            onClick={onLockSite}
            className="btn"
            title="Lock Website Access"
            style={{ padding: '0.45rem', color: 'var(--accent-primary)', borderColor: 'rgba(255,161,22,0.3)' }}
          >
            <Lock size={17} />
          </button>
        )}
      </div>
    </header>
  );
}

