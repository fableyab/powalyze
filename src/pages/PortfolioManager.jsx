import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, TrendingUp, Target, BarChart3, PieChart, 
  AlertCircle, Users, Calendar, DollarSign, Activity,
  ArrowRight, CheckCircle2, Zap, Shield
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const PortfolioManager = () => {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Vue Consolidée Multi-Portefeuilles",
      description: "Visualisez l'ensemble de vos portefeuilles, programmes et projets dans une interface unifiée. Hiérarchie complète avec drill-down illimité."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Alignement Stratégique",
      description: "Matrice de scoring stratégique pour prioriser les initiatives selon vos critères business. OKR tracking et contribution aux objectifs corporate."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dashboard Exécutif Temps Réel",
      description: "KPI critiques actualisés en temps réel : budget, planning, ressources, risques. Indicateurs de santé portfolio instantanés."
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Analyse de Capacité",
      description: "Équilibrage automatique de la charge de travail. Détection des surcharges et recommandations d'arbitrage intelligentes."
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Early Warning System",
      description: "Détection précoce des dérives (budget, délais, scope). Alertes intelligentes avec analyse d'impact cascade sur le portfolio."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Gouvernance & Reporting",
      description: "Rapports exécutifs automatisés pour Comités de Direction. Templates personnalisables et distribution planifiée."
    }
  ];

  const benefits = [
    {
      stat: "360°",
      label: "Vue Consolidée",
      description: "Tous vos projets et portefeuilles dans une seule interface"
    },
    {
      stat: "85%",
      label: "Temps Gagné",
      description: "Sur la collecte et consolidation des données portfolio"
    },
    {
      stat: "100%",
      label: "Visibilité Temps Réel",
      description: "Dashboard actualisé automatiquement sans effort manuel"
    },
    {
      stat: "3x",
      label: "Meilleure Priorisation",
      description: "Décisions d'arbitrage basées sur données objectives"
    }
  ];

  const useCases = [
    {
      role: "Chief Portfolio Officer",
      challenge: "Impossible d'avoir une vision consolidée du portefeuille IT",
      solution: "Dashboard exécutif temps réel avec vue 360° de tous les projets stratégiques"
    },
    {
      role: "PMO Director",
      challenge: "Reporting manuel fastidieux pour les Comités de Direction",
      solution: "Rapports exécutifs auto-générés avec KPI critiques et analyse d'impact"
    },
    {
      role: "Program Manager",
      challenge: "Difficile d'identifier les dépendances entre projets",
      solution: "Matrice de dépendances interactive avec analyse d'impact cascade"
    }
  ];

  return (
    <>
      <SEO 
        title="Portfolio Manager - Vision Consolidée de Tous Vos Projets"
        description="Plateforme de gestion de portefeuille de projets entreprise. Vue 360°, alignement stratégique, analyse de capacité et reporting exécutif automatisé."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,106,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-8 text-sm text-[#D4AF37]">
              <Briefcase className="w-4 h-4" />
              <span>Portfolio Manager</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Vision Consolidée de<br />
              <span className="text-[#D4AF37]">Tous Vos Projets</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Gérez vos portefeuilles, programmes et initiatives stratégiques avec une visibilité temps réel et une gouvernance structurée
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#4A9EFF] hover:text-white transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Démarrer Gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir la Démo
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
                  <div className="text-4xl font-light text-[#D4AF37] mb-2">{benefit.stat}</div>
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
              Fonctionnalités Clés
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Une plateforme complète pour piloter vos portefeuilles de projets stratégiques
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
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-sm flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Cas d'Usage
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comment Portfolio Manager transforme la gestion de portefeuille
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
                <div className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider mb-4">
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
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
            Prêt à Transformer Votre<br />Gestion de Portefeuille ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Accédez à Portfolio Manager et commencez à piloter vos projets stratégiques dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#4A9EFF] hover:text-white transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Créer un Compte Gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide"
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

export default PortfolioManager;
