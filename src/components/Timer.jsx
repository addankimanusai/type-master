import React from 'react';

function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="stat-box timer-box">
      <span className="stat-label">Timer</span>
      <span className="stat-value timer-value">{displayTime}</span>
    </div>
  );
}

export default Timer;
