import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const KPICard = ({ 
  title, 
  value, 
  subValue, 
  trend, 
  trendValue, 
  target,
  status, // 'On Track' | 'At Risk' | 'Critical'
  icon: Icon, 
  color = "gold", 
  delay = 0 
}) => {
  const isPos = trend === 'up';
  const isNeu = trend === 'neutral';
  
  const colors = {
    gold: "text-[#BFA76A] bg-[#BFA76A]/10 border-[#BFA76A]/20",
    blue: "text-[#3A7BFF] bg-[#3A7BFF]/10 border-[#3A7BFF]/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  const statusColors = {
    'On Track': "bg-green-500",
    'At Risk': "bg-yellow-500",
    'Critical': "bg-red-500",
    'Neutral': "bg-gray-500"
  };

  const style = colors[color] || colors.gold;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="relative bg-[#111] border border-white/10 p-6 rounded-xl hover:border-[#BFA76A]/30 transition-all duration-300 group overflow-hidden"
          >
            {/* Background Gradient Effect */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${style.split(' ')[1]} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                 <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                    {title}
                    {status && <span className={`w-2 h-2 rounded-full ${statusColors[status] || statusColors.Neutral}`} />}
                 </h3>
                 <div className="text-3xl font-display font-bold text-white tracking-tight">{value}</div>
              </div>
              <div className={`p-2 rounded-lg ${style}`}>
                 {Icon ? <Icon size={20} /> : <TrendingUp size={20} />}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs relative z-10">
              <div className="flex items-center gap-2">
                 {trendValue && (
                    <span className={`flex items-center gap-1 font-bold ${isPos ? 'text-green-500' : isNeu ? 'text-gray-400' : 'text-red-500'}`}>
                       {isPos ? <ArrowUpRight size={14}/> : isNeu ? <Minus size={14}/> : <ArrowDownRight size={14}/>}
                       {trendValue}
                    </span>
                 )}
                 <span className="text-gray-500">{subValue}</span>
              </div>
              {target && (
                 <span className="text-gray-600">Target: <span className="text-gray-400">{target}</span></span>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#1A1A1A] border-white/10 text-white">
          <p className="font-bold">{title}</p>
          <p className="text-xs text-gray-400">Click for detailed breakdown</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default KPICard;