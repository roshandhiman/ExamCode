import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Code2, Copy, Check, ChevronDown, ChevronRight, 
  AlertTriangle, Lightbulb, Star, Terminal, Layers, ArrowRight, 
  Sparkles, ShieldCheck, CheckCircle2, Search, Play, Award, Zap
} from 'lucide-react';

export default function OopNotes() {
  const [activeTab, setActiveTab] = useState('part1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', color: '#fff', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255, 161, 22, 0.08) 0%, rgba(26, 26, 26, 0) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 161, 22, 0.15)',
            border: '1px solid rgba(255, 161, 22, 0.35)',
            borderRadius: '999px',
            padding: '0.35rem 1rem',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--accent-primary)',
            marginBottom: '1rem'
          }}>
            <Sparkles size={16} /> EXAM-ORIENTED MASTER NOTES
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '0.8rem' }}>
            Java Object-Oriented Programming (<span style={{ color: 'var(--accent-primary)' }}>OOP</span>) Notes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Meaning → Syntax → Code Examples → ⚠️ Exam Traps → Real TestPad Coding Questions.
            Complete 3-Part revision designed specifically for End-Term and Lab Evaluation exams.
          </p>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => setActiveTab('part1')}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === 'part1' ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: activeTab === 'part1' ? '#000' : '#fff',
                border: activeTab === 'part1' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
              }}
            >
              <Layers size={18} /> Part 1: Classes & Methods
            </button>

            <button
              onClick={() => setActiveTab('part2')}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === 'part2' ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: activeTab === 'part2' ? '#000' : '#fff',
                border: activeTab === 'part2' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
              }}
            >
              <Zap size={18} /> Part 2: Inheritance & Polymorphism
            </button>

            <button
              onClick={() => setActiveTab('part3')}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === 'part3' ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: activeTab === 'part3' ? '#000' : '#fff',
                border: activeTab === 'part3' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
              }}
            >
              <ShieldCheck size={18} /> Part 3: Abstract & Interfaces
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: activeTab === 'practice' ? '#10b981' : 'var(--bg-card)',
                color: activeTab === 'practice' ? '#000' : '#fff',
                border: activeTab === 'practice' ? '1px solid #10b981' : '1px solid var(--border-color)'
              }}
            >
              <Terminal size={18} /> 💻 10 Practice Coding Questions
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1080px', margin: '2rem auto', padding: '0 1.5rem' }}>

        {/* ===================== PART 1 ===================== */}
        {activeTab === 'part1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 161, 22, 0.1) 0%, rgba(255, 87, 34, 0.05) 100%)',
              border: '1px solid rgba(255, 161, 22, 0.3)',
              borderRadius: '12px',
              padding: '1.5rem 1.8rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>Part 1:</span> Classes, Objects, Constructors, this, Encapsulation & Static
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Foundational building blocks of OOP. Covers instance memory, constructor overloading, shadowing resolution with <code>this</code>, and encapsulation access control.
              </p>
            </div>

            {/* Topic 1 & 2 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  1. Class & 2. Object (Instance of Class)
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /> High Yield
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                <strong>Class:</strong> Ek blueprint/template hoti hai jisme data members (variables) aur methods define hote hain. Class banane se memory allocate nahi hoti.<br/>
                <strong>Object:</strong> Class ka actual instance hota hai jo memory (Heap) consume karta hai.
              </p>
              
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Student {
    String name;  // Data Member / Instance Variable
    int marks;

    void display() {
        System.out.println(name + " " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student(); // Object creation in Heap
        s.name = "Rahul";
        s.marks = 90;
        s.display(); // Output: Rahul 90
    }
}`}
                </pre>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <AlertTriangle size={16} /> ⚠️ EXAM TRAP: Reference vs Object
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5' }}>
                  <code>Student s;</code> ➔ Sirf <strong>reference variable</strong> bana hai (points to null). Object create nahi hua!<br/>
                  <code>Student s = new Student();</code> ➔ <code>new</code> keyword se Heap mein actual memory allocate hui hai.
                </p>
              </div>
            </div>

            {/* Topic 3 & 4 */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                3. Instance Variables & 4. Methods
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                Har object ke paas apni unique copy hoti hai instance variables ki. Ek object ka data change karne se doosra object affect nahi hota.
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`Student s1 = new Student();
Student s2 = new Student();
s1.name = "Raj";
s2.name = "Aman";
// s1.name aur s2.name alag alag memory locations par hain!`}
                </pre>
              </div>
            </div>

            {/* Topic 5, 6, 7, 8: Constructors */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  5–8. Constructors (Default, Parameterized & Overloading)
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /> Core 5-Star
                </span>
              </div>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginBottom: '1rem', lineHeight: '1.7' }}>
                <li><strong>Purpose:</strong> Object ko initialize karna.</li>
                <li><strong>Rule 1:</strong> Constructor ka naam class name ke exactly same hota hai.</li>
                <li><strong>Rule 2:</strong> Iska koi return type nahi hota (even <code>void</code> bhi nahi).</li>
                <li><strong>Rule 3:</strong> <code>new</code> se object bante hi automatically execute hota hai.</li>
              </ul>

              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Student {
    String name;
    int marks;

    // 1. Default / No-arg Constructor
    Student() {
        name = "Unknown";
        marks = 0;
    }

    // 2. Parameterized Constructor
    Student(String name) {
        this.name = name;
        this.marks = 0;
    }

    // 3. Overloaded Constructor with 2 parameters
    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}`}
                </pre>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <AlertTriangle size={16} /> ⚠️ EXAM TRAP: Lost Default Constructor
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5' }}>
                  Agar aapne class mein <strong>koi bhi parameterized constructor</strong> likh diya, toh Java ka compiler automatically default <code>Student()</code> provide <strong>nahi</strong> karega!<br/>
                  Aise case mein agar aap <code>new Student()</code> call karoge toh compile-time error aayega jab tak aap explicitly no-arg constructor na likho.
                </p>
              </div>
            </div>

            {/* Topic 9 & 10: this and this() */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  9. <code>this</code> Keyword & 10. <code>this()</code> Constructor Chaining
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" />
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                <code>this</code> current object ke instance variable aur parameter ke beech name shadowing ko resolve karta hai.<br/>
                <code>this()</code> ek constructor se same class ke doosre constructor ko call karne ke liye use hota hai.
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Student {
    String name;
    int marks;

    Student() {
        this("Unknown", 0); // Calls parameterized constructor
    }

    Student(String name, int marks) {
        this.name = name;   // this.name is instance variable; name is parameter
        this.marks = marks;
    }
}`}
                </pre>
              </div>
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <Lightbulb size={16} /> 💡 Golden Rule for this()
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#fef08a' }}>
                  <code>this()</code> constructor ke andar <strong>FIRST STATEMENT</strong> hona mandatory hai! Agar aap <code>System.out.println()</code> ke baad <code>this()</code> likhoge toh compilation error aayega.
                </p>
              </div>
            </div>

            {/* Topic 11, 12, 13: Encapsulation & Access Modifiers */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                11–13. Encapsulation, Getters/Setters & Access Modifiers
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Data ko direct unauthorised access se protect karna. Instance variables ko <code>private</code> banao aur validation ke saath public <code>getXXX()</code> / <code>setXXX()</code> methods provide karo.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1.2rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#1f1f23', borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '0.75rem', color: 'var(--accent-primary)' }}>Modifier</th>
                      <th style={{ padding: '0.75rem' }}>Same Class</th>
                      <th style={{ padding: '0.75rem' }}>Same Package</th>
                      <th style={{ padding: '0.75rem' }}>Subclass (Inherited)</th>
                      <th style={{ padding: '0.75rem' }}>Everywhere</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}><code>private</code></td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}><code>default</code></td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}><code>protected</code></td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ No</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}><code>public</code></td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Topic 14 & 15: Static & Method Overloading */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                14. Static Members & 15. Method Overloading (Compile-time Polymorphism)
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                <strong>Static:</strong> Class level variable/method. Object banaye bina <code>ClassName.member</code> se access hota hai aur saare objects ke beech single copy share hoti hai.<br/>
                <strong>Method Overloading:</strong> Same method name but <strong>different parameter list</strong> (count, types, ya order).
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Calculator {
    // Overloaded by parameter count & type
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    double add(double a, double b) { return a + b; }
}`}
                </pre>
              </div>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <AlertTriangle size={16} /> ⚠️ EXAM TRAP: Return Type Alone Is Invalid Overloading!
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5' }}>
                  <code>int add(int a, int b)</code> aur <code>double add(int a, int b)</code> ➔ <strong>COMPILE-TIME ERROR!</strong><br/>
                  Sirf return type badalne se overloading nahi hoti. Parameters mein difference hona zaroori hai.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ===================== PART 2 ===================== */}
        {activeTab === 'part2' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(255, 161, 22, 0.05) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              borderRadius: '12px',
              padding: '1.5rem 1.8rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--accent-primary)' }}>Part 2:</span> Inheritance, Method Overriding, Runtime Polymorphism & <code>super</code>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                The core of object hierarchies in Java. Explains <code>extends</code>, dynamic method dispatch, upcasting/downcasting, constructor chaining, and final modifiers.
              </p>
            </div>

            {/* Inheritance Types */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                1–5. Inheritance Types & Why Multiple Inheritance is Blocked for Classes
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Child class <code>extends</code> keyword ke zariye parent class ke non-private fields aur methods ko reuse karti hai.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>Single Inheritance</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><code>A ➔ B</code> (Ek parent, ek child)</p>
                </div>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>Multilevel Inheritance</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><code>Animal ➔ Dog ➔ Puppy</code> (Chain structure)</p>
                </div>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>Hierarchical Inheritance</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><code>Animal ➔ Dog</code> and <code>Animal ➔ Cat</code></p>
                </div>
              </div>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#ef4444' }}>⚠️ Multiple Inheritance With Classes: ❌ NOT ALLOWED!</strong>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5', marginTop: '0.2rem' }}>
                  <code>class C extends A, B</code> Java mein error deta hai (Diamond Problem). Isko Java <strong>Interfaces</strong> ke zariye solve karta hai.
                </p>
              </div>
            </div>

            {/* Method Overriding & Runtime Polymorphism */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  6–8. Method Overriding & Runtime Polymorphism (Dynamic Dispatch)
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" />
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                Jab Child class apne Parent class ke method ko <strong>same name aur same parameters</strong> ke saath naye tareeqe se redefine karti hai, use <strong>Method Overriding</strong> kehte hain.<br/>
                Java mein <strong>Runtime Polymorphism</strong> tab hota hai jab Parent reference variable Child class ke object ko point karta hai:
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Bark"); }
}
class Cat extends Animal {
    void sound() { System.out.println("Meow"); }
}

public class Main {
    public static void main(String[] args) {
        Animal a;
        a = new Dog(); // Upcasting
        a.sound();     // Prints "Bark" (Dynamic dispatch at runtime!)

        a = new Cat();
        a.sound();     // Prints "Meow"
    }
}`}
                </pre>
              </div>

              {/* Overloading vs Overriding Comparison */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#1f1f23', borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '0.75rem', color: 'var(--accent-primary)' }}>Feature</th>
                      <th style={{ padding: '0.75rem' }}>Method Overloading</th>
                      <th style={{ padding: '0.75rem' }}>Method Overriding</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Scope</td>
                      <td style={{ padding: '0.75rem' }}>Same class</td>
                      <td style={{ padding: '0.75rem' }}>Parent & Child classes</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Parameters</td>
                      <td style={{ padding: '0.75rem' }}>Must be DIFFERENT</td>
                      <td style={{ padding: '0.75rem' }}>Must be EXACTLY SAME</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Resolution</td>
                      <td style={{ padding: '0.75rem', color: '#60a5fa' }}>Compile-time (Static)</td>
                      <td style={{ padding: '0.75rem', color: '#34d399' }}>Runtime (Dynamic)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcasting, Downcasting & instanceof */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                9–11. Upcasting, Downcasting & <code>instanceof</code>
              </h3>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginBottom: '1rem', lineHeight: '1.7' }}>
                <li><strong>Upcasting (Safe):</strong> <code>Animal a = new Dog();</code> Child object ko parent reference assign karna. Always allowed.</li>
                <li><strong>Downcasting (Explicit):</strong> <code>Dog d = (Dog)a;</code> Parent reference ko child reference mein convert karna.</li>
                <li><strong>ClassCastException:</strong> Agar actual object <code>Cat</code> tha aur aapne <code>(Dog)a</code> kiya toh runtime exception aayega!</li>
                <li><strong>instanceof:</strong> <code>if (a instanceof Dog)</code> downcast se pehle check karna safety best practice hai.</li>
              </ul>
            </div>

            {/* super Keyword Deep Dive */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  12–16. <code>super</code> Keyword (Fields, Methods & Constructors)
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" />
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>1. super.variable</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Parent class ka shadowed variable access karta hai: <code>super.x</code></p>
                </div>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>2. super.method()</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Child ke andar se overridden parent method invoke karta hai: <code>super.sound()</code></p>
                </div>
                <div style={{ background: '#1c1c20', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>3. super(...)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Parent constructor ko call karta hai. Must be <strong>FIRST STATEMENT</strong> in child constructor!</p>
                </div>
              </div>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`class Employee {
    String name;
    double salary;
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}
class Manager extends Employee {
    Manager(String name, double salary) {
        super(name, salary); // Chains to Employee constructor
    }
}`}
                </pre>
              </div>
            </div>

            {/* Final and Object class */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                18. <code>final</code> Keyword & 19–20. <code>Object</code> Class (toString, equals)
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                <strong>final variable:</strong> Constant ban jata hai, reassignment not allowed.<br/>
                <strong>final method:</strong> Child class isko <code>@Override</code> nahi kar sakti.<br/>
                <strong>final class:</strong> Is class ko koi doosri class <code>extends</code> nahi kar sakti.<br/>
                <strong>toString():</strong> Har class implicitly <code>java.lang.Object</code> se inherit karti hai. <code>toString()</code> override karne se object print karte waqt hashcode ki jagah clean format aata hai.
              </p>
            </div>

          </div>
        )}

        {/* ===================== PART 3 ===================== */}
        {activeTab === 'part3' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '1.5rem 1.8rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: '#10b981' }}>Part 3:</span> Abstract Classes, Interfaces & Combined Exam Patterns
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                The most heavily tested area in university lab and end-term exams. Covers pure abstraction, interface contracts, multiple interfaces, and exam traps.
              </p>
            </div>

            {/* Abstract Class Deep Dive */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  1–6. Abstract Classes & Abstract Methods
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" />
                </span>
              </div>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', marginBottom: '1rem', lineHeight: '1.7' }}>
                <li><strong>Abstract Class:</strong> Jiska direct object <code>new Animal()</code> ❌ create nahi ho sakta. Common structure provide karne ke liye hoti hai.</li>
                <li><strong>Abstract Method:</strong> Method with NO BODY (<code>abstract void sound();</code>). Har concrete child ko isko implement karna padega.</li>
                <li><strong>Normal Members:</strong> Abstract class mein normal variables, normal implemented methods, static members, aur <strong>constructors</strong> bhi ho sakte hain!</li>
                <li><strong>Reference:</strong> <code>Animal a = new Dog();</code> ✅ 100% allowed hai (Reference is of Abstract class, Object is of Child class).</li>
              </ul>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`abstract class Animal {
    String name;
    Animal(String name) { this.name = name; } // Constructor allowed!

    abstract void sound(); // Must be implemented by child

    void eat() {
        System.out.println(name + " is eating"); // Concrete method allowed!
    }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    void sound() { System.out.println("Bark"); }
}`}
                </pre>
              </div>
            </div>

            {/* Interfaces Deep Dive */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  7–14. Interfaces, <code>implements</code>, Variables & Multiple Interfaces
                </h3>
                <span style={{ color: '#eab308', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem' }}>
                  <Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" /><Star size={15} fill="#eab308" />
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
                Interface ek pure contract hai. Classes interface ko <code>implements</code> karti hain. Ek class ek saath multiple interfaces implement kar sakti hai!
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e', marginBottom: '1rem' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
{`interface Camera { void click(); }
interface Music  { void play(); }

// Multiple interfaces implementation
class Smartphone implements Camera, Music {
    // MUST be marked public!
    public void click() { System.out.println("Photo clicked"); }
    public void play()  { System.out.println("Song playing"); }
}`}
                </pre>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '0.8rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <strong style={{ color: '#ef4444' }}>⚠️ CRITICAL TRAP: Interface Methods MUST Be Implemented as <code>public</code>!</strong>
                <p style={{ fontSize: '0.88rem', color: '#fca5a5', marginTop: '0.2rem' }}>
                  Interface ke methods implicitly <code>public abstract</code> hote hain. Agar implementing class mein aap <code>public</code> likhna bhool gaye (e.g. <code>void click()</code>), toh compiler error dega: <em>"attempting to assign weaker access privileges; was public"</em>!
                </p>
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '0.8rem 1rem', borderRadius: '4px' }}>
                <strong style={{ color: '#60a5fa' }}>💡 Interface Variables Are <code>public static final</code></strong>
                <p style={{ fontSize: '0.88rem', color: '#bfdbfe', marginTop: '0.2rem' }}>
                  <code>interface Test {'{ int X = 10; }'}</code> ➔ Is variable ko class ke bahar modify nahi kiya ja sakta (constant).
                </p>
              </div>
            </div>

            {/* Abstract Class vs Interface Comparison Table */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>
                15. Abstract Class vs Interface (Exam Direct Comparison Table)
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#1f1f23', borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '0.75rem', color: 'var(--accent-primary)' }}>Feature</th>
                      <th style={{ padding: '0.75rem', color: '#f59e0b' }}>Abstract Class</th>
                      <th style={{ padding: '0.75rem', color: '#10b981' }}>Interface</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Keyword</td>
                      <td style={{ padding: '0.75rem' }}><code>abstract class</code></td>
                      <td style={{ padding: '0.75rem' }}><code>interface</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Usage</td>
                      <td style={{ padding: '0.75rem' }}>Class <code>extends</code> karti hai</td>
                      <td style={{ padding: '0.75rem' }}>Class <code>implements</code> karti hai</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Multiple Inheritance</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ Sirf 1 class extend ho sakti hai</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Multiple interfaces implement ho sakte hain</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Constructor</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>✅ Constructor ho sakta hai</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444' }}>❌ Constructor nahi ho sakta</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #2e2e33' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Instance Variables</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>Normal instance variables allowed</td>
                      <td style={{ padding: '0.75rem' }}>Only <code>public static final</code> constants</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>Methods</td>
                      <td style={{ padding: '0.75rem' }}>Abstract + Concrete methods</td>
                      <td style={{ padding: '0.75rem' }}>Abstract, default, & static methods</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7 Most Important Exam Traps */}
            <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} /> 7 Most Dangerous Exam Traps (Direct MCQ / Output Questions)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 1: Instantiating Abstract Class</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>abstract class A {} ➔ A a = new A();</code> ❌ COMPILE ERROR!</p>
                </div>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 2: Missing public on Interface Method</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>class B implements A {'{ void show(){} }'}</code> ❌ Cannot reduce visibility!</p>
                </div>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 3: Multiple Class Extension</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>class C extends A, B</code> ❌ Multiple inheritance with classes is forbidden!</p>
                </div>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 4: Parent Assigned to Child Reference</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>Dog d = new Animal();</code> ❌ Parent object cannot be directly assigned to child reference!</p>
                </div>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 5: Modifying Interface Variable</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>Test.X = 20;</code> ❌ Interface variables are implicitly <code>final</code>!</p>
                </div>
                <div style={{ background: '#1c1417', padding: '1rem', borderRadius: '8px', border: '1px solid #4a1d24' }}>
                  <strong style={{ color: '#f87171' }}>Trap 6: Interface Reference Polymorphism</strong>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5', marginTop: '0.3rem' }}><code>Payment p = new UPI();</code> ✅ Allowed! Reference determines access, object determines execution.</p>
                </div>
              </div>
            </div>

            {/* Master Combined Question */}
            <div className="card" style={{ border: '1px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  🔥 Master Combined End-Term Question (Abstract + Interface + Polymorphism)
                </h3>
                <span style={{ background: 'rgba(255,161,22,0.15)', color: 'var(--accent-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                  10 Marks Pattern
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.92rem' }}>
                Is pattern mein ek saath <strong>Abstract Class, Constructor Chaining (<code>super</code>), Interface Implementation, Method Overriding, aur Polymorphic References</strong> check hote hain:
              </p>
              <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`interface Taxable {
    double calculateTax();
}

abstract class Employee {
    String name;
    double salary;
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    abstract double calculateSalary();
    void showName() {
        System.out.println(name);
    }
}

class Manager extends Employee implements Taxable {
    double bonus;
    Manager(String name, double salary, double bonus) {
        super(name, salary);
        this.bonus = bonus;
    }
    double calculateSalary() {
        return salary + bonus;
    }
    public double calculateTax() {
        return calculateSalary() * 0.10;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Manager("Rahul", 50000, 10000);
        e.showName();
        System.out.println(e.calculateSalary());

        Taxable t = new Manager("Aman", 40000, 5000);
        System.out.println(t.calculateTax());
    }
}

// Output:
// Rahul
// 60000.0
// 4500.0`}
                </pre>
              </div>
            </div>

          </div>
        )}

        {/* ===================== PRACTICE QUESTIONS ===================== */}
        {activeTab === 'practice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.05) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '1.5rem 1.8rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.4rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Terminal size={24} /> 10 Hand-Picked OOP Exam Practice Questions
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Step-by-step problem statements with sample input/output and complete revealable solutions with logic explanations.
              </p>
            </div>

            {/* Q1 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  Practice Q1: Encapsulated Bank Account with Validation
                </h3>
                <span style={{ fontSize: '0.8rem', background: '#26262b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#a1a1aa' }}>
                  Encapsulation • 5 Marks
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                Create a <code>BankAccount</code> class with private <code>balance</code>. Provide methods <code>deposit(double amount)</code> and <code>withdraw(double amount)</code>. If withdraw amount &gt; balance, print "Insufficient Funds".
              </p>
              <button 
                onClick={() => toggleSolution('pq1')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}
              >
                {revealedSolutions['pq1'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {revealedSolutions['pq1'] ? 'Hide Solution' : 'Reveal Solution & Explanation'}
              </button>
              {revealedSolutions['pq1'] && (
                <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                  <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`class BankAccount {
    private double balance;

    BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Insufficient Funds");
        } else if (amount > 0) {
            balance -= amount;
            System.out.println("Remaining: " + balance);
        }
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Q2 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  Practice Q2: Static Counter & Method Overloading
                </h3>
                <span style={{ fontSize: '0.8rem', background: '#26262b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#a1a1aa' }}>
                  Static & Overloading • 5 Marks
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                Create class <code>Book</code> that tracks the total number of books created using a static counter variable. Include overloaded constructors for title and price.
              </p>
              <button 
                onClick={() => toggleSolution('pq2')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}
              >
                {revealedSolutions['pq2'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {revealedSolutions['pq2'] ? 'Hide Solution' : 'Reveal Solution & Explanation'}
              </button>
              {revealedSolutions['pq2'] && (
                <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                  <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`class Book {
    static int totalBooks = 0;
    String title;
    double price;

    Book(String title) {
        this(title, 0.0);
    }

    Book(String title, double price) {
        this.title = title;
        this.price = price;
        totalBooks++;
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Q3 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  Practice Q3: Multilevel Inheritance with <code>super()</code> Chaining
                </h3>
                <span style={{ fontSize: '0.8rem', background: '#26262b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#a1a1aa' }}>
                  Inheritance • 10 Marks
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                Create hierarchy <code>Person ➔ Employee ➔ Manager</code> where each constructor invokes its parent constructor using <code>super(...)</code> and prints full details.
              </p>
              <button 
                onClick={() => toggleSolution('pq3')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}
              >
                {revealedSolutions['pq3'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {revealedSolutions['pq3'] ? 'Hide Solution' : 'Reveal Solution & Explanation'}
              </button>
              {revealedSolutions['pq3'] && (
                <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                  <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`class Person {
    String name;
    Person(String name) { this.name = name; }
}

class Employee extends Person {
    int id;
    Employee(String name, int id) {
        super(name);
        this.id = id;
    }
}

class Manager extends Employee {
    String department;
    Manager(String name, int id, String department) {
        super(name, id);
        this.department = department;
    }
    void show() {
        System.out.println(name + " " + id + " " + department);
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Q4 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  Practice Q4: Dynamic Method Dispatch (Payment Gateway)
                </h3>
                <span style={{ fontSize: '0.8rem', background: '#26262b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#a1a1aa' }}>
                  Polymorphism • 10 Marks
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                Create interface <code>Payment</code> with method <code>void pay(double amount)</code>. Implement <code>UPIPayment</code> and <code>CardPayment</code>. Demonstrate polymorphic call using user input.
              </p>
              <button 
                onClick={() => toggleSolution('pq4')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}
              >
                {revealedSolutions['pq4'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {revealedSolutions['pq4'] ? 'Hide Solution' : 'Reveal Solution & Explanation'}
              </button>
              {revealedSolutions['pq4'] && (
                <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                  <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`interface Payment {
    void pay(double amount);
}

class UPIPayment implements Payment {
    public void pay(double amount) {
        System.out.println("UPI Payment: " + amount);
    }
}

class CardPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Card Payment: " + amount);
    }
}

public class Main {
    static void process(String type, double amount) {
        Payment p = type.equalsIgnoreCase("UPI") ? new UPIPayment() : new CardPayment();
        p.pay(amount); // Polymorphic invocation
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Q5 */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  Practice Q5: Abstract Class with Default and Abstract Methods
                </h3>
                <span style={{ fontSize: '0.8rem', background: '#26262b', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#a1a1aa' }}>
                  Abstract Class • 10 Marks
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                Create an abstract class <code>Vehicle</code> with an abstract method <code>maxSpeed()</code> and a concrete method <code>fuelType()</code>. Extend it with <code>ElectricCar</code>.
              </p>
              <button 
                onClick={() => toggleSolution('pq5')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem' }}
              >
                {revealedSolutions['pq5'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {revealedSolutions['pq5'] ? 'Hide Solution' : 'Reveal Solution & Explanation'}
              </button>
              {revealedSolutions['pq5'] && (
                <div style={{ background: '#141416', borderRadius: '8px', padding: '1rem', border: '1px solid #2a2a2e' }}>
                  <pre style={{ color: '#a5f3fc', fontFamily: 'monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
{`abstract class Vehicle {
    abstract int maxSpeed();
    void fuelType() {
        System.out.println("Standard Fuel");
    }
}

class ElectricCar extends Vehicle {
    int maxSpeed() { return 180; }
    void fuelType() {
        System.out.println("Battery Electric");
    }
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Link to Practice in Editor */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/paper/sample-paper-3" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.6rem', fontSize: '1rem' }}>
                <Play size={18} fill="#000" /> Start Solving Practice Test Paper 3 (15 Coding + 30 MCQs)
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
