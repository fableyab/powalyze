import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function ServicesPage() {
  const services = [
    {
      id: 'pmo-governance',
      title: 'PMO Governance',
      description: 'Gouvernance et pilotage stratégique de votre portefeuille projets',
      icon: '🎯',
      color: 'blue',
      features: ['Framework PMO', 'Rôles et responsabilités', 'Procédures et standards', 'Gouvernance multi-projets'],
      path: '/services/pmo-governance',
    },
    {
      id: 'pmo-operations',
      title: 'PMO Operations',
      description: 'Opérations quotidiennes et support continu des projets',
      icon: '⚙️',
      color: 'green',
      features: ['Support projet', 'Outils et méthodes', 'Formation', 'Accompagnement terrain'],
      path: '/services/pmo-operations',
    },
    {
      id: 'pmo-strategy',
      title: 'PMO Strategy',
      description: 'Stratégie et transformation de votre organisation projet',
      icon: '📈',
      color: 'purple',
      features: ['Roadmap stratégique', 'Transformation PMO', 'Maturité projet', 'Vision long terme'],
      path: '/services/pmo-strategy',
    },
    {
      id: 'pmo-audit',
      title: 'PMO Audit',
      description: 'Audit et optimisation de vos processus et pratiques',
      icon: '🔍',
      color: 'orange',
      features: ['Audit complet', 'Diagnostics', 'Recommandations', 'Plans d’action'],
      path: '/services/pmo-audit',
    },
    {
      id: 'pmo-implementation',
      title: 'PMO Implementation',
      description: 'Implémentation et mise en place de votre PMO',
      icon: '🚀',
      color: 'red',
      features: ['Setup PMO', 'Outils et templates', 'Formation équipes', 'Go-live support'],
      path: '/services/pmo-implementation',
    },
    {
      id: 'pilotage-it',
      title: 'Pilotage IT',
      description: 'Pilotage et gouvernance IT pour maximiser la valeur business',
      icon: '💻',
      color: 'cyan',
      features: ['Gouvernance IT', 'Pilotage budgets', 'Reporting IT', 'Optimisation coûts'],
      path: '/services/pilotage-it',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
                Nos Services
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Solutions complètes de PMO et pilotage de projets IT pour transformer votre organisation
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
              >
                Nous contacter
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <Link
              key={service.id}
              to={service.path}
              className="group bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-2xl p-8 hover:border-[#BFA76A]/40 transition-all"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[service.color]} border flex items-center justify-center mb-6`}>
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#BFA76A] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <FiCheckCircle className="w-4 h-4 text-[#BFA76A] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-[#BFA76A] font-medium group-hover:gap-4 transition-all">
                En savoir plus
                <FiArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-t border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à transformer votre PMO ?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contactez-nous pour découvrir comment nos solutions peuvent accélérer vos projets
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
            >
              Démarrer maintenant
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}