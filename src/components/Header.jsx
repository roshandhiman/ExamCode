import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Lock } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Code2 color="#ffa116" size={28} />
        Code<span>Practice</span>
      </Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/" className="btn">Home</Link>
        <Link to="/admin" className="btn" title="Admin Portal" style={{ padding: '0.5rem' }}>
          <Lock size={16} />
        </Link>
      </div>
    </header>
  );
}
