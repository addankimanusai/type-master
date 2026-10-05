import React from 'react';
import { getBestResult } from '../utils/storage';
import PracticeHistory from './PracticeHistory';

function StartScreen({ startGame, mode, setMode, customKeys, setCustomKeys }) {
  const bestResult = getBestResult();

  return (
    <div className="start-screen">
      <div className="welcome-card">
        <h2>Practice all keyboard keys</h2>
        <div className="keys-display">A - Z</div>
        <p>Improve your typing accuracy and speed without looking at your keyboard.</p>
        
        <div className="mode-selector" style={{ margin: '1rem 0' }}>
          <label htmlFor="modeSelect" style={{ marginRight: '1rem', color: 'var(--text-muted)' }}>Practice Mode:</label>
          <select 
            id="modeSelect" 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}
          >
            <option value="5-Minute Test">5-Minute Test</option>
            <option value="Key Practice">Key Practice</option>
            <option value="Accuracy Mode">Accuracy Mode</option>
            <option value="Speed Mode">Speed Mode</option>
            <option value="Weak Key Practice">Weak Key Practice</option>
            <option value="Custom Practice">Custom Practice</option>
          </select>
        </div>

        {mode === 'Custom Practice' && (
          <div className="custom-keys-selector" style={{ margin: '1rem 0', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <label htmlFor="customKeysInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Enter custom keys to practice:</label>
            <input 
              id="customKeysInput"
              type="text" 
              value={customKeys} 
              onChange={(e) => setCustomKeys(e.target.value)} 
              placeholder="e.g. asdf"
              style={{ width: '100%', maxWidth: '300px', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', textAlign: 'center', letterSpacing: '0.2em' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Only these characters will be generated.</p>
          </div>
        )}

        <div className="start-actions">
          <div className="duration-badge">
            <span>DURATION</span>
            <strong>
              {mode === 'Speed Mode' ? '1 Minute' :
               mode === 'Accuracy Mode' ? '2 Minutes' :
               mode === 'Weak Key Practice' ? '3 Minutes' :
               '5 Minutes'}
            </strong>
          </div>

          <button className="primary-btn start-btn" onClick={startGame}>
            START PRACTICE
          </button>
        </div>

        <p className="instruction-text">
          Place your fingers on the home row and type the highlighted key using your physical keyboard.
        </p>
      </div>

      {bestResult && (
        <div className="best-result-card">
          <h3>YOUR BEST</h3>
          <div className="best-stats">
            <div className="best-stat">
              <span>Best Accuracy</span>
              <strong>{bestResult.accuracy}%</strong>
            </div>
            <div className="best-stat">
              <span>Best WPM</span>
              <strong>{bestResult.wpm}</strong>
            </div>
            <div className="best-stat">
              <span>Highest Keys</span>
              <strong>{bestResult.keysPressed}</strong>
            </div>
          </div>
        </div>
      )}

      <PracticeHistory refreshTrigger={0} />
    </div>
  );
}

export default StartScreen;
