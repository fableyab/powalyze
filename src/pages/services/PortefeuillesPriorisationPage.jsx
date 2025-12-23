import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiLayers, FiTarget, FiTrendingUp, FiDollarSign, FiClock, FiShield } from 'react-icons/fi';
import Footer from '@/components/landing/Footer';

const PortefeuillesPriorisationPage = () => {
  const features = [
    { 
      title: 'Portfolio Management', 
      desc: 'Gestion centralisée de tous vos projets et programmes', 
      icon: FiLayers,
      details: ['Vue 360° multi-projets', 'Dépendances & jalons', 'Capacity planning', 'Resource allocation']
    },
    { 
      title: 'Priorisation Intelligente', 
      desc: 'Scoring et matrice valeur/risque pour prioriser', 
      icon: FiTarget,
      details: ['Scoring multi-critères', 'Matrice Eisenhower', 'ROI & business case', 'Alignement stratégique']
    },
    { 
      title: 'Optimisation Budgétaire', 
      desc: 'Maximisez le ROI de vos investissements projets', 
      icon: FiDollarSign,
      details: ['Budget forecasting', 'Analyse coûts/bénéfices', 'Allocation optimale', 'Contrôle dépenses']
    },
  ];

  const benefits = [
    'Priorisation basée sur la valeur métier',
    'Visibilité temps réel sur le portefeuille',
    'Optimisation de l\'allocation des ressources',
    'Éviter la surcharge des équipes',
    'Alignement avec la stratégie d\'entreprise',
    'Réduction des projets à faible ROI',
  ];

  const useCases = [
    {
      title: 'Portefeuille Transformation',
      desc: 'Pilotage de 50+ projets digitaux avec priorisation valeur métier',
      icon: FiTrendingUp,
      stats: '+40% ROI'
    },
    {
      title: 'Optimisation Capacité',
      desc: 'Resource management et répartition charge entre projets',
      icon: FiClock,
      stats: '-25% surcharge'
    },
    {
      title: 'Gouvernance PMO',
      desc: 'Comité de priorisation mensuel avec dashboard exécutif',
      icon: FiShield,
      stats: '100% alignement'
    },
  ];

  const prioritizationMatrix = [
    { criteria: 'Valeur métier', weight: '30%', description: 'Impact sur le CA ou la productivité' },
    { criteria: 'Alignement stratégique', weight: '25%', description: 'Adéquation avec objectifs COMEX' },
    { criteria: 'ROI financier', weight: '20%', description: 'Retour sur investissement mesuré' },
    { criteria: 'Urgence/Risque', weight: '15%', description: 'Criticité et contraintes réglementaires' },
    { criteria: 'Faisabilité', weight: '10%', description: 'Complexité technique et ressources' },
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
          <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/50 text-sm font-medium mb-4 inline-block">
            Service Premium
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Portefeuilles & Priorisation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Gérez efficacement votre portefeuille de projets avec une priorisation intelligente basée sur la valeur métier.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-orange-500/50 transition-all">
              <div className="w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center mb-6">
                <feature.icon className="text-orange-400" size={32} />
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

        {/* Prioritization Matrix */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Méthode de priorisation</h2>
          <div className="bg-[#111] border border-white/10 rounded-lg p-8">
            <div className="space-y-4">
              {prioritizationMatrix.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#0A0A0A] rounded-lg border border-white/5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-400">{item.weight}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{item.criteria}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Cas d'usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-orange-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="text-orange-400" size={24} />
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

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à optimiser votre portefeuille ?</h2>
            <p className="text-gray-300 mb-6">
              Nos experts vous accompagnent pour mettre en place une gouvernance de portefeuille et une méthode de priorisation robuste.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium transition-all text-lg"
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

export default PortefeuillesPriorisationPage;