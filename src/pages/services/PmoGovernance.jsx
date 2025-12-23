import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function PmoGovernance() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-[#D4AF37] transition-colors mb-8"
          >
            <FiArrowLeft className="w-5 h-5" />
            Retour aux services
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
                PMO Governance
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Gouvernance et pilotage stratégique de votre portefeuille projets pour maximiser la valeur business
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Vue d'ensemble</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 text-lg leading-relaxed mb-4">
                  Notre service de PMO Governance vous aide à établir un cadre de gouvernance solide pour piloter efficacement votre portefeuille de projets. Nous mettons en place les structures, processus et outils nécessaires pour assurer l'alignement stratégique et maximiser le ROI.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Grâce à notre expertise, vous bénéficiez d'une vision globale et d'un contrôle optimal sur l'ensemble de vos initiatives projets.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nos expertises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Framework PMO', desc: 'Mise en place d’un framework adapté à votre organisation' },
                  { title: 'Rôles et responsabilités', desc: 'Définition claire des rôles et des circuits de décision' },
                  { title: 'Procédures et standards', desc: 'Standardisation des processus et bonnes pratiques' },
                  { title: 'Gouvernance multi-projets', desc: 'Pilotage cohérent de votre portefeuille projets' },
                  { title: 'Comités de pilotage', desc: 'Organisation et animation des comités de décision' },
                  { title: 'Reporting exécutif', desc: 'Tableaux de bord et rapports pour la direction' },
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
                  'Alignement stratégique des projets avec les objectifs business',
                  'Visibilité complète sur le portefeuille projets',
                  'Optimisation de l’allocation des ressources',
                  'Réduction des risques et amélioration de la prise de décision',
                  'Standardisation des processus et gain d’efficacité',
                  'Amélioration continue de la maturité projet',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheckCircle className="w-6 h-6 text-[#BFA76A] flex-shrink-0 mt-1" />
                    <span className="text-gray-400 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Demander un devis</h3>
              <p className="text-gray-400 mb-6">
                Contactez-nous pour discuter de vos besoins en gouvernance PMO
              </p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
              >
                Nous contacter
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Services liés</h3>
              <ul className="space-y-3">
                {[
                  { name: 'PMO Strategy', path: '/services/pmo-strategy' },
                  { name: 'PMO Operations', path: '/services/pmo-operations' },
                  { name: 'PMO Audit', path: '/services/pmo-audit' },
                ].map((service, idx) => (
                  <li key={idx}>
                    <Link
                      to={service.path}
                      className="text-[#BFA76A] hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                    >
                      <FiArrowRight className="w-4 h-4" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}