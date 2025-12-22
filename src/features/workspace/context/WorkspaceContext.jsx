/**
 * WORKSPACE CONTEXT WITH 12 DEFAULT PROJECTS
 * Gestion globale de l'état avec 12 projets réalistes
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { workspaceReducer, initialState } from './workspaceReducer';
import { loadFromStorage, saveToStorage } from '@/shared/utils/storage';

const WorkspaceContext = createContext();

const DEMO_DATA = {
  projects: [
    {
      id: 1,
      name: "Migration Cloud Azure",
      code: "AZ-001",
      description: "Migration complète infrastructure on-premise vers Azure Cloud. Objectif : réduire coûts infra de 35%.",
      category: "IT",
      priority: "high",
      status: "active",
      progress: 45,
      budget: 450000,
      spent: 198000,
      start_date: "2025-01-10",
      end_date: "2025-06-30",
      manager: "Sophie Martin",
      team: ["tech-1", "tech-2", "tech-3"],
    },
    {
      id: 2,
      name: "Refonte E-commerce B2B",
      code: "EC-002",
      description: "Nouvelle plateforme e-commerce B2B avec intégration ERP SAP et catalogue 50k+ produits.",
      category: "Digital",
      priority: "critical",
      status: "active",
      progress: 62,
      budget: 680000,
      spent: 421000,
      start_date: "2025-02-01",
      end_date: "2025-09-30",
      manager: "Marc Dubois",
      team: ["dev-1", "dev-2", "ux-1"],
    },
    {
      id: 3,
      name: "Programme Cybersécurité ISO 27001",
      code: "SEC-003",
      description: "Certification ISO 27001 et SOC 2. Audit complet, plan de remédiation, certification externe.",
      category: "Sécurité",
      priority: "high",
      status: "on-hold",
      progress: 28,
      budget: 320000,
      spent: 89000,
      start_date: "2025-03-01",
      end_date: "2025-12-31",
      manager: "Alice Rousseau",
      team: ["sec-1", "sec-2"],
    },
    {
      id: 4,
      name: "Application Mobile B2C",
      code: "MOB-004",
      description: "App mobile iOS/Android native avec paiement intégré, géolocalisation, push notifications.",
      category: "Mobile",
      priority: "medium",
      status: "completed",
      progress: 100,
      budget: 240000,
      spent: 235000,
      start_date: "2024-05-01",
      end_date: "2024-12-15",
      manager: "Thomas Leroy",
      team: ["mob-1", "mob-2"],
    },
    {
      id: 5,
      name: "DevOps CI/CD Azure",
      code: "DEVOPS-005",
      description: "Pipelines automatisés Azure DevOps, IaC Terraform, monitoring Datadog, déploiement blue/green.",
      category: "DevOps",
      priority: "medium",
      status: "active",
      progress: 71,
      budget: 180000,
      spent: 127000,
      start_date: "2025-04-01",
      end_date: "2025-10-31",
      manager: "Julien Garcia",
      team: ["devops-1", "devops-2"],
    },
    {
      id: 6,
      name: "Data Warehouse Snowflake",
      code: "DW-006",
      description: "Migration data warehouse vers Snowflake. ETL Fivetran, modélisation dbt, BI Power BI.",
      category: "Data",
      priority: "high",
      status: "planning",
      progress: 12,
      budget: 520000,
      spent: 62000,
      start_date: "2025-05-15",
      end_date: "2026-02-28",
      manager: "Emma Bernard",
      team: ["data-1", "data-2", "data-3"],
    },
    {
      id: 7,
      name: "CRM Salesforce Customisation",
      code: "CRM-007",
      description: "Personnalisation Salesforce Sales Cloud : workflows, automation, intégration Slack/Teams.",
      category: "CRM",
      priority: "medium",
      status: "active",
      progress: 38,
      budget: 290000,
      spent: 110000,
      start_date: "2025-03-20",
      end_date: "2025-11-30",
      manager: "Claire Moreau",
      team: ["crm-1", "crm-2"],
    },
    {
      id: 8,
      name: "Plateforme IA Générative",
      code: "AI-008",
      description: "POC plateforme IA générative interne : chatbot RH, assistant documentation, résumé meetings.",
      category: "Innovation",
      priority: "low",
      status: "planning",
      progress: 8,
      budget: 150000,
      spent: 12000,
      start_date: "2025-06-01",
      end_date: "2025-12-15",
      manager: "Antoine Petit",
      team: ["ai-1", "ai-2"],
    },
    {
      id: 9,
      name: "ERP SAP S/4HANA Upgrade",
      code: "ERP-009",
      description: "Upgrade SAP ECC vers S/4HANA. Migration données, refonte processus finance, formation 200+ users.",
      category: "ERP",
      priority: "critical",
      status: "active",
      progress: 53,
      budget: 980000,
      spent: 519000,
      start_date: "2024-11-01",
      end_date: "2025-08-31",
      manager: "Isabelle Laurent",
      team: ["erp-1", "erp-2", "erp-3", "erp-4"],
    },
    {
      id: 10,
      name: "Réseau 5G Sites Industriels",
      code: "NET-010",
      description: "Déploiement réseau 5G privé sur 12 sites industriels. IoT sensors, edge computing, monitoring temps réel.",
      category: "Infrastructure",
      priority: "high",
      status: "active",
      progress: 34,
      budget: 750000,
      spent: 255000,
      start_date: "2025-04-10",
      end_date: "2026-03-31",
      manager: "Nicolas Faure",
      team: ["net-1", "net-2", "net-3"],
    },
    {
      id: 11,
      name: "Conformité RGPD Global",
      code: "RGPD-011",
      description: "Mise en conformité RGPD multi-pays. DPO externe, registre traitements, formations, audits annuels.",
      category: "Legal",
      priority: "medium",
      status: "on-hold",
      progress: 19,
      budget: 210000,
      spent: 39000,
      start_date: "2025-02-15",
      end_date: "2025-12-31",
      manager: "Laurence Simon",
      team: ["legal-1", "legal-2"],
    },
    {
      id: 12,
      name: "Programme Transformation Agile",
      code: "AGILE-012",
      description: "Transformation agile organisation IT : coaching, formations Scrum/Kanban, mise en place rituels.",
      category: "Transformation",
      priority: "medium",
      status: "active",
      progress: 67,
      budget: 340000,
      spent: 228000,
      start_date: "2024-09-01",
      end_date: "2025-06-30",
      manager: "Pierre Durand",
      team: ["coach-1", "coach-2"],
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Configuration Azure AD SSO",
      description: "Configurer Single Sign-On Azure AD pour tous les utilisateurs",
      projectId: 1,
      status: "in-progress",
      priority: "high",
      assignee: "tech-1",
      dueDate: "2025-01-25",
    },
    {
      id: 2,
      title: "Migration base données PostgreSQL",
      description: "Migrer DB production vers Azure PostgreSQL Flexible Server",
      projectId: 1,
      status: "todo",
      priority: "critical",
      assignee: "tech-2",
      dueDate: "2025-02-05",
    },
    {
      id: 3,
      title: "Design système composants UI",
      description: "Créer design system complet dans Figma",
      projectId: 2,
      status: "done",
      priority: "high",
      assignee: "ux-1",
      dueDate: "2025-02-10",
    },
    {
      id: 4,
      title: "Intégration paiement Stripe",
      description: "Intégrer Stripe Payment avec 3D Secure",
      projectId: 2,
      status: "in-progress",
      priority: "critical",
      assignee: "dev-1",
      dueDate: "2025-01-30",
    },
    {
      id: 5,
      title: "Audit sécurité infrastructure",
      description: "Audit externe par cabinet spécialisé",
      projectId: 3,
      status: "on-hold",
      priority: "high",
      assignee: "sec-1",
      dueDate: "2025-04-15",
    },
    {
      id: 6,
      title: "Documentation ISO 27001",
      description: "Rédiger politique sécurité et procédures",
      projectId: 3,
      status: "todo",
      priority: "medium",
      assignee: "sec-2",
      dueDate: "2025-05-01",
    },
    {
      id: 7,
      title: "Tests charge API mobile",
      description: "Tests performance API avec 10k users simultanés",
      projectId: 4,
      status: "done",
      priority: "medium",
      assignee: "mob-2",
      dueDate: "2024-11-20",
    },
    {
      id: 8,
      title: "Configuration Terraform IaC",
      description: "Créer modules Terraform pour Azure resources",
      projectId: 5,
      status: "in-progress",
      priority: "high",
      assignee: "devops-1",
      dueDate: "2025-01-28",
    },
  ],
  team: [
    { id: "tech-1", name: "Sophie Martin", role: "Architecte Cloud", avatar: "SM" },
    { id: "tech-2", name: "Marc Dubois", role: "DevOps Engineer", avatar: "MD" },
    { id: "dev-1", name: "Alice Rousseau", role: "Full-Stack Developer", avatar: "AR" },
    { id: "ux-1", name: "Thomas Leroy", role: "UI/UX Designer", avatar: "TL" },
    { id: "sec-1", name: "Emma Bernard", role: "Security Expert", avatar: "EB" },
    { id: "data-1", name: "Julien Garcia", role: "Data Engineer", avatar: "JG" },
  ],
  events: [
    {
      id: 1,
      title: "Kick-off Migration Azure",
      date: "2025-01-12",
      type: "meeting",
      projectId: 1,
    },
    {
      id: 2,
      title: "Sprint Planning E-commerce",
      date: "2025-01-15",
      type: "meeting",
      projectId: 2,
    },
    {
      id: 3,
      title: "Audit ISO 27001",
      date: "2025-03-10",
      type: "review",
      projectId: 3,
    },
    {
      id: 4,
      title: "Demo Mobile App",
      date: "2025-01-20",
      type: "milestone",
      projectId: 4,
    },
    {
      id: 5,
      title: "Formation DevOps",
      date: "2025-01-25",
      type: "training",
      projectId: 5,
    },
    {
      id: 6,
      title: "Comité pilotage mensuel",
      date: "2025-01-31",
      type: "meeting",
      projectId: null,
    },
  ],
};

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage('workspace');
    if (saved) {
      dispatch({ type: 'LOAD_DATA', payload: saved });
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    saveToStorage('workspace', {
      projects: state.projects,
      tasks: state.tasks,
      team: state.team,
      events: state.events,
    });
  }, [state.projects, state.tasks, state.team, state.events]);

  // Load demo data
  const loadDemoData = () => {
    dispatch({ type: 'LOAD_DATA', payload: DEMO_DATA });
    dispatch({ type: 'SET_DEMO_LOADED', payload: true });
  };

  // Clear all data
  const clearAllData = () => {
    if (!confirm('Voulez-vous vraiment effacer toutes les données ?')) return;
    dispatch({ type: 'CLEAR_ALL_DATA' });
    localStorage.removeItem('powalyze_workspace');
  };

  // Actions
  const actions = {
    // Projects
    addProject: (project) => dispatch({ type: 'ADD_PROJECT', payload: project }),
    updateProject: (project) => dispatch({ type: 'UPDATE_PROJECT', payload: project }),
    deleteProject: (id) => dispatch({ type: 'DELETE_PROJECT', payload: id }),
    
    // Tasks
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (task) => dispatch({ type: 'UPDATE_TASK', payload: task }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    
    // Team
    addMember: (member) => dispatch({ type: 'ADD_TEAM_MEMBER', payload: member }),
    updateMember: (member) => dispatch({ type: 'UPDATE_TEAM_MEMBER', payload: member }),
    removeMember: (id) => dispatch({ type: 'REMOVE_TEAM_MEMBER', payload: id }),
    
    // Events
    addEvent: (event) => dispatch({ type: 'ADD_EVENT', payload: event }),
    updateEvent: (event) => dispatch({ type: 'UPDATE_EVENT', payload: event }),
    deleteEvent: (id) => dispatch({ type: 'DELETE_EVENT', payload: id }),
    
    // UI
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setViewMode: (mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    openModal: (modal) => dispatch({ type: 'OPEN_MODAL', payload: modal }),
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  };

  const contextValue = {
    state,
    dispatch,
    loadDemoData,
    clearAllData,
    isDemoLoaded: state.ui.demoLoaded,
    ...actions,
  };

  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
