import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getQuestionsData, saveQuestionsData } from '../data/questions';
import { Lock, Plus, Trash2, Save, LogOut, CheckCircle } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [data, setData] = useState({});
  const [selectedLang, setSelectedLang] = useState('java');
  const [selectedTopic, setSelectedTopic] = useState('arrays');
  const [selectedQId, setSelectedQId] = useState('new');

  const [newTopicName, setNewTopicName] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [statement, setStatement] = useState('');
  const [constraints, setConstraints] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [testerCode, setTesterCode] = useState('');
  const [testcases, setTestcases] = useState([
    { input: '', expectedOutput: '', isHidden: false }
  ]);

  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    const currentData = getQuestionsData();
    setData(currentData);
  }, []);

  // When language or topic or question selection changes, load existing question details
  useEffect(() => {
    if (data[selectedLang] && data[selectedLang][selectedTopic]) {
      const qList = data[selectedLang][selectedTopic];
      if (selectedQId !== 'new') {
        const q = qList.find(item => item.id === parseInt(selectedQId));
        if (q) {
          setTitle(q.title || '');
          setDifficulty(q.difficulty || 'Easy');
          setStatement(q.statement || '');
          setConstraints(q.constraints || '');
          setSampleInput(q.sampleInput || '');
          setSampleOutput(q.sampleOutput || '');
          setStarterCode(q.starterCode || '');
          setTesterCode(q.testerCode || '');
          setTestcases(q.testcases || [{ input: '', expectedOutput: '', isHidden: false }]);
          return;
        }
      }
    }
    // Default reset for 'new'
    setTitle('');
    setDifficulty('Easy');
    setStatement('');
    setConstraints('');
    setSampleInput('');
    setSampleOutput('');
    setStarterCode(
      selectedLang === 'java' 
        ? `public class Solution {\n    public int[] solution(int[] nums) {\n        return new int[]{};\n    }\n}`
        : `# Write your code here`
    );
    setTesterCode('');
    setTestcases([
      { input: '', expectedOutput: '', isHidden: false },
      { input: '', expectedOutput: '', isHidden: true }
    ]);
  }, [selectedLang, selectedTopic, selectedQId, data]);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPass = localStorage.getItem('admin_pass') || 'admin123';
    if (passcode === storedPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Passcode');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  const handleAddTopic = () => {
    if (!newTopicName.trim()) return;
    const topicKey = newTopicName.trim().toLowerCase().replace(/\s+/g, '');
    const updated = { ...data };
    if (!updated[selectedLang]) updated[selectedLang] = {};
    if (!updated[selectedLang][topicKey]) {
      updated[selectedLang][topicKey] = [];
    }
    setData(updated);
    saveQuestionsData(updated);
    setSelectedTopic(topicKey);
    setNewTopicName('');
  };

  const handleAddTestCase = () => {
    if (testcases.length >= 6) {
      alert('Maximum 6 test cases allowed per question.');
      return;
    }
    setTestcases([...testcases, { input: '', expectedOutput: '', isHidden: true }]);
  };

  const handleRemoveTestCase = (index) => {
    if (testcases.length <= 1) {
      alert('At least one testcase is required.');
      return;
    }
    setTestcases(testcases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...testcases];
    updated[index][field] = value;
    setTestcases(updated);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a question title.');
      return;
    }

    const updatedData = { ...data };
    if (!updatedData[selectedLang]) updatedData[selectedLang] = {};
    if (!updatedData[selectedLang][selectedTopic]) updatedData[selectedLang][selectedTopic] = [];

    const topicQuestions = updatedData[selectedLang][selectedTopic];

    if (selectedQId === 'new') {
      const newId = topicQuestions.length > 0 ? Math.max(...topicQuestions.map(q => q.id)) + 1 : 1;
      const newQ = {
        id: newId,
        title,
        difficulty,
        statement,
        constraints,
        sampleInput,
        sampleOutput,
        starterCode,
        testerCode,
        testcases
      };
      topicQuestions.push(newQ);
      setSelectedQId(newId.toString());
    } else {
      const qIndex = topicQuestions.findIndex(q => q.id === parseInt(selectedQId));
      if (qIndex !== -1) {
        topicQuestions[qIndex] = {
          id: parseInt(selectedQId),
          title,
          difficulty,
          statement,
          constraints,
          sampleInput,
          sampleOutput,
          starterCode,
          testerCode,
          testcases
        };
      }
    }

    setData(updatedData);
    saveQuestionsData(updatedData);
    setSaveMessage('Question saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ maxWidth: '400px', marginTop: '6rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <Lock size={42} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '1.5rem' }}>Admin Portal</h2>
          
          {authError && (
            <div style={{ color: 'var(--fail)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.2rem' }}>
              <input
                type="password"
                className="form-input"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{ width: '100%' }}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentTopics = data[selectedLang] ? Object.keys(data[selectedLang]) : [];
  const currentQuestions = (data[selectedLang] && data[selectedLang][selectedTopic]) || [];

  return (
    <div className="container" style={{ maxWidth: '1000px', flex: 1, paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Admin Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Add or edit topics, questions, and test cases.</p>
        </div>
        <button className="btn" onClick={handleLogout} style={{ color: 'var(--fail)', borderColor: 'var(--fail)' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {saveMessage && (
        <div className="status-banner accepted" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle size={20} /> {saveMessage}
        </div>
      )}

      {/* Selectors */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Language
            </label>
            <select
              className="form-select"
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                const topics = data[e.target.value] ? Object.keys(data[e.target.value]) : [];
                setSelectedTopic(topics[0] || 'arrays');
                setSelectedQId('new');
              }}
              style={{ width: '100%' }}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="c">C Language</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Topic
            </label>
            <select
              className="form-select"
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedQId('new');
              }}
              style={{ width: '100%' }}
            >
              {currentTopics.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Question
            </label>
            <select
              className="form-select"
              value={selectedQId}
              onChange={(e) => setSelectedQId(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="new">+ Add New Question</option>
              {currentQuestions.map(q => (
                <option key={q.id} value={q.id}>#{q.id} - {q.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add New Topic Row */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <input
            type="text"
            className="form-input"
            placeholder="New Topic Name (e.g. Recursion)"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" className="btn" onClick={handleAddTopic}>
            <Plus size={16} /> Add Topic
          </button>
        </div>
      </div>

      {/* Question Form */}
      <form onSubmit={handleSaveQuestion} className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>
          {selectedQId === 'new' ? 'Create New Question' : `Edit Question #${selectedQId}`}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <label className="form-group">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Question Title</span>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="form-group">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Difficulty</span>
              <select
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </div>
        </div>

        <div className="form-group">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Problem Statement</span>
          <textarea
            className="form-textarea"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sample Input Description</span>
            <textarea
              className="form-textarea"
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
            />
          </div>
          <div className="form-group">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sample Output Description</span>
            <textarea
              className="form-textarea"
              value={sampleOutput}
              onChange={(e) => setSampleOutput(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Constraints</span>
          <textarea
            className="form-textarea"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
          />
        </div>

        <div className="form-group">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Starter Code Template</span>
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'monospace' }}
            value={starterCode}
            onChange={(e) => setStarterCode(e.target.value)}
          />
        </div>

        {/* Testcases Manager */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3>Test Cases (Max 6)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Sample test cases are executed on "Run Code". Hidden test cases are evaluated during "Submit".
              </p>
            </div>
            <button
              type="button"
              className="btn"
              onClick={handleAddTestCase}
              disabled={testcases.length >= 6}
            >
              <Plus size={16} /> Add Testcase
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {testcases.map((tc, idx) => (
              <div key={idx} className="card" style={{ padding: '1rem', background: 'var(--bg-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Testcase #{idx + 1}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={tc.isHidden}
                        onChange={(e) => handleTestCaseChange(idx, 'isHidden', e.target.checked)}
                      />
                      Hidden Testcase
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveTestCase(idx)}
                      style={{ color: 'var(--fail)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Input stdin</span>
                    <textarea
                      className="form-textarea"
                      style={{ fontFamily: 'monospace', minHeight: '60px' }}
                      value={tc.input}
                      onChange={(e) => handleTestCaseChange(idx, 'input', e.target.value)}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expected stdout</span>
                    <textarea
                      className="form-textarea"
                      style={{ fontFamily: 'monospace', minHeight: '60px' }}
                      value={tc.expectedOutput}
                      onChange={(e) => handleTestCaseChange(idx, 'expectedOutput', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
          <Save size={18} /> Save Question & Testcases
        </button>
      </form>
    </div>
  );
}
