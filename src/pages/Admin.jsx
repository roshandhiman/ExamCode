import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, Plus, Trash2, Save, LogOut, CheckCircle, Flame, 
  RotateCcw, Download, Upload, BookOpen, Layers
} from 'lucide-react';
import { 
  getPracticePapers, savePracticePapers, resetAllProgress, 
  getUserProgress 
} from '../data/questions';

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [papers, setPapers] = useState([]);
  const [activePaperIdx, setActivePaperIdx] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  // New Paper form state
  const [newDay, setNewDay] = useState('Day 2');
  const [newTitle, setNewTitle] = useState('Practice Test Paper 2');
  const [newSubtitle, setNewSubtitle] = useState('Hard Mixed & Scenario Questions (End Term Prep)');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setPapers(getPracticePapers());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default passcodes
    if (passcode === 'exam2026' || passcode === 'admin' || passcode === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Try "exam2026" or "admin".');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  const handleCreateNewPaper = (e) => {
    e.preventDefault();
    const newPaper = {
      id: `paper-${papers.length + 1}`,
      day: newDay,
      title: newTitle,
      subtitle: newSubtitle,
      totalMarks: 80,
      passingMarks: 32,
      examDate: "Exam: 12th Sept",
      instructions: [
        "Complete method logic inside locked boilerplate templates.",
        "Submit evaluates both visible and hidden test cases."
      ],
      questions: []
    };

    const updated = [...papers, newPaper];
    setPapers(updated);
    savePracticePapers(updated);
    setActivePaperIdx(updated.length - 1);
    setSaveMessage(`Successfully created ${newTitle}!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all user test progress? This clears marks and solved status.")) {
      resetAllProgress();
      setSaveMessage("All user progress has been reset!");
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(papers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `exam_practice_papers_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          setPapers(parsed);
          savePracticePapers(parsed);
          setSaveMessage("Practice papers successfully imported!");
          setTimeout(() => setSaveMessage(''), 3000);
        } else {
          alert("Invalid file format. Expected a JSON array of test papers.");
        }
      } catch (err) {
        alert("Failed to parse JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ width: '380px', textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ background: 'rgba(255, 161, 22, 0.1)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Lock size={26} color="var(--accent-primary)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Assignment Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Manage daily practice papers leading up to 12th Sept End Term.
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter passcode (default: exam2026)" 
              value={passcode} 
              onChange={e => setPasscode(e.target.value)} 
              autoFocus
            />
            {authError && <div style={{ color: 'var(--fail)', fontSize: '0.85rem' }}>{authError}</div>}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Unlock Portal
            </button>
          </form>
          <Link to="/" style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ← Back to Practice Paper
          </Link>
        </div>
      </div>
    );
  }

  const activePaper = papers[activePaperIdx] || papers[0];

  return (
    <div className="container" style={{ flex: 1, maxWidth: '1000px', paddingBottom: '4rem' }}>
      {/* Admin Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Daily Assignment Manager</h1>
            <span style={{ background: 'rgba(0, 184, 163, 0.15)', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
              Admin Mode
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Add new daily papers for you and your friends till 11th Sept.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" onClick={handleExportJSON} title="Download backup">
            <Download size={15} /> Export JSON
          </button>
          <label className="btn" style={{ cursor: 'pointer' }} title="Import papers">
            <Upload size={15} /> Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>
          <button className="btn" onClick={handleLogout} style={{ color: 'var(--fail)' }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {saveMessage && (
        <div style={{ background: 'rgba(0, 184, 163, 0.15)', color: 'var(--success)', border: '1px solid var(--success)', padding: '0.8rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={18} /> {saveMessage}
        </div>
      )}

      {/* Existing Papers List */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Active Practice Papers ({papers.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {papers.map((p, idx) => (
            <div 
              key={p.id} 
              className="card"
              style={{ 
                borderColor: activePaperIdx === idx ? 'var(--accent-primary)' : 'var(--border-color)',
                cursor: 'pointer',
                background: activePaperIdx === idx ? 'rgba(255, 161, 22, 0.05)' : 'var(--bg-card)'
              }}
              onClick={() => setActivePaperIdx(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.85rem' }}>{p.day}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.questions.length} Questions</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{p.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{p.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Paper Details */}
      {activePaper && (
        <div className="card" style={{ marginBottom: '2.5rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem' }}>{activePaper.title} Questions ({activePaper.questions.length})</h3>
            <Link to="/" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem' }}>
              View in Practice Portal →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activePaper.questions.map((q, idx) => (
              <div 
                key={q.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '0.7rem 1rem', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', marginRight: '0.8rem', color: 'var(--accent-primary)' }}>{q.number}</span>
                  <span style={{ fontWeight: '600' }}>{q.title}</span>
                  <span style={{ marginLeft: '0.8rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>({q.category})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: q.marks === 10 ? 'var(--fail)' : 'var(--accent-primary)' }}>
                    {q.marks} Marks
                  </span>
                  <Link to={`/problem/${q.id}`} className="btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Daily Assignment Paper Form */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} color="var(--accent-primary)" /> Add New Daily Practice Paper
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
          Easily schedule Day 2, Day 3... Day 10 sets for end term practice.
        </p>

        <form onSubmit={handleCreateNewPaper} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Day Label</label>
            <input 
              type="text" 
              className="form-input" 
              value={newDay} 
              onChange={e => setNewDay(e.target.value)} 
              placeholder="e.g. Day 2"
              required 
            />
          </div>

          <div className="form-group">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paper Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={newTitle} 
              onChange={e => setNewTitle(e.target.value)} 
              placeholder="e.g. Practice Test Paper 2"
              required 
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Subtitle / Topic Focus</label>
            <input 
              type="text" 
              className="form-input" 
              value={newSubtitle} 
              onChange={e => setNewSubtitle(e.target.value)} 
              placeholder="e.g. OOP, Classes, Comparator, Collections & File Handling"
              required 
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>
              <Plus size={16} /> Create Paper
            </button>
          </div>
        </form>
      </div>

      {/* Dangerous Zone */}
      <div className="card" style={{ borderColor: 'rgba(239, 71, 67, 0.4)', padding: '1.5rem' }}>
        <h4 style={{ color: 'var(--fail)', fontSize: '1rem', marginBottom: '0.5rem' }}>Reset Progress</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Clear all submitted user code, scores, and test case pass records across all questions to retake the test from scratch.
        </p>
        <button 
          onClick={handleResetProgress}
          className="btn" 
          style={{ borderColor: 'var(--fail)', color: 'var(--fail)' }}
        >
          <RotateCcw size={15} /> Reset All Test Progress
        </button>
      </div>
    </div>
  );
}
