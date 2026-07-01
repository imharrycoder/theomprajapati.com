import { useEffect, useMemo, useState } from 'react';

function Typewriter({ words = [], speed = 58, pause = 1400 }) {
  const safeWords = useMemo(() => (words.length ? words : ['ideas']), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = safeWords[wordIndex];
    const isWordComplete = !isDeleting && letterIndex === currentWord.length;
    const isWordCleared = isDeleting && letterIndex === 0;
    const delay = isWordComplete ? pause : isDeleting ? speed * 0.55 : speed;

    const timer = window.setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isWordCleared) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % safeWords.length);
        return;
      }

      setLetterIndex((index) => index + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, letterIndex, pause, safeWords, speed, wordIndex]);

  return (
    <span className="text-[var(--accent-3)]">
      {safeWords[wordIndex].slice(0, letterIndex)}
      <span className="type-cursor">|</span>
    </span>
  );
}

export default Typewriter;
