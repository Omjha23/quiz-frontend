// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !code) {
      setError('Please provide both name and code');
      return;
    }

    try {
      // Make API call to submit the form
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, code });

      // If signup is successful, navigate to the quiz page
      if (response.status === 201) {
        navigate('/questions');
      } else {
        setError('Invalid code or error during signup');
      }
    } catch (err) {
      setError('Error during signup. Please try again.');
      console.error('Signup failed:', err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default SignupForm;
