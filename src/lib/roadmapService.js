/**
 * ROADMAP SERVICE
 * Gestion des roadmaps et des éléments de planification
 */

import customSupabaseClient from '@/lib/customSupabaseClient';

/**
 * Récupère tous les éléments de roadmap d'une initiative
 * @param {string} initiativeId - ID de l'initiative
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getRoadmapItems(initiativeId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('roadmap_items')
      .select(`
        *,
        dependency:dependency_id (id, title)
      `)
      .eq('initiative_id', initiativeId)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getRoadmapItems error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Crée un nouvel élément de roadmap
 * @param {Object} itemData - Données de l'élément
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function createRoadmapItem(itemData) {
  try {
    const { data, error } = await customSupabaseClient
      .from('roadmap_items')
      .insert([{
        initiative_id: itemData.initiative_id,
        title: itemData.title,
        description: itemData.description,
        start_date: itemData.start_date,
        end_date: itemData.end_date,
        status: itemData.status || 'planned',
        dependency_id: itemData.dependency_id
        // created_by auto-fill par trigger
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('createRoadmapItem error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Met à jour un élément de roadmap
 * @param {string} itemId - ID de l'élément
 * @param {Object} updates - Champs à mettre à jour
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function updateRoadmapItem(itemId, updates) {
  try {
    const { data, error } = await customSupabaseClient
      .from('roadmap_items')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('updateRoadmapItem error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Supprime un élément de roadmap
 * @param {string} itemId - ID de l'élément
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function deleteRoadmapItem(itemId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('roadmap_items')
      .delete()
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('deleteRoadmapItem error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Détecte les dépendances automatiquement dans un workspace
 * (Éléments qui se chevauchent ou se suivent)
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function detectDependencies(workspaceId) {
  try {
    // Récupérer toutes les initiatives du workspace avec leurs roadmap items
    const { data: initiatives, error } = await customSupabaseClient
      .from('initiatives')
      .select(`
        id,
        name,
        roadmap_items (
          id,
          title,
          start_date,
          end_date,
          status
        )
      `)
      .eq('workspace_id', workspaceId);

    if (error) throw error;

    const suggestions = [];

    // Analyser les chevauchements et séquences
    initiatives?.forEach(initiative => {
      const items = initiative.roadmap_items || [];
      
      items.forEach((item, index) => {
        // Vérifier si un autre item suit immédiatement (gap < 7 jours)
        items.forEach((otherItem, otherIndex) => {
          if (index !== otherIndex && item.end_date && otherItem.start_date) {
            const gap = new Date(otherItem.start_date) - new Date(item.end_date);
            const daysDiff = Math.abs(gap / (1000 * 60 * 60 * 24));

            if (daysDiff <= 7 && gap > 0) {
              suggestions.push({
                from_item: item,
                to_item: otherItem,
                type: 'sequence',
                confidence: daysDiff <= 3 ? 'high' : 'medium',
                reason: `Séquence détectée: ${item.title} se termine ${Math.round(daysDiff)} jours avant ${otherItem.title}`
              });
            }
          }
        });
      });
    });

    return { data: suggestions, error: null };
  } catch (err) {
    console.error('detectDependencies error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Récupère la vue timeline d'un workspace (toutes initiatives)
 * @param {string} workspaceId - ID du workspace
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function getWorkspaceTimeline(workspaceId) {
  try {
    const { data, error } = await customSupabaseClient
      .from('initiatives')
      .select(`
        id,
        name,
        status,
        start_date,
        end_date,
        roadmap_items (
          id,
          title,
          start_date,
          end_date,
          status,
          dependency_id
        )
      `)
      .eq('workspace_id', workspaceId)
      .order('start_date', { ascending: true });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.error('getWorkspaceTimeline error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Vérifie les conflits de dépendances (dépendances circulaires)
 * @param {string} initiativeId - ID de l'initiative
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function checkDependencyConflicts(initiativeId) {
  try {
    const { data: items, error } = await customSupabaseClient
      .from('roadmap_items')
      .select('id, title, dependency_id')
      .eq('initiative_id', initiativeId);

    if (error) throw error;

    const conflicts = [];
    const visited = new Set();

    // Fonction récursive pour détecter cycles
    function hasCycle(itemId, path = []) {
      if (path.includes(itemId)) {
        return path.slice(path.indexOf(itemId)).concat(itemId);
      }
      if (visited.has(itemId)) return null;

      visited.add(itemId);
      const item = items.find(i => i.id === itemId);
      
      if (item?.dependency_id) {
        const cycle = hasCycle(item.dependency_id, [...path, itemId]);
        if (cycle) return cycle;
      }

      return null;
    }

    items?.forEach(item => {
      const cycle = hasCycle(item.id);
      if (cycle) {
        conflicts.push({
          type: 'circular_dependency',
          cycle: cycle.map(id => items.find(i => i.id === id)?.title || id),
          severity: 'critical'
        });
      }
    });

    return {
      data: {
        has_conflicts: conflicts.length > 0,
        conflicts
      },
      error: null
    };
  } catch (err) {
    console.error('checkDependencyConflicts error:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Calcule le chemin critique d'une initiative
 * @param {string} initiativeId - ID de l'initiative
 * @returns {Promise<{data: Object, error: string|null}>}
 */
export async function getCriticalPath(initiativeId) {
  try {
    const { data: items, error } = await customSupabaseClient
      .from('roadmap_items')
      .select('id, title, start_date, end_date, dependency_id')
      .eq('initiative_id', initiativeId);

    if (error) throw error;

    // Algorithme simplifié du chemin critique (Critical Path Method)
    const durations = items?.map(item => ({
      id: item.id,
      title: item.title,
      duration: item.start_date && item.end_date
        ? Math.ceil((new Date(item.end_date) - new Date(item.start_date)) / (1000 * 60 * 60 * 24))
        : 0,
      dependency_id: item.dependency_id
    })) || [];

    // Trouver le chemin le plus long (simplifié)
    let longestPath = [];
    let maxDuration = 0;

    function findPath(itemId, currentPath = [], currentDuration = 0) {
      const item = durations.find(d => d.id === itemId);
      if (!item) return;

      const newPath = [...currentPath, item];
      const newDuration = currentDuration + item.duration;

      if (newDuration > maxDuration) {
        maxDuration = newDuration;
        longestPath = newPath;
      }

      // Continuer avec les items qui dépendent de celui-ci
      durations
        .filter(d => d.dependency_id === itemId)
        .forEach(dependent => findPath(dependent.id, newPath, newDuration));
    }

    // Trouver les items racines (sans dépendances)
    durations
      .filter(d => !d.dependency_id)
      .forEach(root => findPath(root.id));

    return {
      data: {
        critical_path: longestPath,
        total_duration: maxDuration,
        slack_time: 0 // À calculer basé sur end_date de l'initiative
      },
      error: null
    };
  } catch (err) {
    console.error('getCriticalPath error:', err);
    return { data: null, error: err.message };
  }
}
