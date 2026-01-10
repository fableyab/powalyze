import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeroHighTech() {
  const { t } = useTranslation('landing');
  return (
    <section className="relative min-h-[90vh] flex items-center bg-black pt-20 animate-fadeIn">

      <div className="max-w-7xl mx-auto px-6">
        
        {/* VIDÉO YOUTUBE EN HAUT */}
        <div className="mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/4o_s_QR3Ku0"
              title="Powalyze Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37] leading-tight mb-6">
            {t('hero.title', 'Le cockpit moderne de votre gouvernance')}
          </h1>

          <p className="text-[#4A9EFF] text-lg md:text-xl mb-8">
            {t('hero.subtitle', 'Powalyze unifie portefeuilles, comités, décisions, risques & IA dans une plateforme claire, élégante et performante.')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="/app-modules"
              className="px-8 py-3 bg-[#D4AF37] text-black rounded-md font-medium shadow-lg hover:shadow-[#D4AF37]/40 transition text-center"
            >
              {t('hero.tryButton', 'Essayer Powalyze')}
            </a>
            <a 
              href="#features"
              className="px-8 py-3 border border-[#D4AF37]/40 text-[#D4AF37] rounded-md hover:bg-[#D4AF37]/10 transition text-center"
            >
              {t('hero.learnMore', 'En savoir plus')}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
