export const insightReports = [
  {
    id: 'rep1',
    name: 'Financial Overview Q4',
    description:
      'Vue consolidée des revenus, marges et cash-flow sur le dernier trimestre.',
    domain: 'FINANCE',
    status: 'FINALIZED',
    lastUpdated: '2025-12-28',
    views: 312,
    isFavorite: true,
    hasAlert: true,
  },
  {
    id: 'rep2',
    name: 'Portfolio Status & Health',
    description:
      "Synthèse de l'état du portefeuille de projets : santé, dérives, alignement stratégique.",
    domain: 'PMO',
    status: 'FINALIZED',
    lastUpdated: '2026-01-03',
    views: 268,
    isFavorite: true,
    hasAlert: true,
  },
  {
    id: 'rep3',
    name: 'Commercial Performance Q1 Forecast',
    description:
      'Projection des ventes Q1 par segment, région et grand compte, avec analyse du pipeline.',
    domain: 'COMMERCIAL',
    status: 'DRAFT',
    lastUpdated: '2026-01-04',
    views: 194,
    hasAlert: false,
  },
  {
    id: 'rep4',
    name: 'Risk & Compliance Report',
    description:
      'Cartographie des risques majeurs, incidents récents et conformité aux contrôles clés.',
    domain: 'RISK',
    status: 'FINALIZED',
    lastUpdated: '2025-12-30',
    views: 147,
    hasAlert: true,
  },
  {
    id: 'rep5',
    name: 'Strategic Objectives Tracking',
    description:
      "Suivi des objectifs stratégiques, KPIs associés et niveau d'atteinte par axe.",
    domain: 'STRATEGY',
    status: 'DRAFT',
    lastUpdated: '2025-12-20',
    views: 121,
    isFavorite: false,
    hasAlert: false,
  },
];

export const domainLabel = {
  FINANCE: 'Finance',
  COMMERCIAL: 'Commercial',
  PMO: 'PMO',
  RISK: 'Risk',
  STRATEGY: 'Strategy',
};

export const domainBadgeClass = {
  FINANCE: 'bg-emerald-50 text-emerald-700',
  COMMERCIAL: 'bg-blue-50 text-blue-700',
  PMO: 'bg-amber-50 text-amber-700',
  RISK: 'bg-rose-50 text-rose-700',
  STRATEGY: 'bg-violet-50 text-violet-700',
};
