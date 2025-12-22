import React from 'react';
import { Briefcase, Target, Users2, LineChart } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "PMO / Portfolio Manager",
      benefit: "Pilotez l'ensemble du portefeuille",
      description: "Vision consolidée de tous les projets, priorisation stratégique, allocation des ressources optimale et reporting temps réel pour la direction."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Direction / Sponsor Exécutif",
      benefit: "Décidez en toute confiance",
      description: "Dashboard exécutif avec les KPIs critiques, alertes proactives sur les dérapages, arbitrages éclairés basés sur des données fiables."
    },
    {
      icon: <Users2 className="w-10 h-10" />,
      title: "Responsable de Programme",
      benefit: "Coordonnez vos projets interdépendants",
      description: "Vue transverse sur les dépendances, gestion des risques partagés, suivi des jalons critiques et synchronisation des équipes."
    },
    {
      icon: <LineChart className="w-10 h-10" />,
      title: "Chef de Projet",
      benefit: "Suivez et reportez simplement",
      description: "Saisie rapide de l'avancement, mise à jour automatique des tableaux de bord, exports prêts à l'emploi pour les comités de pilotage."
    }
  ];

  return (
    <section id="cas-usage" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Conçu pour <span className="text-powalyze-blue">tous les acteurs</span> du pilotage projet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Que vous soyez PMO, sponsor, responsable de programme ou chef de projet, Powalyze s'adapte à votre rôle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-powalyze-blue group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <div className="inline-block bg-powalyze-gold/10 text-powalyze-gold px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    ✓ {useCase.benefit}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            🎯 Un seul outil. Tous les rôles. Une vision partagée.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
