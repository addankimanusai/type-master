import React from 'react';
import { getHistory } from '../utils/storage';

function ProgressDashboard() {
  const history = getHistory();
  
  if (history.length === 0) {
    return (
      <div className="dashboard-screen empty-state">
        <h2>MY PROGRESS</h2>
        <p>No practice sessions yet.</p>
        <p>Complete your first session to start tracking your progress.</p>
      </div>
    );
  }

  // WPM Chart data prep
  const reversedHistory = [...history].reverse().slice(-10); // Last 10 sessions for chart
  const maxWPM = Math.max(...reversedHistory.map(h => h.wpm), 50);
  const chartHeight = 200;
  
  return (
    <div className="dashboard-screen">
      <h2>MY PROGRESS</h2>
      
      <div className="dashboard-stats">
        <div className="stat-box highlight-box">
          <span>Total Sessions</span>
          <strong>{history.length}</strong>
        </div>
        <div className="stat-box highlight-box">
          <span>Best WPM</span>
          <strong>{Math.max(...history.map(h => h.wpm))}</strong>
        </div>
        <div className="stat-box highlight-box">
          <span>Total Keys</span>
          <strong>{history.reduce((sum, h) => sum + h.keysPressed, 0)}</strong>
        </div>
      </div>

      <div className="chart-container">
        <h3>WPM History (Last 10 sessions)</h3>
        <div className="wpm-chart" style={{ height: `${chartHeight}px` }}>
          {reversedHistory.map((session, i) => {
            const heightPct = (session.wpm / maxWPM) * 100;
            return (
              <div key={session.id || i} className="chart-bar-wrapper">
                <div className="chart-bar-value">{session.wpm}</div>
                <div 
                  className="chart-bar" 
                  style={{ height: `${heightPct}%` }}
                  title={`${session.wpm} WPM`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;
