
import { supabase } from '@/lib/customSupabaseClient';

export const documentService = {
  async uploadDocument(file, userId, tenantId) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data, error: dbError } = await supabase.from('documents').insert({
      name: file.name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size,
      user_id: userId,
      tenant_id: tenantId
    }).select().single();

    if (dbError) throw dbError;
    return data;
  },

  async getDocuments(userId) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async deleteDocument(documentId, filePath) {
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([filePath]);
    
    if (storageError) console.error('Storage delete error:', storageError);

    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId);

    if (dbError) throw dbError;
  },

  async getDownloadUrl(filePath) {
    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, 60);
    
    if (error) throw error;
    return data.signedUrl;
  }
};
