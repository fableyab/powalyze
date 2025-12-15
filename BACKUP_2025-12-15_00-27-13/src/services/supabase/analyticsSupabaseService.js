import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * MOCK DATA GENERATOR
 * Used when Supabase is not connected to show visuals in dashboard
 */
const generateMockData = () => {
  const events = [];
  const pageViews = [];
  const users = ['user1', 'user2', 'user3', 'user4', 'anon1', 'anon2'];
  const pages = ['/dashboard', '/home', '/reports', '/settings', '/profile'];
  const eventTypes = ['button_click', 'download', 'filter_use', 'feature_access'];
  
  const now = new Date();
  
  // Generate 7 days of data
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(now);
    dayDate.setDate(now.getDate() - i);
    const dateStr = dayDate.toISOString().split('T')[0];
    
    // Random events per day
    const dailyCount = 20 + Math.floor(Math.random() * 50);
    
    for (let j = 0; j < dailyCount; j++) {
      events.push({
        id: `evt_${i}_${j}`,
        event_name: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        user_id: users[Math.floor(Math.random() * users.length)],
        timestamp: `${dateStr}T${String(Math.floor(Math.random() * 23)).padStart(2, '0')}:00:00Z`
      });
      
      pageViews.push({
        id: `pv_${i}_${j}`,
        page_path: pages[Math.floor(Math.random() * pages.length)],
        user_id: users[Math.floor(Math.random() * users.length)],
        timestamp: `${dateStr}T${String(Math.floor(Math.random() * 23)).padStart(2, '0')}:00:00Z`
      });
    }
  }
  
  return { events, pageViews };
};

const mockData = generateMockData();

export const analyticsSupabaseService = {
  /**
   * Save a batch of events to Supabase
   */
  saveBatch: async (table, data) => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from(table).insert(data);
      if (error) console.error(`Analytics Sync Error (${table}):`, error);
      return !error;
    } else {
      // Log to console in dev/mock mode
      // console.log(`[Analytics Mock] Saved ${data.length} items to ${table}`, data);
      return true;
    }
  },

  /**
   * Fetch analytics data for dashboard
   */
  getDashboardData: async (startDate, endDate) => {
    if (isSupabaseConfigured() && supabase) {
      // Real DB Fetch
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());
        
      const { data: pageViews } = await supabase
        .from('analytics_page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      return { events: events || [], pageViews: pageViews || [] };
    } else {
      // Return Mock Data
      return mockData;
    }
  }
};