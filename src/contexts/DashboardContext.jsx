import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjectsContext } from './ProjectsContext';
import { useTasksContext } from './TasksContext';

const DashboardContext = createContext();

export const DASHBOARD_VIEWS = {
  GRID: 'grid',
  LIST: 'list',
  KANBAN: 'kanban'
};

export const DASHBOARD_FILTER_PRESETS = {
  ALL: 'all',
  ACTIVE: 'active',
  CRITICAL: 'critical',
  COMPLETED: 'completed'
};

export const DashboardProvider = ({ children }) => {
  const { projects, getProjectsByStatus } = useProjectsContext();
  const { tasks, getTasksByStatus } = useTasksContext();
  
  const [dashboardView, setDashboardView] = useState(() => {
    return localStorage.getItem('powalyze_dashboard_view') || DASHBOARD_VIEWS.GRID;
  });
  
  const [filterPreset, setFilterPreset] = useState(DASHBOARD_FILTER_PRESETS.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Persist view preference
  useEffect(() => {
    localStorage.setItem('powalyze_dashboard_view', dashboardView);
  }, [dashboardView]);

  // Calculate dashboard statistics
  const getDashboardStats = () => {
    const activeProjects = getProjectsByStatus('en-cours');
    const completedProjects = getProjectsByStatus('termine');
    const pausedProjects = getProjectsByStatus('en-pause');
    
    const criticalProjects = projects.filter(p => p.priority === 'critique');
    
    const todayTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const completedTasks = tasks.filter(t => t.status === 'done');
    
    const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const usedBudget = projects.reduce((sum, p) => sum + (p.budgetUsed || 0), 0);
    
    const teamMembers = [...new Set(projects.flatMap(p => p.teamMembers || []))].length;

    return {
      totalProjects: projects.length,
      activeProjects: activeProjects.length,
      completedProjects: completedProjects.length,
      pausedProjects: pausedProjects.length,
      criticalProjects: criticalProjects.length,
      todayTasks: todayTasks.length,
      inProgressTasks: inProgressTasks.length,
      completedTasks: completedTasks.length,
      totalBudget,
      usedBudget,
      budgetPercentage: totalBudget > 0 ? Math.round((usedBudget / totalBudget) * 100) : 0,
      teamMembers,
      averageProgress: projects.length > 0 
        ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
        : 0
    };
  };

  // Get filtered projects based on preset and search
  const getFilteredProjects = () => {
    let filtered = projects;

    // Apply preset filter
    switch (filterPreset) {
      case DASHBOARD_FILTER_PRESETS.ACTIVE:
        filtered = getProjectsByStatus('en-cours');
        break;
      case DASHBOARD_FILTER_PRESETS.CRITICAL:
        filtered = projects.filter(p => p.priority === 'critique');
        break;
      case DASHBOARD_FILTER_PRESETS.COMPLETED:
        filtered = getProjectsByStatus('termine');
        break;
      default:
        filtered = projects;
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.manager?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  // Get critical tasks (high priority or overdue)
  const getCriticalTasks = () => {
    return tasks.filter(t => 
      t.priority === 'critique' || 
      t.priority === 'haute' ||
      (t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done')
    ).slice(0, 5); // Limit to 5 most critical
  };

  // Get upcoming events/milestones
  const getUpcomingEvents = () => {
    const events = [];
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    projects.forEach(project => {
      // Add project deadlines
      if (project.endDate) {
        const endDate = new Date(project.endDate);
        if (endDate >= today && endDate <= nextWeek) {
          events.push({
            id: `project-${project.id}`,
            title: `Fin projet: ${project.name}`,
            date: project.endDate,
            type: 'deadline',
            project: project.name,
            priority: project.priority
          });
        }
      }
    });

    // Add task deadlines
    tasks.forEach(task => {
      if (task.dueDate && task.status !== 'done') {
        const dueDate = new Date(task.dueDate);
        if (dueDate >= today && dueDate <= nextWeek) {
          events.push({
            id: `task-${task.id}`,
            title: task.title,
            date: task.dueDate,
            type: 'task',
            project: task.project || 'Sans projet',
            priority: task.priority
          });
        }
      }
    });

    return events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 10);
  };

  // Get project by ID
  const getProjectById = (projectId) => {
    return projects.find(p => p.id === projectId);
  };

  // Get tasks for a specific project
  const getProjectTasks = (projectId) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  const value = {
    // View state
    dashboardView,
    setDashboardView,
    
    // Filter state
    filterPreset,
    setFilterPreset,
    searchQuery,
    setSearchQuery,
    
    // Selected project
    selectedProject,
    setSelectedProject,
    
    // Data getters
    getDashboardStats,
    getFilteredProjects,
    getCriticalTasks,
    getUpcomingEvents,
    getProjectById,
    getProjectTasks,
    
    // Direct access to projects and tasks
    projects,
    tasks
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within DashboardProvider');
  }
  return context;
};

export default DashboardContext;
