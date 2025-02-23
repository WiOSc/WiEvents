import React, { useState } from "react";
import styles from "./Quiz.module.css";

const QuizQuestion2 = () => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Question 2</h2>
      <p className={styles.questionText}>What is 5 + 3?</p>

      <input
        type="number"
        value={answer}
        onChange={handleAnswerChange}
        className={styles.formInput}
        placeholder="Your answer"
      />

      <button className={styles.submitButton}>Submit</button>
    </div>
  );
};

export default QuizQuestion2;
