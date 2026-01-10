import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid,
  Activity,
  Shield,
  FileSpreadsheet,
  Brain,
  Gauge,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Eye,
  Zap,
  Users,
  Lock,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PMO = () => {
  const modules = [
    {
      icon: LayoutGrid,
      title: "Vision consolidée",
      desc: "Tous vos projets, un seul cockpit",
      features: [
        "Vue 360° de votre organisation",
        "État d'avancement global temps réel",
        "Dépendances critiques identifiées",
        "Budgets consommés vs prévus"
      ]
    },
    {
      icon: Activity,
      title: "Cockpit Exécutif",
      desc: "Le tableau de bord des décideurs",
      features: [
        "KPI critiques pour comités direction",
        "Synthèse claire et exploitable",
        "Recommandations intelligentes AI",
        "Tendances et projections"
      ]
    },
    {
      icon: Shield,
      title: "Risk Manager",
      desc: "Anticiper plutôt que subir",
      features: [
        "Détection signaux faibles",
        "Analyse de propagation",
        "Scénarios d'impact",
        "Plans de mitigation adaptés"
      ]
    },
    {
      icon: FileSpreadsheet,
      title: "Rapports Power BI",
      desc: "Vos données, sublimées",
      features: [
        "Rapports interactifs natifs",
        "Visualisations premium",
        "Connecteurs automatiques",
        "Exports instantanés"
      ]
    },
    {
      icon: Brain,
      title: "AI Analytics",
      desc: "L'intelligence au service de la décision",
      features: [
        "Analyse prédictive",
        "Détection anomalies",
        "Risques émergents",
        "Recommandations optimisation"
      ]
    },
    {
      icon: Gauge,
      title: "Performance Monitoring",
      desc: "La santé de vos équipes et projets",
      features: [
        "Capacité réelle des équipes",
        "Vélocité et charge",
        "Signaux de surcharge",
        "Rythme soutenable"
      ]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Gouvernance structurée et homogène",
      desc: "Processus clairs, standards appliqués"
    },
    {
      icon: CheckCircle2,
      title: "Données fiables, mises à jour automatiquement",
      desc: "Terminé les reporting manuels"
    },
    {
      icon: Eye,
      title: "Capacité à anticiper plutôt qu'à réagir",
      desc: "Pilotage prédictif, pas réactif"
    },
    {
      icon: Users,
      title: "Communication claire avec les directions",
      desc: "Langage commun, alignement stratégique"
    },
    {
      icon: TrendingUp,
      title: "Pilotage orienté résultats",
      desc: "Focus sur l'impact, pas les tâches"
    }
  ];

  const consolidatedFeatures = [
    "Identifier les goulots d'étranglement",
    "Prioriser les initiatives à fort impact",
    "Aligner les équipes sur les objectifs stratégiques",
    "Sécuriser les engagements auprès de la direction"
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Texture légère */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <Header />

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-8 text-sm text-[#D4AF37]">
              <LayoutGrid className="w-4 h-4" />
              <span>PMO Stratégique</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-8 leading-tight">
              Votre Bureau de Projet,<br />
              <span className="text-[#D4AF37]">réinventé pour la performance</span>
            </h1>

            <p className="text-xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Powalyze transforme votre PMO en un véritable centre de pilotage stratégique.
              Fini les fichiers dispersés, les reporting manuels et les décisions prises à l'aveugle.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#B89659] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2 group"
              >
                Démarrer gratuitement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:bg-white/5 transition-all rounded-sm text-sm"
              >
                Demander une démo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CE QUE VOTRE PMO GAGNE */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Ce que votre PMO gagne immédiatement
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl mx-auto">
              Une vision consolidée, fiable et actionnable de l'ensemble de vos projets, portefeuilles et initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 rounded-sm hover:border-[#D4AF37]/50 transition-all group"
              >
                <benefit.icon className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-light mb-3">{benefit.title}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES STRATÉGIQUES */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#D4AF37]/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6">
              Les 6 modules stratégiques du PMO
            </h2>
            <p className="text-lg font-light text-white/60 max-w-3xl mx-auto">
              Une plateforme complète pour gouverner, analyser et décider
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-white/10 bg-[#000000]/80 backdrop-blur-sm p-8 rounded-sm hover:border-[#D4AF37]/50 transition-all group"
              >
                <module.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-light mb-2">{module.title}</h3>
                <p className="text-sm font-light text-white/40 mb-6">{module.desc}</p>
                <ul className="space-y-3">
                  {module.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-light text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION CONSOLIDÉE - DÉTAILS */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-blue-400/30 bg-blue-400/10 rounded-full mb-6 text-sm text-blue-400">
                <Eye className="w-4 h-4" />
                <span>Vision 360°</span>
              </div>
              <h2 className="text-4xl font-extralight mb-6">
                Une vue consolidée de votre organisation
              </h2>
              <p className="text-lg font-light text-white/70 mb-8 leading-relaxed">
                Les organisations modernes ne peuvent plus piloter avec des silos.
                La vision consolidée Powalyze centralise l'ensemble de vos projets, programmes et portefeuilles dans une interface unique.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">Pourquoi c'est essentiel</h3>
                {consolidatedFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span className="text-sm font-light text-white/60">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-lg blur-2xl opacity-30" />
              <div className="relative border border-white/10 rounded-sm overflow-hidden bg-[#000000]/50 backdrop-blur-xl p-1">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                  alt="Vision consolidée PMO"
                  className="w-full rounded-sm opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COCKPIT EXÉCUTIF - DÉTAILS */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 border-t border-white/5 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-orange-400/20 rounded-lg blur-2xl opacity-30" />
              <div className="relative border border-white/10 rounded-sm overflow-hidden bg-[#000000]/50 backdrop-blur-xl p-1">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                  alt="Cockpit Exécutif"
                  className="w-full rounded-sm opacity-80"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-6 text-sm text-[#D4AF37]">
                <Activity className="w-4 h-4" />
                <span>Dashboard Temps Réel</span>
              </div>
              <h2 className="text-4xl font-extralight mb-6">
                Un tableau de bord pour décider vite et bien
              </h2>
              <p className="text-lg font-light text-white/70 mb-8 leading-relaxed">
                Le Cockpit Exécutif offre une synthèse claire, visuelle et immédiatement exploitable.
                Chaque indicateur est présenté avec une interprétation automatique, une tendance et une recommandation intelligente.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">KPI critiques</h3>
                {[
                  "Avancement global des portefeuilles",
                  "Risques majeurs et plans d'action",
                  "Capacité disponible vs charge prévue",
                  "Dépenses engagées et projections",
                  "Initiatives stratégiques en alerte"
                ].map((kpi, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span className="text-sm font-light text-white/60">{kpi}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-8">
              Prêt à transformer votre PMO ?
            </h2>
            <p className="text-lg font-light text-white/60 mb-12 max-w-2xl mx-auto">
              Rejoignez les organisations qui pilotent leurs projets avec rigueur et précision
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#B89659] transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Créer un compte gratuit
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:bg-white/5 transition-all rounded-sm text-sm"
              >
                Parler à un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PMO;
