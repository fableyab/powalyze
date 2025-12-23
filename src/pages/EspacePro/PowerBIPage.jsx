import React, { useState } from 'react';
import { FiDatabase, FiCloud, FiFileText, FiServer, FiLink, FiCheck, FiExternalLink, FiDownload, FiPlay } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PowerBIPage = () => {
  const [selectedConnector, setSelectedConnector] = useState(null);

  const connectors = [
    {
      id: 'azure-sql',
      name: 'Azure SQL Database',
      icon: FiDatabase,
      category: 'Base de données',
      status: 'active',
      description: 'Connectez-vous directement à Azure SQL pour importer vos données projet en temps réel.',
      config: {
        server: 'powalyze-pmo.database.windows.net',
        database: 'pmo_production',
        auth: 'Azure AD'
      }
    },
    {
      id: 'sharepoint',
      name: 'SharePoint Online',
      icon: FiCloud,
      category: 'Collaboration',
      status: 'active',
      description: 'Importez des listes SharePoint, bibliothèques de documents et métadonnées projet.',
      config: {
        site: 'https://powalyze.sharepoint.com',
        auth: 'OAuth 2.0'
      }
    },
    {
      id: 'excel',
      name: 'Excel / CSV',
      icon: FiFileText,
      category: 'Fichiers',
      status: 'active',
      description: 'Chargez vos fichiers Excel avec données budgétaires, plannings et KPIs.',
      config: {
        source: 'OneDrive / SharePoint / Local',
        format: 'XLSX, CSV, TXT'
      }
    },
    {
      id: 'rest-api',
      name: 'REST API',
      icon: FiServer,
      category: 'API',
      status: 'active',
      description: 'Connectez des API tierces (Jira, Azure DevOps, Monday.com) pour agréger les données.',
      config: {
        endpoint: 'https://api.powalyze.com/v1',
        auth: 'Bearer Token'
      }
    },
    {
      id: 'azure-devops',
      name: 'Azure DevOps',
      icon: FiCloud,
      category: 'DevOps',
      status: 'active',
      description: 'Importez work items, sprints, pipelines et métriques de vélocité.',
      config: {
        organization: 'powalyze',
        project: 'PMO',
        auth: 'PAT'
      }
    },
    {
      id: 'power-platform',
      name: 'Power Platform Dataflows',
      icon: FiLink,
      category: 'Microsoft',
      status: 'active',
      description: 'Réutilisez vos dataflows Power Platform pour centraliser les transformations.',
      config: {
        workspace: 'PMO Analytics',
        auth: 'Service Principal'
      }
    }
  ];

  const dashboardExamples = [
    {
      id: 'executive',
      title: 'Dashboard Exécutif',
      description: 'Vue globale pour les dirigeants : ROI, budget, délais, risques majeurs.',
      metrics: ['ROI Global', 'Budget vs Dépensé', 'Projets en retard', 'Risques critiques'],
      image: '📊',
      downloadUrl: '/templates/executive-dashboard.pbit'
    },
    {
      id: 'portfolio',
      title: 'Portefeuille de Projets',
      description: 'Pilotage multi-projets avec matrice de priorisation et allocation ressources.',
      metrics: ['12 projets actifs', 'Matrice valeur/risque', 'Allocation équipe', 'Pipeline projets'],
      image: '🎯',
      downloadUrl: '/templates/portfolio-dashboard.pbit'
    },
    {
      id: 'financial',
      title: 'Suivi Financier',
      description: 'Analyse budgétaire détaillée avec prévisions et alertes de dépassement.',
      metrics: ['Budget par projet', 'Burn rate', 'Prévisions Q1-Q4', 'Alertes dépassement'],
      image: '💰',
      downloadUrl: '/templates/financial-dashboard.pbit'
    },
    {
      id: 'agile',
      title: 'Agilité & Vélocité',
      description: 'Suivi sprint, burndown charts, vélocité équipe et prédictibilité.',
      metrics: ['Vélocité moyenne', 'Burndown sprint', 'Lead time', 'Cycle time'],
      image: '🚀',
      downloadUrl: '/templates/agile-dashboard.pbit'
    },
    {
      id: 'risks',
      title: 'Gestion des Risques',
      description: 'Cartographie des risques, heat map, plans de mitigation et historique.',
      metrics: ['20 risques actifs', 'Heat map', 'Plans mitigation', 'Tendances'],
      image: '⚠️',
      downloadUrl: '/templates/risks-dashboard.pbit'
    },
    {
      id: 'resources',
      title: 'Gestion des Ressources',
      description: 'Planification capacité, allocation par projet, taux d’occupation équipe.',
      metrics: ['Capacité disponible', 'Allocation', 'Taux occupation', 'Conflits'],
      image: '👥',
      downloadUrl: '/templates/resources-dashboard.pbit'
    }
  ];

  const bestPractices = [
    {
      title: 'Modèle de données optimisé',
      description: 'Utilisez un modèle en étoile avec tables de faits (projets, tâches, budgets) et dimensions (temps, équipes, catégories).'
    },
    {
      title: 'Rafraîchissement automatisé',
      description: 'Configurez des rafraîchissements planifiés (8h, 14h, 18h) via Power BI Service pour des données toujours à jour.'
    },
    {
      title: 'Sécurité RLS (Row-Level Security)',
      description: 'Implémentez des rôles pour que chaque utilisateur ne voie que ses projets (filtres DAX sur email/user).'
    },
    {
      title: 'Mesures DAX réutilisables',
      description: 'Créez des mesures DAX centralisées : Budget Total, Taux Complétion, Variance, ROI, Vélocité Moyenne.'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">📊 Power BI Analytics</h1>
        <p className="text-gray-400">Connecteurs, dashboards et exemples pour piloter vos projets</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiLink className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{connectors.length}</p>
              <p className="text-sm text-gray-400">Connecteurs</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiCheck className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{connectors.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-gray-400">Actifs</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiFileText className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{dashboardExamples.length}</p>
              <p className="text-sm text-gray-400">Templates</p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#111] border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
              <FiDownload className="text-[#BFA76A]" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">247</p>
              <p className="text-sm text-gray-400">Téléchargements</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Connecteurs */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Connecteurs Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectors.map((connector) => {
            const Icon = connector.icon;
            return (
              <Card key={connector.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all group cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-blue-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{connector.name}</h3>
                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/50">
                      {connector.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{connector.description}</p>
                <div className="space-y-2 mb-4">
                  {Object.entries(connector.config).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="text-gray-300 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm transition-all">
                  <FiPlay size={14} />
                  Configurer
                </button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dashboard Examples */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Dashboards & Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardExamples.map((dashboard) => (
            <Card key={dashboard.id} className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all group">
              <div className="text-6xl mb-4">{dashboard.image}</div>
              <h3 className="text-xl font-bold text-white mb-2">{dashboard.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{dashboard.description}</p>
              <div className="space-y-2 mb-4">
                {dashboard.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                    <FiCheck className="text-green-400" size={14} />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  <FiDownload size={14} />
                  Télécharger
                </button>
                <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-2 rounded-lg transition-all">
                  <FiExternalLink size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Best Practices PMO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestPractices.map((practice, idx) => (
            <Card key={idx} className="bg-[#111] border-white/10 p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#BFA76A] font-bold">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">{practice.title}</h3>
                  <p className="text-sm text-gray-400">{practice.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <Card className="bg-[#111] border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Exemple DAX : Budget Total</h3>
        <pre className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
{`Budget Total = 
SUMX(
    Projets,
    Projets[Budget Alloué]
)

Budget Dépensé = 
SUMX(
    Transactions,
    Transactions[Montant]
)

Variance Budget = 
[Budget Total] - [Budget Dépensé]

Taux Utilisation Budget = 
DIVIDE(
    [Budget Dépensé],
    [Budget Total],
    0
)`}
        </pre>
      </Card>
    </div>
  );
};

export default PowerBIPage;