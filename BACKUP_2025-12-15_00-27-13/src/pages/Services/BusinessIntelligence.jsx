import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import { Star } from 'lucide-react';

const BusinessIntelligence = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.dataPowerBI || serviceContent.fr.dataPowerBI;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-24 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-[#050505] to-[#050505] z-0"></div>
           <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'BI & Analytics', path: null }]} />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mt-12">
                 <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                    {content.hero.title}
                 </h1>
                 <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl">{content.hero.subtitle}</p>
                 <Link to="/contact">
                    <Button className="bg-[#BFA76A] text-black hover:bg-white px-8 py-6 text-lg rounded-full font-bold">
                       {content.hero.cta}
                    </Button>
                 </Link>
              </motion.div>
           </div>
        </section>

        {/* INTRO */}
        <section className="py-20 container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                 <p>{content.intro.p1}</p>
                 <p>{content.intro.p2}</p>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-[#BFA76A]/10 blur-3xl rounded-full"></div>
                 <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="BI" className="relative z-10 rounded-2xl border border-white/10 shadow-2xl" />
              </div>
           </div>
        </section>

        {/* BENEFITS */}
        <section className="py-20 bg-[#0F0F0F] border-y border-white/5">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-16 text-center">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {content.benefits.map((benefit, i) => (
                    <div key={i} className="p-8 bg-[#161616] border border-white/5 rounded-xl hover:border-[#BFA76A]/30 transition-all group">
                       <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center text-[#BFA76A] mb-6 group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
                          <benefit.icon size={24} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                       <p className="text-gray-400 text-sm">{benefit.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-display font-bold mb-16">Key Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.features.map((feat, i) => (
                 <div key={i} className="border-l-2 border-[#BFA76A] pl-6 py-2">
                    <feat.icon className="text-[#BFA76A] mb-4" size={24} />
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-gray-400 text-xs">{feat.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* USE CASES */}
        <section className="py-20 bg-[#111]">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-16 text-center">Applied Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {content.useCases.map((uc, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-[#0A0A0A] rounded-xl border border-white/5">
                       <div className="p-4 bg-[#BFA76A]/10 text-[#BFA76A] rounded-full"><uc.icon size={32}/></div>
                       <div>
                          <h3 className="text-xl font-bold text-white mb-2">{uc.title}</h3>
                          <p className="text-gray-400">{uc.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* METRICS */}
        <section className="py-20 container mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {content.metrics.map((m, i) => (
                 <div key={i} className="p-4 border border-white/10 rounded-lg">
                    <div className="text-3xl font-bold text-[#BFA76A] mb-2">{m.val}</div>
                    <div className="text-xs uppercase text-gray-500">{m.label}</div>
                 </div>
              ))}
           </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-t from-[#BFA76A]/10 to-transparent text-center">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-white mb-4">{content.cta.title}</h2>
              <div className="flex justify-center gap-4 mt-8">
                 <Link to="/contact"><Button className="bg-[#BFA76A] text-black font-bold rounded-full px-8">{content.cta.btnDemo}</Button></Link>
              </div>
           </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default BusinessIntelligence;