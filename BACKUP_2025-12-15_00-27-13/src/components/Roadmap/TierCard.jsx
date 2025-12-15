import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TierCard = ({ tier, onClick }) => {
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#BFA76A]/30 transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{tier.title}</h3>
          <span className="text-sm text-[#BFA76A] font-medium">{tier.subtitle}</span>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-bold uppercase
          ${tier.status === 'active' ? 'bg-[#BFA76A] text-black' : 
            tier.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
          {tier.status}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {tier.description}
      </p>

      <div className="space-y-3 mb-6">
        {tier.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
            <Check size={16} className="text-[#BFA76A] mt-0.5 shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="w-full border-white/10 hover:bg-[#BFA76A] hover:text-black hover:border-transparent group"
        onClick={onClick}
      >
        View Details 
        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default TierCard;