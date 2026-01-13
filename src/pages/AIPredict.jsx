/**
 * PAGE AI PREDICT
 * Analyses prédictives IA
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, Brain, Target, Calendar } from 'lucide-react';
import KPICard from '@/components/KPICard';
import ForecastCurve from '@/components/ForecastCurve';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getForecastData } from '@/lib/portfolioService';

export default function AIPredict() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [forecasts, setForecasts] = useState([]);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    loadPredictions();
  }, [workspaceId]);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      const data = await getForecastData(workspaceId);
      setForecasts(data?.forecasts || []);
      
      // TODO: Intégrer API prédictions IA backend
      setPredictions({
        portfolio_completion: { value: 85, confidence: 92 },
        budget_overrun_risk: { value: 23, confidence: 87 },
        timeline_delay_risk: { value: 15, confidence: 79 },
        success_probability: { value: 78, confidence: 88 }
      });
    } catch (error) {
      console.error('Erreur chargement prédictions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Analyse prédictive en cours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Analyses <span className="text-[#D4AF37]">Prédictives</span>
          </h1>
          <p className="text-gray-400 font-light">
            Prévisions IA basées sur l'historique et les tendances
          </p>
        </div>

        {/* Prédictions clés */}
        {predictions && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <KPICard
              title="Complétion portfolio"
              value={predictions.portfolio_completion.value}
              unit="%"
              icon={Target}
              color="green"
              description={`Confiance: ${predictions.portfolio_completion.confidence}%`}
            />
            <KPICard
              title="Risque dépassement"
              value={predictions.budget_overrun_risk.value}
              unit="%"
              icon={TrendingUp}
              color="red"
              description={`Confiance: ${predictions.budget_overrun_risk.confidence}%`}
            />
            <KPICard
              title="Risque retard"
              value={predictions.timeline_delay_risk.value}
              unit="%"
              icon={Calendar}
              color="gold"
              description={`Confiance: ${predictions.timeline_delay_risk.confidence}%`}
            />
            <KPICard
              title="Probabilité succès"
              value={predictions.success_probability.value}
              unit="%"
              icon={Brain}
              color="blue"
              description={`Confiance: ${predictions.success_probability.confidence}%`}
            />
          </div>
        )}

        {/* Courbe prédictive */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-[#D4AF37]" />
            Prévisions budgétaires
          </h2>
          <ForecastCurve forecasts={forecasts} type="budget" />
        </div>

        {/* Insights IA */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-[#D4AF37]" />
            Insights prédictifs
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-600/10 border border-emerald-600/30 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-light mb-1">Tendance positive</h3>
                  <p className="text-sm text-gray-300">
                    85% des initiatives respectent leurs jalons. Le portefeuille converge vers les objectifs stratégiques.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-light mb-1">Attention: Risque retard</h3>
                  <p className="text-sm text-gray-300">
                    3 initiatives montrent des signes de retard potentiel basé sur l'historique de vélocité.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-[#4A9EFF] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-light mb-1">Recommandation IA</h3>
                  <p className="text-sm text-gray-300">
                    Allouer 15% de budget supplémentaire aux initiatives à fort alignement pour maximiser l'impact stratégique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modèle IA */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-4">Modèle prédictif</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Algorithme</p>
              <p className="text-white font-light">XGBoost Ensemble</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Précision moyenne</p>
              <p className="text-emerald-400 font-light">87.3%</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Dernière mise à jour</p>
              <p className="text-white font-light">Il y a 2 heures</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Données entraînement</p>
              <p className="text-white font-light">156 projets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
