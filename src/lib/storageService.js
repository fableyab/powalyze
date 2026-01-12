
import { supabase } from '@/lib/customSupabaseClient';

export const storageService = {
  async getStorageUsage(userId) {
    try {
      // Get user's organization first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { used: 0, total: 10 * 1024 * 1024 * 1024, percentage: 0 };

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile?.organization_id) {
        return { used: 0, total: 10 * 1024 * 1024 * 1024, percentage: 0 };
      }

      // Query documents by organization
      const { data, error } = await supabase
        .from('documents')
        .select('file_size')
        .eq('organization_id', profile.organization_id);

      if (error) throw error;

      const usedBytes = data.reduce((acc, curr) => acc + (curr.file_size || 0), 0);
      const totalBytes = 10 * 1024 * 1024 * 1024; // 10 GB Limit

      return {
        used: usedBytes,
        total: totalBytes,
        percentage: (usedBytes / totalBytes) * 100
      };
    } catch (error) {
      console.error('Error fetching storage usage:', error);
      return { used: 0, total: 10 * 1024 * 1024 * 1024, percentage: 0 };
    }
  }
};
