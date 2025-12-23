/**
 * Données de démonstration complètes pour Powalyze
 * Utilisées pour la page demo et les tests
 */

export const DEMO_ORGANIZATION = {
  id: 'demo-org-001',
  name: 'TechCorp Solutions',
  email: 'contact@techcorp-demo.com',
  phone: '+33 1 42 86 82 00',
  address: '123 Avenue des Champs-Élysées, 75008 Paris',
  status: 'active',
  subscription: {
    plan: 'enterprise',
    startDate: '2024-01-15T00:00:00.000Z',
    endDate: '2025-12-31T23:59:59.000Z',
  },
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-12-20T15:30:00.000Z',
};

export const DEMO_PROJECTS = [
  {
    id: 'proj-001',
    name: 'Transformation Digitale 2025',
    description: 'Migration complète de l\'infrastructure vers le cloud Azure avec mise en place d\'une architecture microservices moderne.',
    manager: 'Sophie Martin',
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    status: 'en-cours',
    priority: 'critique',
    category: 'it',
    budget: 850000,
    budgetUsed: 425000,
    progress: 45,
    createdAt: '2024-08-15T09:00:00.000Z',
    updatedAt: '2024-12-22T16:45:00.000Z',
    team: ['Sophie Martin', 'Jean Dupont', 'Marie Legrand', 'Pierre Durant'],
    documents: [],
    tasks: [],
  },
  {
    id: 'proj-002',
    name: 'Déploiement ERP SAP',
    description: 'Mise en place du système ERP SAP S/4HANA pour unifier la gestion financière et opérationnelle.',
    manager: 'Thomas Bernard',
    startDate: '2024-06-01',
    endDate: '2025-03-31',
    status: 'en-cours',
    priority: 'haute',
    category: 'finance',
    budget: 1200000,
    budgetUsed: 750000,
    progress: 62,
    createdAt: '2024-05-10T10:30:00.000Z',
    updatedAt: '2024-12-21T14:20:00.000Z',
    team: ['Thomas Bernard', 'Claire Dubois', 'Luc Moreau'],
    documents: [],
    tasks: [],
  },
  {
    id: 'proj-003',
    name: 'Refonte Site Corporate',
    description: 'Création d\'un nouveau site corporate responsive avec CMS headless et optimisations SEO avancées.',
    manager: 'Emma Rousseau',
    startDate: '2024-10-15',
    endDate: '2025-02-28',
    status: 'en-cours',
    priority: 'moyenne',
    category: 'marketing',
    budget: 180000,
    budgetUsed: 95000,
    progress: 55,
    createdAt: '2024-09-20T11:15:00.000Z',
    updatedAt: '2024-12-20T09:30:00.000Z',
    team: ['Emma Rousseau', 'Lucas Simon', 'Chloé Laurent'],
    documents: [],
    tasks: [],
  },
  {
    id: 'proj-004',
    name: 'Mise en conformité RGPD',
    description: 'Audit complet et mise en conformité de tous les traitements de données personnelles selon le RGPD.',
    manager: 'Vincent Petit',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    status: 'en-pause',
    priority: 'haute',
    category: 'legal',
    budget: 95000,
    budgetUsed: 62000,
    progress: 75,
    createdAt: '2024-06-15T08:45:00.000Z',
    updatedAt: '2024-11-30T17:00:00.000Z',
    team: ['Vincent Petit', 'Amélie Roux'],
    documents: [],
    tasks: [],
  },
  {
    id: 'proj-005',
    name: 'Plateforme BI & Analytics',
    description: 'Déploiement d\'une plateforme Power BI centralisée pour le reporting et l\'analyse décisionnelle.',
    manager: 'Sophie Martin',
    startDate: '2024-08-01',
    endDate: '2024-11-30',
    status: 'termine',
    priority: 'haute',
    category: 'it',
    budget: 320000,
    budgetUsed: 315000,
    progress: 100,
    createdAt: '2024-07-10T10:00:00.000Z',
    updatedAt: '2024-11-30T18:00:00.000Z',
    team: ['Sophie Martin', 'Marc Blanc', 'Julie Martin'],
    documents: [],
    tasks: [],
  },
];

