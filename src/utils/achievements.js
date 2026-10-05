import { getSettings, saveSettings } from './storage';

export const ACHIEVEMENTS_LIST = [
  { id: 'first_practice', title: 'First Practice', desc: 'Complete your first session.', icon: '🎯' },
  { id: 'accuracy_master', title: 'Accuracy Master', desc: 'Reach 95% accuracy.', icon: '🎯' },
  { id: 'speed_beginner', title: 'Speed Beginner', desc: 'Reach 30 WPM.', icon: '⚡' },
  { id: 'speed_master', title: 'Speed Master', desc: 'Reach 50 WPM.', icon: '🚀' },
  { id: '1000_keys', title: '1000 Keys', desc: 'Type 1,000 total keys.', icon: '⌨️' },
  { id: 'perfect_session', title: 'Perfect Session', desc: 'Reach 100% accuracy.', icon: '⭐' },
  { id: 'dedicated_typist', title: 'Dedicated Typist', desc: 'Complete 10 sessions.', icon: '🔥' },
];

export function checkAchievements(result, historyCount, totalKeysLifetime) {
  const settings = getSettings();
  const unlocked = settings.unlockedAchievements || [];
  const newlyUnlocked = [];

  const check = (id, condition) => {
    if (!unlocked.includes(id) && condition) {
      unlocked.push(id);
      newlyUnlocked.push(ACHIEVEMENTS_LIST.find(a => a.id === id));
    }
  };

  check('first_practice', historyCount >= 1);
  check('accuracy_master', result.accuracy >= 95);
  check('speed_beginner', result.wpm >= 30);
  check('speed_master', result.wpm >= 50);
  check('1000_keys', totalKeysLifetime >= 1000);
  check('perfect_session', result.accuracy === '100.00' && result.keysPressed > 20);
  check('dedicated_typist', historyCount >= 10);

  if (newlyUnlocked.length > 0) {
    saveSettings({ ...settings, unlockedAchievements: unlocked });
  }

  return newlyUnlocked;
}
