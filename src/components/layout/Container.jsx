import React from 'react';

/**
 * Container - Conteneur centré avec padding responsive
 * 
 * @param {Object} props
 * @param {'sm'|'md'|'lg'|'xl'|'full'} props.size - Largeur maximale du conteneur
 * @param {string} props.className - Classes Tailwind additionnelles
 * @param {React.ReactNode} props.children - Contenu du conteneur
 */
export const Container = ({ 
  size = 'lg', 
  className = '', 
  children,
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div 
      className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
