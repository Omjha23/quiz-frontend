import React from 'react';

const Question = ({ question, selectedOption, handleSelectOption }) => {
  return (
    <div className="question-container">
      <h2>{`Q${question.number}: ${question.text}`}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="option"
              id={`option-${index}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleSelectOption(option)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
