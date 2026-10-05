import React from 'react';
import Timer from './Timer';
import { calculateAccuracy } from '../utils/calculations';

function Statistics({ timeLeft, keysPressed, correctKeys, wrongKeys, currentWPM }) {
  const accuracy = calculateAccuracy(correctKeys, keysPressed).toFixed(1);

  return (
    <div className="statistics-bar">
      <Timer timeLeft={timeLeft} />
      
      <div className="stat-box">
        <span className="stat-label">WPM</span>
        <span className="stat-value">{currentWPM}</span>
      </div>

      <div className="stat-box">
        <span className="stat-label">Accuracy</span>
        <span className="stat-value">{accuracy}%</span>
      </div>
      
      <div className="stat-box">
        <span className="stat-label">Keys</span>
        <span className="stat-value">{keysPressed}</span>
      </div>
    </div>
  );
}

export default Statistics;
