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
      const participantId = localStorage.getItem("participantId"); // Retrieve stored ID
    if (!participantId) {
      setError("No participant ID found. Please restart the quiz.");
      return;
    }

      // Get current time
      const endTime = new Date().toISOString();

      try {
        // Send PATCH request to update participant's endTime
        const response = await fetch(`http://localhost:7000/participant/${participantId}`, { 
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endTime }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update endTime");
        }
  
        // Navigate to home or leaderboard after updating
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
          <div className={styles.quizContent}>
          <h2 className={styles.quizTitle}>Question 5</h2>
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

export default QuizQuestion5;
