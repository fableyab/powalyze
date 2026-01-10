import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, LayoutGrid, TrendingUp, Filter, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VisionClaire = () => {
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
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-extralight">
                  Vision claire et consolidée
                </h1>
              </div>
              
              <p className="text-xl font-light text-[#4A9EFF] mb-8 leading-relaxed">
                Une vue d'ensemble complète de vos projets, portefeuilles et priorités
              </p>
              
              <p className="text-base font-light text-white/70 leading-relaxed max-w-3xl">
                Dans un environnement complexe où les projets se multiplient et les priorités évoluent constamment, 
                disposer d'une vision claire et consolidée devient un avantage stratégique décisif.
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Le défi</h2>
              
              <div className="space-y-6 text-white/70 font-light leading-relaxed">
                <p>
                  Les organisations modernes gèrent simultanément des dizaines, voire des centaines de projets. 
                  Sans une vision consolidée, il devient impossible de :
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-12">
                  {[
                    "Identifier les projets prioritaires",
                    "Détecter les conflits de ressources",
                    "Anticiper les surcharges",
                    "Prendre des décisions éclairées",
                    "Communiquer efficacement avec les parties prenantes",
                    "Mesurer l'avancement global du portefeuille"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-lg">
                  Le résultat ? Des décisions prises à l'aveugle, des ressources mal allouées, 
                  des projets critiques qui passent inaperçus.
                </p>
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">La solution Powalyze</h2>
              
              <div className="space-y-8">
                <p className="text-lg font-light text-white/70 leading-relaxed">
                  Powalyze vous offre une vision panoramique et actuelle de l'ensemble de votre portefeuille, 
                  avec des niveaux de granularité adaptés à chaque besoin.
                </p>

                <div className="grid md:grid-cols-3 gap-8 my-12">
                  {[
                    {
                      icon: LayoutGrid,
                      title: "Tableau de bord consolidé",
                      desc: "Tous vos projets, portefeuilles et initiatives regroupés en une seule vue"
                    },
                    {
                      icon: Filter,
                      title: "Filtres intelligents",
                      desc: "Segmentez par statut, priorité, département, budget, ressources"
                    },
                    {
                      icon: TrendingUp,
                      title: "Indicateurs clés",
                      desc: "KPIs stratégiques mis à jour en temps réel pour piloter efficacement"
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
              <h2 className="text-3xl md:text-4xl font-extralight mb-8">Bénéfices concrets</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Décisions plus rapides",
                    desc: "Réduisez de 60% le temps nécessaire pour obtenir une vue d'ensemble de votre portefeuille"
                  },
                  {
                    title: "Meilleure allocation des ressources",
                    desc: "Identifiez instantanément les surcharges et les sous-utilisations de capacité"
                  },
                  {
                    title: "Priorisation optimisée",
                    desc: "Alignez vos investissements avec vos objectifs stratégiques en toute transparence"
                  },
                  {
                    title: "Communication facilitée",
                    desc: "Partagez des rapports visuels et synthétiques avec vos parties prenantes"
                  },
                  {
                    title: "Anticipation renforcée",
                    desc: "Détectez les tendances et les signaux faibles avant qu'ils ne deviennent critiques"
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
                Prêt à voir clairement ?
              </h2>
              <p className="text-lg font-light text-white/70 mb-8 max-w-2xl mx-auto">
                Découvrez comment Powalyze transforme votre vision stratégique en avantage compétitif
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

export default VisionClaire;
