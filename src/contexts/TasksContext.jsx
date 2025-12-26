import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Analyse des besoins',
      description: 'Réunion avec le client pour définir les objectifs',
      projectId: '1',
      projectName: 'Site e-commerce',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Jean Dupont',
      dueDate: '2024-01-15',
      completedDate: '2024-01-14',
      tags: ['réunion', 'analyse'],
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Design des maquettes',
      description: 'Création des wireframes et mockups',
      projectId: '1',
      projectName: 'Site e-commerce',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Marie Laurent',
      dueDate: '2024-01-25',
      completedDate: null,
      tags: ['design', 'UI/UX'],
      createdAt: '2024-01-12',
      progress: 65,
    },
    {
      id: '3',
      title: 'Configuration serveur',
      description: 'Setup environnement de production',
      projectId: '1',
      projectName: 'Site e-commerce',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Paul Martin',
      dueDate: '2024-02-01',
      completedDate: null,
      tags: ['backend', 'devops'],
      createdAt: '2024-01-15',
    },
    {
      id: '4',
      title: 'Migration base de données',
      description: 'Transfer des données legacy vers le nouveau système',
      projectId: '2',
      projectName: 'Application mobile',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Sophie Bernard',
      dueDate: '2024-02-10',
      completedDate: null,
      tags: ['database', 'migration'],
      createdAt: '2024-01-18',
    },
    {
      id: '5',
      title: 'Tests utilisateurs',
      description: 'Sessions de tests avec les utilisateurs finaux',
      projectId: '2',
      projectName: 'Application mobile',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Jean Dupont',
      dueDate: '2024-01-30',
      completedDate: null,
      tags: ['testing', 'UX'],
      createdAt: '2024-01-20',
      progress: 40,
    },
    {
      id: '6',
      title: 'Documentation API',
      description: 'Rédaction de la documentation technique',
      projectId: '3',
      projectName: 'Dashboard analytique',
      status: 'blocked',
      priority: 'medium',
      assignedTo: 'Marc Dubois',
      dueDate: '2024-02-05',
      completedDate: null,
      tags: ['documentation', 'API'],
      createdAt: '2024-01-22',
      blockedReason: 'En attente de validation client',
    },
  ]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedDate: null,
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, ...updates };
        if (updates.status === 'completed' && !task.completedDate) {
          updatedTask.completedDate = new Date().toISOString();
          updatedTask.progress = 100;
        } else if (updates.status !== 'completed' && task.completedDate) {
          updatedTask.completedDate = null;
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getOverdueTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.status !== 'completed' && 
      task.dueDate && 
      task.dueDate < today
    );
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const overdue = getOverdueTasks().length;

    return {
      total,
      completed,
      inProgress,
      pending,
      blocked,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByProject,
    getTasksByStatus,
    getOverdueTasks,
    getTaskStats,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
