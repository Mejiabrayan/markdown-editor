'use client';

import React, { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownCheatSheet } from './markdown-cheatsheet';
import { MarkdownComponents } from './markdown-components';
import { ToolbarButton } from './toolbar-button';
import { useWordCount } from '../hooks/use-word-count';
import { useMarkdownInsertion } from '../hooks/use-markdown-insertion';
import { aiSuggest } from '../actions';
import { Button } from './ui/button';
import { useEditorStore } from '../store/editor-store';
import { MobileMenu } from './mobile-menu';
import { useMediaQuery } from '../hooks/use-media-query';
import { createToolbarActions } from '@/config/toolbar-actions';

export default function Editor(): JSX.Element {
  const {
    content,
    setContent,
    previewMode,
    setPreviewMode,
    wordCount,
    setWordCount,
  } = useEditorStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const insertText = useMarkdownInsertion();
  const [suggestion, setSuggestion] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { countWords } = useWordCount();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    setWordCount(countWords(content));
  }, []);

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
    const newContent = content + '\n\n' + suggestion;
    setContent(newContent);
    setSuggestion('');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(countWords(newContent));
  };

  const toolbarActions = createToolbarActions(
    insertText,
    handleSuggest,
    setPreviewMode,
    previewMode
  );

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8 space-y-6'>
      <div className='relative bg-background dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-lg p-2 flex flex-wrap items-center gap-2 shadow-sm'>
        <div className='absolute left-5 top-0 h-px w-80 bg-gradient-to-r from-transparent via-white/30 via-10% to-transparent' />

        {isMobile ? (
          <MobileMenu actions={toolbarActions} />
        ) : (
          <>
            {toolbarActions.map((action, index) => (
              <ToolbarButton
                key={index}
                icon={action.icon}
                tooltip={action.tooltip}
                onClick={action.action}
              />
            ))}
          </>
        )}
      </div>

      <div className='min-h-[500px] bg-background dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-lg shadow-sm relative'>
        {previewMode ? (
          <div className='prose dark:prose-invert prose-pre:bg-none max-w-none p-4'>
            <ReactMarkdown
              components={MarkdownComponents}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <>
            <Textarea
              ref={textareaRef}
              placeholder='Start writing...'
              value={content}
              onChange={handleContentChange}
              className='relative w-full h-full min-h-[500px] p-4 bg-transparent border-none resize-none focus:ring-0 focus:outline-none font-mono editor-content'
            />
            <div className='absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent' />

            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <div className='shimmer-text text-4xl font-bold font-sans'>
                  Suggesting...
                </div>
              </div>
            )}
            {suggestion && (
              <div className='mt-4 p-4 rounded-lg'>
                <h3 className='font-semibold mb-2'>Suggestion:</h3>
                <p>{suggestion}</p>
                <div className='flex gap-2 mt-2'>
                  <Button onClick={replaceSuggestion}>
                    Replace Content
                  </Button>
                  <Button onClick={appendSuggestion}>
                    Append to Content
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className='flex justify-between items-center text-sm text-gray-500 dark:text-gray-400'>
        <div>Words: {wordCount}</div>
        <div>Characters: {content.length}</div>
      </div>
    </div>
  );
}