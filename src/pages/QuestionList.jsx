import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { questionsData } from '../data/questions';

export default function QuestionList() {
  const { language, topic } = useParams();
  const navigate = useNavigate();

  const langData = questionsData[language];
  const questions = langData ? langData[topic] : null;

  if (!questions) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Topic not found</h2>
        <Link to={`/${language}`} className="btn" style={{ marginTop: '1rem' }}>Back to Topics</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ flex: 1, maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Link to={`/${language}`} style={{ color: 'var(--text-muted)' }}>{language.charAt(0).toUpperCase() + language.slice(1)}</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ textTransform: 'capitalize' }}>{topic}</span>
        </div>
        <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem' }}>{topic} Questions</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '60px 1fr 100px', 
          padding: '1rem',
          borderBottom: '1px solid var(--border-color)',
          color: 'var(--text-muted)',
          fontWeight: '500'
        }}>
          <div>Status</div>
          <div>Title</div>
          <div style={{ textAlign: 'right' }}>Difficulty</div>
        </div>
        
        {questions.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No questions available for this topic yet.
          </div>
        ) : (
          questions.map((q, index) => (
            <div 
              key={q.id} 
              className="card"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '60px 1fr 100px', 
                alignItems: 'center',
                cursor: 'pointer',
                padding: '1rem'
              }}
              onClick={() => navigate(`/${language}/${topic}/${q.id}`)}
            >
              <div style={{ color: 'var(--text-muted)' }}>{index + 1}</div>
              <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{q.title}</div>
              <div style={{ textAlign: 'right' }}>
                <span className={`difficulty ${q.difficulty.toLowerCase()}`}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
