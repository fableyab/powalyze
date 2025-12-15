import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ValuePropSection = () => {
  const points = [
    { title: "Clarté Radicale", desc: "Finis les rapports illisibles. Nous traduisons la complexité technique en décisions business claires." },
    { title: "Exécution Chirurgicale", desc: "Pas de théorie. Nous sommes des opérationnels qui sécurisent vos livrables critiques." },
    { title: "Indépendance Totale", desc: "Nos recommandations servent vos intérêts, pas ceux des grands éditeurs de logiciels." },
    { title: "Vision 360°", desc: "Nous connectons la stratégie (C-Level) avec la réalité terrain (Ingénierie) sans perte de signal." }
  ];

  return (
    <section className="py-24 bg-[#0F0F0F] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-8 leading-tight">
              Ce que Powalyze <br/><span className="text-[#BFA76A]">change pour vous</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              La plupart des cabinets vous vendent des ressources. Nous vous vendons des résultats.
              Powalyze intervient là où les méthodes classiques échouent : dans les zones de haute incertitude et de forte complexité technique.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1A1A] p-6 border border-white/5 hover:border-[#BFA76A]/30 transition-colors"
              >
                <Check className="text-[#BFA76A] mb-4" size={24} />
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropSection;