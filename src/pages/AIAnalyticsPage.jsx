import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, Sparkles, TrendingUp, Zap, Target, AlertCircle,
  Activity, BarChart3, Users, Eye, Shield, Cpu,
  ArrowRight, CheckCircle2, Database
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const AIAnalyticsPage = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Analyse Prédictive",
      description: "Machine Learning pour prédire les retards, dépassements budget et risques critiques. Précision de 85%+ sur 12 mois."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Détection d'Anomalies",
      description: "Algorithmes d'anomaly detection pour identifier les écarts inhabituels. Alertes intelligentes sur patterns anormaux."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Recommandations Intelligentes",
      description: "AI Decision Engine avec recommandations stratégiques. Suggestions d'arbitrage basées sur 50+ paramètres."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Prévisions Avancées",
      description: "Forecasting automatique budget, planning, ressources. Scénarios what-if avec simulation Monte Carlo."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "NLP pour Documentation",
      description: "Analyse automatique des CR de réunions, emails, documents. Extraction d'insights et détection de sentiments."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AutoML Pipeline",
      description: "Pipeline ML auto-optimisé et réentraîné. Modèles custom adaptés à votre contexte métier."
    }
  ];

  const aiCapabilities = [
    {
      category: "Prédiction de Risques",
      description: "Identifiez les projets à risque avant qu'ils ne dérivent",
      accuracy: "87%",
      examples: [
        "Prédiction retard >2 semaines: 89% précision",
        "Dépassement budget >10%: 85% précision",
        "Turnover équipe: 82% précision"
      ]
    },
    {
      category: "Détection d'Anomalies",
      description: "Repérez les comportements inhabituels dans vos données",
      accuracy: "92%",
      examples: [
        "Pics de consommation budget anormaux",
        "Vélocité projet en chute libre",
        "Surcharge ressources critiques"
      ]
    },
    {
      category: "Recommandations Stratégiques",
      description: "Décisions d'arbitrage guidées par l'IA",
      accuracy: "78%",
      examples: [
        "Réallocation ressources optimale",
        "Priorisation portfolio data-driven",
        "Plans de mitigation automatiques"
      ]
    },
    {
      category: "Prévisions Budgétaires",
      description: "Forecast précis avec bandes de confiance",
      accuracy: "83%",
      examples: [
        "Budget final prévu à 3 mois: ±5%",
        "Date livraison prévue: ±1 semaine",
        "Ressources nécessaires: ±10%"
      ]
    }
  ];

  const benefits = [
    {
      stat: "85%",
      label: "Précision Prédiction",
      description: "Sur les retards et dépassements budgétaires"
    },
    {
      stat: "70%",
      label: "Risques Anticipés",
      description: "Détection précoce avant impact critique"
    },
    {
      stat: "50%",
      label: "Temps Gagné",
      description: "Sur l'analyse et consolidation des données"
    },
    {
      stat: "3x",
      label: "Meilleures Décisions",
      description: "Arbitrages guidés par données objectives"
    }
  ];

  const useCases = [
    {
      role: "Data-Driven PMO",
      challenge: "Impossible de prédire les projets qui vont dériver sans analyse manuelle",
      solution: "AI Predictive Engine qui identifie les projets à risque 3 mois à l'avance"
    },
    {
      role: "Portfolio Manager",
      challenge: "Difficile de prioriser les initiatives sans données objectives",
      solution: "Scoring stratégique IA avec recommandations d'arbitrage automatiques"
    },
    {
      role: "Executive Leadership",
      challenge: "Prévisions budgétaires manuelles peu fiables et chronophages",
      solution: "Forecasting ML avec bandes de confiance et scénarios what-if automatiques"
    }
  ];

  return (
    <>
      <SEO 
        title="AI Analytics - Analyse Prédictive et Recommandations Intelligentes"
        description="Intelligence artificielle avancée pour prédire les risques, détecter les anomalies et générer des recommandations stratégiques automatiques."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,43,226,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-purple-400/30 bg-purple-400/10 rounded-full mb-8 text-sm text-purple-400">
              <Brain className="w-4 h-4" />
              <span>AI Analytics</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Analyse Prédictive &<br />
              <span className="text-purple-400">Recommandations Intelligentes</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Intelligence artificielle avancée pour anticiper les risques, optimiser vos décisions et maximiser la valeur de votre portefeuille
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-purple-600 text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Activer l'IA
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-purple-400 hover:text-purple-400 transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir la Démo IA
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
                  <div className="text-4xl font-light text-purple-400 mb-2">{benefit.stat}</div>
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
              Capacités IA Avancées
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Machine Learning et Deep Learning pour piloter vos projets
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
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-purple-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-purple-600/10 border border-purple-600/20 rounded-sm flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Modèles IA Pré-Entrainés
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Précision validée sur des milliers de projets réels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-light text-white">{capability.category}</h3>
                  <span className="text-2xl font-light text-purple-400">{capability.accuracy}</span>
                </div>
                <p className="text-white/60 font-light mb-6">{capability.description}</p>
                <div className="space-y-2">
                  {capability.examples.map((example, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60">{example}</span>
                    </div>
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
              Cas d'Usage IA
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comment l'IA transforme la gestion de projets
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
                <div className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
                  {useCase.role}
                </div>
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Challenge</div>
                  <p className="text-white/60 font-light">{useCase.challenge}</p>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Solution IA</div>
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
            Prêt à Piloter Vos Projets<br />avec Intelligence Artificielle ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Activez AI Analytics et transformez vos données en prédictions actionnables
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-purple-600 text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Démarrer Gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-purple-400 hover:text-purple-400 transition-all rounded-sm text-sm uppercase tracking-wide"
            >
              Contacter un Expert IA
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AIAnalyticsPage;
