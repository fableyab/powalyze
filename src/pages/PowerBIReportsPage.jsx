import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, TrendingUp, Zap, Database, RefreshCw,
  Share2, Download, Filter, Layout, Globe, Lock,
  ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PowerBIReportsPage = () => {
  const features = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Connecteurs Natifs",
      description: "Connexion directe à Supabase, PostgreSQL, APIs REST. Synchronisation automatique temps réel sans ETL complexe."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Rapports Interactifs",
      description: "20+ templates pré-configurés : Portfolio, Budget, Ressources, Risques. Drill-down illimité et filtres dynamiques."
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Visualisations Avancées",
      description: "Graphiques personnalisables, heatmaps, treemaps, Gantt charts. Bibliothèque de visuels custom Powalyze."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Actualisation Automatique",
      description: "Rafraîchissement planifié ou temps réel. Cache intelligent pour performances optimales."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Partage Sécurisé",
      description: "RLS (Row-Level Security) natif. Partage par email, lien ou embed sécurisé avec SSO."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Power BI Embedded",
      description: "Rapports intégrés dans l'interface Powalyze. Expérience unifiée sans quitter la plateforme."
    }
  ];

  const reportTemplates = [
    {
      name: "Executive Portfolio Dashboard",
      description: "Vue consolidée de tous les portfolios avec KPI critiques et Strategic Pulse",
      metrics: ["Budget", "Planning", "Risques", "Ressources"]
    },
    {
      name: "Financial Performance Report",
      description: "Analyse financière approfondie avec CAPEX/OPEX, ROI et prévisions",
      metrics: ["Budget Consommé", "ROI", "CAPEX/OPEX", "Forecast"]
    },
    {
      name: "Resource Utilization Analysis",
      description: "Taux d'utilisation, allocation par projet, compétences et planification capacité",
      metrics: ["Utilization", "Allocation", "Skills Gap", "Forecast"]
    },
    {
      name: "Risk Heatmap & Trends",
      description: "Visualisation matricielle des risques avec évolution temporelle",
      metrics: ["Risques Critiques", "Impact", "Probabilité", "Tendance"]
    },
    {
      name: "Project Delivery Performance",
      description: "On-time delivery, qualité, vélocité et analyse des écarts",
      metrics: ["On-Time %", "Quality Score", "Velocity", "Variances"]
    },
    {
      name: "Strategic Alignment Matrix",
      description: "Scoring stratégique des projets et contribution aux objectifs corporate",
      metrics: ["Strategic Score", "OKR Progress", "Value Delivery", "ROI"]
    }
  ];

  const benefits = [
    {
      stat: "20+",
      label: "Templates Prêts",
      description: "Rapports pré-configurés pour démarrage immédiat"
    },
    {
      stat: "100%",
      label: "Temps Réel",
      description: "Données actualisées automatiquement"
    },
    {
      stat: "Zero",
      label: "ETL Complexe",
      description: "Connecteurs natifs sans infrastructure lourde"
    },
    {
      stat: "RLS",
      label: "Sécurité Native",
      description: "Row-Level Security pour confidentialité données"
    }
  ];

  const useCases = [
    {
      role: "CFO / Finance Director",
      challenge: "Consolidation budget manuelle et rapports financiers fastidieux",
      solution: "Financial Performance Report avec drill-down projet par projet et forecasting automatique"
    },
    {
      role: "PMO Director",
      challenge: "Préparation PowerPoint pour Comité de Direction trop chronophage",
      solution: "Executive Dashboard auto-actualisé avec export PDF et partage sécurisé"
    },
    {
      role: "Resource Manager",
      challenge: "Difficile d'avoir une vue consolidée de l'utilisation des ressources",
      solution: "Resource Utilization Analysis avec détection surcharges et recommandations"
    }
  ];

  return (
    <>
      <SEO 
        title="Rapports Power BI - Connecteurs Natifs et Visualisations Avancées"
        description="Plateforme Power BI native avec 20+ templates pré-configurés, connecteurs temps réel et visualisations interactives pour piloter vos projets."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-400/30 bg-yellow-400/10 rounded-full mb-8 text-sm text-yellow-400">
              <BarChart3 className="w-4 h-4" />
              <span>Rapports Power BI</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Connecteurs Natifs &<br />
              <span className="text-yellow-400">Visualisations Avancées</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Transformez vos données projet en insights actionnables avec Power BI intégré nativement dans Powalyze
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-yellow-500 text-[#000000] font-medium hover:bg-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Accéder aux Rapports
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-yellow-400 hover:text-yellow-400 transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir les Templates
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-light text-yellow-400 mb-2">{benefit.stat}</div>
                  <div className="text-sm font-medium text-white mb-1">{benefit.label}</div>
                  <div className="text-xs text-white/60">{benefit.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Fonctionnalités Power BI
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Une intégration native et puissante pour vos rapports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-yellow-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-sm flex items-center justify-center mb-6 text-yellow-400 group-hover:bg-yellow-500/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Templates Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Templates Pré-Configurés
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              20+ rapports prêts à l'emploi pour démarrage immédiat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportTemplates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-yellow-400/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Layout className="w-6 h-6 text-yellow-400" />
                  <span className="text-xs text-white/40 uppercase tracking-wider">Template</span>
                </div>
                <h3 className="text-xl font-light mb-3 text-white">{template.name}</h3>
                <p className="text-white/60 font-light text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {template.metrics.map((metric, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-sm text-yellow-400"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Cas d'Usage
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comment Power BI transforme le reporting projet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <div className="text-sm font-medium text-yellow-400 uppercase tracking-wider mb-4">
                  {useCase.role}
                </div>
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Challenge</div>
                  <p className="text-white/60 font-light">{useCase.challenge}</p>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Solution Powalyze</div>
                  <p className="text-white font-light">{useCase.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#000000] to-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
            Prêt à Transformer Vos<br />Données en Insights ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Accédez aux rapports Power BI et commencez à visualiser vos projets dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-yellow-500 text-[#000000] font-medium hover:bg-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Démarrer Gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-yellow-400 hover:text-yellow-400 transition-all rounded-sm text-sm uppercase tracking-wide"
            >
              Contacter un Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PowerBIReportsPage;
