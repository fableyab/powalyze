
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ValuePropSection from '@/components/landing/ValuePropSection';
import Services from '@/components/Services';
import PmoTrackingSection from '@/components/landing/PmoTrackingSection';
import DemoInteractiveSection from '@/components/landing/DemoInteractiveSection';
import CaseStudiesSection from '@/components/landing/CaseStudiesSection';
import TrustMetricsSection from '@/components/landing/TrustMetricsSection';
import DownloadSection from '@/components/landing/DownloadSection';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { seoData } from '@/utils/seoData';
import { useLanguage } from '@/context/LanguageContext';

const Home = () => {
  const { language } = useLanguage();
  const meta = seoData.home;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden">
      <SEO 
        title={meta.title[language]}
        description={meta.description[language]}
        keywords={meta.keywords[language]}
        image={meta.image}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Overview */}
      <Services />

      {/* Demo Interactive Section */}
      <DemoInteractiveSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Trust Metrics Section */}
      <TrustMetricsSection />

      {/* Value Proposition */}
      <ValuePropSection />

      {/* Downloads Section */}
      <DownloadSection />

      {/* PMO Tracking Features */}
      <PmoTrackingSection />
      
      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-[#BFA76A]/10 to-transparent"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
               Prêt à transformer votre <span className="text-[#BFA76A]">PMO</span> ?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
               Découvrez comment Powalyze peut structurer, suivre et optimiser vos projets stratégiques en moins de 30 jours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link to="/contact">
                  <Button size="xl" className="w-full sm:w-auto bg-[#BFA76A] text-black hover:bg-white font-bold shadow-lg shadow-[#BFA76A]/20">
                     Démarrer Gratuitement
                  </Button>
               </Link>
               <a href="https://powalyze.ch/pmo-demo">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 group">
                     Voir la Solution PMO <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </a>
            </div>
         </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Home;
