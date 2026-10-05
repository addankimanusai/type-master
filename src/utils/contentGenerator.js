const COMMON_WORDS = [
  "the", "of", "to", "and", "a", "in", "is", "it", "you", "that",
  "he", "was", "for", "on", "are", "with", "as", "I", "his", "they",
  "be", "at", "one", "have", "this", "from", "or", "had", "by", "not",
  "word", "but", "what", "some", "we", "can", "out", "other", "were", "all",
  "there", "when", "up", "use", "your", "how", "said", "an", "each", "she",
  "ask", "sad", "dad", "fall", "lad", "fast", "safe", "skill", "practice", "typing",
  "keyboard", "letters", "combinations", "finger", "hand", "touch", "test", "speed"
];

const COMMON_SENTENCES = [
  "The cat is fast.",
  "A skilled typist types fast.",
  "Practice makes typing better.",
  "I like to type.",
  "Practice makes progress.",
  "Typing needs practice.",
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be that is the question.",
  "Always keep your fingers on the home row.",
  "Good accuracy leads to high speed.",
  "Touch typing is a valuable skill."
];

const COMBINATIONS = [
  "as", "sd", "df", "jk", "kl", "lk", "fd", "sa",
  "th", "he", "in", "er", "an", "re", "on", "at", "en", "nd",
  "ed", "to", "it", "ou", "ea", "hi", "is", "or", "ti", "as",
  "te", "et", "ng", "of", "al", "de", "se", "le", "sa", "si",
  "ar", "ve", "ra", "ro", "fi", "ma", "yo", "wa", "ne", "me"
];

// Helper to check if a word can be formed using ONLY the allowed keys
function isValidForAllowedKeys(text, allowedKeys) {
  const allowedSet = new Set(allowedKeys.map(k => k.toLowerCase()));
  for (const char of text.toLowerCase()) {
    if (!allowedSet.has(char) && char !== ' ') { // Ignore space if checking general words, but wait!
      return false;
    }
  }
  return true;
}

export function generateCombinations(allowedKeys, count = 1) {
  const validCombos = COMBINATIONS.filter(c => isValidForAllowedKeys(c, allowedKeys));
  // Fallback if no combos match perfectly (e.g. beginner lesson without 'e', 't')
  if (validCombos.length === 0) {
    // Generate random 2-letter combos from allowed keys
    validCombos.push(
      allowedKeys[Math.floor(Math.random() * allowedKeys.length)] + 
      allowedKeys[Math.floor(Math.random() * allowedKeys.length)]
    );
  }
  
  return validCombos[Math.floor(Math.random() * validCombos.length)];
}

export function generateWords(allowedKeys) {
  let validWords = COMMON_WORDS.filter(w => isValidForAllowedKeys(w, allowedKeys));
  if (validWords.length === 0) {
    // Fallback: create nonsense words
    const w1 = allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    const w2 = allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    const w3 = allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
    validWords.push(w1 + w2 + w3);
  }
  return validWords[Math.floor(Math.random() * validWords.length)];
}

export function generateSentences(allowedKeys) {
  let validSentences = COMMON_SENTENCES.filter(s => isValidForAllowedKeys(s.replace(/[^a-zA-Z]/g, ''), allowedKeys));
  if (validSentences.length === 0) {
    // Fallback
    const w1 = generateWords(allowedKeys);
    const w2 = generateWords(allowedKeys);
    const w3 = generateWords(allowedKeys);
    validSentences.push(`${w1.charAt(0).toUpperCase() + w1.slice(1)} ${w2} ${w3}.`);
  }
  return validSentences[Math.floor(Math.random() * validSentences.length)];
}

export function generateContent(type, allowedKeys) {
  switch (type) {
    case 'combinations':
      return generateCombinations(allowedKeys);
    case 'words':
      return generateWords(allowedKeys);
    case 'sentences':
      return generateSentences(allowedKeys);
    case 'keys':
    default:
      return allowedKeys[Math.floor(Math.random() * allowedKeys.length)];
  }
}
