/**
 * 🎯 Modèle de Données Cockpit "Type monday.com"
 * Architecture: Boards → Items → Vues
 * Clarté: Unité de base claire, actions évidentes, données toujours visibles
 */

/**
 * @typedef {Object} CockpitItem
 * @property {string} id - UUID unique
 * @property {'initiative'|'project'|'risk'|'decision'|'signal'} type - Type d'item
 * @property {string} title - Titre court
 * @property {'backlog'|'planned'|'in_progress'|'blocked'|'done'|'cancelled'} status - Statut workflow
 * @property {string|null} owner - User ID responsable
 * @property {string|null} sponsor - Sponsor/décideur
 * @property {Date|null} start_date - Date début
 * @property {Date|null} end_date - Date fin cible
 * @property {number} progress - % avancement (0-100)
 * @property {'low'|'medium'|'high'|'critical'} priority - Priorité
 * @property {string[]} tags - Tags métier (BU, département, thématique)
 * @property {Object} custom_fields - Champs custom JSON
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} CockpitBoard
 * @property {string} id - ID board
 * @property {string} name - Nom affiché
 * @property {string} description - Description courte
 * @property {'initiative'|'project'|'risk'|'decision'|'signal'} item_type - Type items affichés
 * @property {BoardColumn[]} columns - Définition colonnes
 * @property {Object} default_filters - Filtres par défaut
 * @property {string[]} default_sort - Tri par défaut
 * @property {string} icon - Lucide icon name
 */

/**
 * @typedef {Object} BoardColumn
 * @property {string} id - ID colonne
 * @property {string} label - Label affiché
 * @property {'text'|'status'|'user'|'date'|'number'|'tags'|'progress'} type - Type colonne
 * @property {number} width - Largeur px
 * @property {boolean} sortable - Peut trier
 * @property {boolean} filterable - Peut filtrer
 */

/**
 * @typedef {Object} CockpitView
 * @property {string} id - ID vue
 * @property {string} name - Nom affiché
 * @property {'table'|'kanban'|'timeline'|'executive'} type - Type vue
 * @property {string} board_id - Board parent
 * @property {Object} config - Configuration vue (colonnes visibles, groupements, etc.)
 * @property {boolean} is_default - Vue par défaut du board
 */

// ─────────────────────────────────────────────────────────────
// 📋 BOARDS PRÉDÉFINIS (Configuration Powalyze)
// ─────────────────────────────────────────────────────────────

