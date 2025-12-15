import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp, BarChart3, Zap, Target, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DemoInteractiveSection = () => {
  const { language } = useLanguage();
  const [activeDemo, setActiveDemo] = useState('pmo');
  const [hoveredMetric, setHoveredMetric] = useState(null);

  const demos = {
    pmo: {
      title: {
        fr: "PMO Stratégique",
        en: "Strategic PMO",
        de: "Strategisches PMO"
      },
      subtitle: {
        fr: "De la gestion de projet au pilotage de la valeur",
        en: "From project management to value-driven governance",
        de: "Von der Projektführung zur wertgesteuerten Governance"
      },
      description: {
        fr: "Structurez votre PMO avec dashboards temps réel, gouvernance alignée et visibilité complète du portefeuille.",
        en: "Structure your PMO with real-time dashboards, aligned governance, and complete portfolio visibility.",
        de: "Strukturieren Sie Ihr PMO mit Echtzeit-Dashboards, abgestimmter Governance und vollständiger Portfoliokontrolle."
      },
      metrics: [
        { label: { fr: "Retards Projets", en: "Project Delays", de: "Projektverzögerungen" }, before: "25%", after: "-25%", icon: TrendingUp },
        { label: { fr: "Visibilité", en: "Visibility", de: "Sichtbarkeit" }, before: "Partielle", after: "100%", icon: Target },
        { label: { fr: "Décisions COPIL", en: "Steering Decisions", de: "Lenkungsentscheidungen" }, before: "5-7j", after: "<48h", icon: Zap }
      ],
      icon: Target,
      color: "from-blue-600 to-blue-400"
    },
    dataBI: {
      title: {
        fr: "Data & Power BI",
        en: "Data & Power BI",
        de: "Daten & Power BI"
      },
      subtitle: {
        fr: "Transformez vos données en intelligence décisionnelle",
        en: "Transform your data into business intelligence",
        de: "Transformieren Sie Ihre Daten in Geschäftsintelligenz"
      },
      description: {
        fr: "Créez des dashboards exécutifs qui racontent votre histoire. Visualisation, analyse et prédiction en temps réel.",
        en: "Create executive dashboards that tell your story. Visualization, analysis and real-time prediction.",
        de: "Erstellen Sie Führungsdashboards, die Ihre Geschichte erzählen. Echtzeit-Visualisierung, Analyse und Vorhersage."
      },
      metrics: [
        { label: { fr: "Temps Rapport", en: "Report Time", de: "Berichtszeit" }, before: "3-5j", after: "5 min", icon: Zap },
        { label: { fr: "Données Exploitables", en: "Actionable Data", de: "Verwertbare Daten" }, before: "30%", after: "95%", icon: BarChart3 },
        { label: { fr: "ROI Données", en: "Data ROI", de: "Daten-ROI" }, before: "?", after: "+40%", icon: TrendingUp }
      ],
      icon: BarChart3,
      color: "from-emerald-600 to-emerald-400"
    },
    automation: {
      title: {
        fr: "Automatisation & IA",
        en: "Automation & AI",
        de: "Automatisierung & KI"
      },
      subtitle: {
        fr: "Automatisez 40% de vos tâches PMO",
        en: "Automate 40% of your PMO tasks",
        de: "Automatisieren Sie 40% Ihrer PMO-Aufgaben"
      },
      description: {
        fr: "Utilisez l'IA pour optimiser les processus, prédire les risques et libérer votre équipe des tâches répétitives.",
        en: "Use AI to optimize processes, predict risks and free your team from repetitive tasks.",
        de: "Nutzen Sie KI, um Prozesse zu optimieren, Risiken vorherzusagen und Ihr Team von sich wiederholenden Aufgaben zu befreien."
      },
      metrics: [
        { label: { fr: "Temps Économisé", en: "Time Saved", de: "Eingesparte Zeit" }, before: "0h", after: "12h/sem", icon: Zap },
        { label: { fr: "Erreurs Manuelles", en: "Manual Errors", de: "Manuelle Fehler" }, before: "-15%", after: "-95%", icon: Target },
        { label: { fr: "Productivité", en: "Productivity", de: "Produktivität" }, before: "100%", after: "+140%", icon: TrendingUp }
      ],
      icon: Zap,
      color: "from-amber-600 to-amber-400"
    }
  };

  const currentDemo = demos[activeDemo];
  const Icon = currentDemo.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#BFA76A]/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
            {language === 'fr' ? "Démos Interactives" : language === 'en' ? "Interactive Demos" : "Interaktive Demos"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {language === 'fr' 
              ? "Explorez comment Powalyze transforme vos processus et crée de la valeur mesurable"
              : language === 'en'
              ? "Explore how Powalyze transforms your processes and creates measurable value"
              : "Erkunden Sie, wie Powalyze Ihre Prozesse transformiert und messbaren Wert schafft"}
          </p>
        </motion.div>

        {/* Demo Selector Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          {Object.entries(demos).map(([key, demo]) => (
            <motion.button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`relative px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeDemo === key
                  ? `bg-[#BFA76A] text-black shadow-lg shadow-[#BFA76A]/30`
                  : `bg-[#111] text-gray-300 hover:text-white hover:bg-[#222] border border-white/10`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {demo.title[language]}
            </motion.button>
          ))}
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentDemo.color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {currentDemo.title[language]}
                </h3>
                <p className="text-[#BFA76A] font-semibold">
                  {currentDemo.subtitle[language]}
                </p>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-300 text-lg leading-relaxed">
              {currentDemo.description[language]}
            </motion.p>

            <motion.div variants={itemVariants} className="pt-6">
              <Link to="/pmo-demo">
                <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 group">
                  <PlayCircle size={18} />
                  {language === 'fr' ? "Voir la Démo" : language === 'en' ? "See Demo" : "Demo anzeigen"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Metrics Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4"
          >
            {currentDemo.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onHoverStart={() => setHoveredMetric(idx)}
                onHoverEnd={() => setHoveredMetric(null)}
                className="relative bg-[#111] border border-white/10 hover:border-[#BFA76A]/50 rounded-lg p-6 transition-all duration-300 cursor-pointer group"
              >
                {/* Gradient Background on Hover */}
                {hoveredMetric === idx && (
                  <motion.div
                    layoutId="bgGradient"
                    className={`absolute inset-0 bg-gradient-to-r ${currentDemo.color} opacity-5 rounded-lg`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentDemo.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <metric.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-2">{metric.label[language]}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 line-through">{metric.before}</span>
                      <ArrowRight size={16} className="text-[#BFA76A]" />
                      <motion.span
                        className="text-xl font-bold text-[#BFA76A]"
                        animate={hoveredMetric === idx ? { scale: 1.1 } : { scale: 1 }}
                      >
                        {metric.after}
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">
            {language === 'fr'
              ? "Découvrez comment ces transformations peuvent s'appliquer à votre organisation"
              : language === 'en'
              ? "Discover how these transformations can apply to your organization"
              : "Entdecken Sie, wie diese Transformationen auf Ihre Organisation angewendet werden können"}
          </p>
          <Link to="/contact">
            <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-10 py-4 text-lg rounded-lg shadow-lg shadow-[#BFA76A]/20">
              {language === 'fr' ? "Planifier une Session" : language === 'en' ? "Schedule a Session" : "Eine Sitzung planen"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoInteractiveSection;
