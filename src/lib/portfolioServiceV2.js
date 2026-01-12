/**
 * Portfolio Service - Gestion des portefeuilles (agrégateurs de projets)
 * Powalyze V2 - Un portfolio ne crée PAS de projets, il les référence
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupère tous les portfolios de l'organisation
 */
export async function getPortfolios(organizationId) {
  const { data, error } = await customSupabaseClient
    .from('portfolios')
    .select(`
      *,
      owner:profiles!owner_id(id, name, email),
      projects(id)
    `)
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Ajouter le comptage de projets
  return data.map(portfolio => ({
    ...portfolio,
    project_count: portfolio.projects?.length || 0
  }));
}

/**
 * Récupère un portfolio avec ses projets
 */
export async function getPortfolioById(portfolioId) {
  const { data, error } = await customSupabaseClient
    .from('portfolios')
    .select(`
      *,
      owner:profiles!owner_id(id, name, email, avatar_url),
      projects(
        id,
        code,
        name,
        status,
        health_status,
        budget_total,
        budget_spent,
        completion_percent,
        manager:profiles!manager_id(id, name),
        start_date,
        end_date
      )
    `)
    .eq('id', portfolioId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Crée un nouveau portfolio
 */
export async function createPortfolio(portfolioData) {
  const { data, error } = await customSupabaseClient
    .from('portfolios')
    .insert([portfolioData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Met à jour un portfolio
 */
export async function updatePortfolio(portfolioId, updates) {
  const { data, error } = await customSupabaseClient
    .from('portfolios')
    .update(updates)
    .eq('id', portfolioId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime un portfolio (les projets restent, juste dissociés)
 */
export async function deletePortfolio(portfolioId) {
  const { error } = await customSupabaseClient
    .from('portfolios')
    .delete()
    .eq('id', portfolioId);

  if (error) throw error;
}

/**
 * Récupère les stats d'un portfolio
 */
export async function getPortfolioStats(portfolioId) {
  const { data: projects, error } = await customSupabaseClient
    .from('projects')
    .select('status, health_status, budget_total, budget_spent')
    .eq('portfolio_id', portfolioId);

  if (error) throw error;

  const stats = {
    total_projects: projects.length,
    budget_total: projects.reduce((sum, p) => sum + (p.budget_total || 0), 0),
    budget_spent: projects.reduce((sum, p) => sum + (p.budget_spent || 0), 0),
    on_track: projects.filter(p => p.health_status === 'ON_TRACK').length,
    at_risk: projects.filter(p => p.health_status === 'AT_RISK').length,
    off_track: projects.filter(p => p.health_status === 'OFF_TRACK').length,
    by_status: {
      planned: projects.filter(p => p.status === 'PLANNED').length,
      in_progress: projects.filter(p => p.status === 'IN_PROGRESS').length,
      on_hold: projects.filter(p => p.status === 'ON_HOLD').length,
      done: projects.filter(p => p.status === 'DONE').length,
      cancelled: projects.filter(p => p.status === 'CANCELLED').length
    }
  };

  return stats;
}

/**
 * Récupère les risques agrégés d'un portfolio
 */
export async function getPortfolioRisks(portfolioId) {
  const { data, error } = await customSupabaseClient
    .from('risks')
    .select(`
      *,
      project:projects!inner(id, name, code, portfolio_id)
    `)
    .eq('project.portfolio_id', portfolioId)
    .eq('status', 'OPEN')
    .order('impact', { ascending: false });

  if (error) throw error;
  return data;
}