export const BOARDS_CONFIG = {
  initiatives: {
    id: 'initiatives',
    name: 'Initiatives Stratégiques',
    description: 'Portefeuille d\'initiatives et programmes',
    item_type: 'initiative',
    icon: 'Rocket',
    columns: [
      { id: 'title', label: 'Initiative', type: 'text', width: 300, sortable: true, filterable: true },
      { id: 'status', label: 'Statut', type: 'status', width: 150, sortable: true, filterable: true },
      { id: 'owner', label: 'Responsable', type: 'user', width: 180, sortable: true, filterable: true },
      { id: 'sponsor', label: 'Sponsor', type: 'user', width: 180, sortable: true, filterable: true },
      { id: 'progress', label: 'Avancement', type: 'progress', width: 120, sortable: true, filterable: false },
      { id: 'priority', label: 'Priorité', type: 'status', width: 120, sortable: true, filterable: true },
      { id: 'start_date', label: 'Début', type: 'date', width: 120, sortable: true, filterable: true },
      { id: 'end_date', label: 'Fin', type: 'date', width: 120, sortable: true, filterable: true },
      { id: 'tags', label: 'Tags', type: 'tags', width: 200, sortable: false, filterable: true }
    ],
    default_filters: { status: ['planned', 'in_progress'] },
    default_sort: ['priority:desc', 'progress:asc']
  },

  risks: {
    id: 'risks',
    name: 'Risques Critiques',
    description: 'Suivi des risques majeurs et actions',
    item_type: 'risk',
    icon: 'AlertTriangle',
    columns: [
      { id: 'title', label: 'Risque', type: 'text', width: 300, sortable: true, filterable: true },
      { id: 'status', label: 'Statut', type: 'status', width: 150, sortable: true, filterable: true },
      { id: 'priority', label: 'Criticité', type: 'status', width: 120, sortable: true, filterable: true },
      { id: 'owner', label: 'Responsable', type: 'user', width: 180, sortable: true, filterable: true },
      { id: 'progress', label: 'Mitigation', type: 'progress', width: 120, sortable: true, filterable: false },
      { id: 'end_date', label: 'Échéance', type: 'date', width: 120, sortable: true, filterable: true },
      { id: 'tags', label: 'Domaine', type: 'tags', width: 200, sortable: false, filterable: true }
    ],
    default_filters: { priority: ['high', 'critical'] },
    default_sort: ['priority:desc', 'end_date:asc']
  },

  decisions: {
    id: 'decisions',
    name: 'Décisions à Suivre',
    description: 'Décisions COMEX/CODIR en attente',
    item_type: 'decision',
    icon: 'CheckCircle',
    columns: [
      { id: 'title', label: 'Décision', type: 'text', width: 300, sortable: true, filterable: true },
      { id: 'status', label: 'Statut', type: 'status', width: 150, sortable: true, filterable: true },
      { id: 'owner', label: 'Arbitre', type: 'user', width: 180, sortable: true, filterable: true },
      { id: 'priority', label: 'Urgence', type: 'status', width: 120, sortable: true, filterable: true },
      { id: 'end_date', label: 'Date limite', type: 'date', width: 120, sortable: true, filterable: true },
      { id: 'tags', label: 'Comité', type: 'tags', width: 200, sortable: false, filterable: true }
    ],
    default_filters: { status: ['pending', 'urgent'] },
    default_sort: ['priority:desc', 'end_date:asc']
  },

  capacity: {
    id: 'capacity',
    name: 'Capacité PMO & Charge',
    description: 'Suivi des ressources et disponibilité',
    item_type: 'project',
    icon: 'Users',
    columns: [
      { id: 'title', label: 'Projet', type: 'text', width: 300, sortable: true, filterable: true },
      { id: 'owner', label: 'Chef de Projet', type: 'user', width: 180, sortable: true, filterable: true },
      { id: 'progress', label: 'Avancement', type: 'progress', width: 120, sortable: true, filterable: false },
      { id: 'status', label: 'Statut', type: 'status', width: 150, sortable: true, filterable: true },
      { id: 'tags', label: 'Équipe', type: 'tags', width: 200, sortable: false, filterable: true }
    ],
    default_filters: { status: ['in_progress'] },
    default_sort: ['progress:asc']
  }
};

// ─────────────────────────────────────────────────────────────
// 👁️ VUES PRÉDÉFINIES
// ─────────────────────────────────────────────────────────────

