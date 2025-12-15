import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Lightbulb, Shield, TrendingUp, Shuffle } from 'lucide-react';

const UseCasesSection = () => {
  const { t } = useLanguage();

  const cases = [
    { icon: Lightbulb, title: t('home.usecases.case1.title'), desc: t('home.usecases.case1.desc') },
    { icon: Shield, title: t('home.usecases.case2.title'), desc: t('home.usecases.case2.desc') },
    { icon: TrendingUp, title: t('home.usecases.case3.title'), desc: t('home.usecases.case3.desc') },
    { icon: Shuffle, title: t('home.usecases.case4.title'), desc: t('home.usecases.case4.desc') },
  ];

  return (
    <section className="py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs mb-2 block">{t('home.usecases.title')}</span>
            <h2 className="text-3xl font-display font-bold text-white">{t('home.usecases.description')}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 bg-[#151515] border border-white/5 hover:border-[#BFA76A]/50 transition-all duration-300 rounded-sm"
            >
              <div className="w-12 h-12 bg-[#0A0A0A] rounded flex items-center justify-center mb-6 group-hover:bg-[#BFA76A] transition-colors">
                <item.icon className="text-[#BFA76A] group-hover:text-black transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;