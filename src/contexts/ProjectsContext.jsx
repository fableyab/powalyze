import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectsContext must be used within ProjectsProvider');
  }
  return context;
};

export const PROJECT_STATUSES = [
  { id: 'planification', label: 'Planification', color: 'purple', icon: '📋' },
  { id: 'en-cours', label: 'En cours', color: 'blue', icon: '🚀' },
  { id: 'en-pause', label: 'En pause', color: 'yellow', icon: '⏸️' },
  { id: 'termine', label: 'Terminé', color: 'green', icon: '✅' },
  { id: 'annule', label: 'Annulé', color: 'red', icon: '❌' },
];

export const PROJECT_PRIORITIES = [
  { id: 'critique', label: 'Critique', color: 'red', icon: '🔴' },
  { id: 'haute', label: 'Haute', color: 'orange', icon: '🟠' },
  { id: 'moyenne', label: 'Moyenne', color: 'yellow', icon: '🟡' },
  { id: 'basse', label: 'Basse', color: 'green', icon: '🟢' },
];

export const PROJECT_CATEGORIES = [
  { id: 'transformation', label: 'Transformation', icon: '🔄' },
  { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
  { id: 'application', label: 'Application', icon: '📱' },
  { id: 'data', label: 'Data & Analytics', icon: '📊' },
  { id: 'securite', label: 'Sécurité', icon: '🔒' },
  { id: 'processus', label: 'Processus', icon: '⚙️' },
  { id: 'formation', label: 'Formation', icon: '🎓' },
  { id: 'autre', label: 'Autre', icon: '📦' },
];

const STORAGE_KEY = 'powalyze_projects_v1';

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse projects:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const getProjectById = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  const getProjectsByStatus = (status) => {
    return projects.filter(project => project.status === status);
  };

  const value = {
    projects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjectsByStatus,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};