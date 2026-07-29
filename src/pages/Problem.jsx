import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, XCircle, Loader } from 'lucide-react';
import { questionsData } from '../data/questions';
import { executeCode } from '../services/piston';

export default function Problem() {
  const { language, topic, id } = useParams();
  
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
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

  const handleRun = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      const hasMain = code.includes('public static void main') || code.includes('public static void main(String[]');
      const fullCode = (!hasMain && question.testerCode) ? code + '\\n' + question.testerCode : code;
      const testResults = [];
      let passedAll = true;
      let passCount = 0;

      for (let i = 0; i < question.testcases.length; i++) {
        const tc = question.testcases[i];
        
        const response = await executeCode(language, fullCode, tc.input);
        
        let actualOutput = response.run?.stdout?.trim() || '';
        let errorOutput = false;
        
        if (response.compile?.code !== 0 && response.compile?.stderr) {
          actualOutput = response.compile.stderr.trim();
          errorOutput = true;
        } else if (response.run?.stderr) {
          actualOutput = response.run.stderr.trim();
          errorOutput = true;
        } else if (response.run?.code !== 0) {
           errorOutput = true;
        }

        const isPass = !errorOutput && actualOutput === tc.expectedOutput;
        if (!isPass) passedAll = false;
        else passCount++;

        testResults.push({
          input: tc.input,
          expected: tc.expectedOutput,
          actual: actualOutput,
          pass: isPass,
          error: errorOutput
        });
      }

      setResults({ 
         tests: testResults, 
         passedAll, 
         passCount,
         totalCount: question.testcases.length
      });
    } catch (err) {
      setResults({ error: err.message || 'Execution failed' });
    } finally {
      setIsRunning(false);
    }
  };

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
            <button 
              className="btn btn-primary" 
              onClick={handleRun} 
              disabled={isRunning}
            >
              {isRunning ? <Loader size={16} className="spinner" /> : <Play size={16} />}
              Run Code
            </button>
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
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Test Results
            {results && results.tests && (
              <span style={{ color: results.passedAll ? 'var(--success)' : 'var(--fail)', fontSize: '0.9rem' }}>
                ({results.passCount}/{results.totalCount} Passed)
              </span>
            )}
          </h3>
          
          {!results && !isRunning && (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>
              Run your code to see results here.
            </div>
          )}

          {isRunning && (
            <div style={{ color: 'var(--accent-primary)', textAlign: 'center', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Loader size={20} className="spinner" /> Executing...
            </div>
          )}

          {results?.error && (
            <div style={{ color: 'var(--fail)' }}>
              <strong>Execution Error:</strong> {results.error}
            </div>
          )}

          {results?.tests && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.tests.map((test, idx) => (
                <div key={idx} className="card" style={{ padding: '1rem', borderColor: test.pass ? 'var(--success)' : 'var(--fail)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '600', color: test.pass ? 'var(--success)' : 'var(--fail)' }}>
                    {test.pass ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    Test Case {idx + 1}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Input:</div>
                      <div className="pre-formatted" style={{ marginTop: '0.2rem', padding: '0.5rem' }}>{test.input}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected:</div>
                      <div className="pre-formatted" style={{ marginTop: '0.2rem', padding: '0.5rem' }}>{test.expected}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actual Output:</div>
                    <div className="pre-formatted" style={{ marginTop: '0.2rem', padding: '0.5rem', color: test.error ? 'var(--fail)' : 'inherit' }}>
                      {test.actual || '(No output)'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
