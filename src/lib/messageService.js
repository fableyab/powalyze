
import { supabase } from '@/lib/customSupabaseClient';

export const messageService = {
  async getConversations(userId) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participants', [userId])
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getMessages(conversationId) {
    const { data, error } = await supabase
      .from('direct_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId, senderId, content) {
    const { data, error } = await supabase
      .from('direct_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content
      })
      .select()
      .single();
    
    if (error) throw error;

    // Update conversation timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date() })
      .eq('id', conversationId);

    return data;
  },

  async createConversation(participants, tenantId) {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        participants,
        tenant_id: tenantId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
