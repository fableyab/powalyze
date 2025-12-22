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
  // Espace Pro (pour utilisateurs)
  WORKSPACE_PRO: '/espace-pro',
  DASHBOARD_PRO: '/espace-pro/dashboard',
  PROJECTS_PRO: '/espace-pro/projets',
  TASKS_PRO: '/espace-pro/taches',
  DOCUMENTS_PRO: '/espace-pro/documents',
  TEAM_PRO: '/espace-pro/equipe',
  CALENDAR_PRO: '/espace-pro/calendrier',
  REPORTS_PRO: '/espace-pro/rapports',
  INTEGRATIONS_PRO: '/espace-pro/connecteurs',
  SETTINGS_PRO: '/espace-pro/parametres',
  // Espace Admin (pour CEO/Chefs de projet)
  WORKSPACE_ADMIN: '/espace-admin',
  DASHBOARD_ADMIN: '/espace-admin/dashboard',
  PROJECTS_ADMIN: '/espace-admin/projets',
  TASKS_ADMIN: '/espace-admin/taches',
  ANALYTICS_ADMIN: '/espace-admin/analytics',
  USERS_ADMIN: '/espace-admin/utilisateurs',
  INTEGRATIONS_ADMIN: '/espace-admin/connecteurs',
  AUDIT_ADMIN: '/espace-admin/audit',
  SETTINGS_ADMIN: '/espace-admin/parametres',
};

export const USER_ROLES = {
  USER: { id: 'user', label: 'Utilisateur', access: 'pro' },
  MANAGER: { id: 'manager', label: 'Chef de Projet', access: 'admin' },
  CEO: { id: 'ceo', label: 'CEO', access: 'admin' },
  ADMIN: { id: 'admin', label: 'Administrateur', access: 'admin' },
};

export const STORAGE_KEYS = {
  WORKSPACE: 'powalyze_workspace_v2',
  THEME: 'powalyze_theme',
  LANGUAGE: 'powalyze_language',
  USER_ROLE: 'powalyze_user_role',
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

export const INTEGRATIONS = [
  { id: 'azure-devops', name: 'Azure DevOps', description: 'Synchronisation des projets, tâches, et pipelines CI/CD', icon: '☁️', category: 'Cloud & DevOps', status: 'active', color: 'blue' },
  { id: 'jira', name: 'Jira', description: 'Import/Export des issues et workflows Agile', icon: '🔷', category: 'Project Management', status: 'active', color: 'blue' },
  { id: 'github', name: 'GitHub', description: 'Suivi des commits, PRs, et actions', icon: '🐙', category: 'Version Control', status: 'active', color: 'gray' },
  { id: 'slack', name: 'Slack', description: 'Notifications temps réel et commandes bot', icon: '💬', category: 'Communication', status: 'active', color: 'purple' },
  { id: 'teams', name: 'Microsoft Teams', description: 'Intégration complète avec Teams et Planner', icon: '🟣', category: 'Communication', status: 'active', color: 'blue' },
  { id: 'power-bi', name: 'Power BI', description: 'Export des données vers vos dashboards Power BI', icon: '📊', category: 'Analytics', status: 'active', color: 'yellow' },
  { id: 'aws', name: 'AWS', description: 'Monitoring des ressources AWS (EC2, S3, Lambda)', icon: '🟠', category: 'Cloud & DevOps', status: 'beta', color: 'orange' },
  { id: 'salesforce', name: 'Salesforce', description: 'Synchronisation CRM et gestion clients', icon: '☁️', category: 'CRM', status: 'beta', color: 'blue' },
  { id: 'monday', name: 'Monday.com', description: 'Import/Export des boards et workflows', icon: '🟢', category: 'Project Management', status: 'coming-soon', color: 'green' },
  { id: 'asana', name: 'Asana', description: 'Synchronisation des projets et tâches', icon: '🔴', category: 'Project Management', status: 'coming-soon', color: 'red' },
  { id: 'notion', name: 'Notion', description: 'Export des documents et bases de données', icon: '📝', category: 'Documentation', status: 'coming-soon', color: 'gray' },
  { id: 'zapier', name: 'Zapier', description: 'Automatisations avec 5000+ apps', icon: '⚡', category: 'Automation', status: 'coming-soon', color: 'orange' }
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
