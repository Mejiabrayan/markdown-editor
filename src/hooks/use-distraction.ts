import { useState } from 'react';

export const useDistractionFreeMode = () => {
  const [distractionFreeMode, setDistractionFreeMode] = useState<boolean>(false);

  const toggleDistractionFreeMode = () => {
    setDistractionFreeMode(!distractionFreeMode);
  };

  return { distractionFreeMode, toggleDistractionFreeMode };
};