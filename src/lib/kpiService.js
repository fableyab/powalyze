/**
 * KPI Service
 * Service pour gérer les définitions de KPI et leurs valeurs
 */

import { supabase } from './customSupabaseClient';

// ==============================================================
// KPI DEFINITIONS
// ==============================================================

export const kpiDefinitionService = {
  // Créer une définition de KPI
  async createKPIDefinition(organizationId, kpiData) {
    const { data, error } = await supabase
      .from('kpi_definitions')
      .insert([{
        organization_id: organizationId,
        ...kpiData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer toutes les définitions
  async getKPIDefinitions(organizationId) {
    const { data, error } = await supabase
      .from('kpi_definitions')
      .select('*')
      .eq('organization_id', organizationId)
      .order('name');

    if (error) throw error;
    return data;
  },

  // Récupérer une définition par ID
  async getKPIDefinitionById(kpiId) {
    const { data, error } = await supabase
      .from('kpi_definitions')
      .select('*')
      .eq('id', kpiId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour une définition
  async updateKPIDefinition(kpiId, updates) {
    const { data, error } = await supabase
      .from('kpi_definitions')
      .update(updates)
      .eq('id', kpiId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer une définition
  async deleteKPIDefinition(kpiId) {
    const { error } = await supabase
      .from('kpi_definitions')
      .delete()
      .eq('id', kpiId);

    if (error) throw error;
    return true;
  }
};

// ==============================================================
// KPI VALUES
// ==============================================================

export const kpiValueService = {
  // Enregistrer une valeur de KPI
  async recordKPIValue(organizationId, valueData) {
    const { data, error } = await supabase
      .from('kpi_values')
      .insert([{
        organization_id: organizationId,
        ...valueData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les valeurs d'un KPI
  async getKPIValues(kpiDefinitionId, filters = {}) {
    let query = supabase
      .from('kpi_values')
      .select(`
        *,
        definition:kpi_definition_id(name, code, unit, target_value, direction)
      `)
      .eq('kpi_definition_id', kpiDefinitionId);

    if (filters.scopeType) query = query.eq('scope_type', filters.scopeType);
    if (filters.scopeId) query = query.eq('scope_id', filters.scopeId);
    if (filters.startDate) query = query.gte('date', filters.startDate);
    if (filters.endDate) query = query.lte('date', filters.endDate);

    const { data, error } = await query.order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer les valeurs pour un scope (project, portfolio, etc.)
  async getKPIValuesByScope(scopeType, scopeId, filters = {}) {
    let query = supabase
      .from('kpi_values')
      .select(`
        *,
        definition:kpi_definition_id(name, code, unit, target_value, direction)
      `)
      .eq('scope_type', scopeType)
      .eq('scope_id', scopeId);

    if (filters.startDate) query = query.gte('date', filters.startDate);
    if (filters.endDate) query = query.lte('date', filters.endDate);

    const { data, error } = await query.order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Dernières valeurs pour un scope
  async getLatestKPIValues(scopeType, scopeId) {
    const { data, error } = await supabase
      .from('kpi_values')
      .select(`
        *,
        definition:kpi_definition_id(name, code, unit, target_value, direction)
      `)
      .eq('scope_type', scopeType)
      .eq('scope_id', scopeId)
      .order('date', { ascending: false });

    if (error) throw error;

    // Garder seulement la dernière valeur par KPI
    const latestByKPI = {};
    data?.forEach(value => {
      const kpiId = value.kpi_definition_id;
      if (!latestByKPI[kpiId]) {
        latestByKPI[kpiId] = value;
      }
    });

    return Object.values(latestByKPI);
  },

  // Trend d'un KPI
  async getKPITrend(kpiDefinitionId, scopeType, scopeId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('kpi_values')
      .select('date, value')
      .eq('kpi_definition_id', kpiDefinitionId)
      .eq('scope_type', scopeType)
      .eq('scope_id', scopeId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Dashboard KPIs pour une organisation
  async getOrganizationKPIDashboard(organizationId) {
    const { data, error } = await supabase
      .from('kpi_values')
      .select(`
        *,
        definition:kpi_definition_id(name, code, unit, target_value, direction)
      `)
      .eq('organization_id', organizationId)
      .eq('scope_type', 'ORGANIZATION')
      .order('date', { ascending: false });

    if (error) throw error;

    // Regrouper par KPI
    const kpiMap = {};
    data?.forEach(value => {
      const code = value.definition.code;
      if (!kpiMap[code]) {
        kpiMap[code] = {
          definition: value.definition,
          values: []
        };
      }
      kpiMap[code].values.push({
        date: value.date,
        value: value.value
      });
    });

    return Object.values(kpiMap);
  }
};
