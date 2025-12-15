import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-4 block">{t('home.about.title')}</span>
            <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight">
              {t('home.about.subtitle')}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t('home.about.desc')}
            </p>
            
            <div className="space-y-4">
               {["Integration Profonde", "Transfert de Compétences", "Culture du Résultat"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="text-[#BFA76A]" size={20} />
                     <span className="text-white font-medium">{item}</span>
                  </div>
               ))}
            </div>
          </motion.div>

          <div className="relative">
             <div className="absolute -inset-4 bg-[#BFA76A] opacity-10 blur-2xl -z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop" 
               alt="Team collaboration" 
               className="w-full rounded-sm border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;