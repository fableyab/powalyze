import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Puzzle, Zap, DollarSign, Layers, CheckCircle2, Package, BarChart, TrendingUp, FileText } from 'lucide-react';
import SEO from '@/components/SEO';

const Modularite = () => {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: 'portfolio',
      icon: Package,
      name: 'Portfolio Manager',
      tagline: 'Pilotage multi-projets',
      price: 'Inclus',
      description: 'Centralisez et pilotez tous vos projets et portefeuilles. Priorisez, arbitrez et suivez avec des indicateurs adaptés.',
      features: [
        'Vue unifiée de tous les projets',
        'Priorisation multi-critères',
        'Dépendances et jalons',
        'Alertes automatiques',
        'Export rapports personnalisés'
      ]
    },
    {
      id: 'executive',
      icon: BarChart,
      name: 'Cockpit Exécutif',
      tagline: 'Vue stratégique COMEX',
      price: 'Premium',
      description: 'Tableau de bord synthétique pour la direction. KPI stratégiques, risques majeurs, décisions en attente.',
      features: [
        'Dashboard exécutif personnalisable',
        'KPI stratégiques en temps réel',
        'Cartographie des risques',
        'Préparation comités automatique',
        'Drill-down vers détails projets'
      ]
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      name: 'AI Analytics',
      tagline: 'Intelligence augmentée',
      price: 'Enterprise',
      description: 'Intelligence artificielle pour détecter tendances, signaux faibles et recommandations prédictives.',
      features: [
        'Détection anomalies automatique',
        'Analyse prédictive des risques',
        'Recommandations actionnables',
        'Patterns et corrélations',
        'Rapports insights générés par IA'
      ]
    },
    {
      id: 'docs',
      icon: FileText,
      name: 'Document Manager',
      tagline: 'GED intégrée',
      price: 'Inclus',
      description: 'Stockage sécurisé et recherche avancée de tous vos documents projets avec versioning complet.',
      features: [
        'Upload illimité de documents',
        'Recherche full-text',
        'Versioning automatique',
        'Tags et métadonnées',
        'Partage sécurisé avec droits'
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Démarrez instantanément",
      description: "Activez uniquement ce dont vous avez besoin. Pas de configuration complexe, pas de features inutiles."
    },
    {
      icon: DollarSign,
      title: "Optimisez vos coûts",
      description: "Payez seulement pour les modules que vous utilisez. Évolutivité garantie selon vos besoins."
    },
    {
      icon: Layers,
      title: "Évoluez à votre rythme",
      description: "Ajoutez de nouveaux modules au fil de votre maturité. Migration fluide et progressive."
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Gratuit',
      description: 'Pour découvrir Powalyze',
      modules: ['Portfolio Manager (limité)', 'Document Manager (5GB)'],
      users: 'Jusqu\'à 5 utilisateurs'
    },
    {
      name: 'Professional',
      price: '€99/mois',
      description: 'Pour PMO et équipes projets',
      modules: ['Portfolio Manager', 'Document Manager (100GB)', 'Cockpit Exécutif'],
      users: 'Jusqu\'à 25 utilisateurs',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Sur devis',
      description: 'Pour grandes organisations',
      modules: ['Tous les modules', 'AI Analytics', 'Support dédié', 'SLA garanti'],
      users: 'Utilisateurs illimités'
    }
  ];

  return (
    <>
      <SEO 
        title="Modularité - Activez uniquement les modules dont vous avez besoin | Powalyze"
        description="Architecture modulaire flexible. Démarrez avec l'essentiel et ajoutez des fonctionnalités au fil de votre croissance. Pas de bloatware."
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
                <Puzzle className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37] font-light tracking-wide">ARCHITECTURE MODULAIRE</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight">
                Modularité
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                Activez uniquement les modules dont vous avez besoin. 
                Pas de bloatware, pas de complexité inutile. Évoluez à votre rythme.
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
                  Voir la démo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Modules disponibles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                  className="p-8 bg-white/[0.02] border border-white/10 rounded-sm hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <module.icon className="w-12 h-12 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span className="px-3 py-1 text-xs bg-[#D4AF37]/20 text-[#D4AF37] rounded-full">
                      {module.price}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-light text-white mb-2">{module.name}</h3>
                  <p className="text-[#D4AF37] text-sm font-light mb-4">{module.tagline}</p>
                  <p className="text-white/60 font-light leading-relaxed mb-6">{module.description}</p>
                  
                  {activeModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 pt-4 border-t border-white/10"
                    >
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm font-light">{feature}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Pourquoi une approche modulaire ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8"
                >
                  <benefit.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
                  <h3 className="text-xl font-light text-white mb-4">{benefit.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Tarifs & Formules
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-sm ${
                    tier.highlight 
                      ? 'bg-[#D4AF37]/10 border-2 border-[#D4AF37]' 
                      : 'bg-white/[0.02] border border-white/10'
                  }`}
                >
                  <h3 className="text-2xl font-light text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl font-light text-[#D4AF37] mb-4">{tier.price}</div>
                  <p className="text-white/60 text-sm font-light mb-6">{tier.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {tier.modules.map((module, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm font-light">{module}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-white/50 text-xs font-light mb-6">{tier.users}</div>
                  
                  <Link
                    to="/signup"
                    className={`block w-full text-center py-3 rounded-sm transition-all ${
                      tier.highlight
                        ? 'bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium'
                        : 'border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37]'
                    }`}
                  >
                    {tier.name === 'Enterprise' ? 'Nous contacter' : 'Commencer'}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Composez votre solution idéale
            </h2>
            <p className="text-lg text-white/60 font-light mb-8">
              Commencez avec l'essentiel, ajoutez des modules au fil de votre croissance.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20 text-lg"
            >
              Créer mon compte gratuit
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Modularite;
