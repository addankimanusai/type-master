import React from 'react';
import KeyboardKey from './KeyboardKey';

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

function VirtualKeyboard({ currentKey, allowedKeys }) {
  return (
    <div className="virtual-keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <KeyboardKey 
              key={key} 
              letter={key} 
              isActive={key === currentKey}
              isDimmed={allowedKeys && !allowedKeys.includes(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default VirtualKeyboard;
