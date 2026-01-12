/**
 * Budget Service - Gestion budgétaire des projets et phases
 * Powalyze V2
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupère toutes les entrées budgétaires d'un projet
 */
export async function getBudgetEntriesByProject(projectId) {
  const { data, error } = await customSupabaseClient
    .from('budget_entries')
    .select(`
      *,
      phase:phases(id, name)
    `)
    .eq('project_id', projectId)
    .order('entry_date', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Récupère les entrées budgétaires d'une phase
 */
export async function getBudgetEntriesByPhase(phaseId) {
  const { data, error } = await customSupabaseClient
    .from('budget_entries')
    .select('*')
    .eq('phase_id', phaseId)
    .order('entry_date', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Crée une entrée budgétaire
 */
export async function createBudgetEntry(entryData) {
  const { data, error } = await customSupabaseClient
    .from('budget_entries')
    .insert([entryData])
    .select()
    .single();

  if (error) throw error;

  // Mise à jour automatique du budget_spent du projet/phase
  if (entryData.type === 'ACTUAL') {
    await syncBudgetSpent(entryData.project_id, entryData.phase_id);
  }

  return data;
}

/**
 * Met à jour une entrée budgétaire
 */
export async function updateBudgetEntry(entryId, updates) {
  const { data, error } = await customSupabaseClient
    .from('budget_entries')
    .update(updates)
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime une entrée budgétaire
 */
export async function deleteBudgetEntry(entryId) {
  // Récupère l'entrée pour savoir quel projet/phase mettre à jour
  const { data: entry } = await customSupabaseClient
    .from('budget_entries')
    .select('project_id, phase_id, type')
    .eq('id', entryId)
    .single();

  const { error } = await customSupabaseClient
    .from('budget_entries')
    .delete()
    .eq('id', entryId);

  if (error) throw error;

  // Resync si c'était une dépense réelle
  if (entry?.type === 'ACTUAL') {
    await syncBudgetSpent(entry.project_id, entry.phase_id);
  }
}

/**
 * Synchronise le budget_spent d'un projet/phase
 */
async function syncBudgetSpent(projectId, phaseId = null) {
  if (phaseId) {
    // Sync phase
    const { data } = await customSupabaseClient
      .from('budget_entries')
      .select('amount')
      .eq('phase_id', phaseId)
      .eq('type', 'ACTUAL');

    const totalSpent = data?.reduce((sum, e) => sum + e.amount, 0) || 0;

    await customSupabaseClient
      .from('phases')
      .update({ budget_spent: totalSpent })
      .eq('id', phaseId);
  }

  if (projectId) {
    // Sync project
    const { data } = await customSupabaseClient
      .from('budget_entries')
      .select('amount')
      .eq('project_id', projectId)
      .eq('type', 'ACTUAL');

    const totalSpent = data?.reduce((sum, e) => sum + e.amount, 0) || 0;

    await customSupabaseClient
      .from('projects')
      .update({ budget_spent: totalSpent })
      .eq('id', projectId);
  }
}

/**
 * Récupère les stats budgétaires d'un projet
 */
export async function getProjectBudgetStats(projectId) {
  const { data: entries, error } = await customSupabaseClient
    .from('budget_entries')
    .select('category, type, amount')
    .eq('project_id', projectId);

  if (error) throw error;

  const stats = {
    total_planned: entries
      .filter(e => e.type === 'PLANNED')
      .reduce((sum, e) => sum + e.amount, 0),
    total_actual: entries
      .filter(e => e.type === 'ACTUAL')
      .reduce((sum, e) => sum + e.amount, 0),
    by_category: {}
  };

  // Grouper par catégorie
  const categories = ['CAPEX', 'OPEX', 'INTERNAL', 'EXTERNAL', 'OTHER'];
  categories.forEach(cat => {
    const catEntries = entries.filter(e => e.category === cat);
    stats.by_category[cat] = {
      planned: catEntries.filter(e => e.type === 'PLANNED').reduce((sum, e) => sum + e.amount, 0),
      actual: catEntries.filter(e => e.type === 'ACTUAL').reduce((sum, e) => sum + e.amount, 0)
    };
  });

  return stats;
}

/**
 * Récupère les stats budgétaires d'une phase
 */
export async function getPhaseBudgetStats(phaseId) {
  const { data: entries, error } = await customSupabaseClient
    .from('budget_entries')
    .select('category, type, amount')
    .eq('phase_id', phaseId);

  if (error) throw error;

  return {
    total_planned: entries
      .filter(e => e.type === 'PLANNED')
      .reduce((sum, e) => sum + e.amount, 0),
    total_actual: entries
      .filter(e => e.type === 'ACTUAL')
      .reduce((sum, e) => sum + e.amount, 0)
  };
}
