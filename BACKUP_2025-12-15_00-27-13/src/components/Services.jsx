
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Layers, Cpu, Target, FileBarChart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Services = () => {
  // We use hardcoded texts here to ensure they match exactly the user's requirements
  // regardless of the translation context state.
  const services = [
    { 
      id: "pilotage-it", 
      icon: Activity, 
      title: "Pilotage IT", 
      desc: "Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace pour soutenir vos objectifs métier.",
      link: "/services/pilotage-it"
    },
    { 
      id: "pmo-strategique", 
      icon: Target, 
      title: "PMO Stratégique", 
      desc: "Alignez vos projets avec la stratégie d'entreprise grâce à une gestion de portefeuille optimisée et une gouvernance de projet robuste.",
      link: "/services/pmo-strategique"
    },
    { 
      id: "data-power-bi", 
      icon: BarChart3, 
      title: "Data & Power BI", 
      desc: "Transformez vos données en insights actionnables avec nos solutions de business intelligence et de visualisation avancée.",
      link: "/services/data-power-bi"
    },
    { 
      id: "automatisation-ia", 
      icon: Cpu, 
      title: "Automatisation & IA", 
      desc: "Automatisez vos processus métier et exploitez l'IA pour améliorer l'efficacité opérationnelle et la prise de décision.",
      link: "/services/automatisation-ia"
    },
    { 
      id: "portefeuilles-priorisation", 
      icon: Layers, 
      title: "Portefeuilles & Priorisation", 
      desc: "Gérez efficacement votre portefeuille de projets avec une priorisation intelligente basée sur la valeur métier.",
      link: "/services/portefeuilles-priorisation"
    },
    { 
      id: "reporting-executif", 
      icon: FileBarChart, 
      title: "Reporting Exécutif", 
      desc: "Fournissez aux décideurs des rapports clairs et actionnables pour une gouvernance d'entreprise optimale.",
      link: "/services/reporting-executif"
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-6 text-[#BFA76A]">Nos Services</h2>
          <div className="h-px w-20 bg-[#BFA76A]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group h-full"
              >
                <a href={service.link} className="block h-full p-8 rounded-2xl bg-zinc-900/30 border border-[#BFA76A]/10 hover:border-[#BFA76A]/40 hover:shadow-[0_0_20px_rgba(191,167,106,0.1)] transition-all duration-500">
                  <div className="mb-6 text-[#BFA76A] group-hover:text-white transition-colors duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 tracking-wide text-white group-hover:text-[#BFA76A] transition-colors">{service.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {service.desc}
                  </p>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
