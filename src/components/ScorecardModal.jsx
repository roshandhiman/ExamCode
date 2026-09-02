import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Award, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { getPracticePapers, getUserProgress, resetAllProgress } from '../data/questions';

export default function ScorecardModal({ onClose }) {
  const navigate = useNavigate();
  const papers = getPracticePapers();
  const paper = papers[0]; // Active test paper
  const progress = getUserProgress();

  let totalEarned = 0;
  let fullSolvedCount = 0;
  let partialSolvedCount = 0;
  let unattemptedCount = 0;

  paper.questions.forEach(q => {
    const p = progress[q.id];
    if (p) {
      totalEarned += (p.marksEarned || 0);
      if (p.status === 'passed') {
        fullSolvedCount++;
      } else if (p.status === 'partial') {
        partialSolvedCount++;
      } else {
        unattemptedCount++;
      }
    } else {
      unattemptedCount++;
    }
  });

  const percentage = Math.round((totalEarned / paper.totalMarks) * 100);

  let grade = 'C';
  let gradeBadge = 'Needs Revision';
  let gradeColor = 'var(--fail)';

  if (percentage >= 85) {
    grade = 'A+';
    gradeBadge = 'Outstanding • End Term Ready! 🔥';
    gradeColor = 'var(--success)';
  } else if (percentage >= 70) {
    grade = 'A';
    gradeBadge = 'Very Good • Strong Foundation ✨';
    gradeColor = '#22c55e';
  } else if (percentage >= 50) {
    grade = 'B';
    gradeBadge = 'Good Progress • Focus on Edge Cases 💡';
    gradeColor = 'var(--accent-primary)';
  } else if (percentage >= 35) {
    grade = 'C';
    gradeBadge = 'Passing • Keep Practicing 📚';
    gradeColor = '#f59e0b';
  }

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all test progress for this paper? All submitted code will be cleared.")) {
      resetAllProgress();
      window.location.reload();
    }
  };

  const goToQuestion = (qId) => {
    onClose();
    navigate(`/problem/${qId}`);
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card scorecard-modal" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '850px', width: '92%', maxHeight: '90vh', overflowY: 'auto', textAlign: 'left', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <Award size={24} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{paper.title} — Official Scorecard</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {paper.subtitle} • Exam Preparation
            </p>
          </div>
          <button className="btn" onClick={onClose} style={{ padding: '0.3rem 0.6rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Hero Score Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255, 161, 22, 0.12) 0%, rgba(38, 38, 38, 0.9) 100%)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
              Total Score Obtained
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.3rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: 1 }}>
                {totalEarned}
              </span>
              <span style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                / {paper.totalMarks} Marks
              </span>
              <span style={{ 
                marginLeft: '1rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                padding: '0.3rem 0.8rem', 
                borderRadius: '999px',
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff'
              }}>
                {percentage}%
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Performance Grade</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: gradeColor }}>
              Grade {grade}
            </div>
            <div style={{ fontSize: '0.85rem', color: gradeColor, fontWeight: '600' }}>
              {gradeBadge}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Questions</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', marginTop: '0.2rem' }}>{paper.questions.length}</div>
          </div>
          <div className="card" style={{ padding: '1rem', textAlign: 'center', borderColor: 'rgba(0, 184, 163, 0.4)' }}>
            <div style={{ color: 'var(--success)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={14} /> Full Marks
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--success)', marginTop: '0.2rem' }}>{fullSolvedCount}</div>
          </div>
          <div className="card" style={{ padding: '1rem', textAlign: 'center', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
            <div style={{ color: '#f59e0b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <AlertCircle size={14} /> Partial Solved
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#f59e0b', marginTop: '0.2rem' }}>{partialSolvedCount}</div>
          </div>
          <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <HelpCircle size={14} /> Unattempted
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{unattemptedCount}</div>
          </div>
        </div>

        {/* Detailed Question Breakdown Table */}
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', fontWeight: '600' }}>Question Breakdown</h3>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#1c1c1c', borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Q#</th>
                <th style={{ padding: '0.75rem 1rem' }}>Title</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Test Cases</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paper.questions.map(q => {
                const p = progress[q.id];
                const marksEarned = p ? p.marksEarned : 0;
                const status = p ? p.status : 'unattempted';
                const passedCount = p ? p.passedCount : 0;
                const totalCount = q.testcases.length;

                return (
                  <tr 
                    key={q.id}
                    style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: status === 'passed' ? 'rgba(0, 184, 163, 0.03)' : 'transparent',
                      transition: 'background 0.15s'
                    }}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                      {q.number}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>
                      {q.title}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.06)', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {q.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center', color: status === 'passed' ? 'var(--success)' : 'var(--text-muted)' }}>
                      {p ? `${passedCount} / ${totalCount}` : '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: '700' }}>
                      <span style={{ 
                        color: status === 'passed' ? 'var(--success)' : (status === 'partial' ? '#f59e0b' : 'var(--text-muted)')
                      }}>
                        {marksEarned} / {q.marks}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => goToQuestion(q.id)}
                        className="btn"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        {status === 'passed' ? 'Review' : 'Solve'} <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem' }}>
          <button 
            onClick={handleReset} 
            className="btn" 
            style={{ color: 'var(--fail)', borderColor: 'rgba(239, 71, 67, 0.4)', fontSize: '0.85rem' }}
          >
            <RotateCcw size={14} /> Reset Test Progress
          </button>
          <button 
            onClick={onClose} 
            className="btn btn-primary"
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            Close Scorecard
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
