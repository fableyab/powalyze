// Données de démonstration pour Powalyze PMO
export const projects = [
  {
    id: 1,
    name: "Transformation Digitale CRM",
    type: "IT",
    program: "Transformation Digitale",
    status: "active",
    owner: "Jean Dupont",
    sponsor: "CEO",
    progress: 68,
    expectedProgress: 70,
    budgetTotal: 450000,
    budgetUsed: 285000,
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    teamSize: 8,
    teamLoad: 85,
    description: "Migration vers Salesforce et intégration ERP",
    risks: [
      { id: 1, projectId: 1, severity: "high", probability: "medium", label: "Retard intégration API", impact: "Délai +2 mois" },
      { id: 2, projectId: 1, severity: "medium", probability: "low", label: "Formation utilisateurs", impact: "Adoption lente" }
    ],
    milestones: [
      { id: 1, projectId: 1, title: "Phase 1 - Analyse", date: "2024-03-30", status: "completed" },
      { id: 2, projectId: 1, title: "Phase 2 - Dev", date: "2024-09-15", status: "completed" },
      { id: 3, projectId: 1, title: "Phase 3 - UAT", date: "2025-02-28", status: "in-progress" },
      { id: 4, projectId: 1, title: "Go Live", date: "2025-06-30", status: "pending" }
    ]
  },
  {
    id: 2,
    name: "Infrastructure Cloud Azure",
    type: "Infrastructure",
    program: "Infrastructure",
    status: "active",
    owner: "Marie Martin",
    sponsor: "CTO",
    progress: 45,
    expectedProgress: 50,
    budgetTotal: 680000,
    budgetUsed: 320000,
    startDate: "2024-06-01",
    endDate: "2025-12-31",
    teamSize: 12,
    teamLoad: 95,
    description: "Migration datacenter vers Azure Cloud",
    risks: [
      { id: 3, projectId: 2, severity: "critical", probability: "high", label: "Dépassement budget", impact: "+15% coûts" },
      { id: 4, projectId: 2, severity: "high", probability: "medium", label: "Compétences Azure", impact: "Besoin formation" }
    ],
    milestones: [
      { id: 5, projectId: 2, title: "Architecture", date: "2024-08-31", status: "completed" },
      { id: 6, projectId: 2, title: "Migration Phase 1", date: "2025-03-31", status: "in-progress" },
      { id: 7, projectId: 2, title: "Migration Phase 2", date: "2025-09-30", status: "pending" },
      { id: 8, projectId: 2, title: "Clôture", date: "2025-12-31", status: "pending" }
    ]
  },
  {
    id: 3,
    name: "Excellence Opérationnelle RH",
    type: "Business Process",
    program: "Excellence Opérationnelle",
    status: "at-risk",
    owner: "Pierre Dubois",
    sponsor: "CHRO",
    progress: 32,
    expectedProgress: 55,
    budgetTotal: 280000,
    budgetUsed: 195000,
    startDate: "2024-03-01",
    endDate: "2025-08-31",
    teamSize: 6,
    teamLoad: 110,
    description: "Automatisation processus RH et onboarding",
    risks: [
      { id: 9, projectId: 3, severity: "critical", probability: "high", label: "Retard majeur", impact: "-23% vs plan" },
      { id: 10, projectId: 3, severity: "high", probability: "high", label: "Surcharge équipe", impact: "Turnover risque" }
    ],
    milestones: [
      { id: 9, projectId: 3, title: "Analyse processus", date: "2024-05-31", status: "completed" },
      { id: 10, projectId: 3, title: "Choix solution", date: "2024-09-30", status: "overdue" },
      { id: 11, projectId: 3, title: "Implémentation", date: "2025-05-31", status: "pending" },
      { id: 12, projectId: 3, title: "Déploiement", date: "2025-08-31", status: "pending" }
    ]
  },
  {
    id: 4,
    name: "Business Intelligence BI",
    type: "Data",
    program: "Transformation Digitale",
    status: "active",
    owner: "Sophie Leclerc",
    sponsor: "CFO",
    progress: 78,
    expectedProgress: 75,
    budgetTotal: 320000,
    budgetUsed: 240000,
    startDate: "2024-02-01",
    endDate: "2025-04-30",
    teamSize: 5,
    teamLoad: 80,
    description: "Déploiement Power BI et Data Warehouse",
    risks: [
      { id: 11, projectId: 4, severity: "medium", probability: "low", label: "Qualité données", impact: "Nettoyage requis" }
    ],
    milestones: [
      { id: 13, projectId: 4, title: "Data Warehouse", date: "2024-06-30", status: "completed" },
      { id: 14, projectId: 4, title: "Dashboards", date: "2024-12-31", status: "completed" },
      { id: 15, projectId: 4, title: "Formation", date: "2025-03-31", status: "in-progress" },
      { id: 16, projectId: 4, title: "Go Live", date: "2025-04-30", status: "pending" }
    ]
  },
  {
    id: 5,
    name: "Cybersécurité SOC",
    type: "Security",
    program: "Infrastructure",
    status: "active",
    owner: "Luc Bertrand",
    sponsor: "CISO",
    progress: 55,
    expectedProgress: 60,
    budgetTotal: 520000,
    budgetUsed: 310000,
    startDate: "2024-04-01",
    endDate: "2025-10-31",
    teamSize: 7,
    teamLoad: 90,
    description: "Mise en place Security Operations Center",
    risks: [
      { id: 12, projectId: 5, severity: "high", probability: "medium", label: "Recrutement experts", impact: "Manque compétences" }
    ],
    milestones: [
      { id: 17, projectId: 5, title: "Architecture SOC", date: "2024-07-31", status: "completed" },
      { id: 18, projectId: 5, title: "Outils SIEM", date: "2024-12-31", status: "completed" },
      { id: 19, projectId: 5, title: "Processus", date: "2025-06-30", status: "in-progress" },
      { id: 20, projectId: 5, title: "Opérationnel", date: "2025-10-31", status: "pending" }
    ]
  }
];

