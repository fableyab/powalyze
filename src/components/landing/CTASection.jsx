import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#BFA76A] to-[#8B7355]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-black mb-6">
          Prêt à Transformer Votre PMO ?
        </h2>
        <p className="text-xl text-black/80 mb-8">
          Rejoignez les leaders qui pilotent leurs projets avec intelligence et précision.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-black hover:bg-black/90 text-white px-8 py-4 rounded-lg font-semibold transition-all text-lg">
            Essayer Gratuitement
          </Link>
          <Link to="/contact" className="bg-white/20 hover:bg-white/30 text-black border border-black/20 px-8 py-4 rounded-lg font-semibold transition-all text-lg">
            Demander une Démo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
