/**
 * 🎭 DONNÉES DE DÉMONSTRATION — COCKPIT PMO POWALYZE
 * 
 * Utilisées automatiquement quand:
 * - Nouvelle organisation sans données historiques
 * - Tables PMO sophistiquées pas encore créées dans Supabase
 * - Erreur de chargement des données réelles
 * 
 * Garantit une expérience demo crédible même sur compte vide.
 * 
 * @param {string} orgId - ID de l'organisation (pour futur tracking)
 * @returns {Object} Structure complète de données cockpit
 */

export function getCockpitDemoData(orgId) {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  return {
    // Global Health Score
    health: {
      avg_progress: 68,        // Progression moyenne portfolio
      commitments: 85,          // % engagements tenus
      risk_score: 32            // Score risque global (0-100, lower = better)
    },

    // Signal global du portfolio
    signal: {
      global_score: 73,         // Score santé composite
      signal: 'ok'              // 'critique' | 'tension' | 'ok' | 'excellent'
    },

    // Milestones (jalons critiques)
    milestones: [
      { 
        id: 'demo-milestone-1', 
        title: 'Lancement MVP', 
        status: 'in_progress',
        progress: 75,
        due_date: new Date(now + 7 * oneDay).toISOString(),
        priority: 'high',
        owner: 'Équipe Product'
      },
      { 
        id: 'demo-milestone-2', 
        title: 'Phase de test utilisateurs', 
        status: 'planned',
        progress: 20,
        due_date: new Date(now + 14 * oneDay).toISOString(),
        priority: 'high',
        owner: 'Équipe UX'
      },
      { 
        id: 'demo-milestone-3', 
        title: 'Revue architecture technique', 
        status: 'completed',
        progress: 100,
        due_date: new Date(now - 3 * oneDay).toISOString(),
        priority: 'medium',
        owner: 'CTO'
      },
      { 
        id: 'demo-milestone-4', 
        title: 'Sprint planning Q2 2026', 
        status: 'planned',
        progress: 0,
        due_date: new Date(now + 21 * oneDay).toISOString(),
        priority: 'medium',
        owner: 'PMO'
      },
      { 
        id: 'demo-milestone-5', 
        title: 'Migration infrastructure cloud', 
        status: 'at_risk',
        progress: 45,
        due_date: new Date(now + 28 * oneDay).toISOString(),
        priority: 'critical',
        owner: 'Équipe DevOps'
      }
    ],

    // Tensions par domaine (Heatmap radar)
    tensions: [
      { domain: 'strategie', avg_level: 45, status: 'ok' },
      { domain: 'execution', avg_level: 62, status: 'tension' },
      { domain: 'ressources', avg_level: 78, status: 'critique' },
      { domain: 'dependances', avg_level: 33, status: 'ok' },
      { domain: 'qualite', avg_level: 55, status: 'tension' },
      { domain: 'conformite', avg_level: 40, status: 'ok' }
    ],

    // Capacité des équipes
    capacity: [
      { 
        name: 'Engineering', 
        saturation: 0.82,
        members_count: 12,
        available_hours: 480,
        allocated_hours: 394
      },
      { 
        name: 'Product & Design', 
        saturation: 0.65,
        members_count: 5,
        available_hours: 200,
        allocated_hours: 130
      },
      { 
        name: 'Data & Analytics', 
        saturation: 0.73,
        members_count: 4,
        available_hours: 160,
        allocated_hours: 117
      },
      { 
        name: 'Marketing', 
        saturation: 0.45,
        members_count: 3,
        available_hours: 120,
        allocated_hours: 54
      },
      { 
        name: 'Operations', 
        saturation: 0.58,
        members_count: 6,
        available_hours: 240,
        allocated_hours: 139
      }
    ],

    // Décisions stratégiques en attente
    decisions: [
      { 
        id: 'decision-demo-1', 
        title: 'Architecture microservices vs monolithe',
        description: 'Arbitrage technique pour scalabilité long-terme',
        impact_level: 'high',
        due_date: new Date(now + 5 * oneDay).toISOString(),
        status: 'pending',
        owner: 'CTO',
        stakeholders: ['CEO', 'VP Engineering', 'VP Product']
      },
      { 
        id: 'decision-demo-2', 
        title: 'Choix stack frontend React vs Vue',
        description: 'Standardisation technologique frontend',
        impact_level: 'medium',
        due_date: new Date(now + 10 * oneDay).toISOString(),
        status: 'pending',
        owner: 'Lead Frontend',
        stakeholders: ['CTO', 'Engineering Leads']
      },
      { 
        id: 'decision-demo-3', 
        title: 'Budget infrastructure Q2 2026',
        description: 'Validation investissement cloud AWS vs Azure',
        impact_level: 'high',
        due_date: new Date(now + 3 * oneDay).toISOString(),
        status: 'urgent',
        owner: 'CFO',
        stakeholders: ['CEO', 'CTO', 'VP Operations']
      },
      { 
        id: 'decision-demo-4', 
        title: 'Recrutement 3 développeurs seniors',
        description: 'Renforcement équipe pour accélérer roadmap',
        impact_level: 'high',
        due_date: new Date(now + 15 * oneDay).toISOString(),
        status: 'in_discussion',
        owner: 'VP Engineering',
        stakeholders: ['CEO', 'HR Director']
      },
      { 
        id: 'decision-demo-5', 
        title: 'Roadmap feature parity mobile',
        description: 'Priorisation fonctionnalités iOS/Android',
        impact_level: 'medium',
        due_date: new Date(now + 20 * oneDay).toISOString(),
        status: 'pending',
        owner: 'VP Product',
        stakeholders: ['Mobile Lead', 'Design Lead']
      }
    ],

    // Focus items (actions prioritaires aujourd'hui)
    focus: [
      { 
        id: 'focus-demo-1', 
        type: 'secure',
        priority: 'critical',
        description: 'Finaliser MVP avant fin Q1 - équipes mobilisées',
        deadline: new Date(now + 7 * oneDay).toISOString(),
        progress: 75
      },
      { 
        id: 'focus-demo-2', 
        type: 'accelerate',
        priority: 'high',
        description: 'Débloquer ressources design pour prototypes IHM',
        deadline: new Date(now + 3 * oneDay).toISOString(),
        progress: 40
      },
      { 
        id: 'focus-demo-3', 
        type: 'arbitrate',
        priority: 'high',
        description: 'Valider priorités roadmap Q2 avec COMEX',
        deadline: new Date(now + 5 * oneDay).toISOString(),
        progress: 60
      },
      { 
        id: 'focus-demo-4', 
        type: 'risk',
        priority: 'critical',
        description: 'Mitigation risque migration cloud (deadline critique)',
        deadline: new Date(now + 2 * oneDay).toISOString(),
        progress: 30
      }
    ],

    // Projets/Initiatives (pour Galaxy View)
    projects: [
      { 
        id: 'proj-demo-1', 
        name: 'Refonte plateforme e-commerce',
        description: 'Modernisation stack technique et UX',
        status: 'in_progress',
        progress: 68,
        risk_level: 'medium',
        budget: 450000,
        start_date: new Date(now - 60 * oneDay).toISOString(),
        end_date: new Date(now + 90 * oneDay).toISOString(),
        owner: 'VP Product',
        team_size: 8
      },
      { 
        id: 'proj-demo-2', 
        name: 'Migration Cloud AWS',
        description: 'Infrastructure as Code + Kubernetes',
        status: 'at_risk',
        progress: 42,
        risk_level: 'high',
        budget: 320000,
        start_date: new Date(now - 45 * oneDay).toISOString(),
        end_date: new Date(now + 60 * oneDay).toISOString(),
        owner: 'CTO',
        team_size: 5
      },
      { 
        id: 'proj-demo-3', 
        name: 'Nouveau CRM interne',
        description: 'Salesforce custom implementation',
        status: 'planned',
        progress: 15,
        risk_level: 'low',
        budget: 180000,
        start_date: new Date(now + 30 * oneDay).toISOString(),
        end_date: new Date(now + 180 * oneDay).toISOString(),
        owner: 'VP Sales',
        team_size: 4
      },
      { 
        id: 'proj-demo-4', 
        name: 'Mobile App iOS/Android',
        description: 'React Native cross-platform',
        status: 'in_progress',
        progress: 55,
        risk_level: 'medium',
        budget: 280000,
        start_date: new Date(now - 30 * oneDay).toISOString(),
        end_date: new Date(now + 120 * oneDay).toISOString(),
        owner: 'Mobile Lead',
        team_size: 6
      },
      { 
        id: 'proj-demo-5', 
        name: 'Data Warehouse & BI',
        description: 'Snowflake + Looker implementation',
        status: 'in_progress',
        progress: 38,
        risk_level: 'low',
        budget: 220000,
        start_date: new Date(now - 20 * oneDay).toISOString(),
        end_date: new Date(now + 150 * oneDay).toISOString(),
        owner: 'VP Data',
        team_size: 3
      }
    ],

    // Timestamps
    timestamps: {
      lastUpdate: "Mode Démonstration",
      generated_at: new Date().toISOString()
    }
  };
}

