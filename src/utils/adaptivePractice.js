import { TYPING_KEYS } from './keyGenerator';

export function generateAdaptiveKey(keyPerformance, previousKey = null) {
  const weakKeys = getWeakKeys(keyPerformance);
  
  let candidates = [...TYPING_KEYS];
  
  // Add weak keys multiple times to increase their probability
  weakKeys.forEach(wk => {
    candidates.push(wk.key);
    candidates.push(wk.key);
  });
  
  let newKey = previousKey;
  let attempts = 0;
  
  // Try to avoid repeating the exact same key back-to-back, but don't loop infinitely
  while (newKey === previousKey && attempts < 10) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    newKey = candidates[randomIndex];
    attempts++;
  }
  
  return newKey;
}

export function getWeakKeys(keyPerformance) {
  const weak = [];
  for (const [key, stats] of Object.entries(keyPerformance)) {
    if (stats.attempts >= 5) { // Need at least 5 attempts to judge
      const accuracy = (stats.correct / stats.attempts) * 100;
      if (accuracy < 90) { // Considered weak if below 90%
        weak.push({ key, accuracy, mistakes: stats.wrong });
      }
    }
  }
  // Sort from weakest to strongest
  return weak.sort((a, b) => a.accuracy - b.accuracy);
}

export function generateRecommendations(keyPerformance, currentWPM, accuracy) {
  const weakKeys = getWeakKeys(keyPerformance);
  
  if (accuracy < 90) {
    return "Your accuracy is below 90%. Try slowing down and focusing on accuracy.";
  }
  
  if (weakKeys.length > 0) {
    const keysStr = weakKeys.map(k => k.key.toUpperCase()).join(" and ");
    return `You are struggling with ${keysStr}. Try Weak Key Practice.`;
  }
  
  if (currentWPM < 40 && accuracy > 95) {
    return "Your accuracy is excellent. Try Speed Mode to improve your WPM.";
  }
  
  return "Great job! Keep practicing to maintain your speed and accuracy.";
}

export function generateNextGoal(currentWPM, accuracy) {
  const targetWPM = Math.max(30, currentWPM + 5);
  const targetAcc = Math.max(90, Math.min(100, Math.round(accuracy + 2)));
  return `Reach ${targetWPM} WPM while maintaining at least ${targetAcc}% accuracy.`;
}
