import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProject = (id) => projects.find(p => p.id === id);
  
  const getProjectDocuments = (projectId) => documents.filter(d => d.projectId === projectId);

  const addProject = (data) => {
    const newProject = {
      id: Date.now().toString(),
      name: data.name || 'Nouveau Projet',
      ...data
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
