// src/data/projectsData.js

export const projects = [
  {
    id: '1',
    name: 'Contact and Appointment (EN)',
    status: 'IN_PROGRESS',
    deadline: '2026-02-01',
    budget: 12000000,
    owner: 'Fabrice',
    description:
      "Projet stratégique visant à moderniser la prise de rendez-vous et améliorer l'expérience client sur les marchés clés.",
    column: 'IN_PROGRESS',
  },
  {
    id: '2',
    name: 'Fabrice fabb',
    status: 'IN_PROGRESS',
    deadline: '2026-03-01',
    budget: 120000,
    owner: 'Fabrice',
    description:
      'Pilote interne pour tester de nouveaux standards de gouvernance, de reporting et de prise de décision.',
    column: 'REVIEW',
  },
  {
    id: '3',
    name: 'Cloud Migration Program',
    status: 'CRITICAL',
    deadline: '2026-01-31',
    budget: 4500000,
    owner: 'CIO',
    description:
      'Migration progressive vers le cloud avec contraintes fortes de sécurité, de continuité et de coûts.',
    column: 'IN_PROGRESS',
  },
  {
    id: '4',
    name: 'ERP Modernization',
    status: 'ON_HOLD',
    deadline: undefined,
    budget: 3000000,
    owner: 'CFO',
    description:
      "Modernisation de l'ERP pour mieux supporter la croissance, actuellement en pause pour arbitrage budgétaire.",
    column: 'TODO',
  },
];
