import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Standard Card Container
export const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-[#1C1C1C] p-6 rounded-sm ${className}`}
  >
    {children}
  </motion.div>
);

// KPI Card (Premium Style)
export const KPICard = ({ title, value, change, trend, icon: Icon, color = "gold", trendColor: customTrendColor }) => {
  const isPositive = trend === 'up' || (typeof trend === 'number' && trend > 0);
  const defaultTrendColor = isPositive ? "text-green-500" : "text-red-500";
  const finalTrendColor = customTrendColor || defaultTrendColor;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  // Color mapping for accent
  const accentColor = color === 'blue' ? '#3A7BFF' : '#BFA76A';

  return (
    <Card className="relative overflow-hidden group hover:bg-[#252525] transition-colors duration-300">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor }} />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        <div className={`flex items-center gap-1 text-xs font-medium ${finalTrendColor} bg-opacity-10 px-2 py-1 rounded`}>
          <TrendIcon size={14} />
          {change || (typeof trend === 'number' ? `${trend > 0 ? '+' : ''}${trend}%` : '')}
        </div>
      </div>
      
      <div className="flex items-end gap-3 relative z-10">
        <span className="text-4xl font-light text-white tracking-tight">{value}</span>
      </div>

      {Icon && (
        <div className="absolute bottom-4 right-4 text-gray-800 group-hover:text-gray-700 transition-colors">
            <Icon size={48} strokeWidth={1} />
        </div>
      )}
    </Card>
  );
};

// Dashboard Header
export const DashboardHeader = ({ title, subtitle, lastUpdate }) => (
  <div className="flex justify-between items-end mb-10 border-b border-[#1C1C1C] pb-6">
    <div>
      <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-2">{title}</h1>
      <p className="text-[#BFA76A] text-xs md:text-sm uppercase tracking-[0.2em] font-medium">{subtitle}</p>
    </div>
    {lastUpdate && (
      <div className="text-right hidden md:block">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dernière mise à jour</p>
        <p className="text-sm text-white font-medium">{lastUpdate}</p>
      </div>
    )}
  </div>
);

// Alias for PageHeader to fix export error
export const PageHeader = DashboardHeader;

// Status Badge
export const StatusBadge = ({ status }) => {
  const styles = {
    critical: "bg-red-500/10 text-red-500 border-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    neutral: "bg-gray-500/10 text-gray-400 border-gray-500/20"
  };
  
  const labels = {
    critical: "Critical",
    warning: "Warning",
    success: "On Track",
    neutral: "Pending"
  };

  const normalizedStatus = status ? status.toLowerCase() : 'neutral';

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium border ${styles[normalizedStatus] || styles.neutral}`}>
      {labels[normalizedStatus] || status}
    </span>
  );
};