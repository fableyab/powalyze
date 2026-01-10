import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Brain, TrendingUp, AlertCircle, Lightbulb, Target, Sparkles } from 'lucide-react';

const AIAnalytics = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Analyse Prédictive',
      description: 'Prévision des dépassements budgétaires, retards de livrables, risques émergents et tendances futures basées sur l\'historique.'
    },
    {
      icon: <AlertCircle className="w-12 h-12" />,
      title: 'Détection d\'Anomalies',
      description: 'Identification automatique des patterns anormaux, écarts significatifs, signaux faibles et comportements inhabituels.'
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Recommandations Intelligentes',
      description: 'Suggestions d\'actions contextuelles, optimisation des ressources, priorisation assistée et meilleures pratiques.'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Forecasting Avancé',
      description: 'Prédiction de la vélocité, estimation de capacité, projection financière et scenarios "what-if" automatisés.'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Optimisation Continue',
      description: 'Apprentissage automatique sur vos données, amélioration des prédictions et ajustement dynamique des modèles.'
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Insights Automatiques',
      description: 'Génération automatique de rapports d\'analyse, identification des corrélations et insights actionnables.'
    }
  ];

  const capabilities = [
    'Prédiction des risques avant qu\'ils ne surviennent',
    'Détection automatique des projets en dérive',
    'Recommandations d\'allocation optimale des ressources',
    'Identification des patterns de succès/échec',
    'Analyse de sentiment et moral des équipes',
    'Scoring prédictif de performance projet'
  ];

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white">
      <SEO 
        title="AI Analytics - Powalyze"
        description="Analyse prédictive, détection d'anomalies et recommandations intelligentes pour une gouvernance augmentée par l'intelligence artificielle."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#1a2332] to-[#0A1A2F]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6">
              <Brain className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] uppercase tracking-wider">AI Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Intelligence Artificielle <br />
              <span className="text-[#D4AF37]">Au Service de Votre Gouvernance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Analyse prédictive, détection d'anomalies et recommandations intelligentes pour anticiper, optimiser et décider mieux.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c5a033] transition-all"
              >
                Découvrir l'IA
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-white text-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Capacités d'Intelligence Artificielle
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des algorithmes avancés au service de vos décisions stratégiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl hover:border-[#D4AF37] transition-all group"
              >
                <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-6 md:px-16 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Gouvernance <span className="text-[#D4AF37]">Augmentée</span> par l'IA
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                L'intelligence artificielle analyse en continu vos données pour vous alerter, recommander et optimiser vos décisions stratégiques.
              </p>
              <ul className="space-y-4">
                {capabilities.map((cap, idx) => (
                  <motion.li
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-gray-300">{cap}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a2332] to-[#0A1A2F] rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-gray-400">Insights et prédictions en temps réel</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Donnez une <span className="text-[#D4AF37]">Longueur d'Avance</span> à Votre Gouvernance
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Laissez l'IA analyser, prédire et recommander pour que vous puissiez vous concentrer sur les décisions stratégiques
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c5a033] transition-all"
              >
                Tester l'IA gratuitement
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Demander une démo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAnalytics;
