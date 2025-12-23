import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiMaximize2, FiRefreshCw, FiDownload, FiShare2, FiBarChart2, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi';

const PowerBIDemoPage = () => {
  const { user } = useAuth();
  const [activeReport, setActiveReport] = useState('executive');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reports = [
    {
      id: 'executive',
      name: 'Dashboard Exécutif',
      description: 'Vue globale pour les dirigeants',
      icon: FiBarChart2,
      color: 'blue',
      embedUrl: 'https://app.powerbi.com/view?r=executive-dashboard-demo'
    },
    {
      id: 'portfolio',
      name: 'Portefeuille Projets',
      description: 'Pilotage multi-projets',
      icon: FiTrendingUp,
      color: 'green',
      embedUrl: 'https://app.powerbi.com/view?r=portfolio-dashboard-demo'
    },
    {
      id: 'financial',
      name: 'Suivi Financier',
      description: 'Analyse budgétaire détaillée',
      icon: FiDollarSign,
      color: 'yellow',
      embedUrl: 'https://app.powerbi.com/view?r=financial-dashboard-demo'
    },
    {
      id: 'performance',
      name: 'Performance & KPIs',
      description: 'Indicateurs de performance',
      icon: FiActivity,
      color: 'purple',
      embedUrl: 'https://app.powerbi.com/view?r=performance-dashboard-demo'
    }
  ];

  const activeReportData = reports.find(r => r.id === activeReport);

  const demoStats = [
    { label: 'Projets Analysés', value: '47', change: '+12%', positive: true },
    { label: 'Budget Global', value: '€12.4M', change: '+8%', positive: true },
    { label: 'ROI Moyen', value: '237%', change: '+15%', positive: true },
    { label: 'Taux Réussite', value: '94%', change: '+3%', positive: true }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">📊 Power BI Analytics</h1>
          <p className="text-gray-400">
            {user?.isDemo && (
              <span className="inline-block px-3 py-1 bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50 rounded-full text-sm font-medium mr-2">
                Mode Démo
              </span>
            )}
            Dashboards interactifs pour piloter vos projets PMO
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#111] border border-white/10 text-white rounded-lg hover:border-[#BFA76A]/50 transition-all flex items-center gap-2">
            <FiRefreshCw size={16} />
            <span className="hidden sm:inline">Actualiser</span>
          </button>
          <button className="px-4 py-2 bg-[#111] border border-white/10 text-white rounded-lg hover:border-[#BFA76A]/50 transition-all flex items-center gap-2">
            <FiShare2 size={16} />
            <span className="hidden sm:inline">Partager</span>
          </button>
          <button className="px-4 py-2 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-all flex items-center gap-2">
            <FiDownload size={16} />
            <span className="hidden sm:inline">Exporter</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {demoStats.map((stat, idx) => (
          <div key={idx} className="bg-[#111] border border-white/10 rounded-lg p-6">
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change} vs dernier mois
            </p>
          </div>
        ))}
      </div>

      {/* Report Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all whitespace-nowrap ${
                activeReport === report.id
                  ? 'bg-[#BFA76A] text-black border-[#BFA76A]'
                  : 'bg-[#111] text-white border-white/10 hover:border-[#BFA76A]/50'
              }`}
            >
              <Icon size={20} />
              <div className="text-left">
                <p className="font-bold text-sm">{report.name}</p>
                <p className={`text-xs ${activeReport === report.id ? 'text-black/70' : 'text-gray-400'}`}>
                  {report.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Power BI Embed Container */}
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 p-4' : ''}`}>
        <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              {activeReportData && (
                <>
                  <div className={`w-8 h-8 rounded-lg bg-${activeReportData.color}-500/20 flex items-center justify-center`}>
                    <activeReportData.icon className={`text-${activeReportData.color}-400`} size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{activeReportData.name}</h3>
                    <p className="text-xs text-gray-400">{activeReportData.description}</p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              title={isFullscreen ? 'Quitter plein écran' : 'Plein écran'}
            >
              <FiMaximize2 className="text-white" size={16} />
            </button>
          </div>

          {/* Embedded Report Area (Demo) */}
          <div className="relative bg-[#0A0A0A]" style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '600px' }}>
            {/* Demo Dashboard Preview */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#BFA76A]/20 flex items-center justify-center mx-auto mb-4">
                  <FiBarChart2 className="text-[#BFA76A]" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Dashboard Power BI Démo</h3>
                <p className="text-gray-400 max-w-md">
                  En environnement de production, ce conteneur affichera vos dashboards Power BI interactifs en temps réel.
                </p>
              </div>

              {/* Demo Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-[#111] border border-white/10 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <FiBarChart2 className="text-blue-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Visualisations Interactives</h4>
                  <p className="text-sm text-gray-400">Graphiques dynamiques avec drill-down et filtres cross-report</p>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                    <FiRefreshCw className="text-green-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Données Temps Réel</h4>
                  <p className="text-sm text-gray-400">Rafraîchissement automatique toutes les heures depuis vos sources</p>
                </div>

                <div className="bg-[#111] border border-white/10 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                    <FiShare2 className="text-purple-400" size={24} />
                  </div>
                  <h4 className="font-bold text-white mb-2">Collaboration</h4>
                  <p className="text-sm text-gray-400">Partagez vos rapports avec votre équipe et stakeholders</p>
                </div>
              </div>

              {/* Integration Instructions */}
              <div className="mt-8 max-w-2xl">
                <div className="bg-gradient-to-r from-[#BFA76A]/10 to-purple-500/10 border border-[#BFA76A]/30 rounded-lg p-6">
                  <h4 className="font-bold text-white mb-3">💡 Configuration Power BI</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>Pour intégrer vos vrais dashboards :</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-400">
                      <li>Publiez votre rapport sur Power BI Service</li>
                      <li>Obtenez l'URL d'intégration (File → Embed → Website or portal)</li>
                      <li>Configurez l'authentification (Azure AD ou Embed token)</li>
                      <li>Remplacez l'URL dans le composant PowerBIDemoPage</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Demo Data Notice */}
              {user?.isDemo && (
                <div className="mt-6 px-4 py-3 bg-[#BFA76A]/20 border border-[#BFA76A]/50 rounded-lg">
                  <p className="text-sm text-[#BFA76A] font-medium text-center">
                    🎯 Mode Démo : Données simulées pour présentation client
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h3 className="font-bold text-white mb-3">📈 Dashboards Disponibles</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Dashboard Exécutif (Vue globale)</li>
            <li>• Portefeuille Projets (Multi-projets)</li>
            <li>• Suivi Financier (Budgets & ROI)</li>
            <li>• Performance & KPIs (Métriques)</li>
            <li>• Gestion Risques (Heat maps)</li>
            <li>• Vélocité Agile (Sprints & Burndown)</li>
          </ul>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h3 className="font-bold text-white mb-3">🔌 Connecteurs Actifs</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Azure SQL Database</li>
            <li>• SharePoint Online</li>
            <li>• Excel / CSV Files</li>
            <li>• REST API</li>
            <li>• Azure DevOps</li>
            <li>• Power Platform Dataflows</li>
          </ul>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <h3 className="font-bold text-white mb-3">⚙️ Fonctionnalités</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Actualisation temps réel</li>
            <li>• Drill-down interactif</li>
            <li>• Export PDF / Excel</li>
            <li>• Filtres cross-report</li>
            <li>• Alertes automatiques</li>
            <li>• Row-Level Security (RLS)</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#BFA76A]/20 to-purple-500/20 border border-[#BFA76A]/50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Prêt à piloter vos projets avec Power BI ?</h3>
        <p className="text-gray-300 mb-6">
          Connectez vos données et créez des dashboards sur mesure pour votre organisation
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-[#BFA76A] hover:bg-[#D4AF37] text-black font-bold rounded-lg transition-all">
            Configurer Power BI
          </button>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg transition-all">
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default PowerBIDemoPage;
