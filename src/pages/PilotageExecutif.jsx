import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, TrendingUp, AlertTriangle, Clock, CheckCircle2, Briefcase, LineChart, Users } from 'lucide-react';
import SEO from '@/components/SEO';

const PilotageExecutif = () => {
  const features = [
    {
      icon: Target,
      title: "KPI Stratégiques",
      description: "Suivez les indicateurs qui comptent vraiment pour votre direction. Tableaux de bord personnalisables avec alertes automatiques sur les déviations critiques."
    },
    {
      icon: AlertTriangle,
      title: "Gestion des Risques",
      description: "Cartographie des risques majeurs avec plans de mitigation intégrés. Visibilité complète sur l'exposition au risque du portefeuille stratégique."
    },
    {
      icon: TrendingUp,
      title: "Projections & Tendances",
      description: "Analyse prédictive basée sur l'historique et les tendances actuelles. Anticipez les dérives avant qu'elles ne deviennent critiques."
    },
    {
      icon: Clock,
      title: "Décisions en Attente",
      description: "Vue consolidée de toutes les décisions qui nécessitent une validation exécutive. Priorisez et arbitrez avec contexte complet."
    }
  ];

  const dashboardFeatures = [
    "Vue synthétique 360° du portefeuille",
    "Filtres dynamiques par direction, programme, priorité",
    "Export instantané pour préparation comités",
    "Drill-down vers détails projets en un clic",
    "Comparaison budget vs. réalisé vs. prévu",
    "Timeline des jalons stratégiques à venir",
    "Heatmap des risques par criticité",
    "ROI et business value par initiative"
  ];

  const executiveRoles = [
    {
      title: "CEO / Direction Générale",
      description: "Vision stratégique complète pour piloter la transformation et aligner l'organisation",
      icon: Briefcase,
      needs: ["Alignement stratégique", "Performance globale", "Risques majeurs"]
    },
    {
      title: "CFO / Direction Financière",
      description: "Contrôle budgétaire et optimisation de l'allocation des ressources financières",
      icon: LineChart,
      needs: ["Trajectoire budgétaire", "ROI portefeuille", "Cash-flow projets"]
    },
    {
      title: "CTO / Direction Technique",
      description: "Pilotage de la roadmap technologique et gestion des dépendances IT",
      icon: Users,
      needs: ["Roadmap produit", "Dette technique", "Capacités IT"]
    }
  ];

  return (
    <>
      <SEO 
        title="Pilotage Exécutif - Vues synthétiques pour la direction | Powalyze"
        description="Cockpit exécutif pour les comités de direction. KPI stratégiques, risques majeurs, décisions en attente - tout en un seul tableau de bord."
      />

      <div className="min-h-screen bg-[#000000]">
        {/* Background Grid */}
        <div 
          className="fixed inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-light">Retour à l'accueil</span>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-full mb-8">
                <Target className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37] font-light tracking-wide">COCKPIT STRATÉGIQUE</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight">
                Pilotage Exécutif
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                Des vues synthétiques pour les comités et la direction générale. 
                Préparez vos décisions stratégiques avec des données consolidées et fiables.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Essayer le cockpit
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-sm transition-all"
                >
                  Voir une démo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Pilotez avec précision
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/[0.02] border border-white/10 rounded-sm hover:border-[#D4AF37]/50 transition-all group"
                >
                  <feature.icon className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-light text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Fonctionnalités du cockpit
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {dashboardFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70 font-light">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Roles */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Pensé pour chaque membre du COMEX
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {executiveRoles.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/[0.02] border border-white/10 rounded-sm"
                >
                  <role.icon className="w-12 h-12 text-[#D4AF37] mb-6" />
                  <h3 className="text-xl font-light text-white mb-4">{role.title}</h3>
                  <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">{role.description}</p>
                  <div className="space-y-2">
                    {role.needs.map((need, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="text-white/50 text-xs font-light">{need}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Transformez vos comités de direction
            </h2>
            <p className="text-lg text-white/60 font-light mb-8">
              Décidez plus vite, avec plus de confiance, grâce à des données consolidées et fiables.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20 text-lg"
            >
              Accéder au cockpit exécutif
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default PilotageExecutif;
