/**
 * RADIO COMPONENT
 * Bouton radio accessible
 */

import React from 'react';
import { cn } from '@/lib/utils';

export function Radio({ checked, onChange, label, value, name, disabled = false, className }) {
  return (
    <label className={cn('flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
            checked
              ? 'border-brand-gold-500'
              : 'border-gray-600 hover:border-gray-500'
          )}
        >
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold-500" />}
        </div>
      </div>
      {label && <span className="text-white text-sm">{label}</span>}
    </label>
  );
}

export function RadioGroup({ options, value, onChange, name, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  );
}
