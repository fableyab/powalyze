import React from 'react';
import { AlertCircle, FileSpreadsheet, Users, TrendingDown } from 'lucide-react';

const PainPoints = () => {
  const problems = [
    {
      icon: <FileSpreadsheet className="w-8 h-8" />,
      title: "Dispersion des données",
      description: "Vos projets sont éparpillés dans Excel, SharePoint, emails... Impossible d'avoir une vue d'ensemble claire et à jour."
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Manque de visibilité",
      description: "Vous découvrez les dérapages budgétaires et les retards quand il est trop tard. Aucune alerte proactive."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Communication fragmentée",
      description: "Les équipes, sponsors et directions ne parlent pas le même langage. Les reportings prennent des jours à produire."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Décisions au feeling",
      description: "Sans données consolidées et fiables, les arbitrages stratégiques se font à l'instinct, pas aux faits."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Les défis du <span className="text-powalyze-blue">pilotage PMO</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les directions de projets et PMO font face à des problèmes récurrents qui freinent la performance et la gouvernance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="card-premium group hover:border-red-200 hover:shadow-lg transition-all"
            >
              <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            ❌ Résultat : perte de temps, de budget, et de crédibilité
          </p>
          <p className="text-gray-600">
            Il est temps de centraliser, clarifier et piloter avec un vrai cockpit PMO.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
