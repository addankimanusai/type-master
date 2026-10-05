const HISTORY_KEY = 'typemaster_history';
const BEST_KEY = 'typemaster_best';
const THEME_KEY = 'typemaster_theme';

export function saveResult(result) {
  // Save to history
  const history = getHistory();
  const newHistory = [result, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

  // Update best result
  const currentBest = getBestResult();
  if (!currentBest || result.wpm > currentBest.wpm || (result.wpm === currentBest.wpm && result.accuracy > currentBest.accuracy)) {
    localStorage.setItem(BEST_KEY, JSON.stringify(result));
  }
}

export function getHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  if (!data) return [];
  
  const history = JSON.parse(data);
  // Temporary fix to clean up previously duplicated entries
  const uniqueHistory = [];
  const seen = new Set();
  
  history.forEach(item => {
    // Create a unique hash for each result based on its exact stats
    const hash = `${item.date}-${item.wpm}-${item.accuracy}-${item.keysPressed}`;
    if (!seen.has(hash)) {
      seen.add(hash);
      uniqueHistory.push(item);
    }
  });
  
  // Only save it back if we actually found and removed duplicates to avoid unnecessary writes
  if (uniqueHistory.length < history.length) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(uniqueHistory));
  }
  
  return uniqueHistory;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(BEST_KEY);
}

export function getBestResult() {
  const data = localStorage.getItem(BEST_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveTheme(theme) {
  const settings = getSettings();
  saveSettings({ ...settings, theme });
}

export function getTheme() {
  return getSettings().theme || 'light';
}

const SETTINGS_KEY = 'typemaster_settings';

export function getSettings() {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    theme: 'light',
    soundEnabled: true,
    animationsEnabled: true,
    defaultDuration: 300
  };
}

const LESSON_PROGRESS_KEY = 'typemaster_lessons';

export function getLessonProgress() {
  const data = localStorage.getItem(LESSON_PROGRESS_KEY);
  if (data) {
    return JSON.parse(data);
  }
  
  // Default structure
  return {
    1: { unlocked: true, completed: false, bestAccuracy: 0, bestWpm: 0, attempts: 0 }
  };
}

export function saveLessonProgress(progressData) {
  localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progressData));
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
