import React from 'react';
import { motion } from 'framer-motion';

const Philosophy = () => {
  return (
    <section className="py-40 bg-black text-center border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto mb-12 rounded-full border border-brand-gold-premium flex items-center justify-center">
             <div className="w-2 h-2 bg-brand-gold-premium rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
            Notre Philosophie
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16">
            "La simplicité est la sophistication suprême. Nous éliminons le bruit pour ne garder que le signal. Pas de superflu, juste de l'impact."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
             <div>
               <h3 className="text-brand-gold-premium font-display text-lg mb-2">Excellence</h3>
               <p className="text-sm text-gray-500">Standards élevés, sans compromis.</p>
             </div>
             <div>
               <h3 className="text-brand-gold-premium font-display text-lg mb-2">Clarté</h3>
               <p className="text-sm text-gray-500">Transparence totale et immédiate.</p>
             </div>
             <div>
               <h3 className="text-brand-gold-premium font-display text-lg mb-2">Pragmatisme</h3>
               <p className="text-sm text-gray-500">Orienté résultats, pas théorie.</p>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Philosophy;