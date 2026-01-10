import React from 'react';

export default function FeaturesHighTech() {
  const features = [
    {
      title: "Pilotage portefeuille",
      text: "Vue portefeuille, priorisation, santé, signaux IA.",
      tag: "Portfolio Manager"
    },
    {
      title: "Préparation comité",
      text: "Ordre du jour automatique, points critiques, décisions.",
      tag: "Committee Center"
    },
    {
      title: "Traçabilité des décisions",
      text: "Impacts, actions, historique, conformité.",
      tag: "Decision Hub"
    },
  ];

  return (
    <section className="relative py-24 bg-brand-blue-dark">
      <div className="absolute inset-0 tech-grid opacity-[0.1]" />

      <div className="relative max-w-7xl mx-auto px-6 space-y-32">
        {features.map((f, i) => (
          <div
            key={i}
            className={`grid md:grid-cols-2 gap-16 items-center ${
              i % 2 === 1 ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* IMAGE/MOCKUP */}
            <div className={`relative ${i % 2 === 1 ? "md:col-start-2" : ""}`}>
              <div className="rounded-xl bg-gradient-to-br from-brand-gold/10 to-brand-electric/10 p-6 shadow-[0_0_40px_rgba(212,175,55,0.25)] border border-brand-gold/20">
                <div className="aspect-video bg-brand-blue rounded-lg flex items-center justify-center">
                  <span className="text-brand-gold text-xl font-semibold">{f.tag}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-gold/10 rounded-xl" />
            </div>

            {/* TEXT */}
            <div className={i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
              <h3 className="text-3xl font-semibold text-white mb-4">
                {f.title}
              </h3>
              <p className="text-white/70 text-lg">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
