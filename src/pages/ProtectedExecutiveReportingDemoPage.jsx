import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveExamples from '@/components/Service/InteractiveExamples';
import { ArrowLeft, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProtectedExecutiveReportingDemoPage = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: 'Reporting Exécutif - Démonstration Interactive',
      subtitle: 'La vision claire dont votre COMEX a besoin',
      description: 'Visualisez les indicateurs clés de performance, analysez les tendances et prenez des décisions éclairées en temps réel.',
      keyMetrics: [
        {
          title: 'Revenue & Performance',
          description: 'Suivi des revenus vs objectifs, analyse des tendances mensuelles et trimestrielles',
          icon: TrendingUp
        },
        {
          title: 'KPI Tracking',
          description: 'Tableaux de bord complets avec 7+ indicateurs critiques pour le pilotage stratégique',
          icon: BarChart3
        },
        {
          title: 'Portfolio Analysis',
          description: 'Vue synthétique de l\'état du portefeuille, allocation des budgets et ROI par projet',
          icon: PieChartIcon
        }
      ]
    },
    en: {
      title: 'Executive Reporting - Interactive Demo',
      subtitle: 'The clear vision your COMEX needs',
      description: 'View key performance indicators, analyze trends and make informed decisions in real-time.',
      keyMetrics: [
        {
          title: 'Revenue & Performance',
          description: 'Revenue tracking vs targets, monthly and quarterly trend analysis',
          icon: TrendingUp
        },
        {
          title: 'KPI Tracking',
          description: 'Complete dashboards with 7+ critical indicators for strategic management',
          icon: BarChart3
        },
        {
          title: 'Portfolio Analysis',
          description: 'Synthetic view of portfolio status, budget allocation and ROI by project',
          icon: PieChartIcon
        }
      ]
    },
    de: {
      title: 'Executive Reporting - Interaktive Demo',
      subtitle: 'Die klare Vision, die Ihr COMEX benötigt',
      description: 'Zeigen Sie wichtige Leistungsindikatoren, analysieren Sie Trends und treffen Sie fundierte Entscheidungen in Echtzeit.',
      keyMetrics: [
        {
          title: 'Revenue & Performance',
          description: 'Verfolgung der Einnahmen vs. Ziele, Analyse monatlicher und vierteljährlicher Trends',
          icon: TrendingUp
        },
        {
          title: 'KPI Tracking',
          description: 'Vollständige Dashboards mit 7+ kritischen Indikatoren für die strategische Verwaltung',
          icon: BarChart3
        },
        {
          title: 'Portfolio Analysis',
          description: 'Synthetische Ansicht des Portfoliostatus, Budgetallokation und ROI pro Projekt',
          icon: PieChartIcon
        }
      ]
    }
  };

  const t = content[language] || content.fr;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans">
      <Navbar />
      
      <main>
        {/* Header Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-[#050505] to-[#050505] z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/services/reporting-executif" className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-white transition-colors mb-8">
              <ArrowLeft size={18} />
              Retour aux services
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t.title}</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl">{t.subtitle}</p>
              <p className="text-gray-400">{t.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Examples Section */}
        <section className="py-20 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <InteractiveExamples type="powerbi" />
            
            {/* Key Metrics Grid */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Indicateurs Clés du Reporting</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.keyMetrics.map((metric, i) => {
                  const IconComponent = metric.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all"
                    >
                      <IconComponent className="text-[#BFA76A] mb-4" size={32} />
                      <h3 className="text-lg font-bold text-white mb-3">{metric.title}</h3>
                      <p className="text-gray-400">{metric.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-20 bg-gradient-to-r from-[#1A1A1A] to-[#111] rounded-xl border border-white/10 p-12">
              <h2 className="text-2xl font-bold mb-8">Avantages de notre Reporting Exécutif</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-2 shrink-0"></div>
                  <span className="text-gray-300">Temps de production réduit de 70% vs reporting manuel</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-2 shrink-0"></div>
                  <span className="text-gray-300">Mise à jour automatique des données en temps réel</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-2 shrink-0"></div>
                  <span className="text-gray-300">Visualisations interactives pour une meilleure compréhension</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-2 shrink-0"></div>
                  <span className="text-gray-300">Drill-down capabilities pour une analyse approfondie</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#BFA76A] mt-2 shrink-0"></div>
                  <span className="text-gray-300">Alertes automatiques pour les déviations importantes</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Transformez votre reporting exécutif</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Donnez à votre COMEX la visibilité dont il a besoin pour piloter l\'organisation avec confiance.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-[#BFA76A] text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors"
            >
              Planifier une démonstration
            </Link>
          </motion.div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ProtectedExecutiveReportingDemoPage;
