import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import GlobalFooter from '@/components/GlobalFooter';

const VisibilityProblem = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-20">
        <section className="relative py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-light text-[#D4AF37] hover:text-[#4A9EFF] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight text-[#D4AF37]">Visibilité insuffisante</h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Sans vision claire, vos initiatives stratégiques naviguent à l'aveugle
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                L'absence de visibilité globale sur votre portefeuille d'initiatives est l'une des causes principales d'échec stratégique dans les organisations complexes.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Les symptômes critiques</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-12">
                {[
                  "Incapacité à prioriser les initiatives stratégiques",
                  "Comités de direction avec des rapports incomplets",
                  "Décisions basées sur des données obsolètes ou fragmentées",
                  "Dépendances cachées entre projets non identifiées",
                  "Surcharge de ressources clés non détectée",
                  "Budget global inconnu ou approximatif"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                    <AlertTriangle className="w-5 h-5 text-red-500/70 shrink-0 mt-1" />
                    <span className="text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-lg text-white/70 font-light">
                Ces signaux indiquent une absence de cockpit de pilotage unifié.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">L'approche Powalyze</h2>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                {[
                  {
                    icon: Eye,
                    title: "Vision 360°",
                    desc: "Cockpit exécutif unifié consolidant toutes vos initiatives en un seul endroit"
                  },
                  {
                    icon: CheckCircle2,
                    title: "Données temps réel",
                    desc: "Synchronisation continue avec vos outils métiers (Jira, Azure DevOps, Excel)"
                  },
                  {
                    icon: AlertTriangle,
                    title: "Alertes proactives",
                    desc: "Détection automatique des dérives, blocages et risques émergents"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all rounded-sm group"
                  >
                    <item.icon className="w-8 h-8 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-light mb-3">{item.title}</h3>
                    <p className="text-sm font-light text-white/50 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8 text-[#D4AF37]">Impact mesurable</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Réduction de 60% du temps passé en réunions de suivi", desc: "Grâce à la consolidation automatique des données" },
                  { title: "Amélioration de 45% de la prise de décision", desc: "Avec des tableaux de bord exécutifs en temps réel" },
                  { title: "Détection 3x plus rapide des risques", desc: "Via les alertes automatiques et indicateurs prédictifs" },
                  { title: "Satisfaction des dirigeants : 92%", desc: "Cockpit lisible en moins de 15 secondes" },
                  { title: "ROI moyen : 280%", desc: "Sur la première année d'utilisation" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 border border-white/5 bg-white/[0.01] rounded-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#4A9EFF] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-light text-white mb-2">{item.title}</h3>
                      <p className="text-sm font-light text-white/60">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-[#D4AF37]">Prêt à gagner en visibilité ?</h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Transformez votre gouvernance avec un cockpit exécutif unifié
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/demo" className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform">Demander une démo</Link>
                <Link to="/contact" className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-light rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all">Nous contacter</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <GlobalFooter />
    </div>
  );
};

export default VisibilityProblem;
