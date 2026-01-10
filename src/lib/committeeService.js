/**
 * Committee Service
 * Service pour gérer les comités, ordres du jour et décisions
 */

import { supabase } from './customSupabaseClient';

// ==============================================================
// COMMITTEE TYPES
// ==============================================================

export const committeeTypeService = {
  // Créer un type de comité
  async createCommitteeType(organizationId, typeData) {
    const { data, error } = await supabase
      .from('committee_types')
      .insert([{
        organization_id: organizationId,
        ...typeData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les types de comités
  async getCommitteeTypes(organizationId) {
    const { data, error } = await supabase
      .from('committee_types')
      .select('*')
      .eq('organization_id', organizationId)
      .order('name');

    if (error) throw error;
    return data;
  },

  // Mettre à jour un type de comité
  async updateCommitteeType(typeId, updates) {
    const { data, error } = await supabase
      .from('committee_types')
      .update(updates)
      .eq('id', typeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ==============================================================
// COMMITTEES
// ==============================================================

export const committeeService = {
  // Créer un nouveau comité
  async createCommittee(organizationId, committeeData) {
    const { data, error } = await supabase
      .from('committees')
      .insert([{
        organization_id: organizationId,
        ...committeeData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les comités
  async getCommittees(organizationId, filters = {}) {
    let query = supabase
      .from('committees')
      .select(`
        *,
        committee_type:committee_type_id(id, name, frequency),
        chair:chair_user_id(id, first_name, last_name),
        committee_items(count)
      `)
      .eq('organization_id', organizationId);

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.startDate) query = query.gte('date', filters.startDate);
    if (filters.endDate) query = query.lte('date', filters.endDate);

    const { data, error } = await query.order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer un comité par ID
  async getCommitteeById(committeeId) {
    const { data, error } = await supabase
      .from('committees')
      .select(`
        *,
        committee_type:committee_type_id(id, name, frequency, description),
        chair:chair_user_id(id, first_name, last_name, email),
        committee_items(
          *,
          related_project:related_project_id(id, name, status, health),
          related_risk:related_risk_id(id, title, severity),
          related_decision:related_decision_id(id, title, status)
        )
      `)
      .eq('id', committeeId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un comité
  async updateCommittee(committeeId, updates) {
    const { data, error } = await supabase
      .from('committees')
      .update(updates)
      .eq('id', committeeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un comité
  async deleteCommittee(committeeId) {
    const { error } = await supabase
      .from('committees')
      .delete()
      .eq('id', committeeId);

    if (error) throw error;
    return true;
  },

  // Prochains comités
  async getUpcomingCommittees(organizationId, limit = 5) {
    const { data, error } = await supabase
      .from('committees')
      .select(`
        *,
        committee_type:committee_type_id(name),
        chair:chair_user_id(first_name, last_name)
      `)
      .eq('organization_id', organizationId)
      .in('status', ['PLANNED', 'IN_PROGRESS'])
      .gte('date', new Date().toISOString())
      .order('date', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Exporter un compte-rendu
  async exportCommitteeReport(committeeId) {
    const committee = await this.getCommitteeById(committeeId);
    
    // Récupérer les décisions prises durant ce comité
    const { data: decisions } = await supabase
      .from('decisions')
      .select('*')
      .eq('committee_id', committeeId);

    return {
      committee,
      decisions: decisions || [],
      exportedAt: new Date().toISOString()
    };
  }
};

// ==============================================================
// COMMITTEE ITEMS
// ==============================================================

export const committeeItemService = {
  // Créer un point à l'ordre du jour
  async createCommitteeItem(itemData) {
    const { data, error } = await supabase
      .from('committee_items')
      .insert([itemData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les items d'un comité
  async getCommitteeItems(committeeId) {
    const { data, error } = await supabase
      .from('committee_items')
      .select(`
        *,
        related_project:related_project_id(id, name, status, health),
        related_risk:related_risk_id(id, title, severity),
        related_decision:related_decision_id(id, title, status)
      `)
      .eq('committee_id', committeeId)
      .order('order_index');

    if (error) throw error;
    return data;
  },

  // Mettre à jour un item
  async updateCommitteeItem(itemId, updates) {
    const { data, error } = await supabase
      .from('committee_items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un item
  async deleteCommitteeItem(itemId) {
    const { error } = await supabase
      .from('committee_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
    return true;
  },

  // Réorganiser les items
  async reorderItems(itemsWithNewOrder) {
    const updates = itemsWithNewOrder.map(item =>
      supabase
        .from('committee_items')
        .update({ order_index: item.order_index })
        .eq('id', item.id)
    );

    await Promise.all(updates);
    return true;
  }
};
