/**
 * KPI CARD COMPONENT
 * Carte KPI réutilisable pour afficher métriques avec évolution
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function KPICard({ 
  title, 
  value, 
  unit = '', 
  trend = null, // {value: +5, direction: 'up'|'down'|'stable'}
  icon: Icon,
  color = 'blue',
  description = ''
}) {
  const colorClasses = {
    blue: 'from-[#4A9EFF] to-blue-600',
    gold: 'from-[#D4AF37] to-yellow-600',
    green: 'from-emerald-500 to-green-600',
    red: 'from-red-500 to-red-600',
    gray: 'from-gray-500 to-gray-600'
  };

  const TrendIcon = trend?.direction === 'up' ? TrendingUp
    : trend?.direction === 'down' ? TrendingDown
    : Minus;

  const trendColor = trend?.direction === 'up' ? 'text-emerald-400'
    : trend?.direction === 'down' ? 'text-red-400'
    : 'text-gray-400';

  return (
    <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-light mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extralight text-white">
              {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
            </span>
            {unit && <span className="text-gray-400 text-sm">{unit}</span>}
          </div>
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} bg-opacity-20`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
      </div>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
          <span className={`text-sm font-light ${trendColor}`}>
            {trend.value > 0 ? '+' : ''}{trend.value}%
          </span>
          {description && (
            <span className="text-gray-500 text-xs ml-auto">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
