import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SectionFreeAudit = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-r from-brand-black via-[#111] to-brand-black border-y border-brand-gold-light/10 relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-brand-gold-premium/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="flex-1"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Sparkles className="text-brand-gold-premium w-5 h-5" />
              <span className="text-brand-gold-champagne font-medium uppercase tracking-widest text-sm">
                Limited Offer
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
              {t('freeAudit.title')}
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-2xl">
              {t('freeAudit.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/audit">
              <Button variant="premium" size="xl" className="flex flex-col h-auto py-4 px-10 items-center gap-1 group">
                <span className="flex items-center gap-3 text-lg">
                  {t('freeAudit.cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] normal-case font-light opacity-80 tracking-normal">
                   {t('freeAudit.micro')}
                </span>
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SectionFreeAudit;