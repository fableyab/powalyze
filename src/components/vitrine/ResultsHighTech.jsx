import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ResultsHighTech() {
  const { t } = useTranslation('landing');
  const stats = [
    { value: "-40%", label: "Temps de préparation comité" },
    { value: "+30%", label: "Visibilité sur les risques" },
    { value: "100%", label: "Décisions tracées automatiquement" },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#D4AF37] text-center mb-12 md:mb-16 animate-fadeIn">
          {t('results.title', 'Des résultats mesurables')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:-translate-y-2 transition-all duration-300 animate-fadeIn"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.value}
              </div>
              <p className="text-[#4A9EFF] text-base md:text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
