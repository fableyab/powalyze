import React from 'react';

/**
 * Carte mobile réutilisable
 */
export const MobileCard = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-4 mb-4 ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MobileCard;
