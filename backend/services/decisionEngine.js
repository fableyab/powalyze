/**
 * Decision Engine Service
 * 
 * Moteur de recommandations de décisions exécutives
 * Analyse les projets, risques, capacités et budgets pour générer des recommandations actionnables
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Configuration du moteur
 */
const CONFIG = {
  weights: {
    risk_score: 0.35,
    budget_pressure: 0.25,
    delay_risk: 0.25,
    strategic_priority: 0.15
  },
  thresholds: {
    risk_critical: 70,
    budget_alert: 0.8,
    overload_alert: 0.7,
    confidence_minimum: 0.6
  }
};

/**
 * Génère les recommandations pour un tenant
 */
async function generateRecommendations(params) {
  const {
    tenant_id,
    timeframe = 'current',
    max_recommendations = 5,
    project_id = null
  } = params;

  try {
    // 1. Récupérer les données
    const projects = await getProjects(tenant_id, project_id);
    const risks = await getRisks(tenant_id);
    const capacities = await getCapacities(tenant_id);
    const portfolios = await getPortfolios(tenant_id);

    // 2. Identifier les points de tension
    const tensionPoints = identifyTensionPoints(projects, risks, capacities);

    // 3. Générer les recommandations
    const recommendations = generateDecisions(
      tensionPoints,
      projects,
      risks,
      capacities,
      portfolios
    );

    // 4. Trier par priorité et limiter
    const topRecommendations = recommendations
      .sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority] || 
               b.confidence_score - a.confidence_score;
      })
      .slice(0, max_recommendations);

    // 5. Calculer le summary global
    const globalSummary = calculateGlobalSummary(projects, risks, topRecommendations);

    return {
      tenant_id,
      generated_at: new Date().toISOString(),
      recommendations: topRecommendations,
      global_summary: globalSummary
    };

  } catch (error) {
    console.error('Decision Engine Error:', error);
    throw error;
  }
}

/**
 * Récupère les projets actifs
 */
