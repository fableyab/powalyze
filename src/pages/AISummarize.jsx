/**
 * PAGE AI SUMMARIZE
 * Résumés automatiques documents et projets
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Sparkles, Download } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getInitiatives } from '@/lib/portfolioService';

export default function AISummarize() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [initiatives, setInitiatives] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [summary, setSummary] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadInitiatives();
  }, [workspaceId]);

  const loadInitiatives = async () => {
    try {
      setLoading(true);
      const data = await getInitiatives(workspaceId, {});
      setInitiatives(data || []);
    } catch (error) {
      console.error('Erreur chargement initiatives:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (initiative) => {
    setSelectedInitiative(initiative);
    setGenerating(true);

    // TODO: Intégrer API IA backend pour génération résumé
    setTimeout(() => {
      setSummary({
        executive: `Synthèse du projet "${initiative.name}": objectifs atteints à 75%, budget respecté, risques modérés identifiés.`,
        keyPoints: [
          'Avancement conforme au planning',
          '3 jalons majeurs franchis ce mois',
          'Budget consommé: 65% pour 70% d\'avancement'
        ],
        risks: ['Dépendance critique sur équipe externe', 'Risque technique sur intégration API'],
        recommendations: ['Accélérer phase de test', 'Renforcer équipe technique']
      });
      setGenerating(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Résumés <span className="text-[#D4AF37]">Automatiques</span>
          </h1>
          <p className="text-gray-400 font-light">
            Génération IA de synthèses exécutives
          </p>
        </div>

        {/* Liste initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initiatives.slice(0, 10).map((initiative) => (
            <button
              key={initiative.id}
              onClick={() => generateSummary(initiative)}
              disabled={generating}
              className="p-4 bg-[#0A1A2F] border border-gray-800 rounded-xl hover:border-[#D4AF37]/30 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-light mb-1">{initiative.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{initiative.description}</p>
                </div>
                <Sparkles className="h-5 w-5 text-[#D4AF37] flex-shrink-0 ml-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Résumé généré */}
        {summary && selectedInitiative && (
          <div className="bg-[#0A1A2F] border border-[#D4AF37] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#D4AF37]" />
                Résumé: {selectedInitiative.name}
              </h2>
              <button className="px-4 py-2 border border-gray-800 text-white font-light rounded-lg hover:border-[#D4AF37]/30 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Synthèse exécutive</h3>
                <p className="text-gray-300 leading-relaxed">{summary.executive}</p>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Points clés</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {summary.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Risques identifiés</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {summary.risks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Recommandations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {summary.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {generating && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Sparkles className="h-12 w-12 text-[#D4AF37] mb-4 animate-pulse" />
            <p className="text-gray-500 font-light">Génération du résumé en cours...</p>
          </div>
        )}

        {!summary && !generating && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <FileText className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Sélectionnez une initiative pour générer un résumé</p>
          </div>
        )}
      </div>
    </div>
  );
}
