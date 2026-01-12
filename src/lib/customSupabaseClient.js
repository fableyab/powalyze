import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://phfeteiholkfiredgero.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZmV0ZWlob2xrZmlyZWRnZXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjkwMzgsImV4cCI6MjA4MDU0NTAzOH0.ktSkQoksSUkWx_TmAJLa299Cg1lPyLwJvgh4EbV4qXM';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'powalyze-web',
    },
  },
});

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
