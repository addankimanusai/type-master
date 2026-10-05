import React, { useState } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import { FINGER_MAPPING } from '../data/lessons';

function KeyboardGuide() {
  const [selectedKey, setSelectedKey] = useState(null);

  // We have to intercept clicks on keys, but VirtualKeyboard doesn't have an onClick prop.
  // Instead of modifying VirtualKeyboard too heavily, we can just overlay an interactive map or just show the finger mapping.

  return (
    <div className="guide-screen">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Keyboard & Finger Guide</h2>
      
      <div className="guide-card">
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          Always return your fingers to the <strong>home row (ASDF JKL;)</strong> after pressing any key.
        </p>

        <VirtualKeyboard currentKey={null} />

        <div className="finger-mapping-grid" style={{ marginTop: '3rem' }}>
          <div className="hand-section">
            <h3 style={{ color: 'var(--primary-color)' }}>Left Hand</h3>
            <ul className="mapping-list">
              <li><strong>Little Finger:</strong> Q, A, Z</li>
              <li><strong>Ring Finger:</strong> W, S, X</li>
              <li><strong>Middle Finger:</strong> E, D, C</li>
              <li><strong>Index Finger:</strong> R, F, V, T, G, B</li>
            </ul>
          </div>
          
          <div className="hand-section">
            <h3 style={{ color: 'var(--primary-color)' }}>Right Hand</h3>
            <ul className="mapping-list">
              <li><strong>Index Finger:</strong> Y, H, N, U, J, M</li>
              <li><strong>Middle Finger:</strong> I, K, ,</li>
              <li><strong>Ring Finger:</strong> O, L, .</li>
              <li><strong>Little Finger:</strong> P, ;, /</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardGuide;
