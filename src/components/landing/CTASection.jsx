import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Prêt à structurer votre <span className="text-powalyze-blue">PMO</span> ?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Découvrez comment Powalyze peut transformer votre pilotage de projets en moins de 30 jours. 
          Démo personnalisée, configuration sur mesure, accompagnement complet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="mailto:contact@powalyze.ch?subject=Demande de démo Powalyze"
            className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
          >
            <Calendar className="w-5 h-5" />
            Demander une démo gratuite
          </a>
          <Link
            to="/workspace"
            className="btn-outline inline-flex items-center justify-center gap-2 text-lg"
          >
            Explorer le workspace
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-green-500 text-2xl">✓</span>
            <span className="font-medium">Configuration en 48h</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-green-500 text-2xl">✓</span>
            <span className="font-medium">Formation incluse</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-green-500 text-2xl">✓</span>
            <span className="font-medium">Support prioritaire</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-green-500 text-2xl">✓</span>
            <span className="font-medium">Hébergement Suisse</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
