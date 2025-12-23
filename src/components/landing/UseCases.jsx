import React from 'react';
import { Link } from 'react-router-dom';

const UseCases = () => {
  const useCases = [
    {
      title: 'PMO Stratégique',
      description: 'Alignez vos projets avec la stratégie d’entreprise et optimisez votre portefeuille.',
      image: '🎯',
      link: '/services/pmo-strategique'
    },
    {
      title: 'Transformation Digitale',
      description: 'Pilotez vos initiatives de transformation avec agilité et précision.',
      image: '🚀',
      link: '/services/pmo-strategique'
    },
    {
      title: 'Automatisation IA',
      description: 'Automatisez vos processus PMO et libérez du temps pour la stratégie.',
      image: '🤖',
      link: '/services/automatisation-ia'
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Cas d'Usage</h2>
          <p className="text-xl text-gray-400">Adapté à tous les types de PMO</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <Link key={idx} to={useCase.link} className="bg-[#111] border border-white/10 rounded-lg p-8 hover:border-[#BFA76A]/50 transition-all group">
              <div className="text-6xl mb-4">{useCase.image}</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#BFA76A] transition-colors">{useCase.title}</h3>
              <p className="text-gray-400">{useCase.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
