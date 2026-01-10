import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DemoHighTech() {
  const { t } = useTranslation('landing');
  return (
    <section id="demo" className="py-16 md:py-24 bg-[#0A1A2F]">
      <div className="max-w-5xl mx-auto px-6 text-center animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          {t('demo.title', 'Découvrez Powalyze en action')}
        </h2>

        <p className="text-white/70 text-base md:text-lg mb-10">
          {t('demo.subtitle', 'Vue portefeuille • Alerte IA • Comité • Arbitrage • Power BI • Décision tracée')}
        </p>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] bg-[#0A1A2F]">
          {/* Placeholder pour vidéo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]/40 hover:bg-[#D4AF37]/30 transition cursor-pointer">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm">{t('demo.videoPlaceholder', 'Vidéo de démonstration')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
