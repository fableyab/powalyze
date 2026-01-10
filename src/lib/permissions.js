// ============================================
// RÔLES & PERMISSIONS - VERSION PRO SUISSE
// ============================================

export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  COLLABORATEUR: 'Collaborateur',
  LECTURE_SEULE: 'Lecture seule'
};

export const PERMISSIONS = {
  // Gestion des utilisateurs
  CREATE_USERS: 'create_users',
  DELETE_USERS: 'delete_users',
  MANAGE_ROLES: 'manage_roles',
  SEND_INVITATIONS: 'send_invitations',
  
  // Gestion des données
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_ALL_DATA: 'view_all_data',
  
  // Projets & Dossiers
  CREATE_PROJECTS: 'create_projects',
  EDIT_PROJECTS: 'edit_projects',
  DELETE_PROJECTS: 'delete_projects',
  DELETE_FOLDERS: 'delete_folders',
  
  // Équipes
  MANAGE_TEAMS: 'manage_teams',
  
  // Intégrations
  MANAGE_INTEGRATIONS: 'manage_integrations',
  ACCESS_POWERBI: 'access_powerbi',
  
  // Documents
  UPLOAD_DOCUMENTS: 'upload_documents',
  DELETE_DOCUMENTS: 'delete_documents',
  
  // Modules
  ACCESS_PMO: 'access_pmo',
  ACCESS_FINANCE: 'access_finance',
  ACCESS_RISKS: 'access_risks',
  ACCESS_REPORTS: 'access_reports',
  
  // Autres
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_SETTINGS: 'manage_settings',
  SEND_MESSAGES: 'send_messages'
};

// ============================================
// CONFIGURATION DES RÔLES
// ============================================

const ROLE_PERMISSIONS = {
  // 1. ADMIN - Tous les droits
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.SEND_INVITATIONS,
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ALL_DATA,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.DELETE_PROJECTS,
    PERMISSIONS.DELETE_FOLDERS,
    PERMISSIONS.MANAGE_TEAMS,
    PERMISSIONS.MANAGE_INTEGRATIONS,
    PERMISSIONS.ACCESS_POWERBI,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.DELETE_DOCUMENTS,
    PERMISSIONS.ACCESS_PMO,
    PERMISSIONS.ACCESS_FINANCE,
    PERMISSIONS.ACCESS_RISKS,
    PERMISSIONS.ACCESS_REPORTS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.SEND_MESSAGES
  ],
  
  // 2. MANAGER - Gestion d'équipe et projets
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.MANAGE_TEAMS,
    PERMISSIONS.ACCESS_POWERBI,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.ACCESS_PMO,
    PERMISSIONS.ACCESS_FINANCE,
    PERMISSIONS.ACCESS_RISKS,
    PERMISSIONS.ACCESS_REPORTS,
    PERMISSIONS.SEND_MESSAGES
  ],
  
  // 3. COLLABORATEUR - Modification projets assignés
  [ROLES.COLLABORATEUR]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.UPLOAD_DOCUMENTS,
    PERMISSIONS.ACCESS_REPORTS,
    PERMISSIONS.SEND_MESSAGES
  ],
  
  // 4. LECTURE SEULE - Consultation uniquement
  [ROLES.LECTURE_SEULE]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.ACCESS_REPORTS
  ]
};

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

export const hasPermission = (userRole, permission) => {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const canAccessModule = (userRole, moduleName) => {
  if (userRole === ROLES.ADMIN) return true;
  
  const restrictedModules = ['admin', 'audit', 'system-health'];
  if (restrictedModules.includes(moduleName) && userRole !== ROLES.ADMIN) {
    return false;
  }
  return true;
};
