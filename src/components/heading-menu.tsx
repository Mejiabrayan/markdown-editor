import React from 'react';
import { Heading } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

interface HeadingMenuProps {
  insertText: (before: string, after?: string) => void;
}

export const HeadingMenu: React.FC<HeadingMenuProps> = ({ insertText }) => {
  return (
    <Menubar className='border-none shadow-none bg-transparent'>
      <MenubarMenu>
        <MenubarTrigger className='h-8 w-8 p-0 text-muted-foreground hover:text-foreground'>
          <Heading size={18} />
        </MenubarTrigger>
        <MenubarContent>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <MenubarItem
              key={level}
              onClick={() => insertText(`${'#'.repeat(level)} `)}
              className='text-xs'
            >
              Heading {level}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};