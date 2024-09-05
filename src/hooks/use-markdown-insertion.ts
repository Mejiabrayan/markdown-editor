import { useCallback } from 'react';

export const useMarkdownInsertion = (
  setContent: React.Dispatch<React.SetStateAction<string>>
) => {
  const insertText = useCallback(
    (before: string, after: string = '') => {
      const textarea = document.querySelector(
        '.editor-content'
      ) as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText =
        text.substring(0, start) +
        before +
        text.substring(start, end) +
        after +
        text.substring(end);
      setContent(newText);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + before.length + (end - start);
        textarea.focus();
      }, 0);
    },
    [setContent]
  );

  return insertText;
};
