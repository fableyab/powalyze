import React from 'react';

const InsightCard = ({ icon, title, value, description, trend }) => {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-gold-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gold-primary/10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${
            trend.direction === 'up' 
              ? 'bg-green-900/50 text-green-400' 
              : 'bg-red-900/50 text-red-400'
          }`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <h3 className="text-dark-300 text-sm font-medium mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold mb-2">{value}</p>
      <p className="text-dark-400 text-xs leading-relaxed">{description}</p>
    </div>
  );
};

export default InsightCard;
