import React from 'react';
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
  Heading,
  HelpCircle,
} from 'lucide-react';

export type ToolbarAction = {
  icon: React.ReactNode;
  tooltip: string;
  action: () => void;
  subItems?: { label: string; action: () => void }[];
};

export const createToolbarActions = (
  insertText: (before: string, after?: string) => void,
  handleSuggest: () => void,
  setPreviewMode: (mode: boolean) => void,
  previewMode: boolean
): ToolbarAction[] => [
  {
    icon: <Heading size={18} />,
    tooltip: 'Heading',
    action: () => {}, // This will be overridden by subItems
    subItems: [1, 2, 3, 4, 5, 6].map((level) => ({
      label: `Heading ${level}`,
      action: () => insertText(`${'#'.repeat(level)} `),
    })),
  },
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
  {
    icon: <Table size={18} />,
    tooltip: 'Table',
    action: () => insertText('\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |\n| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |\n'),
  },
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
  {
    icon: <HelpCircle size={18} />,
    tooltip: 'Markdown Cheat Sheet',
    action: () => {}, 
  },
];