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
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extralight text-white tracking-tight">Integrations</h1>
        <p className="text-sm text-white/50 font-light tracking-[0.02em]">
          Connect Powalyze to your strategic tools for seamless Swiss precision management.
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
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 border border-white/10 rounded-[2px] flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-all duration-500">
                  <Icon className="w-6 h-6 text-white/60 group-hover:text-[#D4AF37] transition-colors duration-500" />
                </div>
                {isConnected && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-400/10 border border-green-400/20 rounded-[2px]">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[9px] font-light text-green-400 uppercase tracking-[0.2em]">Connected</span>
                  </div>
                )}
                {isSoon && (
                  <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-[2px]">
                    <span className="text-[9px] font-light text-white/30 uppercase tracking-[0.2em]">Soon</span>
                  </div>
                )}
              </div>

              {/* Titre et description */}
              <h3 className="text-xl font-light text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                {integration.title}
              </h3>
              <p className="text-sm text-white/50 mb-3 font-light">
                {integration.description}
              </p>
              <p className="text-xs text-white/30 leading-relaxed font-light tracking-[0.05em]">
                {integration.details}
              </p>
            </>
          );

          return (
            <div key={integration.id} className="group">
              {integration.href ? (
                <Link
                  to={integration.href}
                  className="block relative p-8 rounded-[2px] bg-black/40 backdrop-blur-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2px]" />
                  <div className="relative">{CardContent}</div>
                </Link>
              ) : (
                <div className="relative p-8 rounded-[2px] bg-black/20 backdrop-blur-xl border border-white/5 opacity-50 cursor-not-allowed">
                  {CardContent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Integrations */}
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-light text-white tracking-tight">Additional Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Microsoft Teams', icon: '💬', desc: 'Real-time notifications & collaboration' },
            { name: 'Azure DevOps', icon: '⚙️', desc: 'DevOps pipelines & work items sync' },
            { name: 'Google Workspace', icon: '📧', desc: 'Calendar, Drive & Sheets integration' },
            { name: 'HubSpot', icon: '🎯', desc: 'CRM & Marketing automation' },
            { name: 'Notion', icon: '📝', desc: 'Knowledge base & documentation' }
          ].map(int => (
            <button
              key={int.name}
              onClick={() => alert(`Connecting to ${int.name}...\n\nIn production, this will open OAuth flow for secure authentication.`)}
              className="p-6 rounded-[2px] bg-black/40 backdrop-blur-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 text-left group"
            >
              <div className="text-3xl mb-3">{int.icon}</div>
              <h3 className="text-sm font-light text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{int.name}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{int.desc}</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-[#D4AF37] font-light tracking-[0.1em] uppercase">→ Connect</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
