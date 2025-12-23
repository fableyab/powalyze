import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProjectsContext = createContext();

// États et priorités des projets
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

export function ProjectsProvider({ children }) {
  // Utiliser localStorage pour la persistence
  const [projects, setProjects] = useLocalStorage('powalyze_projects', []);
  const [loading, setLoading] = useState(false);

  // Créer un nouveau projet
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

  // Mettre à jour un projet
  const updateProject = (projectId, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  };

  // Supprimer un projet
  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  // Obtenir un projet par ID
  const getProjectById = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  // Ajouter un document à un projet
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

  // Supprimer un document d'un projet
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

  // Ajouter une tâche à un projet
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

  // Filtrer les projets
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

  // Calculer les statistiques
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
