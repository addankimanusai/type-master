export const TYPING_KEYS = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'
];

export function getRandomKey(previousKey = null) {
  // Try to prevent the same key from appearing twice in a row,
  // but fallback to random if something goes wrong.
  let newKey = previousKey;
  while (newKey === previousKey) {
    const randomIndex = Math.floor(Math.random() * TYPING_KEYS.length);
    newKey = TYPING_KEYS[randomIndex];
  }
  return newKey;
}
