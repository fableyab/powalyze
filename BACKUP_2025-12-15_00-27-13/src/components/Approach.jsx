import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Cog, TrendingUp } from 'lucide-react';

const Approach = () => {
  const approaches = [
    {
      icon: Target,
      title: "Alignement Stratégique",
      description: "Nous commençons par comprendre en profondeur vos objectifs business pour garantir que chaque action technique sert votre vision stratégique. Notre approche assure une cohérence totale entre IT et métier."
    },
    {
      icon: Lightbulb,
      title: "Innovation Pragmatique",
      description: "Nous combinons les meilleures pratiques du marché avec des solutions innovantes adaptées à votre contexte. Notre expertise permet d'identifier les technologies et méthodes qui apportent une réelle valeur ajoutée."
    },
    {
      icon: Cog,
      title: "Excellence Opérationnelle",
      description: "Processus rigoureux, outils performants et méthodologies éprouvées garantissent une exécution sans faille. Nous mettons en place les mécanismes de pilotage qui assurent qualité et efficacité à tous les niveaux."
    },
    {
      icon: TrendingUp,
      title: "Amélioration Continue",
      description: "Notre démarche inclut des cycles réguliers de mesure, d'analyse et d'optimisation. Nous capitalisons sur les retours d'expérience pour améliorer constamment la performance de vos programmes IT."
    }
  ];

  return (
    <section id="approche" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre Approche
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une méthodologie éprouvée pour transformer vos défis en succès
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {approaches.map((approach, index) => {
            const Icon = approach.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-4 inline-block p-4 bg-blue-100 rounded-lg">
                  <Icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {approach.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Approach;