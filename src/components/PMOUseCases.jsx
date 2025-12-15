
import React from 'react';
import { pmoSolutionData } from '@/data/pmoSolutionData';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PMOUseCases = () => {
  const { language } = useLanguage();
  const useCases = pmoSolutionData.useCases;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {useCases.map((uc, index) => (
        <div key={uc.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-[#1A1A1A] p-6 border-b border-white/5 flex items-center gap-3">
            <div className="p-2 bg-[#BFA76A]/10 rounded text-[#BFA76A]">
              <Building2 size={20} />
            </div>
            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{uc.industry}</span>
          </div>
          
          <div className="p-8 flex-grow space-y-6">
            <h3 className="text-xl font-bold text-white">{uc.title[language]}</h3>
            
            <div>
              <h4 className="text-xs text-[#BFA76A] uppercase font-bold mb-1">Challenge</h4>
              <p className="text-gray-400 text-sm">{uc.challenge[language]}</p>
            </div>
            
            <div>
              <h4 className="text-xs text-[#BFA76A] uppercase font-bold mb-1">Solution</h4>
              <p className="text-gray-400 text-sm">{uc.solution[language]}</p>
            </div>

            <div>
              <h4 className="text-xs text-[#BFA76A] uppercase font-bold mb-1">Results</h4>
              <p className="text-white font-medium text-sm">{uc.results[language]}</p>
            </div>
          </div>

          <div className="p-6 border-t border-white/10 bg-[#161616]">
            <Button variant="ghost" className="w-full justify-between text-gray-400 hover:text-white hover:bg-white/5 group">
              Read Case Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PMOUseCases;
