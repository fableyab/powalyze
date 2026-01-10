import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, FileText } from 'lucide-react';
import { powerbiReports } from '@/data/powerbiReports';

/**
 * 📊 Page d'accueil des rapports Power BI
 * Liste tous les rapports disponibles avec navigation
 */
const PowerBIReports = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case '📊': return <BarChart3 className="w-6 h-6" />;
      case '📈': return <TrendingUp className="w-6 h-6" />;
      case '👥': return <Users className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'stratégique': return 'bg-purple-500/20 text-purple-400';
      case 'opérationnel': return 'bg-blue-500/20 text-blue-400';
      case 'ressources': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Rapports Power BI</h1>
        <p className="text-slate-400 mt-2">
          Explorez vos données avec des rapports interactifs et sécurisés
        </p>
      </div>

      {/* Grid des rapports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {powerbiReports.map((report) => (
          <Link
            key={report.id}
            to={`/app/reports/${report.id}`}
            className="group p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-[#4A9EFF]/50 transition-all"
          >
            {/* Icon + Category */}
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#4A9EFF]/20 text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-white transition-colors">
                {getIcon(report.icon)}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                {report.category}
              </span>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#4A9EFF] transition-colors">
                {report.name}
              </h2>
              <p className="text-sm text-slate-400 line-clamp-2">
                {report.description}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Rapport interactif</span>
              <span className="text-[#4A9EFF] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Info banner */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <div className="flex items-start gap-3">
          <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">Rapports sécurisés</h3>
            <p className="text-sm text-slate-400">
              Les tokens d'accès sont générés automatiquement côté serveur. 
              Vos données restent protégées avec une authentification enterprise-grade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBIReports;
