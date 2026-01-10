import React from 'react';

export default function ResultsHighTech() {
  const stats = [
    { value: "-40%", label: "Temps de préparation comité" },
    { value: "+30%", label: "Visibilité sur les risques" },
    { value: "100%", label: "Décisions tracées automatiquement" },
  ];

  return (
    <section className="relative py-24 bg-brand-blue-dark">
      <div className="absolute inset-0 tech-grid opacity-[0.1]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-white text-center mb-16">
          Des résultats mesurables
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <div className="text-5xl font-bold text-brand-gold mb-4">
                {s.value}
              </div>
              <p className="text-white/70 text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