export const tasks = [
  { id: 1, projectId: 1, title: "Design mockups CRM", status: "done", assignee: "Marie L.", dueDate: "2024-12-15", priority: "high" },
  { id: 2, projectId: 1, title: "Intégration API Salesforce", status: "in-progress", assignee: "Jean D.", dueDate: "2025-01-30", priority: "high" },
  { id: 3, projectId: 1, title: "Tests UAT modules ventes", status: "in-progress", assignee: "Sophie M.", dueDate: "2025-02-15", priority: "medium" },
  { id: 4, projectId: 1, title: "Formation utilisateurs vague 1", status: "todo", assignee: "Pierre B.", dueDate: "2025-03-01", priority: "medium" },
  { id: 5, projectId: 2, title: "Architecture réseau Azure", status: "done", assignee: "Luc T.", dueDate: "2024-11-30", priority: "critical" },
  { id: 6, projectId: 2, title: "Migration serveurs batch 1", status: "in-progress", assignee: "Marie M.", dueDate: "2025-02-28", priority: "high" },
  { id: 7, projectId: 2, title: "Tests de charge", status: "todo", assignee: "Jean R.", dueDate: "2025-04-15", priority: "high" },
  { id: 8, projectId: 3, title: "Mapping processus RH", status: "done", assignee: "Pierre D.", dueDate: "2024-08-31", priority: "medium" },
  { id: 9, projectId: 3, title: "Sélection solution SIRH", status: "in-progress", assignee: "Sophie L.", dueDate: "2025-01-31", priority: "critical" },
  { id: 10, projectId: 3, title: "Configuration workflows", status: "todo", assignee: "Luc B.", dueDate: "2025-04-30", priority: "medium" },
  { id: 11, projectId: 4, title: "Modèle données DWH", status: "done", assignee: "Sophie L.", dueDate: "2024-09-30", priority: "high" },
  { id: 12, projectId: 4, title: "Dashboards Power BI CFO", status: "done", assignee: "Jean D.", dueDate: "2024-12-15", priority: "high" },
  { id: 13, projectId: 4, title: "Formation analystes", status: "in-progress", assignee: "Marie M.", dueDate: "2025-03-15", priority: "medium" },
  { id: 14, projectId: 5, title: "Configuration SIEM", status: "done", assignee: "Luc B.", dueDate: "2024-12-31", priority: "critical" },
  { id: 15, projectId: 5, title: "Procédures incident response", status: "in-progress", assignee: "Pierre D.", dueDate: "2025-02-28", priority: "high" }
];

export const team = [
  { id: 1, name: "Jean Dupont", role: "PMO Manager", email: "jean.dupont@powalyze.ch", projectsIds: [1, 4], skills: ["PMO", "Agile", "Risk Management"] },
  { id: 2, name: "Marie Martin", role: "Infrastructure Lead", email: "marie.martin@powalyze.ch", projectsIds: [2], skills: ["Azure", "DevOps", "Cloud Architecture"] },
  { id: 3, name: "Pierre Dubois", role: "Business Analyst", email: "pierre.dubois@powalyze.ch", projectsIds: [3], skills: ["Process Mapping", "Change Management", "SIRH"] },
  { id: 4, name: "Sophie Leclerc", role: "Data Analyst", email: "sophie.leclerc@powalyze.ch", projectsIds: [4], skills: ["Power BI", "SQL", "Data Modeling"] },
  { id: 5, name: "Luc Bertrand", role: "Security Architect", email: "luc.bertrand@powalyze.ch", projectsIds: [5], skills: ["SIEM", "SOC", "Incident Response"] },
  { id: 6, name: "Anne Moreau", role: "Scrum Master", email: "anne.moreau@powalyze.ch", projectsIds: [1, 3], skills: ["Agile", "Scrum", "Facilitation"] },
  { id: 7, name: "Thomas Bernard", role: "DevOps Engineer", email: "thomas.bernard@powalyze.ch", projectsIds: [2, 5], skills: ["CI/CD", "Kubernetes", "Terraform"] },
  { id: 8, name: "Emma Rousseau", role: "UX Designer", email: "emma.rousseau@powalyze.ch", projectsIds: [1, 3], skills: ["UI/UX", "Figma", "User Research"] }
];

export const kpis = {
  totalProjects: 5,
  activeProjects: 5,
  completedProjects: 8,
  totalBudget: 2250000,
  budgetUsed: 1350000,
  budgetRemaining: 900000,
  averageProgress: 56,
  onTimeDelivery: 92,
  teamSize: 45,
  criticalRisks: 2,
  highRisks: 4
};

export const progressHistory = [
  { month: "Jan", value: 25 },
  { month: "Feb", value: 32 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 42 },
  { month: "Mai", value: 48 },
  { month: "Jun", value: 52 },
  { month: "Jul", value: 56 }
];

export const budgetHistory = [
  { month: "Jan", budget: 300000, spent: 120000 },
  { month: "Feb", budget: 600000, spent: 280000 },
  { month: "Mar", budget: 900000, spent: 485000 },
  { month: "Apr", budget: 1200000, spent: 720000 },
  { month: "Mai", budget: 1500000, spent: 950000 },
  { month: "Jun", budget: 1800000, spent: 1180000 },
  { month: "Jul", budget: 2250000, spent: 1350000 }
];
