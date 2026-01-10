import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FolderKanban, Users } from 'lucide-react';
import { reports, areReportsConfigured } from '@/lib/powerbi-reports';

/**
 * Page d'accueil des rapports Power BI
 * Liste tous les rapports disponibles
 */
const ReportsHome = () => {
  const configured = areReportsConfigured();

  const icons = {
    portfolio: TrendingUp,
    projects: FolderKanban,
    capacity: Users,
  };

  if (!configured) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Configuration Power BI requise</h1>
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-slate-300 mb-4">
            Veuillez configurer les variables d'environnement Power BI dans votre fichier <code className="px-2 py-1 bg-slate-800 rounded text-[#4A9EFF]">.env.local</code>.
          </p>
          <pre className="bg-slate-950 p-4 rounded-lg text-xs text-slate-400 overflow-x-auto">
{`VITE_POWERBI_ACCESS_TOKEN=eyJ0eXAiOiJKV1Qi...
VITE_POWERBI_REPORT_PORTFOLIO_ID=xxx-xxx-xxx
VITE_POWERBI_REPORT_PORTFOLIO_URL=https://...
VITE_POWERBI_REPORT_PROJECTS_ID=xxx-xxx-xxx
VITE_POWERBI_REPORT_PROJECTS_URL=https://...
VITE_POWERBI_REPORT_CAPACITY_ID=xxx-xxx-xxx
VITE_POWERBI_REPORT_CAPACITY_URL=https://...`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Rapports Power BI</h1>
        <p className="text-slate-400">
          Sélectionnez un rapport pour l'afficher en plein écran.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = icons[report.id] || TrendingUp;
          
          return (
            <Link
              key={report.id}
              to={`/app/reports/${report.id}`}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#4A9EFF] transition-all duration-200 hover:shadow-lg hover:shadow-[#4A9EFF]/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#4A9EFF] to-[#0052cc] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-[#4A9EFF] transition-colors">
                    {report.name}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {report.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#4A9EFF]/10 to-[#D4AF37]/10 border border-[#4A9EFF]/20">
        <h3 className="text-lg font-semibold text-white mb-2">
          🔒 Sécurité RLS activée
        </h3>
        <p className="text-slate-400 text-sm">
          Les rapports sont filtrés automatiquement selon votre client et vos projets.
        </p>
      </div>
    </div>
  );
};

export default ReportsHome;
