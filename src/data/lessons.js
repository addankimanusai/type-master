export const FINGER_MAPPING = {
  'q': 'Left Little', 'a': 'Left Little', 'z': 'Left Little',
  'w': 'Left Ring', 's': 'Left Ring', 'x': 'Left Ring',
  'e': 'Left Middle', 'd': 'Left Middle', 'c': 'Left Middle',
  'r': 'Left Index', 'f': 'Left Index', 'v': 'Left Index', 't': 'Left Index', 'g': 'Left Index', 'b': 'Left Index',
  'y': 'Right Index', 'h': 'Right Index', 'n': 'Right Index', 'u': 'Right Index', 'j': 'Right Index', 'm': 'Right Index',
  'i': 'Right Middle', 'k': 'Right Middle', ',': 'Right Middle',
  'o': 'Right Ring', 'l': 'Right Ring', '.': 'Right Ring',
  'p': 'Right Little', ';': 'Right Little', '/': 'Right Little',
  ' ': 'Thumb'
};

export const LESSONS = [
  {
    id: 1,
    title: "Home Row",
    description: "Learn the basic home row keys.",
    type: "keys",
    keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
    unlocked: true,
    requiredAccuracy: 80
  },
  {
    id: 2,
    title: "Top Row",
    description: "Practice the top row keys.",
    type: "keys",
    keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 3,
    title: "Bottom Row",
    description: "Practice the bottom row keys.",
    type: "keys",
    keys: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 4,
    title: "Home + Top",
    description: "Combine home and top row keys.",
    type: "keys",
    keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l", ";"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 5,
    title: "Home + Bottom",
    description: "Combine home and bottom row keys.",
    type: "keys",
    keys: ["a", "s", "d", "f", "j", "k", "l", ";", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 6,
    title: "All Letters",
    description: "Practice all 26 letters of the alphabet.",
    type: "keys",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 7,
    title: "Letter Combinations",
    description: "Practice common letter pairs and sequences.",
    type: "combinations",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 8,
    title: "Words",
    description: "Practice typing real words.",
    type: "words",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m"],
    unlocked: false,
    requiredAccuracy: 80
  },
  {
    id: 9,
    title: "Sentences",
    description: "Practice typing complete sentences with punctuation.",
    type: "sentences",
    keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m", " ", ".", ",", "/"],
    unlocked: false,
    requiredAccuracy: 80
  }
];
