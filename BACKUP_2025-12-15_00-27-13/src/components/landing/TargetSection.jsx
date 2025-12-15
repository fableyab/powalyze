import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Crown, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TargetSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div>
              <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.target.subtitle')}</span>
              <h2 className="text-4xl font-display font-bold text-white mb-6">{t('home.target.title')}</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                 {t('home.target.desc')}
              </p>
              <div className="flex gap-4 mb-8">
                 <div className="flex flex-col items-center p-4 bg-[#111] rounded border border-white/10 w-24">
                    <Crown size={24} className="text-[#BFA76A] mb-2" />
                    <span className="text-[10px] uppercase text-white font-bold">C-Level</span>
                 </div>
                 <div className="flex flex-col items-center p-4 bg-[#111] rounded border border-white/10 w-24">
                    <Star size={24} className="text-[#BFA76A] mb-2" />
                    <span className="text-[10px] uppercase text-white font-bold">PMO</span>
                 </div>
                 <div className="flex flex-col items-center p-4 bg-[#111] rounded border border-white/10 w-24">
                    <ShieldCheck size={24} className="text-[#BFA76A] mb-2" />
                    <span className="text-[10px] uppercase text-white font-bold">Board</span>
                 </div>
              </div>
              <Link to="/contact">
                 <Button className="border border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black transition-colors">
                    {t('home.target.cta')}
                 </Button>
              </Link>
           </div>
           <div className="relative h-[400px] bg-[#111] rounded-2xl overflow-hidden border border-white/5">
               <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop" 
                  alt="Executive decision making" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
               />
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="text-white font-bold text-xl">"Powalyze a transformé notre vision en réalité opérationnelle."</div>
                  <div className="text-[#BFA76A] text-sm mt-2">CEO, Energy Sector</div>
               </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default TargetSection;