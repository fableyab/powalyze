import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SectionPMO = () => {
  const features = [
    "Alignement Stratégique & Opérationnel",
    "Gestion des Risques & Opportunités",
    "Optimisation des Ressources",
    "Gouvernance Agile & Structurée"
  ];

  return (
    <section id="pmo" className="py-32 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold text-brand-gold-premium uppercase tracking-[0.2em] mb-4">
              Pilier 01
            </h2>
            <h3 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
              PMO <span className="text-gray-500">Stratégique</span>
            </h3>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
              Le pilotage ne s'improvise pas. Nous apportons une structure rigoureuse mais flexible, capable d'absorber l'incertitude des grands projets sans ralentir l'exécution.
            </p>
            
            <ul className="space-y-5">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <CheckCircle2 className="text-brand-gold-premium/60 group-hover:text-brand-gold-premium transition-colors w-6 h-6" strokeWidth={1} />
                  <span className="text-lg text-gray-300 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-brand-gold-premium/20">
               <img 
                 alt="Geometric gold structures on black background" 
                 className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1689961437781-41f6523a4db0" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
             </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default SectionPMO;