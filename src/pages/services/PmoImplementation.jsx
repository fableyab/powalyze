import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function PmoImplementation() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/services" className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-[#D4AF37] transition-colors mb-8">
            <FiArrowLeft className="w-5 h-5" /> Retour aux services
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
                PMO Implementation
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Implémentation clés en main de votre PMO avec accompagnement jusqu'au go-live
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Vue d'ensemble</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                PMO Implementation prend en charge l'intégralité de la mise en place de votre PMO. De la conception à la mise en production, nous vous accompagnons pour garantir un démarrage réussi.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Notre approche</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Setup PMO', desc: 'Mise en place complète de l’organisation PMO' },
                  { title: 'Outils et templates', desc: 'Déploiement des outils et livrables standards' },
                  { title: 'Formation équipes', desc: 'Formation complète de tous les acteurs' },
                  { title: 'Go-live support', desc: 'Accompagnement intensif au démarrage' },
                  { title: 'Change management', desc: 'Gestion du changement et adoption' },
                  { title: 'Hypersoin post go-live', desc: 'Support continu après le lancement' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Bénéfices</h2>
              <ul className="space-y-4">
                {[
                  'Déploiement rapide et sécurisé',
                  'Mise en place des bonnes pratiques dès le départ',
                  'Réduction des risques liés au lancement',
                  'Adoption rapide par les équipes',
                  'Gain de temps et d’efficacité',
                  'ROI rapide sur l’investissement PMO',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheckCircle className="w-6 h-6 text-[#BFA76A] flex-shrink-0 mt-1" />
                    <span className="text-gray-400 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Demander un devis</h3>
              <p className="text-gray-400 mb-6">Contactez-nous pour implémenter votre PMO</p>
              <Link to="/contact" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all">
                Nous contacter <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}