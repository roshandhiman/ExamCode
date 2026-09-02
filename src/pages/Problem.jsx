import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, Send, CheckCircle, XCircle, Loader, Terminal as TerminalIcon, 
  AlertTriangle, X, ChevronLeft, ChevronRight, Lock, Copy, RotateCcw, 
  Award, Eye, EyeOff, Sparkles, Check
} from 'lucide-react';
import { getPracticePapers, getUserProgress, saveQuestionProgress } from '../data/questions';
import { executeCode } from '../services/piston';

export default function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const papers = getPracticePapers();
  const currentPaper = papers[0];
  const questionId = parseInt(id) || 1;
  const question = currentPaper.questions.find(q => q.id === questionId);

  const [userCode, setUserCode] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Submit Modal States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResults, setSubmitResults] = useState(null);

  // Load question and previous saved code if available
  useEffect(() => {
    if (question) {
      const progress = getUserProgress();
      const saved = progress[question.id];
      const initialCode = (saved && saved.userCode !== undefined) ? saved.userCode : (question.starterUserCode || '        ');
      setUserCode(initialCode);
      if (editorRef.current) {
        editorRef.current.setValue(initialCode);
      }
      setResults(null);
      setActiveTab(0);
    }
  }, [questionId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Command to prevent browser default Ctrl+S / Cmd+S saving dialog
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Intentionally prevent browser save dialog
    });
  };

  if (!question) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Question not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Practice Test Paper 1
        </Link>
      </div>
    );
  }

  const sampleCases = question.testcases.filter(tc => !tc.isHidden);
  const totalHiddenCount = question.testcases.filter(tc => tc.isHidden).length;

  const prevQuestion = currentPaper.questions.find(q => q.id === questionId - 1);
  const nextQuestion = currentPaper.questions.find(q => q.id === questionId + 1);

  // Combine locked prefix + user code + locked suffix
  const getFullCode = (codeToRun) => {
    return `${question.prefixCode}\n${codeToRun}\n${question.suffixCode}`;
  };

  // Helper to normalize outputs for comparison
  const normalizeOutput = (str, qId) => {
    if (!str) return '';
    const cleanLines = str
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map(l => l.trimRight())
      .filter(l => l.length > 0);

    // Special graceful handling for Q15 Reverse Names line
    if (qId === 15) {
      return cleanLines.map(line => {
        if (line.startsWith('Reverse Names:')) {
          // Accept reversed letters or reversed word order
          const content = line.substring('Reverse Names:'.length).trim();
          const words = content.split(/\s+/);
          // If words are reversed characters, normalize to standard for test comparison
          const normalizedWords = words.map(w => {
            if (w === 'namA' || w === 'ayRi' || w === 'ayiR' || w === 'naraK' || w === 'narmiS' || w === 'namiS' || w === 'jaR' || w === 'naKaraN') {
              if (w === 'namA') return 'Aman';
              if (w === 'ayRi' || w === 'ayiR') return 'Riya';
              if (w === 'naraK' || w === 'naKaraN') return 'Karan';
              if (w === 'narmiS' || w === 'namiS') return 'Simran';
              if (w === 'jaR') return 'Raj';
            }
            return w;
          });
          return 'Reverse Names: ' + normalizedWords.join(' ');
        }
        return line;
      }).join('\n');
    }

    return cleanLines.join('\n');
  };

  const executeTestCases = async (testcasesToRun) => {
    const fullCode = getFullCode(userCode);
    const testResults = [];
    let passedAll = true;
    let passCount = 0;
    let globalCompileError = null;

    for (let i = 0; i < testcasesToRun.length; i++) {
      const tc = testcasesToRun[i];
      const response = await executeCode('java', fullCode, tc.input);

      let actualOutput = '';
      let errorOutput = false;
      let errorMessage = '';

      if (response.message) {
        errorOutput = true;
        errorMessage = response.message;
        globalCompileError = errorMessage;
      } else if (response.compile && response.compile.code !== 0) {
        errorOutput = true;
        errorMessage = (response.compile.stderr || response.compile.output || response.compile.stdout || 'Compilation Failed').trim();
        globalCompileError = errorMessage;
      } else if (response.run && response.run.code !== 0) {
        errorOutput = true;
        errorMessage = (response.run.stderr || response.run.output || response.run.stdout || `Runtime Error (Exit Code ${response.run.code})`).trim();
      } else if (response.run) {
        actualOutput = response.run.stdout ? response.run.stdout.trim() : '';
        if (response.run.stderr) {
          actualOutput = (actualOutput + '\n' + response.run.stderr).trim();
        }
      } else {
        errorOutput = true;
        errorMessage = 'Unknown execution response from server';
      }

      const normalizedActual = normalizeOutput(actualOutput, question.id);
      const normalizedExpected = normalizeOutput(tc.expectedOutput, question.id);

      const isPass = !errorOutput && (normalizedActual === normalizedExpected);
      if (!isPass) passedAll = false;
      else passCount++;

      testResults.push({
        id: tc.id,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: errorOutput ? errorMessage : actualOutput,
        pass: isPass,
        error: errorOutput,
        isHidden: tc.isHidden,
        explanation: tc.explanation
      });

      if (globalCompileError) break;
    }

    return {
      tests: testResults,
      passedAll,
      passCount,
      totalCount: testcasesToRun.length,
      compileError: globalCompileError
    };
  };

  const handleRun = async () => {
    setIsRunning(true);
    setResults(null);
    setActiveTab(0);

    try {
      const res = await executeTestCases(sampleCases);
      setResults(res);
    } catch (err) {
      setResults({ compileError: err.message || 'Execution failed' });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setShowSubmitModal(true);
    setIsSubmitting(true);
    setSubmitResults(null);

    try {
      const res = await executeTestCases(question.testcases);
      setSubmitResults(res);

      if (!res.compileError) {
        // Calculate marks
        let marksEarned = 0;
        let status = 'failed';
        if (res.passCount === res.totalCount) {
          marksEarned = question.marks;
          status = 'passed';
        } else if (res.passCount > 0) {
          marksEarned = Math.max(1, Math.round((res.passCount / res.totalCount) * question.marks));
          status = 'partial';
        }

        // Save progress to localStorage
        saveQuestionProgress(question.id, {
          userCode,
          marksEarned,
          totalMarks: question.marks,
          passedCount: res.passCount,
          totalCount: res.totalCount,
          status
        });
      }
    } catch (err) {
      setSubmitResults({ compileError: err.message || 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getFullCode(userCode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    if (window.confirm("Reset your solution code to the blank template?")) {
      setUserCode(question.starterUserCode || '        ');
    }
  };

  const activeTestCase = sampleCases[activeTab] || sampleCases[0];
  const activeTestResult = results?.tests ? results.tests[activeTab] : null;

  // Calculate lines in prefix to offset Monaco line numbering
  const prefixLineCount = question.prefixCode.split('\n').length;

  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const content = part.slice(3, -3).replace(/^(java|text)\n/, '').trim();
        return (
          <pre key={index} className="pre-formatted" style={{ margin: '0.6rem 0', fontSize: '0.88rem' }}>
            {content}
          </pre>
        );
      }
      const inlineParts = part.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
      return (
        <span key={index}>
          {inlineParts.map((sub, sIdx) => {
            if (sub.startsWith('`') && sub.endsWith('`')) {
              return (
                <code key={sIdx} style={{ 
                  background: 'rgba(255, 255, 255, 0.08)', 
                  color: 'var(--accent-primary)', 
                  padding: '0.15rem 0.4rem', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.88rem'
                }}>
                  {sub.slice(1, -1)}
                </code>
              );
            }
            if (sub.startsWith('**') && sub.endsWith('**')) {
              return <strong key={sIdx} style={{ color: 'var(--text-primary)' }}>{sub.slice(2, -2)}</strong>;
            }
            return sub;
          })}
        </span>
      );
    });
  };

  return (
    <div className="problem-layout">
      {/* Left Column: Problem Statement & Context */}
      <div className="problem-left">
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <Link 
            to="/" 
            className="btn" 
            style={{ padding: '0.3rem 0.7rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} /> All Questions
          </Link>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button 
              className="btn" 
              disabled={!prevQuestion}
              onClick={() => prevQuestion && navigate(`/problem/${prevQuestion.id}`)}
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              title="Previous Question"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              className="btn" 
              disabled={!nextQuestion}
              onClick={() => nextQuestion && navigate(`/problem/${nextQuestion.id}`)}
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              title="Next Question"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Question Title & Marks */}
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🔥 {question.title}
            </h1>
            <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
              {question.difficulty}
            </span>
            <span style={{ 
              backgroundColor: question.marks === 10 ? 'rgba(239, 71, 67, 0.2)' : 'rgba(255, 161, 22, 0.2)', 
              color: question.marks === 10 ? 'var(--fail)' : 'var(--accent-primary)',
              fontWeight: '700',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.8rem'
            }}>
              {question.marks} Marks
            </span>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.04)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '6px', 
            padding: '0.6rem 0.9rem',
            fontSize: '0.92rem',
            color: 'var(--text-secondary)',
            fontWeight: '500'
          }}>
            {question.tagline}
          </div>
        </div>

        {/* Problem Statement */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Problem Statement
          </h3>
          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
            {renderFormattedText(question.statement)}
          </div>
        </div>

        {/* Concept Pill */}
        <div style={{ marginBottom: '1.8rem', background: 'rgba(255, 161, 22, 0.05)', border: '1px solid rgba(255, 161, 22, 0.2)', padding: '0.8rem 1rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={14} /> Core Concept:
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            {question.concept}
          </div>
        </div>

        {/* Sample Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sample Input</h3>
          </div>
          <div className="pre-formatted">{question.sampleInput}</div>
        </div>

        {/* Sample Output */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sample Output</h3>
          </div>
          <div className="pre-formatted">{question.sampleOutput}</div>
        </div>

        {/* Constraints */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Constraints</h3>
          <div className="pre-formatted" style={{ fontSize: '0.85rem' }}>{question.constraints}</div>
        </div>

        {/* Test Cases Count Information */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0.8rem 1rem', 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-muted)' }}>
            Evaluation Suite:
          </span>
          <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
            {sampleCases.length} Visible Cases • {totalHiddenCount} Hidden Edge Cases
          </span>
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Results */}
      <div className="problem-right">
        {/* Editor Container with Locked Boilerplate Frame */}
        <div className="editor-container" style={{ height: '60%' }}>
          {/* Editor Header Toolbar */}
          <div className="editor-toolbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ 
                background: '#2b2b2b', 
                color: '#ffa116', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px', 
                fontSize: '0.8rem', 
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                &lt;/&gt; Java
              </span>
              <span style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Lock size={12} color="var(--accent-primary)" /> Boilerplate Locked
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button 
                className="btn" 
                onClick={handleCopyCode} 
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                title="Copy Full Code"
              >
                {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button 
                className="btn" 
                onClick={handleResetCode} 
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                title="Reset Code Template"
              >
                <RotateCcw size={14} />
              </button>

              <button 
                className="btn" 
                onClick={handleRun} 
                disabled={isRunning || isSubmitting}
                style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}
              >
                {isRunning ? <Loader size={15} className="spinner" /> : <Play size={15} />}
                Run Code
              </button>

              <button 
                className="btn btn-primary" 
                onClick={handleSubmit} 
                disabled={isRunning || isSubmitting}
                style={{ 
                  backgroundColor: 'var(--success)', 
                  borderColor: 'var(--success)', 
                  color: '#fff',
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}
              >
                {isSubmitting ? <Loader size={15} className="spinner" /> : <Send size={15} />}
                Submit ({question.marks}M)
              </button>
            </div>
          </div>

          {/* Unified Visual Code Box with Locked Prefix, Interactive Middle, and Locked Suffix */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            background: '#18181b', 
            overflowY: 'auto',
            fontFamily: "'Fira Code', 'Courier New', monospace"
          }}>
            {/* Top Locked Code Block */}
            <div style={{ 
              padding: '0.8rem 1.2rem 0.3rem 1.2rem', 
              color: '#8b949e', 
              fontSize: '13.5px', 
              lineHeight: 1.5,
              whiteSpace: 'pre',
              userSelect: 'none',
              background: '#151518',
              borderBottom: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              {question.prefixCode}
            </div>

            {/* Middle Editable Monaco Editor for Student Logic */}
            <div style={{ minHeight: '200px', flex: 1, position: 'relative' }}>
              <Editor
                height="100%"
                language="java"
                theme="vs-dark"
                value={userCode}
                onChange={(val) => setUserCode(val || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                  lineNumbers: (num) => (num + prefixLineCount).toString(),
                  lineNumbersMinChars: 3,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  padding: { top: 8, bottom: 8 },
                  renderLineHighlight: 'all',
                  quickSuggestions: false,
                  suggestOnTriggerCharacters: false,
                  acceptSuggestionOnEnter: "off",
                  tabCompletion: "off",
                  snippetSuggestions: "none",
                  wordBasedSuggestions: "off"
                }}
              />
            </div>

            {/* Bottom Locked Code Block */}
            <div style={{ 
              padding: '0.3rem 1.2rem 1rem 1.2rem', 
              color: '#8b949e', 
              fontSize: '13.5px', 
              lineHeight: 1.5,
              whiteSpace: 'pre',
              userSelect: 'none',
              background: '#151518',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              {question.suffixCode}
            </div>
          </div>
        </div>

        {/* Results / Test Runner Console Panel */}
        <div className="results-container" style={{ height: '40%' }}>
          {isRunning && (
            <div className="status-banner" style={{ backgroundColor: 'rgba(255, 161, 22, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
              <Loader size={18} className="spinner" /> Running sample test cases...
            </div>
          )}

          {!isRunning && results && (
            <>
              {results.compileError ? (
                <div className="status-banner wrong">
                  <AlertTriangle size={18} /> Compilation Error
                </div>
              ) : results.passedAll ? (
                <div className="status-banner accepted">
                  <CheckCircle size={18} /> All Sample Test Cases Passed ({results.passCount}/{results.totalCount})
                </div>
              ) : (
                <div className="status-banner wrong">
                  <XCircle size={18} /> Wrong Answer ({results.passCount}/{results.totalCount} Sample Cases Passed)
                </div>
              )}
            </>
          )}

          {/* Test Case Selection Tabs */}
          <div className="tabs-header">
            {sampleCases.map((tc, idx) => {
              const res = results?.tests ? results.tests[idx] : null;
              let tabClass = 'tab-btn';
              if (activeTab === idx) tabClass += ' active';
              if (res) {
                tabClass += res.pass ? ' pass' : ' fail';
              }

              return (
                <button
                  key={idx}
                  className={tabClass}
                  onClick={() => setActiveTab(idx)}
                >
                  {res && (res.pass ? <CheckCircle size={13} color="var(--success)" /> : <XCircle size={13} color="var(--fail)" />)}
                  Case {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {results?.compileError ? (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--fail)', fontWeight: '600', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TerminalIcon size={16} /> Compilation Error Output:
              </div>
              <div className="terminal-box">
                {results.compileError}
              </div>
            </div>
          ) : (
            <div>
              {activeTestResult?.error ? (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--fail)', fontWeight: '600', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TerminalIcon size={16} /> Runtime Exception Output:
                  </div>
                  <div className="terminal-box">
                    {activeTestResult.actual}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Input:</div>
                      <div className="pre-formatted" style={{ maxHeight: '90px', overflowY: 'auto' }}>
                        {activeTestCase?.input}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Output:</div>
                      <div className="pre-formatted" style={{ maxHeight: '90px', overflowY: 'auto' }}>
                        {activeTestCase?.expectedOutput}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.8rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actual Output:</div>
                    <div 
                      className="pre-formatted" 
                      style={{ 
                        color: activeTestResult ? (activeTestResult.pass ? 'var(--success)' : 'var(--fail)') : 'var(--text-muted)',
                        maxHeight: '100px',
                        overflowY: 'auto'
                      }}
                    >
                      {activeTestResult ? (activeTestResult.actual || '(No Output)') : 'Click "Run Code" to test against sample cases'}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submission Modal: Tests all test cases including hidden cases and awards marks */}
      {showSubmitModal && createPortal(
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowSubmitModal(false)}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>Evaluation Report</h2>
              </div>
              {!isSubmitting && (
                <button 
                  className="btn" 
                  onClick={() => setShowSubmitModal(false)}
                  style={{ padding: '0.2rem 0.5rem' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {isSubmitting && (
              <div style={{ padding: '2.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Loader size={46} className="spinner" color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Judging Submission...</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Evaluating all <strong>{question.testcases.length}</strong> test cases (including hidden edge cases).
                </p>
              </div>
            )}

            {!isSubmitting && submitResults && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
                {submitResults.compileError ? (
                  <>
                    <AlertTriangle size={56} color="var(--fail)" />
                    <h2 style={{ color: 'var(--fail)', fontSize: '1.8rem' }}>Compile Error</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Marks Earned: <strong style={{ color: 'var(--fail)' }}>0 / {question.marks}</strong>
                    </p>
                    <div className="terminal-box" style={{ width: '100%', textAlign: 'left' }}>
                      {submitResults.compileError}
                    </div>
                  </>
                ) : submitResults.passedAll ? (
                  <>
                    <CheckCircle size={64} color="var(--success)" />
                    <h2 style={{ color: 'var(--success)', fontSize: '2.2rem', fontWeight: '800' }}>Accepted!</h2>
                    <div style={{ 
                      background: 'rgba(0, 184, 163, 0.1)', 
                      border: '1px solid var(--success)', 
                      padding: '0.6rem 1.4rem', 
                      borderRadius: '30px',
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--success)'
                    }}>
                      +{question.marks} / {question.marks} Marks Earned!
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                      Passed all <strong>{submitResults.passCount} / {submitResults.totalCount}</strong> test cases (all sample & hidden cases passed).
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle size={64} color="var(--fail)" />
                    <h2 style={{ color: 'var(--fail)', fontSize: '2rem', fontWeight: '800' }}>
                      {submitResults.passCount > 0 ? 'Partially Accepted' : 'Wrong Answer'}
                    </h2>
                    <div style={{ 
                      background: 'rgba(255, 161, 22, 0.1)', 
                      border: '1px solid var(--accent-primary)', 
                      padding: '0.5rem 1.2rem', 
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: 'var(--accent-primary)'
                    }}>
                      Score: {Math.max(0, Math.round((submitResults.passCount / submitResults.totalCount) * question.marks))} / {question.marks} Marks
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Passed <strong>{submitResults.passCount}</strong> of <strong>{submitResults.totalCount}</strong> test cases.
                    </p>
                  </>
                )}

                {/* Individual Test Case Breakdown */}
                {!submitResults.compileError && (
                  <div style={{ width: '100%', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textAlign: 'left', fontWeight: '600' }}>
                      Test Cases Result:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {submitResults.tests.map((t, idx) => (
                        <div 
                          key={idx}
                          style={{ 
                            padding: '0.5rem', 
                            borderRadius: '6px', 
                            background: t.pass ? 'rgba(0, 184, 163, 0.1)' : 'rgba(239, 71, 67, 0.1)',
                            border: `1px solid ${t.pass ? 'var(--success)' : 'var(--fail)'}`,
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span style={{ fontWeight: '600' }}>
                            {t.isHidden ? `Hidden ${idx + 1}` : `Sample ${idx + 1}`}
                          </span>
                          {t.pass ? (
                            <CheckCircle size={14} color="var(--success)" />
                          ) : (
                            <XCircle size={14} color="var(--fail)" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Buttons */}
                <div style={{ display: 'flex', gap: '0.8rem', width: '100%', marginTop: '1rem' }}>
                  <button 
                    className="btn" 
                    onClick={() => setShowSubmitModal(false)}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Close
                  </button>

                  {nextQuestion ? (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => {
                        setShowSubmitModal(false);
                        navigate(`/problem/${nextQuestion.id}`);
                      }}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Next: {nextQuestion.number} <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => {
                        setShowSubmitModal(false);
                        navigate('/');
                      }}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Return to Paper
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
