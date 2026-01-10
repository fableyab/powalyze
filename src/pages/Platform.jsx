import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Platform() {
  return (
    <>
      <SEO 
        title="Plateforme - Powalyze Architecture & Sécurité"
        description="Une plateforme robuste et maîtrisée reposant sur une architecture moderne, durable et sécurisée."
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
                <Link to="/platform" className="text-white border-b-2 border-blue-500">Plateforme</Link>
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
              Une plateforme robuste et maîtrisée
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Powalyze repose sur une architecture moderne, durable et sécurisée, pensée pour la stabilité, la lisibilité et l'évolutivité.
            </p>
          </div>
        </section>

        {/* Architecture + sécurité */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-2 text-sm">
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Architecture modulaire</h2>
                <p className="mt-2 text-gray-300">
                  Un ensemble de modules cohérents reliés par un modèle de données commun, pour enrichir la plateforme sans la complexifier.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Stabilité et performance</h2>
                <p className="mt-2 text-gray-300">
                  Une base technique optimisée pour des usages intensifs, avec une attention portée sur la fluidité et la continuité de service.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Séparation stricte des environnements</h2>
                <p className="mt-2 text-gray-300">
                  Chaque espace client est isolé, les accès sont contrôlés et les actions sont journalisées pour garantir une traçabilité complète.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Intégrations maîtrisées</h2>
                <p className="mt-2 text-gray-300">
                  Des APIs et connecteurs pour relier Powalyze à votre paysage existant, sans dupliquer inutilement vos données.
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
              <span className="text-blue-500">l'architecture ?</span>
            </h2>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Échanger avec un expert
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
                <Link to="/platform" className="text-gray-400 hover:text-white transition-colors">Plateforme</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
