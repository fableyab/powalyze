import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroHighTech() {
  return (
    <section className="relative h-screen flex items-center bg-brand-blue-dark overflow-hidden">

      {/* GRID TECH */}
      <div className="absolute inset-0 tech-grid opacity-[0.15]" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue-dark/40 to-brand-blue-dark" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT — TEXT */}
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Le cockpit <span className="text-brand-gold">high‑tech</span>  
            <br />de votre gouvernance
          </h1>

          <p className="text-white/70 text-lg mb-8">
            Portefeuilles, comités, décisions, risques & IA — unifiés dans un OS moderne et intelligent.
          </p>

          <div className="flex gap-4">
            <Link 
              to="/signup"
              className="px-6 py-3 bg-brand-gold text-black rounded-md font-medium shadow-lg hover:shadow-brand-gold/40 transition"
            >
              Essayer Powalyze
            </Link>
            <Link 
              to="/demo-new"
              className="px-6 py-3 border border-brand-gold/40 text-brand-gold rounded-md hover:bg-brand-gold/10 transition"
            >
              Voir la démo
            </Link>
          </div>
        </div>

        {/* RIGHT — MOCKUP */}
        <div className="relative">
          <div className="rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-electric/20 p-8 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <div className="aspect-video bg-brand-blue rounded-lg border border-brand-gold/30 flex items-center justify-center">
              <span className="text-brand-gold text-2xl font-semibold">Cockpit Preview</span>
            </div>
          </div>

          {/* HOLOGRAPHIC GLOW */}
          <div className="absolute inset-0 rounded-xl bg-brand-gold/10 blur-3xl opacity-40" />
        </div>
      </div>
    </section>
  );
}
