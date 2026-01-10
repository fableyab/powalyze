import React from 'react';

/**
 * Barre de progression mobile
 */
export const MobileProgress = ({ label, value, color = 'blue' }) => {
  const colors = {
    blue: 'bg-[#4A9EFF]',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    slate: 'bg-slate-500'
  };

  const barColor = colors[color] || colors.blue;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-600 font-semibold">{value}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-2 ${barColor} transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
};

export default MobileProgress;
