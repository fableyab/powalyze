import React from 'react';

/**
 * Section Cas d'Usage - TEXTES LISIBLES ET CLAIRS
 */
const UseCases = () => {
  const cases = [
    {
      title: 'Fusion Bancaire',
      subtitle: 'Harmonisation des systèmes d\'information',
      challenge: 'Deux banques fusionnaient avec des systèmes legacy incompatibles.',
      risk: 'Risque de -25% de productivité opérationnelle',
      solution: [
        'Audit complet des SI des 2 banques',
        'Architecture cible unique définie',
        'Plan de migration progressive sur 18 mois',
        'PMO de transformation avec 15+ workstreams',
        'Dashboards de pilotage temps réel'
      ],
      results: [
        { label: 'Retards Projets', value: '-25%', color: 'text-green-400' },
        { label: 'Coûts Opérationnels', value: '-18%', color: 'text-green-400' }
      ],
      duration: '18 mois',
      client: 'Groupe Bancaire',
      icon: '🏦'
    },
    {
      title: 'Transformation Agile',
      subtitle: 'Migration du Cycle en V vers SAFe',
      challenge: 'Assurance immobilière avec processus en Cycle en V rigide.',
      risk: 'Cycles de release de 18 mois - Time-to-market critique',
      solution: [
        'Formation SAFe pour 200+ collaborateurs',
        'Mise en place de 8 Agile Release Trains',
        'Refonte complète de la gouvernance',
        'Outillage moderne (Jira, Confluence, Azure DevOps)',
        'Accompagnement des équipes pendant 12 mois'
      ],
      results: [
        { label: 'Time-to-Market', value: '÷2', color: 'text-blue-400' },
        { label: 'Qualité Livrables', value: '+35%', color: 'text-blue-400' }
      ],
      duration: '12 mois',
      client: 'Assurance Immobilière',
      icon: '🚀'
    },
    {
      title: 'Gouvernance Cloud',
      subtitle: 'Mise en place FinOps & Cost Optimization',
      challenge: 'Groupe industriel avec dépenses cloud incontrôlées.',
      risk: 'Budget cloud: +45% en 1 an - Aucune visibilité par département',
      solution: [
        'Gouvernance Cloud avec tagging automatique',
        'Dashboards FinOps Power BI temps réel',
        'Automatisation de scaling intelligent',
        'Optimisation des réservations',
        'Formation des équipes DevOps'
      ],
      results: [
        { label: 'Économies Cloud', value: '-30%', color: 'text-green-400' },
        { label: 'Visibilité Coûts', value: '100%', color: 'text-green-400' },
        { label: 'Adoption Gouvernance', value: '+85%', color: 'text-blue-400' }
      ],
      duration: '6 mois',
      client: 'Groupe Industriel',
      icon: '☁️'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-black via-dark-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Cas d'Usage <span className="text-gold-primary">Réels</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nous avons transformé des défis complexes en succès mesurables
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-12 md:space-y-16">
          {cases.map((useCase, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-sm rounded-2xl border border-gold-primary/20 p-8 md:p-12 hover:border-gold-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-primary/10"
            >
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">{useCase.icon}</div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gold-primary font-semibold">
                    {useCase.subtitle}
                  </p>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-8 p-6 bg-red-500/10 border-l-4 border-red-500 rounded-r-lg">
                <h4 className="text-xl font-bold text-white mb-3">💥 Défi</h4>
                <p className="text-lg text-gray-200 mb-2 leading-relaxed">{useCase.challenge}</p>
                <p className="text-lg text-red-400 font-semibold leading-relaxed">{useCase.risk}</p>
              </div>

              {/* Solution */}
              <div className="mb-8 p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg">
                <h4 className="text-xl font-bold text-white mb-4">✨ Solution</h4>
                <ul className="space-y-3">
                  {useCase.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-gray-200 leading-relaxed">
                      <span className="text-gold-primary mt-1 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results Grid */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-6">📊 Résultats</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {useCase.results.map((result, i) => (
                    <div
                      key={i}
                      className="bg-dark-700/50 rounded-xl p-6 text-center border border-dark-600 hover:border-gold-primary/30 transition-all"
                    >
                      <div className={`text-4xl md:text-5xl font-bold ${result.color} mb-2`}>
                        {result.value}
                      </div>
                      <div className="text-base md:text-lg text-gray-300 font-medium">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-dark-700 text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-gold-primary">⏱️</span>
                  <span className="text-lg"><strong>Durée:</strong> {useCase.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold-primary">🏢</span>
                  <span className="text-lg"><strong>Client:</strong> {useCase.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gold-primary/10 to-gold-secondary/10 border-2 border-gold-primary/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Votre cas pourrait être le prochain succès Powalyze
            </h3>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gold-primary text-dark-primary text-xl font-bold rounded-lg hover:bg-gold-secondary transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Discuter de votre Cas →
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { label: 'Clients Satisfaits', value: '50+', sub: 'Entreprises leaders' },
            { label: 'Projets Réussis', value: '200+', sub: 'Transformations complétées' },
            { label: 'Amélioration Moyenne', value: '+35%', sub: 'Gains de productivité' },
            { label: 'Expertise Reconnue', value: '12+', sub: 'Années d\'expérience' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-gold-primary/30 transition-all"
            >
              <div className="text-4xl font-bold text-gold-primary mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
