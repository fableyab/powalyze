import React from 'react';

/**
 * Composant Button réutilisable avec variants et tailles
 * Utilisé dans tout Powalyze pour une cohérence visuelle
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Classes de base
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variants de couleur
  const variantClasses = {
    primary: 'bg-gold-primary text-dark-primary hover:bg-gold-secondary focus:ring-gold-primary shadow-lg hover:shadow-xl',
    secondary: 'bg-dark-secondary text-white hover:bg-dark-primary focus:ring-dark-primary border border-dark-300',
    outline: 'bg-transparent text-gold-primary border-2 border-gold-primary hover:bg-gold-primary hover:text-dark-primary focus:ring-gold-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-gold-primary hover:bg-dark-800 focus:ring-gold-primary',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  // Tailles
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Largeur complète
  const widthClass = fullWidth ? 'w-full' : '';

  // Espacement de l'icône
  const iconSpacing = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Chargement...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className={iconSpacing}>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className={iconSpacing}>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
