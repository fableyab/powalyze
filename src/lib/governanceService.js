/**
 * GOVERNANCE SERVICE
 * Gestion des modèles de gouvernance et des rituels exécutifs
 */

import customSupabaseClient from '@/lib/customSupabaseClient';

/**
 * Récupère tous les templates de gouvernance d'un workspace
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getTemplates(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('governance_templates')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getTemplates error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Crée un nouveau template de gouvernance
 * @param {Object} templateData - Données du template
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function createTemplate(templateData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('governance_templates')
      .insert([{
        workspace_id: templateData.workspace_id,
        name: templateData.name,
        description: templateData.description,
        cadence: templateData.cadence, // weekly, monthly, quarterly
        deliverables: templateData.deliverables, // JSONB array
        indicators: templateData.indicators // JSONB array
        // created_by auto-fill par trigger
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('createTemplate error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Met à jour un template de gouvernance
 * @param {string} templateId - ID du template
 * @param {Object} updates - Champs à mettre à jour
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function updateTemplate(templateId, updates) {
  try {
    const { data, error } = await customSupabaseClient
      .from('governance_templates')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', templateId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('updateTemplate error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Supprime un template de gouvernance
 * @param {string} templateId - ID du template
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function deleteTemplate(templateId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('governance_templates')
      .delete()
      .eq('id', templateId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('deleteTemplate error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère tous les rituels d'un workspace
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getRituals(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('rituals')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('next_date', { ascending: true });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getRituals error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Crée un nouveau rituel
 * @param {Object} ritualData - Données du rituel
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function createRitual(ritualData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('rituals')
      .insert([{
        workspace_id: ritualData.workspace_id,
        type: ritualData.type, // comex, codir, steering, review
        frequency: ritualData.frequency, // weekly, monthly, quarterly
        participants: ritualData.participants, // JSONB array [{user_id, role}]
        next_date: ritualData.next_date,
        notes: ritualData.notes
        // created_by auto-fill par trigger
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('createRitual error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Met à jour un rituel
 * @param {string} ritualId - ID du rituel
 * @param {Object} updates - Champs à mettre à jour
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function updateRitual(ritualId, updates) {
  try {
    const { data, error } = await customSupabaseClient
      .from('rituals')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', ritualId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('updateRitual error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Supprime un rituel
 * @param {string} ritualId - ID du rituel
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function deleteRitual(ritualId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('rituals')
      .delete()
      .eq('id', ritualId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('deleteRitual error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère le prochain rituel d'un type donné
 * @param {string} workspaceId - ID du workspace
 * @param {string} type - Type de rituel (comex, codir, steering, review)
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getNextRitual(workspaceId, type) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await customSupabaseClient
      .from('rituals')
      .select('*')
      .eq('workspace_id', workspaceId)
      .eq('type', type)
      .gte('next_date', today)
      .order('next_date', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('getNextRitual error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Prépare un pack comité pour un rituel
 * (Génère une synthèse des KPI, risques, décisions pour le comité)
 * @param {string} ritualId - ID du rituel
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function prepareCommittee(ritualId) {
  try {
    // Récupérer le rituel
    const { data: ritual, error: ritualError } = await customSupabaseClient
      .from('rituals')
      .select('*, workspace:workspace_id (id, name)')
      .eq('id', ritualId)
      .single();

    if (ritualError) throw ritualError;

    const workspaceId = ritual.workspace_id;

    // Récupérer les données pour le pack
    const [
      { data: overview },
      { data: risks },
      { data: decisions },
      { data: initiatives }
    ] = await Promise.all([
      // Portfolio overview
      customSupabaseClient
        .from('portfolio_overview')
        .select('*')
        .eq('workspace_id', workspaceId)
        .single(),
      
      // Top 5 risques critiques
      customSupabaseClient
        .from('risk_matrix_view')
        .select('*')
        .eq('workspace_id', workspaceId)
        .gte('score', 6)
        .order('score', { ascending: false })
        .limit(5),
      
      // Décisions en attente
      customSupabaseClient
        .from('decisions')
        .select('*, initiative:initiative_id (name)')
        .eq('status', 'pending')
        .order('due_date', { ascending: true })
        .limit(10),
      
      // Initiatives actives
      customSupabaseClient
        .from('initiatives')
        .select('id, name, status, strategic_alignment, risk_score')
        .eq('workspace_id', workspaceId)
        .in('status', ['in_progress', 'blocked'])
    ]);

    const pack = {
      ritual: {
        id: ritual.id,
        type: ritual.type,
        date: ritual.next_date,
        participants: ritual.participants
      },
      overview: overview || {},
      top_risks: risks || [],
      pending_decisions: decisions || [],
      active_initiatives: initiatives || [],
      generated_at: new Date().toISOString()
    };

    return { data: pack, error: null };
  } catch (err) {
    console.error('prepareCommittee error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Calcule la prochaine date d'un rituel basé sur sa fréquence
 * @param {string} frequency - Fréquence (weekly, monthly, quarterly)
 * @param {Date} currentDate - Date actuelle (optionnel, défaut: aujourd'hui)
 * @returns {string} - Date au format ISO (YYYY-MM-DD)
 */
export function calculateNextRitualDate(frequency, currentDate = new Date()) {
  const next = new Date(currentDate);

  switch (frequency) {
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    case 'quarterly':
      next.setMonth(next.getMonth() + 3);
      break;
    default:
      next.setDate(next.getDate() + 7); // Par défaut: weekly
  }

  return next.toISOString().split('T')[0];
}
