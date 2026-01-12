/**
 * Configuration centralisée des redirections legacy
 * 
 * Ces URLs redirigent vers les URLs canoniques.
 * Conservées pour compatibilité avec liens externes, bookmarks, SEO.
 * 
 * Politique:
 * - Conserver pendant 6 mois minimum
 * - Supprimer si analytics montrent 0 trafic après 6 mois
 * - Documenter toute suppression dans CHANGELOG
 */

export const LEGACY_REDIRECTS = {
  // URLs Legacy → Canonique
  '/saas': '/signup',
  '/app/dashboard': '/app/cockpit',
  '/app/dashboard-new': '/app/cockpit',
  '/app/dashboard-premium': '/app/cockpit',
  '/app/projects-new': '/app/projects',
  '/app/projects-premium': '/app/projects',
  '/app/portfolio-new': '/app/portfolio',
  '/app/risks-new': '/app/risks',
  '/app/decisions-new': '/app/decisions',
};

/**
 * URLs canoniques officielles (à utiliser dans le code)
 */
export const CANONICAL_URLS = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // App (protected)
  COCKPIT: '/app/cockpit',
  PROJECTS: '/app/projects',
  PROJECT_NEW: '/app/project/new',
  PORTFOLIO: '/app/portfolio',
  RISKS: '/app/risks',
  RISK_NEW: '/app/risk/new',
  DECISIONS: '/app/decisions',
  DECISION_NEW: '/app/decision/new',
  DOCUMENTS: '/app/documents',
  TEAM: '/app/team',
  SETTINGS: '/app/settings',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_ENVIRONMENT: '/admin/environment',
};

/**
 * Helper pour obtenir une URL canonique de manière type-safe
 */
export const getCanonicalUrl = (key) => {
  return CANONICAL_URLS[key] || '/';
};

export default {
  LEGACY_REDIRECTS,
  CANONICAL_URLS,
  getCanonicalUrl
};
