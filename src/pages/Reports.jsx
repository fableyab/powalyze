import React, { useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { 
  TrendingUp, FileText, Filter, Eye, BarChart3, PieChart, Shield, DollarSign, Target, Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Page Rapports avec Power BI Embedded
 * Adaptation React Router + Vite (pas Next.js)
 */
const Reports = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Configuration Power BI depuis variables d'environnement Vite
  const powerBiConfig = {
    type: 'report',
    embedUrl: import.meta.env.VITE_POWERBI_EMBED_URL || '',
    accessToken: import.meta.env.VITE_POWERBI_ACCESS_TOKEN || '',
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: { expanded: false, visible: true },
        pageNavigation: { visible: true }
      },
      background: models.BackgroundType.Transparent,
    }
  };

  const categories = [
    { id: 'all', name: 'Tous les rapports', icon: FileText, color: 'slate' },
    { id: 'financial', name: 'Financiers', icon: DollarSign, color: 'emerald' },
    { id: 'strategic', name: 'Stratégiques', icon: Target, color: 'blue' },
    { id: 'risk', name: 'Risques', icon: Shield, color: 'red' },
    { id: 'operational', name: 'Opérationnels', icon: TrendingUp, color: 'amber' },
    { id: 'predictive', name: 'Prédictifs', icon: Brain, color: 'purple' }
  ];

  const reports = [
    {
      id: 'cockpit-exec',
      title: 'Cockpit Exécutif',
      category: 'strategic',
      description: 'Vue stratégique complète • KPIs essentiels • Budgets',
      powerBiReportId: 'executive-dashboard',
      icon: Target
    },
    {
      id: 'portfolio-fin',
      title: 'Portfolio Financier',
      category: 'financial',
      description: 'Analyse financière • ROI • Coûts vs Budgets',
      powerBiReportId: 'financial-portfolio',
      icon: DollarSign
    },
    {
      id: 'risk-matrix',
      title: 'Matrice des Risques',
      category: 'risk',
      description: 'Cartographie des risques • Scoring • Priorités',
      powerBiReportId: 'risk-analysis',
      icon: Shield
    },
    {
      id: 'performance',
      title: 'Performance Opérationnelle',
      category: 'operational',
      description: 'Efficacité des projets • Délais • Ressources',
      powerBiReportId: 'operational-performance',
      icon: TrendingUp
    },
    {
      id: 'predictive',
      title: 'Prédictions IA',
      category: 'predictive',
      description: 'Forecasting budgets • Prédiction risques • Tendances',
      powerBiReportId: 'ai-predictions',
      icon: Brain
    }
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(r => r.category === selectedCategory);

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Rapports & Analytics</h1>
          <p className="text-slate-400">
            Intelligence décisionnelle avec Power BI Premium Embedded
          </p>
        </div>
        <Badge className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
          <TrendingUp className="w-4 h-4 mr-2" />
          Power BI
        </Badge>
      </div>

      {/* Filtres catégories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#4A9EFF] text-white shadow-lg shadow-[#4A9EFF]/20'
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:border-[#4A9EFF] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Zone principale */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des rapports (sidebar gauche) */}
        <div className="lg:col-span-1 space-y-3">
          {filteredReports.map((report) => {
            const Icon = report.icon;
            const isSelected = selectedReport?.id === report.id;
            return (
              <button
                key={report.id}
                onClick={() => handleReportClick(report)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#4A9EFF] to-[#0052cc] text-white shadow-lg'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-[#4A9EFF] text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
                    <p className={`text-xs ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {report.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Zone d'affichage Power BI (zone principale) */}
        <div className="lg:col-span-3">
          {selectedReport ? (
            <div className="space-y-4">
              {/* Header du rapport sélectionné */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-[#4A9EFF]/10 to-[#D4AF37]/10 border border-[#4A9EFF]/20">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedReport.title}</h2>
                <p className="text-slate-400">{selectedReport.description}</p>
              </div>

              {/* Power BI Embed */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                {powerBiConfig.embedUrl && powerBiConfig.accessToken ? (
                  <PowerBIEmbed
                    embedConfig={{
                      ...powerBiConfig,
                      id: selectedReport.powerBiReportId
                    }}
                    eventHandlers={
                      new Map([
                        ['loaded', () => console.log('Report loaded')],
                        ['rendered', () => console.log('Report rendered')],
                        ['error', (event) => console.error('Report error:', event.detail)]
                      ])
                    }
                    cssClassName="powerbi-report-container"
                    getEmbeddedComponent={(embeddedReport) => {
                      window.report = embeddedReport;
                    }}
                  />
                ) : (
                  <div className="h-[600px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <BarChart3 className="w-16 h-16 text-slate-600 mx-auto" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Configuration Power BI requise
                        </h3>
                        <p className="text-slate-400 text-sm max-w-md">
                          Veuillez configurer les variables d'environnement Power BI dans votre fichier .env :
                        </p>
                        <code className="block mt-4 p-4 bg-slate-900 rounded-lg text-left text-xs text-slate-300">
                          VITE_POWERBI_EMBED_URL=...<br />
                          VITE_POWERBI_ACCESS_TOKEN=...
                        </code>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions rapides */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Plein écran
                </Button>
                <Button variant="outline" className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
          ) : (
            // État initial : aucun rapport sélectionné
            <div className="h-[600px] rounded-xl border-2 border-dashed border-slate-800 flex items-center justify-center">
              <div className="text-center space-y-4">
                <PieChart className="w-16 h-16 text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sélectionnez un rapport
                  </h3>
                  <p className="text-slate-400">
                    Choisissez un rapport dans la liste pour afficher l'analyse Power BI
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info RLS (Row Level Security) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Sécurité RLS activée
            </h3>
            <p className="text-slate-400 text-sm">
              Les rapports Power BI sont filtrés automatiquement selon votre client et vos projets.
              Vous ne voyez que les données auxquelles vous avez accès.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
