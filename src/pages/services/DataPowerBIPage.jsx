import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiDatabase, FiBarChart2, FiPieChart, FiTrendingUp, FiZap, FiLayers } from 'react-icons/fi';
import Footer from '@/components/landing/Footer';

const DataPowerBIPage = () => {
  const features = [
    { 
      title: 'Data Warehouse & Modélisation', 
      desc: 'Architecture de données optimisée pour la BI', 
      icon: FiDatabase,
      details: ['Modèle étoile/flocon', 'ETL/ELT Azure Data Factory', 'Data Lake Architecture', 'Qualité des données']
    },
    { 
      title: 'Dashboards Power BI', 
      desc: 'Visualisations interactives et temps réel', 
      icon: FiBarChart2,
      details: ['Executive dashboards', 'Rapports opérationnels', 'Mobile-first design', 'Drill-down avancé']
    },
    { 
      title: 'Analytics Avancée', 
      desc: 'IA et prédictions pour piloter vos décisions', 
      icon: FiTrendingUp,
      details: ['Prévisions ML', 'Détection anomalies', 'Clustering clients', 'Analyse prédictive']
    },
  ];

  const benefits = [
    'Centralisation de toutes vos sources de données',
    'Temps réel pour des décisions rapides',
    'Automatisation des rapports exécutifs',
    'Self-service BI pour tous les métiers',
    'ROI mesurable sur les investissements data',
    'Sécurité RLS (Row-Level Security)',
  ];

  const useCases = [
    {
      title: 'Dashboard Exécutif 360°',
      desc: 'Vue consolidée KPIs finances, RH, ventes, projets pour le COMEX',
      icon: FiPieChart,
      stats: '100% visibilité'
    },
    {
      title: 'Analytics Ventes & CRM',
      desc: 'Prévisions des ventes, scoring clients, analyse comportements',
      icon: FiTrendingUp,
      stats: '+25% CA'
    },
    {
      title: 'Pilotage Portefeuille Projets',
      desc: 'Suivi budget, ressources, délais avec alertes temps réel',
      icon: FiLayers,
      stats: '-30% dépassements'
    },
  ];

  const stats = [
    { value: '150+', label: 'Dashboards déployés' },
    { value: '50TB', label: 'Données traitées' },
    { value: '99.9%', label: 'Disponibilité' },
    { value: '<2s', label: 'Temps de réponse' },
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
          <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/50 text-sm font-medium mb-4 inline-block">
            Service Premium
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Data & Power BI
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transformez vos données en insights actionnables avec nos solutions de business intelligence et de visualisation avancée.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-purple-500/50 transition-all">
              <div className="w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
                <feature.icon className="text-purple-400" size={32} />
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
              <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="text-purple-400" size={24} />
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

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à exploiter vos données ?</h2>
            <p className="text-gray-300 mb-6">
              Nos data engineers et experts Power BI créent des dashboards qui transforment vos données en décisions stratégiques.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-medium transition-all text-lg"
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

export default DataPowerBIPage;