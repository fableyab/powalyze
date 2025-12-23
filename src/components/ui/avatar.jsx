import React from 'react';
import { cn } from '@/lib/cn';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar = ({ children, src, size = 'md', className }) => {
  const initials = typeof children === 'string' ? getInitials(children) : children;

  return (
    <div
      className={cn(
        'rounded-full bg-[#BFA76A]/20 flex items-center justify-center font-medium text-[#BFA76A] flex-shrink-0',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full rounded-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
