/**
 * CHECKBOX COMPONENT
 * Case à cocher accessible
 */

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Checkbox({ checked, onChange, label, disabled = false, error, className }) {
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
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
            checked
              ? 'bg-brand-gold-500 border-brand-gold-500'
              : error
              ? 'bg-gray-800 border-red-500'
              : 'bg-gray-800 border-gray-600 hover:border-gray-500'
          )}
        >
          {checked && <Check size={14} className="text-black" />}
        </div>
      </div>
      {label && <span className="text-white text-sm">{label}</span>}
    </label>
  );
}
