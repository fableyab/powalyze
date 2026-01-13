/**
 * PAGE PROJECT REPORT
 * Génération automatisée de rapports projet
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, Calendar, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getPortfolioOverview } from '@/lib/portfolioService';

export default function ProjectReport() {
  const { workspaceId, initiativeId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [reportType, setReportType] = useState('executive'); // executive, detailed, financial

  useEffect(() => {
    loadReportData();
  }, [workspaceId, initiativeId]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioOverview(workspaceId);
      setReportData(data);
    } catch (error) {
      console.error('Erreur chargement rapport:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    // TODO: Intégrer génération PDF/Word via backend
    console.log('Génération rapport:', reportType);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Rapports <span className="text-[#D4AF37]">Automatisés</span>
          </h1>
          <p className="text-gray-400 font-light">
            Génération de rapports exécutifs et détaillés
          </p>
        </div>

        {/* Sélection type de rapport */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-light mb-4">Type de rapport</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setReportType('executive')}
              className={`
                p-4 rounded-lg border transition-colors text-left
                ${reportType === 'executive'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}
            >
              <FileText className="h-6 w-6 text-[#D4AF37] mb-2" />
              <h3 className="text-white font-light mb-1">Rapport exécutif</h3>
              <p className="text-sm text-gray-400">Synthèse COMEX (2-3 pages)</p>
            </button>

            <button
              onClick={() => setReportType('detailed')}
              className={`
                p-4 rounded-lg border transition-colors text-left
                ${reportType === 'detailed'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}
            >
              <FileText className="h-6 w-6 text-[#4A9EFF] mb-2" />
              <h3 className="text-white font-light mb-1">Rapport détaillé</h3>
              <p className="text-sm text-gray-400">Analyse complète (10+ pages)</p>
            </button>

            <button
              onClick={() => setReportType('financial')}
              className={`
                p-4 rounded-lg border transition-colors text-left
                ${reportType === 'financial'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}
            >
              <DollarSign className="h-6 w-6 text-emerald-400 mb-2" />
              <h3 className="text-white font-light mb-1">Rapport financier</h3>
              <p className="text-sm text-gray-400">Focus budget et prévisions</p>
            </button>
          </div>
        </div>

        {/* Preview KPIs */}
        {reportData && (
          <div>
            <h2 className="text-2xl font-light mb-4">Données du rapport</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <KPICard
                title="Initiatives actives"
                value={reportData.active_count || 0}
                icon={TrendingUp}
                color="blue"
                description="En cours"
              />
              <KPICard
                title="Budget total"
                value={reportData.total_budget || 0}
                unit="€"
                icon={DollarSign}
                color="gold"
                description="Portefeuille"
              />
              <KPICard
                title="Risques critiques"
                value={reportData.critical_risks || 0}
                icon={AlertTriangle}
                color="red"
                description="Score ≥ 6"
              />
              <KPICard
                title="Alignement moyen"
                value={reportData.avg_alignment || 0}
                unit="%"
                icon={TrendingUp}
                color="green"
                description="Stratégie"
              />
            </div>
          </div>
        )}

        {/* Contenu du rapport */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light">Aperçu du rapport</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Contenu selon type */}
          {reportType === 'executive' && (
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Synthèse exécutive</h3>
                <p className="text-gray-400 leading-relaxed">
                  Le portefeuille compte actuellement {reportData?.active_count || 0} initiatives actives
                  pour un budget total de {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    notation: 'compact'
                  }).format(reportData?.total_budget || 0)}.
                  L'alignement stratégique moyen est de {reportData?.avg_alignment || 0}%.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Points d'attention</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>{reportData?.critical_risks || 0} risques critiques identifiés</li>
                  <li>Prévision budgétaire en cours de mise à jour</li>
                  <li>Revue mensuelle planifiée</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Recommandations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Prioriser les initiatives à fort alignement stratégique</li>
                  <li>Mettre en place des plans de mitigation pour les risques critiques</li>
                  <li>Optimiser l'allocation budgétaire selon scénarios IA</li>
                </ul>
              </section>
            </div>
          )}

          {reportType === 'detailed' && (
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">1. Vue d'ensemble</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Analyse détaillée du portefeuille d'initiatives avec KPIs, risques, et prévisions.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-black/30 rounded">
                    <p className="text-gray-500 mb-1">Total initiatives</p>
                    <p className="text-white text-lg">{reportData?.active_count || 0}</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded">
                    <p className="text-gray-500 mb-1">Budget engagé</p>
                    <p className="text-white text-lg">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        notation: 'compact'
                      }).format(reportData?.total_budget || 0)}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">2. Analyse des risques</h3>
                <p className="text-gray-400">Matrice complète des risques et plans de mitigation...</p>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">3. Prévisions financières</h3>
                <p className="text-gray-400">Courbes d'atterrissage et écarts budgétaires...</p>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">4. Roadmap et jalons</h3>
                <p className="text-gray-400">Planning détaillé et dépendances critiques...</p>
              </section>
            </div>
          )}

          {reportType === 'financial' && (
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Budget consolidé</h3>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-black/30 rounded">
                    <p className="text-gray-500 mb-1">Budget initial</p>
                    <p className="text-white text-lg">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                        notation: 'compact'
                      }).format(reportData?.total_budget || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-black/30 rounded">
                    <p className="text-gray-500 mb-1">Prévision atterrissage</p>
                    <p className="text-white text-lg">N/A</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded">
                    <p className="text-gray-500 mb-1">Écart</p>
                    <p className="text-emerald-400 text-lg">+0%</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Répartition par initiative</h3>
                <p className="text-gray-400">Détail budget et dépenses par projet...</p>
              </section>

              <section>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Recommandations budgétaires</h3>
                <p className="text-gray-400">Optimisations et scénarios d'arbitrage...</p>
              </section>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={generateReport}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Générer le rapport (PDF)
          </button>
          <button className="px-6 py-3 border border-gray-800 text-white font-light rounded-lg hover:border-[#D4AF37]/30 transition-colors">
            Planifier l'envoi
          </button>
        </div>
      </div>
    </div>
  );
}
