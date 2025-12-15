import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart3, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const ExpertiseCard = ({ domain, index, item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-[#080808] border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:border-[#3A7BFF]/40 hover:shadow-[0_0_30px_-5px_rgba(58,123,255,0.15)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3A7BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col flex-grow p-8 relative z-20">
        <div className="flex justify-between items-start mb-6">
           <div className="w-14 h-14 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[#3A7BFF] group-hover:bg-[#3A7BFF] group-hover:text-white transition-all duration-300 shadow-lg">
             {item.icon}
           </div>
           <div className="text-right">
              <div className="text-2xl font-bold text-[#3A7BFF] group-hover:text-[#BFA76A] transition-colors">{item.metric}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">{item.metricLabel}</div>
           </div>
        </div>

        <div className="mb-4">
           <span className="text-xs font-bold text-[#3A7BFF] uppercase tracking-widest mb-2 block">{item.subtitle}</span>
           <h3 className="text-2xl font-display font-medium text-white group-hover:text-white transition-colors duration-300">
             {item.title}
           </h3>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 flex-grow border-t border-white/5 pt-4">
          {item.desc}
        </p>

        <Link 
          to={item.link} 
          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-[#3A7BFF] transition-colors duration-300 mt-auto"
        >
          {item.cta} 
          <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

const ExpertiseSection = () => {
  const { t } = useLanguage();

  const domains = [
    {
      key: 'pmo',
      icon: <Briefcase size={28} strokeWidth={1.5} />,
      link: '/services/strategic-pmo',
      metric: '+124%'
    },
    {
      key: 'bi',
      icon: <BarChart3 size={28} strokeWidth={1.5} />,
      link: '/services/business-intelligence',
      metric: '+87%'
    },
    {
      key: 'ai',
      icon: <Cpu size={28} strokeWidth={1.5} />,
      link: '/services/automation-ai',
      metric: '+45%'
    },
    {
      key: 'gov',
      icon: <ShieldCheck size={28} strokeWidth={1.5} />,
      link: '/services/governance-risk',
      metric: '+98%'
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-[#050505] relative border-t border-[#1C1C1C]">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#3A7BFF] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            {t('homePmo.expertise.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            {t('homePmo.expertise.title')}
          </h2>
          <div className="w-24 h-1 bg-[#3A7BFF] mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((d, index) => (
            <ExpertiseCard
              key={d.key}
              index={index}
              item={{
                ...d,
                title: t(`homePmo.expertise.${d.key}.title`),
                subtitle: t(`homePmo.expertise.${d.key}.sub`),
                desc: t(`homePmo.expertise.${d.key}.desc`),
                metricLabel: t(`homePmo.expertise.${d.key}.metricLabel`),
                cta: t('common.readMore')
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;