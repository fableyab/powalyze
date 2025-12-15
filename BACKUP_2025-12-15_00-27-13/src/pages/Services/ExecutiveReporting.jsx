
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
import { ArrowRight } from 'lucide-react';

const ExecutiveReporting = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.executiveReporting || serviceContent.fr.executiveReporting;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-[#0A0A0A] to-[#0A0A0A] z-0"></div>
           <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'Executive Reporting', path: null }]} />
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mt-12"
              >
                 <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                    {content.hero.title}
                 </h1>
                 <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl">
                    {content.hero.subtitle}
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <Link to="/contact">
                       <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg rounded-full">
                          {content.hero.cta}
                       </Button>
                    </Link>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-20 container mx-auto px-6">
           <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-display font-bold mb-6">{content.intro.title}</h2>
              <p className="text-xl text-gray-300 leading-relaxed">{content.intro.content}</p>
           </div>
        </section>

        {/* CHALLENGES */}
        <section className="py-20 bg-[#111] border-y border-white/10">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-12 text-center">Vos Défis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {content.challenges.map((challenge, idx) => (
                    <div key={idx} className="bg-[#0A0A0A] p-6 rounded-xl border border-white/10">
                       <h3 className="text-xl font-bold mb-3 text-[#BFA76A]">{challenge.title}</h3>
                       <p className="text-gray-400 text-sm">{challenge.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* METHODOLOGY */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-display font-bold mb-12 text-center">Notre Méthodologie</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.methodology.map((step, idx) => (
                 <div key={idx} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                       {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* USE CASES */}
        <section className="py-20 bg-[#111] border-y border-white/10">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-12 text-center">Cas d'Usage</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {content.useCases.map((useCase, idx) => {
                    const Icon = useCase.icon;
                    return (
                       <div key={idx} className="bg-[#0A0A0A] p-8 rounded-xl border border-white/10">
                          <Icon size={40} className="text-indigo-500 mb-4" />
                          <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                          <p className="text-gray-400">{useCase.desc}</p>
                       </div>
                    );
                 })}
              </div>
           </div>
        </section>

        {/* INTERACTIVE EXAMPLES */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-bold mb-12 text-center">Exemples Interactifs</h2>
           <InteractiveExamples type="powerbi" />
        </section>

        {/* CTA */}
        <section className="py-20 container mx-auto px-6 text-center">
           <h2 className="text-4xl font-display font-bold mb-6">Prêt pour du reporting de niveau COMEX ?</h2>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/reporting-protected-demo">
                 <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-12 py-6 text-lg flex items-center gap-2">
                    Voir des Exemples
                    <ArrowRight size={20} />
                 </Button>
              </Link>
              <Link to="/contact">
                 <Button variant="outline" className="border-[#BFA76A] text-white hover:bg-[#BFA76A]/10 font-bold px-12 py-6 text-lg">
                    Demander une démo
                 </Button>
              </Link>
           </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default ExecutiveReporting;
