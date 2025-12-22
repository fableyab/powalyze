import React from 'react';
import { projects } from '../../data/demoData';

const HeatmapRisks = () => {
  const allRisks = projects.flatMap(p => 
    p.risks.map(r => ({ ...r, projectName: p.name }))
  );

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-gray-900';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-300 text-gray-900';
    }
  };

  const getProbabilityLabel = (prob) => {
    switch(prob) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Faible';
      default: return prob;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Matrice des Risques</h3>
      
      <div className="space-y-3">
        {allRisks.slice(0, 6).map((risk) => (
          <div 
            key={risk.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(risk.severity)}`}>
              {risk.severity}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">{risk.label}</p>
              <p className="text-sm text-gray-600">{risk.projectName}</p>
              <p className="text-xs text-gray-500 mt-1">Probabilité: {getProbabilityLabel(risk.probability)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatmapRisks;
