/**
 * Phase Service - Gestion des phases d'exécution des projets
 * Powalyze V2
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupère toutes les phases d'un projet
 */
export async function getPhasesByProject(projectId) {
  const { data, error } = await customSupabaseClient
    .from('phases')
    .select(`
      *,
      tasks(id, status, assignee_id)
    `)
    .eq('project_id', projectId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  
  return data.map(phase => ({
    ...phase,
    task_count: phase.tasks?.length || 0,
    completed_tasks: phase.tasks?.filter(t => t.status === 'DONE').length || 0
  }));
}

/**
 * Récupère une phase par ID
 */
export async function getPhaseById(phaseId) {
  const { data, error } = await customSupabaseClient
    .from('phases')
    .select(`
      *,
      project:projects(id, name, code),
      tasks(*),
      risks(*, project_id, phase_id),
      budget_entries(*)
    `)
    .eq('id', phaseId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Crée une nouvelle phase
 */
export async function createPhase(phaseData) {
  // Récupère l'order_index max actuel
  const { data: existingPhases } = await customSupabaseClient
    .from('phases')
    .select('order_index')
    .eq('project_id', phaseData.project_id)
    .order('order_index', { ascending: false })
    .limit(1);

  const maxOrder = existingPhases?.[0]?.order_index || 0;

  const { data, error } = await customSupabaseClient
    .from('phases')
    .insert([{ 
      ...phaseData, 
      order_index: phaseData.order_index ?? maxOrder + 1 
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Met à jour une phase
 */
export async function updatePhase(phaseId, updates) {
  const { data, error } = await customSupabaseClient
    .from('phases')
    .update(updates)
    .eq('id', phaseId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime une phase
 */
export async function deletePhase(phaseId) {
  const { error } = await customSupabaseClient
    .from('phases')
    .delete()
    .eq('id', phaseId);

  if (error) throw error;
}

/**
 * Réordonne les phases d'un projet
 */
export async function reorderPhases(projectId, phaseOrders) {
  // phaseOrders = [{ id, order_index }, ...]
  const updates = phaseOrders.map(({ id, order_index }) =>
    customSupabaseClient
      .from('phases')
      .update({ order_index })
      .eq('id', id)
      .eq('project_id', projectId)
  );

  const results = await Promise.all(updates);
  
  const errors = results.filter(r => r.error);
  if (errors.length > 0) throw errors[0].error;
  
  return results.map(r => r.data);
}

/**
 * Calcule la progression d'une phase basée sur ses tasks
 */
export async function calculatePhaseProgress(phaseId) {
  const { data: tasks, error } = await customSupabaseClient
    .from('tasks')
    .select('status')
    .eq('phase_id', phaseId);

  if (error) throw error;

  if (tasks.length === 0) return 0;

  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  return Math.round((doneTasks / tasks.length) * 100);
}

/**
 * Met à jour automatiquement le completion_percent d'une phase
 */
export async function syncPhaseCompletion(phaseId) {
  const progress = await calculatePhaseProgress(phaseId);
  return updatePhase(phaseId, { completion_percent: progress });
}
