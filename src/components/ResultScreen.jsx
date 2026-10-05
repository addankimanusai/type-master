import React from 'react';
import PracticeHistory from './PracticeHistory';
import { generateRecommendations, generateNextGoal, getWeakKeys } from '../utils/adaptivePractice';

function ResultScreen({ result, restartGame }) {
  if (!result) return null;
  
  const weakKeys = getWeakKeys(result.keyPerformance || {});
  const recommendation = generateRecommendations(result.keyPerformance || {}, result.wpm, result.accuracy);
  const nextGoal = generateNextGoal(result.wpm, result.accuracy);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  
  // Try to determine total time from elapsed or fallback to mode duration if not logged 
  // (In our result object, we only have WPM which implies time. Wait, let's just show mode name or format based on mode)
  // Actually, we can add timeTaken to the result object. Let's do that in useTypingGame and read it here.
  // For now, let's infer from mode or just display the mode.
  const timeDisplay = result.timeTaken ? formatTime(result.timeTaken) : (result.mode === 'Speed Mode' ? '1:00' : result.mode === 'Accuracy Mode' ? '2:00' : result.mode === 'Weak Key Practice' ? '3:00' : '5:00');

  const isLesson = !!result.activeLessonId;
  const isCompleted = isLesson && result.accuracy >= 80; // Assuming 80 is the default

  return (
    <div className="result-screen">
      <div className="result-card">
        <h2>{isLesson ? `LESSON ${result.activeLessonId} COMPLETE` : 'PRACTICE COMPLETE'}</h2>
        <h3 className="great-job">
          {isLesson ? (isCompleted ? 'Goal Reached! Next lesson unlocked.' : 'Keep practicing to reach 80% accuracy.') : 'Great job!'}
        </h3>

        <div className="result-stats-grid">
          <div className="result-stat-box">
            <span>Time</span>
            <strong>{timeDisplay}</strong>
          </div>
          <div className="result-stat-box">
            <span>Keys Pressed</span>
            <strong>{result.keysPressed}</strong>
          </div>
          <div className="result-stat-box success-text">
            <span>Correct Keys</span>
            <strong>{result.correctKeys}</strong>
          </div>
          <div className="result-stat-box error-text">
            <span>Mistakes</span>
            <strong>{result.wrongKeys}</strong>
          </div>
          <div className="result-stat-box highlight-box">
            <span>Accuracy</span>
            <strong>{result.accuracy}%</strong>
          </div>
          <div className="result-stat-box highlight-box">
            <span>WPM</span>
            <strong>{result.wpm}</strong>
          </div>
        </div>

        {weakKeys.length > 0 && (
          <div className="weak-keys-section">
            <h4>Weak Keys</h4>
            <div className="weak-keys-list">
              {weakKeys.map(wk => (
                <div key={wk.key} className="weak-key-item">
                  <span className="key-char">{wk.key.toUpperCase()}</span>
                  <span className="key-acc">{Math.round(wk.accuracy)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="recommendation-box">
          <h4>Recommendation</h4>
          <p>{recommendation}</p>
        </div>

        <div className="goal-box">
          <h4>Next Goal</h4>
          <p>{nextGoal}</p>
        </div>

        <div className="result-actions">
          <button className="primary-btn" onClick={restartGame}>
            PRACTICE AGAIN
          </button>
        </div>
      </div>

      <PracticeHistory refreshTrigger={result.keysPressed} />
    </div>
  );
}

export default ResultScreen;
