/**
 * PAGE DATA POWER BI
 * Dashboards Power BI intégrés
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function DataPowerBI() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState('portfolio');

  const reports = [
    { id: 'portfolio', name: 'Vue Portfolio', icon: BarChart3, color: 'gold' },
    { id: 'financial', name: 'Analyse Financière', icon: DollarSign, color: 'green' },
    { id: 'pmo', name: 'PMO Dashboard', icon: TrendingUp, color: 'blue' },
    { id: 'resources', name: 'Ressources', icon: Users, color: 'red' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Dashboards <span className="text-[#D4AF37]">Power BI</span>
          </h1>
          <p className="text-gray-400 font-light">
            Visualisations et analyses avancées
          </p>
        </div>

        {/* Sélection rapport */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`
                  p-4 rounded-xl border transition-all text-left
                  ${selectedReport === report.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.02]'
                    : 'border-gray-800 hover:border-gray-700'
                  }
                `}
              >
                <Icon className={`h-6 w-6 mb-2 ${selectedReport === report.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                <h3 className="text-white font-light">{report.name}</h3>
              </button>
            );
          })}
        </div>

        {/* Frame Power BI */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-2 h-[800px]">
          <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 font-light mb-2">
                Rapport Power BI: {reports.find(r => r.id === selectedReport)?.name}
              </p>
              <p className="text-sm text-gray-600">
                Connectez votre compte Power BI pour afficher les dashboards
              </p>
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity">
                Configurer Power BI
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-light mb-4">Configuration Power BI</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
            <li>Créez une application Azure AD avec les permissions Power BI</li>
            <li>Configurez les variables d'environnement backend (PBI_CLIENT_ID, PBI_TENANT_ID, etc.)</li>
            <li>Lancez le serveur backend: <code className="text-[#D4AF37]">cd backend && npm run dev</code></li>
            <li>Les dashboards seront chargés automatiquement depuis votre workspace Power BI</li>
          </ol>
          <p className="text-xs text-gray-500 mt-4">
            Voir <code>/backend/README.md</code> pour les instructions complètes
          </p>
        </div>
      </div>
    </div>
  );
}
