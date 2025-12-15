
export const clientProjects = [
  {
    id: "1",
    name: "Implémentation PMO Stratégique",
    client: "Acme Corp",
    status: "Active",
    progress: 65,
    deadline: "2025-12-31",
    budget: 150000,
    spent: 95000,
    description: "Mise en place d'une gouvernance de portefeuille projets alignée sur la stratégie d'entreprise 2025.",
    manager: "Fabrice Fays",
    team: [
      { id: 1, name: "Alice Dupont", role: "PMO Analyst", avatar: "AD" },
      { id: 2, name: "Marc Weber", role: "Consultant Senior", avatar: "MW" }
    ],
    documentsCount: 12,
    lastUpdate: "2025-10-15T10:30:00Z",
    type: "Consulting"
  },
  {
    id: "2",
    name: "Power BI Executive Dashboard",
    client: "Acme Corp",
    status: "Active",
    progress: 80,
    deadline: "2025-11-15",
    budget: 45000,
    spent: 32000,
    description: "Développement et déploiement de tableaux de bord exécutifs pour le CODIR.",
    manager: "Sarah Meyer",
    team: [
      { id: 3, name: "Sarah Meyer", role: "Data Expert", avatar: "SM" }
    ],
    documentsCount: 8,
    lastUpdate: "2025-10-18T14:20:00Z",
    type: "Data"
  },
  {
    id: "3",
    name: "Audit de Gouvernance IT",
    client: "Acme Corp",
    status: "Completed",
    progress: 100,
    deadline: "2025-09-30",
    budget: 25000,
    spent: 25000,
    description: "Audit complet des processus IT et recommandations d'optimisation.",
    manager: "Julien Perrot",
    team: [],
    documentsCount: 5,
    lastUpdate: "2025-09-30T09:00:00Z",
    type: "Audit"
  },
  {
    id: "4",
    name: "Automatisation Processus RH",
    client: "Acme Corp",
    status: "On Hold",
    progress: 40,
    deadline: "2026-02-28",
    budget: 60000,
    spent: 20000,
    description: "Automatisation de l'onboarding et offboarding via Power Automate.",
    manager: "Marc Weber",
    team: [
      { id: 2, name: "Marc Weber", role: "Consultant Senior", avatar: "MW" }
    ],
    documentsCount: 3,
    lastUpdate: "2025-10-01T11:45:00Z",
    type: "Automation"
  },
  {
    id: "5",
    name: "Stratégie Data 2026",
    client: "Acme Corp",
    status: "At Risk",
    progress: 50,
    deadline: "2025-12-15",
    budget: 80000,
    spent: 45000,
    description: "Définition de la feuille de route data et architecture cible.",
    manager: "Fabrice Fays",
    team: [
      { id: 1, name: "Alice Dupont", role: "PMO Analyst", avatar: "AD" },
      { id: 3, name: "Sarah Meyer", role: "Data Expert", avatar: "SM" }
    ],
    documentsCount: 15,
    lastUpdate: "2025-10-10T16:15:00Z",
    type: "Strategy"
  }
];
