import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function PmoOperations() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/services" className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-[#D4AF37] transition-colors mb-8">
            <FiArrowLeft className="w-5 h-5" /> Retour aux services
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center">
                <span className="text-3xl">⚙️</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
                PMO Operations
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Opérations quotidiennes et support continu pour la réussite de vos projets
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
                PMO Operations assure le support opérationnel quotidien de vos projets. Nous fournissons les outils, les méthodes et l'accompagnement terrain pour garantir l'exécution efficace de vos initiatives.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nos services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Support projet', desc: 'Assistance continue aux chefs de projet' },
                  { title: 'Outils et méthodes', desc: 'Mise à disposition d’outils et templates' },
                  { title: 'Formation', desc: 'Formation des équipes aux bonnes pratiques' },
                  { title: 'Accompagnement terrain', desc: 'Support opérationnel au quotidien' },
                  { title: 'Gestion des risques', desc: 'Identification et mitigation proactive' },
                  { title: 'Reporting opérationnel', desc: 'Suivi et tableaux de bord en temps réel' },
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
                  'Amélioration de l’efficacité opérationnelle',
                  'Réduction du time-to-market',
                  'Standardisation des processus',
                  'Montée en compétence des équipes',
                  'Meilleure gestion des risques et problèmes',
                  'Qualité et cohérence améliorées',
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
              <p className="text-gray-400 mb-6">Contactez-nous pour discuter de vos besoins opérationnels</p>
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