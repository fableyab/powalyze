import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Pricing() {
  return (
    <>
      <SEO 
        title="Tarifs - Powalyze Cockpit de Gouvernance"
        description="Une offre premium avec accès complet à tous les modules, support expert et mise en place guidée."
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
                <Link to="/pricing" className="text-white border-b-2 border-blue-500">Tarifs</Link>
                <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">Connexion</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative pt-24 pb-16 px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Une offre complète et lisible
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              Powalyze est proposé en mode SaaS premium avec un accès complet aux modules.
            </p>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-md border border-slate-800 bg-slate-950/80 p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Offre Premium</h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Accès complet à tous les modules</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Support expert et accompagnement</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Mise en place guidée et formation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Évolutions et mises à jour continues</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Le tarif est établi sur la base de votre périmètre : nombre d'utilisateurs, volume de données et modules activés.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                Demander une estimation
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Une question sur l'offre ?
            </h2>
            <p className="text-gray-400 mb-8">
              Nous sommes à votre disposition pour échanger sur votre contexte et vos besoins.
            </p>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Nous contacter
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
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
