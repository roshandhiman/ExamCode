import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Terminal, Cpu } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const languages = [
    {
      id: 'java',
      name: 'Java',
      icon: <Cpu size={48} color="#ffa116" />,
      active: true,
      description: 'Practice core Java algorithms and data structures.',
    },
    {
      id: 'python',
      name: 'Python',
      icon: <Code size={48} color="#4b8bbe" />,
      active: false,
      description: 'Coming Soon',
    },
    {
      id: 'c',
      name: 'C Language',
      icon: <Terminal size={48} color="#a8b9cc" />,
      active: false,
      description: 'Coming Soon',
    }
  ];

  return (
    <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to <span style={{ color: 'var(--accent-primary)' }}>CodePractice</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Sharpen your coding skills with LeetCode-style problems. Choose a language below to get started.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {languages.map(lang => (
          <div
            key={lang.id}
            className="card"
            style={{ 
              width: '300px', 
              textAlign: 'center', 
              cursor: lang.active ? 'pointer' : 'default',
              opacity: lang.active ? 1 : 0.6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '3rem 2rem'
            }}
            onClick={() => lang.active && navigate(`/${lang.id}`)}
          >
            {lang.icon}
            <h2 style={{ fontSize: '1.8rem' }}>{lang.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{lang.description}</p>
            {!lang.active && (
              <span style={{ 
                marginTop: '1rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                padding: '0.3rem 0.8rem', 
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
