import { useCallback } from 'react';
import { getSettings } from '../utils/storage';

export function useSoundEffects() {
  const playSound = useCallback((type) => {
    const settings = getSettings();
    if (!settings.soundEnabled) return;

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'correct') {
        // Pleasant pop/ding
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } else if (type === 'wrong') {
        // Low dull thud
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } else if (type === 'achievement') {
        // Arpeggio
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, now); // A4
        oscillator.frequency.setValueAtTime(554.37, now + 0.1); // C#5
        oscillator.frequency.setValueAtTime(659.25, now + 0.2); // E5
        oscillator.frequency.setValueAtTime(880, now + 0.3); // A5
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.setValueAtTime(0.2, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
      }
    } catch (e) {
      console.error('AudioContext not supported or blocked', e);
    }
  }, []);

  return playSound;
}
