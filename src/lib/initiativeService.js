/**
 * Initiative Service
 * Service pour gérer les initiatives/projets
 */

import customSupabaseClient from './customSupabaseClient';

export const initiativeService = {
  /**
   * Créer une nouvelle initiative (organization_id REQUIS)
   */
  async createInitiative(initiativeData) {
    // Récupérer l'utilisateur connecté
    const { data: { user }, error: authError } = await customSupabaseClient.auth.getUser();
    if (authError || !user) {
      throw new Error('Non authentifié');
    }

    // Récupérer l'organization_id de l'utilisateur si non fourni
    let organizationId = initiativeData.organization_id;
    
    if (!organizationId) {
      const { data: userOrg, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      if (orgError || !userOrg) {
        throw new Error('Organisation non trouvée pour cet utilisateur');
      }
      
      organizationId = userOrg.organization_id;
    }

    // Créer l'initiative avec organization_id obligatoire
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .insert([{
        organization_id: organizationId,
        name: initiativeData.name,
        description: initiativeData.description || null,
        status: initiativeData.status || 'planned',
        progress: initiativeData.progress || 0,
        owner_id: initiativeData.owner_id || user.id,
        start_date: initiativeData.start_date || null,
        end_date: initiativeData.end_date || null,
        budget: initiativeData.budget || null,
        priority: initiativeData.priority || 'medium',
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer toutes les initiatives (filtre automatique par organisation de l'utilisateur)
   */
  async getInitiatives(organizationId = null) {
    // Récupérer l'utilisateur connecté
    const { data: { user }, error: authError } = await customSupabaseClient.auth.getUser();
    if (authError || !user) {
      throw new Error('Non authentifié');
    }

    // Si pas d'organizationId fourni, récupérer celui de l'utilisateur
    let orgId = organizationId;
    
    if (!orgId) {
      const { data: userOrg, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      if (orgError || !userOrg) {
        throw new Error('Organisation non trouvée pour cet utilisateur');
      }
      
      orgId = userOrg.organization_id;
    }

    // Récupérer les initiatives de l'organisation
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Récupérer une initiative par ID
   */
  async getInitiativeById(initiativeId) {
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .select(`
        *,
        owner:owner_id(id, email),
        risks(*),
        milestones(*)
      `)
      .eq('id', initiativeId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour une initiative
   */
  async updateInitiative(initiativeId, updates) {
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .update(updates)
      .eq('id', initiativeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Supprimer une initiative
   */
  async deleteInitiative(initiativeId) {
    const { error } = await customSupabaseClient
      .from('initiatives')
      .delete()
      .eq('id', initiativeId);

    if (error) throw error;
    return true;
  },
};

export default initiativeService;
