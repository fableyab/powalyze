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
import { ArrowRight, Star } from 'lucide-react';

const StrategicPMO = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.pmoStrategique || serviceContent.fr.pmoStrategique; // Fallback to FR

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#3A7BFF] selection:text-white">
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-[#0A0A0A] to-[#0A0A0A] z-0"></div>
           <div className="container mx-auto px-6 relative z-10">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'Strategic PMO', path: null }]} />
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
                 <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4">
                       <Link to="/pmo-demo">
                          <Button className="bg-[#BFA76A] hover:bg-white text-black px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(191,167,106,0.3)] font-bold flex items-center gap-2">
                             {content.hero.cta}
                             <ArrowRight size={18} />
                          </Button>
                       </Link>
                       <Link to="/contact">
                          <Button className="bg-[#3A7BFF] hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(58,123,255,0.3)]">
                             Nous contacter
                          </Button>
                       </Link>
                    </div>
                    <p className="text-gray-400 text-sm max-w-xl">
                       Découvrez comment Powalyze structurera votre PMO avec des dashboards exécutifs, une gouvernance alignée et une visibilité complète du portefeuille projets.
                    </p>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-20 container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                 <p>{content.intro.p1}</p>
                 <p>{content.intro.p2}</p>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-[#3A7BFF]/10 blur-3xl rounded-full"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                   alt="PMO Dashboard" 
                   className="relative z-10 rounded-2xl border border-white/10 shadow-2xl"
                 />
              </div>
           </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-20 bg-[#0F0F0F] border-y border-white/5">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-16 text-center">Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {content.benefits.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-[#161616] border border-white/5 rounded-xl hover:border-[#3A7BFF]/30 transition-all group"
                    >
                       <div className="w-12 h-12 bg-[#3A7BFF]/10 rounded-lg flex items-center justify-center text-[#3A7BFF] mb-6 group-hover:bg-[#3A7BFF] group-hover:text-white transition-colors">
                          <benefit.icon size={24} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                       <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* FEATURES LIST */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-display font-bold mb-16">Advanced Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {content.features.map((feat, i) => (
                 <div key={i} className="flex gap-6">
                    <div className="shrink-0 mt-1">
                       <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400">
                          <feat.icon size={20} />
                       </div>
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                       <p className="text-gray-400 text-sm">{feat.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* USE CASES */}
        <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-16 text-center">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {content.useCases.map((useCase, i) => (
                    <div key={i} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <useCase.icon size={80} />
                       </div>
                       <h3 className="text-lg font-bold text-[#3A7BFF] mb-3">{useCase.title}</h3>
                       <p className="text-gray-400 text-sm relative z-10">{useCase.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* INTERACTIVE EXAMPLES */}
        <InteractiveExamples type="pmo" />

        {/* METHODOLOGY */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-display font-bold mb-16 text-center">{content.methodology.title}</h2>
           <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 hidden md:block"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {content.methodology.steps.map((step, i) => (
                    <div key={i} className="relative z-10 bg-[#0A0A0A] p-6 border border-white/10 rounded-xl text-center hover:border-[#BFA76A] transition-colors">
                       <div className="w-8 h-8 bg-[#BFA76A] text-black font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                          {i + 1}
                       </div>
                       <h3 className="font-bold text-white mb-2">{step.title}</h3>
                       <p className="text-xs text-gray-400">{step.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* METRICS & ROI */}
        <section className="py-20 bg-[#3A7BFF] text-white">
           <div className="container mx-auto px-6">
              <h2 className="text-3xl font-display font-bold mb-12 text-center text-white">Measurable Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                 {content.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                       <div className="text-3xl font-bold mb-2">{metric.after}</div>
                       <div className="text-xs uppercase tracking-wider opacity-80">{metric.label}</div>
                       {metric.before !== "N/A" && <div className="text-[10px] opacity-60 mt-1">Was: {metric.before}</div>}
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 container mx-auto px-6">
           <h2 className="text-3xl font-display font-bold mb-16 text-center">Trusted by Leaders</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="bg-[#111] p-8 rounded-xl border border-white/5 relative">
                    <div className="flex text-[#BFA76A] mb-4 gap-1">
                       {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-300 mb-6 italic text-sm">
                       "Powalyze transformed our project visibility. We went from reactive firefighting to proactive management in just 3 months."
                    </p>
                    <div>
                       <h5 className="font-bold text-white text-sm">Director of Operations</h5>
                       <p className="text-xs text-gray-500">Multinational Manufacturing</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* CTA */}
        <section className="py-24 container mx-auto px-6 text-center">
           <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#111] to-[#161616] border border-white/10 p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">{content.cta.title}</h2>
              <p className="text-gray-400 mb-8">{content.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link to="/pmo-demo">
                    <Button className="bg-[#BFA76A] hover:bg-white text-black font-bold px-8 h-12 rounded-full flex items-center gap-2">
                       {content.hero.cta}
                       <ArrowRight size={18} />
                    </Button>
                 </Link>
                 <Link to="/contact">
                    <Button className="bg-[#3A7BFF] hover:bg-blue-600 text-white px-8 h-12 rounded-full">
                       {content.cta.btnDemo}
                    </Button>
                 </Link>
                 <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 h-12 rounded-full">
                    {content.cta.btnGuide}
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default StrategicPMO;