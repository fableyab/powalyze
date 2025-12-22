import React from 'react';
import { Check } from 'lucide-react';

const Advantages = () => {
  const advantages = [
    { title: 'Gain de temps', desc: 'Réduisez de 70% le temps passé sur les reportings' },
    { title: 'Visibilité totale', desc: 'Vue 360° en temps réel sur tous vos projets' },
    { title: 'Décisions rapides', desc: 'Anticiper les risques et agir proactivement' },
    { title: 'Collaboration fluide', desc: 'Équipes alignées sur les mêmes objectifs' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-powalyze-blue to-powalyze-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Pourquoi Powalyze ?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Les avantages qui font la différence</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <Check className="text-amber-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{adv.title}</h3>
              <p className="text-blue-100">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
