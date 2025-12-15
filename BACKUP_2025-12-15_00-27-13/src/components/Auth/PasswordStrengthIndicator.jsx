import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);

  const getColor = () => {
    if (strength === 0) return 'bg-gray-700';
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getText = () => {
    if (strength === 0) return '';
    if (strength <= 1) return 'Faible';
    if (strength === 2) return 'Moyen';
    if (strength === 3) return 'Bon';
    return 'Fort';
  };

  return (
    <div className="space-y-1 mt-2">
      <div className="flex justify-between text-xs text-gray-400">
         <span>Force du mot de passe</span>
         <span className={strength >= 4 ? 'text-green-500' : 'text-gray-300'}>{getText()}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColor()}`} 
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-500">
        Requis: 8+ caractères, majuscule, chiffre et symbole.
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;