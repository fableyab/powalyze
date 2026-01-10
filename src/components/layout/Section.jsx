import React from 'react';

/**
 * Section - Composant de section réutilisable avec variants prédéfinis
 * 
 * @param {Object} props
 * @param {'default'|'dark'|'accent'|'electric'} props.variant - Style de la section
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Padding vertical de la section
 * @param {string} props.className - Classes Tailwind additionnelles
 * @param {React.ReactNode} props.children - Contenu de la section
 */
export const Section = ({ 
  variant = 'default', 
  size = 'md', 
  className = '', 
  children,
  ...props 
}) => {
  const variants = {
    default: 'bg-white text-black',
    dark: 'bg-brand-blue-dark text-white',
    accent: 'bg-brand-gold text-black',
    electric: 'bg-brand-electric text-white',
  };

  const sizes = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-20',
    lg: 'py-16 md:py-28',
    xl: 'py-20 md:py-36',
  };

  return (
    <section 
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