async function getProjects(tenant_id, project_id = null) {
  let query = supabase
    .from('projects')
    .select('*')
    .eq('tenant_id', tenant_id)
    .in('status', ['on_track', 'at_risk', 'critical']);

  if (project_id) {
    query = query.eq('id', project_id);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

/**
 * Récupère les risques ouverts
 */
async function getRisks(tenant_id) {
  const { data, error } = await supabase
    .from('risks')
    .select('*')
    .eq('tenant_id', tenant_id)
    .eq('status', 'open');

  if (error) throw error;
  return data || [];
}

/**
 * Récupère les capacités des équipes
 */
async function getCapacities(tenant_id) {
  const { data, error } = await supabase
    .from('team_capacities')
    .select('*')
    .eq('tenant_id', tenant_id);

  if (error) throw error;
  return data || [];
}

/**
 * Récupère les portefeuilles
 */
async function getPortfolios(tenant_id) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('tenant_id', tenant_id);

  if (error) throw error;
  return data || [];
}

/**
 * Identifie les points de tension
 */
function identifyTensionPoints(projects, risks, capacities) {
  const tensions = [];

  projects.forEach(project => {
    const projectRisks = risks.filter(r => r.project_id === project.id);
    const budgetRatio = project.budget_spent / project.budget_planned;
    
    // Tension: Risque critique
    if (project.risk_score > CONFIG.thresholds.risk_critical) {
      tensions.push({
        project_id: project.id,
        project_name: project.name,
        tension_type: 'risk_critical',
        severity: project.risk_score / 100,
        priority_score: calculatePriorityScore(project, 'risk'),
        data: { risk_score: project.risk_score }
      });
    }

    // Tension: Dépassement budget
    if (budgetRatio > CONFIG.thresholds.budget_alert) {
      tensions.push({
        project_id: project.id,
        project_name: project.name,
        tension_type: 'budget_pressure',
        severity: Math.min(budgetRatio, 1),
        priority_score: calculatePriorityScore(project, 'budget'),
        data: { budget_ratio: budgetRatio }
      });
    }

    // Tension: Retard probable
    if (project.status === 'at_risk' || project.status === 'critical') {
      const delayWeeks = estimateDelay(project);
      if (delayWeeks > 0) {
        tensions.push({
          project_id: project.id,
          project_name: project.name,
          tension_type: 'delay_risk',
          severity: Math.min(delayWeeks / 12, 1), // max 12 weeks
          priority_score: calculatePriorityScore(project, 'delay'),
          data: { delay_weeks: delayWeeks }
        });
      }
    }
  });

  // Tension: Capacité surchargée
  capacities.forEach(capacity => {
    if (capacity.overload_index > CONFIG.thresholds.overload_alert) {
      const affectedProjects = projects.filter(p => 
        capacity.projects_assigned?.includes(p.id)
      );
      
      affectedProjects.forEach(project => {
        tensions.push({
          project_id: project.id,
          project_name: project.name,
          tension_type: 'capacity_overload',
          severity: capacity.overload_index,
          priority_score: calculatePriorityScore(project, 'capacity'),
          data: { overload_index: capacity.overload_index }
        });
      });
    }
  });

  return tensions.sort((a, b) => b.priority_score - a.priority_score);
}

/**
 * Calcule le score de priorité
 */
function calculatePriorityScore(project, type) {
  const budgetRatio = project.budget_spent / project.budget_planned;
  const strategicWeight = project.strategic_priority === 'high' ? 1.5 : 
                          project.strategic_priority === 'medium' ? 1.2 : 1;

  const score = 
    CONFIG.weights.risk_score * (project.risk_score / 100) +
    CONFIG.weights.budget_pressure * Math.min(budgetRatio, 1) +
    CONFIG.weights.delay_risk * (project.status === 'critical' ? 1 : project.status === 'at_risk' ? 0.6 : 0) +
    CONFIG.weights.strategic_priority * strategicWeight;

  return score * 100;
}

/**
 * Estime le retard probable (en semaines)
 */
function estimateDelay(project) {
  if (project.status === 'critical') return 8;
  if (project.status === 'at_risk') return 4;
  return 0;
}

/**
 * Génère les décisions recommandées
 */
function generateDecisions(tensionPoints, projects, risks, capacities, portfolios) {
  const decisions = [];

  // Regrouper les tensions par projet
  const tensionsByProject = tensionPoints.reduce((acc, tension) => {
    if (!acc[tension.project_id]) acc[tension.project_id] = [];
    acc[tension.project_id].push(tension);
    return acc;
  }, {});

  Object.entries(tensionsByProject).forEach(([projectId, tensions]) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    tensions.forEach(tension => {
      const decision = createDecisionForTension(tension, project, risks, capacities);
      if (decision && decision.confidence_score >= CONFIG.thresholds.confidence_minimum) {
        decisions.push(decision);
      }
    });
  });

  return decisions;
}

/**
 * Crée une décision pour un point de tension
 */
