import React, { useState } from 'react';
import { Flame, Lock, KeyRound, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const SITE_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'roshan@2024';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim() === SITE_PASSWORD) {
      sessionStorage.setItem('site_auth', 'true');
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setErrorMessage('Incorrect password. Access denied!');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'radial-gradient(circle at center, #1f1f23 0%, #0d0d0e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        background: '#161618',
        border: '1px solid rgba(255, 161, 22, 0.3)',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 161, 22, 0.1)',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffa116 0%, #ff5722 100%)', 
            borderRadius: '10px', 
            padding: '7px 9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame color="#000" size={24} />
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            exam<span style={{ color: 'var(--accent-primary)' }}>CODE</span>
          </span>
        </div>

        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '0.4rem', color: '#fff' }}>
          Protected Portal Access
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.8rem', lineHeight: 1.5 }}>
          Enter the access password to unlock Practice Test Papers & Exam Workspace.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <KeyRound size={18} />
            </div>

            <input 
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter Access Password..."
              autoFocus
              style={{
                width: '100%',
                backgroundColor: '#0d0d0e',
                border: error ? '1px solid var(--fail)' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '0.85rem 2.8rem 0.85rem 2.8rem',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
            />

            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              color: 'var(--fail)',
              fontSize: '0.85rem',
              backgroundColor: 'rgba(239, 71, 67, 0.1)',
              border: '1px solid rgba(239, 71, 67, 0.3)',
              borderRadius: '8px',
              padding: '0.5rem 0.8rem'
            }}>
              <ShieldAlert size={16} /> {errorMessage}
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
              boxShadow: '0 4px 20px rgba(255, 161, 22, 0.3)'
            }}
          >
            <Lock size={18} /> Unlock Practice Portal
          </button>
        </form>

        <div style={{ marginTop: '1.8rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.3)' }}>
          🔒 End Term Exam Portal • Secret Protected Access
        </div>
      </div>
    </div>
  );
}
