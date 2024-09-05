import { useState, useCallback } from 'react';

export const useWordCount = () => {
  const [wordCount, setWordCount] = useState(0);

  const countWords = useCallback((text: string) => {
    const count = text.trim().split(/\s+/).filter(word => word !== '').length;
    setWordCount(count);
    return count;
  }, []);

  return { wordCount, countWords };
};