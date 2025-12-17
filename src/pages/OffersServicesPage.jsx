import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Check, ClipboardList, BarChart3, GraduationCap, ShieldCheck } from 'lucide-react';

const offers = (t) => ([
  {
    id: 'pmo',
    icon: ShieldCheck,
    title: t('offers.items.pmo.title'),
    problem: t('offers.items.pmo.problem'),
    method: t('offers.items.pmo.method'),
    deliverables: [t('offers.items.pmo.del1'), t('offers.items.pmo.del2'), t('offers.items.pmo.del3')],
    benefits: [t('offers.items.pmo.b1'), t('offers.items.pmo.b2'), t('offers.items.pmo.b3')]
  },
  {
    id: 'data',
    icon: BarChart3,
    title: t('offers.items.data.title'),
    problem: t('offers.items.data.problem'),
    method: t('offers.items.data.method'),
    deliverables: [t('offers.items.data.del1'), t('offers.items.data.del2'), t('offers.items.data.del3')],
    benefits: [t('offers.items.data.b1'), t('offers.items.data.b2'), t('offers.items.data.b3')]
  },
  {
    id: 'execDash',
    icon: ClipboardList,
    title: t('offers.items.exec.title'),
    problem: t('offers.items.exec.problem'),
    method: t('offers.items.exec.method'),
    deliverables: [t('offers.items.exec.del1'), t('offers.items.exec.del2'), t('offers.items.exec.del3')],
    benefits: [t('offers.items.exec.b1'), t('offers.items.exec.b2'), t('offers.items.exec.b3')]
  },
  {
    id: 'maturity',
    icon: ShieldCheck,
    title: t('offers.items.maturity.title'),
    problem: t('offers.items.maturity.problem'),
    method: t('offers.items.maturity.method'),
    deliverables: [t('offers.items.maturity.del1'), t('offers.items.maturity.del2')],
    benefits: [t('offers.items.maturity.b1'), t('offers.items.maturity.b2')]
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: t('offers.items.training.title'),
    problem: t('offers.items.training.problem'),
    method: t('offers.items.training.method'),
    deliverables: [t('offers.items.training.del1'), t('offers.items.training.del2')],
    benefits: [t('offers.items.training.b1'), t('offers.items.training.b2')]
  }
]);

const Configurator = ({ t }) => {
  const [needs, setNeeds] = useState({ pmo: true, analytics: true, dashboards: true, audit: false, training: false });
  const score = useMemo(() => Object.values(needs).reduce((a, b) => a + (b ? 1 : 0), 0), [needs]);
  const level = score >= 4 ? t('offers.config.result.high') : score >= 2 ? t('offers.config.result.medium') : t('offers.config.result.low');

  const toggle = (k) => setNeeds((n) => ({ ...n, [k]: !n[k] }));

  const opts = [
    { k: 'pmo', label: t('offers.config.opts.pmo') },
    { k: 'analytics', label: t('offers.config.opts.analytics') },
    { k: 'dashboards', label: t('offers.config.opts.dashboards') },
    { k: 'audit', label: t('offers.config.opts.audit') },
    { k: 'training', label: t('offers.config.opts.training') },
  ];

  return (
    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-md">
      <h3 className="text-white text-xl font-semibold mb-4">{t('offers.config.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opts.map(o => (
          <label key={o.k} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded cursor-pointer select-none">
            <input type="checkbox" checked={needs[o.k]} onChange={() => toggle(o.k)} className="accent-[#BFA76A]" />
            <span className="text-sm text-gray-200">{o.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-gray-300 text-sm">
          {t('offers.config.estimate')}: <span className="text-white font-semibold">{level}</span>
        </div>
        <a href="/contact" className="px-5 py-2 bg-[#BFA76A] text-black font-semibold rounded-sm hover:bg-white transition">
          {t('offers.config.cta')}
        </a>
      </div>
    </div>
  );
};

const OffersServicesPage = () => {
  const { t } = useLanguage();
  const list = offers(t);
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 pt-20 pb-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#BFA76A]/40 bg-black/50 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#BFA76A] animate-pulse" />
            <span className="text-[#BFA76A] text-xs font-bold tracking-[0.2em] uppercase">{t('offers.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">{t('offers.title')}</h1>
          <p className="text-gray-400 text-lg mt-4 max-w-3xl">{t('offers.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {list.map((o, i) => (
            <motion.div key={o.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-white/10 rounded-md bg-white/[0.04]">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#BFA76A]/15 border border-[#BFA76A]/30 flex items-center justify-center">
                    <o.icon size={18} className="text-[#BFA76A]" />
                  </div>
                  <h3 className="text-xl font-semibold">{o.title}</h3>
                </div>
                <div className="grid gap-3 text-sm text-gray-300">
                  <div><span className="text-gray-400">{t('offers.problem')}</span> {o.problem}</div>
                  <div><span className="text-gray-400">{t('offers.method')}</span> {o.method}</div>
                  <div className="mt-2">
                    <div className="text-gray-400 mb-2">{t('offers.deliverables')}</div>
                    <ul className="grid gap-1">
                      {o.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#BFA76A]" /> <span>{d}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="text-gray-400 mb-2">{t('offers.benefits')}</div>
                    <ul className="grid gap-1">
                      {o.benefits.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#BFA76A]" /> <span>{d}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <a href="/contact" className="text-sm text-black bg-[#BFA76A] px-4 py-2 rounded-sm font-semibold hover:bg-white transition">{t('offers.cta')}</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Configurator t={t} />
      </div>
    </div>
  );
};

export default OffersServicesPage;
