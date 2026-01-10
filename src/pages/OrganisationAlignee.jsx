import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, GitBranch, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrganisationAlignee = () => {
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
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight">Organisation plus alignée</h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Équipes synchronisées, priorités partagées, capacité optimisée
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                L'alignement organisationnel est le multiplicateur de performance. Quand chacun comprend 
                la vision, connaît les priorités et optimise sa contribution, l'impact collectif est exponentiel.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Les symptômes du désalignement</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-12">
                {[
                  "Équipes travaillant en silos",
                  "Priorités contradictoires entre départements",
                  "Ressources sursollicitées ou sous-utilisées",
                  "Communication fragmentée",
                  "Objectifs individuels non alignés avec la stratégie",
                  "Conflits de ressources récurrents"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                    <GitBranch className="w-5 h-5 text-red-500/70 shrink-0 mt-1" />
                    <span className="text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-lg text-white/70 font-light">
                Le coût du désalignement ? Perte de productivité de 30 à 40%, démotivation, turn-over élevé.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Le cadre d'alignement Powalyze</h2>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                {[
                  {
                    icon: Target,
                    title: "Vision partagée",
                    desc: "Objectifs stratégiques visibles par tous, déclinés à chaque niveau"
                  },
                  {
                    icon: Share2,
                    title: "Priorités transparentes",
                    desc: "Arbitrages documentés, critères explicites, communication continue"
                  },
                  {
                    icon: Users,
                    title: "Capacité optimisée",
                    desc: "Charge de travail équilibrée, compétences valorisées, allocations intelligentes"
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
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">L'effet domino positif</h3>
                <p className="text-base font-light text-white/80 leading-relaxed">
                  Quand l'alignement est assuré, chaque équipe comprend comment sa contribution 
                  s'inscrit dans la vision globale. Motivation, efficacité et résultats suivent naturellement.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Résultats tangibles</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Productivité accrue de 35%", desc: "Grâce à l'élimination des redondances et des conflits" },
                  { title: "Engagement renforcé", desc: "Les équipes comprennent leur rôle dans la stratégie globale" },
                  { title: "Collaboration fluide", desc: "Outils partagés, objectifs communs, communication transparente" },
                  { title: "Capacité optimisée", desc: "Ressources allouées selon les priorités, surcharges évitées" },
                  { title: "Rétention des talents", desc: "Clarté de la vision et reconnaissance des contributions" }
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-6">Prêt à aligner votre organisation ?</h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Découvrez comment Powalyze synchronise vos équipes vers l'excellence collective
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

export default OrganisationAlignee;
