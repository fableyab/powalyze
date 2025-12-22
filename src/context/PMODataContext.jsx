/**
 * PMO DATA CONTEXT
 * ================
 * 
 * Ce contexte gère toutes les données PMO de l'application.
 * 
 * FONCTIONNEMENT:
 * - Par défaut, les nouveaux comptes commencent avec des données VIERGES
 * - Un bouton "Demo" dans la sidebar permet de charger des données de démonstration
 * - Les données sont stockées dans localStorage pour persister entre les sessions
 * 
 * STRUCTURE DES DONNÉES:
 * - projects: Liste des projets PMO
 * - tasks: Liste des tâches (Kanban)
 * - team: Liste des membres de l'équipe
 * - events: Événements du calendrier
 * - reports: Configuration des rapports
 * 
 * ACTIONS DISPONIBLES:
 * - loadDemoData(): Charge les données de démonstration
 * - clearAllData(): Efface toutes les données (reset)
 * - updateProjects/Tasks/Team/Events: Met à jour chaque section
 * 
 * UTILISATION:
 * import { usePMOData } from '@/context/PMODataContext';
 * const { projects, loadDemoData, clearAllData } = usePMOData();
 * 
 * @author POWALYZE
 * @version 1.0.0
 * @date 2024-12-20
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Clé de stockage localStorage
const STORAGE_KEY = 'powalyze_pmo_data';

// ============================================
// DONNÉES DE DÉMONSTRATION
// ============================================

const DEMO_PROJECTS = [
  {
    id: 1,
    name: "Migration Cloud Azure",
    description: "Migration complete de l'infrastructure vers Azure avec mise en place du DevOps",
    client: "Swiss Bank Corp",
    status: "in-progress",
    priority: "high",
    progress: 75,
    budget: 450000,
    spent: 337500,
    startDate: "2024-09-01",
    endDate: "2025-03-31",
    manager: "Marc Dubois",
    team: ["Marc Dubois", "Pierre Keller", "Jean Petit"],
    tags: ["Cloud", "Azure", "DevOps"],
    tasks: { total: 45, completed: 34 },
    risks: 2
  },
  {
    id: 2,
    name: "Dashboard Power BI Finance",
    description: "Creation de tableaux de bord analytiques pour le departement Finance",
    client: "Credit Suisse",
    status: "in-progress",
    priority: "high",
    progress: 60,
    budget: 85000,
    spent: 51000,
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    manager: "Sophie Laurent",
    team: ["Sophie Laurent", "Anna Martin"],
    tags: ["Power BI", "Finance", "Analytics"],
    tasks: { total: 28, completed: 17 },
    risks: 0
  },
  {
    id: 3,
    name: "Refonte ERP SAP",
    description: "Migration vers SAP S/4HANA et optimisation des processus metier",
    client: "Nestle SA",
    status: "at-risk",
    priority: "high",
    progress: 45,
    budget: 890000,
    spent: 400500,
    startDate: "2024-06-15",
    endDate: "2025-06-30",
    manager: "Anna Martin",
    team: ["Anna Martin", "Marc Dubois", "Jean Petit", "Luc Bernard"],
    tags: ["SAP", "ERP", "S/4HANA"],
    tasks: { total: 120, completed: 54 },
    risks: 3
  },
  {
    id: 4,
    name: "Data Lake Implementation",
    description: "Mise en place d'un Data Lake pour centraliser toutes les donnees",
    client: "Swisscom",
    status: "in-progress",
    priority: "medium",
    progress: 30,
    budget: 320000,
    spent: 96000,
    startDate: "2024-12-01",
    endDate: "2025-08-31",
    manager: "Pierre Keller",
    team: ["Pierre Keller", "Sophie Laurent"],
    tags: ["Data", "Lake", "Big Data"],
    tasks: { total: 65, completed: 20 },
    risks: 1
  },
  {
    id: 5,
    name: "Portail Client NextGen",
    description: "Developpement d'un nouveau portail client moderne et responsive",
    client: "UBS",
    status: "completed",
    priority: "medium",
    progress: 100,
    budget: 125000,
    spent: 118000,
    startDate: "2024-04-01",
    endDate: "2024-12-15",
    manager: "Jean Petit",
    team: ["Jean Petit", "Sophie Laurent"],
    tags: ["Web", "React", "Portal"],
    tasks: { total: 42, completed: 42 },
    risks: 0
  },
  {
    id: 6,
    name: "Automatisation RH",
    description: "Automatisation des processus RH avec workflows intelligents",
    client: "Rolex",
    status: "planned",
    priority: "low",
    progress: 0,
    budget: 95000,
    spent: 0,
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    manager: "Marc Dubois",
    team: ["Marc Dubois"],
    tags: ["RH", "Automation", "Workflow"],
    tasks: { total: 0, completed: 0 },
    risks: 0
  }
];

const DEMO_TASKS = [
  {
    id: 1,
    title: "Analyse des besoins cloud",
    description: "Analyser les besoins en infrastructure cloud pour la migration",
    status: "done",
    priority: "high",
    assignee: "Marc Dubois",
    project: "Migration Cloud Azure",
    dueDate: "2024-12-10",
    tags: ["analyse", "cloud"],
    subtasks: [
      { id: 1, title: "Inventaire serveurs actuels", completed: true },
      { id: 2, title: "Evaluation couts Azure", completed: true }
    ]
  },
  {
    id: 2,
    title: "Design architecture cloud",
    description: "Concevoir l'architecture cloud cible sur Azure",
    status: "in-progress",
    priority: "high",
    assignee: "Pierre Keller",
    project: "Migration Cloud Azure",
    dueDate: "2024-12-25",
    tags: ["design", "architecture"],
    subtasks: [
      { id: 1, title: "Diagramme architecture", completed: true },
      { id: 2, title: "Plan de securite", completed: false }
    ]
  },
  {
    id: 3,
    title: "Configuration Power BI",
    description: "Configurer l'environnement Power BI pour le projet Finance",
    status: "in-progress",
    priority: "medium",
    assignee: "Sophie Laurent",
    project: "Dashboard Power BI Finance",
    dueDate: "2024-12-20",
    tags: ["powerbi", "config"],
    subtasks: []
  },
  {
    id: 4,
    title: "Migration base SAP",
    description: "Migrer les donnees vers SAP S/4HANA",
    status: "todo",
    priority: "high",
    assignee: "Anna Martin",
    project: "Refonte ERP SAP",
    dueDate: "2025-01-15",
    tags: ["sap", "migration"],
    subtasks: [
      { id: 1, title: "Export donnees legacy", completed: false },
      { id: 2, title: "Validation mapping", completed: false },
      { id: 3, title: "Import S/4HANA", completed: false }
    ]
  },
  {
    id: 5,
    title: "Tests integration",
    description: "Executer les tests d'integration du Data Lake",
    status: "review",
    priority: "medium",
    assignee: "Pierre Keller",
    project: "Data Lake Implementation",
    dueDate: "2024-12-30",
    tags: ["tests", "integration"],
    subtasks: []
  },
  {
    id: 6,
    title: "Documentation API",
    description: "Rediger la documentation technique des APIs",
    status: "todo",
    priority: "low",
    assignee: "Jean Petit",
    project: "Portail Client NextGen",
    dueDate: "2025-01-05",
    tags: ["docs", "api"],
    subtasks: []
  },
  {
    id: 7,
    title: "Formation utilisateurs",
    description: "Preparer et animer les sessions de formation",
    status: "todo",
    priority: "medium",
    assignee: "Sophie Laurent",
    project: "Dashboard Power BI Finance",
    dueDate: "2025-02-01",
    tags: ["formation", "users"],
    subtasks: [
      { id: 1, title: "Support de cours", completed: false },
      { id: 2, title: "Planning sessions", completed: false }
    ]
  },
  {
    id: 8,
    title: "Audit securite",
    description: "Realiser l'audit de securite pre-production",
    status: "review",
    priority: "high",
    assignee: "Marc Dubois",
    project: "Migration Cloud Azure",
    dueDate: "2024-12-28",
    tags: ["securite", "audit"],
    subtasks: []
  }
];

const DEMO_TEAM = [
  {
    id: 1,
    name: "Marc Dubois",
    role: "Chef de Projet Senior",
    email: "marc.dubois@powalyze.ch",
    phone: "+41 79 123 45 67",
    avatar: null,
    department: "PMO",
    status: "active",
    skills: ["Gestion de projet", "Azure", "DevOps", "Agile"],
    projects: 3,
    availability: 85,
    joinDate: "2022-03-15"
  },
  {
    id: 2,
    name: "Sophie Laurent",
    role: "Consultante Power BI",
    email: "sophie.laurent@powalyze.ch",
    phone: "+41 79 234 56 78",
    avatar: null,
    department: "Data & Analytics",
    status: "active",
    skills: ["Power BI", "SQL", "DAX", "Data Modeling"],
    projects: 2,
    availability: 60,
    joinDate: "2023-01-10"
  },
  {
    id: 3,
    name: "Pierre Keller",
    role: "Architecte Cloud",
    email: "pierre.keller@powalyze.ch",
    phone: "+41 79 345 67 89",
    avatar: null,
    department: "Infrastructure",
    status: "active",
    skills: ["Azure", "AWS", "Kubernetes", "Terraform"],
    projects: 2,
    availability: 70,
    joinDate: "2022-08-20"
  },
  {
    id: 4,
    name: "Anna Martin",
    role: "Experte SAP",
    email: "anna.martin@powalyze.ch",
    phone: "+41 79 456 78 90",
    avatar: null,
    department: "ERP",
    status: "busy",
    skills: ["SAP S/4HANA", "ABAP", "Fiori", "Integration"],
    projects: 1,
    availability: 40,
    joinDate: "2023-06-01"
  },
  {
    id: 5,
    name: "Jean Petit",
    role: "Developpeur Full Stack",
    email: "jean.petit@powalyze.ch",
    phone: "+41 79 567 89 01",
    avatar: null,
    department: "Development",
    status: "active",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    projects: 2,
    availability: 90,
    joinDate: "2023-09-15"
  },
  {
    id: 6,
    name: "Luc Bernard",
    role: "Business Analyst",
    email: "luc.bernard@powalyze.ch",
    phone: "+41 79 678 90 12",
    avatar: null,
    department: "PMO",
    status: "vacation",
    skills: ["Analyse", "BPMN", "Requirements", "Jira"],
    projects: 1,
    availability: 0,
    joinDate: "2024-02-01"
  }
];

const DEMO_EVENTS = [
  {
    id: 1,
    title: "Sprint Planning - Azure",
    date: "2024-12-20",
    time: "09:00",
    duration: 120,
    type: "meeting",
    description: "Planning du sprint 12 pour le projet Migration Cloud Azure",
    attendees: ["Marc Dubois", "Pierre Keller", "Jean Petit"],
    location: "Salle Geneve",
    project: "Migration Cloud Azure"
  },
  {
    id: 2,
    title: "Review Dashboard Finance",
    date: "2024-12-20",
    time: "14:00",
    duration: 60,
    type: "review",
    description: "Presentation des dashboards au client Credit Suisse",
    attendees: ["Sophie Laurent", "Anna Martin"],
    location: "Teams",
    project: "Dashboard Power BI Finance"
  },
  {
    id: 3,
    title: "Formation Power BI",
    date: "2024-12-21",
    time: "10:00",
    duration: 180,
    type: "training",
    description: "Session de formation pour l'equipe Finance",
    attendees: ["Sophie Laurent"],
    location: "Salle Zurich",
    project: "Dashboard Power BI Finance"
  },
  {
    id: 4,
    title: "Comite de pilotage SAP",
    date: "2024-12-22",
    time: "11:00",
    duration: 90,
    type: "meeting",
    description: "Point mensuel sur l'avancement du projet SAP",
    attendees: ["Anna Martin", "Marc Dubois", "Luc Bernard"],
    location: "Nestle HQ",
    project: "Refonte ERP SAP"
  },
  {
    id: 5,
    title: "Demo Data Lake",
    date: "2024-12-23",
    time: "15:00",
    duration: 60,
    type: "demo",
    description: "Demonstration des fonctionnalites du Data Lake",
    attendees: ["Pierre Keller", "Sophie Laurent"],
    location: "Teams",
    project: "Data Lake Implementation"
  },
  {
    id: 6,
    title: "Retrospective Sprint",
    date: "2024-12-24",
    time: "09:00",
    duration: 60,
    type: "meeting",
    description: "Retrospective du sprint 11",
    attendees: ["Marc Dubois", "Pierre Keller", "Jean Petit"],
    location: "Salle Geneve",
    project: "Migration Cloud Azure"
  }
];

// ============================================
// DONNÉES VIERGES (DÉFAUT)
// ============================================

const EMPTY_DATA = {
  projects: [],
  tasks: [],
  team: [],
  events: [],
  isDemoLoaded: false
};

// ============================================
// CONTEXTE
// ============================================

const PMODataContext = createContext(null);

export const PMODataProvider = ({ children }) => {
  const [data, setData] = useState(EMPTY_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(parsed);
      } catch (e) {
        console.error('Erreur chargement données PMO:', e);
        setData(EMPTY_DATA);
      }
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder automatiquement dans localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoading]);

  /**
   * Charge les données de démonstration
   * Remplace toutes les données existantes par les données demo
   */
  const loadDemoData = () => {
    setData({
      projects: DEMO_PROJECTS,
      tasks: DEMO_TASKS,
      team: DEMO_TEAM,
      events: DEMO_EVENTS,
      isDemoLoaded: true
    });
    return true;
  };

  /**
   * Efface toutes les données (reset complet)
   * Remet le compte à l'état vierge initial
   */
  const clearAllData = () => {
    setData(EMPTY_DATA);
    localStorage.removeItem(STORAGE_KEY);
    return true;
  };

  /**
   * Met à jour la liste des projets
   */
  const updateProjects = (projects) => {
    setData(prev => ({ ...prev, projects }));
  };

  /**
   * Met à jour la liste des tâches
   */
  const updateTasks = (tasks) => {
    setData(prev => ({ ...prev, tasks }));
  };

  /**
   * Met à jour la liste des membres de l'équipe
   */
  const updateTeam = (team) => {
    setData(prev => ({ ...prev, team }));
  };

  /**
   * Met à jour la liste des événements
   */
  const updateEvents = (events) => {
    setData(prev => ({ ...prev, events }));
  };

  const value = {
    // Données
    projects: data.projects,
    tasks: data.tasks,
    team: data.team,
    events: data.events,
    isDemoLoaded: data.isDemoLoaded,
    isLoading,

    // Actions
    loadDemoData,
    clearAllData,
    updateProjects,
    updateTasks,
    updateTeam,
    updateEvents
  };

  return (
    <PMODataContext.Provider value={value}>
      {children}
    </PMODataContext.Provider>
  );
};

/**
 * Hook pour accéder aux données PMO
 * @returns {Object} Données et actions PMO
 */
export const usePMOData = () => {
  const context = useContext(PMODataContext);
  if (!context) {
    throw new Error('usePMOData doit être utilisé dans un PMODataProvider');
  }
  return context;
};

export default PMODataContext;
