import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, FolderKanban, MessageSquare, FileText } from 'lucide-react';

/**
 * Page Intégrations - Version corrigée et simplifiée
 * Navigation propre, pas de redirection accueil, cartes cliquables
 */
const Integrations = () => {
  const integrations = [
    {
      id: 'powerbi',
      title: 'Power BI',
      description: 'Analyse & Intelligence Décisionnelle',
      details: 'Rapports dynamiques • Filtrage par client/projet • Sécurité RLS • Embedded Premium',
      icon: TrendingUp,
      status: 'connected',
      href: '/app/reports',
      gradient: 'from-[#D4AF37] to-[#B8924A]'
    },
    {
      id: 'reports',
      title: 'Rapports dynamiques',
      description: 'Visualisations Power BI intégrées',
      details: 'Tableaux de bord temps réel • Analyses financières • Prédictions IA',
      icon: TrendingUp,
      status: 'connected',
      href: '/app/reports',
      gradient: 'from-[#4A9EFF] to-[#0052cc]'
    },
    {
      id: 'salesforce',
      title: 'Salesforce',
      description: 'CRM & Pipeline',
      details: 'Import automatique • Synchronisation bidirectionnelle',
      icon: Users,
      status: 'soon',
      href: null,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'jira',
      title: 'Jira',
      description: 'Gestion de projets',
      details: 'Synchronisation des issues • Mapping automatique',
      icon: FolderKanban,
      status: 'soon',
      href: null,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'slack',
      title: 'Slack',
      description: 'Communication & Alertes',
      details: 'Notifications temps réel • Alertes risques',
      icon: MessageSquare,
      status: 'soon',
      href: null,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'sharepoint',
      title: 'SharePoint',
      description: 'Documents & Collaboration',
      details: 'Gestion documentaire • Gouvernance',
      icon: FileText,
      status: 'soon',
      href: null,
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Intégrations professionnelles</h1>
        <p className="text-slate-400">
          Connectez Powalyze à vos outils stratégiques pour un pilotage fluide et intelligent.
        </p>
      </div>

      {/* Grid des intégrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConnected = integration.status === 'connected';
          const isSoon = integration.status === 'soon';

          const CardContent = (
            <>
              {/* Header de la carte */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${integration.gradient}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {isConnected && (
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    Connecté
                  </span>
                )}
                {isSoon && (
                  <span className="px-3 py-1 bg-slate-500/10 text-slate-400 text-xs font-semibold rounded-full border border-slate-500/20">
                    Bientôt
                  </span>
                )}
              </div>

              {/* Titre et description */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {integration.title}
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                {integration.description}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {integration.details}
              </p>
            </>
          );

          return (
            <div key={integration.id}>
              {integration.href ? (
                <Link
                  to={integration.href}
                  className="block p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#4A9EFF] transition-all duration-200 hover:shadow-lg hover:shadow-[#4A9EFF]/10"
                >
                  {CardContent}
                </Link>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 opacity-60">
                  {CardContent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#4A9EFF]/10 to-[#D4AF37]/10 border border-[#4A9EFF]/20">
        <h3 className="text-lg font-semibold text-white mb-2">
          🚀 Nouvelles intégrations à venir
        </h3>
        <p className="text-slate-400 text-sm">
          Microsoft Teams • Azure DevOps • Google Workspace • HubSpot • Notion
        </p>
      </div>
    </div>
  );
};

export default Integrations;
