import React from 'react';

/**
 * Grid - Grille responsive avec colonnes configurables
 * 
 * @param {Object} props
 * @param {1|2|3|4|5|6} props.cols - Nombre de colonnes (desktop)
 * @param {1|2|3} props.colsMd - Nombre de colonnes (tablette, optionnel)
 * @param {1|2} props.colsSm - Nombre de colonnes (mobile, optionnel)
 * @param {'sm'|'md'|'lg'|'xl'} props.gap - Espacement entre les éléments
 * @param {string} props.className - Classes Tailwind additionnelles
 * @param {React.ReactNode} props.children - Éléments de la grille
 */
export const Grid = ({ 
  cols = 3, 
  colsMd, 
  colsSm = 1, 
  gap = 'md', 
  className = '', 
  children,
  ...props 
}) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const mdCols = colsMd || (cols > 2 ? 2 : cols);

  return (
    <div 
      className={`
        grid 
        grid-cols-${colsSm} 
        md:${colsClasses[mdCols]} 
        lg:${colsClasses[cols]} 
        ${gapClasses[gap]} 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
