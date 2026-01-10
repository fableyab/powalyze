import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, FileText, Users, Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GouvernanceStructuree = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Header />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-light text-[#D4AF37] hover:text-[#4A9EFF] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight">
                  Gouvernance structurée
                </h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Des processus clairs, des rôles définis, des décisions traçables
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                Une gouvernance efficace est le socle d'une organisation performante. Sans cadre clair, 
                les décisions se prennent dans le flou, les responsabilités se diluent, et la confusion règne.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Le défi Section */}
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Les symptômes d'une gouvernance défaillante</h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-12">
                {[
                  "Décisions prises sans traçabilité",
                  "Responsabilités floues et conflits de pouvoir",
                  "Processus d'approbation interminables",
                  "Manque de transparence sur les arbitrages",
                  "Absence de suivi des décisions stratégiques",
                  "Communication décousue entre les niveaux hiérarchiques"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2" />
                    <span className="text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* La solution Powalyze */}
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Le cadre Powalyze</h2>
              
              <div className="grid md:grid-cols-3 gap-8 my-12">
                {[
                  {
                    icon: FileText,
                    title: "Processus documentés",
                    desc: "Workflows clairs pour chaque type de décision, accessibles à tous"
                  },
                  {
                    icon: Users,
                    title: "Rôles et responsabilités",
                    desc: "Matrices RACI, périmètres d'autorité, circuits de validation"
                  },
                  {
                    icon: Shield,
                    title: "Traçabilité complète",
                    desc: "Historique des décisions, justifications, impacts mesurés"
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
                <h3 className="text-xl font-light text-[#D4AF37] mb-4">La méthode d'excellence</h3>
                <p className="text-base font-light text-white/80 leading-relaxed">
                  Rigueur, précision, transparence. Chaque décision est documentée, chaque rôle est défini, 
                  chaque processus est optimisé pour la clarté et l'efficacité.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bénéfices concrets */}
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Résultats mesurables</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Accélération des décisions",
                    desc: "Réduisez de 50% le temps entre identification d'un besoin et prise de décision"
                  },
                  {
                    title: "Clarté organisationnelle",
                    desc: "Chacun connaît son rôle, ses responsabilités et ses limites d'autorité"
                  },
                  {
                    title: "Conformité garantie",
                    desc: "Audits facilités grâce à la traçabilité complète des processus décisionnels"
                  },
                  {
                    title: "Confiance renforcée",
                    desc: "Transparence totale sur les critères et le cheminement des arbitrages"
                  },
                  {
                    title: "Amélioration continue",
                    desc: "Analyse post-décision pour optimiser vos processus en permanence"
                  }
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

        {/* CTA Final */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extralight mb-6">
                Prêt à structurer votre gouvernance ?
              </h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Découvrez comment Powalyze apporte clarté et efficacité à vos processus décisionnels
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link 
                  to="/demo" 
                  className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white font-light rounded-sm hover:scale-105 transition-transform"
                >
                  Demander une démo
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-light rounded-sm hover:bg-[#D4AF37] hover:text-[#000000] transition-all"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GouvernanceStructuree;
