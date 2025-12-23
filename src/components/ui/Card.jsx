import React from 'react';

/**
 * Composant Card réutilisable pour afficher du contenu
 * Supporte différentes variantes et est complètement responsive
 */
const Card = ({
  children,
  title = null,
  subtitle = null,
  footer = null,
  variant = 'default',
  padding = 'normal',
  hoverable = false,
  className = '',
  onClick = null,
}) => {
  // Classes de base
  const baseClasses = 'rounded-lg transition-all duration-200';

  // Variants
  const variantClasses = {
    default: 'bg-dark-800 border border-dark-700',
    elevated: 'bg-dark-800 shadow-xl',
    flat: 'bg-dark-900',
    outlined: 'bg-transparent border-2 border-gold-primary',
    highlight: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-gold-primary/30',
  };

  // Padding
  const paddingClasses = {
    none: '',
    small: 'p-3',
    normal: 'p-4 md:p-6',
    large: 'p-6 md:p-8',
  };

  // Effet hover
  const hoverClasses = hoverable
    ? 'cursor-pointer hover:shadow-2xl hover:border-gold-primary/50 hover:scale-[1.02]'
    : '';

  // Classe onClick
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-4 pb-4 border-b border-dark-700">
          {title && (
            <h3 className="text-lg md:text-xl font-semibold text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-dark-300 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      {/* Content */}
      <div className="text-dark-200">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-dark-700">
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * Card.Grid - Layout de grille responsive pour les cards
 */
Card.Grid = ({ children, cols = { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }, gap = 'normal', className = '' }) => {
  // Gap classes
  const gapClasses = {
    small: 'gap-3',
    normal: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
  };

  // Créer les classes de colonnes responsive
  const colClasses = `grid-cols-${cols.xs} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} xl:grid-cols-${cols.xl}`;

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card.Stat - Card spécialisée pour afficher des statistiques
 */
Card.Stat = ({ label, value, icon, trend, trendValue, variant = 'default' }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-dark-300';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <Card variant={variant} padding="normal" hoverable>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-dark-300 mb-1">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
          {trend && trendValue && (
            <p className={`text-sm mt-2 ${trendColor}`}>
              <span className="font-semibold">{trendIcon} {trendValue}</span>
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-dark-700 rounded-lg text-gold-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;
