/**
 * Decision & Risk Service
 * Service pour gérer les décisions, actions et risques
 */

import { supabase } from './customSupabaseClient';

// ==============================================================
// DECISIONS
// ==============================================================

export const decisionService = {
  // Créer une nouvelle décision
  async createDecision(organizationId, decisionData) {
    const { data, error } = await supabase
      .from('decisions')
      .insert([{
        organization_id: organizationId,
        ...decisionData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les décisions
  async getDecisions(organizationId, filters = {}) {
    let query = supabase
      .from('decisions')
      .select(`
        *,
        created_by:created_by_user_id(id, first_name, last_name),
        approved_by:approved_by_user_id(id, first_name, last_name),
        committee:committee_id(id, date, committee_type:committee_type_id(name)),
        related_project:related_project_id(id, name),
        related_portfolio:related_portfolio_id(id, name),
        related_program:related_program_id(id, name)
      `)
      .eq('organization_id', organizationId);

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.decisionType) query = query.eq('decision_type', filters.decisionType);
    if (filters.projectId) query = query.eq('related_project_id', filters.projectId);
    if (filters.portfolioId) query = query.eq('related_portfolio_id', filters.portfolioId);
    if (filters.committeeId) query = query.eq('committee_id', filters.committeeId);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer une décision par ID
  async getDecisionById(decisionId) {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        created_by:created_by_user_id(id, first_name, last_name, email),
        approved_by:approved_by_user_id(id, first_name, last_name, email),
        committee:committee_id(id, date, committee_type:committee_type_id(name)),
        related_project:related_project_id(id, name, status),
        related_portfolio:related_portfolio_id(id, name),
        related_program:related_program_id(id, name),
        decision_actions(
          *,
          owner:owner_user_id(id, first_name, last_name)
        )
      `)
      .eq('id', decisionId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour une décision
  async updateDecision(decisionId, updates) {
    const { data, error } = await supabase
      .from('decisions')
      .update(updates)
      .eq('id', decisionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer une décision
  async deleteDecision(decisionId) {
    const { error } = await supabase
      .from('decisions')
      .delete()
      .eq('id', decisionId);

    if (error) throw error;
    return true;
  },

  // Approuver une décision
  async approveDecision(decisionId, approvedByUserId) {
    const { data, error } = await supabase
      .from('decisions')
      .update({
        status: 'TAKEN',
        approved_by_user_id: approvedByUserId,
        decision_date: new Date().toISOString().split('T')[0]
      })
      .eq('id', decisionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Rejeter une décision
  async rejectDecision(decisionId) {
    const { data, error } = await supabase
      .from('decisions')
      .update({ status: 'REJECTED' })
      .eq('id', decisionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Décisions en attente
  async getPendingDecisions(organizationId) {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        created_by:created_by_user_id(first_name, last_name),
        related_project:related_project_id(name)
      `)
      .eq('organization_id', organizationId)
      .eq('status', 'PLANNED')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};

// ==============================================================
// DECISION ACTIONS
// ==============================================================

export const decisionActionService = {
  // Créer une action
  async createAction(actionData) {
    const { data, error } = await supabase
      .from('decision_actions')
      .insert([actionData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les actions d'une décision
  async getActionsByDecision(decisionId) {
    const { data, error } = await supabase
      .from('decision_actions')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name, email)
      `)
      .eq('decision_id', decisionId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer les actions d'un utilisateur
  async getActionsByUser(userId, status = null) {
    let query = supabase
      .from('decision_actions')
      .select(`
        *,
        decision:decision_id(id, title, decision_type)
      `)
      .eq('owner_user_id', userId);

    if (status) query = query.eq('status', status);

    const { data, error } = await query.order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Mettre à jour une action
  async updateAction(actionId, updates) {
    const { data, error } = await supabase
      .from('decision_actions')
      .update(updates)
      .eq('id', actionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Marquer une action comme terminée
  async completeAction(actionId) {
    const { data, error } = await supabase
      .from('decision_actions')
      .update({ status: 'DONE' })
      .eq('id', actionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Actions en retard
  async getOverdueActions(organizationId) {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('decision_actions')
      .select(`
        *,
        owner:owner_user_id(first_name, last_name),
        decision:decision_id(
          id,
          title,
          organization_id
        )
      `)
      .eq('decision.organization_id', organizationId)
      .in('status', ['OPEN', 'IN_PROGRESS'])
      .lt('due_date', today)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  }
};

// ==============================================================
// RISKS
// ==============================================================

export const riskService = {
  // Créer un nouveau risque
  async createRisk(organizationId, riskData) {
    const { data, error } = await supabase
      .from('risks')
      .insert([{
        organization_id: organizationId,
        ...riskData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les risques
  async getRisks(organizationId, filters = {}) {
    let query = supabase
      .from('risks')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name),
        related_project:related_project_id(id, name),
        related_portfolio:related_portfolio_id(id, name),
        related_program:related_program_id(id, name)
      `)
      .eq('organization_id', organizationId);

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.projectId) query = query.eq('related_project_id', filters.projectId);
    if (filters.portfolioId) query = query.eq('related_portfolio_id', filters.portfolioId);
    if (filters.minSeverity) query = query.gte('severity', filters.minSeverity);

    const { data, error } = await query.order('severity', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer un risque par ID
  async getRiskById(riskId) {
    const { data, error } = await supabase
      .from('risks')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name, email),
        related_project:related_project_id(id, name, status),
        related_portfolio:related_portfolio_id(id, name),
        related_program:related_program_id(id, name)
      `)
      .eq('id', riskId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un risque
  async updateRisk(riskId, updates) {
    const { data, error } = await supabase
      .from('risks')
      .update(updates)
      .eq('id', riskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un risque
  async deleteRisk(riskId) {
    const { error } = await supabase
      .from('risks')
      .delete()
      .eq('id', riskId);

    if (error) throw error;
    return true;
  },

  // Risques critiques (severity >= 15)
  async getCriticalRisks(organizationId) {
    const { data, error } = await supabase
      .from('risks')
      .select(`
        *,
        owner:owner_user_id(first_name, last_name),
        related_project:related_project_id(name)
      `)
      .eq('organization_id', organizationId)
      .eq('status', 'OPEN')
      .gte('severity', 15)
      .order('severity', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Matrice de risques
  async getRiskMatrix(organizationId) {
    const { data, error } = await supabase
      .from('risks')
      .select('probability, impact')
      .eq('organization_id', organizationId)
      .eq('status', 'OPEN');

    if (error) throw error;

    // Créer une matrice 5x5
    const matrix = Array(5).fill(null).map(() => Array(5).fill(0));
    
    data?.forEach(risk => {
      if (risk.probability && risk.impact) {
        matrix[risk.probability - 1][risk.impact - 1]++;
      }
    });

    return matrix;
  }
};

// ==============================================================
// PREDICTIVE SIGNALS (IA)
// ==============================================================

export const predictiveSignalService = {
  // Créer un signal prédictif
  async createSignal(organizationId, signalData) {
    const { data, error } = await supabase
      .from('predictive_signals')
      .insert([{
        organization_id: organizationId,
        ...signalData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les signaux
  async getSignals(organizationId, filters = {}) {
    let query = supabase
      .from('predictive_signals')
      .select('*')
      .eq('organization_id', organizationId);

    if (filters.sourceType) query = query.eq('source_type', filters.sourceType);
    if (filters.sourceId) query = query.eq('source_id', filters.sourceId);
    if (filters.signalType) query = query.eq('signal_type', filters.signalType);
    if (filters.isAcknowledged !== undefined) query = query.eq('is_acknowledged', filters.isAcknowledged);
    if (filters.minScore) query = query.gte('score', filters.minScore);

    const { data, error } = await query.order('score', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Acknowledger un signal
  async acknowledgeSignal(signalId, userId) {
    const { data, error } = await supabase
      .from('predictive_signals')
      .update({
        is_acknowledged: true,
        acknowledged_by_user_id: userId,
        acknowledged_at: new Date().toISOString()
      })
      .eq('id', signalId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Signaux non traités
  async getUnacknowledgedSignals(organizationId, minScore = 60) {
    const { data, error } = await supabase
      .from('predictive_signals')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_acknowledged', false)
      .gte('score', minScore)
      .order('score', { ascending: false });

    if (error) throw error;
    return data;
  }
};
