'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      <AnimatePresence mode='wait' initial={false}>
        {theme === 'light' ? (
          <motion.div
            key='sun'
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='0.75'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-sun h-[1.2rem] w-[1.2rem]'
            >
              <circle cx='12' cy='12' r='4' />
              <path d='M12 2v2' />
              <path d='M12 20v2' />
              <path d='m4.93 4.93 1.41 1.41' />
              <path d='m17.66 17.66 1.41 1.41' />
              <path d='M2 12h2' />
              <path d='M20 12h2' />
              <path d='m6.34 17.66-1.41 1.41' />
              <path d='m19.07 4.93-1.41 1.41' />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key='moon'
            initial={{ opacity: 0, rotate: 90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='0.75'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-moon h-[1.2rem] w-[1.2rem]'
            >
              <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
