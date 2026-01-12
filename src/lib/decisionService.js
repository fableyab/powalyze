/**
 * Decision Service
 * Service pour gérer les décisions
 */

import customSupabaseClient from './customSupabaseClient';

export const decisionService = {
  /**
   * Créer une nouvelle décision
   */
  async createDecision(organizationId, decisionData) {
    const { data, error } = await customSupabaseClient
      .from('decisions')
      .insert([{
        organization_id: organizationId,
        title: decisionData.title,
        description: decisionData.description || null,
        impact_level: decisionData.impact_level || 'medium',
        due_date: decisionData.due_date || null,
        status: decisionData.status || 'pending',
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer toutes les décisions d'une organisation
   */
  async getDecisions(organizationId) {
    const { data, error } = await customSupabaseClient
      .from('decisions')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer une décision par ID
   */
  async getDecisionById(decisionId) {
    const { data, error } = await customSupabaseClient
      .from('decisions')
      .select('*')
      .eq('id', decisionId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour une décision
   */
  async updateDecision(decisionId, updates) {
    const { data, error } = await customSupabaseClient
      .from('decisions')
      .update(updates)
      .eq('id', decisionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Supprimer une décision
   */
  async deleteDecision(decisionId) {
    const { error } = await customSupabaseClient
      .from('decisions')
      .delete()
      .eq('id', decisionId);

    if (error) throw error;
    return true;
  },

  /**
   * Récupérer les décisions prioritaires (urgentes)
   */
  async getPriorityDecisions(organizationId) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await customSupabaseClient
      .from('decisions')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'pending')
      .gte('due_date', today)
      .order('due_date', { ascending: true })
      .limit(5);

    if (error) throw error;
    return data;
  },
};

export default decisionService;

// Export des fonctions individuelles pour faciliter l'import
export async function getDecisions() {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: profile } = await customSupabaseClient
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    return await decisionService.getDecisions(profile.organization_id);
  } catch (error) {
    console.error('Erreur récupération décisions:', error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function createDecision(decisionData) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: profile } = await customSupabaseClient
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    const data = await decisionService.createDecision(profile.organization_id, decisionData);
    return { success: true, data };
  } catch (error) {
    console.error('Erreur création décision:', error);
    return { success: false, error: error.message };
  }
}
