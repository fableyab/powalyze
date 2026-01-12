/**
 * Environment Service - Gestion des environnements demo/prod
 * Permet de créer des organisations demo ou prod et gérer leur cycle de vie
 */

import customSupabaseClient from './customSupabaseClient';

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001';

export const environmentService = {
  /**
   * Créer une nouvelle organisation (demo ou prod)
   */
  async createOrganization(name, environment = 'prod', userId) {
    try {
      // Créer l'organisation (note: environment n'est pas stocké en DB)
      const { data: org, error: orgError } = await customSupabaseClient
        .from('organizations')
        .insert([{ 
          name
        }])
        .select()
        .single();

      if (orgError) throw orgError;

      // Lier l'utilisateur en tant qu'admin
      if (userId) {
        const { error: linkError } = await customSupabaseClient
          .from('user_organizations')
          .insert([{
            user_id: userId,
            organization_id: org.id,
            role: 'admin'
          }]);

        if (linkError) throw linkError;
      }

      return { organization: org, error: null };
    } catch (error) {
      console.error('Error creating organization:', error);
      return { organization: null, error };
    }
  },

  /**
   * Accéder à l'organisation de démonstration
   */
  async getDemoOrganization() {
    try {
      const { data, error } = await customSupabaseClient
        .from('organizations')
        .select('*')
        .eq('id', DEMO_ORG_ID)
        .single();

      if (error) throw error;
      return { organization: data, error: null };
    } catch (error) {
      console.error('Error fetching demo organization:', error);
      return { organization: null, error };
    }
  },

  /**
   * Donner accès à la démo à un utilisateur
   */
  async giveDemoAccess(userId) {
    try {
      const { error } = await customSupabaseClient
        .from('user_organizations')
        .insert([{
          user_id: userId,
          organization_id: DEMO_ORG_ID,
          role: 'viewer'
        }])
        .select();

      if (error) {
        // Si l'utilisateur a déjà accès, ignorer l'erreur
        if (error.code === '23505') {
          return { success: true, error: null };
        }
        throw error;
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('Error giving demo access:', error);
      return { success: false, error };
    }
  },

  /**
   * Vérifier si un utilisateur a accès à la démo
   */
  async hasDemoAccess(userId) {
    try {
      const { data, error } = await customSupabaseClient
        .from('user_organizations')
        .select('*')
        .eq('user_id', userId)
        .eq('organization_id', DEMO_ORG_ID)
        .single();

      return { hasAccess: !!data && !error, error: null };
    } catch (error) {
      return { hasAccess: false, error };
    }
  },

  /**
   * Lister toutes les organisations d'un utilisateur avec leur type
   */
  async getUserOrganizations(userId) {
    try {
      const { data, error } = await customSupabaseClient
        .from('user_organizations')
        .select(`
          organization_id,
          role,
          organizations (
            id,
            name,
            environment,
            created_at
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const organizations = data.map(item => ({
        id: item.organizations.id,
        name: item.organizations.name,
        environment: item.organizations.environment,
        role: item.role,
        created_at: item.organizations.created_at,
        isDemo: item.organizations.environment === 'demo'
      }));

      return { organizations, error: null };
    } catch (error) {
      console.error('Error fetching user organizations:', error);
      return { organizations: [], error };
    }
  },

  /**
   * Obtenir les stats d'une organisation
   */
  async getOrganizationStats(organizationId) {
    try {
      const [initiatives, decisions, committees, documents] = await Promise.all([
        customSupabaseClient
          .from('initiatives')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', organizationId),
        customSupabaseClient
          .from('decisions')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', organizationId),
        customSupabaseClient
          .from('committees')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', organizationId),
        customSupabaseClient
          .from('documents')
          .select('id', { count: 'exact', head: true })
          .eq('organization_id', organizationId)
      ]);

      return {
        stats: {
          initiatives: initiatives.count || 0,
          decisions: decisions.count || 0,
          committees: committees.count || 0,
          documents: documents.count || 0
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching organization stats:', error);
      return { stats: null, error };
    }
  },

  /**
   * Créer une organisation prod pour un nouveau client
   */
  async createClientOrganization(clientName, adminUserId) {
    return this.createOrganization(clientName, 'prod', adminUserId);
  }
};

export default environmentService;
