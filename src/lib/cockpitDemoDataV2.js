/**
 * 🎭 Générateur Données Démo Cockpit V2
 * Format: Items unifiés (initiative/project/risk/decision)
 * Objectif: Données crédibles pour démo monday.com-style
 */

/**
 * Générer items démo pour un board
 */
export function generateDemoItems(orgId, boardType) {
  const generators = {
    initiatives: generateInitiatives,
    risks: generateRisks,
    decisions: generateDecisions,
    capacity: generateCapacity
  };

  const generator = generators[boardType];
  if (!generator) {
    console.warn(`Pas de générateur pour ${boardType}`);
    return [];
  }

  return generator(orgId);
}

// ─────────────────────────────────────────────────────────────
// 🚀 INITIATIVES STRATÉGIQUES
// ─────────────────────────────────────────────────────────────

function generateInitiatives(orgId) {
  const now = new Date();
  
  return [
    {
      id: 'demo-init-1',
      type: 'initiative',
      title: 'Transformation Digitale Groupe',
      status: 'in_progress',
      owner: 'Marie Dubois',
      sponsor: 'Jean-Marc Lefort (CEO)',
      start_date: new Date(2025, 0, 15).toISOString(),
      end_date: new Date(2026, 11, 31).toISOString(),
      progress: 42,
      priority: 'critical',
      tags: ['Digital', 'Stratégie', 'Groupe'],
      custom_fields: {
        budget: '2.5M€',
        fte: 15,
        business_unit: 'Corporate'
      },
      created_at: new Date(2024, 11, 1).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-init-2',
      title: 'Migration Cloud Azure',
      type: 'initiative',
      status: 'in_progress',
      owner: 'Thomas Martin',
      sponsor: 'Sophie Bernard (CTO)',
      start_date: new Date(2025, 2, 1).toISOString(),
      end_date: new Date(2026, 5, 30).toISOString(),
      progress: 28,
      priority: 'high',
      tags: ['Cloud', 'Infrastructure', 'IT'],
      custom_fields: {
        budget: '1.8M€',
        fte: 8,
        business_unit: 'IT'
      },
      created_at: new Date(2025, 1, 10).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-init-3',
      title: 'Programme Excellence Commerciale',
      type: 'initiative',
      status: 'planned',
      owner: 'Caroline Petit',
      sponsor: 'Marc Dubois (CCO)',
      start_date: new Date(2025, 8, 1).toISOString(),
      end_date: new Date(2026, 11, 31).toISOString(),
      progress: 5,
      priority: 'high',
      tags: ['Commercial', 'Sales', 'Croissance'],
      custom_fields: {
        budget: '900K€',
        fte: 6,
        business_unit: 'Sales'
      },
      created_at: new Date(2025, 6, 20).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-init-4',
      title: 'Refonte SI RH',
      type: 'initiative',
      status: 'blocked',
      owner: 'Laurent Moreau',
      sponsor: 'Claire Roux (CHRO)',
      start_date: new Date(2025, 3, 1).toISOString(),
      end_date: new Date(2025, 11, 31).toISOString(),
      progress: 18,
      priority: 'medium',
      tags: ['RH', 'SI', 'Interne'],
      custom_fields: {
        budget: '450K€',
        fte: 4,
        business_unit: 'HR',
        blocage: 'Attente validation budget Q3'
      },
      created_at: new Date(2025, 2, 5).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-init-5',
      title: 'Innovation IA Générative',
      type: 'initiative',
      status: 'in_progress',
      owner: 'Alexandre Chen',
      sponsor: 'Sophie Bernard (CTO)',
      start_date: new Date(2025, 4, 1).toISOString(),
      end_date: new Date(2026, 3, 31).toISOString(),
      progress: 62,
      priority: 'critical',
      tags: ['IA', 'Innovation', 'R&D'],
      custom_fields: {
        budget: '1.2M€',
        fte: 10,
        business_unit: 'Innovation Lab'
      },
      created_at: new Date(2025, 3, 15).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-init-6',
      title: 'Expansion DACH',
      type: 'initiative',
      status: 'done',
      owner: 'Isabelle Weber',
      sponsor: 'Jean-Marc Lefort (CEO)',
      start_date: new Date(2024, 8, 1).toISOString(),
      end_date: new Date(2025, 5, 30).toISOString(),
      progress: 100,
      priority: 'high',
      tags: ['International', 'Expansion', 'DACH'],
      custom_fields: {
        budget: '3.5M€',
        fte: 12,
        business_unit: 'International',
        result: 'Bureaux Zurich et Munich opérationnels'
      },
      created_at: new Date(2024, 7, 10).toISOString(),
      updated_at: now.toISOString()
    }
  ];
}

// ─────────────────────────────────────────────────────────────
// ⚠️ RISQUES CRITIQUES
// ─────────────────────────────────────────────────────────────

