import React, { forwardRef } from 'react';

/**
 * Composant Input réutilisable pour les formulaires
 * Supporte différents types et variantes
 */
const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const baseInputClasses = 'px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';
  const iconPaddingClass = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`absolute ${iconPosition === 'left' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-dark-400`}>
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`${baseInputClasses} ${widthClass} ${errorClass} ${iconPaddingClass}`}
          {...props}
        />
      </div>

      {/* Helper Text / Error */}
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-dark-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea variant
 */
export const Textarea = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = false,
  rows = 4,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const baseTextareaClasses = 'px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none';
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`${baseTextareaClasses} ${widthClass} ${errorClass}`}
        {...props}
      />

      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-dark-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select variant
 */
export const Select = forwardRef(({
  label,
  error,
  helperText,
  fullWidth = false,
  options = [],
  placeholder = 'Sélectionner...',
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const baseSelectClasses = 'px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer';
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={`${baseSelectClasses} ${widthClass} ${errorClass}`}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-dark-400">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-dark-700 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Chevron Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-dark-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Input;
