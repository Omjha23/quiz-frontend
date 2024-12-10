import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';  // Ensure correct path
import App from './App';
import Question from './components/QuizPage';
import ViewResultPage from './components/ViewResultPage';
// Create the root with createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Router and Routes
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/quiz" element={<App />} />
      <Route path="/questions" element={<Question />} /> 
      <Route path="/view-results" element={<ViewResultPage />} />
    </Routes>
  </Router>
);
