import React from 'react';
import { FiClock, FiEye, FiZap, FiUsers } from 'react-icons/fi';

const Advantages = () => {
  const advantages = [
    {
      icon: FiClock,
      stat: '70%',
      label: 'Gain de temps',
      description: 'sur la production de rapports'
    },
    {
      icon: FiEye,
      stat: '360°',
      label: 'Visibilité',
      description: 'sur tous vos projets en temps réel'
    },
    {
      icon: FiZap,
      stat: '3x',
      label: 'Décisions plus rapides',
      description: 'grâce aux dashboards'
    },
    {
      icon: FiUsers,
      stat: '100%',
      label: 'Collaboration',
      description: 'équipes alignées et engagées'
    }
  ];

  return (
    <section id="avantages" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Résultats Mesurables</h2>
          <p className="text-xl text-gray-400">Des impacts concrets sur votre performance PMO</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, idx) => {
            const Icon = advantage.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#BFA76A]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-[#BFA76A]" size={32} />
                </div>
                <div className="text-5xl font-bold text-[#BFA76A] mb-2">{advantage.stat}</div>
                <div className="text-xl font-semibold text-white mb-2">{advantage.label}</div>
                <div className="text-gray-400">{advantage.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
