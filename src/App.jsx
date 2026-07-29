import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Topics from './pages/Topics';
import QuestionList from './pages/QuestionList';
import Problem from './pages/Problem';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/:language" element={<Topics />} />
          <Route path="/:language/:topic" element={<QuestionList />} />
          <Route path="/:language/:topic/:id" element={<Problem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
