import React from 'react';
import { cn } from '@/lib/cn';

const sizeClasses = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-2',
  xl: 'w-12 h-12 border-4'
};

export const Spinner = ({ size = 'md', className }) => {
  return (
    <div
      className={cn(
        'inline-block rounded-full border-[#BFA76A] border-t-transparent animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Chargement"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
};
