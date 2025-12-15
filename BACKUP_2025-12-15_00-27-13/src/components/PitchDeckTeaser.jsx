import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PitchDeckTeaser = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-brand-black to-[#0a0a0a] border-t border-brand-gold-light/5">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-brand-gold-premium/20 bg-brand-card p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_0_40px_rgba(191,167,106,0.05)]"
        >
          {/* Glow effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold-premium to-transparent opacity-50" />
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold-premium/10 text-brand-gold-premium text-xs font-bold uppercase tracking-widest mb-6">
              <Presentation size={14} />
              <span>Investisseurs & Partenaires</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
              Découvrez notre Vision Stratégique
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Explorez notre Pitch Deck interactif pour comprendre comment Powalyze redéfinit la gouvernance IT à l'ère de la donnée et de l'IA. 13 slides pour convaincre.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link to="/pitch-deck">
              <Button variant="premium" size="xl" className="group px-10 py-7 text-base">
                Get Pitch Deck 
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default PitchDeckTeaser;