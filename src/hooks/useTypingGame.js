import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomKey, TYPING_KEYS } from '../utils/keyGenerator';
import { generateAdaptiveKey } from '../utils/adaptivePractice';
import { calculateAccuracy, calculateWPM } from '../utils/calculations';
import { saveResult, getHistory, getLessonProgress, saveLessonProgress } from '../utils/storage';
import { checkAchievements } from '../utils/achievements';
import { useSoundEffects } from './useSoundEffects';
import { LESSONS } from '../data/lessons';
import { generateContent } from '../utils/contentGenerator';

const DEFAULT_PRACTICE_TIME = 300; // 5 minutes in seconds

function getModeDuration(mode) {
  switch (mode) {
    case 'Speed Mode': return 60; // 1 minute sprint
    case 'Accuracy Mode': return 120; // 2 minutes
    case 'Weak Key Practice': return 180; // 3 minutes
    case 'Key Practice': return 300; // 5 minutes
    case '5-Minute Test':
    default: return 300; // 5 minutes
  }
}

export function useTypingGame() {
  const playSound = useSoundEffects();
  const [mode, setMode] = useState('5-Minute Test'); // 'Key Practice', '5-Minute Test', 'Accuracy Mode', 'Speed Mode', 'Weak Key Practice', 'Custom Practice'
  const [customKeys, setCustomKeys] = useState('asdfjkl;');
  const [gameStatus, setGameStatus] = useState('idle'); // idle, running, paused, finished
  const [timeLeft, setTimeLeft] = useState(DEFAULT_PRACTICE_TIME);
  const [keysPressed, setKeysPressed] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [wrongKeys, setWrongKeys] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [keyPerformance, setKeyPerformance] = useState({});
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [totalTime, setTotalTime] = useState(DEFAULT_PRACTICE_TIME);

  // Timer logic
  useEffect(() => {
    let interval;
    if (gameStatus === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStatus, timeLeft]);

  useEffect(() => {
    if (gameStatus === 'idle') {
      const duration = getModeDuration(mode);
      setTotalTime(duration);
      setTimeLeft(duration);
    }
  }, [mode, gameStatus]);

  const [totalKeysLifetime, setTotalKeysLifetime] = useState(0);

  // Handle finished game
  useEffect(() => {
    if (gameStatus === 'finished' && !lastResult) {
      const elapsedSeconds = totalTime - timeLeft;
      const accuracy = calculateAccuracy(correctKeys, keysPressed);
      const wpm = calculateWPM(keysPressed, elapsedSeconds > 0 ? elapsedSeconds : totalTime);
      
      const result = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        keysPressed,
        correctKeys,
        wrongKeys,
        accuracy: accuracy.toFixed(2),
        wpm,
        keyPerformance,
        mode,
        timeTaken: elapsedSeconds > 0 ? elapsedSeconds : totalTime,
        activeLessonId
      };
      
      setLastResult(result);
      saveResult(result);
      
      // Handle lesson progress
      if (activeLessonId) {
        const progress = getLessonProgress();
        const lessonConfig = LESSONS.find(l => l.id === activeLessonId);
        
        const isCompleted = accuracy >= (lessonConfig?.requiredAccuracy || 80);
        
        progress[activeLessonId] = {
          ...progress[activeLessonId],
          completed: progress[activeLessonId]?.completed || isCompleted,
          bestAccuracy: Math.max(progress[activeLessonId]?.bestAccuracy || 0, accuracy),
          bestWpm: Math.max(progress[activeLessonId]?.bestWpm || 0, wpm),
          attempts: (progress[activeLessonId]?.attempts || 0) + 1,
          unlocked: true // It was already unlocked
        };
        
        // Unlock next lesson if current is completed
        if (isCompleted) {
          const nextLesson = LESSONS.find(l => l.id === activeLessonId + 1);
          if (nextLesson) {
            progress[nextLesson.id] = {
              ...progress[nextLesson.id],
              unlocked: true
            };
          }
        }
        saveLessonProgress(progress);
      }
      
      const currentHistory = getHistory();
      const historyCount = currentHistory.length; 
      const newTotalKeys = totalKeysLifetime + keysPressed;
      
      const newAchievements = checkAchievements(result, historyCount, newTotalKeys);
      if (newAchievements.length > 0) {
        newAchievements.forEach(ach => playSound('achievement'));
        setUnlockedAchievements(prev => [...prev, ...newAchievements]);
      }
      
      setTotalKeysLifetime(newTotalKeys);
    }
  }, [gameStatus, correctKeys, keysPressed, wrongKeys, timeLeft, keyPerformance, mode, totalKeysLifetime, playSound]);

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [targetSequence, setTargetSequence] = useState('');
  const [targetIndex, setTargetIndex] = useState(0);
  
  // Backward compatibility with older components
  const currentKey = targetSequence[targetIndex] || '';

  const initNextContent = useCallback(() => {
    if (activeLessonId) {
      const lesson = LESSONS.find(l => l.id === activeLessonId);
      if (lesson) {
        setTargetSequence(generateContent(lesson.type, lesson.keys));
      } else {
        setTargetSequence(getRandomKey());
      }
    } else {
      if (mode === 'Weak Key Practice') {
        setTargetSequence(generateAdaptiveKey(keyPerformance, currentKey));
      } else if (mode === 'Custom Practice') {
        // Generate a random character from the custom keys
        const customArray = customKeys.split('').filter(char => char.trim() !== '' || char === ' '); // Allow spaces but handle them nicely, for now we just use the characters
        const validCustomArray = customArray.length > 0 ? customArray : TYPING_KEYS;
        setTargetSequence(validCustomArray[Math.floor(Math.random() * validCustomArray.length)]);
      } else {
        setTargetSequence(getRandomKey(currentKey));
      }
    }
    setTargetIndex(0);
  }, [activeLessonId, mode, keyPerformance, currentKey, customKeys]);

  // Initial load
  useEffect(() => {
    if (gameStatus === 'idle' && !targetSequence) {
      initNextContent();
    }
  }, [gameStatus, targetSequence, initNextContent]);

  const handleKeyDown = useCallback((event) => {
    if (gameStatus !== 'running') return;
    
    // Ignore modifier keys and other special keys
    if (event.ctrlKey || event.altKey || event.metaKey || event.key.length > 1) return;

    // Validate key
    let key = event.key;
    
    // If not in a lesson that requires case-sensitivity (like sentences), lowercase it
    const isSentence = activeLessonId && LESSONS.find(l => l.id === activeLessonId)?.type === 'sentences';
    if (!isSentence) {
      key = key.toLowerCase();
    }
    
    // If we are in standard mode, restrict valid keys
    if (!activeLessonId) {
      if (mode === 'Custom Practice') {
        const customArray = customKeys.toLowerCase().split('');
        if (!customArray.includes(key)) return;
      } else {
        if (!TYPING_KEYS.includes(key)) return;
      }
    } else {
      // In a lesson, we can allow any typable character and let it be wrong if it doesn't match
      // Or we can restrict to the lesson's keys + space
      const lesson = LESSONS.find(l => l.id === activeLessonId);
      if (lesson) {
        // Just let them type anything, it will register as wrong if not the target.
        // Or restrict it so they don't accidentally mash keys. Let's allow typing anything.
      }
    }
    
    setKeysPressed(prev => prev + 1);

    setKeyPerformance(prev => {
      const stats = prev[currentKey] || { attempts: 0, correct: 0, wrong: 0 };
      return {
        ...prev,
        [currentKey]: {
          attempts: stats.attempts + 1,
          correct: stats.correct + (key === currentKey ? 1 : 0),
          wrong: stats.wrong + (key === currentKey ? 0 : 1)
        }
      };
    });

    if (key === currentKey) {
      setCorrectKeys(prev => prev + 1);
      setFeedback('correct');
      playSound('correct');
      
      if (targetIndex + 1 >= targetSequence.length) {
        initNextContent();
      } else {
        setTargetIndex(prev => prev + 1);
      }
    } else {
      setWrongKeys(prev => prev + 1);
      setFeedback('wrong');
      playSound('wrong');
      // Do not advance index on wrong press
    }
    
    // Clear feedback animation after a short delay
    setTimeout(() => setFeedback(null), 300);

  }, [gameStatus, currentKey, targetIndex, targetSequence, activeLessonId, initNextContent, playSound]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const startGame = () => {
    setGameStatus('running');
  };

  const pauseGame = () => {
    setGameStatus('paused');
  };

  const resumeGame = () => {
    setGameStatus('running');
  };

  const restartGame = () => {
    if (window.confirm("Are you sure you want to restart? Your current progress will be lost.")) {
      setGameStatus('idle');
      setTimeLeft(totalTime);
      setKeysPressed(0);
      setCorrectKeys(0);
      setWrongKeys(0);
      setLastResult(null);
      setFeedback(null);
      setKeyPerformance({});
      initNextContent();
    }
  };
  
  const resetAfterComplete = () => {
    setGameStatus('idle');
    setTimeLeft(totalTime);
    setKeysPressed(0);
    setCorrectKeys(0);
    setWrongKeys(0);
    setFeedback(null);
    setKeyPerformance({});
    initNextContent();
  };

  const elapsedSeconds = totalTime - timeLeft;
  const currentWPM = calculateWPM(keysPressed, elapsedSeconds);

  let allowedKeys = null;
  if (activeLessonId) {
    const lesson = LESSONS.find(l => l.id === activeLessonId);
    if (lesson) allowedKeys = lesson.keys;
  } else if (mode === 'Custom Practice') {
    allowedKeys = customKeys.toLowerCase().split('');
  } else {
    allowedKeys = TYPING_KEYS;
  }

  return {
    gameStatus,
    currentKey,
    targetSequence,
    targetIndex,
    activeLessonId,
    setActiveLessonId,
    allowedKeys,
    timeLeft,
    totalTime,
    elapsedSeconds,
    keysPressed,
    correctKeys,
    wrongKeys,
    currentWPM,
    lastResult,
    feedback,
    mode,
    setMode,
    customKeys,
    setCustomKeys,
    unlockedAchievements,
    setUnlockedAchievements,
    startGame,
    pauseGame,
    resumeGame,
    restartGame,
    resetAfterComplete
  };
}
