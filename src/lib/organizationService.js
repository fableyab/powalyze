/**
 * Organization Service
 * Service pour gérer les organisations et l'auto-provisioning
 */

import customSupabaseClient from './customSupabaseClient';

export const organizationService = {
  /**
   * Obtenir ou créer automatiquement l'organisation de l'utilisateur
   * Cette fonction assure qu'un utilisateur a toujours une organisation
   */
  async getOrCreateUserOrganization(userId, userEmail, environment = 'prod') {
    try {
      // 1. Vérifier si l'utilisateur a déjà une organisation
      const { data: existingOrgs, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id, organizations(*)')
        .eq('user_id', userId);

      if (!orgError && existingOrgs && existingOrgs.length > 0) {
        // Prioriser l'org prod si plusieurs existent
        const prodOrg = existingOrgs.find(o => o.organizations?.environment === 'prod');
        const selectedOrg = prodOrg || existingOrgs[0];
        console.log('✅ Organisation existante trouvée:', selectedOrg.organization_id);
        return selectedOrg.organization_id;
      }

      // 2. Pas d'organisation trouvée - on en crée une automatiquement
      console.log('⚠️ Aucune organisation trouvée - création automatique...');

      // Créer l'organisation (sans owner_id, géré par user_organizations)
      const { data: newOrg, error: createOrgError } = await customSupabaseClient
        .from('organizations')
        .insert([{ 
          name: orgName,
          environment: environment 
        }])
        .select()
        .single();

      if (createOrgError) {
        console.error('❌ Erreur création organisation:', createOrgError);
        throw new Error('Impossible de créer l\'organisation: ' + createOrgError.message);
      }

      console.log('✅ Organisation créée:', newOrg);

      // 3. Lier l'utilisateur à la nouvelle organisation
      const { error: linkError } = await customSupabaseClient
        .from('user_organizations')
        .insert([{
          user_id: userId,
          organization_id: newOrg.id,
          role: 'admin'
        }]);

      if (linkError) {
        console.error('❌ Erreur liaison user-org:', linkError);
        throw new Error('Impossible de lier l\'utilisateur: ' + linkError.message);
      }

      console.log('✅ Utilisateur lié à l\'organisation avec succès');
      return newOrg.id;

    } catch (error) {
      console.error('❌ Erreur globale getOrCreateUserOrganization:', error);
      throw error;
    }
  },

  /**
   * Récupérer l'organization_id d'un utilisateur (avec fallback auto-création)
   */
  async getUserOrganizationId(userId, userEmail) {
    return await this.getOrCreateUserOrganization(userId, userEmail);
  },

  /**
   * Vérifier si un utilisateur appartient à une organisation
   */
  async hasOrganization(userId) {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    return !error && data;
  },

  /**
   * Obtenir les détails de l'organisation d'un utilisateur
   */
  async getUserOrganization(userId) {
    const { data, error } = await customSupabaseClient
      .from('user_organizations')
      .select(`
        organization_id,
        role,
        organizations (
          id,
          name,
          created_at
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour le nom de l'organisation
   */
  async updateOrganization(organizationId, updates) {
    const { data, error } = await customSupabaseClient
      .from('organizations')
      .update(updates)
      .eq('id', organizationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export default organizationService;
