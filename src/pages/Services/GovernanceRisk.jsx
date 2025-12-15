import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';

const GovernanceRisk = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.pmoStrategique || serviceContent.fr.pmoStrategique;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans">
      <Navbar />
      <main>
        <section className="relative pt-32 pb-24 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-[#050505] to-[#050505] z-0"></div>
           <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'Governance & Risk', path: null }]} />
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mt-12">
                 <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{content.hero.title}</h1>
                 <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl">{content.hero.subtitle}</p>
                 <Link to="/contact"><Button className="bg-red-600 hover:bg-red-500 text-white px-8 py-6 text-lg rounded-full font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)]">{content.hero.cta}</Button></Link>
              </motion.div>
           </div>
        </section>

        <section className="py-20 container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 text-lg text-gray-400"><p>{content.intro.p1}</p><p>{content.intro.p2}</p></div>
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" alt="Governance" className="rounded-2xl border border-white/10 shadow-2xl" />
           </div>
        </section>

        <section className="py-20 bg-[#0F0F0F]">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {content.benefits.map((b, i) => (
                    <div key={i} className="bg-[#1A1A1A] p-8 rounded-xl border border-white/5 hover:border-red-500/50 transition-colors">
                       <b.icon className="text-red-500 mb-4" size={32} />
                       <h3 className="font-bold text-white mb-2">{b.title}</h3>
                       <p className="text-gray-400 text-sm">{b.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="py-20 container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.features.map((f, i) => (
                 <div key={i} className="flex gap-4 p-4 border border-white/10 rounded-lg">
                    <f.icon className="text-red-500 shrink-0" size={24} />
                    <div><h4 className="font-bold text-white">{f.title}</h4><p className="text-xs text-gray-400">{f.desc}</p></div>
                 </div>
              ))}
           </div>
        </section>

        <section className="py-24 text-center container mx-auto px-6">
           <h2 className="text-3xl font-bold mb-8">{content.cta.title}</h2>
           <Link to="/contact"><Button className="bg-red-600 text-white rounded-full px-8">{content.cta.btnDemo}</Button></Link>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default GovernanceRisk;