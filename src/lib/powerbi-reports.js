/**
 * Configuration centralisée des rapports Power BI
 * Architecture Vite + React Router (PAS Next.js)
 */

export const reports = [
  {
    id: 'portfolio',
    name: 'Portefeuille stratégique',
    description: 'Vue d\'ensemble du portefeuille de projets',
    reportId: import.meta.env.VITE_POWERBI_REPORT_PORTFOLIO_ID,
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_PORTFOLIO_URL,
  },
  {
    id: 'projects',
    name: 'Suivi des projets',
    description: 'Tableau de bord détaillé des projets en cours',
    reportId: import.meta.env.VITE_POWERBI_REPORT_PROJECTS_ID,
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_PROJECTS_URL,
  },
  {
    id: 'capacity',
    name: 'Capacités & Ressources',
    description: 'Analyse des capacités et ressources disponibles',
    reportId: import.meta.env.VITE_POWERBI_REPORT_CAPACITY_ID,
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_CAPACITY_URL,
  },
];

// Token global partagé
export const getAccessToken = () => import.meta.env.VITE_POWERBI_ACCESS_TOKEN;

// Récupérer un rapport par ID
export const getReportById = (id) => reports.find((r) => r.id === id);

// Vérifier si tous les rapports sont configurés
export const areReportsConfigured = () => {
  const token = getAccessToken();
  if (!token || token.includes('xxx')) return false;
  
  return reports.every((r) => r.reportId && r.embedUrl && !r.reportId.includes('xxx'));
};
