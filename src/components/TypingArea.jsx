import React from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

function TypingArea({ targetSequence, targetIndex, currentKey, feedback, activeLessonId, allowedKeys }) {
  // If no sequence is provided (e.g., standard mode), default to single char display
  const sequence = targetSequence || currentKey;
  
  return (
    <div className="typing-area">
      <div className="next-key-label">{sequence.length > 1 ? 'TYPE THIS' : 'NEXT KEY'}</div>
      
      <div className={`target-sequence ${feedback ? `feedback-${feedback}` : ''}`}>
        {sequence.split('').map((char, idx) => {
          let statusClass = '';
          if (idx < targetIndex) statusClass = 'typed';
          else if (idx === targetIndex) statusClass = 'current-target';
          else statusClass = 'upcoming';

          // Display space as an explicit visible character if it's the current target to help users see it
          const displayChar = char === ' ' ? '␣' : char;

          return (
            <span key={idx} className={`char ${statusClass}`}>
              {displayChar}
            </span>
          );
        })}
      </div>

      <VirtualKeyboard currentKey={currentKey} allowedKeys={allowedKeys} />

      <div className="feedback-container">
        {feedback === 'correct' && (
          <div className="feedback-message correct">
            <MdCheckCircle /> Correct
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="feedback-message wrong">
            <MdCancel /> Try Again
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingArea;
