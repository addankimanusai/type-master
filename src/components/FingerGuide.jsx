import React from 'react';

function FingerGuide() {
  return (
    <div className="finger-guide">
      <h3>Finger Position Guide</h3>
      <div className="guide-content">
        <div className="hand-guide left-hand">
          <h4>Left Hand</h4>
          <div className="finger-row">
            <span>A</span>
            <span>S</span>
            <span>D</span>
            <span>F</span>
          </div>
          <div className="arrows">
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
          </div>
          <ul className="finger-list">
            <li><strong>A</strong> → Left little finger</li>
            <li><strong>S</strong> → Left ring finger</li>
            <li><strong>D</strong> → Left middle finger</li>
            <li><strong>F</strong> → Left index finger</li>
          </ul>
        </div>
        
        <div className="hand-guide right-hand">
          <h4>Right Hand</h4>
          <div className="finger-row">
            <span>J</span>
            <span>K</span>
            <span>L</span>
            <span>;</span>
          </div>
          <div className="arrows">
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
            <span>↑</span>
          </div>
          <ul className="finger-list">
            <li><strong>J</strong> → Right index finger</li>
            <li><strong>K</strong> → Right middle finger</li>
            <li><strong>L</strong> → Right ring finger</li>
            <li><strong>;</strong> → Right little finger</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FingerGuide;
