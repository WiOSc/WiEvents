import React, { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:7000/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.title}>Leaderboard</h2>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time Taken (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((participant, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{participant.name}</td>
              <td>{participant.timeTaken.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
