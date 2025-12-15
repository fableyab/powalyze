import { supabase } from '@/lib/supabaseClient';
import { mockService } from './mockData';

/**
 * Unified Data Service for Projects, Clients, and Reports.
 * Handles switching between live Supabase data and local mock data.
 */

// --- PROJECT SERVICE ---
export const projectService = {
  getProjects: async (clientId) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
    return mockService.getProjects(clientId);
  },

  createProject: async (projectData) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    return mockService.createProject(projectData);
  }
};

// --- CLIENT SERVICE ---
export const clientService = {
  getClient: async (userId) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error && error.code !== 'PGRST116') throw error; // Ignore not found
      return data;
    }
    return mockService.getClientByUserId(userId);
  }
};

// --- REPORT SERVICE ---
export const reportService = {
  getReports: async (clientId) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('client_id', clientId);
      if (error) throw error;
      return data;
    }
    return mockService.getReports(clientId);
  }
};