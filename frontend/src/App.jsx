import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";

import Quiz from "./pages/Quiz";
import LeaderBoard from "./pages/LeaderBoard";
import QuizQuestion1 from "./pages/QuizQuestion1";
import QuizQuestion2 from "./pages/QuizQuestion2";
import Navbar from "./components/Navbar";

const App = () => {
return(
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/quiz-question-1" element={<QuizQuestion1 />} />
        <Route path="/quiz-question-2" element={<QuizQuestion2 />} />
      </Routes>
    </div>
)
};

export default App;