import React from 'react';
import { FiBarChart2, FiGitBranch, FiUsers, FiShield, FiZap, FiTrendingUp } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiBarChart2,
      title: 'Dashboards Power BI',
      description: 'Visualisez vos KPIs en temps réel avec des dashboards interactifs et personnalisables.'
    },
    {
      icon: FiGitBranch,
      title: 'Pilotage Multi-Projets',
      description: 'Gérez tous vos projets depuis une interface unifiée avec vue Kanban et Gantt.'
    },
    {
      icon: FiUsers,
      title: 'Collaboration Avancée',
      description: 'Centralisez les échanges, partagez les documents et suivez les décisions en un clic.'
    },
    {
      icon: FiShield,
      title: 'Gouvernance PMO',
      description: 'Cadres de gouvernance, gestion des risques et traçabilité complète des actions.'
    },
    {
      icon: FiZap,
      title: 'Automatisation IA',
      description: 'Génération automatique de rapports, prédictions et alertes intelligentes.'
    },
    {
      icon: FiTrendingUp,
      title: 'Analytics Prédictifs',
      description: 'Anticipez les dérives budgétaires et les retards grâce à l’IA.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Une Plateforme PMO Complète</h2>
          <p className="text-xl text-gray-400">Tout ce dont vous avez besoin pour piloter vos projets avec excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-lg p-6 hover:border-[#BFA76A]/50 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-[#BFA76A]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