export const VIEWS_CONFIG = {
  // Vues pour Board "Initiatives"
  initiatives_table: {
    id: 'initiatives_table',
    name: 'Tableau',
    type: 'table',
    board_id: 'initiatives',
    is_default: true,
    config: {
      visible_columns: ['title', 'status', 'owner', 'sponsor', 'progress', 'priority', 'end_date'],
      group_by: null,
      filters: {}
    }
  },

  initiatives_kanban: {
    id: 'initiatives_kanban',
    name: 'Kanban',
    type: 'kanban',
    board_id: 'initiatives',
    is_default: false,
    config: {
      group_by: 'status',
      card_fields: ['owner', 'progress', 'priority', 'end_date'],
      swimlanes: ['backlog', 'planned', 'in_progress', 'blocked', 'done']
    }
  },

  initiatives_timeline: {
    id: 'initiatives_timeline',
    name: 'Timeline',
    type: 'timeline',
    board_id: 'initiatives',
    is_default: false,
    config: {
      date_field: 'start_date',
      end_date_field: 'end_date',
      group_by: 'priority',
      show_milestones: true
    }
  },

  initiatives_executive: {
    id: 'initiatives_executive',
    name: 'Executive',
    type: 'executive',
    board_id: 'initiatives',
    is_default: false,
    config: {
      kpis: ['avg_progress', 'on_track_count', 'at_risk_count', 'total_budget'],
      charts: ['progress_distribution', 'status_breakdown', 'priority_matrix']
    }
  },

  // Vues pour Board "Risks"
  risks_table: {
    id: 'risks_table',
    name: 'Tableau',
    type: 'table',
    board_id: 'risks',
    is_default: true,
    config: {
      visible_columns: ['title', 'status', 'priority', 'owner', 'progress', 'end_date'],
      filters: { priority: ['high', 'critical'] }
    }
  },

  risks_kanban: {
    id: 'risks_kanban',
    name: 'Kanban',
    type: 'kanban',
    board_id: 'risks',
    is_default: false,
    config: {
      group_by: 'priority',
      swimlanes: ['critical', 'high', 'medium', 'low']
    }
  },

  // Vues pour Board "Decisions"
  decisions_table: {
    id: 'decisions_table',
    name: 'Tableau',
    type: 'table',
    board_id: 'decisions',
    is_default: true,
    config: {
      visible_columns: ['title', 'status', 'owner', 'priority', 'end_date', 'tags']
    }
  },

  decisions_kanban: {
    id: 'decisions_kanban',
    name: 'Kanban',
    type: 'kanban',
    board_id: 'decisions',
    is_default: false,
    config: {
      group_by: 'status',
      swimlanes: ['pending', 'in_review', 'approved', 'rejected']
    }
  },

  // Vues pour Board "Capacity"
  capacity_table: {
    id: 'capacity_table',
    name: 'Tableau',
    type: 'table',
    board_id: 'capacity',
    is_default: true,
    config: {
      visible_columns: ['title', 'owner', 'progress', 'status', 'tags']
    }
  }
};

// ─────────────────────────────────────────────────────────────
// 🎨 CONFIGURATIONS UI
// ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG = {
  backlog: { label: 'Backlog', color: 'gray', icon: 'Inbox' },
  planned: { label: 'Planifié', color: 'blue', icon: 'Calendar' },
  in_progress: { label: 'En cours', color: 'amber', icon: 'Activity' },
  blocked: { label: 'Bloqué', color: 'red', icon: 'AlertCircle' },
  done: { label: 'Terminé', color: 'emerald', icon: 'CheckCircle' },
  cancelled: { label: 'Annulé', color: 'gray', icon: 'XCircle' },
  
  // Pour décisions
  pending: { label: 'En attente', color: 'amber', icon: 'Clock' },
  in_review: { label: 'En révision', color: 'blue', icon: 'Eye' },
  approved: { label: 'Approuvé', color: 'emerald', icon: 'CheckCircle' },
  rejected: { label: 'Rejeté', color: 'red', icon: 'XCircle' },
  urgent: { label: 'Urgent', color: 'red', icon: 'AlertTriangle' }
};

export const PRIORITY_CONFIG = {
  low: { label: 'Faible', color: 'gray', weight: 1 },
  medium: { label: 'Moyen', color: 'blue', weight: 2 },
  high: { label: 'Élevé', color: 'amber', weight: 3 },
  critical: { label: 'Critique', color: 'red', weight: 4 }
};

// ─────────────────────────────────────────────────────────────
// 🛠️ HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Récupérer board config par ID
 */
export function getBoardConfig(boardId) {
  return BOARDS_CONFIG[boardId] || null;
}

/**
 * Récupérer toutes les vues d'un board
 */
export function getBoardViews(boardId) {
  return Object.values(VIEWS_CONFIG).filter(v => v.board_id === boardId);
}

/**
 * Récupérer vue par défaut d'un board
 */
export function getDefaultView(boardId) {
  return Object.values(VIEWS_CONFIG).find(v => v.board_id === boardId && v.is_default);
}

/**
 * Récupérer config status par clé
 */
export function getStatusConfig(statusKey) {
  return STATUS_CONFIG[statusKey] || { label: statusKey, color: 'gray', icon: 'Circle' };
}

/**
 * Récupérer config priorité par clé
 */
export function getPriorityConfig(priorityKey) {
  return PRIORITY_CONFIG[priorityKey] || { label: priorityKey, color: 'gray', weight: 0 };
}
