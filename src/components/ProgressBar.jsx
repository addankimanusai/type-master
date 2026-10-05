import React from 'react';

function ProgressBar({ elapsedSeconds, totalTime }) {
  const progress = totalTime > 0 ? (elapsedSeconds / totalTime) * 100 : 0;
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>Practice Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
