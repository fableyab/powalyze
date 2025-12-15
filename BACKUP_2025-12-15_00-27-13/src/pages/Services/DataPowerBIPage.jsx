
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import InteractiveExamples from '@/components/Service/InteractiveExamples';

const DataPowerBIPage = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.dataPowerBI || serviceContent.fr.dataPowerBI;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans">
      <Navbar />
      
      <main>
        <section className="relative pt-32 pb-24 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#0A0A0A] to-[#0A0A0A] z-0"></div>
           <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'Data & Power BI', path: null }]} />
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mt-12">
                 <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{content.hero.title}</h1>
                 <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl">{content.hero.subtitle}</p>
                 <Link to="/contact"><Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg rounded-full font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]">{content.hero.cta}</Button></Link>
              </motion.div>
           </div>
        </section>

        <section className="py-20 container mx-auto px-6">
           <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-400">
              <h2 className="text-3xl font-bold text-white mb-6">{content.intro.title}</h2>
              <p>{content.intro.content}</p>
           </div>
        </section>

        <section className="py-20 bg-[#111]">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">Défis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {content.challenges.map((c, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors">
                       <h3 className="font-bold text-white mb-2">{c.title}</h3>
                       <p className="text-gray-400 text-sm">{c.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-bold mb-12 text-center">Notre Méthodologie</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {content.methodology.map((m, i) => (
                 <div key={i} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl">{i+1}</div>
                    <h3 className="font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-sm text-gray-400">{m.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-bold mb-12 text-center">Exemples Interactifs</h2>
           <InteractiveExamples type="powerbi" />
        </section>

        <section className="py-24 text-center container mx-auto px-6">
           <h2 className="text-3xl font-bold mb-8">Prêt à valoriser vos données ?</h2>
           <Link to="/contact"><Button className="bg-blue-600 text-white rounded-full px-8">Demander une démo</Button></Link>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default DataPowerBIPage;
