import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Send, CheckCircle, XCircle, Loader, Terminal as TerminalIcon, AlertTriangle, X } from 'lucide-react';
import { getQuestionsData } from '../data/questions';
import { executeCode } from '../services/piston';

export default function Problem() {
  const { language, topic, id } = useParams();
  
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Submit Modal States
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResults, setSubmitResults] = useState(null);

  useEffect(() => {
    const questionsData = getQuestionsData();
    const langData = questionsData[language];
    if (langData && langData[topic]) {
      const q = langData[topic].find(q => q.id === parseInt(id));
      if (q) {
        setQuestion(q);
        setCode(q.starterCode);
      }
    }
  }, [language, topic, id]);

  if (!question) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Problem not found</h2>
        <Link to="/" className="btn" style={{ marginTop: '1rem' }}>Back to Home</Link>
      </div>
    );
  }

  const sampleCases = question.testcases.filter(tc => !tc.isHidden);

  const executeTestCases = async (testcasesToRun) => {
    const hasMain = code.includes('public static void main') || code.includes('public static void main(String[]');
    const fullCode = (!hasMain && question.testerCode) ? code + '\n' + question.testerCode : code;
    
    const testResults = [];
    let passedAll = true;
    let passCount = 0;
    let globalCompileError = null;

    for (let i = 0; i < testcasesToRun.length; i++) {
      const tc = testcasesToRun[i];
      const response = await executeCode(language, fullCode, tc.input);
      
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

      const isPass = !errorOutput && actualOutput === tc.expectedOutput;
      if (!isPass) passedAll = false;
      else passCount++;

      testResults.push({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: errorOutput ? errorMessage : actualOutput,
        pass: isPass,
        error: errorOutput,
        isHidden: tc.isHidden
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
    } catch (err) {
      setSubmitResults({ compileError: err.message || 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeTestCase = sampleCases[activeTab] || sampleCases[0];
  const activeTestResult = results?.tests ? results.tests[activeTab] : null;

  return (
    <div className="problem-layout">
      <div className="problem-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.8rem' }}>{question.title}</h1>
          <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </span>
        </div>

        <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {question.statement}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Sample Input</h3>
          <div className="pre-formatted">{question.sampleInput}</div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Sample Output</h3>
          <div className="pre-formatted">{question.sampleOutput}</div>
        </div>

        <div>
          <h3>Constraints</h3>
          <div className="pre-formatted">{question.constraints}</div>
        </div>
      </div>

      <div className="problem-right">
        <div className="editor-container">
          <div className="editor-toolbar">
            <span style={{ fontWeight: '500', color: 'var(--text-muted)' }}>{language.toUpperCase()}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn" 
                onClick={handleRun} 
                disabled={isRunning || isSubmitting}
              >
                {isRunning ? <Loader size={16} className="spinner" /> : <Play size={16} />}
                Run Code
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit} 
                disabled={isRunning || isSubmitting}
                style={{ backgroundColor: 'var(--success)', borderColor: 'var(--success)', color: '#fff' }}
              >
                {isSubmitting ? <Loader size={16} className="spinner" /> : <Send size={16} />}
                Submit
              </button>
            </div>
          </div>
          <Editor
            height="calc(100% - 45px)"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Inter', monospace",
              padding: { top: 16 }
            }}
          />
        </div>

        <div className="results-container">
          {isRunning && (
            <div className="status-banner" style={{ backgroundColor: 'rgba(255, 161, 22, 0.1)', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
              <Loader size={20} className="spinner" /> Running sample test cases...
            </div>
          )}

          {!isRunning && results && (
            <>
              {results.compileError ? (
                <div className="status-banner wrong">
                  <AlertTriangle size={20} /> Compile Error
                </div>
              ) : results.passedAll ? (
                <div className="status-banner accepted">
                  <CheckCircle size={20} /> Sample Cases Passed ({results.passCount}/{results.totalCount})
                </div>
              ) : (
                <div className="status-banner wrong">
                  <XCircle size={20} /> Wrong Answer ({results.passCount}/{results.totalCount} Passed)
                </div>
              )}
            </>
          )}

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
                  {res && (res.pass ? <CheckCircle size={14} color="var(--success)" /> : <XCircle size={14} color="var(--fail)" />)}
                  Case {idx + 1}
                </button>
              );
            })}
          </div>

          {results?.compileError ? (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--fail)', fontWeight: '600', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TerminalIcon size={16} /> Compilation Error Log:
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
                    <TerminalIcon size={16} /> Runtime Exception / Error Output:
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
                      <div className="pre-formatted">{activeTestCase.input}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Output:</div>
                      <div className="pre-formatted">{activeTestCase.expectedOutput}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.8rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actual Output:</div>
                    <div 
                      className="pre-formatted" 
                      style={{ 
                        color: activeTestResult ? (activeTestResult.pass ? 'var(--success)' : 'var(--fail)') : 'var(--text-muted)'
                      }}
                    >
                      {activeTestResult ? (activeTestResult.actual || '(No Output)') : 'Run code to see output'}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Submission Status</h2>
              <button 
                className="btn" 
                onClick={() => setShowSubmitModal(false)}
                style={{ padding: '0.2rem 0.5rem' }}
              >
                <X size={18} />
              </button>
            </div>

            {isSubmitting && (
              <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Loader size={36} className="spinner" color="var(--accent-primary)" />
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                  Judging submission... Evaluating all {question.testcases.length} test cases.
                </p>
              </div>
            )}

            {!isSubmitting && submitResults && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {submitResults.compileError ? (
                  <>
                    <AlertTriangle size={48} color="var(--fail)" />
                    <h2 style={{ color: 'var(--fail)' }}>Compile Error</h2>
                    <div className="terminal-box" style={{ width: '100%', textAlign: 'left', marginTop: '0.5rem' }}>
                      {submitResults.compileError}
                    </div>
                  </>
                ) : submitResults.passedAll ? (
                  <>
                    <CheckCircle size={56} color="var(--success)" />
                    <h2 style={{ color: 'var(--success)', fontSize: '2rem' }}>Accepted</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                      Passed all <strong>{submitResults.passCount} / {submitResults.totalCount}</strong> test cases!
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle size={56} color="var(--fail)" />
                    <h2 style={{ color: 'var(--fail)', fontSize: '2rem' }}>Wrong Answer</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                      Passed <strong>{submitResults.passCount} / {submitResults.totalCount}</strong> test cases.
                    </p>
                  </>
                )}

                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowSubmitModal(false)}
                  style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
