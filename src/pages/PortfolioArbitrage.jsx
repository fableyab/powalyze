/**
 * PAGE PORTFOLIO ARBITRAGE
 * Scénarios IA pour optimiser le portefeuille
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, Lightbulb, Zap } from 'lucide-react';
import ScenarioPanel from '@/components/ScenarioPanel';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { generateArbitrageScenarios } from '@/lib/portfolioService';

export default function PortfolioArbitrage() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [options, setOptions] = useState({
    min_alignment: 70,
    max_risk: 5,
    max_budget_increase: 0.15
  });

  useEffect(() => {
    loadScenarios();
  }, [workspaceId, options]);

  const loadScenarios = async () => {
    try {
      setLoading(true);
      const data = await generateArbitrageScenarios(workspaceId, options);
      setScenarios(data || []);
    } catch (error) {
      console.error('Erreur génération scénarios:', error);
      setScenarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Génération des scénarios IA...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Arbitrage <span className="text-[#D4AF37]">Intelligent</span>
          </h1>
          <p className="text-gray-400 font-light">
            Scénarios d'optimisation générés par IA
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Scénarios générés"
            value={scenarios.length}
            icon={Brain}
            color="blue"
            description="Par l'IA"
          />
          <KPICard
            title="Recommandation"
            value="IA"
            icon={Lightbulb}
            color="gold"
            description={selectedScenario ? selectedScenario.name : 'Sélectionnez un scénario'}
          />
          <KPICard
            title="Impact potentiel"
            value={selectedScenario?.impact?.budget_freed || 0}
            unit="€"
            icon={Zap}
            color="green"
            description="Budget libéré"
          />
        </div>

        {/* Options de génération */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-[#D4AF37]" />
            Paramètres d'optimisation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Alignement stratégique minimum
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={options.min_alignment}
                onChange={(e) => setOptions({ ...options, min_alignment: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-white">{options.min_alignment}%</span>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Score risque maximum
              </label>
              <input
                type="range"
                min="1"
                max="9"
                value={options.max_risk}
                onChange={(e) => setOptions({ ...options, max_risk: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-white">{options.max_risk}/9</span>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Budget additionnel max
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={options.max_budget_increase}
                onChange={(e) => setOptions({ ...options, max_budget_increase: parseFloat(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-white">+{(options.max_budget_increase * 100).toFixed(0)}%</span>
            </div>
          </div>
          <button
            onClick={loadScenarios}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity"
          >
            Régénérer les scénarios
          </button>
        </div>

        {/* Scénarios */}
        <div>
          <h2 className="text-2xl font-light mb-4">Scénarios recommandés</h2>
          <ScenarioPanel
            scenarios={scenarios}
            onSelectScenario={handleSelectScenario}
          />
        </div>

        {/* Détail scénario sélectionné */}
        {selectedScenario && (
          <div className="bg-[#0A1A2F] border border-[#D4AF37] rounded-xl p-6">
            <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#D4AF37]" />
              Détails du scénario: {selectedScenario.name}
            </h2>
            <p className="text-gray-400 font-light mb-6">{selectedScenario.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Impacts business</h3>
                <div className="space-y-2 text-sm">
                  {selectedScenario.impact.budget_freed && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget libéré:</span>
                      <span className="text-emerald-400 font-light">
                        +{new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                          notation: 'compact'
                        }).format(selectedScenario.impact.budget_freed)}
                      </span>
                    </div>
                  )}
                  {selectedScenario.impact.budget_saved && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget économisé:</span>
                      <span className="text-emerald-400 font-light">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                          notation: 'compact'
                        }).format(selectedScenario.impact.budget_saved)}
                      </span>
                    </div>
                  )}
                  {selectedScenario.impact.risk_reduction && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Réduction risque:</span>
                      <span className="text-emerald-400 font-light">
                        -{selectedScenario.impact.risk_reduction}%
                      </span>
                    </div>
                  )}
                  {selectedScenario.impact.alignment_gain && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gain alignement:</span>
                      <span className="text-emerald-400 font-light">
                        +{selectedScenario.impact.alignment_gain}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3 text-[#D4AF37]">Projets concernés</h3>
                <div className="space-y-2 text-sm">
                  {selectedScenario.affected_projects?.map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-white font-light">{project.name}</span>
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs
                        ${project.action === 'accelerate' ? 'bg-emerald-600/20 text-emerald-400' : ''}
                        ${project.action === 'stop' ? 'bg-red-600/20 text-red-400' : ''}
                        ${project.action === 'slow' ? 'bg-amber-600/20 text-amber-400' : ''}
                      `}>
                        {project.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity"
            >
              Appliquer ce scénario
            </button>
          </div>
        )}

        {/* Empty state */}
        {scenarios.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Brain className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucun scénario généré</p>
          </div>
        )}
      </div>
    </div>
  );
}
