import React, { useState } from 'react';
import { LESSONS } from '../data/lessons';
import { getLessonProgress } from '../utils/storage';
import LessonDetail from './LessonDetail';

function LessonsList({ setActiveLessonId, setCurrentView, startGame }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const progress = getLessonProgress();

  if (selectedLesson) {
    return (
      <LessonDetail 
        lesson={selectedLesson} 
        progress={progress[selectedLesson.id]} 
        onBack={() => setSelectedLesson(null)}
        onStart={() => {
          setActiveLessonId(selectedLesson.id);
          setCurrentView('home');
          startGame();
        }}
      />
    );
  }

  return (
    <div className="lessons-screen">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Progressive Typing Course</h2>
      
      <div className="lessons-grid">
        {LESSONS.map((lesson) => {
          const stats = progress[lesson.id] || { unlocked: false, completed: false, bestAccuracy: 0, bestWpm: 0 };
          const isUnlocked = stats.unlocked;

          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${!isUnlocked ? 'locked' : ''} ${stats.completed ? 'completed' : ''}`}
              onClick={() => isUnlocked && setSelectedLesson(lesson)}
            >
              <div className="lesson-card-header">
                <h3>Lesson {lesson.id}: {lesson.title}</h3>
                {stats.completed ? (
                  <span className="status-badge success">✓ Completed</span>
                ) : isUnlocked ? (
                  <span className="status-badge active">▶ In Progress</span>
                ) : (
                  <span className="status-badge locked">🔒 Locked</span>
                )}
              </div>
              
              <p>{lesson.description}</p>
              
              <div className="lesson-keys-preview">
                {lesson.keys.slice(0, 10).join(' ').toUpperCase()}
                {lesson.keys.length > 10 && ' ...'}
              </div>

              {isUnlocked && (
                <div className="lesson-stats">
                  <div>Best WPM: <strong>{stats.bestWpm || '-'}</strong></div>
                  <div>Best Accuracy: <strong>{stats.bestAccuracy ? `${stats.bestAccuracy}%` : '-'}</strong></div>
                </div>
              )}
              
              {!isUnlocked && (
                <div className="unlock-hint">
                  Complete Lesson {lesson.id - 1} with {LESSONS[lesson.id - 2]?.requiredAccuracy || 80}% accuracy to unlock.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LessonsList;
