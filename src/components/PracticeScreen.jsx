import React from 'react';
import Statistics from './Statistics';
import TypingArea from './TypingArea';
import FingerGuide from './FingerGuide';
import ProgressBar from './ProgressBar';
import { MdPause, MdPlayArrow, MdRefresh } from 'react-icons/md';

function PracticeScreen({ 
  gameStatus, 
  timeLeft, 
  totalTime,
  elapsedSeconds,
  keysPressed, 
  correctKeys, 
  wrongKeys,
  currentWPM,
  currentKey,
  targetSequence,
  targetIndex,
  activeLessonId,
  allowedKeys,
  feedback,
  pauseGame,
  resumeGame,
  restartGame
}) {
  return (
    <div className="practice-screen">
      <ProgressBar elapsedSeconds={elapsedSeconds} totalTime={totalTime} />
      
      <Statistics 
        timeLeft={timeLeft} 
        keysPressed={keysPressed} 
        correctKeys={correctKeys} 
        wrongKeys={wrongKeys}
        currentWPM={currentWPM}
      />
      
      <TypingArea 
        currentKey={currentKey} 
        targetSequence={targetSequence}
        targetIndex={targetIndex}
        activeLessonId={activeLessonId}
        allowedKeys={allowedKeys}
        feedback={feedback} 
      />

      <div className="controls">
        {gameStatus === 'running' ? (
          <button className="control-btn" onClick={pauseGame}>
            <MdPause /> PAUSE
          </button>
        ) : (
          <button className="control-btn resume-btn" onClick={resumeGame}>
            <MdPlayArrow /> RESUME
          </button>
        )}
        <button className="control-btn restart-btn" onClick={restartGame}>
          <MdRefresh /> RESTART
        </button>
      </div>

      <FingerGuide />
      
      {gameStatus === 'paused' && (
        <div className="pause-overlay">
          <h2>PAUSED</h2>
          <button className="primary-btn" onClick={resumeGame}>
            RESUME PRACTICE
          </button>
        </div>
      )}
    </div>
  );
}

export default PracticeScreen;
