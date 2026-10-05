import React from 'react';
import VirtualKeyboard from './VirtualKeyboard';

function LessonDetail({ lesson, progress, onBack, onStart }) {
  return (
    <div className="lesson-detail">
      <button className="control-btn" onClick={onBack} style={{ marginBottom: '2rem' }}>
        ← Back to Lessons
      </button>

      <div className="lesson-detail-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Lesson {lesson.id}: {lesson.title}</h2>
          {progress?.completed && <span className="status-badge success">✓ Completed</span>}
        </div>
        
        <p className="instruction-text" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          {lesson.description}
        </p>

        <div className="lesson-info-grid">
          <div className="info-box">
            <h4>Goal</h4>
            <p>Achieve at least <strong>{lesson.requiredAccuracy}%</strong> accuracy to unlock the next lesson.</p>
          </div>
          
          <div className="info-box">
            <h4>Your Best</h4>
            <p>WPM: <strong>{progress?.bestWpm || '-'}</strong></p>
            <p>Accuracy: <strong>{progress?.bestAccuracy ? `${progress.bestAccuracy}%` : '-'}</strong></p>
          </div>
        </div>

        <div style={{ margin: '3rem 0' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-muted)' }}>Active Keys</h4>
          <VirtualKeyboard currentKey={null} allowedKeys={lesson.keys} />
        </div>

        <button className="primary-btn" onClick={onStart}>
          START LESSON
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;
