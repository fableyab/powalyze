import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiFileText, FiPieChart, FiTrendingUp, FiCalendar, FiMail, FiZap } from 'react-icons/fi';
import Footer from '@/components/landing/Footer';

const ReportingExecutifPage = () => {
  const features = [
    { 
      title: 'Rapports Exécutifs Automatisés', 
      desc: 'Rapports COMEX générés automatiquement chaque mois', 
      icon: FiFileText,
      details: ['Templates personnalisés', 'Export PDF/PPT', 'Branding entreprise', 'Multi-langues']
    },
    { 
      title: 'Dashboards Live', 
      desc: 'Tableaux de bord temps réel pour la direction', 
      icon: FiPieChart,
      details: ['KPIs exécutifs', 'Vue consolidée', 'Drill-down projets', 'Alerts automatiques']
    },
    { 
      title: 'Insights & Recommandations', 
      desc: 'Analyse prédictive et recommandations IA', 
      icon: FiTrendingUp,
      details: ['Prévisions budget', 'Détection risques', 'Opportunités d\'optimisation', 'Benchmarking']
    },
  ];

  const benefits = [
    'Gain de temps : 80% sur la production de rapports',
    'Visibilité temps réel pour le COMEX',
    'Standardisation des reportings',
    'Alertes automatiques sur déviations',
    'Historique et tendances sur 3 ans',
    'Sécurité et contrôle dès accès',
  ];

  const reportTypes = [
    {
      title: 'Rapport Exécutif Mensuel',
      desc: 'Synthèse stratégique pour le COMEX avec KPIs, budget, risques',
      icon: FiFileText,
      frequency: 'Mensuel',
      pages: '15-20 pages'
    },
    {
      title: 'Dashboard Portefeuille',
      desc: 'Vue 360° de tous les projets en temps réel avec drill-down',
      icon: FiPieChart,
      frequency: 'Temps réel',
      pages: 'Interactif'
    },
    {
      title: 'Rapport Budgétaire',
      desc: 'Suivi dépenses vs budget avec prévisions et alertes',
      icon: FiTrendingUp,
      frequency: 'Hebdomadaire',
      pages: '8-10 pages'
    },
    {
      title: 'Reporting Agile',
      desc: 'Sprint reviews, velocity, burndown pour les équipes agiles',
      icon: FiCalendar,
      frequency: 'Sprint (2 sem)',
      pages: '5-7 pages'
    },
    {
      title: 'Alertes Automatiques',
      desc: 'Notifications email/Teams sur dépassements et risques',
      icon: FiMail,
      frequency: 'Instantané',
      pages: 'Email'
    },
    {
      title: 'Rapport Annuel',
      desc: 'Bilan complet de léannée avec ROI et recommandations',
      icon: FiZap,
      frequency: 'Annuel',
      pages: '40-50 pages'
    },
  ];

  const stats = [
    { value: '80%', label: 'Gain de temps' },
    { value: '247', label: 'Rapports générés/mois' },
    { value: '<5min', label: 'Génération rapport' },
    { value: '100%', label: 'Précision données' },
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
          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 text-sm font-medium mb-4 inline-block">
            Service Premium
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Reporting Exécutif
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Automatisez vos rapports exécutifs et donnez à votre direction une visibilité temps réel sur les projets stratégiques.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-green-500/50 transition-all">
              <div className="w-16 h-16 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
                <feature.icon className="text-green-400" size={32} />
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

        {/* Report Types */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Types de rapports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map((report, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-lg p-6 hover:border-green-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <report.icon className="text-green-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{report.desc}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/50 text-xs">
                        {report.frequency}
                      </span>
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/50 text-xs">
                        {report.pages}
                      </span>
                    </div>
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

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à automatiser vos rapports ?</h2>
            <p className="text-gray-300 mb-6">
              Nos experts configurent vos reportings exécutifs automatisés et vos dashboards COMEX temps réel.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium transition-all text-lg"
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

export default ReportingExecutifPage;