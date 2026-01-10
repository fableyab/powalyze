import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Clock, BarChart3, Lightbulb, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PriseDecision = () => {
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
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight">Prise de décision plus rapide</h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Informations fiables, synthèses exécutives, alignement facilité
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                Dans un environnement concurrentiel, la vitesse de décision est un avantage compétitif majeur. 
                Powalyze élimine les obstacles qui ralentissent vos arbitrages stratégiques.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Les freins classiques</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-12">
                {[
                  "Données dispersées dans différents outils",
                  "Informations contradictoires ou obsolètes",
                  "Absence de vue consolidée",
                  "Réunions interminables sans conclusion",
                  "Manque de contexte pour décider",
                  "Processus d'escalade complexes"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                    <Clock className="w-5 h-5 text-amber-500/70 shrink-0 mt-1" />
                    <span className="text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-lg text-white/70 font-light">
                Résultat : des décisions différées, des opportunités manquées, une organisation paralysée.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">L'accélérateur Powalyze</h2>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                {[
                  {
                    icon: BarChart3,
                    title: "Données fiables",
                    desc: "Source unique de vérité, données actualisées en temps réel, aucune contradiction"
                  },
                  {
                    icon: Lightbulb,
                    title: "Synthèses exécutives",
                    desc: "Résumés automatiques, recommandations IA, contexte complet en un coup d'œil"
                  },
                  {
                    icon: Zap,
                    title: "Workflows optimisés",
                    desc: "Circuits de validation simplifiés, notifications intelligentes, décisions traçables"
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
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">Décidez en heures, pas en semaines</h3>
                <p className="text-base font-light text-white/80 leading-relaxed">
                  Powalyze réduit le cycle de décision de 75% en moyenne. Vous gagnez en réactivité 
                  sans sacrifier la qualité d'analyse.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Avantages concurrentiels</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Réactivité stratégique", desc: "Saisissez les opportunités avant vos concurrents" },
                  { title: "Qualité maintenue", desc: "Rapidité sans compromis grâce à l'analyse automatisée" },
                  { title: "Alignement garanti", desc: "Toutes les parties prenantes ont accès au même contexte" },
                  { title: "Historique complet", desc: "Apprenez de vos décisions passées pour améliorer les futures" },
                  { title: "Confiance renforcée", desc: "Décisions basées sur des données vérifiées, pas sur l'intuition" }
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-6">Prêt à accélérer ?</h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Découvrez comment Powalyze transforme votre capacité décisionnelle
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

export default PriseDecision;
