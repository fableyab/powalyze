import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Achievements = () => {
  const { t } = useLanguage();
  const list = t('achievements.list');

  return (
    <section id="realisations" className="py-32 bg-brand-darkBlue text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-medium font-display tracking-tight mb-4 text-brand-gold-champagne">{t('achievements.title')}</h2>
          <p className="text-gray-400 font-light">{t('achievements.subtitle')}</p>
        </motion.div>

        <div className="space-y-8">
          {Array.isArray(list) && list.map((point, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-6 group"
            >
              <div className="mt-1 text-brand-gold-premium opacity-50 group-hover:opacity-100 transition-opacity">
                <Check size={20} />
              </div>
              <p className="text-xl md:text-2xl font-light text-gray-300 group-hover:text-white transition-colors">
                {point}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;