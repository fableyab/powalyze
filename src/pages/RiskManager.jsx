import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, TrendingUp, Target, Brain, Zap,
  Activity, BarChart3, Users, Clock, AlertCircle, CheckCircle2,
  ArrowRight, Sparkles, Network
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const RiskManager = () => {
  const features = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Identification Précoce",
      description: "Détection automatique des risques avant qu'ils ne deviennent critiques. Machine Learning pour identifier les patterns de risque."
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Analyse de Propagation",
      description: "Matrice d'impact cascade pour visualiser comment un risque se propage. Simulation de scénarios worst-case automatisée."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Risk Scoring",
      description: "Score de risque intelligent basé sur 30+ paramètres. Priorisation automatique selon impact business réel."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Plans de Mitigation",
      description: "Bibliothèque de plans d'action pré-configurés. Templates personnalisables avec workflow d'escalade automatique."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Risk Heatmap",
      description: "Visualisation matricielle Probabilité x Impact. Drill-down par catégorie, projet ou portefeuille."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Conformité & Audit Trail",
      description: "Historique complet des risques et décisions. Reporting réglementaire automatisé (SOX, GDPR)."
    }
  ];

  const riskCategories = [
    {
      category: "Risques Critiques",
      count: 3,
      color: "text-red-400",
      risks: [
        { id: "R-001", title: "Pénurie de compétences cloud", impact: "Critique", prob: "90%" },
        { id: "R-002", title: "Dépassement budget Q2", impact: "Majeur", prob: "75%" },
        { id: "R-003", title: "Retard livraison projet Alpha", impact: "Critique", prob: "85%" }
      ]
    },
    {
      category: "Risques Majeurs",
      count: 7,
      color: "text-orange-400",
      risks: [
        { id: "R-004", title: "Intégration API legacy", impact: "Majeur", prob: "65%" },
        { id: "R-005", title: "Turnover équipe projet", impact: "Modéré", prob: "50%" },
        { id: "R-006", title: "Dépendance fournisseur unique", impact: "Majeur", prob: "40%" }
      ]
    },
    {
      category: "Risques Surveillés",
      count: 12,
      color: "text-yellow-400",
      risks: [
        { id: "R-007", title: "Montée en version outil PMO", impact: "Modéré", prob: "35%" },
        { id: "R-008", title: "Changement réglementaire", impact: "Modéré", prob: "25%" },
        { id: "R-009", title: "Résistance au changement", impact: "Mineur", prob: "60%" }
      ]
    }
  ];

  const benefits = [
    {
      stat: "85%",
      label: "Risques Anticipés",
      description: "Détection précoce avant impact critique"
    },
    {
      stat: "60%",
      label: "Temps Gagné",
      description: "Sur l'analyse et consolidation des risques"
    },
    {
      stat: "3x",
      label: "Vitesse de Réponse",
      description: "Plans de mitigation déjà prêts à l'emploi"
    },
    {
      stat: "100%",
      label: "Traçabilité",
      description: "Audit trail complet pour conformité"
    }
  ];

  const useCases = [
    {
      role: "Risk Manager",
      challenge: "Consolidation manuelle des risques de 50+ projets chaque semaine",
      solution: "Dashboard centralisé avec agrégation automatique et scoring intelligent"
    },
    {
      role: "Project Manager",
      challenge: "Difficile d'identifier les dépendances entre risques projets",
      solution: "Analyse de propagation cascade avec visualisation interactive des impacts"
    },
    {
      role: "PMO Director",
      challenge: "Reporting risque fastidieux pour Comité de Direction",
      solution: "Rapports exécutifs auto-générés avec heatmap et top 10 risques critiques"
    }
  ];

  return (
    <>
      <SEO 
        title="Risk Manager - Identification Précoce et Mitigation Intelligente"
        description="Plateforme de gestion des risques entreprise. Détection précoce, analyse de propagation, plans de mitigation et AI risk scoring."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,102,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-red-400/30 bg-red-400/10 rounded-full mb-8 text-sm text-red-400">
              <Shield className="w-4 h-4" />
              <span>Risk Manager</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Identification Précoce &<br />
              <span className="text-red-400">Plans de Mitigation</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Anticipez les risques avant qu'ils n'impactent vos projets avec une intelligence artificielle dédiée à la gestion des risques
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-red-500 text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Démarrer la Gestion des Risques
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-red-400 hover:text-red-400 transition-all rounded-sm text-sm uppercase tracking-wide"
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
                  <div className="text-4xl font-light text-red-400 mb-2">{benefit.stat}</div>
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
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Une plateforme complète pour anticiper et gérer tous vos risques
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
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-red-400/30 transition-all group"
              >
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center mb-6 text-red-400 group-hover:bg-red-500/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Dashboard Preview */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Dashboard des Risques
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Vue d'ensemble des risques par criticité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {riskCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-light ${category.color}`}>
                    {category.category}
                  </h3>
                  <span className={`text-3xl font-light ${category.color}`}>
                    {category.count}
                  </span>
                </div>
                <div className="space-y-4">
                  {category.risks.map((risk, riskIndex) => (
                    <div key={riskIndex} className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-white/40 font-mono">{risk.id}</span>
                        <span className="text-xs text-white/60">{risk.prob}</span>
                      </div>
                      <p className="text-sm text-white font-light mb-2">{risk.title}</p>
                      <span className="text-xs text-white/40">Impact: {risk.impact}</span>
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
              Cas d'Usage
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comment Risk Manager transforme la gestion des risques
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
                <div className="text-sm font-medium text-red-400 uppercase tracking-wider mb-4">
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
            Prêt à Anticiper Vos Risques<br />Avant Qu'ils N'Impactent ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Accédez à Risk Manager et transformez votre gestion des risques dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-red-500 text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Démarrer Gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-red-400 hover:text-red-400 transition-all rounded-sm text-sm uppercase tracking-wide"
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

export default RiskManager;
