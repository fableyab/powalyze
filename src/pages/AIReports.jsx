/**
 * PAGE AI REPORTS
 * Génération automatique de rapports IA
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function AIReports() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [reportType, setReportType] = useState('weekly');
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { id: 'weekly', name: 'Rapport hebdomadaire', desc: 'Synthèse activités de la semaine' },
    { id: 'monthly', name: 'Rapport mensuel', desc: 'Bilan complet du mois' },
    { id: 'quarterly', name: 'Rapport trimestriel', desc: 'Vue stratégique du trimestre' },
    { id: 'custom', name: 'Rapport personnalisé', desc: 'Généré selon vos critères' }
  ];

  const generateReport = async () => {
    setGenerating(true);
    // TODO: Intégrer API backend génération IA
    setTimeout(() => {
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Rapports <span className="text-[#D4AF37]">IA</span>
          </h1>
          <p className="text-gray-400 font-light">
            Génération automatique de rapports intelligents
          </p>
        </div>

        {/* Sélection type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`
                p-6 rounded-xl border transition-all text-left
                ${reportType === type.id
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className={`h-6 w-6 ${reportType === type.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                {reportType === type.id && (
                  <span className="px-2 py-0.5 bg-[#D4AF37] text-black rounded-full text-xs">
                    Sélectionné
                  </span>
                )}
              </div>
              <h3 className="text-white font-light mb-1">{type.name}</h3>
              <p className="text-sm text-gray-400">{type.desc}</p>
            </button>
          ))}
        </div>

        {/* Configuration */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#D4AF37]" />
            Configuration du rapport
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Période</label>
              <select className="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white">
                <option>Dernière semaine</option>
                <option>Dernier mois</option>
                <option>Dernier trimestre</option>
                <option>Personnalisé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Sections à inclure</label>
              <div className="space-y-2">
                {['Vue d\'ensemble', 'KPIs', 'Risques', 'Budget', 'Roadmap', 'Recommandations'].map((section) => (
                  <label key={section} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-800"
                    />
                    <span className="text-white font-light">{section}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Format</label>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-black border border-[#D4AF37] text-[#D4AF37] rounded-lg text-sm">
                  PDF
                </button>
                <button className="px-4 py-2 bg-black border border-gray-800 text-white rounded-lg text-sm hover:border-gray-700">
                  Word
                </button>
                <button className="px-4 py-2 bg-black border border-gray-800 text-white rounded-lg text-sm hover:border-gray-700">
                  PowerPoint
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Génération */}
        <div className="flex gap-4">
          <button
            onClick={generateReport}
            disabled={generating}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {generating ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Générer le rapport IA
              </>
            )}
          </button>
        </div>

        {/* Historique */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-light mb-4">Rapports générés récemment</h2>
          <div className="space-y-3">
            {[
              { name: 'Rapport hebdomadaire - Semaine 12', date: '2024-03-22', size: '2.4 MB' },
              { name: 'Rapport mensuel - Mars 2024', date: '2024-03-01', size: '5.8 MB' },
              { name: 'Rapport trimestriel - Q1 2024', date: '2024-01-01', size: '12.3 MB' }
            ].map((report, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#D4AF37]" />
                  <div>
                    <p className="text-white font-light">{report.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(report.date).toLocaleDateString('fr-FR')}
                      <span className="ml-2">{report.size}</span>
                    </p>
                  </div>
                </div>
                <button className="px-3 py-1 border border-gray-800 text-white font-light rounded-lg hover:border-[#D4AF37]/30 transition-colors flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
