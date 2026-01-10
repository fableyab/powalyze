
import { supabase } from '@/lib/customSupabaseClient';

export const adminService = {
  async getUsers() {
    // Note: This requires access to auth.users which is restricted.
    // Usually we query a public 'profiles' table instead.
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createUser(email, password, metadata) {
    // Only works if using service role key on backend, or if 'Enable Manual User Creation' is on.
    // For client-side, we usually use inviteUserByEmail
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: metadata
    });
    
    if (error) throw error;
    return data;
  },

  async getAuditLogs() {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, profiles(name, email)')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    return data;
  },

  async getSystemHealth() {
    // Mock data since we can't access real server stats from client
    return {
      uptime: 99.99,
      dbSize: '450 MB',
      storageUsed: '12 GB',
      activeUsers: 42
    };
  },

  // ===== TEAM INVITATION MANAGEMENT =====
  
  /**
   * Invite un nouveau membre dans l'équipe
   * @param {string} email - Email du membre à inviter
   * @param {string} role - Rôle ('admin', 'pmo', 'manager', 'contributor', 'viewer', 'auditor')
   * @param {string} tenantId - ID du tenant
   * @returns {Promise<Object>} - Données de l'invitation
   */
  async inviteTeamMember(email, role, tenantId) {
    // 1. Vérifier si l'email existe déjà dans le tenant
    const { data: existing } = await supabase
      .from('team')
      .select('*')
      .eq('email', email)
      .eq('tenant_id', tenantId)
      .single();

    if (existing) {
      throw new Error('Ce membre fait déjà partie de l\'équipe');
    }

    // 2. Obtenir l'utilisateur actuel (celui qui invite)
    const { data: { user } } = await supabase.auth.getUser();
    
    // 3. Inviter via Supabase Auth (envoie un email automatique)
    const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { role, tenant_id: tenantId }
    });

    if (authError) throw authError;

    // 4. Ajouter dans la table team
    const { data: teamData, error: teamError } = await supabase
      .from('team')
      .insert({
        email,
        role,
        tenant_id: tenantId,
        invited_by: user?.id,
        status: 'invited'
      })
      .select()
      .single();

    if (teamError) throw teamError;

    return teamData;
  },

  /**
   * Récupère tous les membres de l'équipe d'un tenant
   * @param {string} tenantId - ID du tenant
   * @returns {Promise<Array>} - Liste des membres
   */
  async getTeamMembers(tenantId) {
    const { data, error } = await supabase
      .rpc('get_team_members', { tenant_uuid: tenantId });

    if (error) throw error;
    return data || [];
  },

  /**
   * Met à jour le rôle d'un membre
   * @param {string} memberId - ID du membre dans la table team
   * @param {string} newRole - Nouveau rôle
   * @returns {Promise<Object>} - Membre mis à jour
   */
  async updateMemberRole(memberId, newRole) {
    const { data, error } = await supabase
      .from('team')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', memberId)
      .select()
      .single();

    if (error) throw error;

    // Si le membre est actif, mettre à jour aussi son profil
    if (data.user_id) {
      await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', data.user_id);
    }

    return data;
  },

  /**
   * Supprime un membre de l'équipe
   * @param {string} memberId - ID du membre dans la table team
   * @returns {Promise<void>}
   */
  async removeMember(memberId) {
    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', memberId);

    if (error) throw error;
  },

  /**
   * Renvoie une invitation
   * @param {string} email - Email du membre
   * @param {string} tenantId - ID du tenant
   * @returns {Promise<Object>}
   */
  async resendInvitation(email, tenantId) {
    const { data: member } = await supabase
      .from('team')
      .select('*')
      .eq('email', email)
      .eq('tenant_id', tenantId)
      .single();

    if (!member) {
      throw new Error('Membre introuvable');
    }

    // Renvoyer l'invitation via Supabase Auth
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { role: member.role, tenant_id: tenantId }
    });

    if (error) throw error;

    // Mettre à jour la date d'invitation
    await supabase
      .from('team')
      .update({ invited_at: new Date().toISOString() })
      .eq('id', member.id);

    return member;
  }
};
