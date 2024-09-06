import { useState } from 'react';

export const usePreviewMode = () => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const togglePreviewMode = () => setPreviewMode(!previewMode);

  return { previewMode, togglePreviewMode };
};