import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
            <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">Conseil Suisse Premium</span>
          </div>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            L'Art du Pilotage<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Stratégique</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            PMO + Power BI + Data Analytics : Transformez Vos Projets en Succès
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/espace-pro/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg">
              Voir la Solution PMO<ArrowRight className="w-5 h-5" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transition-all text-lg">
              Nous contacter
            </a>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center gap-2 text-blue-300 animate-bounce">
            <span className="text-xs font-semibold uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-3 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
