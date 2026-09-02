import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, Award, Settings, CheckCircle2, ChevronDown } from 'lucide-react';
import { getPracticePapers, getUserProgress } from '../data/questions';

export default function Header({ onOpenScorecard }) {
  const navigate = useNavigate();
  const location = useLocation();
  const papers = getPracticePapers();
  const currentPaper = papers[0];
  const [progress, setProgress] = useState(getUserProgress());

  // Listen to storage events or route changes to update live score
  useEffect(() => {
    const updateProgress = () => {
      setProgress(getUserProgress());
    };
    window.addEventListener('storage', updateProgress);
    // also update when location changes
    updateProgress();
    return () => window.removeEventListener('storage', updateProgress);
  }, [location]);

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

        {/* Paper indicator pill */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          background: 'rgba(255, 255, 255, 0.05)', 
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          padding: '0.3rem 0.8rem',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>{currentPaper.day}</span>
          <span style={{ color: 'var(--border-color)' }}>•</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{currentPaper.title}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
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
            backgroundColor: fullSolvedCount === 15 ? 'var(--success)' : 'rgba(255,255,255,0.1)',
            color: fullSolvedCount === 15 ? '#000' : 'var(--text-muted)',
            padding: '0.1rem 0.4rem',
            borderRadius: '999px',
            fontWeight: '600'
          }}>
            {fullSolvedCount}/15 Solved
          </span>
        </div>

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
      </div>
    </header>
  );
}
