import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, BarChart3, TrendingUp, Award, Target, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ResultatsMesurables = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
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
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight">Résultats mesurables</h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Indicateurs précis, suivi rigoureux, amélioration continue
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                "On ne peut améliorer que ce qu'on peut mesurer." Powalyze transforme vos projets et 
                portefeuilles en systèmes pilotés par la donnée, avec des résultats quantifiables à chaque étape.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Le piège des métriques vanity</h2>
              
              <p className="text-lg text-white/70 font-light mb-8 leading-relaxed">
                Trop d'organisations mesurent ce qui est facile plutôt que ce qui est important. Le résultat : 
                des KPIs déconnectés de la réalité, des rapports inutiles, aucune amélioration réelle.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-12">
                {[
                  "Indicateurs non alignés avec la stratégie",
                  "Données manuelles, incomplètes ou obsolètes",
                  "Rapports chronophages sans valeur ajoutée",
                  "Absence de suivi des actions correctives",
                  "Métriques incomparables d'un projet à l'autre",
                  "Aucun lien entre mesure et amélioration"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/70 mt-2" />
                    <span className="text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">L'approche data-driven de Powalyze</h2>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                {[
                  {
                    icon: Target,
                    title: "KPIs stratégiques",
                    desc: "Indicateurs alignés sur vos objectifs business, pertinents et actionnables"
                  },
                  {
                    icon: BarChart3,
                    title: "Collecte automatisée",
                    desc: "Données en temps réel, zéro saisie manuelle, fiabilité garantie"
                  },
                  {
                    icon: TrendingUp,
                    title: "Amélioration continue",
                    desc: "Analyse des tendances, détection d'anomalies, recommandations d'optimisation"
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

              <div className="p-8 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-sm">
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">Du reporting à l'intelligence décisionnelle</h3>
                <p className="text-base font-light text-white/80 leading-relaxed">
                  Powalyze ne se contente pas de mesurer : il analyse, compare, projette et recommande. 
                  Vos métriques deviennent des leviers d'amélioration continue.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Impact quantifiable</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { value: "+45%", label: "Performance des projets" },
                  { value: "-60%", label: "Temps de reporting" },
                  { value: "+80%", label: "Précision des prévisions" },
                  { value: "100%", label: "Traçabilité des actions" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 border border-white/5 bg-white/[0.01] rounded-sm text-center"
                  >
                    <div className="text-4xl font-extralight text-[#4A9EFF] mb-3">{item.value}</div>
                    <div className="text-sm font-light text-white/70">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  { title: "Visibilité totale", desc: "Dashboards en temps réel pour tous les niveaux de l'organisation" },
                  { title: "Décisions éclairées", desc: "Chaque choix appuyé par des données vérifiées et des tendances analysées" },
                  { title: "Benchmarking interne", desc: "Comparez vos projets, identifiez les meilleures pratiques, diffusez l'excellence" },
                  { title: "Prédictibilité accrue", desc: "Modèles prédictifs pour anticiper les résultats futurs avec précision" },
                  { title: "ROI démontrable", desc: "Justifiez vos investissements avec des métriques business tangibles" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 border border-white/5 bg-white/[0.01] rounded-sm"
                  >
                    <Award className="w-6 h-6 text-[#4A9EFF] shrink-0 mt-1" />
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-6">Prêt à mesurer votre réussite ?</h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Transformez vos données en avantage compétitif avec Powalyze
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/demo" className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform">Demander une démo</Link>
                <Link to="/contact" className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-light rounded-sm hover:bg-[#D4AF37] hover:text-[#000000] transition-all">Nous contacter</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ResultatsMesurables;
