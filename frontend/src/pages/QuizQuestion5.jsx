import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";

const QuizQuestion5 = () => {
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

  const handleSubmit = async () => {
    if (answer.trim().toLowerCase() === "paris") {
      // Show alert
      alert("All answers have been recorded! Ending event...");

      // Get current time
      const endTime = new Date().toISOString();

      try {
        // Send PATCH request to update participant document
        await fetch("/participant", {
          method: "PATCH", // Change from POST to PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endTime }),
        });

        // Navigate back to home or summary page
        navigate("/");
      } catch (error) {
        console.error("Failed to log event end time:", error);
        setError("Error ending event. Please try again.");
      }
    } else {
      setError("Incorrect answer! Try again.");
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Final Question</h2>
      <p className={styles.questionText}>What is the capital of France? (Final Question)</p>

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
        End Event
      </button>
    </div>
  );
};

export default QuizQuestion5;
