import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ScenariosPage from './pages/ScenariosPage';
import PracticePage from './pages/PracticePage';
import ProfilePage from './pages/ProfilePage';
import { UserProgress } from './types';

function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalXP: 0,
    streak: 0,
    level: 1,
    completedScenarios: [],
    achievements: [],
    dailyGoal: 50,
    todayXP: 0,
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('tansanProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tansanProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const addXP = (xp: number) => {
    setUserProgress((prev) => {
      const newTotalXP = prev.totalXP + xp;
      const newTodayXP = prev.todayXP + xp;
      const newLevel = Math.floor(newTotalXP / 500) + 1;

      return {
        ...prev,
        totalXP: newTotalXP,
        todayXP: newTodayXP,
        level: newLevel,
      };
    });
  };

  const completeScenario = (scenarioId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      completedScenarios: [...new Set([...prev.completedScenarios, scenarioId])],
    }));
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Header userProgress={userProgress} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scenarios" element={<ScenariosPage userProgress={userProgress} />} />
          <Route
            path="/practice/:scenarioId"
            element={
              <PracticePage
                addXP={addXP}
                completeScenario={completeScenario}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage userProgress={userProgress} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
