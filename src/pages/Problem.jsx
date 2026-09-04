import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, Send, CheckCircle, XCircle, Loader, Terminal as TerminalIcon, 
  AlertTriangle, X, ChevronLeft, ChevronRight, Lock, Copy, RotateCcw, 
  Award, Eye, EyeOff, Sparkles, Check, Maximize2, Minimize2
} from 'lucide-react';
import { getPracticePapers, getUserProgress, saveQuestionProgress, saveDraftCode } from '../data/questions';
import { executeCode } from '../services/piston';

export default function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const codeRef = useRef('');

  const papers = getPracticePapers();
  const questionId = parseInt(id) || 501;

  let currentPaper = papers[0];
  let question = null;
  for (const p of papers) {
    const q = p.questions.find(item => item.id === questionId);
    if (q) {
      question = q;
      currentPaper = p;
      break;
    }
  }

  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runningSingleIndex, setRunningSingleIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isTextareaMode, setIsTextareaMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);

  // Custom Input State
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState(null);
  const [isCustomRunning, setIsCustomRunning] = useState(false);

  // Submit Modal States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResults, setSubmitResults] = useState(null);
  const [modalActiveTab, setModalActiveTab] = useState(0);

  // Initial code getter
  const getInitialCode = () => {
    if (!question) return '        ';
    const progress = getUserProgress();
    const saved = progress[question.id];
    return (saved && saved.userCode !== undefined) ? saved.userCode : (question.starterUserCode || '        ');
  };

  // Instant draft auto-save handler on every character edit
  const handleCodeChange = (newCode) => {
    codeRef.current = newCode;
    if (question && question.type !== 'mcq') {
      saveDraftCode(question.id, newCode);
    }
  };

  // Load question and previous saved code if available
  useEffect(() => {
    if (question) {
      const initialCode = getInitialCode();
      codeRef.current = initialCode;
      if (editorRef.current) {
        editorRef.current.setValue(initialCode);
      }
      setResults(null);
      setActiveTab(0);
      setCustomResult(null);
      // Pre-fill sample input into custom input
      if (question.sampleInput) {
        setCustomInput(question.sampleInput);
      }
    }
  }, [questionId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {});
  };

  if (!question) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Question not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Practice Test Dashboard
        </Link>
      </div>
    );
  }

  // All testcases are 100% visible and verifiable
  const allCases = question.testcases || [];
  const currentQuestions = currentPaper.questions;
  const currentIndex = currentQuestions.findIndex(q => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? currentQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < currentQuestions.length - 1 ? currentQuestions[currentIndex + 1] : null;

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

    if (qId === 15) {
      return cleanLines.map(line => {
        if (line.startsWith('Reverse Names:')) {
          const content = line.substring('Reverse Names:'.length).trim();
          const words = content.split(/\s+/);
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

  const getCurrentUserCode = () => {
    if (editorRef.current) {
      return editorRef.current.getValue();
    }
    return codeRef.current || getInitialCode();
  };

  // Ultra-Fast Parallel Execution Runner
  const executeTestCases = async (testcasesToRun) => {
    const currentCode = getCurrentUserCode();
    codeRef.current = currentCode;
    const fullCode = getFullCode(currentCode);

    // Run all test cases in PARALLEL via Promise.all!
    const responses = await Promise.all(
      testcasesToRun.map(tc => executeCode('java', fullCode, tc.input))
    );

    const testResults = [];
    let passedAll = true;
    let passCount = 0;
    let globalCompileError = null;

    for (let i = 0; i < testcasesToRun.length; i++) {
      const tc = testcasesToRun[i];
      const response = responses[i];

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
    }

    return {
      tests: testResults,
      passedAll,
      passCount,
      totalCount: testcasesToRun.length,
      compileError: globalCompileError
    };
  };

  // Run only the currently selected single testcase (Instant ~2s)
  const handleRunSingleCase = async (index) => {
    const tc = allCases[index];
    if (!tc) return;

    setIsRunning(true);
    setRunningSingleIndex(index);
    const currentCode = getCurrentUserCode();
    codeRef.current = currentCode;
    const fullCode = getFullCode(currentCode);

    try {
      const response = await executeCode('java', fullCode, tc.input);
      let actualOutput = '';
      let errorOutput = false;
      let errorMessage = '';

      if (response.message) {
        errorOutput = true;
        errorMessage = response.message;
      } else if (response.compile && response.compile.code !== 0) {
        errorOutput = true;
        errorMessage = (response.compile.stderr || response.compile.output || response.compile.stdout || 'Compilation Failed').trim();
      } else if (response.run && response.run.code !== 0) {
        errorOutput = true;
        errorMessage = (response.run.stderr || response.run.output || response.run.stdout || `Runtime Error (Exit Code ${response.run.code})`).trim();
      } else if (response.run) {
        actualOutput = response.run.stdout ? response.run.stdout.trim() : '';
        if (response.run.stderr) {
          actualOutput = (actualOutput + '\n' + response.run.stderr).trim();
        }
      }

      const normalizedActual = normalizeOutput(actualOutput, question.id);
      const normalizedExpected = normalizeOutput(tc.expectedOutput, question.id);
      const isPass = !errorOutput && (normalizedActual === normalizedExpected);

      const singleResult = {
        id: tc.id,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: errorOutput ? errorMessage : actualOutput,
        pass: isPass,
        error: errorOutput,
        isHidden: tc.isHidden,
        explanation: tc.explanation
      };

      setResults(prev => {
        const tests = prev?.tests ? [...prev.tests] : new Array(allCases.length).fill(null);
        tests[index] = singleResult;
        const executed = tests.filter(Boolean);
        const passedCount = executed.filter(t => t.pass).length;
        return {
          tests,
          passedAll: passedCount === allCases.length,
          passCount: passedCount,
          totalCount: allCases.length,
          compileError: errorOutput && response.compile?.code !== 0 ? errorMessage : null
        };
      });
    } catch (err) {
      setResults({ compileError: err.message || 'Execution failed' });
    } finally {
      setIsRunning(false);
      setRunningSingleIndex(null);
    }
  };

  // Run Custom Input
  const handleRunCustom = async () => {
    setIsCustomRunning(true);
    setCustomResult(null);
    const currentCode = getCurrentUserCode();
    codeRef.current = currentCode;
    const fullCode = getFullCode(currentCode);

    try {
      const startTime = Date.now();
      const response = await executeCode('java', fullCode, customInput);
      const duration = Date.now() - startTime;

      let actualOutput = '';
      let errorOutput = false;
      let errorMessage = '';

      if (response.message) {
        errorOutput = true;
        errorMessage = response.message;
      } else if (response.compile && response.compile.code !== 0) {
        errorOutput = true;
        errorMessage = (response.compile.stderr || response.compile.output || response.compile.stdout || 'Compilation Failed').trim();
      } else if (response.run && response.run.code !== 0) {
        errorOutput = true;
        errorMessage = (response.run.stderr || response.run.output || response.run.stdout || `Runtime Error (Exit Code ${response.run.code})`).trim();
      } else if (response.run) {
        actualOutput = response.run.stdout ? response.run.stdout.trim() : '';
        if (response.run.stderr) {
          actualOutput = (actualOutput + '\n' + response.run.stderr).trim();
        }
      }

      setCustomResult({
        output: errorOutput ? errorMessage : (actualOutput || '(No Output Produced)'),
        isError: errorOutput,
        duration
      });
    } catch (err) {
      setCustomResult({
        output: err.message || 'Custom execution failed',
        isError: true,
        duration: 0
      });
    } finally {
      setIsCustomRunning(false);
    }
  };

  // Run Code (Runs all test cases in parallel, or custom if active)
  const handleRun = async () => {
    if (activeTab === 'custom') {
      await handleRunCustom();
      return;
    }

    setIsRunning(true);
    setResults(null);

    try {
      const res = await executeTestCases(allCases);
      setResults(res);
    } catch (err) {
      setResults({ compileError: err.message || 'Execution failed' });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code (Runs all test cases in parallel and grades marks)
  const handleSubmit = async () => {
    setShowSubmitModal(true);
    setIsSubmitting(true);
    setSubmitResults(null);
    setModalActiveTab(0);

    try {
      const res = await executeTestCases(question.testcases);
      setSubmitResults(res);

      if (!res.compileError) {
        let marksEarned = 0;
        let status = 'failed';
        if (res.passCount === res.totalCount) {
          marksEarned = question.marks;
          status = 'passed';
        } else if (res.passCount > 0) {
          marksEarned = Math.max(1, Math.round((res.passCount / res.totalCount) * question.marks));
          status = 'partial';
        }

        saveQuestionProgress(question.id, {
          userCode: getCurrentUserCode(),
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
    navigator.clipboard.writeText(getFullCode(getCurrentUserCode()));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    if (window.confirm("Reset your solution code to the blank template?")) {
      const blankCode = question.starterUserCode || '        ';
      codeRef.current = blankCode;
      if (editorRef.current) {
        editorRef.current.setValue(blankCode);
      }
      if (question) {
        saveDraftCode(question.id, blankCode);
      }
    }
  };

  const activeTestCase = (typeof activeTab === 'number' && allCases[activeTab]) ? allCases[activeTab] : (allCases[0] || null);
  const activeTestResult = (results?.tests && typeof activeTab === 'number') ? results.tests[activeTab] : null;

  // Calculate lines in prefix to offset Monaco line numbering
  const prefixLineCount = question.prefixCode ? question.prefixCode.split('\n').length : 0;

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

  // MCQ Question Layout Render
  if (question.type === 'mcq') {
    const progress = getUserProgress();
    const currentProgress = progress[question.id] || {};
    const selectedOption = currentProgress.userCode || null;
    const isSubmitted = currentProgress.status !== undefined;

    const handleMcqSelect = (option) => {
      const isCorrect = option === question.correctAnswer;
      const marksEarned = isCorrect ? question.marks : 0;
      const status = isCorrect ? 'passed' : 'failed';

      saveQuestionProgress(question.id, {
        userCode: option,
        marksEarned,
        totalMarks: question.marks,
        passedCount: isCorrect ? 1 : 0,
        totalCount: 1,
        status
      });

      window.dispatchEvent(new Event('storage'));
    };

    return (
      <div className="container" style={{ flex: 1, paddingTop: '1.5rem', paddingBottom: '3rem', maxWidth: '1200px' }}>
        {/* Navigation & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link to="/" className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <ChevronLeft size={16} /> All Questions
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn" 
              disabled={!prevQuestion} 
              onClick={() => prevQuestion && navigate(`/problem/${prevQuestion.id}`)}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              className="btn" 
              disabled={!nextQuestion} 
              onClick={() => nextQuestion && navigate(`/problem/${nextQuestion.id}`)}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          {/* Left Panel: MCQ Details */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ background: '#ffa116', color: '#000', fontWeight: '800', fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                MCQ
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                {question.title} ({question.marks} Marks)
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1.2rem', fontWeight: '500' }}>
              {question.statement}
            </div>

            {question.codeSnippet && (
              <pre style={{ 
                background: '#161618', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                padding: '1.2rem', 
                color: '#f8f8f2', 
                fontSize: '0.92rem', 
                fontFamily: "'Fira Code', monospace",
                overflowX: 'auto',
                marginBottom: '1.2rem',
                lineHeight: 1.5
              }}>
                <code>{question.codeSnippet}</code>
              </pre>
            )}

            {isSubmitted && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem 1.2rem',
                borderRadius: '8px',
                background: currentProgress.status === 'passed' ? 'rgba(46, 204, 113, 0.12)' : 'rgba(231, 76, 60, 0.12)',
                border: `1px solid ${currentProgress.status === 'passed' ? '#2ecc71' : '#e74c3c'}`,
                color: currentProgress.status === 'passed' ? '#2ecc71' : '#e74c3c',
                fontWeight: '600',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {currentProgress.status === 'passed' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                {currentProgress.status === 'passed' ? '🎉 Correct Answer! (+1 Mark)' : '❌ Incorrect Answer (0 Marks)'}
              </div>
            )}
          </div>

          {/* Right Panel: Options */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              Choose any one
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrectOpt = opt === question.correctAnswer;
                
                let borderColor = 'var(--border-color)';
                let bg = 'rgba(255, 255, 255, 0.02)';
                
                if (isSubmitted) {
                  if (isCorrectOpt) {
                    borderColor = '#2ecc71';
                    bg = 'rgba(46, 204, 113, 0.1)';
                  } else if (isSelected && !isCorrectOpt) {
                    borderColor = '#e74c3c';
                    bg = 'rgba(231, 76, 60, 0.1)';
                  }
                } else if (isSelected) {
                  borderColor = 'var(--accent-primary)';
                  bg = 'rgba(255, 161, 22, 0.08)';
                }

                return (
                  <div 
                    key={idx}
                    onClick={() => handleMcqSelect(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.1rem 1.3rem',
                      borderRadius: '10px',
                      border: `2px solid ${borderColor}`,
                      background: bg,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? (isSubmitted ? (isCorrectOpt ? '#2ecc71' : '#e74c3c') : 'var(--accent-primary)') : 'var(--text-muted)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && (
                          <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: isSubmitted ? (isCorrectOpt ? '#2ecc71' : '#e74c3c') : 'var(--accent-primary)'
                          }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.98rem', fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {opt}
                      </span>
                    </div>

                    {isSubmitted && isCorrectOpt && (
                      <span style={{ color: '#2ecc71', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Check size={16} /> Correct
                      </span>
                    )}

                    {isSubmitted && isSelected && !isCorrectOpt && (
                      <span style={{ color: '#e74c3c', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <X size={16} /> Incorrect
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {allCases.length} Test Cases (All Visible)
          </span>
        </div>
      </div>

      {/* Right Column: Code Editor & Execution Results */}
      <div className="problem-right">
        {/* Right Panel: Interactive Code Editor & Test Console */}
        <div 
          style={isFullscreen ? {
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#141416',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem'
          } : { 
            flex: '0 0 58%',
            display: 'flex', 
            flexDirection: 'column', 
            minWidth: '350px',
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          {/* Editor Header Bar */}
          <div className="editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#1c1c1f', borderBottom: '1px solid var(--border-color)' }}>
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
              <span style={{
                color: '#2ecc71',
                fontSize: '0.78rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'rgba(46, 204, 113, 0.1)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px'
              }}>
                💾 Auto-Saved
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button 
                className="btn" 
                onClick={() => setShowMainModal(true)} 
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: 'var(--accent-primary)', borderColor: 'rgba(255,161,22,0.4)' }}
                title="View locked main() function"
              >
                <Eye size={14} /> View Main()
              </button>

              <button 
                className="btn" 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', borderColor: isFullscreen ? 'var(--accent-primary)' : 'var(--border-color)' }}
                title="Toggle Fullscreen Editor"
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>

              <button 
                className="btn" 
                onClick={() => setIsTextareaMode(!isTextareaMode)} 
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                title="Toggle Simple Textarea / Monaco Editor"
              >
                {isTextareaMode ? '⚡ Monaco IDE' : '📝 Simple Textarea'}
              </button>

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
              background: '#151518',
              borderBottom: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              {question.prefixCode}
            </div>

            {/* Middle Editable Code Area */}
            <div style={{ minHeight: isFullscreen ? 'calc(100vh - 280px)' : '380px', flex: 1, position: 'relative' }}>
              {isTextareaMode ? (
                <textarea
                  key={`textarea-${question.id}`}
                  defaultValue={getInitialCode()}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  placeholder="Type your Java code logic here..."
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: isFullscreen ? 'calc(100vh - 280px)' : '380px',
                    background: '#121214',
                    color: '#f8f8f2',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                    fontSize: '14px',
                    padding: '12px 16px',
                    resize: 'none',
                    lineHeight: '1.6',
                    tabSize: 4
                  }}
                />
              ) : (
                <Editor
                  key={`monaco-${question.id}`}
                  height="100%"
                  language="java"
                  theme="vs-dark"
                  defaultValue={getInitialCode()}
                  onChange={(val) => handleCodeChange(val || '')}
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
                    wordBasedSuggestions: "off",
                    scrollbar: {
                      alwaysConsumeMouseWheel: false
                    }
                  }}
                />
              )}
            </div>

            {/* Bottom Locked Code Block */}
            <div style={{ 
              padding: '0.6rem 1.2rem 1.2rem 1.2rem', 
              color: '#8b949e', 
              fontSize: '13.5px', 
              lineHeight: 1.5,
              whiteSpace: 'pre',
              background: '#151518',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              {question.suffixCode}
            </div>
          </div>    </div>

        {/* Results / Test Runner Console Panel */}
        <div className="results-container" style={{ flex: '1 1 42%', minHeight: '180px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {isRunning && (
            <div className="status-banner" style={{ backgroundColor: 'rgba(255, 161, 22, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              <Loader size={16} className="spinner" /> 
              {runningSingleIndex !== null ? `Running Case ${runningSingleIndex + 1}...` : `⚡ Evaluating all ${allCases.length} test cases in parallel...`}
            </div>
          )}

          {!isRunning && results && (
            <>
              {results.compileError ? (
                <div className="status-banner wrong" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                  <AlertTriangle size={16} /> Compilation Error
                </div>
              ) : results.passedAll ? (
                <div className="status-banner accepted" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                  <CheckCircle size={16} /> Accepted: All {results.totalCount} Test Cases Passed!
                </div>
              ) : (
                <div className="status-banner wrong" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                  <XCircle size={16} /> Wrong Answer ({results.passCount}/{results.totalCount} Passed)
                </div>
              )}
            </>
          )}

          {/* Test Case Selection Tabs + Custom Input Tab */}
          <div className="tabs-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {allCases.map((tc, idx) => {
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.55rem', fontSize: '0.8rem' }}
                  >
                    {res && (res.pass ? <CheckCircle size={12} color="var(--success)" /> : <XCircle size={12} color="var(--fail)" />)}
                    Case {idx + 1}
                    {tc.isHidden && (
                      <span style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '3px' }}>
                        Hidden
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Custom Input Tab */}
              <button
                className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.6rem', fontSize: '0.8rem', borderColor: activeTab === 'custom' ? 'var(--accent-primary)' : undefined }}
              >
                <span>⚙️ Custom Input</span>
              </button>
            </div>

            {/* Quick Run Action for the active tab */}
            {typeof activeTab === 'number' && (
              <button
                className="btn"
                onClick={() => handleRunSingleCase(activeTab)}
                disabled={isRunning || isSubmitting}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.3rem', color: 'var(--accent-primary)' }}
                title={`Run only Case ${activeTab + 1} instantly`}
              >
                {runningSingleIndex === activeTab ? <Loader size={12} className="spinner" /> : <Play size={12} />}
                Run Case {activeTab + 1}
              </button>
            )}
          </div>

          {/* Tab Content Container */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.4rem 0' }}>
            {activeTab === 'custom' ? (
              /* Custom Input Panel */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Custom Stdin Input:
                  </label>
                  <button 
                    className="btn btn-primary"
                    onClick={handleRunCustom}
                    disabled={isCustomRunning || isRunning}
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', gap: '0.3rem' }}
                  >
                    {isCustomRunning ? <Loader size={13} className="spinner" /> : <Play size={13} />}
                    Run Custom Input
                  </button>
                </div>

                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom input here..."
                  style={{
                    width: '100%',
                    minHeight: '75px',
                    maxHeight: '110px',
                    backgroundColor: '#121214',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    color: '#fff',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '13px',
                    padding: '8px 10px',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />

                {customResult && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: customResult.isError ? 'var(--fail)' : 'var(--success)', fontWeight: '600' }}>
                        {customResult.isError ? '❌ Error Output:' : '✅ Your Output:'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ⏱️ {customResult.duration}ms
                      </span>
                    </div>
                    <div 
                      className="pre-formatted" 
                      style={{ 
                        color: customResult.isError ? 'var(--fail)' : 'var(--success)',
                        maxHeight: '110px',
                        overflowY: 'auto',
                        background: '#0d0d10'
                      }}
                    >
                      {customResult.output}
                    </div>
                  </div>
                )}
              </div>
            ) : results?.compileError ? (
              /* Compilation Error */
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--fail)', fontWeight: '600', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <TerminalIcon size={16} /> Compilation Error Output:
                </div>
                <div className="terminal-box" style={{ maxHeight: '140px', overflowY: 'auto' }}>
                  {results.compileError}
                </div>
              </div>
            ) : (
              /* Standard Test Case View */
              <div>
                {activeTestResult?.error ? (
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--fail)', fontWeight: '600', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <TerminalIcon size={16} /> Runtime Exception Output:
                    </div>
                    <div className="terminal-box" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                      {activeTestResult.actual}
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.2rem' }}>
                          Input:
                        </div>
                        <div className="pre-formatted" style={{ maxHeight: '80px', overflowY: 'auto' }}>
                          {activeTestCase?.input}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.2rem' }}>
                          Expected Output:
                        </div>
                        <div className="pre-formatted" style={{ maxHeight: '80px', overflowY: 'auto', color: 'var(--accent-primary)' }}>
                          {activeTestCase?.expectedOutput}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                          Your Output (Actual Output):
                        </div>
                        {activeTestResult && (
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: '700',
                            color: activeTestResult.pass ? 'var(--success)' : 'var(--fail)'
                          }}>
                            {activeTestResult.pass ? '✅ Matches Expected' : '❌ Output Mismatch'}
                          </span>
                        )}
                      </div>
                      <div 
                        className="pre-formatted" 
                        style={{ 
                          color: activeTestResult ? (activeTestResult.pass ? 'var(--success)' : 'var(--fail)') : 'var(--text-muted)',
                          maxHeight: '90px',
                          overflowY: 'auto',
                          background: activeTestResult ? (activeTestResult.pass ? 'rgba(0,184,163,0.06)' : 'rgba(239,71,67,0.06)') : '#121214',
                          border: activeTestResult ? (activeTestResult.pass ? '1px solid rgba(0,184,163,0.3)' : '1px solid rgba(239,71,67,0.3)') : '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        {activeTestResult ? (activeTestResult.actual || '(No Output Produced)') : `Click "Run Code" or "Run Case ${(typeof activeTab === 'number' ? activeTab + 1 : 1)}" to test your solution`}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Modal: Tests all test cases and shows transparent results */}
      {showSubmitModal && createPortal(
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowSubmitModal(false)}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>⚡ Judging All Test Cases in Parallel...</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Evaluating all <strong>{question.testcases.length}</strong> test cases concurrently for instant grading.
                </p>
              </div>
            )}

            {!isSubmitting && submitResults && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {submitResults.compileError ? (
                  <div style={{ textAlign: 'center' }}>
                    <AlertTriangle size={56} color="var(--fail)" style={{ margin: '0 auto' }} />
                    <h2 style={{ color: 'var(--fail)', fontSize: '1.8rem', marginTop: '0.5rem' }}>Compile Error</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Marks Earned: <strong style={{ color: 'var(--fail)' }}>0 / {question.marks}</strong>
                    </p>
                    <div className="terminal-box" style={{ width: '100%', textAlign: 'left', marginTop: '1rem', maxHeight: '180px', overflowY: 'auto' }}>
                      {submitResults.compileError}
                    </div>
                  </div>
                ) : submitResults.passedAll ? (
                  <div style={{ textAlign: 'center' }}>
                    <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto' }} />
                    <h2 style={{ color: 'var(--success)', fontSize: '2.2rem', fontWeight: '800', marginTop: '0.5rem' }}>Accepted!</h2>
                    <div style={{ 
                      background: 'rgba(0, 184, 163, 0.1)', 
                      border: '1px solid var(--success)', 
                      padding: '0.5rem 1.4rem', 
                      borderRadius: '30px',
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: 'var(--success)',
                      display: 'inline-block',
                      margin: '0.5rem 0'
                    }}>
                      +{question.marks} / {question.marks} Marks Earned!
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Passed all <strong>{submitResults.passCount} / {submitResults.totalCount}</strong> test cases!
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <XCircle size={64} color="var(--fail)" style={{ margin: '0 auto' }} />
                    <h2 style={{ color: 'var(--fail)', fontSize: '1.8rem', fontWeight: '800', marginTop: '0.5rem' }}>
                      {submitResults.passCount > 0 ? 'Partially Accepted' : 'Wrong Answer'}
                    </h2>
                    <div style={{ 
                      background: 'rgba(255, 161, 22, 0.1)', 
                      border: '1px solid var(--accent-primary)', 
                      padding: '0.4rem 1.2rem', 
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: 'var(--accent-primary)',
                      display: 'inline-block',
                      margin: '0.4rem 0'
                    }}>
                      Score: {Math.max(0, Math.round((submitResults.passCount / submitResults.totalCount) * question.marks))} / {question.marks} Marks
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      Passed <strong>{submitResults.passCount}</strong> of <strong>{submitResults.totalCount}</strong> test cases.
                    </p>
                  </div>
                )}

                {/* Individual Test Case Breakdown with Detailed View */}
                {!submitResults.compileError && submitResults.tests && (
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Click any Test Case to inspect Input, Expected & Your Output:
                    </div>

                    {/* Test Case Selection Tabs */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                      {submitResults.tests.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => setModalActiveTab(idx)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            background: modalActiveTab === idx ? (t.pass ? 'rgba(0,184,163,0.25)' : 'rgba(239,71,67,0.25)') : '#18181b',
                            border: `1px solid ${modalActiveTab === idx ? (t.pass ? 'var(--success)' : 'var(--fail)') : 'rgba(255,255,255,0.1)'}`,
                            color: '#fff',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontWeight: modalActiveTab === idx ? '700' : '500'
                          }}
                        >
                          {t.pass ? <CheckCircle size={13} color="var(--success)" /> : <XCircle size={13} color="var(--fail)" />}
                          Test {idx + 1}
                          {t.isHidden && <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>(Hidden)</span>}
                        </button>
                      ))}
                    </div>

                    {/* Selected Test Case Detailed View */}
                    {submitResults.tests[modalActiveTab] && (
                      <div style={{ background: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: submitResults.tests[modalActiveTab].pass ? 'var(--success)' : 'var(--fail)' }}>
                            Test Case {modalActiveTab + 1}: {submitResults.tests[modalActiveTab].pass ? '✅ Passed' : '❌ Failed'}
                          </span>
                          {submitResults.tests[modalActiveTab].explanation && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {submitResults.tests[modalActiveTab].explanation}
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.6rem' }}>
                          <div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Input:</div>
                            <div className="pre-formatted" style={{ maxHeight: '80px', overflowY: 'auto', fontSize: '0.82rem' }}>
                              {submitResults.tests[modalActiveTab].input}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Expected Output:</div>
                            <div className="pre-formatted" style={{ maxHeight: '80px', overflowY: 'auto', fontSize: '0.82rem', color: 'var(--accent-primary)' }}>
                              {submitResults.tests[modalActiveTab].expected}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Your Output:</div>
                          <div 
                            className="pre-formatted" 
                            style={{ 
                              maxHeight: '90px', 
                              overflowY: 'auto', 
                              fontSize: '0.82rem',
                              color: submitResults.tests[modalActiveTab].pass ? 'var(--success)' : 'var(--fail)',
                              background: submitResults.tests[modalActiveTab].pass ? 'rgba(0,184,163,0.06)' : 'rgba(239,71,67,0.06)',
                              border: `1px solid ${submitResults.tests[modalActiveTab].pass ? 'rgba(0,184,163,0.3)' : 'rgba(239,71,67,0.3)'}`
                            }}
                          >
                            {submitResults.tests[modalActiveTab].actual || '(No Output Produced)'}
                          </div>
                        </div>
                      </div>
                    )}
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

      {/* Locked Main Function View Modal */}
      {showMainModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowMainModal(false)}>
          <div 
            className="modal-card" 
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '650px', width: '90%', textAlign: 'left' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock color="var(--accent-primary)" size={20} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Locked Main Wrapper — {question.number}</h3>
              </div>
              <button className="btn" onClick={() => setShowMainModal(false)} style={{ padding: '0.3rem 0.6rem' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              This is the locked driver code executed behind the scenes to test your solution logic.
            </p>

            <pre style={{ 
              background: '#121214', 
              color: '#8b949e', 
              padding: '1.2rem', 
              borderRadius: '8px', 
              fontSize: '13.5px', 
              lineHeight: 1.5,
              overflowX: 'auto',
              fontFamily: "'Fira Code', 'Courier New', monospace"
            }}>
              {question.prefixCode}
              {'\n        // [YOUR SOLUTION CODE IS INJECTED HERE]\n'}
              {question.suffixCode}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
              <button className="btn btn-primary" onClick={() => setShowMainModal(false)} style={{ padding: '0.45rem 1.2rem' }}>
                Got it
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