export const DEMO_DOCUMENTS = [
  {
    id: 'doc-001',
    name: 'Cahier des charges - Transformation Digitale.pdf',
    description: 'Spécifications détaillées du projet de transformation digitale',
    type: 'pdf',
    category: 'projet',
    projectId: 'proj-001',
    size: 2458624,
    uploadedBy: 'Sophie Martin',
    uploadedAt: '2024-08-20T14:30:00.000Z',
    tags: ['cahier-des-charges', 'transformation', 'digital'],
    version: 3,
    url: '#',
  },
  {
    id: 'doc-002',
    name: 'Budget Prévisionnel 2025.xlsx',
    description: 'Détail du budget prévisionnel pour l\'année 2025',
    type: 'excel',
    category: 'finance',
    projectId: 'proj-001',
    size: 1847296,
    uploadedBy: 'Jean Dupont',
    uploadedAt: '2024-09-05T09:15:00.000Z',
    tags: ['budget', '2025', 'prévisionnel'],
    version: 2,
    url: '#',
  },
  {
    id: 'doc-003',
    name: 'Architecture Technique v2.pdf',
    description: 'Schéma d\'architecture technique de la solution cloud',
    type: 'pdf',
    category: 'technique',
    projectId: 'proj-001',
    size: 5242880,
    uploadedBy: 'Marie Legrand',
    uploadedAt: '2024-10-12T16:45:00.000Z',
    tags: ['architecture', 'cloud', 'azure'],
    version: 2,
    url: '#',
  },
  {
    id: 'doc-004',
    name: 'Contrat SAP - TechCorp.pdf',
    description: 'Contrat de licence SAP S/4HANA signé',
    type: 'contract',
    category: 'juridique',
    projectId: 'proj-002',
    size: 3145728,
    uploadedBy: 'Thomas Bernard',
    uploadedAt: '2024-05-25T11:20:00.000Z',
    tags: ['contrat', 'sap', 'licence'],
    version: 1,
    url: '#',
  },
  {
    id: 'doc-005',
    name: 'Rapport d\'avancement Q4.pdf',
    description: 'Rapport trimestriel du projet ERP SAP',
    type: 'report',
    category: 'projet',
    projectId: 'proj-002',
    size: 1572864,
    uploadedBy: 'Claire Dubois',
    uploadedAt: '2024-12-15T10:30:00.000Z',
    tags: ['rapport', 'avancement', 'q4'],
    version: 1,
    url: '#',
  },
  {
    id: 'doc-006',
    name: 'Maquettes Site Web v3.pdf',
    description: 'Maquettes graphiques du nouveau site corporate',
    type: 'pdf',
    category: 'marketing',
    projectId: 'proj-003',
    size: 8388608,
    uploadedBy: 'Emma Rousseau',
    uploadedAt: '2024-11-08T14:00:00.000Z',
    tags: ['maquettes', 'design', 'web'],
    version: 3,
    url: '#',
  },
  {
    id: 'doc-007',
    name: 'Registre RGPD.xlsx',
    description: 'Registre des traitements de données personnelles',
    type: 'excel',
    category: 'juridique',
    projectId: 'proj-004',
    size: 983040,
    uploadedBy: 'Vincent Petit',
    uploadedAt: '2024-09-20T09:45:00.000Z',
    tags: ['rgpd', 'conformité', 'données'],
    version: 5,
    url: '#',
  },
];

