import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <span className="inline-block bg-[#BFA76A]/20 text-[#BFA76A] px-4 py-2 rounded-full text-sm font-medium border border-[#BFA76A]/30 mb-6">
            🏆 Plateforme PMO Premium
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          L'Art du Pilotage<br />
          <span className="text-[#BFA76A]">Stratégique</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Transformez votre gouvernance de projets avec une plateforme PMO intelligente qui combine Power BI, automatisation IA et pilotage stratégique pour des décisions éclairées.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to="/services/pmo-strategique" className="bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-8 py-4 rounded-lg font-semibold transition-all text-lg">
            Voir Solution PMO
          </Link>
          <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg">
            Nous contacter
          </Link>
        </div>

        <div className="animate-bounce">
          <FiArrowDown className="mx-auto text-[#BFA76A]" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
