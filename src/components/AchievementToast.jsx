import React, { useEffect, useState } from 'react';

function AchievementToast({ achievements, setAchievements }) {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (achievements.length > 0 && !current) {
      setCurrent(achievements[0]);
    }
  }, [achievements, current]);

  useEffect(() => {
    if (current) {
      const timer = setTimeout(() => {
        setAchievements(prev => prev.slice(1));
        setCurrent(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [current, setAchievements]);

  if (!current) return null;

  return (
    <div className="achievement-toast">
      <div className="achievement-header">
        🎉 Achievement Unlocked!
      </div>
      <div className="achievement-body">
        <span className="achievement-icon">{current.icon}</span>
        <div className="achievement-text">
          <h4>{current.title}</h4>
          <p>{current.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default AchievementToast;
