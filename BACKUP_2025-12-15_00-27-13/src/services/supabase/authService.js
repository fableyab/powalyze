import { supabase } from '@/lib/supabaseClient';
import { mockService } from './mockData';
import { azureAdService } from '@/services/auth/azureAdService';

export const authService = {
  /**
   * Register a new user
   */
  signUp: async (email, password, metadata) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      });
      if (error) throw error;
      return data;
    } else {
      // Mock Fallback
      return mockService.createUser({ email, ...metadata, role: 'user' });
    }
  },

  /**
   * Sign in existing user
   */
  signIn: async (email, password) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      // Mock Fallback
      const user = await mockService.getUser(email);
      // Fallback for "demo" user if not found in local storage
      if (!user && email === 'demo@powalyze.ch') {
         return { user: { id: 'demo-1', email, user_metadata: { name: 'Demo User' } }, session: { access_token: 'mock-token' } };
      }
      if (!user) throw new Error("User not found (Mock)");
      return { user, session: { access_token: 'mock-token' } };
    }
  },

  /**
   * Azure AD Sign In Integration
   */
  signInWithAzureAd: async () => {
    try {
      const response = await azureAdService.login();
      // In a real app, you would sync this user with Supabase here
      // For example, calling a backend function or using supabase.auth.signInWithIdToken if configured
      console.log("Azure AD User authenticated:", response.account);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    // Also try to logout from Azure if active
    try {
       // Optional: azureAdService.logout(); 
       // Usually we don't force global logout unless requested
    } catch (e) {
       console.log("Azure logout skipped or failed", e);
    }
    return true;
  }
};