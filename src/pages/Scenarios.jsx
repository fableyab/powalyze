import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Rocket,
  RefreshCw,
  FolderTree,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Scenarios() {
  return (
    <>
      <SEO 
        title="Scénarios - Powalyze Cas d'Usage"
        description="Trois scénarios universels pour cadrer transformation stratégique, modernisation SI ou portefeuille dense."
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
                <Link to="/scenarios" className="text-white border-b-2 border-blue-500">Scénarios</Link>
                <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">Connexion</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Trois scénarios,
              <br />
              <span className="text-blue-500">un seul cockpit</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transformation stratégique, modernisation SI ou portefeuille dense :
              <br />
              Powalyze s'adapte à votre enjeu.
            </p>
          </div>
        </section>

        {/* Scénario 1 : Transformation stratégique */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-blue-600/10 text-blue-500 p-6 rounded-xl">
                <Rocket className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Transformation stratégique</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Le contexte</h3>
                <p className="text-lg text-gray-400 mb-6">
                  Votre organisation mène un chantier majeur (fusion, changement de modèle, digitalisation complète).
                  <br />
                  Vous avez <span className="text-white">plusieurs initiatives simultanées</span>, des interdépendances complexes et des décisions à prendre à plusieurs niveaux.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">La réponse Powalyze</h3>
                <div className="space-y-4">
                  {[
                    'Vue d\'ensemble de tous les chantiers',
                    'Identification des dépendances',
                    'Pilotage des risques transverses',
                    'Décisions tracées et contextualisées',
                    'Reporting consolidé pour le COMEX'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scénario 2 : Modernisation SI */}
        <section className="py-24 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-6 rounded-xl">
                <RefreshCw className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Modernisation du SI</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Le contexte</h3>
                <p className="text-lg text-gray-400 mb-6">
                  Vous menez un programme de modernisation technique : migration cloud, refonte d'applications, évolutions d'architecture.
                  <br />
                  Les <span className="text-white">impacts métier</span> et les <span className="text-white">dépendances techniques</span> doivent être maîtrisés.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">La réponse Powalyze</h3>
                <div className="space-y-4">
                  {[
                    'Cartographie des composants et dépendances',
                    'Suivi des vagues de migration',
                    'Gestion des risques techniques',
                    'Coordination métier/IT',
                    'Vues par domaine ou par application'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scénario 3 : Portefeuille dense */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-green-600/10 text-green-500 p-6 rounded-xl">
                <FolderTree className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Portefeuille dense d'initiatives</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Le contexte</h3>
                <p className="text-lg text-gray-400 mb-6">
                  Vous gérez en continu <span className="text-white">des dizaines de projets et initiatives</span>, avec des rythmes différents, des budgets échelonnés et des équipes réparties.
                  <br />
                  Vous avez besoin de visibilité globale et de capacité à prioriser.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">La réponse Powalyze</h3>
                <div className="space-y-4">
                  {[
                    'Vue portefeuille multi-niveaux',
                    'Priorisation basée sur critères',
                    'Gestion de la capacité',
                    'Suivi budgétaire et ressources',
                    'Extraction et reporting sur mesure'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Votre scénario mérite
              <br />
              <span className="text-blue-500">un pilotage clair</span>
            </h2>
            
            <Link
              to="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Découvrir la plateforme
              <ArrowRight className="w-5 h-5" />
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
                <Link to="/scenarios" className="text-gray-400 hover:text-white transition-colors">Scénarios</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
