
import React from 'react';
import { pmoSolutionData } from '@/data/pmoSolutionData';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PMOPricing = () => {
  const { language } = useLanguage();
  const tiers = pmoSolutionData.pricing;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {tiers.map((tier) => (
        <div 
          key={tier.id} 
          className={`relative bg-[#111] rounded-2xl p-8 border transition-all duration-300 flex flex-col ${
            tier.recommended 
              ? 'border-[#BFA76A] shadow-[0_0_30px_rgba(191,167,106,0.15)] scale-105 z-10' 
              : 'border-white/10 hover:border-white/30'
          }`}
        >
          {tier.recommended && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BFA76A] text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Recommended
            </div>
          )}

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="text-3xl font-display font-bold text-[#BFA76A] mb-2">{tier.price[language]}</div>
            <p className="text-gray-400 text-sm">{tier.desc[language]}</p>
          </div>

          <ul className="space-y-4 mb-8 flex-grow">
            {tier.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <Check size={16} className="text-[#BFA76A] mt-0.5 shrink-0" />
                <span>{feat[language]}</span>
              </li>
            ))}
          </ul>

          <Button 
            className={`w-full font-bold ${
              tier.recommended 
                ? 'bg-[#BFA76A] text-black hover:bg-white' 
                : 'bg-white/10 text-white hover:bg-white hover:text-black'
            }`}
          >
            Choose {tier.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PMOPricing;
