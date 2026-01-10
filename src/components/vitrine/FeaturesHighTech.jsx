import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FeaturesHighTech() {
  const { t } = useTranslation('landing');
  const features = [
    {
      title: "Pilotage portefeuille",
      text: "Vue portefeuille en temps réel, priorisation intelligente, indicateurs de santé, signaux IA pour anticiper les dérives.",
    },
    {
      title: "Préparation comité",
      text: "Ordre du jour automatique, points critiques détectés, décisions à prendre, suivi des actions.",
    },
    {
      title: "Traçabilité des décisions",
      text: "Historique complet, impacts mesurés, actions associées, conformité garantie.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 space-y-24 md:space-y-32">
        {features.map((f, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center animate-fadeIn ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE/MOCKUP */}
            <div>
              <div className="rounded-xl bg-white/5 p-6 md:p-8 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#D4AF37] rounded-md" />
                    </div>
                    <div className="h-6 bg-white/10 rounded w-32" />
                  </div>
                  {[60, 80, 45].map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="h-8 bg-white/5 rounded flex-1" />
                      <div 
                        className="h-8 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40 rounded transition-all duration-700"
                        style={{ width: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#D4AF37] mb-4">
                {f.title}
              </h3>
              <p className="text-[#4A9EFF] text-base md:text-lg leading-relaxed">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
