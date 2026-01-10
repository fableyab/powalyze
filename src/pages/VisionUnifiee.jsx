import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Database, GitMerge, Shield, Zap, CheckCircle2, BarChart3, Users, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';

const VisionUnifiee = () => {
  const features = [
    {
      icon: Database,
      title: "Source unique de vérité",
      description: "Centralisez tous vos projets, portefeuilles et données stratégiques dans un référentiel unifié. Fini les fichiers Excel dispersés et les versions contradictoires."
    },
    {
      icon: GitMerge,
      title: "Synchronisation en temps réel",
      description: "Tous les départements travaillent sur la même donnée, mise à jour instantanément. Les modifications sont propagées automatiquement à l'ensemble de l'organisation."
    },
    {
      icon: Shield,
      title: "Gouvernance intégrée",
      description: "Définissez qui peut voir, modifier ou valider chaque information. La traçabilité complète garantit l'intégrité de vos données stratégiques."
    },
    {
      icon: Zap,
      title: "Décisions accélérées",
      description: "Plus de temps perdu à réconcilier des sources contradictoires. Vos comités disposent immédiatement des bonnes informations pour décider."
    }
  ];

  const benefits = [
    "Élimination des silos informationnels entre départements",
    "Réduction de 70% du temps de préparation des comités",
    "Alignement instantané de toutes les parties prenantes",
    "Traçabilité complète des modifications et validations",
    "Conformité RGPD et normes de sécurité suisses",
    "Architecture multi-tenant avec isolation des données"
  ];

  const useCases = [
    {
      title: "Direction Générale",
      description: "Vue consolidée du portefeuille stratégique sans dépendre des rapports intermédiaires",
      icon: TrendingUp
    },
    {
      title: "PMO Enterprise",
      description: "Pilotage unifié de 50+ projets avec une seule source de statuts et indicateurs",
      icon: BarChart3
    },
    {
      title: "Comités Exécutifs",
      description: "Préparation instantanée avec données toujours à jour et validées",
      icon: Users
    }
  ];

  return (
    <>
      <SEO 
        title="Vision Unifiée - Une seule source de vérité | Powalyze"
        description="Centralisez tous vos projets et portefeuilles dans une source unique. Éliminez les silos, synchronisez vos équipes et accélérez vos décisions stratégiques."
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
                <Database className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37] font-light tracking-wide">SOURCE UNIQUE DE VÉRITÉ</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight">
                Vision Unifiée
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                Une seule source de vérité pour vos projets et portefeuilles. 
                Éliminez les silos, alignez vos équipes et prenez des décisions basées sur des données fiables.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Démarrer gratuitement
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-sm transition-all"
                >
                  Demander une démo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
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

        {/* Benefits List */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Bénéfices concrets
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70 font-light">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Cas d'usage
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 bg-white/[0.02] border border-white/10 rounded-sm"
                >
                  <useCase.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-xl font-light text-white mb-4">{useCase.title}</h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Prêt à unifier votre gouvernance ?
            </h2>
            <p className="text-lg text-white/60 font-light mb-8">
              Rejoignez les organisations qui ont choisi la clarté et l'efficacité.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20 text-lg"
            >
              Créer mon compte
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default VisionUnifiee;
