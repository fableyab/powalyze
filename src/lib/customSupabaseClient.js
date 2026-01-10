import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqwcpewngbxnkcytztzk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd2NwZXduZ2J4bmtjeXR6dHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Njk4NTUsImV4cCI6MjA4MDU0NTg1NX0.XY-rz0BHw8Xe6fVa6FRHm2SoG0CCjF0TQZ7lUq9n234';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
