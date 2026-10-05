import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import PracticeScreen from './components/PracticeScreen';
import ResultScreen from './components/ResultScreen';
import AchievementToast from './components/AchievementToast';
import ProgressDashboard from './components/ProgressDashboard';
import Settings from './components/Settings';
import LessonsList from './components/LessonsList';
import KeyboardGuide from './components/KeyboardGuide';
import { useTypingGame } from './hooks/useTypingGame';
import { getTheme, saveTheme } from './utils/storage';
import './App.css';

function App() {
  const [theme, setTheme] = useState(getTheme());
  const [currentView, setCurrentView] = useState('home');
  
  const {
    gameStatus,
    currentKey,
    timeLeft,
    totalTime,
    elapsedSeconds,
    keysPressed,
    correctKeys,
    wrongKeys,
    currentWPM,
    targetSequence,
    targetIndex,
    activeLessonId,
    setActiveLessonId,
    allowedKeys,
    lastResult,
    feedback,
    mode,
    setMode,
    customKeys,
    setCustomKeys,
    unlockedAchievements,
    setUnlockedAchievements,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    resetAfterComplete
  } = useTypingGame();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} currentView={currentView} setCurrentView={setCurrentView} setActiveLessonId={setActiveLessonId} />
      
      <main className="main-content">
        {currentView === 'dashboard' ? (
          <ProgressDashboard />
        ) : currentView === 'settings' ? (
          <Settings />
        ) : currentView === 'lessons' ? (
          <LessonsList setActiveLessonId={setActiveLessonId} setCurrentView={setCurrentView} startGame={startGame} />
        ) : currentView === 'guide' ? (
          <KeyboardGuide />
        ) : (
          <>
            {gameStatus === 'idle' && (
              <StartScreen 
                startGame={startGame} 
                mode={mode} 
                setMode={setMode} 
                customKeys={customKeys}
                setCustomKeys={setCustomKeys}
              />
            )}
            
            {(gameStatus === 'running' || gameStatus === 'paused') && (
              <PracticeScreen 
                gameStatus={gameStatus}
                timeLeft={timeLeft}
                totalTime={totalTime}
                elapsedSeconds={elapsedSeconds}
                keysPressed={keysPressed}
                correctKeys={correctKeys}
                wrongKeys={wrongKeys}
                currentWPM={currentWPM}
                currentKey={currentKey}
                targetSequence={targetSequence}
                targetIndex={targetIndex}
                activeLessonId={activeLessonId}
                allowedKeys={allowedKeys}
                feedback={feedback}
                pauseGame={pauseGame}
                resumeGame={resumeGame}
                restartGame={restartGame}
              />
            )}
            
            {gameStatus === 'finished' && (
              <ResultScreen 
                result={lastResult} 
                restartGame={resetAfterComplete} 
              />
            )}
          </>
        )}
      </main>

      <AchievementToast 
        achievements={unlockedAchievements} 
        setAchievements={setUnlockedAchievements} 
      />
    </div>
  );
}

export default App;
