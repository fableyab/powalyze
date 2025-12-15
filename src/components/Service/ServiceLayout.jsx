
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import DownloadSection from '@/components/landing/DownloadSection';
import ServiceHero from './ServiceHero';
import ServiceSidebar from './ServiceSidebar';
import InteractiveExamples from './InteractiveExamples';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const ServiceLayout = ({ content, breadcrumbs }) => {
  if (!content) return null;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#BFA76A] selection:text-black">
      <Navbar />
      
      <ServiceHero 
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        cta={content.hero.cta}
        breadcrumbs={breadcrumbs}
      />

      <main className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Introduction */}
            <section className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                {content.intro.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {content.intro.content}
              </p>
            </section>

            {/* Challenges Grid */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-[#BFA76A] pl-4">
                Vos Défis Actuels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.challenges.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-[#BFA76A]/30 transition-colors"
                  >
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Methodology Steps */}
            <section className="bg-[#111] rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Notre Méthodologie</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#BFA76A] to-transparent hidden md:block"></div>
                <div className="space-y-8">
                  {content.methodology.map((step, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 relative">
                      <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#BFA76A] text-black font-bold z-10 shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <span className="md:hidden w-6 h-6 rounded-full bg-[#BFA76A] text-black text-xs flex items-center justify-center">{index + 1}</span>
                          {step.title}
                        </h4>
                        <p className="text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-8">Cas Concrets</h3>
              <div className="grid grid-cols-1 gap-6">
                {content.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#111] border-l-4 border-[#BFA76A]">
                    {useCase.icon && (
                      <div className="p-2 bg-[#BFA76A]/10 rounded-lg text-[#BFA76A] shrink-0">
                        <useCase.icon size={24} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white text-lg">{useCase.title}</h4>
                      <p className="text-gray-400 mt-1">{useCase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ROI / Benefits */}
            <section>
               <h3 className="text-2xl font-bold text-white mb-6">Pourquoi choisir Powalyze ?</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Expertise Senior Certifiée", "Approche Pragmatique", "Transfert de Compétences", "Résultats Mesurables"].map((benefit, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-[#BFA76A]" />
                        <span className="text-gray-300">{benefit}</span>
                     </div>
                  ))}
               </div>
            </section>

            {/* Interactive Examples */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-8">Exemples Interactifs</h3>
              <InteractiveExamples type="pmo" />
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ServiceSidebar />
          </div>

        </div>
      </main>

      <DownloadSection />

      <FooterSection />
    </div>
  );
};

export default ServiceLayout;
