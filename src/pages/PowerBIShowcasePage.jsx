import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const items = (t) => ([
  { id: 'finance', title: t('showcase.items.finance.title'), desc: t('showcase.items.finance.desc'), link: '/financial-report' },
  { id: 'projects', title: t('showcase.items.projects.title'), desc: t('showcase.items.projects.desc'), link: '/pmo-360-demo' },
  { id: 'risks', title: t('showcase.items.risks.title'), desc: t('showcase.items.risks.desc'), link: '/executive-dashboard' },
  { id: 'ops', title: t('showcase.items.ops.title'), desc: t('showcase.items.ops.desc'), link: '/live-demo' },
  { id: 'people', title: t('showcase.items.people.title'), desc: t('showcase.items.people.desc'), link: '/live-demo' },
  { id: 'supply', title: t('showcase.items.supply.title'), desc: t('showcase.items.supply.desc'), link: '/live-demo' },
]);

const Card = ({ title, desc, link, i }) => (
  <motion.a
    href={link}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.05 }}
    className="group border border-white/10 rounded-md bg-white/[0.04] hover:bg-white/[0.06] transition-colors overflow-hidden"
  >
    <div className="aspect-[16/9] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,167,106,0.18),transparent_40%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
    <div className="p-5">
      <div className="text-white text-lg font-semibold">{title}</div>
      <div className="text-sm text-gray-400 mt-1">{desc}</div>
      <div className="mt-4 text-sm text-black inline-flex px-4 py-2 bg-[#BFA76A] rounded-sm font-semibold group-hover:bg-white transition">{/**/}Voir</div>
    </div>
  </motion.a>
);

const PowerBIShowcasePage = () => {
  const { t } = useLanguage();
  const list = items(t);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 pt-20 pb-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#BFA76A]/40 bg-black/50 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#BFA76A] animate-pulse" />
            <span className="text-[#BFA76A] text-xs font-bold tracking-[0.2em] uppercase">{t('showcase.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">{t('showcase.title')}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl">{t('showcase.subtitle')}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {list.map((o, i) => (
            <Card key={o.id} i={i} title={o.title} desc={o.desc} link={o.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PowerBIShowcasePage;
