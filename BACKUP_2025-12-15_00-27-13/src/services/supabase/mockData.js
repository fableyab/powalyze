/**
 * Mock Data Service for LocalStorage Fallback
 * Implements CRUD operations using browser storage when Supabase is not connected.
 */

const STORAGE_KEYS = {
  USERS: 'powalyze_users',
  CLIENTS: 'powalyze_clients',
  PROJECTS: 'powalyze_projects',
  REPORTS: 'powalyze_reports',
  AUDIT: 'powalyze_audit'
};

const getStorage = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Initialize basic data if empty
const initData = () => {
  if (getStorage(STORAGE_KEYS.PROJECTS).length === 0) {
    const mockProjects = [
      { id: 'p1', client_id: 'c1', name: 'Digital Transformation Alpha', status: 'active', budget: 120000, actual_cost: 45000, progress: 35, risk_level: 'low', start_date: '2024-01-01', end_date: '2024-12-31' },
      { id: 'p2', client_id: 'c1', name: 'Cloud Migration', status: 'risk', budget: 85000, actual_cost: 60000, progress: 65, risk_level: 'high', start_date: '2024-02-01', end_date: '2024-08-30' },
      { id: 'p3', client_id: 'c1', name: 'ERP Upgrade', status: 'planned', budget: 250000, actual_cost: 0, progress: 0, risk_level: 'medium', start_date: '2024-06-01', end_date: '2025-06-01' }
    ];
    setStorage(STORAGE_KEYS.PROJECTS, mockProjects);
  }
};

initData();

export const mockService = {
  // --- USERS ---
  getUser: async (email) => {
    const users = getStorage(STORAGE_KEYS.USERS);
    return users.find(u => u.email === email);
  },
  createUser: async (user) => {
    const users = getStorage(STORAGE_KEYS.USERS);
    const newUser = { ...user, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    users.push(newUser);
    setStorage(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  // --- CLIENTS ---
  getClientByUserId: async (userId) => {
    // For demo, just return a mock client
    return { id: 'c1', user_id: userId, company_name: 'Demo Company', subscription_plan: 'premium' };
  },

  // --- PROJECTS ---
  getProjects: async (clientId) => {
    return getStorage(STORAGE_KEYS.PROJECTS);
  },
  createProject: async (project) => {
    const projects = getStorage(STORAGE_KEYS.PROJECTS);
    const newProject = { ...project, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    projects.push(newProject);
    setStorage(STORAGE_KEYS.PROJECTS, projects);
    return newProject;
  },

  // --- REPORTS ---
  getReports: async (clientId) => {
    return [
       { id: 'r1', title: 'Executive Overview', type: 'pmo', last_viewed_at: new Date().toISOString() },
       { id: 'r2', title: 'Financial Forecast', type: 'finance', last_viewed_at: new Date(Date.now() - 86400000).toISOString() },
       { id: 'r3', title: 'Sales Performance', type: 'sales', last_viewed_at: null }
    ];
  },

  // --- ANALYTICS ---
  logAction: async (userId, action, resource) => {
    const logs = getStorage(STORAGE_KEYS.AUDIT);
    logs.push({ id: crypto.randomUUID(), user_id: userId, action, resource, created_at: new Date().toISOString() });
    setStorage(STORAGE_KEYS.AUDIT, logs);
  }
};