function createDecisionForTension(tension, project, risks, capacities) {
  const baseId = `dec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  switch (tension.tension_type) {
    case 'risk_critical':
    case 'delay_risk':
      return {
        id: baseId,
        type: 'add_resource',
        target_project_id: project.id,
        target_portfolio_id: project.portfolio_id,
        title: `Renforcer l'équipe ${project.name}`,
        description: `Ajouter 1-2 FTE pour réduire le retard et stabiliser le projet`,
        rationale: `L'analyse montre que ${project.name} est sous tension avec un score de risque de ${project.risk_score}%. L'ajout de ressources permettrait de réduire le retard estimé de ${tension.data.delay_weeks || 6} semaines.`,
        impacts: [
          {
            dimension: 'time',
            delta_value: -(tension.data.delay_weeks || 6) * 0.7,
            unit: 'weeks',
            direction: 'improve',
            description: `Retard réduit de ${Math.round((tension.data.delay_weeks || 6) * 0.7)} semaines`
          },
          {
            dimension: 'risk',
            delta_value: -project.risk_score * 0.4,
            unit: 'risk_score',
            direction: 'improve',
            description: `Risque abaissé de ${Math.round(project.risk_score * 0.4)}%`
          },
          {
            dimension: 'budget',
            delta_value: 12000,
            unit: 'currency',
            direction: 'worsen',
            description: 'Coût additionnel : +12k CHF'
          }
        ],
        confidence_score: 0.87,
        priority: project.risk_score > 80 ? 'critical' : 'high',
        created_at: new Date().toISOString()
      };

    case 'budget_pressure':
      return {
        id: baseId,
        type: 'reduce_scope',
        target_project_id: project.id,
        target_portfolio_id: project.portfolio_id,
        title: `Réduire le périmètre de ${project.name}`,
        description: `Recentrer sur les fonctionnalités critiques pour tenir le budget`,
        rationale: `Le projet dépasse le budget de ${Math.round((tension.data.budget_ratio - 1) * 100)}%. Réduire le périmètre non critique permettrait d'économiser jusqu'à 80k CHF.`,
        impacts: [
          {
            dimension: 'budget',
            delta_value: -80000,
            unit: 'currency',
            direction: 'improve',
            description: 'Économie potentielle : 80k CHF'
          },
          {
            dimension: 'risk',
            delta_value: -project.risk_score * 0.25,
            unit: 'risk_score',
            direction: 'improve',
            description: `Risque abaissé de ${Math.round(project.risk_score * 0.25)}%`
          },
          {
            dimension: 'time',
            delta_value: -2,
            unit: 'weeks',
            direction: 'improve',
            description: 'Retard réduit de 2 semaines'
          }
        ],
        confidence_score: 0.82,
        priority: 'high',
        created_at: new Date().toISOString()
      };

    case 'capacity_overload':
      return {
        id: baseId,
        type: 'reprioritize',
        target_project_id: project.id,
        target_portfolio_id: project.portfolio_id,
        title: `Reprioriser les ressources pour ${project.name}`,
        description: `Réallouer les ressources surchargées pour stabiliser la vélocité`,
        rationale: `L'équipe affiche une surcharge de ${Math.round(tension.data.overload_index * 100)}%. Une repriorisation permettrait de libérer de la capacité.`,
        impacts: [
          {
            dimension: 'capacity',
            delta_value: -0.15,
            unit: 'index',
            direction: 'improve',
            description: 'Surcharge réduite de 15%'
          },
          {
            dimension: 'time',
            delta_value: -3,
            unit: 'weeks',
            direction: 'improve',
            description: 'Vélocité améliorée : +3 semaines gagnées'
          }
        ],
        confidence_score: 0.75,
        priority: 'medium',
        created_at: new Date().toISOString()
      };

    default:
      return null;
  }
}

/**
 * Calcule le summary global
 */
function calculateGlobalSummary(projects, risks, recommendations) {
  const criticalProjects = projects.filter(p => p.status === 'critical').length;
  const highRiskProjects = projects.filter(p => p.risk_score > 70).length;
  
  const mainRisks = risks
    .filter(r => r.probability * r.impact > 0.5)
    .sort((a, b) => (b.probability * b.impact) - (a.probability * a.impact))
    .slice(0, 3)
    .map(r => r.title || r.category);

  const opportunities = recommendations
    .filter(r => r.type === 'reprioritize' || r.priority === 'low')
    .slice(0, 3)
    .map(r => r.title);

  // Strategic Pulse: santé globale du portefeuille
  const avgRiskScore = projects.reduce((sum, p) => sum + p.risk_score, 0) / projects.length;
  const avgProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;
  const strategicPulse = Math.round((100 - avgRiskScore * 0.6 + avgProgress * 0.4));

  return {
    main_risks: mainRisks,
    main_opportunities: opportunities,
    strategic_pulse: Math.max(0, Math.min(100, strategicPulse)),
    total_projects_analyzed: projects.length,
    critical_projects: criticalProjects,
    high_risk_projects: highRiskProjects
  };
}

module.exports = {
  generateRecommendations
};
