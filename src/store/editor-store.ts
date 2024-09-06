import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EditorState {
  content: string;
  setContent: (content: string) => void;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  wordCount: number;
  setWordCount: (wordCount: number) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      content: '',
      setContent: (content) => set({ content }),
      previewMode: false,
      setPreviewMode: (previewMode) => set({ previewMode }),
      wordCount: 0,
      setWordCount: (wordCount) => set({ wordCount }),
    }),
    {
      name: 'editor-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);