import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './components/Question';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Signup Component
const SignupForm = ({ setUserId }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code) {
      setError('Please provide both name and code');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', { name, code });
      setUserId(response.data.userId);
      // history.push('/quiz'); // Redirect to quiz page
      navigate('/quiz');
    } catch (err) {
      setError('Invalid code or error during signup');
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
        {error && <p>{error}</p>}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

// Quiz App Component
const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userId, setUserId] = useState(null); // Track user ID after signup

  // Fetch questions from backend
  useEffect(() => {
    if (userId) {
      axios.get('http://localhost:5000/api/quiz/questions')
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the questions!', error);
        });
    }
  }, [userId]); // Fetch questions only after user is signed in

  // Handle answer selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  // Submit response
  const handleSubmitAnswer = () => {
    if (selectedOption) {
      const currentQuestion = questions[currentQuestionIndex];

      axios.post('http://localhost:5000/api/quiz/responses', {
        questionId: currentQuestion._id,
        selectedOption,
        userId: userId, // Send actual userId
      })
      .then(() => {
        setSelectedOption(null);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          alert('Quiz complete!');
        }
      })
      .catch((error) => {
        console.error('There was an error submitting the answer!', error);
      });
    } else {
      alert('Please select an answer');
    }
  };

  // If user is not signed up yet, show signup page
  if (!userId) {
    return <SignupForm setUserId={setUserId} />;
  }

  // If questions are loaded, show the quiz
  return (
    <div className="App">
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        <div>
          <Question
            question={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectOption}
          />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default App;
