import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import Button from '../ui/Button';

/**
 * Header responsive avec menu burger sur mobile
 * S'adapte au contexte (marketing vs espace client)
 */
const Header = ({ isAuthenticated = false, user = null, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();
  const location = useLocation();

  const isClientSpace = location.pathname.startsWith('/espace-client');
  const isAdminSpace = location.pathname.startsWith('/admin');

  // Navigation pour visiteurs (site marketing)
  const publicLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ];

  // Navigation espace client
  const clientLinks = [
    { label: 'Tableau de bord', path: '/espace-client', icon: '📊' },
    { label: 'Projets', path: '/espace-client/projets', icon: '📁' },
    { label: 'Documents', path: '/espace-client/documents', icon: '📄' },
    { label: 'Power BI', path: '/espace-client/power-bi', icon: '📈' },
    { label: 'Paramètres', path: '/espace-client/parametres', icon: '⚙️' },
  ];

  // Navigation admin
  const adminLinks = [
    { label: 'Clients', path: '/admin/clients', icon: '🏢' },
    { label: 'Utilisateurs', path: '/admin/utilisateurs', icon: '👥' },
    { label: 'Statistiques', path: '/admin/stats', icon: '📊' },
  ];

  const navigationLinks = isAdminSpace ? adminLinks : isClientSpace ? clientLinks : publicLinks;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-primary border-b border-dark-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to={isClientSpace ? '/espace-client' : isAdminSpace ? '/admin' : '/'}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gold-primary to-gold-secondary rounded-lg flex items-center justify-center font-bold text-dark-primary text-xl">
                P
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">Powalyze</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && !isTablet && (
              <nav className="flex items-center space-x-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-gold-primary text-dark-primary font-semibold'
                        : 'text-dark-200 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Desktop Actions */}
            {!isMobile && !isTablet && (
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <div className="text-sm text-dark-200">
                      <span className="text-white font-medium">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="ml-2 text-xs text-gold-primary">
                        {user?.role === 'responsible' ? 'Responsable' : user?.role === 'partner' ? 'Partenaire' : 'Admin'}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onLogout}>
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/connexion">
                      <Button variant="ghost" size="sm">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/demo">
                      <Button variant="primary" size="sm">
                        Démo gratuite
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {(isMobile || isTablet) && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-dark-200 hover:text-white hover:bg-dark-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {(isMobile || isTablet) && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={toggleMobileMenu}>
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-full bg-dark-primary border-l border-dark-700 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-dark-200 hover:text-white hover:bg-dark-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="p-4 border-b border-dark-700 bg-dark-800">
                <p className="text-white font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gold-primary mt-1">
                  {user.role === 'responsible' ? 'Responsable' : user.role === 'partner' ? 'Partenaire' : 'Admin'}
                </p>
                <p className="text-xs text-dark-300 mt-1">{user.email}</p>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="p-4 space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-gold-primary text-dark-primary font-semibold'
                      : 'text-dark-200 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {link.icon && <span className="mr-3 text-xl">{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="p-4 border-t border-dark-700">
              {isAuthenticated ? (
                <Button variant="danger" fullWidth onClick={onLogout}>
                  Déconnexion
                </Button>
              ) : (
                <div className="space-y-2">
                  <Link to="/connexion" onClick={toggleMobileMenu}>
                    <Button variant="outline" fullWidth>
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/demo" onClick={toggleMobileMenu}>
                    <Button variant="primary" fullWidth>
                      Démo gratuite
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
