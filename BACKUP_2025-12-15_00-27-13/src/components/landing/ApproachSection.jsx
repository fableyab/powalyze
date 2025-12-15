import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Settings, GitMerge, BarChart2, MessageSquare } from 'lucide-react';

const ApproachSection = () => {
  const { t } = useLanguage();
  
  const pillars = [
    { key: 'pillar1', icon: Settings },
    { key: 'pillar2', icon: GitMerge },
    { key: 'pillar3', icon: BarChart2 },
    { key: 'pillar4', icon: MessageSquare }
  ];

  return (
    <section className="py-24 bg-[#0F0F0F] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            {t('home.approach.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white max-w-2xl">
            {t('home.approach.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-sm bg-[#1C1C1C] flex items-center justify-center border border-[#333] text-[#BFA76A]">
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{t(`home.approach.${p.key}.title`)}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{t(`home.approach.${p.key}.desc`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;