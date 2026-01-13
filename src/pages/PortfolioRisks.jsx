/**
 * PAGE PORTFOLIO RISQUES
 * Vue matrice des risques + top risques critiques
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import RiskMatrix from '@/components/RiskMatrix';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getRiskMatrix } from '@/lib/portfolioService';

export default function PortfolioRisks() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [riskData, setRiskData] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  useEffect(() => {
    loadRiskData();
  }, [workspaceId]);

  const loadRiskData = async () => {
    try {
      setLoading(true);
      const data = await getRiskMatrix(workspaceId);
      setRiskData(data);
    } catch (error) {
      console.error('Erreur chargement risques:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement des risques...</div>
      </div>
    );
  }

  const criticalRisks = riskData?.risks?.filter(r => r.score >= 6) || [];
  const moderateRisks = riskData?.risks?.filter(r => r.score >= 3 && r.score < 6) || [];
  const lowRisks = riskData?.risks?.filter(r => r.score < 3) || [];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Cartographie des <span className="text-[#D4AF37]">Risques</span>
          </h1>
          <p className="text-gray-400 font-light">
            Vue matrice et priorisation des risques du portefeuille
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard
            title="Risques critiques"
            value={criticalRisks.length}
            icon={AlertTriangle}
            color="red"
            description="Score ≥ 6"
          />
          <KPICard
            title="Risques modérés"
            value={moderateRisks.length}
            icon={Shield}
            color="gold"
            description="Score 3-5"
          />
          <KPICard
            title="Risques faibles"
            value={lowRisks.length}
            icon={TrendingUp}
            color="green"
            description="Score < 3"
          />
          <KPICard
            title="Total risques"
            value={riskData?.risks?.length || 0}
            icon={AlertTriangle}
            color="blue"
            description="Tous statuts"
          />
        </div>

        {/* Matrice risques */}
        <div>
          <h2 className="text-2xl font-light mb-4">Matrice Probabilité × Impact</h2>
          <RiskMatrix
            risks={riskData?.risks || []}
            onRiskClick={setSelectedRisk}
          />
        </div>

        {/* Top 10 risques critiques */}
        {criticalRisks.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4">
              Top <span className="text-[#D4AF37]">{Math.min(10, criticalRisks.length)}</span> risques critiques
            </h2>
            <div className="space-y-3">
              {criticalRisks.slice(0, 10).map((risk, index) => (
                <div
                  key={risk.id}
                  className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4 hover:border-[#D4AF37]/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedRisk(risk)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-light text-[#D4AF37]">#{index + 1}</span>
                        <h3 className="text-white font-light">{risk.risk_name}</h3>
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs
                          ${risk.score >= 6 ? 'bg-red-600/20 text-red-400' : 'bg-amber-600/20 text-amber-400'}
                        `}>
                          Score: {risk.score}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-light mb-2">
                        Initiative: <span className="text-gray-300">{risk.initiative_name}</span>
                      </p>
                      {risk.mitigation && (
                        <p className="text-xs text-gray-500 font-light">
                          Mitigation: {risk.mitigation}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 text-xs text-gray-400">
                      <div>Probabilité: <span className="text-white">{risk.probability}/3</span></div>
                      <div>Impact: <span className="text-white">{risk.impact}/3</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {(!riskData?.risks || riskData.risks.length === 0) && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <AlertTriangle className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucun risque identifié</p>
          </div>
        )}
      </div>
    </div>
  );
}
