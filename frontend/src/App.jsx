import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";

import Quiz from "./pages/Quiz";
import LeaderBoard from "./pages/LeaderBoard";
import QuizQuestion1 from "./pages/QuizQuestion1";
import QuizQuestion2 from "./pages/QuizQuestion2";
import QuizQuestion3 from "./pages/QuizQuestion3";
import QuizQuestion4 from "./pages/QuizQuestion4";
import QuizQuestion5 from "./pages/QuizQuestion5";
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
        <Route path="/quiz-question-3" element={<QuizQuestion3 />} />
        <Route path="/quiz-question-4" element={<QuizQuestion4 />} />
        <Route path="/quiz-question-5" element={<QuizQuestion5 />} />
      </Routes>
    </div>
)
};

export default App;