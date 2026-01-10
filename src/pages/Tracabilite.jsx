import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, History, Lock, Search, CheckCircle2, Shield, Clock, Users } from 'lucide-react';
import SEO from '@/components/SEO';

const Tracabilite = () => {
  const features = [
    {
      icon: History,
      title: "Historique complet",
      description: "Chaque modification, chaque décision, chaque arbitrage est horodaté et attribué. Remontez dans le temps pour comprendre l'évolution de vos projets."
    },
    {
      icon: FileText,
      title: "Documentation automatique",
      description: "Les changements sont documentés automatiquement avec contexte. Plus besoin de maintenir des journaux de décisions manuellement."
    },
    {
      icon: Lock,
      title: "Audit trail sécurisé",
      description: "Piste d'audit infalsifiable conforme aux normes. Chaque action est enregistrée de manière immuable et traçable."
    },
    {
      icon: Search,
      title: "Recherche avancée",
      description: "Retrouvez instantanément qui a décidé quoi, quand et pourquoi. Filtrez par période, utilisateur, projet ou type de modification."
    }
  ];

  const capabilities = [
    "Versioning complet de tous les documents et décisions",
    "Comparaison entre versions avec highlighting des changements",
    "Notifications automatiques des modifications critiques",
    "Export des historiques pour audits externes",
    "Conformité RGPD avec droit à l'oubli documenté",
    "Signatures électroniques pour décisions majeures",
    "Workflow de validation avec traçabilité complète",
    "Rapports d'audit personnalisables"
  ];

  const useCases = [
    {
      title: "Audits de conformité",
      description: "Démontrez instantanément qui a pris quelle décision et sur quelle base",
      icon: Shield,
      example: "Audit ISO, due diligence, contrôle interne"
    },
    {
      title: "Résolution de litiges",
      description: "Retrouvez l'historique complet des échanges et décisions lors de contentieux",
      icon: FileText,
      example: "Contentieux client, arbitrage interne, recours hiérarchique"
    },
    {
      title: "Onboarding équipes",
      description: "Nouveaux collaborateurs comprennent rapidement le contexte historique des projets",
      icon: Users,
      example: "Reprise de projet, changement de PMO, nouvelle direction"
    },
    {
      title: "Analyse rétrospective",
      description: "Identifiez les patterns de décisions pour améliorer vos processus",
      icon: Clock,
      example: "Lessons learned, amélioration continue, capitalisation"
    }
  ];

  const timeline = [
    { time: "Aujourd'hui 14:32", user: "Marie Dupont", action: "Validation budget Q2", impact: "Critique" },
    { time: "Aujourd'hui 11:15", user: "Jean Martin", action: "Modification jalons Projet Alpha", impact: "Majeur" },
    { time: "Hier 16:45", user: "Sophie Bernard", action: "Ajout nouveau risque", impact: "Modéré" },
    { time: "Hier 09:20", user: "Luc Fontaine", action: "Export rapport comité", impact: "Mineur" },
    { time: "2 jours 13:00", user: "Claire Rousseau", action: "Création nouveau portefeuille", impact: "Critique" }
  ];

  return (
    <>
      <SEO 
        title="Traçabilité Complète - Historique de toutes les décisions | Powalyze"
        description="Chaque décision, chaque arbitrage, chaque évolution documentée. Audit trail sécurisé, historique complet et conformité garantie."
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
                <History className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37] font-light tracking-wide">AUDIT TRAIL COMPLET</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight">
                Traçabilité
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                Chaque décision, chaque arbitrage, chaque évolution documentée. 
                Un historique complet pour comprendre, justifier et améliorer.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  Activer la traçabilité
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-sm transition-all"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Demo */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Exemple de fil d'activité
            </h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-sm hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-light">{item.user}</span>
                      <span className="text-xs text-white/40 font-light">{item.time}</span>
                    </div>
                    <p className="text-white/60 text-sm font-light mb-2">{item.action}</p>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                      item.impact === 'Critique' ? 'bg-red-500/20 text-red-400' :
                      item.impact === 'Majeur' ? 'bg-orange-500/20 text-orange-400' :
                      item.impact === 'Modéré' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Fonctionnalités clés
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

        {/* Capabilities */}
        <section className="py-20 px-6 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Capacités avancées
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70 font-light">{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-12 text-center">
              Cas d'usage concrets
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/[0.02] border border-white/10 rounded-sm"
                >
                  <useCase.icon className="w-12 h-12 text-[#D4AF37] mb-6" />
                  <h3 className="text-xl font-light text-white mb-3">{useCase.title}</h3>
                  <p className="text-white/60 font-light text-sm mb-4 leading-relaxed">{useCase.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40 text-xs font-light italic">{useCase.example}</p>
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
              Ne perdez plus jamais l'historique de vos décisions
            </h2>
            <p className="text-lg text-white/60 font-light mb-8">
              Conformité, transparence et amélioration continue garanties.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-[#D4AF37] hover:bg-[#B89659] text-[#000000] font-medium rounded-sm transition-all shadow-lg shadow-[#D4AF37]/20 text-lg"
            >
              Activer la traçabilité
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tracabilite;
