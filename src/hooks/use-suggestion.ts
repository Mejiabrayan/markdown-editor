import { useState } from 'react';
import { aiSuggest } from '../actions';

export const useSuggestion = (content: string, setContent: React.Dispatch<React.SetStateAction<string>>) => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSuggest = async () => {
    setIsLoading(true);
    try {
      const result = await aiSuggest(content);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting suggestion:', error);
      setSuggestion('Failed to get suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const replaceSuggestion = () => {
    setContent(suggestion);
    setSuggestion('');
  };

  const appendSuggestion = () => {
    setContent((prevContent) => prevContent + '\n\n' + suggestion);
    setSuggestion('');
  };

  return { suggestion, isLoading, handleSuggest, replaceSuggestion, appendSuggestion };
};