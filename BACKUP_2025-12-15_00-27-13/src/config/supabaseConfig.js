import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * Supabase Configuration Export
 * Wraps the base client to provide a consistent interface
 * even if the environment variables are missing (simulated mode).
 */

export const supabaseClient = supabase;

export const config = {
  isEnabled: isSupabaseConfigured(),
  url: import.meta.env.VITE_SUPABASE_URL,
  storage: {
    avatarsBucket: 'avatars',
    documentsBucket: 'documents'
  }
};

export default supabaseClient;