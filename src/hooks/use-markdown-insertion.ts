import { useCallback } from 'react';

export const useMarkdownInsertion = (
  setContent: React.Dispatch<React.SetStateAction<string>>
) => {
  const insertText = useCallback(
    (before: string, after: string = '') => {
      setContent(prevContent => {
        const textarea = document.querySelector('.editor-content') as HTMLTextAreaElement | null;
        if (!textarea) return prevContent;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText =
          prevContent.substring(0, start) +
          before +
          prevContent.substring(start, end) +
          after +
          prevContent.substring(end);

        // Set the new cursor position
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + before.length + (end - start);
          textarea.focus();
        }, 0);

        return newText;
      });
    },
    [setContent]
  );

  return insertText;
};