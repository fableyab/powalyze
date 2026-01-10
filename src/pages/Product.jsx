import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Product() {
  return (
    <>
      <SEO 
        title="Produit - Powalyze Cockpit de Gouvernance"
        description="Le cockpit qui structure vos décisions. Initiatives, risques, actions et rituels dans un environnement cohérent."
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
                <Link to="/product" className="text-white border-b-2 border-blue-500">Produit</Link>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</Link>
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
              Le cockpit qui structure vos décisions
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Powalyze unifie vos initiatives, vos risques, vos actions et vos données clés dans un environnement cohérent, lisible et actionnable.
            </p>
          </div>
        </section>

        {/* Briques produit */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3 text-sm">
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Initiatives & portefeuilles</h2>
                <p className="mt-2 text-gray-300">
                  Organisation, priorisation et suivi des initiatives dans une vue consolidée, sans multiplier les fichiers.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Risques & actions</h2>
                <p className="mt-2 text-gray-300">
                  Lien direct entre risques identifiés, plans d'action, décisions et impacts sur vos enjeux.
                </p>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-4">
                <h2 className="text-sm font-semibold text-white">Rituels & décisions</h2>
                <p className="mt-2 text-gray-300">
                  Préparation, tenue et suivi des comités avec un historique clair et exploitable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bloc final compact */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl border border-slate-800 bg-slate-950/80 rounded-md p-5">
            <h2 className="text-sm font-semibold text-white">Un environnement unique pour vos enjeux complexes</h2>
            <p className="mt-2 text-sm text-gray-300">
              Le produit est pensé comme un cockpit : une seule interface pour suivre vos initiatives, vos risques et vos décisions, sans disperser l'information.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Prêt à structurer
              <br />
              <span className="text-blue-500">votre pilotage ?</span>
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