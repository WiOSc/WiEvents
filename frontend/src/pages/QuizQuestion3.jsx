import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";

const QuizQuestion3 = () => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === "paris") {
      navigate("/quiz-question-4"); // Go to question 3
    } else {
      setError("Incorrect answer! Try again.");
    }
  };

  return (
      <div className={styles.quizContainer}>
        <div className={styles.quizContent}>
        <h2 className={styles.quizTitle}>Question 3</h2>
        <p className={styles.questionText}>What is the capital of France?</p>
  
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          className={styles.formInput}
          placeholder="Your answer"
        />
  
        <button onClick={toggleHint} className={styles.hintButton}>
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        
        {showHint && <p className={styles.hintText}>It's also called the City of Love ❤️</p>}
  
        {error && <p className={styles.errorText}>{error}</p>}
  
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
        </div>
      </div>
    );
};

export default QuizQuestion3;
