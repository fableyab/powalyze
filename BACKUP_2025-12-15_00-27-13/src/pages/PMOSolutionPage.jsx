
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useLanguage } from '@/context/LanguageContext';
import { pmoSolutionData } from '@/data/pmoSolutionData';
import PMOFeatures from '@/components/PMOFeatures';
import PMOUseCases from '@/components/PMOUseCases';
import PMOPricing from '@/components/PMOPricing';
import PMOTestimonials from '@/components/PMOTestimonials';
import Accordion from '@/components/Accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PMOSolutionPage = () => {
  const { language } = useLanguage();
  const t = pmoSolutionData;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFA76A] selection:text-black">
      <Helmet>
        <title>{t.hero.title[language]} | Powalyze</title>
        <meta name="description" content={t.hero.subtitle[language]} />
      </Helmet>
      
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#BFA76A]/10 via-[#0A0A0A] to-[#0A0A0A] z-0 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BFA76A]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#BFA76A]/30 bg-[#BFA76A]/10 text-[#BFA76A] text-xs font-bold uppercase tracking-widest mb-6">
              New: PMO 360 Edition
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight max-w-5xl mx-auto">
              {t.hero.title[language]}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light mb-10 max-w-3xl mx-auto">
              {t.hero.subtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact">
                <Button size="xl" className="bg-[#BFA76A] text-black hover:bg-white font-bold px-10 shadow-[0_0_30px_rgba(191,167,106,0.3)]">
                  {t.hero.cta[language]}
                </Button>
              </Link>
              <Link to="/pmo-demo">
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/5 px-10">
                  Live Preview
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* OVERVIEW & BENEFITS */}
        <section className="py-20 bg-[#0F0F0F] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                  {t.overview.title[language]}
                </h2>
                <div className="space-y-4">
                  {t.overview.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" />
                      <p className="text-gray-300 text-lg">{benefit[language]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#BFA76A]/20 blur-3xl -z-10 rounded-full" />
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                  alt="PMO Dashboard" 
                  className="rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to manage complex portfolios with ease.</p>
          </div>
          <PMOFeatures />
        </section>

        {/* USE CASES */}
        <section className="py-24 bg-[#111]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Real World Impact</h2>
            </div>
            <PMOUseCases />
          </div>
        </section>

        {/* PRICING */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Transparent Pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your organization.</p>
          </div>
          <PMOPricing />
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#0F0F0F] border-y border-white/5">
          <div className="container mx-auto px-6">
            <PMOTestimonials />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">FAQ</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
            <Accordion items={t.faq.map(f => ({
              title: f.q[language],
              content: f.a[language]
            }))} />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#BFA76A]/20 to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Prêt à transformer votre PMO ?
            </h2>
            <Link to="/contact">
              <Button size="xl" className="bg-[#BFA76A] text-black hover:bg-white font-bold px-12 h-16 text-lg rounded-full shadow-lg shadow-[#BFA76A]/20">
                Commencer maintenant <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <FooterSection />
    </div>
  );
};

export default PMOSolutionPage;
