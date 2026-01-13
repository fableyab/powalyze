/**
 * SCENARIO PANEL COMPONENT
 * Panel de scénarios d'arbitrage générés par IA
 */

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Pause, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ScenarioPanel({ scenarios = [], onSelectScenario }) {
  const [selectedScenario, setSelectedScenario] = useState(null);

  const getScenarioIcon = (type) => {
    switch (type) {
      case 'accelerate_aligned':
        return TrendingUp;
      case 'stop_risky':
        return AlertCircle;
      case 'slow_overbudget':
        return Pause;
      default:
        return CheckCircle2;
    }
  };

  const getScenarioColor = (type) => {
    switch (type) {
      case 'accelerate_aligned':
        return 'from-emerald-500 to-green-600';
      case 'stop_risky':
        return 'from-red-500 to-red-600';
      case 'slow_overbudget':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-[#4A9EFF] to-blue-600';
    }
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    onSelectScenario?.(scenario);
  };

  if (scenarios.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
        <p className="text-gray-500 font-light">Aucun scénario disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scenarios.map((scenario, index) => {
        const Icon = getScenarioIcon(scenario.scenario);
        const isSelected = selectedScenario?.scenario === scenario.scenario;

        return (
          <div
            key={scenario.scenario || index}
            onClick={() => handleSelectScenario(scenario)}
            className={`
              relative p-6 bg-[#0A1A2F] border-2 rounded-xl cursor-pointer
              transition-all duration-300 hover:scale-[1.02]
              ${isSelected ? 'border-[#D4AF37]' : 'border-gray-800 hover:border-[#D4AF37]/50'}
            `}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${getScenarioColor(scenario.scenario)} bg-opacity-20`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-light text-lg mb-1">{scenario.title}</h3>
                <p className="text-gray-400 text-sm font-light">{scenario.description}</p>
              </div>
            </div>

            {/* Impact metrics */}
            {scenario.impact && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg">
                {scenario.impact.budget_increase !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Budget</p>
                    <p className={`text-lg font-light ${scenario.impact.budget_increase > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {scenario.impact.budget_increase > 0 ? '+' : ''}
                      {new Intl.NumberFormat('fr-FR', {
                        notation: 'compact',
                        compactDisplay: 'short'
                      }).format(scenario.impact.budget_increase)} €
                    </p>
                  </div>
                )}
                {scenario.impact.budget_freed !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Budget libéré</p>
                    <p className="text-lg font-light text-emerald-400">
                      {new Intl.NumberFormat('fr-FR', {
                        notation: 'compact',
                        compactDisplay: 'short'
                      }).format(scenario.impact.budget_freed)} €
                    </p>
                  </div>
                )}
                {scenario.impact.budget_saved !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Économie</p>
                    <p className="text-lg font-light text-emerald-400">
                      {new Intl.NumberFormat('fr-FR', {
                        notation: 'compact',
                        compactDisplay: 'short'
                      }).format(scenario.impact.budget_saved)} €
                    </p>
                  </div>
                )}
                {scenario.impact.risk_reduction !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Risque</p>
                    <p className={`text-lg font-light ${scenario.impact.risk_reduction < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {scenario.impact.risk_reduction}%
                    </p>
                  </div>
                )}
                {scenario.impact.risk_increase !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Risque</p>
                    <p className="text-lg font-light text-amber-400">
                      +{scenario.impact.risk_increase}%
                    </p>
                  </div>
                )}
                {scenario.impact.alignment_gain !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Alignement</p>
                    <p className="text-lg font-light text-emerald-400">
                      +{scenario.impact.alignment_gain}%
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Projects affected */}
            {scenario.projects && scenario.projects.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">Projets concernés ({scenario.projects.length})</p>
                <div className="flex flex-wrap gap-2">
                  {scenario.projects.slice(0, 5).map(project => (
                    <span 
                      key={project.id} 
                      className="text-xs px-2 py-1 bg-black/30 rounded-full text-gray-300 font-light"
                    >
                      {project.name}
                    </span>
                  ))}
                  {scenario.projects.length > 5 && (
                    <span className="text-xs px-2 py-1 bg-black/30 rounded-full text-gray-400 font-light">
                      +{scenario.projects.length - 5} autres
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-light rounded-full">
                  Sélectionné
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
