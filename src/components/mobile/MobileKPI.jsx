import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * KPI mobile avec style Powalyze
 */
export const MobileKPI = ({ label, value, trend, variant = 'primary' }) => {
  const variants = {
    primary: 'from-[#4A9EFF] to-[#0052cc]',
    success: 'from-green-500 to-green-600',
    warning: 'from-orange-500 to-orange-600',
    danger: 'from-red-500 to-red-600',
    neutral: 'from-slate-600 to-slate-700'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend > 0) return 'text-green-300';
    if (trend < 0) return 'text-red-300';
    return 'text-slate-300';
  };

  return (
    <div
      className={`bg-gradient-to-br ${
        variants[variant] || variants.primary
      } text-white rounded-xl p-4 mb-4 shadow-lg`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm opacity-90 font-medium">{label}</div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default MobileKPI;
