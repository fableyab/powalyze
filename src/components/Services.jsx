
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Layers, Cpu, Target, FileBarChart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    { 
      id: "pilotage-it", 
      icon: Activity, 
      key: "pil"
    },
    { 
      id: "pmo-strategique", 
      icon: Target, 
      key: "pmo"
    },
    { 
      id: "data-power-bi", 
      icon: BarChart3, 
      key: "data"
    },
    { 
      id: "automatisation-ia", 
      icon: Cpu, 
      key: "ai"
    },
    { 
      id: "portefeuilles-priorisation", 
      icon: Layers, 
      key: "portfolio"
    },
    { 
      id: "reporting-executif", 
      icon: FileBarChart, 
      key: "reporting"
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
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-6 text-[#BFA76A]">{t('home.services.title')}</h2>
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
                <a href={`/services/${service.id}`} className="block h-full p-8 rounded-2xl bg-zinc-900/30 border border-[#BFA76A]/10 hover:border-[#BFA76A]/40 hover:shadow-[0_0_20px_rgba(191,167,106,0.1)] transition-all duration-500">
                  <div className="mb-6 text-[#BFA76A] group-hover:text-white transition-colors duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 tracking-wide text-white group-hover:text-[#BFA76A] transition-colors">{t(`home.services.${service.key}.title`)}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {t(`home.services.${service.key}.desc`)}
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
