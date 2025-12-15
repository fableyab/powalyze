import React, { createContext, useContext, useState, useCallback } from 'react';
import { projectService } from '@/services/project/projectService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
       const userId = user?.id || 'demo';
       const data = await projectService.getProjects(userId);
       setProjects(data);
    } catch (err) {
       toast({ variant: "destructive", title: "Error", description: "Failed to load projects" });
    } finally {
       setLoading(false);
    }
  }, [user, toast]);

  const addProject = async (data) => {
    try {
       const userId = user?.id || 'demo';
       const newProj = await projectService.createProject({ ...data, client_id: userId });
       setProjects(prev => [newProj, ...prev]);
       toast({ title: "Success", description: "Project created." });
       return newProj;
    } catch (e) {
       toast({ variant: "destructive", title: "Error", description: e.message });
       throw e;
    }
  };

  const updateProject = async (id, data) => {
    try {
        const updated = await projectService.updateProject(id, data);
        setProjects(prev => prev.map(p => p.id === id ? updated : p));
        toast({ title: "Success", description: "Project updated." });
    } catch (e) {
        toast({ variant: "destructive", title: "Error", description: e.message });
        throw e;
    }
  };

  const removeProject = async (id) => {
     try {
        await projectService.deleteProject(id);
        setProjects(prev => prev.filter(p => p.id !== id));
        toast({ title: "Deleted", description: "Project removed." });
     } catch (e) {
        toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
     }
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, loadProjects, addProject, updateProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);