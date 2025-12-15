import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Eye, Layers, Compass } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ContactSection from '@/components/landing/ContactSection';

const ApproachPage = () => {
  const { t } = useLanguage();
  useEffect(() => window.scrollTo(0, 0), []);

  const sections = [
    {
      id: 'vision',
      icon: Eye,
      title: "Notre Vision",
      content: "Dans un monde de bruit, la clarté est le nouveau pouvoir. Nous croyons que la réussite d'un projet complexe ne dépend pas de la quantité de ressources, mais de la précision du pilotage."
    },
    {
      id: 'principles',
      icon: Compass,
      title: "Nos Principes",
      content: "Rigueur Suisse, Agilité Pragmatique, Transparence Totale. Nous ne cachons pas les problèmes sous le tapis ; nous les mettons en lumière pour les résoudre."
    },
    {
      id: 'method',
      icon: Layers,
      title: "Notre Méthode",
      content: "Une approche structurée en 3 temps : Audit & Diagnostic (Comprendre), Structuration & Gouvernance (Bâtir), Pilotage & Optimisation (Exécuter)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('navbar.approach')} | Powalyze</title>
      </Helmet>
      
      <div className="bg-[#0A0A0A] min-h-screen text-white">
        <Navbar />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-4xl text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Approche & <span className="text-[#BFA76A]">Méthodologie</span>
            </h1>
            <p className="text-xl text-gray-400">
              {t('home.hero.subtitle')}
            </p>
          </div>

          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {sections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={sec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#111] p-10 rounded-xl border border-white/5 hover:border-[#BFA76A]/30 transition-all text-center"
                  >
                    <div className="inline-flex p-4 rounded-full bg-[#1C1C1C] text-[#BFA76A] mb-6">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{sec.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {sec.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[#BFA76A]/5 z-0" />
               <h2 className="text-3xl font-display font-bold relative z-10 mb-6">
                 "La clarté comme standard."
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto relative z-10">
                 C'est notre promesse. Que ce soit dans nos rapports, nos communications ou nos recommandations, nous visons toujours la simplicité et l'impact.
               </p>
            </div>
          </div>
        </main>

        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
};

export default ApproachPage;