import { useCallback } from 'react';
import { useEditorStore } from '../store/editor-store';

export const useWordCount = () => {
  const { setWordCount } = useEditorStore();

  const countWords = useCallback((text: string) => {
    const count = text.trim().split(/\s+/).filter(word => word !== '').length;
    setWordCount(count);
    return count;
  }, [setWordCount]);

  return { countWords };
};