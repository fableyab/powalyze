import React from 'react';

export default function DemoHighTech() {
  return (
    <section className="relative py-24 bg-brand-blue-dark">
      <div className="absolute inset-0 tech-grid opacity-[0.1]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-white mb-4">
          Découvrez Powalyze en action
        </h2>

        <p className="text-white/70 mb-10">
          Vue portefeuille • Alerte IA • Comité • Arbitrage • Power BI • Décision tracée
        </p>

        <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
          <video className="w-full h-full object-cover" controls playsInline>
            <source src="/videos/pmo-data-expert.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        </div>
      </div>
    </section>
  );
}
