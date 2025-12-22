import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KpiCard = ({ label, value, unit = '', trend, trendValue, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 bg-green-50';
    if (trend === 'down') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{label}</p>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-black text-gray-900">
            {value}
            {unit && <span className="text-xl text-gray-500 ml-1">{unit}</span>}
          </p>
          {trendValue && (
            <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}>
              {getTrendIcon()}
              {trendValue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
