import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Database, FileText, Target, DollarSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ChallengeCard = ({ item, index }) => {
  const isGold = item.color === 'gold';
  const accentColor = isGold ? '#BFA76A' : '#3A7BFF';
  const accentBg = isGold ? 'bg-[#BFA76A]/10' : 'bg-[#3A7BFF]/10';
  const iconColor = isGold ? 'text-[#D4AF37]' : 'text-[#3A7BFF]';
  const borderColor = isGold ? 'hover:border-[#BFA76A]/50' : 'hover:border-[#3A7BFF]/50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 ${borderColor} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center p-8 h-full`}
    >
      {/* Background Glow */}
      <div className={`absolute top-0 left-0 w-full h-1/2 ${accentBg} blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Large Icon */}
      <div className="relative z-10 mb-8 mt-4 transform group-hover:scale-110 transition-transform duration-500">
         <div className={`${iconColor} drop-shadow-2xl`}>
            {React.cloneElement(item.icon, { size: 100, strokeWidth: 1 })}
         </div>
      </div>

      <div className="relative z-20 flex flex-col flex-grow">
         <h3 className="text-xl font-display font-bold text-white mb-3 leading-tight">
            {item.title}
         </h3>
         
         <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
            {item.desc}
         </p>

         <div className="mt-auto border-t border-white/10 pt-6 w-full">
            <div className={`text-3xl font-light ${iconColor} mb-1`}>{item.metric}</div>
            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">{item.metricLabel}</div>
         </div>
      </div>
    </motion.div>
  );
};

const ChallengesSection = () => {
  const { t } = useLanguage();

  const challenges = [
    {
      icon: <Eye />,
      title: t('home.challenges.c1.title'),
      desc: t('home.challenges.c1.desc'),
      metric: t('home.challenges.c1.metric'),
      metricLabel: t('home.challenges.c1.metricLabel'),
      color: 'gold',
    },
    {
      icon: <Database />,
      title: t('home.challenges.c2.title'),
      desc: t('home.challenges.c2.desc'),
      metric: t('home.challenges.c2.metric'),
      metricLabel: t('home.challenges.c2.metricLabel'),
      color: 'blue',
    },
    {
      icon: <FileText />,
      title: t('home.challenges.c3.title'),
      desc: t('home.challenges.c3.desc'),
      metric: t('home.challenges.c3.metric'),
      metricLabel: t('home.challenges.c3.metricLabel'),
      color: 'gold',
    },
    {
      icon: <Target />,
      title: t('home.challenges.c4.title'),
      desc: t('home.challenges.c4.desc'),
      metric: t('home.challenges.c4.metric'),
      metricLabel: t('home.challenges.c4.metricLabel'),
      color: 'blue',
    },
    {
      icon: <DollarSign />,
      title: t('home.challenges.c5.title'),
      desc: t('home.challenges.c5.desc'),
      metric: t('home.challenges.c5.metric'),
      metricLabel: t('home.challenges.c5.metricLabel'),
      color: 'gold',
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-4xl mx-auto">
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-[#3A7BFF] font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
           >
              {t('home.challenges.subtitle')}
           </motion.span>
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
           >
              {t('home.challenges.title')}
           </motion.h2>
           <div className="w-24 h-1 bg-gradient-to-r from-[#BFA76A] to-[#3A7BFF] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
           {challenges.map((c, i) => (
              <ChallengeCard key={i} item={c} index={i} />
           ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;