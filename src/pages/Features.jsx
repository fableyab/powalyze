import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Features() {
  return (
    <>
      <SEO 
        title="Fonctionnalités - Powalyze Cockpit de Gouvernance"
        description="Les briques essentielles de Powalyze pour piloter vos enjeux complexes dans un environnement simple et cohérent."
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
                <Link to="/features" className="text-white border-b-2 border-blue-500">Fonctionnalités</Link>
                <Link to="/platform" className="text-gray-400 hover:text-white transition-colors">Plateforme</Link>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link>
                <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">Connexion</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative pt-24 pb-16 px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Les briques essentielles de Powalyze
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Powalyze rassemble les fonctionnalités clés pour piloter vos enjeux complexes dans un environnement simple, lisible et cohérent.
            </p>
          </div>
        </section>

        {/* Grid fonctionnalités */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 text-sm">
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Pilotage des portefeuilles</h2>
                <p className="mt-2 text-gray-300">
                  Visualisation des initiatives, niveaux de priorité, statuts et dépendances dans une vue claire.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Gestion structurée des risques</h2>
                <p className="mt-2 text-gray-300">
                  Matrice de risques, suivi des plans d'action et lecture immédiate des effets de vos arbitrages.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Rituels de gouvernance</h2>
                <p className="mt-2 text-gray-300">
                  Préparation, conduite et suivi des comités dans un cadre structuré, avec un historique exploitable.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Ressources & capacité</h2>
                <p className="mt-2 text-gray-300">
                  Vue d'ensemble sur la charge et les contraintes clés, pour ajuster vos ambitions et vos décisions.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4 md:col-span-2">
                <h2 className="text-sm font-semibold text-white">Reporting & communication</h2>
                <p className="mt-2 text-gray-300">
                  Vues synthétiques prêtes pour vos instances de décision, sans retraitement manuel ni mise en forme de dernière minute.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Prêt à découvrir
              <br />
              <span className="text-blue-500">le cockpit en action ?</span>
            </h2>
            
            <Link
              to="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Voir la démo
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
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
