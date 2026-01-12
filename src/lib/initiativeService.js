/**
 * Initiative Service
 * Service pour gérer les initiatives/projets
 */

import customSupabaseClient from './customSupabaseClient';

export const initiativeService = {
  /**
   * Créer une nouvelle initiative (organization_id OPTIONNEL)
   */
  async createInitiative(initiativeData) {
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .insert([{
        organization_id: initiativeData.organization_id || null,
        name: initiativeData.name,
        description: initiativeData.description || null,
        status: initiativeData.status || 'planned',
        progress: initiativeData.progress || 0,
        owner_id: initiativeData.owner_id || null,
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
   * Récupérer toutes les initiatives (optionnel: filtrer par organisation)
   */
  async getInitiatives(organizationId = null) {
    let query = customSupabaseClient
      .from('initiatives')
      .select('*');

    // Filtrer par organisation si fourni
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

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
