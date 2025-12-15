import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import CalendlyButton from '@/components/ui/CalendlyButton';
import { Quote, PlayCircle, BarChart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TestimonialsPage = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const testimonials = [
    {
      id: 1,
      client: "Finance Corp",
      industry: "Banque",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/UBS_Logo.svg/2560px-UBS_Logo.svg.png", 
      quote: "L'approche structurée de Powalyze a permis de sécuriser notre migration core banking.",
      author: "Jean-Pierre D.",
      role: "CTO",
      metrics: ["-30% Time to Market", "+15% Efficacité"],
      video: null
    },
    {
      id: 2,
      client: "Pharma Giant",
      industry: "Pharma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Novartis_logo.svg/2560px-Novartis_logo.svg.png", 
      quote: "Une gouvernance Data irréprochable qui a passé tous les audits réglementaires.",
      author: "Sarah M.",
      role: "Head of Data",
      metrics: ["100% Conformité", "Zéro pénalité"],
      video: "https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/8348320-uhd_3840_2160_25fps-KIcWt84jQ0ju6ziH.mp4"
    },
    {
      id: 3,
      client: "Swiss Watch",
      industry: "Luxe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rolex_logo.svg/1200px-Rolex_logo.svg.png", 
      quote: "Powalyze comprend les codes du luxe : excellence, précision et discrétion.",
      author: "Marc A.",
      role: "Director of Ops",
      metrics: ["Optimisation Supply Chain", "ROI x3"],
      video: null
    }
  ];

  const filtered = activeFilter === 'All' ? testimonials : testimonials.filter(t => t.industry === activeFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Témoignages & Études de Cas | Powalyze</title>
        <meta name="description" content="Découvrez comment Powalyze transforme les entreprises suisses. Témoignages clients, résultats chiffrés et success stories." />
      </Helmet>
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          
          <div className="text-center mb-16">
            <span className="text-[#BFA76A] font-bold uppercase tracking-[0.2em] mb-4 block text-xs">Succès Clients</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">L'Excellence Prouvée</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Nos partenaires parlent de nous mieux que nous ne le ferions. Découvrez l'impact de nos interventions.
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {['All', 'Banque', 'Pharma', 'Luxe', 'Industrie'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#BFA76A] text-black border-[#BFA76A] font-bold' 
                    : 'bg-transparent border-[#333] text-gray-400 hover:border-[#BFA76A] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#BFA76A]/50 transition-colors group flex flex-col"
                >
                  <div className="p-8 flex-1">
                    <div className="h-12 mb-8 opacity-70 grayscale group-hover:grayscale-0 transition-all">
                       {/* Placeholder for logos if URL breaks, or use text */}
                       <img src={item.logo} alt={item.client} className="h-full object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
                       <span className="hidden text-xl font-bold font-display">{item.client}</span>
                    </div>
                    
                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 text-[#BFA76A]/20" size={32} />
                      <p className="text-lg text-gray-300 relative z-10 italic leading-relaxed">"{item.quote}"</p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#BFA76A] font-bold">
                        {item.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{item.author}</p>
                        <p className="text-gray-500 text-xs uppercase">{item.role}</p>
                      </div>
                    </div>
                  </div>

                  {item.video && (
                    <div className="relative h-48 bg-black group-hover:opacity-100 opacity-80 transition-opacity">
                      <video src={item.video} className="w-full h-full object-cover" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <PlayCircle className="text-white drop-shadow-lg" size={48} />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Video Case</div>
                    </div>
                  )}

                  <div className="bg-[#161616] p-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex gap-4">
                      {item.metrics.map((m, i) => (
                        <span key={i} className="text-[#BFA76A] text-xs font-bold flex items-center gap-1">
                          <BarChart size={12} /> {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-20 bg-gradient-to-r from-[#111] to-[#0A0A0A] border border-[#BFA76A]/30 p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-display font-bold mb-6">Écrivez votre propre succès</h2>
            <CalendlyButton className="h-14 px-8 text-lg" text="Démarrer votre transformation" />
          </div>

        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default TestimonialsPage;