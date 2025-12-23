import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function PmoStrategy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-b border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/services" className="inline-flex items-center gap-2 text-[#BFA76A] hover:text-[#D4AF37] transition-colors mb-8">
            <FiArrowLeft className="w-5 h-5" /> Retour aux services
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                <span className="text-3xl">📈</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
                PMO Strategy
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Stratégie et transformation de votre organisation projet pour créer un avantage compétitif durable
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
                PMO Strategy vous aide à définir et mettre en œuvre une stratégie PMO alignée sur votre vision business. Nous transformons votre organisation projet pour maximiser la création de valeur.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nos expertises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Roadmap stratégique', desc: 'Définition de la vision et feuille de route PMO' },
                  { title: 'Transformation PMO', desc: 'Accompagnement du changement organisationnel' },
                  { title: 'Maturité projet', desc: 'Évaluation et évolution de la maturité' },
                  { title: 'Vision long terme', desc: 'Planification stratégique pluriannuelle' },
                  { title: 'Alignement stratégique', desc: 'Lien fort entre projets et stratégie business' },
                  { title: 'Innovation PMO', desc: 'Intégration des nouvelles pratiques et technologies' },
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
                  'Vision claire et partagée de l’évolution PMO',
                  'Transformation réussie de l’organisation projet',
                  'Amélioration continue de la maturité',
                  'Alignement stratégique renforcé',
                  'Adoption des meilleures pratiques du marché',
                  'Avantage compétitif durable',
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
              <p className="text-gray-400 mb-6">Contactez-nous pour définir votre stratégie PMO</p>
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