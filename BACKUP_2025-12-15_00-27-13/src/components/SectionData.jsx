import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SectionData = () => {
  return (
    <section id="data" className="py-32 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
             <div className="relative aspect-square rounded-full overflow-hidden border border-brand-gold-premium/10 shadow-[0_0_100px_rgba(191,167,106,0.1)]">
               <img 
                 alt="Golden connected data nodes network visualization" 
                 className="w-full h-full object-cover opacity-80"
                src="https://images.unsplash.com/photo-1676910226586-eb747ab85443" />
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-xs font-bold text-brand-gold-premium uppercase tracking-[0.2em] mb-4">
              Pilier 02
            </h2>
            <h3 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
              Data & <span className="text-brand-gold-premium">Power BI</span>
            </h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
              Nous ne faisons pas que des rapports. Nous construisons des cockpits de pilotage. Une vérité unique, accessible en temps réel, pour décider plus vite.
            </p>
            
            <div className="pl-6 border-l border-brand-gold-premium/40 mb-10">
              <p className="text-lg text-white italic">
                "La donnée brute est un bruit. La donnée structurée est une information. La donnée visualisée est une décision."
              </p>
            </div>

            <button className="group flex items-center gap-3 text-brand-gold-premium uppercase tracking-widest text-sm font-medium hover:text-white transition-colors">
              Découvrir nos Dashboards <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default SectionData;