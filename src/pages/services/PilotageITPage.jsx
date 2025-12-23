import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiServer, FiShield, FiTrendingUp, FiZap, FiLayers, FiActivity } from 'react-icons/fi';
import Footer from '@/components/landing/Footer';

const PilotageITPage = () => {
  const features = [
    { 
      title: 'Architecture & Infrastructure', 
      desc: 'Optimisation de votre SI et modernisation cloud', 
      icon: FiServer,
      details: ['Cloud migration', 'Architecture microservices', 'DevOps & CI/CD', 'Infrastructure as Code']
    },
    { 
      title: 'Gouvernance IT', 
      desc: 'Standards ITIL, COBIT et ISO pour une IT d\'excellence', 
      icon: FiShield,
      details: ['ITIL v4 Service Management', 'COBIT 2019 Governance', 'ISO 27001 Sécurité', 'Conformité RGPD']
    },
    { 
      title: 'Performance & KPIs', 
      desc: 'Tableaux de bord IT et pilotage des SLA', 
      icon: FiTrendingUp,
      details: ['Monitoring temps réel', 'SLA/SLO tracking', 'Cost management', 'Capacity planning']
    },
  ];

  const benefits = [
    'Réduction des coûts IT jusqu\'\u00e0 40%',
    'Amélioration de la disponibilité > 99.9%',
    'Accélération des déploiements x5',
    'Conformité et audit continu',
    'Vision 360° de l\'infrastructure',
    'Automatisation des opérations',
  ];

  const useCases = [
    {
      title: 'Transformation Cloud',
      desc: 'Migration Azure/AWS avec optimisation des coûts et sécurisation',
      icon: FiZap,
      stats: '-35% coûts infra'
    },
    {
      title: 'Centre de Services IT',
      desc: 'Mise en place ITSM conformément ITIL avec portail self-service',
      icon: FiLayers,
      stats: '+60% satisfaction'
    },
    {
      title: 'Pilotage Stratégique IT',
      desc: 'Dashboards exécutifs et reporting COMEX temps réel',
      icon: FiActivity,
      stats: '100% visibilité'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#BFA76A] to-[#8B7355] rounded-lg flex items-center justify-center font-bold text-white text-xl">P</div>
            <span className="text-2xl font-bold text-white">POWALYZE</span>
          </Link>
          <Link to="/contact" className="bg-[#BFA76A] hover:bg-[#8B7355] text-white px-6 py-2 rounded-lg font-medium transition-all">
            Nous contacter
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50 text-sm font-medium mb-4 inline-block">
            Service Premium
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pilotage IT
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace pour soutenir vos objectifs métier.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-blue-500/50 transition-all">
              <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
                <feature.icon className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.desc}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCheck className="text-green-400" size={16} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Cas d'usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{useCase.desc}</p>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 text-xs font-medium">
                      {useCase.stats}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-[#111] border border-white/10 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Bénéfices mesurables</h2>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FiCheck className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à optimiser votre IT ?</h2>
            <p className="text-gray-300 mb-6">
              Nos experts vous accompagnent pour structurer une gouvernance IT performante et moderniser votre infrastructure.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-all text-lg"
            >
              Demander une démo <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PilotageITPage;