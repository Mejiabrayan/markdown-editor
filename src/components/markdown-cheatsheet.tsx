import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HelpCircle } from 'lucide-react';

const cheatSheetItems = [
  { syntax: '# Heading 1', description: 'Largest heading' },
  { syntax: '## Heading 2', description: 'Second largest heading' },
  { syntax: '**Bold**', description: 'Bold text' },
  { syntax: '*Italic*', description: 'Italic text' },
  { syntax: '[Link](URL)', description: 'Hyperlink' },
  { syntax: '![Alt text](image.jpg)', description: 'Image' },
  { syntax: '> Blockquote', description: 'Blockquote' },
  { syntax: '- List item', description: 'Unordered list' },
  { syntax: '1. List item', description: 'Ordered list' },
  { syntax: '`Inline code`', description: 'Inline code' },
  { syntax: '```\nCode block\n```', description: 'Code block' },
  { syntax: '--- or ***', description: 'Horizontal rule' },
];

export function MarkdownCheatSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Markdown Cheat Sheet</SheetTitle>
          <SheetDescription>
            Quick reference for common Markdown syntax
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cheatSheetItems.map((item, index) => (
            <div key={index} className="grid grid-cols-2 items-center gap-4">
              <code className="text-sm">{item.syntax}</code>
              <span className="text-sm text-muted-foreground">{item.description}</span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}