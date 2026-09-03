import React, { useState, useEffect } from 'react';
import { Flame, Lock, KeyRound, Eye, EyeOff, ShieldAlert, Loader, Sparkles, RefreshCw } from 'lucide-react';
import { authenticatePassword } from '../services/security';

const MEMES = [
  {
    title: "Bro trying to Inspect Element 💻💀",
    url: "https://media.giphy.com/media/LmN8OYiY4m0X85K0Zz/giphy.gif",
    caption: "Bro typing `sessionStorage.setItem('site_auth', true)` like a master hacker 😂"
  },
  {
    title: "Hahaha You Thought You Could Bypass? 🤣",
    url: "https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",
    caption: "Serverless + Salted SHA-256 says: NO WAY MUNNA! 💀"
  },
  {
    title: "Cheers to everyone trying to hack this 🥂🍾",
    url: "https://media.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif",
    caption: "Enjoy your inspection session... 0 passwords found in source code! 😏"
  },
  {
    title: "Doge Hackerman in Action 🐶🕶️",
    url: "https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif",
    caption: "Much security. Such unhackable. Very encrypted. Wow. 🛡️"
  },
  {
    title: "Never Gonna Bypass This 🕺✨",
    url: "https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif",
    caption: "Never gonna give pass up, never gonna let bypass down! 🎶😂"
  },
  {
    title: "Shaq Shimmy on Failed Attempts 😂🔥",
    url: "https://media.giphy.com/media/UO5elnTqo4vSg/giphy.gif",
    caption: "Me watching hackers search for plain password in JavaScript bundles 💀"
  }
];

const TROLL_MESSAGES = [
  "Kya laga bypass kar lega? HAHAHA 💀",
  "Bro opened Inspect Element thinking he's Mr. Robot 💻🕶️",
  "Aise kaise bypass karega munna? 😂",
  "FBI is watching your failed attempts 🚨🤣",
  "Nice try hacker man, but not today! 🙅‍♂️",
  "Ask Roshan nicely for the password bro 😏🔑"
];

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(0);

  // Meme states
  const [memeIndex, setMemeIndex] = useState(0);
  const [shake, setShake] = useState(false);

  // Auto-rotate meme or shuffle
  const nextMeme = () => {
    setMemeIndex((prev) => (prev + 1) % MEMES.length);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (lockoutUntil > now) {
      const waitSec = Math.ceil((lockoutUntil - now) / 1000);
      setError(true);
      setErrorMessage(`Too many failed attempts! Take a breath for ${waitSec}s 🧘‍♂️`);
      return;
    }

    if (!password.trim()) {
      setError(true);
      setErrorMessage('Password toh daal bhai pehle! 🤦‍♂️😂');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const result = await authenticatePassword(password.trim());
      if (result.success && result.token) {
        sessionStorage.setItem('examcode_secure_token', result.token);
        setAttempts(0);
        onUnlock(result.token);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);

        // Switch to a funny laughing meme on wrong password
        setMemeIndex(1);

        const troll = TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
        if (nextAttempts >= 5) {
          setLockoutUntil(Date.now() + 30000);
          setErrorMessage(`🚨 5 Failed Attempts! System locked for 30s. ${troll}`);
        } else {
          setErrorMessage(`${troll} (Attempt ${nextAttempts})`);
        }
      }
    } catch (err) {
      setError(true);
      setErrorMessage('Authentication error. Try again! 🤔');
    } finally {
      setLoading(false);
    }
  };

  const currentMeme = MEMES[memeIndex];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'radial-gradient(circle at center, #1b1a24 0%, #08080a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(16px)',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: '#121215',
        border: '1px solid rgba(255, 161, 22, 0.4)',
        borderRadius: '24px',
        padding: '2rem 1.8rem',
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 161, 22, 0.15)',
        textAlign: 'center',
        transform: shake ? 'translateX(-8px)' : 'none',
        transition: 'transform 0.1s ease',
        animation: shake ? 'shake 0.4s ease-in-out' : 'none'
      }}>
        {/* Floating Funny Emojis Header */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', fontSize: '1.4rem', marginBottom: '0.6rem' }}>
          <span>😹</span>
          <span>🕶️</span>
          <span>💻</span>
          <span>🍿</span>
          <span>🔥</span>
        </div>

        {/* Logo */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffa116 0%, #ff5722 100%)', 
            borderRadius: '12px', 
            padding: '7px 10px',
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

        {/* Meme Card Showcase */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '0.9rem',
          marginBottom: '1.4rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '700', 
              background: 'rgba(255, 161, 22, 0.2)', 
              color: 'var(--accent-primary)',
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <Sparkles size={12} /> HACKER LEVEL: 0 / 100 💀
            </span>

            <button 
              type="button"
              onClick={nextMeme}
              className="btn"
              style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', gap: '0.3rem' }}
              title="Next Funny Meme"
            >
              <RefreshCw size={12} /> Next Meme ({memeIndex + 1}/{MEMES.length})
            </button>
          </div>

          {/* Meme GIF Embed */}
          <div style={{
            width: '100%',
            height: '170px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.6rem'
          }}>
            <img 
              src={currentMeme.url} 
              alt={currentMeme.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff', marginBottom: '0.2rem' }}>
            {currentMeme.title}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {currentMeme.caption}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#09090b',
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
              backgroundColor: 'rgba(239, 71, 67, 0.12)',
              border: '1px solid rgba(239, 71, 67, 0.35)',
              borderRadius: '10px',
              padding: '0.65rem 0.9rem',
              lineHeight: 1.4
            }}>
              <ShieldAlert size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              padding: '0.85rem',
              fontSize: '1rem',
              fontWeight: '700',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(255, 161, 22, 0.35)',
              justifyContent: 'center'
            }}
          >
            {loading ? <Loader size={18} className="spinner" /> : <Lock size={18} />}
            {loading ? 'Verifying...' : 'Unlock Practice Portal 🚀'}
          </button>
        </form>

        <div style={{ marginTop: '1.4rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.35)' }}>
          🔒 Impossible to bypass • Cryptographically Salted SHA-256 🛡️
        </div>
      </div>
    </div>
  );
}
