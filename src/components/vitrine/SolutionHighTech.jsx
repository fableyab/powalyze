import React from 'react';
import { Layers, Database, BarChart3, Globe, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SolutionHighTech() {
  const { t } = useTranslation('landing');
  const solutions = [
    { icon: Layers, title: "PMO", desc: "Méthodologie et gouvernance structurée" },
    { icon: Database, title: "Data", desc: "Données consolidées et fiabilisées" },
    { icon: BarChart3, title: "Power BI", desc: "Dashboards intelligents et insights" },
    { icon: Globe, title: "SaaS", desc: "Plateforme cloud moderne et modulaire" },
    { icon: Brain, title: "IA", desc: "Prédictions et recommandations intelligentes" }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A1A2F]">
      <div className="max-w-7xl mx-auto px-6 animate-fadeIn">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('solution.title', 'La Solution Complète')}
          </h2>
          <p className="text-[#4A9EFF] text-lg md:text-xl">
            {t('solution.subtitle', 'Une approche holistique qui combine 5 piliers essentiels')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className="p-6 bg-black/40 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/40 transition-all group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition">
                <solution.icon className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{solution.title}</h3>
              <p className="text-sm text-white/60">{solution.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
