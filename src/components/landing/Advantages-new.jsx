import React from 'react';
import { Eye, Crosshair, Shield, Network } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    {
      icon: Eye,
      title: 'Clarté Radicale',
      description: 'Finis les rapports illisibles. Nous traduisons la complexité technique en décisions business claires.'
    },
    {
      icon: Crosshair,
      title: 'Exécution Chirurgicale',
      description: 'Pas de théorie. Nous sommes des opérationnels qui sécurisent vos livrables critiques.'
    },
    {
      icon: Shield,
      title: 'Indépendance Totale',
      description: 'Nos recommandations servent vos intérêts, pas ceux des grands éditeurs de logiciels.'
    },
    {
      icon: Network,
      title: 'Vision 360°',
      description: 'Nous connectons la stratégie (C-Level) avec la réalité terrain (Ingénierie) sans perte de signal.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ce que Powalyze change pour vous
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            La plupart des cabinets vous vendent des ressources. Nous vous vendons des résultats. 
            Powalyze intervient là où les méthodes classiques échouent : dans les zones de haute 
            incertitude et de forte complexité technique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
