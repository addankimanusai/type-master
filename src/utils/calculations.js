export function calculateAccuracy(correctKeys, totalKeys) {
  if (totalKeys === 0) return 100;
  return (correctKeys / totalKeys) * 100;
}

export function calculateWPM(totalKeys, elapsedSeconds) {
  if (elapsedSeconds <= 0) return 0;
  const elapsedMinutes = elapsedSeconds / 60;
  return Math.round((totalKeys / 5) / elapsedMinutes);
}

export function calculateProgress(elapsedSeconds, totalSeconds) {
  if (totalSeconds <= 0) return 0;
  const progress = (elapsedSeconds / totalSeconds) * 100;
  return Math.min(progress, 100);
}
