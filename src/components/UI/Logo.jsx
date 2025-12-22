import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div className={`font-bold text-xl ${className}`}>
      POWALYZE
    </div>
  );
};

export default Logo;
