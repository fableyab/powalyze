import React from 'react';
import { motion } from 'framer-motion';

const SectionAlliance = () => {
  return (
    <section className="py-40 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
         <div className="w-[800px] h-[800px] bg-brand-gold-premium/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display text-white mb-12 leading-tight">
            L'Alliance <span className="text-brand-gold-premium">Unique</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            <div className="flex-1 text-right hidden md:block">
              <h3 className="text-2xl text-white font-light mb-2">Rigueur PMO</h3>
              <p className="text-gray-500 text-sm">Structure & Méthode</p>
            </div>
            
            <div className="w-24 h-24 rounded-full border border-brand-gold-premium/30 flex items-center justify-center text-brand-gold-premium text-2xl font-display relative">
              <div className="absolute inset-0 bg-brand-gold-premium/5 rounded-full animate-pulse" />
              +
            </div>

            <div className="flex-1 text-left hidden md:block">
              <h3 className="text-2xl text-white font-light mb-2">Puissance Data</h3>
              <p className="text-gray-500 text-sm">Vision & Vérité</p>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-2xl border border-white/10 mb-12">
             <img 
               alt="Abstract gold lines converging into a single powerful point on black" 
               className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1618123354067-716477fbdfb4" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
             <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl md:text-4xl font-display text-white tracking-widest uppercase opacity-90 mix-blend-overlay">
                   Convergence
                </p>
             </div>
          </div>

          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            C'est à l'intersection de ces deux mondes que se crée la vraie valeur. Une gouvernance éclairée par la data, une data dirigée par les enjeux business.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionAlliance;