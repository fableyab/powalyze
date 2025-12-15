import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import { Cookie, Shield, Settings, Info } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const CookiePolicy = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cookieTypes = [
    {
      title: "Essentiels",
      desc: "Nécessaires au fonctionnement du site (session, sécurité). Impossible à désactiver.",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Analytiques",
      desc: "Nous aident à comprendre comment vous utilisez le site (Google Analytics anonymisé).",
      icon: Info,
      color: "text-blue-500"
    },
    {
      title: "Fonctionnels",
      desc: "Mémorisent vos préférences (langue, région).",
      icon: Settings,
      color: "text-[#BFA76A]"
    }
  ];

  return (
    <>
      <SEO 
        title={t('legal.cookies.title')}
        description="Politique des cookies de Powalyze."
      />
      
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 border-b border-[#BFA76A]/10 pb-12"
            >
              <span className="inline-block mb-4 text-[#BFA76A] text-xs font-bold uppercase tracking-[0.2em] border border-[#BFA76A]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                Powalyze.ch
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                {t('legal.cookies.title')}
              </h1>
              <p className="text-[#C8C8C8] text-lg font-light leading-relaxed max-w-3xl">
                Nous utilisons des cookies pour améliorer votre expérience. Voici comment et pourquoi.
              </p>
            </motion.div>

            <div className="space-y-12">
               <section>
                  <h2 className="text-2xl font-medium text-white mb-6">Qu'est-ce qu'un cookie ?</h2>
                  <p className="text-gray-400 leading-relaxed">
                     Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
                     Il permet de mémoriser vos actions et préférences sur une période donnée.
                  </p>
               </section>

               <section>
                  <h2 className="text-2xl font-medium text-white mb-6">Types de cookies utilisés</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {cookieTypes.map((c, i) => (
                        <div key={i} className="bg-[#111] p-6 rounded-lg border border-[#222] hover:border-[#333] transition-colors">
                           <c.icon className={`${c.color} mb-4`} size={24} />
                           <h3 className="text-white font-bold mb-2">{c.title}</h3>
                           <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                        </div>
                     ))}
                  </div>
               </section>

               <section>
                  <h2 className="text-2xl font-medium text-white mb-6">Gestion de vos préférences</h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                     Vous pouvez à tout moment modifier vos préférences via les paramètres de votre navigateur ou via notre gestionnaire de consentement.
                  </p>
                  <button className="px-6 py-3 bg-[#1C1C1C] text-white border border-[#333] hover:border-[#BFA76A] rounded transition-colors text-sm font-medium">
                     Ouvrir le gestionnaire de cookies
                  </button>
               </section>
            </div>

          </div>
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default CookiePolicy;