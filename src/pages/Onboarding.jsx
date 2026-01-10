import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Users,
  Book,
  CheckCircle2,
  Headphones,
  ArrowRight
} from 'lucide-react';

export default function Onboarding() {
  return (
    <>
      <SEO 
        title="Déploiement - Powalyze Accompagnement"
        description="Un déploiement guidé, un accompagnement expert et un support réactif."
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
                <Link to="/onboarding" className="text-white border-b-2 border-blue-500">Déploiement</Link>
                <Link to="/login" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">Connexion</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative pt-32 pb-24 px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Un déploiement guidé,
              <br />
              <span className="text-blue-500">un accompagnement expert</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Powalyze s'installe en quelques semaines,
              <br />
              avec un cadre clair et un support réactif.
            </p>
          </div>
        </section>

        {/* Méthode de déploiement */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-blue-600/10 text-blue-500 p-6 rounded-xl">
                <Book className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Une méthode éprouvée, en 4 étapes</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Cadrage',
                  description: 'Périmètre, enjeux, acteurs, rituels'
                },
                {
                  step: '2',
                  title: 'Paramétrage',
                  description: 'Structure, rôles, workflows, modèles'
                },
                {
                  step: '3',
                  title: 'Formation',
                  description: 'Utilisateurs clés, admins, contributeurs'
                },
                {
                  step: '4',
                  title: 'Lancement',
                  description: 'Mise en production, support dédié'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
                  <div className="text-5xl font-bold text-blue-500/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-slate-950/50 border border-slate-800/50 rounded-xl p-8">
              <p className="text-lg text-gray-400">
                <span className="text-white font-semibold">Durée indicative :</span> 3 à 6 semaines selon la complexité de votre organisation.
              </p>
            </div>
          </div>
        </section>

        {/* Support & évolution */}
        <section className="py-24 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-6 rounded-xl">
                <Headphones className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Un support réactif, une évolution continue</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Support expert</h3>
                <p className="text-gray-400">
                  Assistance technique et méthodologique, disponible par email, visio ou téléphone.
                </p>
              </div>

              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Évolutions planifiées</h3>
                <p className="text-gray-400">
                  Nouvelles fonctionnalités, optimisations et ajustements selon vos retours.
                </p>
              </div>

              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800/50">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Documentation vivante</h3>
                <p className="text-gray-400">
                  Guides utilisateurs, tutoriels et bonnes pratiques, mis à jour en continu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accompagnement */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-green-600/10 text-green-500 p-6 rounded-xl">
                <Users className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Un accompagnement adapté à vos besoins</h2>
              </div>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-3xl">
              Au-delà du déploiement technique, nous vous aidons à structurer vos pratiques de gouvernance,
              <br />
              à cadrer vos rituels et à <span className="text-white">faire de Powalyze le véritable cockpit de vos décisions</span>.
            </p>

            <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Ateliers de cadrage</h3>
                  <ul className="space-y-3">
                    {[
                      'Définition des rituels',
                      'Structuration des portefeuilles',
                      'Modèles de risques et décisions'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Sessions de formation</h3>
                  <ul className="space-y-3">
                    {[
                      'Utilisateurs finaux',
                      'Administrateurs',
                      'Pilotes de portefeuille'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6 lg:px-8 bg-slate-950">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Prêt à démarrer
              <br />
              <span className="text-blue-500">votre déploiement ?</span>
            </h2>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Échanger avec un expert
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
                <Link to="/onboarding" className="text-gray-400 hover:text-white transition-colors">Déploiement</Link>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
