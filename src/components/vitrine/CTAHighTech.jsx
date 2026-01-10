import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CTAHighTech() {
  const { t } = useTranslation('landing');
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A1A2F] to-black">
      <div className="max-w-5xl mx-auto px-6 text-center animate-fadeIn">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t('cta.title', 'Prêt à transformer votre gouvernance ?')}
        </h2>
        
        <p className="text-[#4A9EFF] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {t('cta.subtitle', 'Rejoignez les organisations qui ont choisi Powalyze pour piloter leur portefeuille avec clarté et performance')}
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/signup"
            className="px-8 py-4 bg-[#D4AF37] text-black rounded-md font-semibold text-lg shadow-lg hover:shadow-[#D4AF37]/40 hover:scale-105 transition"
          >
            {t('cta.createAccount', 'Créer un compte')}
          </Link>
          <Link 
            to="/demo"
            className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-md font-semibold text-lg hover:bg-[#D4AF37]/10 transition"
          >
            {t('cta.getHelp', 'Être accompagné')}
          </Link>
        </div>

        <p className="text-white/50 text-sm mt-6">
          {t('cta.trial', 'Essai gratuit 14 jours · Sans carte bancaire · Déploiement en 48h')}
        </p>
      </div>
    </section>
  );
}
