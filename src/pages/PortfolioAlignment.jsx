/**
 * PAGE PORTFOLIO ALIGNEMENT
 * Vue alignement stratégique du portefeuille
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import AlignmentGauge from '@/components/AlignmentGauge';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getStrategicAlignment, getInitiatives } from '@/lib/portfolioService';

export default function PortfolioAlignment() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [alignmentData, setAlignmentData] = useState(null);
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    loadAlignmentData();
  }, [workspaceId]);

  const loadAlignmentData = async () => {
    try {
      setLoading(true);
      const [alignment, allInitiatives] = await Promise.all([
        getStrategicAlignment(workspaceId),
        getInitiatives(workspaceId, {})
      ]);
      setAlignmentData(alignment);
      setInitiatives(allInitiatives || []);
    } catch (error) {
      console.error('Erreur chargement alignement:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement de l'alignement...</div>
      </div>
    );
  }

  const highAlignment = initiatives.filter(i => (i.strategic_alignment || 0) >= 70);
  const mediumAlignment = initiatives.filter(i => (i.strategic_alignment || 0) >= 40 && (i.strategic_alignment || 0) < 70);
  const lowAlignment = initiatives.filter(i => (i.strategic_alignment || 0) < 40);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Alignement <span className="text-[#D4AF37]">Stratégique</span>
          </h1>
          <p className="text-gray-400 font-light">
            Score d'alignement du portefeuille avec la stratégie d'entreprise
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard
            title="Alignement élevé"
            value={highAlignment.length}
            icon={Target}
            color="green"
            description="Score ≥ 70%"
          />
          <KPICard
            title="Alignement moyen"
            value={mediumAlignment.length}
            icon={TrendingUp}
            color="gold"
            description="Score 40-69%"
          />
          <KPICard
            title="Alignement faible"
            value={lowAlignment.length}
            icon={AlertCircle}
            color="red"
            description="Score < 40%"
          />
          <KPICard
            title="Total initiatives"
            value={initiatives.length}
            icon={Target}
            color="blue"
            description="Toutes initiatives"
          />
        </div>

        {/* Jauge globale */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-light mb-8 text-center">Score global d'alignement</h2>
          <div className="flex justify-center">
            <AlignmentGauge
              score={alignmentData?.weighted_average || 0}
              size={300}
            />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center text-sm">
            <div>
              <p className="text-gray-500 mb-1">Distribution élevé</p>
              <p className="text-emerald-400 text-2xl font-light">
                {alignmentData?.distribution?.high || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Distribution moyen</p>
              <p className="text-amber-400 text-2xl font-light">
                {alignmentData?.distribution?.medium || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Distribution faible</p>
              <p className="text-red-400 text-2xl font-light">
                {alignmentData?.distribution?.low || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Top 10 initiatives bien alignées */}
        {highAlignment.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4">
              Top <span className="text-[#D4AF37]">{Math.min(10, highAlignment.length)}</span> initiatives alignées
            </h2>
            <div className="space-y-3">
              {highAlignment
                .sort((a, b) => (b.strategic_alignment || 0) - (a.strategic_alignment || 0))
                .slice(0, 10)
                .map((initiative, index) => (
                  <div
                    key={initiative.id}
                    className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4 hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-light text-[#D4AF37]">#{index + 1}</span>
                          <h3 className="text-white font-light">{initiative.name}</h3>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-600/20 text-emerald-400">
                            {initiative.strategic_alignment}%
                          </span>
                        </div>
                        {initiative.description && (
                          <p className="text-sm text-gray-400 font-light">
                            {initiative.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-4">
                        <AlignmentGauge
                          score={initiative.strategic_alignment || 0}
                          size={80}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Initiatives faiblement alignées (à revoir) */}
        {lowAlignment.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4">
              Initiatives à <span className="text-red-400">réaligner</span>
            </h2>
            <div className="space-y-3">
              {lowAlignment
                .sort((a, b) => (a.strategic_alignment || 0) - (b.strategic_alignment || 0))
                .slice(0, 5)
                .map((initiative, index) => (
                  <div
                    key={initiative.id}
                    className="bg-[#0A1A2F] border border-red-600/30 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <h3 className="text-white font-light">{initiative.name}</h3>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-red-600/20 text-red-400">
                            {initiative.strategic_alignment || 0}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 font-light">
                          Cette initiative nécessite une revue de son alignement stratégique
                        </p>
                      </div>
                      <div className="ml-4">
                        <AlignmentGauge
                          score={initiative.strategic_alignment || 0}
                          size={80}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {initiatives.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Target className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucune initiative trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
