import React from 'react';
import { FiFileSpreadsheet, FiAlertCircle, FiUsers, FiTrendingDown } from 'react-icons/fi';

const PainPoints = () => {
  const painPoints = [
    {
      icon: FiFileSpreadsheet,
      title: 'Dispersion des données',
      description: 'Vos données de projet sont éparpillées dans des fichiers Excel, emails et outils non connectés.'
    },
    {
      icon: FiAlertCircle,
      title: 'Manque de visibilité',
      description: 'Impossible d’avoir une vue d’ensemble claire sur l’état global de vos projets en temps réel.'
    },
    {
      icon: FiUsers,
      title: 'Communication fragmentée',
      description: 'Les équipes manquent d’alignement, les mises à jour se perdent et les décisions sont retardées.'
    },
    {
      icon: FiTrendingDown,
      title: 'Décisions au feeling',
      description: 'Sans KPIs fiables ni dashboards centralisés, vous pilotez à l’instinct au lieu des faits.'
    }
  ];

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Les Challenges du PMO Moderne</h2>
          <p className="text-xl text-gray-400">Vous reconnaissez ces problèmes ?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {painPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-lg p-6 hover:border-[#BFA76A]/50 transition-all">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4">
                  <Icon className="text-red-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
