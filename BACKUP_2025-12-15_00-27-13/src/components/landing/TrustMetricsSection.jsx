import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Users, Target, TrendingUp } from 'lucide-react';

const TrustMetricsSection = () => {
  const { language } = useLanguage();

  const metrics = [
    {
      icon: Users,
      label: { fr: "Clients Satisfaits", en: "Satisfied Clients", de: "Zufriedene Kunden" },
      value: "50+",
      description: { fr: "Entreprises leaders", en: "Leading companies", de: "Führungsunternehmen" },
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: Target,
      label: { fr: "Projets Réussis", en: "Successful Projects", de: "Erfolgreiche Projekte" },
      value: "200+",
      description: { fr: "Transformations complétées", en: "Completed transformations", de: "Abgeschlossene Transformationen" },
      color: "from-emerald-600 to-emerald-400"
    },
    {
      icon: TrendingUp,
      label: { fr: "Amélioration Moyenne", en: "Average Improvement", de: "Durchschnittliche Verbesserung" },
      value: "+35%",
      description: { fr: "Gains de productivité", en: "Productivity gains", de: "Produktivitätssteigerungen" },
      color: "from-amber-600 to-amber-400"
    },
    {
      icon: Award,
      label: { fr: "Expertise Reconnue", en: "Recognized Expertise", de: "Anerkannte Expertise" },
      value: "12+",
      description: { fr: "Années d'expérience", en: "Years of experience", de: "Jahre Erfahrung" },
      color: "from-purple-600 to-purple-400"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0A0A0A] to-[#111] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#BFA76A]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`relative bg-gradient-to-br ${metric.color} bg-opacity-5 border border-white/10 hover:border-[#BFA76A]/50 rounded-lg p-6 overflow-hidden group transition-all duration-300`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">
                    {metric.label[language]}
                  </h3>
                  
                  <motion.p
                    className="text-3xl font-bold text-[#BFA76A] mb-2"
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {metric.value}
                  </motion.p>
                  
                  <p className="text-sm text-gray-400">
                    {metric.description[language]}
                  </p>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustMetricsSection;
