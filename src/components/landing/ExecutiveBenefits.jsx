import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LineChart, Users2, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const items = (t) => [
  { icon: LineChart, title: t('home.valueProp.p1Title'), desc: t('home.valueProp.p1Desc') },
  { icon: Zap,       title: t('home.valueProp.p2Title'), desc: t('home.valueProp.p2Desc') },
  { icon: Shield,    title: t('home.valueProp.p3Title'), desc: t('home.valueProp.p3Desc') },
  { icon: Users2,    title: t('home.valueProp.p4Title'), desc: t('home.valueProp.p4Desc') },
];

const ExecutiveBenefits = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#0F0F0F] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-72 h-72 rounded-full opacity-[0.08] bg-gradient-to-br from-[#BFA76A] to-transparent blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-72 h-72 rounded-full opacity-[0.06] bg-gradient-to-tr from-white to-transparent blur-3xl" />
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-display text-white leading-tight">
            {t('home.valueProp.title')} <span className="text-[#BFA76A]">{t('home.valueProp.titleHigh')}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-5 leading-relaxed">
            {t('home.valueProp.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
          {items(t).map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative border border-white/10 rounded-md bg-white/[0.04] hover:bg-white/[0.06] transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#BFA76A]/15 rotate-45" />
              </div>
              <div className="p-6 relative">
                <div className="w-10 h-10 rounded-sm bg-[#BFA76A]/15 border border-[#BFA76A]/30 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#BFA76A]" />
                </div>
                <h3 className="text-white text-lg font-semibold leading-snug">{title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{desc}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBenefits;
