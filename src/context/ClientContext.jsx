
import React, { createContext, useContext, useState, useEffect } from 'react';
import { clientProjects } from '@/data/clientProjects';
import { clientDocuments } from '@/data/clientDocuments';
import { clientTeam } from '@/data/clientTeam';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Network delay
      
      setProjects(clientProjects);
      setDocuments(clientDocuments);
      setTeam(clientTeam);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  const getProject = (id) => projects.find(p => p.id === id);
  
  const getProjectDocuments = (projectId) => documents.filter(d => d.projectId === projectId);

  const addProject = (data) => {
    const teamMembers = (data.team || []).map((name, idx) => ({
      name,
      avatar: (name?.trim()?.charAt(0) || 'M').toUpperCase() + (idx + 1)
    }));

    const newProject = {
      id: `p-${Date.now()}`,
      name: data.name,
      description: data.description || 'Nouveau projet créé depuis le portail.',
      type: data.type || 'Operational',
      status: data.status || 'Planning',
      priority: data.priority || 'Medium',
      sponsor: data.sponsor || 'Sponsor à définir',
      manager: data.manager || 'Manager à définir',
      team: teamMembers,
      budget: data.budget || 0,
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || data.startDate || new Date().toISOString(),
      deadline: data.endDate || data.startDate || new Date().toISOString(),
      progress: 0,
      documentsCount: 0,
      risks: data.risks || '',
      resources: data.resources || []
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  return (
    <ClientContext.Provider value={{
      projects,
      documents,
      team,
      loading,
      getProject,
      getProjectDocuments,
      addProject
    }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
