/**
 * DATA SERVICE
 * Gestion du catalogue de données, jobs d'automatisation et sources externes
 */

import customSupabaseClient from '@/lib/customSupabaseClient';

/**
 * Récupère le catalogue de données d'un workspace
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getCatalog(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('data_catalog')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getCatalog error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Ajoute une entrée au catalogue
 * @param {Object} catalogData - Données de l'entrée
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function addCatalogEntry(catalogData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('data_catalog')
      .insert([{
        workspace_id: catalogData.workspace_id,
        source: catalogData.source, // supabase, jira, sap, monday, excel
        table_name: catalogData.table_name,
        description: catalogData.description,
        owner: catalogData.owner,
        sensitivity: catalogData.sensitivity, // public, confidential, restricted
        quality_score: catalogData.quality_score || 0,
        last_updated: new Date().toISOString()
        // created_by auto-fill par trigger
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('addCatalogEntry error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Met à jour le score de qualité d'une entrée
 * @param {string} entryId - ID de l'entrée
 * @param {number} score - Score de qualité (0-100)
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function updateQualityScore(entryId, score) {
  try {
    const { data, error } = await customSupabaseClient
      .from('data_catalog')
      .update({
        quality_score: score,
        last_updated: new Date().toISOString()
      })
      .eq('id', entryId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('updateQualityScore error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère les jobs de données d'un workspace
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getDataJobs(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('data_jobs')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('next_run', { ascending: true });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getDataJobs error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Crée un nouveau job de données
 * @param {Object} jobData - Données du job
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function createDataJob(jobData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('data_jobs')
      .insert([{
        workspace_id: jobData.workspace_id,
        job_type: jobData.job_type, // sync, transform, export
        status: 'pending',
        config: jobData.config, // JSONB
        next_run: jobData.next_run || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('createDataJob error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Déclenche l'exécution d'un job
 * @param {string} jobId - ID du job
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function triggerJob(jobId) {
  try {
    // Marquer le job comme "running"
    const { data, error } = await customSupabaseClient
      .from('data_jobs')
      .update({
        status: 'running',
        last_run: new Date().toISOString(),
        error_message: null
      })
      .eq('id', jobId)
      .select()
      .single();

    if (error) throw error;

    // TODO: Déclencher l'exécution réelle du job (via backend API ou Edge Function)
    // Pour l'instant, juste update du status

    return { data, error: null };
  } catch (err) {
    console.error('triggerJob error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Met à jour le statut d'un job après exécution
 * @param {string} jobId - ID du job
 * @param {string} status - Nouveau statut (success, failed)
 * @param {string} errorMessage - Message d'erreur (si failed)
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function updateJobStatus(jobId, status, errorMessage = null) {
  try {
    const updates = {
      status,
      error_message: errorMessage,
      updated_at: new Date().toISOString()
    };

    // Si succès, calculer la prochaine exécution
    if (status === 'success') {
      const { data: job } = await customSupabaseClient
        .from('data_jobs')
        .select('config')
        .eq('id', jobId)
        .single();

      if (job?.config?.frequency) {
        updates.next_run = calculateNextRun(job.config.frequency);
      }
    }

    const { data, error } = await customSupabaseClient
      .from('data_jobs')
      .update(updates)
      .eq('id', jobId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('updateJobStatus error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère les sources externes configurées
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getExternalSources(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('external_sources')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getExternalSources error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Ajoute une source externe
 * @param {Object} sourceData - Données de la source
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function addExternalSource(sourceData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('external_sources')
      .insert([{
        workspace_id: sourceData.workspace_id,
        type: sourceData.type, // jira, sap, monday, excel, csv
        config: sourceData.config, // JSONB: {url, credentials, mapping}
        sync_status: 'pending'
        // created_by auto-fill par trigger
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('addExternalSource error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Synchronise une source externe
 * @param {string} sourceId - ID de la source
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function syncExternalSource(sourceId) {
  try {
    // Marquer comme en cours de sync
    const { data, error } = await customSupabaseClient
      .from('external_sources')
      .update({
        sync_status: 'syncing',
        last_sync: new Date().toISOString(),
        error_message: null
      })
      .eq('id', sourceId)
      .select()
      .single();

    if (error) throw error;

    // TODO: Déclencher la synchronisation réelle (via backend API)
    // Pour l'instant, juste update du status

    return { data, error: null };
  } catch (err) {
    console.error('syncExternalSource error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère les statistiques de qualité des données
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function getDataQualityStats(workspaceId) {
  try {
    const { data: entries, error } = await customSupabaseClient
      .from('data_catalog')
      .select('quality_score, sensitivity, source')
      .eq('workspace_id', workspaceId);

    if (error) throw error;

    const total = entries?.length || 0;
    const avgScore = total > 0
      ? entries.reduce((sum, e) => sum + (e.quality_score || 0), 0) / total
      : 0;

    const stats = {
      total_entries: total,
      avg_quality_score: Math.round(avgScore),
      by_quality: {
        high: entries?.filter(e => e.quality_score >= 80).length || 0,
        medium: entries?.filter(e => e.quality_score >= 50 && e.quality_score < 80).length || 0,
        low: entries?.filter(e => e.quality_score < 50).length || 0
      },
      by_sensitivity: {
        public: entries?.filter(e => e.sensitivity === 'public').length || 0,
        confidential: entries?.filter(e => e.sensitivity === 'confidential').length || 0,
        restricted: entries?.filter(e => e.sensitivity === 'restricted').length || 0
      },
      by_source: entries?.reduce((acc, e) => {
        acc[e.source] = (acc[e.source] || 0) + 1;
        return acc;
      }, {}) || {}
    };

    return { data: stats, error: null };
  } catch (err) {
    console.error('getDataQualityStats error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Calcule la prochaine exécution d'un job
 * @param {string} frequency - Fréquence (hourly, daily, weekly, monthly)
 * @returns {string} - Date ISO
 */
function calculateNextRun(frequency) {
  const next = new Date();

  switch (frequency) {
    case 'hourly':
      next.setHours(next.getHours() + 1);
      break;
    case 'daily':
      next.setDate(next.getDate() + 1);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    default:
      next.setDate(next.getDate() + 1);
  }

  return next.toISOString();
}
