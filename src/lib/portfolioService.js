/**
 * Portfolio Service
 * Service pour gérer les portefeuilles, programmes et projets
 */

import { supabase } from './customSupabaseClient';

// ==============================================================
// PORTFOLIOS
// ==============================================================

export const portfolioService = {
  // Créer un nouveau portfolio
  async createPortfolio(organizationId, portfolioData) {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([{
        organization_id: organizationId,
        ...portfolioData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer tous les portfolios d'une organisation
  async getPortfolios(organizationId, filters = {}) {
    let query = supabase
      .from('portfolios')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name, email),
        programs(count),
        projects(count)
      `)
      .eq('organization_id', organizationId);

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.priority) query = query.eq('priority', filters.priority);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer un portfolio par ID
  async getPortfolioById(portfolioId) {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name, email),
        programs(
          *,
          owner:owner_user_id(id, first_name, last_name)
        ),
        projects(
          *,
          sponsor:sponsor_user_id(id, first_name, last_name),
          project_manager:project_manager_user_id(id, first_name, last_name)
        )
      `)
      .eq('id', portfolioId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un portfolio
  async updatePortfolio(portfolioId, updates) {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('id', portfolioId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un portfolio
  async deletePortfolio(portfolioId) {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', portfolioId);

    if (error) throw error;
    return true;
  },

  // Obtenir les KPIs d'un portfolio
  async getPortfolioKPIs(portfolioId) {
    const { data, error } = await supabase
      .from('kpi_values')
      .select(`
        *,
        definition:kpi_definition_id(*)
      `)
      .eq('scope_type', 'PORTFOLIO')
      .eq('scope_id', portfolioId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obtenir les risques d'un portfolio
  async getPortfolioRisks(portfolioId) {
    const { data, error } = await supabase
      .from('risks')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name)
      `)
      .eq('related_portfolio_id', portfolioId)
      .order('severity', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Obtenir les décisions d'un portfolio
  async getPortfolioDecisions(portfolioId) {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        created_by:created_by_user_id(id, first_name, last_name),
        approved_by:approved_by_user_id(id, first_name, last_name)
      `)
      .eq('related_portfolio_id', portfolioId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Tableau de bord portfolio
  async getPortfolioDashboard(organizationId) {
    const portfolios = await this.getPortfolios(organizationId);
    
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('organization_id', organizationId);

    const { data: risks } = await supabase
      .from('risks')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('severity', 15);

    const { data: signals } = await supabase
      .from('predictive_signals')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('is_acknowledged', false)
      .order('score', { ascending: false });

    return {
      portfolios,
      totalProjects: projects?.length || 0,
      projectsByStatus: projects?.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {}),
      projectsByHealth: projects?.reduce((acc, p) => {
        acc[p.health] = (acc[p.health] || 0) + 1;
        return acc;
      }, {}),
      criticalRisks: risks?.length || 0,
      predictiveSignals: signals || []
    };
  }
};

// ==============================================================
// PROGRAMS
// ==============================================================

export const programService = {
  // Créer un nouveau programme
  async createProgram(organizationId, programData) {
    const { data, error } = await supabase
      .from('programs')
      .insert([{
        organization_id: organizationId,
        ...programData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les programmes
  async getPrograms(organizationId, portfolioId = null) {
    let query = supabase
      .from('programs')
      .select(`
        *,
        owner:owner_user_id(id, first_name, last_name),
        portfolio:portfolio_id(id, name),
        projects(count)
      `)
      .eq('organization_id', organizationId);

    if (portfolioId) query = query.eq('portfolio_id', portfolioId);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Mettre à jour un programme
  async updateProgram(programId, updates) {
    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', programId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un programme
  async deleteProgram(programId) {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', programId);

    if (error) throw error;
    return true;
  }
};

// ==============================================================
// PROJECTS
// ==============================================================

export const projectService = {
  // Créer un nouveau projet
  async createProject(organizationId, projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        organization_id: organizationId,
        ...projectData
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les projets
  async getProjects(organizationId, filters = {}) {
    let query = supabase
      .from('projects')
      .select(`
        *,
        sponsor:sponsor_user_id(id, first_name, last_name),
        project_manager:project_manager_user_id(id, first_name, last_name),
        portfolio:portfolio_id(id, name),
        program:program_id(id, name)
      `)
      .eq('organization_id', organizationId);

    if (filters.portfolioId) query = query.eq('portfolio_id', filters.portfolioId);
    if (filters.programId) query = query.eq('program_id', filters.programId);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.health) query = query.eq('health', filters.health);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Récupérer un projet par ID
  async getProjectById(projectId) {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        sponsor:sponsor_user_id(id, first_name, last_name, email),
        project_manager:project_manager_user_id(id, first_name, last_name, email),
        portfolio:portfolio_id(id, name),
        program:program_id(id, name)
      `)
      .eq('id', projectId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un projet
  async updateProject(projectId, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un projet
  async deleteProject(projectId) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
    return true;
  },

  // Vue 360° d'un projet
  async getProjectFull(projectId) {
    const project = await this.getProjectById(projectId);

    const [risks, decisions, documents, comments, kpis, signals] = await Promise.all([
      supabase.from('risks').select('*, owner:owner_user_id(id, first_name, last_name)').eq('related_project_id', projectId),
      supabase.from('decisions').select('*, created_by:created_by_user_id(id, first_name, last_name)').eq('related_project_id', projectId),
      supabase.from('documents').select('*, created_by:created_by_user_id(id, first_name, last_name)').eq('related_project_id', projectId),
      supabase.from('comments').select('*, author:author_user_id(id, first_name, last_name)').eq('entity_type', 'PROJECT').eq('entity_id', projectId),
      supabase.from('kpi_values').select('*, definition:kpi_definition_id(*)').eq('scope_type', 'PROJECT').eq('scope_id', projectId),
      supabase.from('predictive_signals').select('*').eq('source_type', 'PROJECT').eq('source_id', projectId).eq('is_acknowledged', false)
    ]);

    return {
      project,
      risks: risks.data || [],
      decisions: decisions.data || [],
      documents: documents.data || [],
      comments: comments.data || [],
      kpis: kpis.data || [],
      predictiveSignals: signals.data || []
    };
  }
};
