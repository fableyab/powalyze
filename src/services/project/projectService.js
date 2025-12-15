const STORAGE_KEY = 'powalyze_projects';
const DEMO_CLIENT_ID = 'demo';

const getStoredProjects = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveStoredProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const projectService = {
  createProject: async (projectData) => {
    // Simulate delay
    await new Promise(r => setTimeout(r, 500));
    
    const newProject = {
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: projectData.status || 'Planning',
      progress: 0,
      health: 100,
      ...projectData
    };
    
    const projects = getStoredProjects();
    projects.push(newProject);
    saveStoredProjects(projects);
    
    return newProject;
  },

  updateProject: async (id, projectData) => {
    const projects = getStoredProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
       projects[index] = { ...projects[index], ...projectData };
       saveStoredProjects(projects);
       return projects[index];
    }
    throw new Error('Project not found');
  },

  deleteProject: async (id) => {
    const projects = getStoredProjects();
    const filtered = projects.filter(p => p.id !== id);
    saveStoredProjects(filtered);
    return true;
  },

  getProject: async (id) => {
    const projects = getStoredProjects();
    return projects.find(p => p.id === id) || null;
  },

  getProjects: async (userId) => {
    const projects = getStoredProjects();
    if (userId === DEMO_CLIENT_ID) return projects; // Return all for demo
    return projects.filter(p => p.client_id === userId);
  },
  
  getProjectsByStatus: async (userId, status) => {
    const projects = await projectService.getProjects(userId);
    return projects.filter(p => p.status === status);
  },

  getProjectsByPriority: async (userId, priority) => {
    const projects = await projectService.getProjects(userId);
    return projects.filter(p => p.priority === priority);
  },

  validateProject: (data) => {
     if (!data.name || data.name.length < 3) return { valid: false, error: "Name too short" };
     if (!data.budget || isNaN(data.budget)) return { valid: false, error: "Invalid budget" };
     return { valid: true };
  }
};