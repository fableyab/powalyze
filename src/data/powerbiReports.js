/**
 * 📊 Power BI Reports Configuration
 * Liste centralisée des rapports disponibles
 */

export const powerbiReports = [
  {
    id: 'portfolio',
    name: 'Portefeuille stratégique',
    description: 'Vue globale du portefeuille de projets',
    reportId: import.meta.env.VITE_POWERBI_REPORT_PORTFOLIO_ID || '',
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_PORTFOLIO_URL || '',
    icon: '📊',
    category: 'stratégique'
  },
  {
    id: 'projects',
    name: 'Suivi des projets',
    description: 'KPIs et métriques projet par projet',
    reportId: import.meta.env.VITE_POWERBI_REPORT_PROJECTS_ID || '',
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_PROJECTS_URL || '',
    icon: '📈',
    category: 'opérationnel'
  },
  {
    id: 'capacity',
    name: 'Capacités & Ressources',
    description: 'Analyse des ressources et capacités',
    reportId: import.meta.env.VITE_POWERBI_REPORT_CAPACITY_ID || '',
    embedUrl: import.meta.env.VITE_POWERBI_REPORT_CAPACITY_URL || '',
    icon: '👥',
    category: 'ressources'
  },
];

/**
 * Récupère un rapport par son ID
 */
export const getReportById = (id) => {
  return powerbiReports.find(r => r.id === id);
};

/**
 * Vérifie si la configuration Power BI est complète
 */
export const isPowerBIConfigured = () => {
  return powerbiReports.every(r => r.reportId && r.embedUrl);
};
