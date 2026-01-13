/**
 * Service de gestion des projets
 * CRUD complet avec connexion Supabase
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupérer tous les projets de l'organisation
 */
export async function getProjects(filters = {}) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: userOrg } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', user.id)
      .single();

    if (!userOrg?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    let query = customSupabaseClient
      .from('projects')
      .select('*')
      .eq('organization_id', userOrg.organization_id)
      .order('created_at', { ascending: false });

    // Filtres optionnels
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.lane) {
      query = query.eq('lane', filters.lane);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Erreur récupération projets:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Récupérer un projet par ID
 */
export async function getProjectById(projectId) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await customSupabaseClient
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur récupération projet:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Créer un nouveau projet
 */
export async function createProject(projectData) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: userOrg } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', user.id)
      .single();

    if (!userOrg?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    const { data, error } = await customSupabaseClient
      .from('projects')
      .insert([{
        organization_id: userOrg.organization_id,
        user_id: user.id,
        name: projectData.name,
        description: projectData.description,
        status: projectData.status || 'planning',
        lane: projectData.lane || 'Change',
        sponsor: projectData.sponsor,
        progress: projectData.progress || 0,
        risk_level: projectData.risk_level || 'Moyen',
        budget: projectData.budget || 0,
        budget_consumed: projectData.budget_consumed || 0,
        team_size: projectData.team_size || 0,
        deadline: projectData.deadline,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur création projet:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour un projet
 */
export async function updateProject(projectId, updates) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await customSupabaseClient
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur mise à jour projet:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Supprimer un projet
 */
export async function deleteProject(projectId) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error } = await customSupabaseClient
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les stats globales
 */
export async function getProjectStats() {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data: userOrg } = await customSupabaseClient
      .from('user_organizations')
      .select('organization_id')
      .eq('user_id', user.id)
      .single();

    if (!userOrg?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    const { data: projects } = await customSupabaseClient
      .from('projects')
      .select('*')
      .eq('organization_id', userOrg.organization_id);

    const stats = {
      total: projects?.length || 0,
      active: projects?.filter(p => p.status === 'in_progress')?.length || 0,
      budgetTotal: projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0,
      budgetConsumed: projects?.reduce((sum, p) => sum + (p.budget_consumed || 0), 0) || 0,
      avgProgress: projects?.length > 0 
        ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
        : 0
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Erreur stats projets:', error);
    return { success: false, error: error.message, data: { total: 0, active: 0, budgetTotal: 0, budgetConsumed: 0, avgProgress: 0 } };
  }
}
