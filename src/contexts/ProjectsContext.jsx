import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProjectsContext = createContext();

export const PROJECT_STATUSES = {
  PLANNING: 'planification',
  IN_PROGRESS: 'en-cours',
  ON_HOLD: 'en-pause',
  COMPLETED: 'termine',
  CANCELLED: 'annule',
};

export const PROJECT_PRIORITIES = {
  CRITICAL: 'critique',
  HIGH: 'haute',
  MEDIUM: 'moyenne',
  LOW: 'basse',
};

export const PROJECT_CATEGORIES = {
  IT: 'it',
  FINANCE: 'finance',
  MARKETING: 'marketing',
  HR: 'hr',
  OPERATIONS: 'operations',
  LEGAL: 'legal',
  OTHER: 'other',
};

const DEMO_PROJECTS = [
  { id: '1', name: 'Refonte site e-commerce', description: 'Migration vers une nouvelle plateforme avec amélioration UX', status: 'en-cours', priority: 'critique', category: 'it', progress: 65, budget: 85000, startDate: '2024-01-15', endDate: '2024-04-30', team: ['Marie Laurent', 'Jean Dupont', 'Sophie Bernard'], client: 'TechCorp SA', createdAt: '2024-01-10T09:00:00Z', updatedAt: '2024-02-20T14:30:00Z' },
  { id: '2', name: 'Application mobile iOS/Android', description: 'Développement d\'une app native pour la gestion des commandes', status: 'en-cours', priority: 'haute', category: 'it', progress: 40, budget: 120000, startDate: '2024-02-01', endDate: '2024-06-30', team: ['Paul Martin', 'Claire Dubois'], client: 'RetailPlus', createdAt: '2024-01-25T10:00:00Z', updatedAt: '2024-02-22T16:45:00Z' },
  { id: '3', name: 'Dashboard analytique Power BI', description: 'Création de tableaux de bord pour le suivi des KPIs', status: 'termine', priority: 'moyenne', category: 'finance', progress: 100, budget: 35000, startDate: '2023-11-01', endDate: '2024-01-31', team: ['Marc Dubois', 'Isabelle Roux'], client: 'FinanceGroup', createdAt: '2023-10-28T08:00:00Z', updatedAt: '2024-01-31T17:00:00Z' },
  { id: '4', name: 'Migration cloud Azure', description: 'Migration de l\'infrastructure on-premise vers Azure', status: 'en-cours', priority: 'critique', category: 'it', progress: 75, budget: 200000, startDate: '2023-12-01', endDate: '2024-03-31', team: ['Thomas Leroy', 'Sophie Bernard', 'Jean Dupont'], client: 'IndustrieTech', createdAt: '2023-11-20T09:00:00Z', updatedAt: '2024-02-25T11:20:00Z' },
  { id: '5', name: 'Campagne marketing digital', description: 'Stratégie SEO/SEA et content marketing Q1 2024', status: 'planification', priority: 'haute', category: 'marketing', progress: 15, budget: 45000, startDate: '2024-03-01', endDate: '2024-05-31', team: ['Emma Petit', 'Lucas Martin'], client: 'StartupX', createdAt: '2024-02-10T14:00:00Z', updatedAt: '2024-02-23T09:30:00Z' },
  { id: '6', name: 'Système de gestion RH', description: 'Implémentation d\'un SIRH complet avec module paie', status: 'en-cours', priority: 'moyenne', category: 'hr', progress: 55, budget: 90000, startDate: '2024-01-08', endDate: '2024-05-15', team: ['Nathalie Blanc', 'Pierre Noir'], client: 'ServicesCo', createdAt: '2024-01-05T08:30:00Z', updatedAt: '2024-02-21T15:10:00Z' },
  { id: '7', name: 'Audit sécurité informatique', description: 'Analyse complète de la sécurité et recommandations', status: 'termine', priority: 'critique', category: 'it', progress: 100, budget: 55000, startDate: '2023-12-15', endDate: '2024-02-15', team: ['Alexandre Vert', 'Marie Laurent'], client: 'BankSecure', createdAt: '2023-12-10T10:00:00Z', updatedAt: '2024-02-15T18:00:00Z' },
  { id: '8', name: 'ERP personnalisé', description: 'Développement d\'un ERP sur mesure pour la logistique', status: 'en-cours', priority: 'critique', category: 'operations', progress: 50, budget: 350000, startDate: '2023-10-01', endDate: '2024-09-30', team: ['Jean Dupont', 'Sophie Bernard', 'Paul Martin', 'Claire Dubois'], client: 'LogisticPro', createdAt: '2023-09-25T09:00:00Z', updatedAt: '2024-02-24T10:45:00Z' },
  { id: '9', name: 'Conformité RGPD', description: 'Mise en conformité complète avec le règlement européen', status: 'en-pause', priority: 'haute', category: 'legal', progress: 60, budget: 40000, startDate: '2024-01-10', endDate: '2024-04-10', team: ['Isabelle Roux'], client: 'DataCorp', createdAt: '2024-01-05T11:00:00Z', updatedAt: '2024-02-18T14:00:00Z' },
  { id: '10', name: 'Plateforme e-learning', description: 'Création d\'une plateforme de formation en ligne', status: 'en-cours', priority: 'moyenne', category: 'it', progress: 70, budget: 75000, startDate: '2023-11-15', endDate: '2024-03-15', team: ['Thomas Leroy', 'Emma Petit'], client: 'EduTech', createdAt: '2023-11-10T08:00:00Z', updatedAt: '2024-02-20T16:30:00Z' },
  { id: '11', name: 'Optimisation supply chain', description: 'Réorganisation de la chaîne logistique et des stocks', status: 'planification', priority: 'haute', category: 'operations', progress: 20, budget: 110000, startDate: '2024-03-15', endDate: '2024-08-31', team: ['Marc Dubois', 'Nathalie Blanc'], client: 'ManufactureXYZ', createdAt: '2024-02-28T09:00:00Z', updatedAt: '2024-03-01T10:15:00Z' },
  { id: '12', name: 'CRM Salesforce', description: 'Implémentation et customisation de Salesforce', status: 'termine', priority: 'haute', category: 'it', progress: 100, budget: 95000, startDate: '2023-09-01', endDate: '2023-12-31', team: ['Pierre Noir', 'Lucas Martin'], client: 'SalesBoost', createdAt: '2023-08-25T08:00:00Z', updatedAt: '2023-12-31T17:30:00Z' },
  { id: '13', name: 'Transformation digitale', description: 'Accompagnement complet vers le digital', status: 'en-cours', priority: 'critique', category: 'operations', progress: 45, budget: 280000, startDate: '2023-11-01', endDate: '2024-10-31', team: ['Marie Laurent', 'Jean Dupont', 'Sophie Bernard', 'Alexandre Vert'], client: 'TraditionalCorp', createdAt: '2023-10-20T09:00:00Z', updatedAt: '2024-02-26T11:00:00Z' },
  { id: '14', name: 'API Gateway & Microservices', description: 'Architecture microservices avec API management', status: 'en-cours', priority: 'haute', category: 'it', progress: 35, budget: 140000, startDate: '2024-01-20', endDate: '2024-06-20', team: ['Thomas Leroy', 'Paul Martin'], client: 'CloudNative', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-02-25T15:20:00Z' },
  { id: '15', name: 'Campagne réseaux sociaux', description: 'Stratégie social media et influence marketing', status: 'termine', priority: 'moyenne', category: 'marketing', progress: 100, budget: 28000, startDate: '2023-12-01', endDate: '2024-02-28', team: ['Emma Petit'], client: 'FashionBrand', createdAt: '2023-11-25T14:00:00Z', updatedAt: '2024-02-28T18:00:00Z' },
  { id: '16', name: 'Business Intelligence', description: 'Mise en place d\'une solution BI complète', status: 'en-cours', priority: 'moyenne', category: 'finance', progress: 80, budget: 105000, startDate: '2023-10-15', endDate: '2024-03-31', team: ['Marc Dubois', 'Isabelle Roux', 'Claire Dubois'], client: 'AnalyticsCorp', createdAt: '2023-10-10T09:00:00Z', updatedAt: '2024-02-27T14:45:00Z' },
  { id: '17', name: 'Blockchain supply chain', description: 'Traçabilité blockchain pour la supply chain', status: 'planification', priority: 'basse', category: 'it', progress: 10, budget: 180000, startDate: '2024-04-01', endDate: '2024-12-31', team: ['Alexandre Vert', 'Thomas Leroy'], client: 'FoodTrace', createdAt: '2024-02-15T11:00:00Z', updatedAt: '2024-02-28T09:30:00Z' },
  { id: '18', name: 'Refonte identité visuelle', description: 'Nouveau logo, charte graphique et guidelines', status: 'termine', priority: 'moyenne', category: 'marketing', progress: 100, budget: 22000, startDate: '2023-11-01', endDate: '2024-01-15', team: ['Lucas Martin'], client: 'RebrandCo', createdAt: '2023-10-28T10:00:00Z', updatedAt: '2024-01-15T17:00:00Z' },
  { id: '19', name: 'Chatbot IA client', description: 'Chatbot intelligent pour le support client', status: 'en-cours', priority: 'haute', category: 'it', progress: 60, budget: 68000, startDate: '2024-01-05', endDate: '2024-04-05', team: ['Paul Martin', 'Sophie Bernard'], client: 'SupportPlus', createdAt: '2024-01-02T08:00:00Z', updatedAt: '2024-02-26T16:00:00Z' },
  { id: '20', name: 'Gestion de projet Agile', description: 'Formation et accompagnement méthodologie Agile', status: 'annule', priority: 'basse', category: 'hr', progress: 30, budget: 18000, startDate: '2024-02-01', endDate: '2024-03-31', team: ['Nathalie Blanc'], client: 'DevTeam', createdAt: '2024-01-28T09:00:00Z', updatedAt: '2024-02-20T10:00:00Z' },
];

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useLocalStorage('powalyze_projects', DEMO_PROJECTS);
  const [loading, setLoading] = useState(false);

  const createProject = (projectData) => {
    const newProject = {
      id: uuidv4(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: projectData.progress || 0,
      status: projectData.status || PROJECT_STATUSES.PLANNING,
      priority: projectData.priority || PROJECT_PRIORITIES.MEDIUM,
      documents: projectData.documents || [],
      tasks: projectData.tasks || [],
      team: projectData.team || [],
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const getProjectById = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  const addDocumentToProject = (projectId, document) => {
    const documentWithId = {
      ...document,
      id: document.id || uuidv4(),
      uploadedAt: document.uploadedAt || new Date().toISOString(),
    };
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              documents: [...(project.documents || []), documentWithId],
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
    return documentWithId;
  };

  const removeDocumentFromProject = (projectId, documentId) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              documents: project.documents.filter(doc => doc.id !== documentId),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  };

  const addTaskToProject = (projectId, task) => {
    const taskWithId = {
      ...task,
      id: task.id || uuidv4(),
      createdAt: task.createdAt || new Date().toISOString(),
    };
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...(project.tasks || []), taskWithId],
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
    return taskWithId;
  };

  const filterProjects = (filters) => {
    return projects.filter(project => {
      if (filters.status && project.status !== filters.status) return false;
      if (filters.priority && project.priority !== filters.priority) return false;
      if (filters.category && project.category !== filters.category) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          (project.description && project.description.toLowerCase().includes(searchLower))
        );
      }
      return true;
    });
  };

  const getStats = () => {
    return {
      total: projects.length,
      byStatus: {
        planning: projects.filter(p => p.status === PROJECT_STATUSES.PLANNING).length,
        inProgress: projects.filter(p => p.status === PROJECT_STATUSES.IN_PROGRESS).length,
        onHold: projects.filter(p => p.status === PROJECT_STATUSES.ON_HOLD).length,
        completed: projects.filter(p => p.status === PROJECT_STATUSES.COMPLETED).length,
        cancelled: projects.filter(p => p.status === PROJECT_STATUSES.CANCELLED).length,
      },
      byPriority: {
        critical: projects.filter(p => p.priority === PROJECT_PRIORITIES.CRITICAL).length,
        high: projects.filter(p => p.priority === PROJECT_PRIORITIES.HIGH).length,
        medium: projects.filter(p => p.priority === PROJECT_PRIORITIES.MEDIUM).length,
        low: projects.filter(p => p.priority === PROJECT_PRIORITIES.LOW).length,
      },
    };
  };

  const value = {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    addDocumentToProject,
    removeDocumentFromProject,
    addTaskToProject,
    filterProjects,
    getStats,
    PROJECT_STATUSES,
    PROJECT_PRIORITIES,
    PROJECT_CATEGORIES,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}

export default ProjectsContext;