function generateRisks(orgId) {
  const now = new Date();
  
  return [
    {
      id: 'demo-risk-1',
      type: 'risk',
      title: 'Retard livraison Cloud (dépendance fournisseur)',
      status: 'in_progress',
      owner: 'Thomas Martin',
      sponsor: null,
      start_date: new Date(2025, 5, 1).toISOString(),
      end_date: new Date(2025, 8, 30).toISOString(),
      progress: 35, // % mitigation
      priority: 'critical',
      tags: ['Cloud', 'Fournisseur', 'Délai'],
      custom_fields: {
        impact: 'Planning global +3 mois',
        probability: 'Haute (70%)',
        mitigation: 'Dual-sourcing envisagé'
      },
      created_at: new Date(2025, 4, 10).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-risk-2',
      type: 'risk',
      title: 'Perte compétence clé (départ Sarah Lambert)',
      status: 'in_progress',
      owner: 'Claire Roux',
      sponsor: 'Sophie Bernard (CTO)',
      start_date: new Date(2025, 6, 15).toISOString(),
      end_date: new Date(2025, 9, 15).toISOString(),
      progress: 50,
      priority: 'high',
      tags: ['RH', 'Compétence', 'Critique'],
      custom_fields: {
        impact: 'Blocage programme IA',
        probability: 'Moyenne (40%)',
        mitigation: 'Documentation + recrutement en cours'
      },
      created_at: new Date(2025, 6, 1).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-risk-3',
      type: 'risk',
      title: 'Dépassement budget Q3 (+15%)',
      status: 'planned',
      owner: 'Marie Dubois',
      sponsor: 'Jean-Marc Lefort (CEO)',
      start_date: new Date(2025, 7, 1).toISOString(),
      end_date: new Date(2025, 9, 30).toISOString(),
      progress: 0,
      priority: 'high',
      tags: ['Budget', 'Financier', 'Stratégie'],
      custom_fields: {
        impact: '450K€ manquants',
        probability: 'Moyenne (50%)',
        mitigation: 'Arbitrage COMEX prévu S30'
      },
      created_at: new Date(2025, 6, 25).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-risk-4',
      type: 'risk',
      title: 'Conformité RGPD - Audit externe',
      status: 'done',
      owner: 'Laurent Moreau',
      sponsor: null,
      start_date: new Date(2025, 3, 1).toISOString(),
      end_date: new Date(2025, 6, 30).toISOString(),
      progress: 100,
      priority: 'critical',
      tags: ['Legal', 'RGPD', 'Conformité'],
      custom_fields: {
        impact: 'Amendes potentielles',
        probability: 'Faible (résolue)',
        mitigation: 'Audit passé avec succès (14 recommandations fermées)'
      },
      created_at: new Date(2025, 2, 10).toISOString(),
      updated_at: now.toISOString()
    }
  ];
}

// ─────────────────────────────────────────────────────────────
// ✅ DÉCISIONS À SUIVRE
// ─────────────────────────────────────────────────────────────

function generateDecisions(orgId) {
  const now = new Date();
  
  return [
    {
      id: 'demo-decision-1',
      type: 'decision',
      title: 'Validation budget additionnel programme Cloud (+800K€)',
      status: 'pending',
      owner: 'Jean-Marc Lefort (CEO)',
      sponsor: null,
      start_date: new Date(2025, 7, 1).toISOString(),
      end_date: new Date(2025, 7, 15).toISOString(),
      progress: 0,
      priority: 'critical',
      tags: ['COMEX', 'Budget', 'Cloud'],
      custom_fields: {
        committee: 'COMEX',
        decision_type: 'GO/NO-GO',
        context: 'Dépassement prévu sur migration Azure'
      },
      created_at: new Date(2025, 6, 28).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-decision-2',
      type: 'decision',
      title: 'Arbitrage priorisation: IA vs Excellence Commerciale',
      status: 'urgent',
      owner: 'Sophie Bernard (CTO)',
      sponsor: 'Jean-Marc Lefort (CEO)',
      start_date: new Date(2025, 7, 5).toISOString(),
      end_date: new Date(2025, 7, 20).toISOString(),
      progress: 0,
      priority: 'critical',
      tags: ['COMEX', 'Stratégie', 'Priorisation'],
      custom_fields: {
        committee: 'COMEX',
        decision_type: 'Arbitrage',
        context: 'Conflit ressources Q4'
      },
      created_at: new Date(2025, 7, 2).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-decision-3',
      type: 'decision',
      title: 'Recrutement Chef de Projet PMO Senior',
      status: 'approved',
      owner: 'Claire Roux (CHRO)',
      sponsor: null,
      start_date: new Date(2025, 6, 10).toISOString(),
      end_date: new Date(2025, 6, 25).toISOString(),
      progress: 100,
      priority: 'high',
      tags: ['CODIR', 'RH', 'Recrutement'],
      custom_fields: {
        committee: 'CODIR',
        decision_type: 'Approbation',
        context: 'Renforcement équipe PMO',
        result: 'Approuvé - Budget 85K€'
      },
      created_at: new Date(2025, 6, 5).toISOString(),
      updated_at: now.toISOString()
    },
    {
      id: 'demo-decision-4',
      type: 'decision',
      title: 'Lancement POC IA Générative Finance',
      status: 'in_review',
      owner: 'Alexandre Chen',
      sponsor: 'Sophie Bernard (CTO)',
      start_date: new Date(2025, 7, 8).toISOString(),
      end_date: new Date(2025, 8, 1).toISOString(),
      progress: 30,
      priority: 'medium',
      tags: ['Innovation', 'IA', 'Finance'],
      custom_fields: {
        committee: 'Comité Innovation',
        decision_type: 'GO/NO-GO',
        context: 'Automatisation reporting financier'
      },
      created_at: new Date(2025, 7, 1).toISOString(),
      updated_at: now.toISOString()
    }
  ];
}

// ─────────────────────────────────────────────────────────────
// 👥 CAPACITÉ PMO & CHARGE
// ─────────────────────────────────────────────────────────────

function generateCapacity(orgId) {
  // Réutiliser initiatives mais filtrer sur statut 'in_progress'
  const initiatives = generateInitiatives(orgId);
  return initiatives.filter(i => i.status === 'in_progress' || i.status === 'blocked');
}
