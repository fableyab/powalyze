/**
 * Project Service V2 - Source unique de vérité pour les projets
 * Powalyze V2 - Les projets sont créés ICI uniquement
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupère tous les projets avec filtres optionnels
 */
export async function getProjects(organizationId, filters = {}) {
  let query = customSupabaseClient
    .from('projects')
    .select(`
      *,
      portfolio:portfolios(id, name),
      sponsor:profiles!sponsor_id(id, name, avatar_url),
      manager:profiles!manager_id(id, name, avatar_url),
      phases(id),
      risks(id, status)
    `)
    .eq('organization_id', organizationId);

  // Filtres optionnels
  if (filters.portfolio_id) {
    query = query.eq('portfolio_id', filters.portfolio_id);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.health_status) {
    query = query.eq('health_status', filters.health_status);
  }
  if (filters.manager_id) {
    query = query.eq('manager_id', filters.manager_id);
  }
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) throw error;

  // Enrichir avec compteurs
  return data.map(project => ({
    ...project,
    phase_count: project.phases?.length || 0,
    open_risks: project.risks?.filter(r => r.status === 'OPEN').length || 0
  }));
}

/**
 * Récupère un projet avec tous ses détails
 */
export async function getProjectById(projectId) {
  const { data, error } = await customSupabaseClient
    .from('projects')
    .select(`
      *,
      portfolio:portfolios(id, name),
      sponsor:profiles!sponsor_id(id, name, email, avatar_url),
      manager:profiles!manager_id(id, name, email, avatar_url),
      phases(
        id,
        name,
        order_index,
        status,
        start_date,
        end_date,
        budget_allocated,
        budget_spent,
        completion_percent,
        tasks(id, status)
      ),
      kpis(*),
      risks(*, project_id, phase_id),
      budget_entries(*)
    `)
    .eq('id', projectId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Crée un nouveau projet
 */
export async function createProject(projectData) {
  const { data, error } = await customSupabaseClient
    .from('projects')
    .insert([projectData])
    .select(`
      *,
      portfolio:portfolios(id, name),
      sponsor:profiles!sponsor_id(id, name),
      manager:profiles!manager_id(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Met à jour un projet
 */
export async function updateProject(projectId, updates) {
  const { data, error } = await customSupabaseClient
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime un projet (cascade vers phases, tasks, risks, kpis, budget_entries)
 */
export async function deleteProject(projectId) {
  const { error } = await customSupabaseClient
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
}

/**
 * Associe un projet à un portfolio
 */
export async function assignToPortfolio(projectId, portfolioId) {
  return updateProject(projectId, { portfolio_id: portfolioId });
}

/**
 * Dissocie un projet de son portfolio
 */
export async function removeFromPortfolio(projectId) {
  return updateProject(projectId, { portfolio_id: null });
}

/**
 * Récupère les stats d'un projet
 */
export async function getProjectStats(projectId) {
  const { data: phases, error: phaseError } = await customSupabaseClient
    .from('phases')
    .select('status, budget_allocated, budget_spent, completion_percent')
    .eq('project_id', projectId);

  if (phaseError) throw phaseError;

  const { data: tasks, error: taskError } = await customSupabaseClient
    .from('tasks')
    .select('status, phase_id')
    .in('phase_id', phases.map(p => p.id));

  if (taskError) throw taskError;

  const stats = {
    phases: {
      total: phases.length,
      pending: phases.filter(p => p.status === 'PENDING').length,
      in_progress: phases.filter(p => p.status === 'IN_PROGRESS').length,
      done: phases.filter(p => p.status === 'DONE').length
    },
    tasks: {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'TODO').length,
      in_progress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      done: tasks.filter(t => t.status === 'DONE').length,
      blocked: tasks.filter(t => t.status === 'BLOCKED').length
    },
    budget: {
      allocated: phases.reduce((sum, p) => sum + (p.budget_allocated || 0), 0),
      spent: phases.reduce((sum, p) => sum + (p.budget_spent || 0), 0)
    },
    avg_completion: phases.length > 0 
      ? phases.reduce((sum, p) => sum + p.completion_percent, 0) / phases.length 
      : 0
  };

  return stats;
}

/**
 * Récupère la timeline d'un projet (phases + milestones)
 */
export async function getProjectTimeline(projectId) {
  const { data, error } = await customSupabaseClient
    .from('phases')
    .select('id, name, start_date, end_date, status, order_index')
    .eq('project_id', projectId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}
