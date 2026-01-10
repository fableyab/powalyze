import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Users,
  FileText,
  Clock,
  Shield,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function Governance() {
  return (
    <>
      <SEO 
        title="Gouvernance - Powalyze Méthode & Rituels"
        description="Structurer la gouvernance, au-delà des outils. Un cadre clair pour vos rituels, décisions et responsabilités."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/50">
          <nav className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-white">Pow</span>
                <span className="text-[#D4AF37]">alyze</span>
              </Link>
              
              <div className="hidden md:flex md:items-center md:gap-8">
                <Link to="/product" className="text-gray-400 hover:text-white transition-colors">Produit</Link>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</Link>
                <Link to="/platform" className="text-gray-400 hover:text-white transition-colors">Plateforme</Link>
                <Link to="/governance" className="text-white border-b-2 border-blue-500">Gouvernance</Link>
                <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">Connexion</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Structurer la gouvernance,
              <br />
              <span className="text-blue-500">au-delà des outils</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Powalyze apporte un cadre clair pour vos rituels,
              <br />
              vos décisions et vos responsabilités.
            </p>
          </div>
        </section>

        {/* Rituels */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-blue-600/10 text-blue-500 p-6 rounded-xl">
                <Calendar className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Des rituels clairs, une cadence maîtrisée</h2>
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-3xl">
              Comités, points d'avancement, arbitrages : chaque rituel peut être cadré dans Powalyze,
              <br />
              avec les bons participants, les bons sujets et les bonnes décisions.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Comités stratégiques', 'Points d\'avancement', 'Arbitrages', 'Décisions'].map((item, i) => (
                <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 mb-3" />
                  <div className="text-white font-semibold">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modèles */}
        <section className="py-24 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-6 rounded-xl">
                <FileText className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Des modèles structurants, adaptés à votre réalité</h2>
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-3xl">
              Powalyze propose des structures de portefeuilles, de risques, de décisions et de suivis
              <br />
              que vous pouvez ajuster à votre organisation.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Portefeuilles',
                  description: 'Structures hiérarchiques adaptables'
                },
                {
                  title: 'Risques',
                  description: 'Cadres d\'évaluation personnalisables'
                },
                {
                  title: 'Décisions',
                  description: 'Modèles d\'arbitrage cohérents'
                }
              ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traçabilité */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-green-600/10 text-green-500 p-6 rounded-xl">
                <Clock className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Un historique exploitable, à tout moment</h2>
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-3xl">
              Décisions, changements d'état, ajustements : chaque élément est horodaté et relié à son contexte.
              <br />
              Vous gardez une trace claire de <span className="text-white">ce qui a été décidé, quand et sur quelle base</span>.
            </p>

            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Shield, label: 'Horodatage complet' },
                  { icon: Users, label: 'Responsabilités tracées' },
                  { icon: FileText, label: 'Contexte préservé' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className="w-10 h-10 text-green-500 mx-auto mb-4" />
                    <div className="text-white font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Prêt à cadrer
              <br />
              <span className="text-blue-500">votre gouvernance ?</span>
            </h2>
            
            <Link
              to="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Découvrir la plateforme
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-8 bg-slate-950 border-t border-slate-800/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-white">Pow</span>
                <span className="text-[#D4AF37]">alyze</span>
              </Link>
              
              <div className="flex gap-8">
                <Link to="/product" className="text-gray-400 hover:text-white transition-colors">Produit</Link>
                <Link to="/governance" className="text-gray-400 hover:text-white transition-colors">Gouvernance</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
