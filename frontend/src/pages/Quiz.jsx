import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [newParticipant, setNewParticipant] = useState({
    name: ""
  });
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewParticipant({
      ...newParticipant,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const startTime = new Date().toISOString();
    console.log("Participant Name:", newParticipant.name);
    console.log("Start Time:", startTime);

    try {
      const response = await fetch("/participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: newParticipant.name,
          startTime: startTime
         }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit participant: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      if (!data._id) {
        throw new Error("Participant ID (_id) is missing from the response");
      } 
      localStorage.setItem("participantId", data._id);
      console.log("Stored participantId:", localStorage.getItem("participantId"));

      navigate("/quiz-question-1");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error submitting participant: ${error.message}`);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Your time will start as soon as you press on start</h2>
      <form className={styles.quizForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newParticipant.name}
            onChange={handleInputChange}
            required
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Start the Event!
        </button>
      </form>
    </div>
  );
};

export default Quiz;
