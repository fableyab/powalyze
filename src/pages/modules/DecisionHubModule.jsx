import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GitBranch, CheckCircle, Users, History, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DecisionHubModule = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-20">
        <section className="relative py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <Link to="/app-modules" className="inline-flex items-center gap-2 text-sm font-light text-[#D4AF37] hover:text-[#4A9EFF] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Retour aux modules
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight text-[#D4AF37]">Decision Hub</h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Historique complet des décisions, actions, responsables, impacts
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                Centralisez toutes les décisions stratégiques dans un registre unique. Traçabilité complète, 
                suivi des actions, impacts mesurables et analyse rétrospective.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Capacités du Decision Hub</h2>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                {[
                  {
                    icon: History,
                    title: "Registre de décisions",
                    desc: "Historique complet, contexte, participants, justifications, alternatives envisagées"
                  },
                  {
                    icon: CheckCircle,
                    title: "Suivi des actions",
                    desc: "Plans d'action détaillés, échéances, statuts, blocages identifiés"
                  },
                  {
                    icon: Users,
                    title: "Attribution des responsabilités",
                    desc: "Propriétaires clairement identifiés, notifications automatiques, escalades"
                  },
                  {
                    icon: GitBranch,
                    title: "Analyse d'impacts",
                    desc: "Impacts mesurés, bénéfices réalisés, retours d'expérience capitalisés"
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-8 text-[#D4AF37]">Bénéfices organisationnels</h2>
              
              <div className="space-y-6">
                {[
                  { title: "Traçabilité complète", desc: "Chaque décision documentée, contextualisée et tracée" },
                  { title: "Redevabilité renforcée", desc: "Responsables clairement identifiés, suivis réguliers" },
                  { title: "Amélioration continue", desc: "Analyse rétrospective, capitalisation d'expérience" },
                  { title: "Conformité garantie", desc: "Audits simplifiés, preuves documentées" },
                  { title: "Mémoire institutionnelle", desc: "Préservation du savoir décisionnel" }
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-[#D4AF37]">Centralisez vos décisions</h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Assurez la traçabilité et la redevabilité de votre gouvernance
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/demo" className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform">Découvrir</Link>
                <Link to="/signup" className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-light rounded-sm hover:bg-[#D4AF37] hover:text-black transition-all">Commencer</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DecisionHubModule;
