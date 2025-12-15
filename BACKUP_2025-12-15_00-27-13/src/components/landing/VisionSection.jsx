import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mountain, Globe2 } from 'lucide-react';

const VisionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#BFA76A] blur-[150px] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <span className="text-[#BFA76A] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">{t('home.vision.subtitle')}</span>
        
        <h2 className="text-3xl md:text-5xl font-display font-light text-white leading-tight mb-12">
          "{t('home.vision.text')}"
        </h2>

        <div className="flex justify-center gap-12 md:gap-24">
           <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                 <Mountain className="text-[#BFA76A]" />
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-sm">{t('home.vision.highlight1')}</span>
           </div>
           <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                 <Globe2 className="text-[#BFA76A]" />
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-sm">{t('home.vision.highlight2')}</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;