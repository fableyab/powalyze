import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, Zap, BarChart3, GitBranch } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: <BarChart3 />, title: 'Dashboards Power BI', desc: 'Visualisez vos KPIs en temps réel' },
    { icon: <GitBranch />, title: 'Pilotage Multi-Projets', desc: 'Vue 360° sur votre portefeuille' },
    { icon: <Users />, title: 'Collaboration Équipe', desc: 'Travaillez ensemble efficacement' },
    { icon: <Shield />, title: 'Gouvernance PMO', desc: 'Standards et processus certifiés' },
    { icon: <Zap />, title: 'Automatisation IA', desc: 'Gagnez jusqu’à 70% de temps' },
    { icon: <TrendingUp />, title: 'Analytics Avancés', desc: 'Décisions basées sur les données' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Fonctionnalités <span className="text-powalyze-blue">Puissantes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tous les outils dont vous avez besoin pour piloter vos projets avec excellence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div key={i} className="card-premium group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <div className="text-powalyze-blue mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
