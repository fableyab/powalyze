import React from 'react';

/**
 * Loader pour mobile - Affichage pendant le chargement
 */
const MobileLoader = ({ message = 'Chargement...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-8">
      <div className="relative w-16 h-16 mb-4">
        {/* Logo animé */}
        <div className="absolute inset-0 bg-[#4A9EFF] rounded-2xl animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">P</span>
        </div>
      </div>
      <p className="text-slate-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default MobileLoader;
