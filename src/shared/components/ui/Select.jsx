/**
 * SELECT COMPONENT
 * Dropdown de sélection accessible
 */

import React, { useState, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export function Select({ value, onChange, options = [], placeholder = 'Sélectionner...', disabled = false, className, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full px-4 py-2 bg-gray-800 border rounded-lg text-left flex items-center justify-between transition-colors',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-brand-gold-500',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-600 focus:ring-2 focus:border-transparent',
          'text-white'
        )}
      >
        <span className={cn(!selectedOption && 'text-gray-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700 transition-colors',
                option.value === value && 'bg-gray-700 text-brand-gold-500'
              )}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
