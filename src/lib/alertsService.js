/**
 * Service de gestion des alertes
 * Gère les notifications, signaux faibles, et événements critiques
 */

import customSupabaseClient from './customSupabaseClient';

/**
 * Récupérer toutes les alertes
 */
export async function getAlerts(filters = {}) {
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
      .from('alerts')
      .select('*')
      .eq('organization_id', profile.organization_id)
      .order('created_at', { ascending: false });

    // Filtres
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Erreur récupération alertes:', error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Créer une nouvelle alerte
 */
export async function createAlert(alertData) {
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

    const { data, error } = await customSupabaseClient
      .from('alerts')
      .insert([{
        organization_id: profile.organization_id,
        user_id: user.id,
        type: alertData.type || 'info',
        title: alertData.title,
        description: alertData.description,
        project_id: alertData.project_id,
        action: alertData.action,
        status: 'active',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur création alerte:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Marquer une alerte comme lue/résolue
 */
export async function updateAlertStatus(alertId, status) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { data, error } = await customSupabaseClient
      .from('alerts')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', alertId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Erreur mise à jour alerte:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Supprimer une alerte
 */
export async function deleteAlert(alertId) {
  try {
    const { data: { user } } = await customSupabaseClient.auth.getUser();
    if (!user) throw new Error('Non authentifié');

    const { error } = await customSupabaseClient
      .from('alerts')
      .delete()
      .eq('id', alertId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression alerte:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Récupérer les stats d'alertes
 */
export async function getAlertStats() {
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

    const { data: alerts } = await customSupabaseClient
      .from('alerts')
      .select('*')
      .eq('organization_id', profile.organization_id)
      .eq('status', 'active');

    const stats = {
      total: alerts?.length || 0,
      critical: alerts?.filter(a => a.type === 'critical')?.length || 0,
      warning: alerts?.filter(a => a.type === 'warning')?.length || 0,
      info: alerts?.filter(a => a.type === 'info')?.length || 0
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Erreur stats alertes:', error);
    return { success: false, error: error.message, data: { total: 0, critical: 0, warning: 0, info: 0 } };
  }
}
