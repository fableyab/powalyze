/**
 * Service de gestion des rapports personnalisés
 * Sauvegarde et récupération depuis Supabase
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Créer un nouveau rapport
 */
export async function createReport(reportData) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    // Récupérer le profil avec organization_id
    const { data: profile } = await customSupabaseClient
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .single();

    if (!profile?.organization_id) {
      throw new Error('Organisation non trouvée');
    }

    const { data, error } = await customSupabaseClient
      .from('reports')
      .insert([{
        organization_id: profile.organization_id,
        user_id: user.id,
        title: reportData.title,
        description: reportData.description,
        report_type: reportData.report_type || 'custom',
        period: reportData.period,
        sections: reportData.sections || {},
        data: reportData.data || {},
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur création rapport:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer tous les rapports de l'organisation
 */
export async function getReports(filters = {}) {
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

    let query = customSupabaseClient
      .from('reports')
      .select('*')
      .eq('organization_id', profile.organization_id)
      .order('created_at', { ascending: false });

    // Filtres optionnels
    if (filters.report_type) {
      query = query.eq('report_type', filters.report_type);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur récupération rapports:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer un rapport par ID
 */
export async function getReportById(reportId) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await customSupabaseClient
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur récupération rapport:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Mettre à jour un rapport
 */
export async function updateReport(reportId, updates) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await customSupabaseClient
      .from('reports')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur mise à jour rapport:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Supprimer un rapport
 */
export async function deleteReport(reportId) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error } = await customSupabaseClient
      .from('reports')
      .delete()
      .eq('id', reportId)
      .eq('user_id', user.id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression rapport:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Publier un rapport (changer status de draft à published)
 */
export async function publishReport(reportId) {
  try {
    return await updateReport(reportId, { 
      status: 'published',
      published_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur publication rapport:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Générer les données pour un rapport
 * Récupère les données depuis les différentes tables
 */
export async function generateReportData(reportType, period) {
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

    // Récupérer les projets
    const { data: projects } = await customSupabaseClient
      .from('projects')
      .select('*')
      .eq('organization_id', profile.organization_id);

    // Récupérer les risques
    const { data: risks } = await customSupabaseClient
      .from('risks')
      .select('*')
      .eq('organization_id', profile.organization_id);

    // Récupérer les décisions
    const { data: decisions } = await customSupabaseClient
      .from('decisions')
      .select('*')
      .eq('organization_id', profile.organization_id);

    // Calculer les métriques
    const metrics = {
      totalProjects: projects?.length || 0,
      activeProjects: projects?.filter(p => p.status === 'in_progress')?.length || 0,
      highRisks: risks?.filter(r => r.severity === 'high')?.length || 0,
      pendingDecisions: decisions?.filter(d => d.status === 'pending')?.length || 0,
      budgetTotal: projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0,
      budgetConsumed: projects?.reduce((sum, p) => sum + (p.budget_consumed || 0), 0) || 0
    };

    return {
      success: true,
      data: {
        projects: projects || [],
        risks: risks || [],
        decisions: decisions || [],
        metrics
      }
    };
  } catch (error) {
    console.error('Erreur génération données rapport:', error);
    return { success: false, error: error.message };
  }
}
