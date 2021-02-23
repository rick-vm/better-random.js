const chars = '\u200B\u2060\u180E\u200D\u200C';
export function invisible_id(length: number) {
  let id: string; // Declare once initialize multiple times
  return function() {
    id = '';
    for (let i = 0; i < length; ++i) {
      id += chars[Math.floor(Math.random() * 5)]; // Hardcoded length for efficiency
    }
    return id;
  }
}