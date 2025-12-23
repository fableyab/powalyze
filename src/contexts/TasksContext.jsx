import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within TasksProvider');
  }
  return context;
};

export const TASK_STATUSES = [
  { id: 'todo', label: 'À faire', color: 'gray', icon: '⚪' },
  { id: 'in-progress', label: 'En cours', color: 'blue', icon: '🔵' },
  { id: 'review', label: 'En revue', color: 'purple', icon: '🟣' },
  { id: 'done', label: 'Terminée', color: 'green', icon: '🟢' },
];

export const TASK_PRIORITIES = [
  { id: 'critique', label: 'Critique', color: 'red', icon: '🔴' },
  { id: 'haute', label: 'Haute', color: 'orange', icon: '🟠' },
  { id: 'moyenne', label: 'Moyenne', color: 'yellow', icon: '🟡' },
  { id: 'basse', label: 'Basse', color: 'green', icon: '🟢' },
];

const STORAGE_KEY = 'powalyze_tasks_v1';

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse tasks:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId
        ? { 
            ...task, 
            status: task.status === 'done' ? 'todo' : 'done',
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  };

  const getTasksByProject = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const value = {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById,
    getTasksByProject,
    getTasksByStatus,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};