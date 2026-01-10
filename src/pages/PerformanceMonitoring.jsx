import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, TrendingUp, BarChart3, Zap, Users, Target,
  Gauge, AlertCircle, Clock, CheckCircle2, ArrowRight,
  Eye, Brain, Shield, Database
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PerformanceMonitoring = () => {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Suivi Temps Réel",
      description: "Monitoring continu de tous les KPI projets. Rafraîchissement automatique <5 minutes. Dashboard live pour pilotage immédiat."
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "KPIs Multi-Dimensionnels",
      description: "100+ indicateurs de performance : vélocité sprint, burndown, cycle time, lead time, throughput, qualité, dette technique."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Performance Équipe",
      description: "Analyse productivité individuelle et collective. Charge de travail, capacité disponible, taux d'utilisation optimal."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "OKRs et Objectifs",
      description: "Suivi des objectifs stratégiques. Alignement équipe-entreprise. Progression automatique avec scoring."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Tendances et Prévisions",
      description: "Analyse historique et projection future. Détection précoce des dérives. Alertes sur écarts vs baseline."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Reporting Automatisé",
      description: "Rapports hebdomadaires/mensuels générés automatiquement. Export Power BI, PDF, Excel. Diffusion planifiée."
    }
  ];

  const performanceMetrics = [
    {
      category: "Vélocité et Débit",
      metrics: [
        { name: "Sprint Velocity", description: "Story points livrés par sprint", target: "±10% stable" },
        { name: "Throughput", description: "Items complétés par période", target: ">25/sprint" },
        { name: "Cycle Time", description: "Temps moyen de réalisation", target: "<5 jours" },
        { name: "Lead Time", description: "Délai total de livraison", target: "<10 jours" }
      ]
    },
    {
      category: "Qualité et Efficacité",
      metrics: [
        { name: "Code Coverage", description: "Couverture tests automatisés", target: ">80%" },
        { name: "Defect Density", description: "Bugs par 1000 lignes de code", target: "<2" },
        { name: "Refactoring Rate", description: "Dette technique remboursée", target: "15%/sprint" },
        { name: "Code Review Time", description: "Temps moyen de review", target: "<4h" }
      ]
    },
    {
      category: "Équipe et Ressources",
      metrics: [
        { name: "Team Utilization", description: "Taux d'utilisation équipe", target: "70-85%" },
        { name: "Focus Time", description: "Temps de travail concentré", target: ">60%" },
        { name: "Meeting Load", description: "Charge réunions/semaine", target: "<25%" },
        { name: "Context Switching", description: "Changements de tâche/jour", target: "<3" }
      ]
    }
  ];

  const dashboardFeatures = [
    {
      title: "Executive Dashboard",
      description: "Vue synthétique pour direction",
      metrics: ["Portfolio Health Score", "Budget vs Actual", "Timeline Adherence", "Strategic Alignment"]
    },
    {
      title: "Team Dashboard",
      description: "Performance opérationnelle équipe",
      metrics: ["Sprint Progress", "Velocity Trend", "Blocker Management", "WIP Limits"]
    },
    {
      title: "Project Dashboard",
      description: "Suivi détaillé par projet",
      metrics: ["Burndown Chart", "Cumulative Flow", "Defect Trend", "Resource Allocation"]
    }
  ];

  const benefits = [
    {
      stat: "100+",
      label: "KPIs Suivis",
      description: "Indicateurs de performance"
    },
    {
      stat: "<5min",
      label: "Rafraîchissement",
      description: "Données temps réel"
    },
    {
      stat: "360°",
      label: "Vue Complète",
      description: "Équipe, projet, portfolio"
    },
    {
      stat: "90%",
      label: "Automation",
      description: "Reporting automatisé"
    }
  ];

  const alertTypes = [
    {
      type: "Dérive Performance",
      trigger: "Vélocité <15% baseline",
      action: "Alerte PMO + analyse cause racine"
    },
    {
      type: "Surcharge Équipe",
      trigger: "Utilisation >90% sur 2 sprints",
      action: "Alerte manager + réallocation ressources"
    },
    {
      type: "Risque Qualité",
      trigger: "Defect density >3 ou coverage <70%",
      action: "Review qualité obligatoire"
    },
    {
      type: "Blocage Critique",
      trigger: "Tâche bloquée >3 jours",
      action: "Escalade automatique"
    }
  ];

  return (
    <>
      <SEO 
        title="Performance Monitoring - Suivi KPIs et Productivité Équipe"
        description="Monitoring temps réel de la performance projets et équipes. 100+ KPIs, dashboards interactifs, alertes intelligentes et reporting automatisé."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-blue-400/30 bg-blue-400/10 rounded-full mb-8 text-sm text-blue-400">
              <Activity className="w-4 h-4" />
              <span>Performance Monitoring</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Suivi Performance<br />
              <span className="text-[#4A9EFF]">Temps Réel</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Monitoring continu des KPIs projets et productivité équipe. Dashboards live, alertes intelligentes et reporting automatisé.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#4A9EFF] text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Activer Monitoring
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-blue-400 hover:text-blue-400 transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir Dashboard Live
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
                  <div className="text-4xl font-light text-[#4A9EFF] mb-2">{benefit.stat}</div>
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
              Capacités de Monitoring
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Suivi complet de la performance à tous les niveaux
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
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-blue-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-600/20 rounded-sm flex items-center justify-center mb-6 text-[#4A9EFF] group-hover:bg-blue-600/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              KPIs de Performance
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Indicateurs clés pour piloter efficacement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {performanceMetrics.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <h3 className="text-xl font-light text-white mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.metrics.map((metric, i) => (
                    <div key={i} className="border-l-2 border-blue-400/30 pl-4">
                      <div className="text-sm font-medium text-white mb-1">{metric.name}</div>
                      <div className="text-xs text-white/60 mb-2">{metric.description}</div>
                      <div className="text-xs text-blue-400">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Dashboards Temps Réel
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Vues adaptées à chaque rôle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dashboardFeatures.map((dashboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <BarChart3 className="w-8 h-8 text-[#4A9EFF] mb-4" />
                <h3 className="text-xl font-light text-white mb-2">{dashboard.title}</h3>
                <p className="text-white/60 font-light mb-6">{dashboard.description}</p>
                <div className="space-y-2">
                  {dashboard.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-white/60">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Alerts Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#1A1A1A] to-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Alertes Intelligentes
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Détection automatique des dérives et actions recommandées
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {alertTypes.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-white mb-2">{alert.type}</h3>
                    <div className="mb-4">
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Déclencheur</div>
                      <div className="text-sm text-white/60">{alert.trigger}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Action Automatique</div>
                      <div className="text-sm text-white font-light">{alert.action}</div>
                    </div>
                  </div>
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
            Prêt à Monitorer Vos Performances<br />en Temps Réel ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Activez le monitoring et prenez le contrôle de votre performance
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-[#4A9EFF] text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Démarrer Gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-blue-400 hover:text-blue-400 transition-all rounded-sm text-sm uppercase tracking-wide"
            >
              Demander une Démo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PerformanceMonitoring;
