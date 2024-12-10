
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId, should be fetched or passed from signup
//   const [quizCompleted, setQuizCompleted] = useState(false); // To track if the quiz is completed

//   // Fetch questions on component mount
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/quiz/questions');
//         setQuestions(response.data);
//       } catch (err) {
//         console.error('Error fetching questions', err);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleNextQuestion = async () => {
//     if (selectedOption === null) {
//       alert('Please select an option before moving to the next question');
//       return;
//     }

//     // Get the current question
//     const currentQuestion = questions[currentQuestionIndex];

//     // Prepare data to send to backend
//     const responseData = {
//       questionId: currentQuestion._id,  // Use the questionId from the current question
//       selectedOption: selectedOption,
//       userId: userId,  // The user's ID
//     };

//     // Send the response to the backend
//     try {
//       await axios.post('http://127.0.0.1:5000/api/quiz/responses', responseData);
//       console.log('Response submitted successfully');
//     } catch (err) {
//       console.error('Error submitting response', err);
//     }

//     // Proceed to the next question
//     const nextIndex = currentQuestionIndex + 1;
    
//     if (nextIndex < questions.length) {
//       setCurrentQuestionIndex(nextIndex);
//       setSelectedOption(null); // Reset selected option
//     } else {
//       // Quiz is completed
//       setQuizCompleted(true);
//     }
//   };

//   if (questions.length === 0) return <p>Loading questions...</p>;

//   // If the quiz is completed, show the Thank You page
//   if (quizCompleted) {
//     return (
//       <div>
//         <h2>Thank you for completing the quiz!</h2>
//         <p>Your responses have been recorded.</p>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>Question {currentQuestion.number}</h2>
//       <p>{currentQuestion.text}</p>
//       <div>
//         {currentQuestion.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => handleOptionSelect(option)}
//             style={{
//               backgroundColor: selectedOption === option ? 'green' : 'lightgray',
//             }}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleNextQuestion}>Next</button>
//     </div>
//   );
// };

// export default QuizPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId, should be fetched or passed from signup
  const navigate = useNavigate();

  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/quiz/questions');
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions', err);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) {
      alert('Please select an option before moving to the next question');
      return;
    }

    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // Prepare data to send to backend
    const responseData = {
      questionId: currentQuestion._id, // Use the questionId from the current question
      selectedOption: selectedOption,
      userId: userId, // The user's ID
    };

    // Send the response to the backend
    try {
      await axios.post('http://127.0.0.1:5000/api/quiz/responses', responseData);
      console.log('Response submitted successfully');
    } catch (err) {
      console.error('Error submitting response', err);
    }

    // Proceed to the next question
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null); // Reset selected option
  };

  const handleSubmitQuiz = async () => {
    if (selectedOption === null) {
      alert('Please select an option before submitting the quiz');
      return;
    }

    // Submit the last question response
    const currentQuestion = questions[currentQuestionIndex];
    const responseData = {
      questionId: currentQuestion._id,
      selectedOption: selectedOption,
      userId: userId,
    };

    try {
      await axios.post('http://127.0.0.1:5000/api/quiz/responses', responseData);
      console.log('Final response submitted successfully');
    } catch (err) {
      console.error('Error submitting final response', err);
    }

    // Redirect to the results page
    navigate('/view-results');
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div>
      <h2>Question {currentQuestion.number}</h2>
      <p>{currentQuestion.text}</p>
      <div>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            style={{
              backgroundColor: selectedOption === option ? 'green' : 'lightgray',
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {!isLastQuestion ? (
        <button onClick={handleNextQuestion}>Next</button>
      ) : (
        <button onClick={handleSubmitQuiz}>Submit Quiz</button>
      )}
    </div>
  );
};

export default QuizPage;
