import React, { useState } from "react";

const App = () => {
  // Quiz questions, answers, and hints
  const questions = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      hint: "It's known as the 'City of Light'.",
    },
    {
      question: "What is 2 + 2?",
      answer: "4",
      hint: "It's a single-digit number.",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "Harper Lee",
      hint: "The author's first name starts with 'H'.",
    },
  ];

  // State to track the current question, user input, and hints
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  // State for name input and quiz start
  const [name, setName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  // Handle name submission
  const handleNameSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the name to the backend
      const response = await fetch("http://localhost:7000/participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        // Start the quiz if the name is successfully submitted
        setQuizStarted(true);
      } else {
        alert("Failed to submit name. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting name:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      alert("Correct! Moving to the next question.");
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowHint(false);
    } else {
      alert("Incorrect! Try again.");
    }
  };

  // Handle hint button click
  const handleHint = () => {
    setShowHint(true);
  };

  // Render the name input form or the quiz
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      {!quizStarted ? (
        <form onSubmit={handleNameSubmit}>
          <h1>Enter Your Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{ padding: "10px", marginRight: "10px" }}
            required
          />
          <button type="submit" style={{ padding: "10px" }}>
            Start Quiz
          </button>
        </form>
      ) : (
        <>
          {currentQuestionIndex < questions.length ? (
            <>
              <h1>Question {currentQuestionIndex + 1}</h1>
              <p>{questions[currentQuestionIndex].question}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer"
                style={{ padding: "10px", marginRight: "10px" }}
              />
              <button onClick={handleSubmit} style={{ padding: "10px", marginRight: "10px" }}>
                Submit
              </button>
              <button onClick={handleHint} style={{ padding: "10px" }}>
                Hint
              </button>
              {showHint && <p style={{ color: "gray" }}>{questions[currentQuestionIndex].hint}</p>}
            </>
          ) : (
            <h1>Congratulations! You've completed the quiz.</h1>
          )}
        </>
      )}
    </div>
  );
};

export default App;