export const DEMO_USERS = [
  {
    id: 'user-001',
    organizationId: 'demo-org-001',
    role: 'responsible',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@techcorp-demo.com',
    phone: '+33 6 12 34 56 78',
    position: 'Directeur des Opérations',
    credentials: {
      email: 'jean.dupont@techcorp-demo.com',
      password: 'Demo123!',
      tempPassword: false,
    },
    createdAt: '2024-01-15T10:30:00.000Z',
    lastLogin: '2024-12-23T08:15:00.000Z',
  },
  {
    id: 'user-002',
    organizationId: 'demo-org-001',
    role: 'partner',
    createdBy: 'user-001',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@techcorp-demo.com',
    phone: '+33 6 23 45 67 89',
    position: 'Chef de Projet IT',
    credentials: {
      email: 'sophie.martin@techcorp-demo.com',
      username: 'smartin',
      password: 'Partner123!',
      tempPassword: false,
    },
    permissions: ['projects', 'documents', 'powerbi'],
    createdAt: '2024-01-20T14:00:00.000Z',
    lastLogin: '2024-12-22T16:30:00.000Z',
  },
  {
    id: 'user-003',
    organizationId: 'demo-org-001',
    role: 'partner',
    createdBy: 'user-001',
    firstName: 'Thomas',
    lastName: 'Bernard',
    email: 'thomas.bernard@techcorp-demo.com',
    phone: '+33 6 34 56 78 90',
    position: 'Consultant ERP',
    credentials: {
      email: 'thomas.bernard@techcorp-demo.com',
      username: 'tbernard',
      password: 'Partner456!',
      tempPassword: false,
    },
    permissions: ['projects', 'documents'],
    createdAt: '2024-02-05T09:30:00.000Z',
    lastLogin: '2024-12-21T11:45:00.000Z',
  },
];

export const DEMO_KPI = {
  projectsOverview: {
    total: 5,
    active: 3,
    completed: 1,
    onHold: 1,
    cancelled: 0,
  },
  budgetOverview: {
    totalBudget: 2645000,
    totalUsed: 1647000,
    percentage: 62.3,
  },
  teamOverview: {
    totalMembers: 15,
    projectManagers: 5,
    consultants: 10,
  },
  documentsOverview: {
    total: 7,
    byType: {
      pdf: 4,
      excel: 2,
      word: 0,
      contract: 1,
    },
  },
  recentActivity: [
    {
      id: 'act-001',
      type: 'project',
      action: 'updated',
      user: 'Sophie Martin',
      description: 'Mise à jour du projet Transformation Digitale 2025',
      timestamp: '2024-12-22T16:45:00.000Z',
    },
    {
      id: 'act-002',
      type: 'document',
      action: 'uploaded',
      user: 'Claire Dubois',
      description: 'Ajout du Rapport d\'avancement Q4',
      timestamp: '2024-12-15T10:30:00.000Z',
    },
    {
      id: 'act-003',
      type: 'project',
      action: 'completed',
      user: 'Marc Blanc',
      description: 'Clôture du projet Plateforme BI & Analytics',
      timestamp: '2024-11-30T18:00:00.000Z',
    },
  ],
};

/**
 * Initialiser les données de démonstration dans le localStorage
 */
export function initializeDemoData() {
  // Vérifier si les données demo existent déjà
  const existingProjects = localStorage.getItem('powalyze_projects');
  
  if (!existingProjects || JSON.parse(existingProjects).length === 0) {
    // Initialiser avec les données demo
    localStorage.setItem('powalyze_projects', JSON.stringify(DEMO_PROJECTS));
    localStorage.setItem('powalyze_documents', JSON.stringify(DEMO_DOCUMENTS));
    localStorage.setItem('powalyze_organizations', JSON.stringify([DEMO_ORGANIZATION]));
    localStorage.setItem('powalyze_users', JSON.stringify(DEMO_USERS));
    
    console.log('✅ Données de démonstration initialisées');
    return true;
  }
  
  return false;
}

/**
 * Réinitialiser les données de démonstration
 */
export function resetDemoData() {
  localStorage.setItem('powalyze_projects', JSON.stringify(DEMO_PROJECTS));
  localStorage.setItem('powalyze_documents', JSON.stringify(DEMO_DOCUMENTS));
  localStorage.setItem('powalyze_organizations', JSON.stringify([DEMO_ORGANIZATION]));
  localStorage.setItem('powalyze_users', JSON.stringify(DEMO_USERS));
  
  console.log('🔄 Données de démonstration réinitialisées');
}

/**
 * Vider toutes les données (pour nouveau client réel)
 */
export function clearAllData() {
  localStorage.removeItem('powalyze_projects');
  localStorage.removeItem('powalyze_documents');
  localStorage.removeItem('powalyze_organizations');
  localStorage.removeItem('powalyze_users');
  
  console.log('🗑️ Toutes les données ont été supprimées');
}
