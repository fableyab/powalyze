import React from 'react';
import { motion } from 'framer-motion';

const SectionMethod = () => {
  const steps = [
    { num: "01", title: "Clarifier", desc: "Définir les objectifs et le périmètre." },
    { num: "02", title: "Structurer", desc: "Mettre en place la gouvernance et les process." },
    { num: "03", title: "Automatiser", desc: "Connecter les sources de données." },
    { num: "04", title: "Visualiser", desc: "Créer les tableaux de bord décisionnels." },
    { num: "05", title: "Maîtriser", desc: "Analyser les écarts et les risques." },
    { num: "06", title: "Décider", desc: "Agir sur la base de faits avérés." }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="sticky top-32"
            >
              <h2 className="text-xs font-bold text-brand-gold-premium uppercase tracking-[0.2em] mb-4">
                Notre Approche
              </h2>
              <h3 className="text-4xl md:text-5xl font-display text-white mb-8 leading-tight">
                Méthode Powalyze
              </h3>
              <p className="text-gray-400 font-light mb-12 leading-relaxed">
                Un cycle vertueux pour passer du chaos à la maîtrise. Chaque étape est conçue pour apporter une valeur immédiate et incrémentale.
              </p>
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-brand-gold-premium/10 opacity-80">
                 <img 
                   alt="Gold blocks stacked systematically in perfect order" 
                   className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1682251024443-5ba51882ad0d" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border border-white/10 hover:border-brand-gold-premium/40 bg-brand-card/20 transition-colors duration-500 group"
              >
                <span className="text-5xl font-display text-white/10 group-hover:text-brand-gold-premium/20 transition-colors duration-500 block mb-4">
                  {step.num}
                </span>
                <h4 className="text-xl text-white font-medium mb-3">{step.title}</h4>
                <p className="text-gray-500 font-light text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionMethod;