import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { questionsData } from '../data/questions';
import { ChevronRight } from 'lucide-react';

export default function Topics() {
  const { language } = useParams();
  const navigate = useNavigate();

  const langData = questionsData[language];

  if (!langData) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Language not found</h2>
        <Link to="/" className="btn" style={{ marginTop: '1rem' }}>Back to Home</Link>
      </div>
    );
  }

  const topics = Object.keys(langData).map(topicKey => ({
    id: topicKey,
    name: topicKey.charAt(0).toUpperCase() + topicKey.slice(1),
    count: langData[topicKey].length
  }));

  return (
    <div className="container" style={{ flex: 1 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{language} Topics</h1>
        <p style={{ color: 'var(--text-muted)' }}>Select a topic to start practicing.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {topics.map(topic => (
          <div 
            key={topic.id} 
            className="card"
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate(`/${language}/${topic.id}`)}
          >
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{topic.name}</h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{topic.count} Questions</span>
            </div>
            <ChevronRight color="var(--accent-primary)" />
          </div>
        ))}
      </div>
    </div>
  );
}