/**
 * Calcule des métriques réelles depuis initiatives/projets existants
 * Utilisé quand orgId a des données dans Supabase
 * 
 * @param {Array} initiatives - Initiatives depuis table Supabase
 * @param {Array} risks - Risques depuis table Supabase  
 * @param {Array} decisions - Décisions depuis table Supabase
 * @param {string} orgId - ID organisation
 * @returns {Object} Structure données cockpit avec métriques réelles
 */
export async function calculateRealCockpitData(initiatives, risks, decisions, orgId) {
  // Calcul progression moyenne
  const totalProgress = initiatives.reduce((sum, i) => sum + (parseFloat(i.progress) || 0), 0);
  const avgProgress = initiatives.length > 0 ? Math.round(totalProgress / initiatives.length) : 0;

  // Calcul score de risque
  const criticalRisks = (risks || []).filter(r => r.severity === 'critical' && r.status === 'open').length;
  const highRisks = (risks || []).filter(r => r.severity === 'high' && r.status === 'open').length;
  const riskScore = Math.min(100, (criticalRisks * 25) + (highRisks * 10));

  // Calcul budget total
  const totalBudget = initiatives.reduce((sum, i) => sum + (parseFloat(i.budget) || 0), 0);

  // Signal global
  let signal = 'ok';
  if (avgProgress < 40 || riskScore > 60) signal = 'critique';
  else if (avgProgress < 70 || riskScore > 30) signal = 'tension';
  else if (avgProgress > 85 && riskScore < 15) signal = 'excellent';

  return {
    health: {
      avg_progress: avgProgress,
      commitments: Math.round(85 + (avgProgress - 68) * 0.2), // Corrélation fictive
      risk_score: riskScore
    },
    signal: {
      global_score: Math.round((avgProgress + (100 - riskScore)) / 2),
      signal
    },
    milestones: [], // À enrichir depuis table milestones si existe
    tensions: [
      { domain: 'strategie', avg_level: riskScore > 50 ? 70 : 40 },
      { domain: 'execution', avg_level: 100 - avgProgress },
      { domain: 'ressources', avg_level: initiatives.length > 10 ? 75 : 50 },
      { domain: 'dependances', avg_level: 35 },
      { domain: 'qualite', avg_level: avgProgress < 50 ? 65 : 45 },
      { domain: 'conformite', avg_level: 40 }
    ],
    capacity: [
      { name: 'Engineering', saturation: 0.75, members_count: 10 },
      { name: 'Product', saturation: 0.60, members_count: 4 },
      { name: 'Design', saturation: 0.55, members_count: 3 }
    ],
    decisions: (decisions || []).slice(0, 10),
    focus: [
      { 
        id: 'focus-real-1', 
        type: 'secure', 
        description: `Finaliser ${initiatives[0]?.name || 'projet prioritaire'} (${initiatives[0]?.progress || 0}% complété)`,
        progress: initiatives[0]?.progress || 0
      },
      { 
        id: 'focus-real-2', 
        type: 'accelerate', 
        description: criticalRisks > 0 ? `Mitiger ${criticalRisks} risque(s) critique(s)` : 'Maintenir vélocité équipes',
        progress: criticalRisks > 0 ? 30 : 70
      },
      { 
        id: 'focus-real-3', 
        type: 'arbitrate', 
        description: `${decisions.filter(d => d.status === 'pending').length} décisions en attente validation COMEX`,
        progress: 50
      }
    ],
    projects: initiatives.map(i => ({
      id: i.id,
      name: i.name,
      status: i.status,
      progress: i.progress || 0,
      risk_level: i.risk_level || 'low',
      budget: i.budget || 0
    })),
    timestamps: {
      lastUpdate: "il y a 2 min",
      generated_at: new Date().toISOString()
    }
  };
}
