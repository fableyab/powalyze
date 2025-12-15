import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/lib/textUtils';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="a-propos" className="py-32 bg-brand-dark-blue/10 text-white border-t border-brand-gold-light/5">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-gold-premium mb-12">{t('about.label')}</h2>
          
          <h3 className="text-3xl md:text-5xl font-light leading-tight mb-12 text-white font-display">
            {formatText(t('about.title'))}
          </h3>

          <div className="text-gray-300 font-light leading-relaxed space-y-8 text-xl md:text-2xl">
            <p className="whitespace-pre-line">{formatText(t('about.desc1'))}</p>
            <p className="whitespace-pre-line text-white">{formatText(t('about.desc2'))}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;