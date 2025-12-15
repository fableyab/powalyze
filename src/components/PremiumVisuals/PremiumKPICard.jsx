import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const PremiumKPICard = ({ title, value, trend, trendValue, icon: Icon, color = "blue" }) => {
  const getColorClass = (c) => {
    switch(c) {
      case 'blue': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'green': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'red': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'purple': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'gold': return 'text-[#BFA76A] bg-[#BFA76A]/10 border-[#BFA76A]/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const colorClass = getColorClass(color);

  return (
    <Card className="bg-[#1A1A1A] border-white/5 hover:border-white/10 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2 rounded-lg border", colorClass)}>
            {Icon && <Icon size={20} />}
          </div>
          {trend && (
            <div className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", 
              trend === 'up' ? "text-green-500 bg-green-500/10" : 
              trend === 'down' ? "text-red-500 bg-red-500/10" : 
              "text-gray-500 bg-gray-500/10"
            )}>
              {trend === 'up' && <ArrowUpRight size={12} className="mr-1" />}
              {trend === 'down' && <ArrowDownRight size={12} className="mr-1" />}
              {trend === 'neutral' && <Minus size={12} className="mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumKPICard;