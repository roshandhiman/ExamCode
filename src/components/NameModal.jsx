import React, { useState } from 'react';
import { User, Sparkles, ArrowRight } from 'lucide-react';
import { setUserName, logNameSubmitted } from '../services/tracker';

export default function NameModal({ isOpen, onSubmitName }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Bhai apna naam toh daal pehle! 😊');
      return;
    }
    if (trimmed.length < 2) {
      setError('Please enter a valid name (at least 2 characters).');
      return;
    }

    setUserName(trimmed);
    logNameSubmitted(trimmed);
    if (onSubmitName) {
      onSubmitName(trimmed);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: '#121215',
        border: '1px solid rgba(255, 161, 22, 0.4)',
        borderRadius: '24px',
        padding: '2rem 1.8rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 161, 22, 0.18)',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '54px', 
          height: '54px', 
          borderRadius: '16px', 
          background: 'linear-gradient(135deg, #ffa116 0%, #ff5722 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1rem auto',
          boxShadow: '0 8px 20px rgba(255, 161, 22, 0.35)'
        }}>
          <User size={28} color="#000" />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginBottom: '0.4rem' }}>
          What is your name? 👋
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.4rem', lineHeight: 1.4 }}>
          Enter your name to start practicing. Your name will be recorded on your scorecard!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your full name (e.g. Rahul Kumar)..."
              autoFocus
              style={{
                width: '100%',
                backgroundColor: '#09090b',
                border: error ? '1px solid var(--fail)' : '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '12px',
                padding: '0.85rem 1.1rem',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: '0.82rem', color: 'var(--fail)', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: '700',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(255, 161, 22, 0.35)',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Start Practice Portal <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
