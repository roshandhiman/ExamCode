import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Award, CheckCircle, Clock, AlertTriangle, ArrowRight, 
  Sparkles, Layers, Code2, Compass, CheckCircle2, BookOpen
} from 'lucide-react';
import { getPracticePapers, getUserProgress } from '../data/questions';

export default function Home({ onOpenScorecard }) {
  const navigate = useNavigate();
  const papers = getPracticePapers();
  const currentPaper = papers[0];
  const [progress, setProgress] = useState(getUserProgress());
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleStorage = () => setProgress(getUserProgress());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  let totalEarned = 0;
  let fullSolved = 0;
  let partialSolved = 0;

  currentPaper.questions.forEach(q => {
    const p = progress[q.id];
    if (p) {
      totalEarned += (p.marksEarned || 0);
      if (p.status === 'passed') fullSolved++;
      else if (p.status === 'partial') partialSolved++;
    }
  });

  const categories = ['All', 'Strings', 'Arrays', '2D Arrays', 'Collections', 'Set & Map', 'Mixed Hard'];

  const filteredQuestions = selectedCategory === 'All' 
    ? currentPaper.questions 
    : currentPaper.questions.filter(q => q.category === selectedCategory);

  const percentage = Math.round((totalEarned / currentPaper.totalMarks) * 100);

  return (
    <div className="container" style={{ flex: 1, paddingBottom: '4rem', maxWidth: '1100px' }}>
      {/* Hero Exam Header */}
      <div style={{ 
        marginTop: '1rem',
        marginBottom: '2rem',
        background: 'linear-gradient(180deg, rgba(255, 161, 22, 0.08) 0%, rgba(26, 26, 26, 0) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ 
                background: 'rgba(255, 161, 22, 0.2)', 
                color: 'var(--accent-primary)',
                fontWeight: '700',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Flame size={14} /> DAY 1
              </span>
              <span style={{ 
                background: 'rgba(239, 71, 67, 0.15)', 
                color: 'var(--fail)', 
                fontWeight: '700', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.8rem' 
              }}>
                END TERM PREP • L1–L30
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Exam Date: 12th Sept
              </span>
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '0.5rem' }}>
              {currentPaper.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px' }}>
              {currentPaper.subtitle}. Complete method logic inside locked boilerplate templates. Evaluated with visible and hidden edge-case tests.
            </p>
          </div>

          <button 
            onClick={onOpenScorecard}
            className="btn btn-primary"
            style={{ 
              padding: '0.75rem 1.4rem', 
              fontSize: '1rem', 
              boxShadow: '0 4px 15px rgba(255, 161, 22, 0.3)' 
            }}
          >
            <Award size={18} /> Submit Test / View Scorecard
          </button>
        </div>

        {/* Live Metrics Ribbon */}
        <div style={{ 
          marginTop: '1.8rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.2rem'
        }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{totalEarned}</span>
              <span style={{ color: 'var(--text-muted)' }}>/ {currentPaper.totalMarks} Marks</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              {percentage}% Completion
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Questions Solved</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '800', color: fullSolved > 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                {fullSolved}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>/ {currentPaper.questions.length} Complete</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              {partialSolved} Partial
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Marking Scheme</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '0.3rem' }}>
              Q1–Q14: <span style={{ color: 'var(--accent-primary)' }}>5 Marks</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Q15 (Mixed Hard): <span style={{ color: 'var(--fail)', fontWeight: '700' }}>10 Marks</span>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Test Strategy</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: 1.4 }}>
              Strings ➔ Arrays ➔ 2D Matrices ➔ Collections ➔ Mixed Hard
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{ 
                padding: '0.4rem 0.9rem',
                fontSize: '0.85rem',
                backgroundColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#000' : 'var(--text-secondary)',
                borderColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)',
                fontWeight: selectedCategory === cat ? '700' : '500',
                borderRadius: '20px'
              }}
            >
              {cat}
              {cat === 'Mixed Hard' && ' 🔥'}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredQuestions.length}</strong> of <strong>{currentPaper.questions.length}</strong> Questions
        </div>
      </div>

      {/* Questions Grid / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {filteredQuestions.map((q) => {
          const userState = progress[q.id];
          const isPassed = userState && userState.status === 'passed';
          const isPartial = userState && userState.status === 'partial';
          const marks = userState ? userState.marksEarned : 0;

          return (
            <div
              key={q.id}
              className="card question-row"
              onClick={() => navigate(`/problem/${q.id}`)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto auto',
                alignItems: 'center',
                gap: '1.5rem',
                cursor: 'pointer',
                padding: '1.2rem 1.5rem',
                borderLeft: isPassed 
                  ? '4px solid var(--success)' 
                  : (isPartial ? '4px solid var(--accent-primary)' : '4px solid var(--border-color)'),
                transition: 'all 0.2s ease',
              }}
            >
              {/* Question Number Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ 
                  fontWeight: '800', 
                  fontSize: '1.2rem',
                  color: isPassed ? 'var(--success)' : 'var(--text-primary)'
                }}>
                  {q.number}
                </span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  color: q.marks === 10 ? 'var(--fail)' : 'var(--accent-primary)',
                  fontWeight: '700',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  marginTop: '0.2rem'
                }}>
                  {q.marks} Marks
                </span>
              </div>

              {/* Title, Tagline, Concepts */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>
                    {q.title}
                  </h3>
                  <span className={`difficulty ${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
                  </span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(255,255,255,0.06)', 
                    color: 'var(--text-muted)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {q.category}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  {q.tagline}
                </div>

                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>
                  Concept: {q.concept}
                </div>
              </div>

              {/* Status / Score */}
              <div style={{ textAlign: 'right', minWidth: '130px' }}>
                {isPassed ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', justifyContent: 'flex-end', fontWeight: '700' }}>
                    <CheckCircle size={16} />
                    <span>{marks} / {q.marks} Marks</span>
                  </div>
                ) : isPartial ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', justifyContent: 'flex-end', fontWeight: '700' }}>
                    <AlertTriangle size={16} />
                    <span>{marks} / {q.marks} Marks</span>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Not Attempted
                  </div>
                )}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {q.testcases.length} Total Tests ({q.testcases.filter(t => t.isHidden).length} Hidden)
                </div>
              </div>

              {/* Solve Button */}
              <div>
                <button 
                  className={`btn ${isPassed ? '' : 'btn-primary'}`}
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/problem/${q.id}`);
                  }}
                >
                  {isPassed ? 'Review' : 'Solve'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Syllabus Roadmap Tip Card */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: 'rgba(255, 255, 255, 0.02)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div style={{ background: 'rgba(255, 161, 22, 0.1)', padding: '0.6rem', borderRadius: '8px' }}>
          <BookOpen color="var(--accent-primary)" size={24} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.3rem' }}>
            Exam Preparation Roadmap (Lectures 1–30)
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Don't jump directly to Q15! Follow the optimal order: 
            <strong> Q1→Q5 (Strings)</strong> ➔ <strong>Q6→Q8 (Arrays)</strong> ➔ <strong>Q9→Q10 (2D Matrices)</strong> ➔ <strong>Q11→Q12 (Collections)</strong> ➔ <strong>Q13→Q14 (Set & Map)</strong> ➔ <strong>Q15 (Full Mixed Hard)</strong>.
            Mastering these core patterns today will prepare you directly for the harder scenario-based problem statements tomorrow!
          </p>
        </div>
      </div>
    </div>
  );
}
