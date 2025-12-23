import React from 'react';
import { cn } from '@/lib/cn';

const variants = {
  default: 'bg-[#BFA76A] hover:bg-[#BFA76A]/90',
  primary: 'bg-[#BFA76A] hover:bg-[#BFA76A]/90',
  secondary: 'bg-white/10 hover:bg-white/20',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600'
};

export const Progress = ({ value = 0, className, showLabel = false, variant = 'default' }) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            variants[variant]
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-400 mt-1 block">{value}%</span>
      )}
    </div>
  );
};
