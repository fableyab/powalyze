
import React from 'react';
import { getPasswordStrength } from '@/utils/validation';

const PasswordStrengthIndicator = ({ password }) => {
  const strength = getPasswordStrength(password);
  
  const getColor = (s) => {
    if (s <= 1) return 'bg-red-500';
    if (s === 2) return 'bg-orange-500';
    if (s === 3) return 'bg-yellow-500';
    if (s >= 4) return 'bg-green-500';
    return 'bg-gray-700';
  };

  const getText = (s) => {
    if (s <= 1) return 'Very Weak';
    if (s === 2) return 'Weak';
    if (s === 3) return 'Fair';
    if (s === 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between text-xs text-gray-400">
        <span>Password Strength</span>
        <span>{getText(strength)}</span>
      </div>
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level}
            className={`flex-1 rounded-full transition-colors duration-300 ${
              strength >= level ? getColor(strength) : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
      <ul className="text-xs text-gray-500 space-y-1 mt-2">
        <li className={password.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</li>
        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>• Uppercase letter</li>
        <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>• Number</li>
      </ul>
    </div>
  );
};

export default PasswordStrengthIndicator;
