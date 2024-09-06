'use client';

import React, { useRef, useEffect, useState } from 'react';
import { MarkdownCheatSheet } from './markdown-cheatsheet';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  Menubar,
} from '@/components/ui/menubar';
import { ToolbarAction } from '@/config/toolbar-actions';

type MobileMenuProps = {
  actions: ToolbarAction[];
};

export function MobileMenu({ actions }: MobileMenuProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightBlur, setShowRightBlur] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='relative w-full'>
      <div
        ref={scrollContainerRef}
        className='overflow-x-auto flex space-x-2 p-2 scrollbar-hide'
      >
        {actions.map((action, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                {action.subItems ? (
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 flex-shrink-0'
                        >
                          {action.icon}
                        </Button>
                      </MenubarTrigger>
                      <MenubarContent
                        align='start'
                        alignOffset={-5}
                        className='min-w-[120px]'
                      >
                        {action.subItems.map((item, subIndex) => (
                          <MenubarItem key={subIndex} onClick={item.action}>
                            {item.label}
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                ) : (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 flex-shrink-0'
                    onClick={action.action}
                  >
                    {action.icon}
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-xs'>{action.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <MarkdownCheatSheet />
      </div>
      <div className='absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none' />
      {showRightBlur && (
        <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none' />
      )}
    </div>
  );
}
