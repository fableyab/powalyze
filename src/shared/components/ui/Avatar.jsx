/**
 * AVATAR COMPONENT
 * Photo de profil avec initiales fallback
 */

import React from 'react';
import { cn, getInitials } from '@/lib/utils';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export function Avatar({ src, name, size = 'md', className }) {
  const initials = getInitials(name || '?');

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-brand-gold-500 to-brand-gold-600 flex items-center justify-center font-bold text-black overflow-hidden',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
