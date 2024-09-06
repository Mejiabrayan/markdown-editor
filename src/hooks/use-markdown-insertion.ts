import { useCallback } from 'react';
import { useEditorStore } from '../store/editor-store';

export const useMarkdownInsertion = () => {
  const { content, setContent } = useEditorStore();

  const insertText = useCallback(
    (before: string, after: string = '') => {
      const textarea = document.querySelector('.editor-content') as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        content.substring(0, start) +
        before +
        content.substring(start, end) +
        after +
        content.substring(end);

      setContent(newText);

      // Set the new cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + before.length + (end - start);
        textarea.focus();
      }, 0);
    },
    [content, setContent]
  );

  return insertText;
};