import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const PremiumKPICard = ({ 
  title, 
  value, 
  trend, 
  trendLabel, 
  icon: Icon, 
  color = "gold", 
  className 
}) => {
  const isPositive = trend > 0;
  const isNeutral = trend === 0;
  
  const accentColor = {
    gold: "bg-[#BFA76A]",
    blue: "bg-[#3A7BFF]",
    green: "bg-emerald-500",
    purple: "bg-purple-500",
    red: "bg-red-500"
  }[color] || "bg-[#BFA76A]";

  const textColor = {
    gold: "text-[#BFA76A]",
    blue: "text-[#3A7BFF]",
    green: "text-emerald-500",
    purple: "text-purple-500",
    red: "text-red-500"
  }[color] || "text-[#BFA76A]";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn("bg-[#111] border border-white/10 rounded-xl p-6 relative overflow-hidden group", className)}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${accentColor}`} />
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        {Icon && (
           <div className={`p-2 rounded-lg bg-opacity-10 ${accentColor.replace('bg-', 'bg-')} ${textColor}`}>
              <Icon size={18} />
           </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        
        {(trend !== undefined && trend !== null) && (
          <div className="flex items-center gap-2 text-xs">
            <span className={cn(
              "flex items-center font-bold px-1.5 py-0.5 rounded",
              isPositive ? "text-green-500 bg-green-500/10" : isNeutral ? "text-gray-500 bg-gray-500/10" : "text-red-500 bg-red-500/10"
            )}>
              {isPositive ? <ArrowUpRight size={12} className="mr-1" /> : isNeutral ? <Minus size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
              {Math.abs(trend)}%
            </span>
            <span className="text-gray-500">{trendLabel || "vs last period"}</span>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${accentColor} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
    </motion.div>
  );
};

export default PremiumKPICard;