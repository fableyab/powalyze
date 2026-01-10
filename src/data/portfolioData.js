// src/data/portfolioData.js

export const portfolioSegments = [
  { id: 'strategic', name: 'Strategic Initiatives', color: '#4A9EFF', icon: '🎯' },
  { id: 'transformation', name: 'Transformation', color: '#FFD700', icon: '🔄' },
  { id: 'it-digital', name: 'IT & Digital', color: '#00D4FF', icon: '💻' },
  { id: 'innovation', name: 'Innovation', color: '#FF6B00', icon: '💡' },
  { id: 'regulatory', name: 'Regulatory', color: '#FF0066', icon: '⚖️' },
  { id: 'run', name: 'Run / Maintenance', color: '#666666', icon: '🔧' },
];

export const portfolioProjects = [
  {
    id: '1',
    name: 'Contact and Appointment (EN)',
    segment: 'strategic',
    status: 'IN_PROGRESS',
    budget: 12000000,
    value: 8.5,
    risk: 6.2,
    alignment: 9.1,
    deadline: '2026-02-01',
    owner: 'Fabrice',
    description: 'Modernisation de la prise de rendez-vous pour améliorer l\'expérience client.',
  },
  {
    id: '2',
    name: 'Fabrice fabb',
    segment: 'strategic',
    status: 'IN_PROGRESS',
    budget: 120000,
    value: 7.2,
    risk: 4.5,
    alignment: 8.8,
    deadline: '2026-03-01',
    owner: 'Fabrice',
    description: 'Pilote interne pour tester de nouveaux standards de gouvernance.',
  },
  {
    id: '3',
    name: 'Cloud Migration Program',
    segment: 'it-digital',
    status: 'CRITICAL',
    budget: 4500000,
    value: 9.2,
    risk: 8.8,
    alignment: 9.5,
    deadline: '2026-01-31',
    owner: 'CIO',
    description: 'Migration progressive vers le cloud avec contraintes fortes de sécurité.',
  },
  {
    id: '4',
    name: 'ERP Modernization',
    segment: 'transformation',
    status: 'ON_HOLD',
    budget: 3000000,
    value: 8.0,
    risk: 7.5,
    alignment: 7.8,
    deadline: '2026-06-01',
    owner: 'CFO',
    description: 'Modernisation de l\'ERP pour mieux supporter la croissance.',
  },
  {
    id: '5',
    name: 'AI Customer Insights',
    segment: 'innovation',
    status: 'IN_PROGRESS',
    budget: 850000,
    value: 7.8,
    risk: 6.0,
    alignment: 8.2,
    deadline: '2026-04-15',
    owner: 'CMO',
    description: 'Analyse prédictive du comportement client par IA.',
  },
  {
    id: '6',
    name: 'GDPR Compliance Update',
    segment: 'regulatory',
    status: 'IN_PROGRESS',
    budget: 450000,
    value: 6.5,
    risk: 5.0,
    alignment: 9.0,
    deadline: '2026-02-28',
    owner: 'Legal',
    description: 'Mise à jour réglementaire GDPR suite aux nouvelles directives.',
  },
  {
    id: '7',
    name: 'Infrastructure Maintenance',
    segment: 'run',
    status: 'COMPLETED',
    budget: 200000,
    value: 5.5,
    risk: 2.0,
    alignment: 6.0,
    deadline: '2025-12-31',
    owner: 'Ops',
    description: 'Maintenance annuelle de l\'infrastructure critique.',
  },
  {
    id: '8',
    name: 'Mobile App Redesign',
    segment: 'transformation',
    status: 'IN_PROGRESS',
    budget: 1800000,
    value: 8.8,
    risk: 5.5,
    alignment: 8.9,
    deadline: '2026-05-01',
    owner: 'Product',
    description: 'Refonte complète de l\'application mobile pour iOS et Android.',
  },
  {
    id: '9',
    name: 'Blockchain POC',
    segment: 'innovation',
    status: 'IN_PROGRESS',
    budget: 350000,
    value: 6.0,
    risk: 9.0,
    alignment: 5.5,
    deadline: '2026-03-31',
    owner: 'R&D',
    description: 'Proof of concept blockchain pour la traçabilité des transactions.',
  },
  {
    id: '10',
    name: 'Cybersecurity Framework',
    segment: 'it-digital',
    status: 'CRITICAL',
    budget: 2200000,
    value: 9.5,
    risk: 8.5,
    alignment: 9.8,
    deadline: '2026-02-15',
    owner: 'CISO',
    description: 'Renforcement du framework de cybersécurité suite à audit.',
  },
];

export const getPortfolioKPIs = () => {
  const activeProjects = portfolioProjects.filter(p => 
    p.status === 'IN_PROGRESS' || p.status === 'CRITICAL'
  ).length;
  
  const portfolioValue = portfolioProjects.reduce((sum, p) => sum + p.budget, 0);
  
  const criticalProjects = portfolioProjects.filter(p => p.status === 'CRITICAL').length;
  
  const avgAlignment = (
    portfolioProjects.reduce((sum, p) => sum + p.alignment, 0) / portfolioProjects.length
  ).toFixed(1);
  
  const avgRisk = (
    portfolioProjects.reduce((sum, p) => sum + p.risk, 0) / portfolioProjects.length
  ).toFixed(1);

  return {
    activeProjects,
    portfolioValue,
    criticalProjects,
    avgAlignment,
    avgRisk,
  };
};

export const getSegmentProjects = (segmentId) => {
  return portfolioProjects.filter(p => p.segment === segmentId);
};

export const getSegmentStats = (segmentId) => {
  const projects = getSegmentProjects(segmentId);
  
  return {
    count: projects.length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    avgValue: (projects.reduce((sum, p) => sum + p.value, 0) / projects.length).toFixed(1),
    avgRisk: (projects.reduce((sum, p) => sum + p.risk, 0) / projects.length).toFixed(1),
    avgAlignment: (projects.reduce((sum, p) => sum + p.alignment, 0) / projects.length).toFixed(1),
  };
};
