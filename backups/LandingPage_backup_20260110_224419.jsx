import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BlueprintVisual from '../components/BlueprintVisual';
import {
  Menu,
  X,
  Eye,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Target,
  Award,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Play,
  Globe,
  Lock,
  Database,
  Server,
  ChevronDown,
  Layers,
  Activity,
  GitBranch,
  Settings,
  FileText,
  ArrowRight,
  Workflow,
  Clock,
  UserCheck
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('FR');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'FR', name: 'Français' },
    { code: 'EN', name: 'English' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'IT', name: 'Italiano' },
    { code: 'NO', name: 'Norsk' }
  ];

  return (
    <>
      <SEO 
        title="Powalyze - Le cockpit de gouvernance pour organisations exigeantes"
        description="Plateforme de gouvernance stratégique pour structurer vos décisions, maîtriser vos initiatives et piloter vos enjeux avec précision."
      />
      
      <div className="min-h-screen bg-[#050509] text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#050509]/90 backdrop-blur-sm border-b border-slate-800/50">
          <nav className="mx-auto max-w-5xl px-4 lg:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold">
                  <span className="text-white">Pow</span>
                  <span className="text-[#D4AF37]">alyze</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:gap-6">
                <a href="#fonctionnalites" className="text-[0.7rem] font-medium text-slate-300 hover:text-amber-300 transition-colors">
                  Fonctionnalités
                </a>
                <a href="#architecture" className="text-[0.7rem] font-medium text-slate-300 hover:text-amber-300 transition-colors">
                  Architecture
                </a>
                <a href="#onboarding" className="text-[0.7rem] font-medium text-slate-300 hover:text-amber-300 transition-colors">
                  Déploiement
                </a>
                
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-[#D4AF37] transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{language}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {langMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-slate-800 transition-colors ${
                            language === lang.code ? 'text-[#D4AF37]' : 'text-gray-400'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Connexion
                </Link>
                
                <Link
                  to="/login"
                  className="px-4 py-2 text-[0.75rem] font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 rounded transition-all"
                >
                  Voir la démo
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 space-y-4 border-t border-slate-800">
                <a href="#fonctionnalites" className="block text-gray-400 hover:text-white">
                  Fonctionnalités
                </a>
                <a href="#architecture" className="block text-gray-400 hover:text-white">
                  Architecture
                </a>
                <a href="#onboarding" className="block text-gray-400 hover:text-white">
                  Déploiement
                </a>
                
                {/* Mobile Language Selector */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left ${
                        language === lang.code ? 'text-[#D4AF37]' : 'text-gray-400'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                
                <Link
                  to="/login"
                  className="block px-6 py-3 bg-blue-600 text-white text-center font-semibold rounded-lg"
                >
                  Voir la démo
                </Link>
              </div>
            )}
          </nav>
        </header>

        {/* Hero Section - Blueprint industriel */}
        <section className="relative pt-20 pb-24 px-4 lg:px-6 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-sky-500/5"></div>
          
          <div className="relative mx-auto max-w-6xl">
            <div className="grid md:grid-cols-[1.4fr,1fr] gap-8 items-center">
              {/* Contenu texte */}
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-white">
                  Powalyze — Le système d'exploitation de la gouvernance.
                </h1>
                
                <p className="text-[0.9rem] text-slate-300 leading-relaxed">
                  Une plateforme conçue pour structurer vos décisions, maîtriser vos initiatives
                  et piloter vos enjeux stratégiques avec précision.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link
                    to="/login"
                    className="px-6 py-2 text-[0.75rem] font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 rounded transition-all"
                  >
                    Voir la démo
                  </Link>
                  <Link
                    to="/product"
                    className="px-6 py-2 text-[0.75rem] font-medium border border-slate-700 hover:border-amber-400/50 text-slate-200 rounded transition-all"
                  >
                    Découvrir la plateforme
                  </Link>
                </div>
                
                {/* Métriques compactes */}
                <div className="flex gap-6 pt-4">
                  <div>
                    <div className="text-2xl font-semibold text-amber-400">34</div>
                    <div className="text-[0.7rem] text-slate-500">Projets actifs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-sky-400">€12M</div>
                    <div className="text-[0.7rem] text-slate-500">Budget géré</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-emerald-400">92%</div>
                    <div className="text-[0.7rem] text-slate-500">Santé portfolio</div>
                  </div>
                </div>
              </div>
              
              {/* Visuel Blueprint industriel */}
              <BlueprintVisual 
                variant="hero"
                alt="Schéma de gouvernance Powalyze - Blueprint industriel"
                className="hidden md:block"
              />
            </div>
          </div>
        </section>

        {/* Ce que Powalyze apporte */}
        <section className="py-16 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">
                Clarté. Maîtrise. Impact.
              </h2>
              <p className="text-[0.9rem] text-slate-300 max-w-2xl">
                Powalyze centralise vos initiatives, vos risques, vos décisions et vos données clés
                dans un environnement unifié. L'objectif : transformer la complexité en une vue claire,
                exploitable et partageable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-[0.85rem]">
              {[
                {
                  title: 'Pilotage structuré',
                  description: 'Vision consolidée des portefeuilles, priorités et avancées pour décider au bon niveau, au bon moment.'
                },
                {
                  title: 'Gouvernance lisible',
                  description: 'Rituels, décisions, responsabilités et engagements organisés, traçables et alignés.'
                },
                {
                  title: 'Reporting immédiat',
                  description: 'Synthèses prêtes à être partagées, sans retraitement manuel ni mise en forme de dernière minute.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-950/80 border border-slate-800 rounded-md p-4 hover:border-amber-400/30 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple compact sections like Contact */}
        <section className="py-16 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Une seule salle de contrôle pour vos enjeux
              </h2>
              <p className="text-[0.9rem] text-slate-300 max-w-3xl mx-auto">
                Powalyze rassemble vos informations critiques dans un cockpit lisible : initiatives, risques, actions, ressources, décisions.
              </p>
            </div>
          </div>
        </section>

        {/* Fonctionnalités clés */}
        <section id="fonctionnalites" className="py-16 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-white mb-8">
              Les briques essentielles de votre gouvernance
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-[0.85rem]">
              {[
                { title: 'Portefeuilles & initiatives', description: 'Structuration, priorisation, suivi et impacts transverses.' },
                { title: 'Risques & actions', description: 'Identification, évaluation, plans d\'action et suivi dans le temps.' },
                { title: 'Rituels & décisions', description: 'Comités, arbitrages, validations, historique complet.' },
                { title: 'Capacité & charge', description: 'Vision des ressources, contraintes et effets sur les délais.' },
                { title: 'Vues exécutives', description: 'Synthèses claires pour les instances de décision.' }
              ].map((item, index) => (
                <div key={index} className="bg-slate-950/80 border border-slate-800 rounded-md p-4 hover:border-amber-400/30 transition-colors">
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture & sécurité */}
        <section id="architecture" className="py-16 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Une base technique solide, pensée pour durer
            </h2>
            <p className="text-[0.9rem] text-slate-300 mb-8 max-w-3xl">
              Powalyze repose sur une architecture moderne, modulaire et sécurisée.
              Chaque environnement est isolé, chaque action est tracée, chaque décision est horodatée.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-[0.8rem]">
              {[
                { title: 'Séparation stricte', description: 'Environnements isolés' },
                { title: 'Chiffrement', description: 'En transit et au repos' },
                { title: 'Traçabilité', description: 'Complète et immutable' },
                { title: 'API d\'intégration', description: 'Standards ouverts' },
                { title: 'Haute disponibilité', description: '99.9% uptime' }
              ].map((item, index) => (
                <div key={index} className="bg-slate-950/80 border border-slate-800 rounded-md p-3 text-center hover:border-sky-500/30 transition-colors">
                  <h3 className="text-[0.7rem] font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-[0.65rem] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding & accompagnement */}
        <section id="onboarding" className="py-16 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Un déploiement rapide, un accompagnement expert
            </h2>
            <p className="text-[0.9rem] text-slate-300 mb-8 max-w-3xl">
              Powalyze s'adapte à votre organisation. Nous configurons vos structures, vos rituels, vos modèles de décision
              pour un cockpit opérationnel en quelques semaines.
            </p>

            <div className="grid md:grid-cols-4 gap-4 text-[0.85rem]">
              {[
                { title: 'Paramétrage guidé', description: 'Configuration adaptée à votre contexte' },
                { title: 'Modèles prêts', description: 'Templates de rituels et décisions' },
                { title: 'Support expert', description: 'Accompagnement et formation' },
                { title: 'Amélioration continue', description: 'Évolution avec vos besoins' }
              ].map((item, index) => (
                <div key={index} className="bg-slate-950/80 border border-slate-800 rounded-md p-4 text-center hover:border-amber-400/30 transition-colors">
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Prêt à structurer votre gouvernance ?
            </h2>
            
            <p className="text-[0.9rem] text-slate-300 mb-8">
              Découvrez comment Powalyze peut devenir le cockpit central de vos décisions et initiatives stratégiques.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/login"
                className="px-6 py-2 text-[0.75rem] font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 rounded transition-all"
              >
                Voir la démo
              </Link>
              <Link
                to="/contact"
                className="px-6 py-2 text-[0.75rem] font-medium border border-slate-700 hover:border-amber-400/50 text-slate-200 rounded transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 lg:px-6 border-t border-slate-800/50">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[0.7rem]">
              <div className="text-center md:text-left">
                <Link to="/" className="text-xl font-bold">
                  <span className="text-white">Pow</span>
                  <span className="text-amber-400">alyze</span>
                </Link>
                <p className="text-slate-500 mt-1">Le cockpit de gouvernance pour organisations exigeantes</p>
              </div>
              
              <div className="flex gap-6 text-slate-400">
                <Link to="/login" className="hover:text-amber-300 transition-colors">Connexion</Link>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact</Link>
                <Link to="/legal" className="hover:text-amber-300 transition-colors">Mentions</Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-800/50 text-center text-slate-500 text-[0.65rem]">
              © {new Date().getFullYear()} Powalyze. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
