import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const ServiceTemplate = ({ serviceId, icon: Icon }) => {
  const { t } = useLanguage();
  
  const content = t(`servicePages.${serviceId}`);

  if (!content) return null;

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            {Icon && <Icon className="text-brand-gold-premium w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tighter text-brand-gold-mat">
              {content.title}
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide mb-8">
            {content.subtitle}
          </h2>
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
            {content.description}
          </p>
        </motion.div>
      </div>

      {/* Grid Section */}
      <div className="bg-zinc-950 py-24 border-y border-brand-gold-light/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.points && content.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-brand-black border border-brand-gold-light/10 hover:border-brand-gold-premium/40 hover:shadow-gold-glow transition-all duration-300 rounded-xl group"
              >
                <div className="mb-6 text-brand-gold-premium opacity-70 group-hover:opacity-100 transition-opacity">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-medium text-white mb-4 font-display">{point.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-brand-darkBlue/40 to-brand-black border border-brand-gold-light/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-medium mb-6 font-display text-brand-gold-champagne">
            {t('contact.title')}
          </h3>
          <div className="flex justify-center gap-6">
            <Link 
              to="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-ctaBlue text-white border border-brand-gold-premium rounded-full hover:shadow-gold-glow hover:bg-brand-ctaBlue/90 transition-all duration-300 font-medium text-sm uppercase tracking-wider"
            >
              {t('hero.cta_secondary')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate;