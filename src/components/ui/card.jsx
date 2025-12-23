import React from 'react';
import { cn } from '@/lib/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-[#111] border-white/10 text-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
