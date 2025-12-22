/**
 * APP CONSTANTS
 * Constantes globales de l'application
 */

export const APP_NAME = 'Powalyze';
export const APP_TAGLINE = 'PMO Intelligence Platform';
export const APP_VERSION = '2.0.0';

export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  PRICING: '/pricing',
  ABOUT: '/about',
  CONTACT: '/contact',
  WORKSPACE: '/espace-client',
  DASHBOARD: '/espace-client/dashboard',
  PROJECTS: '/espace-client/projets',
  TASKS: '/espace-client/taches',
  DOCUMENTS: '/espace-client/documents',
  TEAM: '/espace-client/equipe',
  CALENDAR: '/espace-client/calendrier',
  REPORTS: '/espace-client/rapports',
  SETTINGS: '/espace-client/parametres',
};

export const STORAGE_KEYS = {
  WORKSPACE: 'powalyze_workspace_v2',
  THEME: 'powalyze_theme',
  LANGUAGE: 'powalyze_language',
};

export const PROJECT_STATUS = {
  PLANNING: { id: 'planning', label: 'Planification', color: 'purple' },
  ACTIVE: { id: 'active', label: 'Actif', color: 'green' },
  ON_HOLD: { id: 'on-hold', label: 'En pause', color: 'yellow' },
  COMPLETED: { id: 'completed', label: 'Terminé', color: 'blue' },
  CANCELLED: { id: 'cancelled', label: 'Annulé', color: 'red' },
};

export const TASK_STATUS = {
  TODO: { id: 'todo', label: 'À faire', color: 'gray' },
  IN_PROGRESS: { id: 'in-progress', label: 'En cours', color: 'blue' },
  ON_HOLD: { id: 'on-hold', label: 'En pause', color: 'yellow' },
  DONE: { id: 'done', label: 'Terminé', color: 'green' },
};

export const PRIORITY_LEVELS = {
  CRITICAL: { id: 'critical', label: 'Critique', color: 'red' },
  HIGH: { id: 'high', label: 'Haute', color: 'orange' },
  MEDIUM: { id: 'medium', label: 'Moyenne', color: 'yellow' },
  LOW: { id: 'low', label: 'Basse', color: 'green' },
};

export const DOCUMENT_CATEGORIES = [
  { id: 'charter', label: 'Charte Projet', color: 'purple' },
  { id: 'planning', label: 'Planning', color: 'blue' },
  { id: 'budget', label: 'Budget', color: 'green' },
  { id: 'risks', label: 'Risques', color: 'orange' },
  { id: 'reports', label: 'Rapports', color: 'indigo' },
  { id: 'powerbi', label: 'Power BI', color: 'yellow' },
  { id: 'data-analysis', label: 'Analyse Données', color: 'cyan' },
  { id: 'deliverables', label: 'Livrables', color: 'pink' },
  { id: 'contracts', label: 'Contrats', color: 'red' },
  { id: 'other', label: 'Autres', color: 'gray' },
];

export const EVENT_TYPES = [
  { id: 'meeting', label: 'Réunion', color: 'blue' },
  { id: 'deadline', label: 'Échéance', color: 'red' },
  { id: 'milestone', label: 'Jalon', color: 'purple' },
  { id: 'review', label: 'Revue', color: 'green' },
  { id: 'training', label: 'Formation', color: 'yellow' },
  { id: 'other', label: 'Autre', color: 'gray' },
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
