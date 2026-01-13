/**
 * ALIGNMENT GAUGE COMPONENT
 * Jauge d'alignement stratégique (gauge circulaire)
 */

import React from 'react';

export default function AlignmentGauge({ score = 0, size = 200 }) {
  const percentage = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 70; // rayon = 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (score) => {
    if (score >= 70) return '#10B981'; // green
    if (score >= 40) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const getLabel = (score) => {
    if (score >= 70) return 'Élevé';
    if (score >= 40) return 'Moyen';
    return 'Faible';
  };

  const color = getColor(percentage);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="70"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-extralight text-white mb-1">
            {percentage}
          </div>
          <div className="text-sm text-gray-400 font-light">/ 100</div>
          <div 
            className="text-xs font-light mt-2 px-3 py-1 rounded-full"
            style={{ color, backgroundColor: `${color}20` }}
          >
            {getLabel(percentage)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm font-light">Alignement Stratégique</p>
      </div>
    </div>
  );
}
