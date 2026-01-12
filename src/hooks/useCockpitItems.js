import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { generateDemoItems } from '@/lib/cockpitDemoDataV2';
import logger from '@/lib/logger';

/**
 * 🎯 Hook Cockpit Items - Charge items d'un board (mode démo/prod auto)
 * 
 * @param {string} orgId - Organization ID
 * @param {string} boardType - Type de board ('initiatives'|'risks'|'decisions'|'capacity')
 * @returns {Object} { items, loading, isDemoMode, createItem, updateItem, deleteItem }
 */
export function useCockpitItems(orgId, boardType) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Mapping board type → table Supabase
  const TABLE_MAP = {
    initiatives: 'initiatives',
    risks: 'risks',
    decisions: 'decisions',
    capacity: 'initiatives' // Capacité = filtre sur initiatives
  };

  useEffect(() => {
    loadItems();
  }, [orgId, boardType]);

  async function loadItems() {
    if (!orgId) {
      setLoading(false);
      return;
    }

    const tableName = TABLE_MAP[boardType];
    if (!tableName) {
      logger.error('useCockpitItems: Type de board invalide', { boardType });
      setLoading(false);
      return;
    }

    try {
      // Tenter chargement données réelles
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('organization_id', orgId)
        .order('created_at', { ascending: false });

      // Si erreur ou vide → Mode démo
      if (error || !data || data.length === 0) {
        logger.warn('useCockpitItems: Mode démo activé', { 
          boardType, 
          error: error?.message,
          hasData: !!data,
          count: data?.length || 0
        });

        setIsDemoMode(true);
        setItems(generateDemoItems(orgId, boardType));
        setLoading(false);
        return;
      }

      // Mapper données Supabase → format Item unifié
      const mappedItems = data.map(row => mapRowToItem(row, boardType));
      
      setItems(mappedItems);
      setIsDemoMode(false);
      setLoading(false);

      logger.info('useCockpitItems: Données réelles chargées', {
        boardType,
        count: mappedItems.length
      });

    } catch (err) {
      logger.error('useCockpitItems: Erreur chargement', { boardType, error: err.message });
      
      // Fallback démo en cas d'erreur
      setIsDemoMode(true);
      setItems(generateDemoItems(orgId, boardType));
      setLoading(false);
    }
  }

  /**
   * Mapper row Supabase → Item unifié
   */
  function mapRowToItem(row, type) {
    // Base commune
    const item = {
      id: row.id,
      type: type.replace(/s$/, ''), // 'initiatives' → 'initiative'
      title: row.name || row.title,
      status: row.status || 'planned',
      owner: row.owner_id || row.responsible_id || null,
      sponsor: row.sponsor_id || null,
      start_date: row.start_date || row.created_at,
      end_date: row.end_date || row.due_date || null,
      progress: row.progress || 0,
      priority: row.priority || row.risk_level || 'medium',
      tags: row.tags || [],
      custom_fields: row.metadata || {},
      created_at: row.created_at,
      updated_at: row.updated_at
    };

    return item;
  }

  /**
   * Créer un nouvel item
   */
  async function createItem(itemData) {
    if (isDemoMode) {
      logger.warn('useCockpitItems: Création ignorée en mode démo');
      return;
    }

    const tableName = TABLE_MAP[boardType];
    
    // Mapper Item → row Supabase
    const row = {
      organization_id: orgId,
      name: itemData.title,
      status: itemData.status,
      priority: itemData.priority,
      progress: itemData.progress || 0,
      start_date: itemData.start_date,
      end_date: itemData.end_date,
      owner_id: itemData.owner,
      sponsor_id: itemData.sponsor,
      tags: itemData.tags || [],
      metadata: itemData.custom_fields || {}
    };

    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([row])
        .select()
        .single();

      if (error) throw error;

      const newItem = mapRowToItem(data, boardType);
      setItems(prev => [newItem, ...prev]);

      logger.info('useCockpitItems: Item créé', { boardType, itemId: newItem.id });
      return newItem;

    } catch (err) {
      logger.error('useCockpitItems: Erreur création', { boardType, error: err.message });
      throw err;
    }
  }

  /**
   * Mettre à jour un item
   */
  async function updateItem(itemId, updates) {
    if (isDemoMode) {
      logger.warn('useCockpitItems: Update ignorée en mode démo');
      // Update local en démo
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ));
      return;
    }

    const tableName = TABLE_MAP[boardType];

    // Mapper updates → columns Supabase
    const rowUpdates = {};
    if (updates.title) rowUpdates.name = updates.title;
    if (updates.status) rowUpdates.status = updates.status;
    if (updates.priority) rowUpdates.priority = updates.priority;
    if (updates.progress !== undefined) rowUpdates.progress = updates.progress;
    if (updates.owner) rowUpdates.owner_id = updates.owner;
    if (updates.sponsor) rowUpdates.sponsor_id = updates.sponsor;
    if (updates.start_date) rowUpdates.start_date = updates.start_date;
    if (updates.end_date) rowUpdates.end_date = updates.end_date;
    if (updates.tags) rowUpdates.tags = updates.tags;
    if (updates.custom_fields) rowUpdates.metadata = updates.custom_fields;

    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(rowUpdates)
        .eq('id', itemId)
        .select()
        .single();

      if (error) throw error;

      const updatedItem = mapRowToItem(data, boardType);
      setItems(prev => prev.map(item => 
        item.id === itemId ? updatedItem : item
      ));

      logger.info('useCockpitItems: Item mis à jour', { boardType, itemId });
      return updatedItem;

    } catch (err) {
      logger.error('useCockpitItems: Erreur update', { boardType, itemId, error: err.message });
      throw err;
    }
  }

  /**
   * Supprimer un item
   */
  async function deleteItem(itemId) {
    if (isDemoMode) {
      logger.warn('useCockpitItems: Delete ignorée en mode démo');
      setItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }

    const tableName = TABLE_MAP[boardType];

    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== itemId));

      logger.info('useCockpitItems: Item supprimé', { boardType, itemId });

    } catch (err) {
      logger.error('useCockpitItems: Erreur delete', { boardType, itemId, error: err.message });
      throw err;
    }
  }

  return {
    items,
    loading,
    isDemoMode,
    createItem,
    updateItem,
    deleteItem,
    refresh: loadItems
  };
}
