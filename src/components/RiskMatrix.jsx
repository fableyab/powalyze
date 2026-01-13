/**
 * RISK MATRIX COMPONENT
 * Matrice de risques 3x3 interactive (Probabilité x Impact)
 */

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function RiskMatrix({ risks = [], onRiskClick }) {
  const [selectedRisk, setSelectedRisk] = useState(null);

  // Grille 3x3: probability (1-3) x impact (1-3)
  const matrix = [
    [[], [], []], // Impact 3 (High)
    [[], [], []], // Impact 2 (Medium)
    [[], [], []]  // Impact 1 (Low)
  ];

  // Placer les risques dans la matrice
  risks.forEach(risk => {
    const prob = Math.min(Math.max(Math.round(risk.probability), 1), 3);
    const impact = Math.min(Math.max(Math.round(risk.impact), 1), 3);
    const matrixRow = 3 - impact; // Inverser car impact 3 = ligne 0
    const matrixCol = prob - 1;
    
    matrix[matrixRow][matrixCol].push(risk);
  });

  const getCellColor = (row, col) => {
    const score = (3 - row) * (col + 1); // Impact * Probability
    if (score >= 6) return 'bg-red-900/40 border-red-500/50 hover:bg-red-800/50';
    if (score >= 3) return 'bg-amber-900/40 border-amber-500/50 hover:bg-amber-800/50';
    return 'bg-emerald-900/40 border-emerald-500/50 hover:bg-emerald-800/50';
  };

  const impactLabels = ['Élevé', 'Moyen', 'Faible'];
  const probLabels = ['Faible', 'Moyen', 'Élevé'];

  return (
    <div className="w-full">
      {/* Matrix */}
      <div className="grid grid-cols-4 gap-2">
        {/* Top-left corner (empty) */}
        <div className="flex items-center justify-center text-xs font-light text-gray-500">
          Impact / Prob
        </div>
        
        {/* Probability labels (top) */}
        {probLabels.map((label, i) => (
          <div key={`prob-${i}`} className="flex items-center justify-center text-xs font-light text-gray-400">
            {label}
          </div>
        ))}

        {/* Matrix rows */}
        {matrix.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Impact label (left) */}
            <div className="flex items-center justify-center text-xs font-light text-gray-400">
              {impactLabels[rowIndex]}
            </div>

            {/* Cells */}
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={`
                  relative min-h-[120px] p-3 rounded-lg border-2 transition-all duration-200
                  ${getCellColor(rowIndex, colIndex)}
                  ${cell.length === 0 ? 'opacity-50' : 'cursor-pointer'}
                `}
              >
                {/* Risk count badge */}
                {cell.length > 0 && (
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-light text-white">{cell.length}</span>
                  </div>
                )}

                {/* Risk items */}
                <div className="space-y-1">
                  {cell.slice(0, 3).map(risk => (
                    <div
                      key={risk.risk_id || risk.id}
                      onClick={() => {
                        setSelectedRisk(risk);
                        onRiskClick?.(risk);
                      }}
                      className="flex items-start gap-2 p-2 bg-black/30 rounded hover:bg-black/50 transition-colors"
                    >
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-light text-white line-clamp-2">
                        {risk.risk_name || risk.name}
                      </span>
                    </div>
                  ))}
                  
                  {cell.length > 3 && (
                    <div className="text-xs text-gray-400 text-center mt-1">
                      +{cell.length - 3} autres
                    </div>
                  )}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-900/40 border-2 border-red-500/50 rounded"></div>
          <span className="text-gray-400 font-light">Critique (6-9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-900/40 border-2 border-amber-500/50 rounded"></div>
          <span className="text-gray-400 font-light">Modéré (3-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-900/40 border-2 border-emerald-500/50 rounded"></div>
          <span className="text-gray-400 font-light">Faible (1-2)</span>
        </div>
      </div>

      {/* Selected risk detail (optional) */}
      {selectedRisk && (
        <div className="mt-6 p-4 bg-[#0A1A2F] border border-[#D4AF37]/30 rounded-lg">
          <h4 className="text-sm font-light text-[#D4AF37] mb-2">Risque sélectionné</h4>
          <p className="text-white font-extralight mb-1">{selectedRisk.risk_name || selectedRisk.name}</p>
          <p className="text-xs text-gray-400 mb-2">Initiative: {selectedRisk.initiative_name}</p>
          <div className="flex gap-4 text-xs">
            <span className="text-gray-400">Probabilité: <span className="text-white">{selectedRisk.probability}/3</span></span>
            <span className="text-gray-400">Impact: <span className="text-white">{selectedRisk.impact}/3</span></span>
            <span className="text-gray-400">Score: <span className="text-white">{selectedRisk.score}</span></span>
          </div>
          {selectedRisk.mitigation && (
            <p className="text-xs text-gray-400 mt-2">
              <span className="text-[#D4AF37]">Mitigation:</span> {selectedRisk.mitigation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
