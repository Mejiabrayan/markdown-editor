import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  tooltip,
  onClick,
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          onClick={onClick}
          className='h-8 w-8 p-0 text-muted-foreground hover:text-foreground'
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className='text-xs'>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);