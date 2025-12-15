import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CaseStudiesSection = () => {
  const { language } = useLanguage();
  const [expandedCase, setExpandedCase] = useState(0);

  const caseStudies = [
    {
      title: {
        fr: "Fusion Bancaire",
        en: "Banking Merger",
        de: "Bankfusion"
      },
      subtitle: {
        fr: "Harmonisation des systèmes d'information",
        en: "IT systems harmonization",
        de: "Harmonisierung der Informationssysteme"
      },
      challenge: {
        fr: "Deux banques fusionnaient avec des systèmes legacy incompatibles. Risque : -25% de productivité opérationnelle.",
        en: "Two banks merging with incompatible legacy systems. Risk: -25% operational productivity.",
        de: "Zwei Banken fusionieren mit inkompatiblen Legacy-Systemen. Risiko: -25% operativer Produktivität."
      },
      solution: {
        fr: "Mise en place d'un PMO stratégique avec gouvernance IT clairement définie. Dashboards temps réel pour suivi des risques.",
        en: "Implementation of strategic PMO with clearly defined IT governance. Real-time dashboards for risk tracking.",
        de: "Implementierung eines strategischen PMO mit klar definierter IT-Governance. Echtzeit-Dashboards zur Risikoverfolgung."
      },
      results: [
        { metric: {fr: "Retards Projets", en: "Project Delays", de: "Projektverzögerungen"}, value: "-25%", icon: TrendingUp },
        { metric: {fr: "Coûts Opérationnels", en: "Operational Costs", de: "Betriebskosten"}, value: "-18%", icon: TrendingUp },
        { metric: {fr: "Satisfaction Équipe", en: "Team Satisfaction", de: "Team-Zufriedenheit"}, value: "+40%", icon: CheckCircle2 }
      ],
      duration: { fr: "12 mois", en: "12 months", de: "12 Monate" },
      client: { fr: "Grand Banque Suisse", en: "Major Swiss Bank", de: "Großbank Schweiz" },
      color: "from-blue-600 to-blue-400"
    },
    {
      title: {
        fr: "Transformation Agile",
        en: "Agile Transformation",
        de: "Agile-Transformation"
      },
      subtitle: {
        fr: "Migration du Cycle en V vers SAFe",
        en: "Migration from Waterfall to SAFe",
        de: "Migration von V-Modell zu SAFe"
      },
      challenge: {
        fr: "Assurance immobilière avec processus en Cycle en V. Cycles de release : 18 mois. Time-to-market critique.",
        en: "Real estate insurance with Waterfall processes. Release cycles: 18 months. Critical time-to-market.",
        de: "Immobilienversicherung mit V-Modell-Prozessen. Release-Zyklen: 18 Monate. Kritischer Time-to-Market."
      },
      solution: {
        fr: "Implémentation SAFe avec coaching PMO. Dashboards Agile pour visibilité portefeuille. Automatisation CI/CD.",
        en: "SAFe implementation with PMO coaching. Agile dashboards for portfolio visibility. CI/CD automation.",
        de: "SAFe-Implementierung mit PMO-Coaching. Agile-Dashboards für Portfoliokontrolle. CI/CD-Automatisierung."
      },
      results: [
        { metric: {fr: "Time-to-Market", en: "Time-to-Market", de: "Time-to-Market"}, value: "÷2", icon: Clock },
        { metric: {fr: "Qualité Livrables", en: "Deliverable Quality", de: "Qualität der Liefergegenstände"}, value: "+35%", icon: CheckCircle2 },
        { metric: {fr: "Satisfaction Clients", en: "Customer Satisfaction", de: "Kundenzufriedenheit"}, value: "+55%", icon: Users }
      ],
      duration: { fr: "9 mois", en: "9 months", de: "9 Monate" },
      client: { fr: "Assurance Multirisque", en: "Multi-Risk Insurance", de: "Mehrteilversicherung" },
      color: "from-emerald-600 to-emerald-400"
    },
    {
      title: {
        fr: "Gouvernance Cloud",
        en: "Cloud Governance",
        de: "Cloud-Governance"
      },
      subtitle: {
        fr: "Mise en place FinOps & Cost Optimization",
        en: "FinOps & Cost Optimization implementation",
        de: "FinOps & Kostenoptimierungsimplementierung"
      },
      challenge: {
        fr: "Groupe industriel avec cloud dépenses incontrôlées. Budget: +45% en 1 an. Aucune visibilité par département.",
        en: "Industrial group with uncontrolled cloud spending. Budget: +45% in 1 year. No visibility by department.",
        de: "Industriegruppe mit unkontrolliertem Cloud-Ausgabenverbrauch. Budget: +45% in 1 Jahr. Keine Sichtbarkeit pro Abteilung."
      },
      solution: {
        fr: "Gouvernance Cloud avec tagging & chargeback. Dashboards FinOps. Automatisation de scaling. Optimisation réservations.",
        en: "Cloud governance with tagging & chargeback. FinOps dashboards. Scaling automation. Reservation optimization.",
        de: "Cloud-Governance mit Tagging & Chargeback. FinOps-Dashboards. Scaling-Automatisierung. Reservierungsoptimierung."
      },
      results: [
        { metric: {fr: "Économies Cloud", en: "Cloud Savings", de: "Cloud-Einsparungen"}, value: "-30%", icon: TrendingUp },
        { metric: {fr: "Visibilité Coûts", en: "Cost Visibility", de: "Kostenübersicht"}, value: "100%", icon: CheckCircle2 },
        { metric: {fr: "Adoption Gouvernance", en: "Governance Adoption", de: "Governance-Akzeptanz"}, value: "+85%", icon: Users }
      ],
      duration: { fr: "6 mois", en: "6 months", de: "6 Monate" },
      client: { fr: "Groupe Industriel", en: "Industrial Group", de: "Industriegruppe" },
      color: "from-amber-600 to-amber-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-[#BFA76A]/5 to-transparent rounded-full blur-3xl translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {language === 'fr' ? "Cas de Succès" : language === 'en' ? "Success Cases" : "Erfolgsfälle"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'fr'
              ? "Des transformations réelles, des résultats mesurables, des clients satisfaits."
              : language === 'en'
              ? "Real transformations, measurable results, satisfied clients."
              : "Echte Transformationen, messbare Ergebnisse, zufriedene Kunden."}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          {caseStudies.map((caseStudy, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => setExpandedCase(expandedCase === idx ? -1 : idx)}
              className="relative bg-[#111] border border-white/10 hover:border-[#BFA76A]/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group"
            >
              {/* Gradient Background on Hover */}
              {expandedCase === idx && (
                <div className={`absolute inset-0 bg-gradient-to-r ${caseStudy.color} opacity-5`}></div>
              )}

              {/* Content */}
              <motion.div
                layoutId={`case-${idx}`}
                className="relative z-10 p-6 md:p-8"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-[#BFA76A] transition-colors">
                      {caseStudy.title[language]}
                    </h3>
                    <p className="text-[#BFA76A] font-semibold text-lg mb-4">
                      {caseStudy.subtitle[language]}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCase === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${caseStudy.color} flex items-center justify-center flex-shrink-0 mt-2`}
                  >
                    <ArrowRight size={20} className="text-white" />
                  </motion.div>
                </div>

                {/* Always Visible Content */}
                <div className="mb-4 pb-4 border-b border-white/5">
                  <p className="text-gray-300 leading-relaxed">
                    <span className="font-semibold text-white">Défi : </span>
                    {caseStudy.challenge[language]}
                  </p>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedCase === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 pt-4"
                    >
                      {/* Solution */}
                      <div>
                        <h4 className="font-bold text-white mb-2">
                          {language === 'fr' ? "Solution" : language === 'en' ? "Solution" : "Lösung"}
                        </h4>
                        <p className="text-gray-400">
                          {caseStudy.solution[language]}
                        </p>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="font-bold text-white mb-4">
                          {language === 'fr' ? "Résultats" : language === 'en' ? "Results" : "Ergebnisse"}
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {caseStudy.results.map((result, ridx) => {
                            const Icon = result.icon;
                            return (
                              <motion.div
                                key={ridx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: ridx * 0.1 }}
                                className={`bg-gradient-to-br ${caseStudy.color} bg-opacity-10 rounded-lg p-4 text-center`}
                              >
                                <Icon size={20} className="text-[#BFA76A] mx-auto mb-2" />
                                <p className="text-xs text-gray-400 mb-1">{result.metric[language]}</p>
                                <p className="text-lg font-bold text-[#BFA76A]">{result.value}</p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-6 text-sm pt-4 border-t border-white/5">
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? "Durée" : language === 'en' ? "Duration" : "Dauer"}</p>
                          <p className="text-white font-semibold">{caseStudy.duration[language]}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">{language === 'fr' ? "Client" : language === 'en' ? "Client" : "Kunde"}</p>
                          <p className="text-white font-semibold">{caseStudy.client[language]}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Results Preview (collapsed) */}
                {expandedCase !== idx && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 text-sm"
                  >
                    {caseStudy.results.slice(0, 2).map((result, ridx) => (
                      <div key={ridx} className="flex items-center gap-1 text-[#BFA76A]">
                        <span className="font-bold">{result.value}</span>
                        <span className="text-xs text-gray-500">{result.metric[language]}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            {language === 'fr'
              ? "Votre cas pourrait être le prochain succès Powalyze"
              : language === 'en'
              ? "Your case could be the next Powalyze success story"
              : "Ihr Fall könnte die nächste Erfolgsgeschichte von Powalyze sein"}
          </p>
          <Link to="/contact">
            <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-10 py-4 text-lg rounded-lg shadow-lg shadow-[#BFA76A]/20">
              {language === 'fr' ? "Discuter de votre Cas" : language === 'en' ? "Discuss Your Case" : "Besprechen Sie Ihren Fall"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
