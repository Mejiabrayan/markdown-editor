'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Bold,
  Italic,
  Underline,
  Quote,
  List,
  Image as ImageIcon,
  Link,
  Eye,
  Table,
  Code,
  Sparkles,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownCheatSheet } from './markdown-cheatsheet';
import { MarkdownComponents } from './markdown-components';
import { ToolbarButton } from './toolbar-button';
import { HeadingMenu } from './heading-menu';
import { useWordCount } from '../hooks/use-word-count';
import { useMarkdownInsertion } from '../hooks/use-markdown-insertion';
import { aiSuggest } from '../actions';
import { Button } from './ui/button';

export default function Editor(): JSX.Element {
  const [content, setContent] = useState<string>('');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const { wordCount, countWords } = useWordCount();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const insertText = useMarkdownInsertion(setContent);
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Focus on the textarea when the component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
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
    setContent((prevContent) => prevContent + '\n\n' + suggestion);
    setSuggestion('');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    countWords(newContent);
  };

  const insertTable = (): void => {
    const tableTemplate = `
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
`;
    insertText(tableTemplate);
  };

  const toolbarActions = [
    {
      icon: <Bold size={18} />,
      tooltip: 'Bold',
      action: () => insertText('**', '**'),
    },
    {
      icon: <Italic size={18} />,
      tooltip: 'Italic',
      action: () => insertText('*', '*'),
    },
    {
      icon: <Underline size={18} />,
      tooltip: 'Underline',
      action: () => insertText('<u>', '</u>'),
    },
    {
      icon: <Quote size={18} />,
      tooltip: 'Quote',
      action: () => insertText('> '),
    },
    {
      icon: <List size={18} />,
      tooltip: 'List',
      action: () => insertText('- '),
    },
    {
      icon: <ImageIcon size={18} />,
      tooltip: 'Image',
      action: () => insertText('![Alt text](https://example.com/image.jpg)'),
    },
    {
      icon: <Link size={18} />,
      tooltip: 'Link',
      action: () => insertText('[', '](https://example.com)'),
    },
    {
      icon: <Code size={18} />,
      tooltip: 'Code',
      action: () => insertText('```', '```'),
    },
    { icon: <Table size={18} />, tooltip: 'Table', action: insertTable },
    {
      icon: <Sparkles size={18} />,
      tooltip: 'Get Suggestion',
      action: handleSuggest,
    },
    {
      icon: <Eye size={18} />,
      tooltip: 'Preview',
      action: () => setPreviewMode(!previewMode),
    },
  ];

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8 space-y-6'>
      <div className='relative bg-background dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-lg p-2 flex flex-wrap items-center gap-2 shadow-sm'>
        <div className='absolute left-5 top-0 h-px w-80 bg-gradient-to-r from-transparent via-white/30 via-10% to-transparent' />

        <HeadingMenu insertText={insertText} />
        {toolbarActions.map((action, index) => (
          <ToolbarButton
            key={index}
            icon={action.icon}
            tooltip={action.tooltip}
            onClick={action.action}
          />
        ))}
        <MarkdownCheatSheet />
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
                  <Button
                    onClick={replaceSuggestion}
                    className='px-4 py-2 bg-none border border-black/10 dark:border-white/10 rounded-md text-sm font-semibold text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
                  >
                    Replace Content
                  </Button>
                  <Button
                    onClick={appendSuggestion}
                    className='px-4 py-2 bg-none border border-black/10 dark:border-white/10 rounded-md text-sm font-semibold text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
                  >
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
