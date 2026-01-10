
import { supabase } from '@/lib/customSupabaseClient';

export const storageService = {
  async getStorageUsage(userId) {
    try {
      // In a real scenario, we might query a 'documents' table to sum file_size
      // For this implementation, we will mock/calculate based on the documents table provided in schema
      const { data, error } = await supabase
        .from('documents')
        .select('file_size')
        .eq('user_id', userId);

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
