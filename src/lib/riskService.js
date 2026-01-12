/**
 * Risk Service
 * Service pour gérer les risques
 */

import customSupabaseClient from './customSupabaseClient';

export const riskService = {
  /**
   * Créer un nouveau risque
   */
  async createRisk(initiativeId, riskData) {
    const { data, error } = await customSupabaseClient
      .from('risks')
      .insert([{
        initiative_id: initiativeId,
        name: riskData.name,
        description: riskData.description || null,
        probability: riskData.probability || 0,
        impact: riskData.impact || 0,
        status: riskData.status || 'open',
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer tous les risques d'une initiative
   */
  async getRisks(initiativeId) {
    const { data, error } = await customSupabaseClient
      .from('risks')
      .select(`
        *,
        initiative:initiative_id(id, name),
        risk_actions(*)
      `)
      .eq('initiative_id', initiativeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer tous les risques d'une organisation
   */
  async getRisksByOrganization(organizationId) {
    const { data, error } = await customSupabaseClient
      .from('risks')
      .select(`
        *,
        initiative:initiative_id(id, name, organization_id)
      `)
      .eq('initiative.organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Récupérer un risque par ID
   */
  async getRiskById(riskId) {
    const { data, error } = await customSupabaseClient
      .from('risks')
      .select(`
        *,
        initiative:initiative_id(id, name),
        risk_actions(*)
      `)
      .eq('id', riskId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mettre à jour un risque
   */
  async updateRisk(riskId, updates) {
    const { data, error } = await customSupabaseClient
      .from('risks')
      .update(updates)
      .eq('id', riskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Supprimer un risque
   */
  async deleteRisk(riskId) {
    const { error } = await customSupabaseClient
      .from('risks')
      .delete()
      .eq('id', riskId);

    if (error) throw error;
    return true;
  },

  /**
   * Créer une action de mitigation pour un risque
   */
  async createRiskAction(riskId, actionData) {
    const { data, error } = await customSupabaseClient
      .from('risk_actions')
      .insert([{
        risk_id: riskId,
        name: actionData.name,
        status: actionData.status || 'open',
        owner_id: actionData.owner_id || null,
        due_date: actionData.due_date || null,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export default riskService;
