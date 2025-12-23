import React from 'react';

/**
 * Section Features - Fonctionnalités Powalyze
 */
const Features = () => {
  const features = [
    {
      icon: '🎯',
      title: 'PMO Stratégique',
      description: 'Pilotage de portefeuille projets avec gouvernance complète, roadmap unifiée, et suivi des dépendances.',
      benefits: [
        'Vision 360° de tous vos projets',
        'Priorisation data-driven',
        'Gestion des risques proactive',
        'Reporting automatisé'
      ],
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      iconBg: 'bg-blue-500/10'
    },
    {
      icon: '📊',
      title: 'Data Intelligence',
      description: 'Dashboards Power BI temps réel connectés à vos sources de données. KPIs métier et IT unifiés.',
      benefits: [
        'Dashboards sur-mesure',
        'Alertes intelligentes',
        'Prédictions IA',
        'Intégration multi-sources'
      ],
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/10'
    },
    {
      icon: '⚡',
      title: 'Automatisation Intelligente',
      description: 'Workflows automatisés pour éliminer les tâches répétitives. Intégrations Azure, Jira, ServiceNow.',
      benefits: [
        'Création projets automatique',
        'Notifications intelligentes',
        'Synchronisation temps réel',
        'Audit trail complet'
      ],
      color: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500/30',
      iconBg: 'bg-yellow-500/10'
    },
    {
      icon: '🔐',
      title: 'Gouvernance & Conformité',
      description: 'Framework de gouvernance IT complet avec gestion des approbations, budgets, et conformité réglementaire.',
      benefits: [
        'Workflows d\'approbation',
        'Contrôle budgétaire',
        'Conformité RGPD/ISO',
        'Historique d\'audit'
      ],
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30',
      iconBg: 'bg-green-500/10'
    },
    {
      icon: '🤝',
      title: 'Collaboration Augmentée',
      description: 'Espaces collaboratifs par projet avec gestion documentaire, commentaires, et notifications contextuelles.',
      benefits: [
        'Espaces projet dédiés',
        'Versioning documentaire',
        'Chat intégré',
        'Partage sécurisé'
      ],
      color: 'from-pink-500/20 to-pink-600/20',
      borderColor: 'border-pink-500/30',
      iconBg: 'bg-pink-500/10'
    },
    {
      icon: '🔄',
      title: 'Intégrations Natives',
      description: 'Connecteurs pré-configurés pour Azure DevOps, Jira, ServiceNow, SAP, Teams, et tous vos outils métier.',
      benefits: [
        'API REST complète',
        'Webhooks temps réel',
        'SSO/Azure AD',
        '50+ connecteurs'
      ],
      color: 'from-cyan-500/20 to-cyan-600/20',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/10'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-dark-900 to-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-6 py-3 bg-gold-primary/10 border border-gold-primary/30 rounded-full mb-6">
            <span className="text-gold-primary font-semibold text-lg">✨ Fonctionnalités Puissantes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Une Plateforme <span className="text-gold-primary">Complète</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tous les outils dont vous avez besoin pour transformer votre gouvernance IT et piloter vos projets avec excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl border ${feature.borderColor} p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 group`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-xl mb-6 text-4xl group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-gray-300">
                    <span className="text-gold-primary mt-1 flex-shrink-0 font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gold-primary/10 to-gold-secondary/10 border-2 border-gold-primary/30 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Découvrir la Puissance de Powalyze ?
          </h3>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Planifiez une démo personnalisée et voyez comment ces fonctionnalités peuvent transformer votre organisation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/demo"
              className="px-10 py-5 bg-gradient-to-r from-gold-primary to-gold-secondary text-dark-primary text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-gold-primary/50 transition-all transform hover:scale-105"
            >
              Demander une Démo →
            </a>
            
            <a
              href="/pricing"
              className="px-10 py-5 bg-transparent border-2 border-gold-primary text-gold-primary text-xl font-bold rounded-xl hover:bg-gold-primary hover:text-dark-primary transition-all transform hover:scale-105"
            >
              Voir les Tarifs
            </a>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: '🚀', value: '6', label: 'Modules Principaux', sublabel: 'Plateforme complète' },
            { icon: '🔌', value: '50+', label: 'Intégrations', sublabel: 'Connecteurs natifs' },
            { icon: '⚡', value: '99.9%', label: 'Uptime', sublabel: 'Infrastructure Azure' },
            { icon: '🔒', value: 'ISO 27001', label: 'Certifié', sublabel: 'Sécurité maximale' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-dark-800/50 rounded-xl border border-dark-700 hover:border-gold-primary/30 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl font-bold text-gold-primary mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
