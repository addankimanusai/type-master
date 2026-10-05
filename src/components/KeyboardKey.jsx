import React from 'react';
import { getSettings } from '../utils/storage';

function KeyboardKey({ letter, isActive, isDimmed }) {
  const { animationsEnabled } = getSettings();
  
  return (
    <div className={`keyboard-key ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''} ${!animationsEnabled ? 'no-animations' : ''}`}>
      {letter.toUpperCase()}
    </div>
  );
}

export default KeyboardKey;
