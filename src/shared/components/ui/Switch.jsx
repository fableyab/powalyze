/**
 * SWITCH COMPONENT
 * Toggle on/off
 */

import React from 'react';
import { cn } from '@/lib/utils';

export function Switch({ checked, onChange, label, disabled = false, className }) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-11 h-6 rounded-full transition-colors',
            checked ? 'bg-brand-gold-500' : 'bg-gray-700'
          )}
        >
          <div
            className={cn(
              'w-5 h-5 rounded-full bg-white transition-transform transform',
              checked ? 'translate-x-[22px]' : 'translate-x-0.5',
              'mt-0.5'
            )}
          />
        </div>
      </div>
      {label && <span className="text-white text-sm">{label}</span>}
    </label>
  );
}
