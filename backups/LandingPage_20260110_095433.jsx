import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Eye, Shield, TrendingUp, Users, Zap, Target, Award, CheckCircle2, Lightbulb, BarChart3, Menu, X, Play, Globe, Lock, Database, RefreshCw, Server, ChevronDown } from 'lucide-react';

const LandingPage = () => {
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

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <SEO 
        title="Powalyze - Expertise en pilotage stratégique et gouvernance"
        description="L'expertise en pilotage stratégique, gouvernance et décision exécutive."
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#D4AF37]">Powalyze</Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#accompagnement" className="text-white/70 hover:text-[#D4AF37] transition">Accompagnement</a>
            <a href="#environnement" className="text-white/70 hover:text-[#D4AF37] transition">Environnement</a>
            <a href="#excellence" className="text-white/70 hover:text-[#D4AF37] transition">Excellence</a>
            <Link to="/contact" className="text-white/70 hover:text-[#D4AF37] transition">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-md hover:bg-[#D4AF37] hover:text-black transition text-sm flex items-center gap-2"
              >
                {language}
                <ChevronDown size={16} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-black border border-[#D4AF37]/30 rounded-md shadow-xl min-w-[150px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-[#D4AF37]/20 transition ${
                        language === lang.code ? 'text-[#D4AF37]' : 'text-white'
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
              className="px-4 py-2 text-white/80 hover:text-[#D4AF37] transition text-sm"
            >
              Connexion
            </Link>
            <Link 
              to="/app-modules" 
              className="px-5 py-2 bg-[#D4AF37] text-black rounded-md font-medium hover:bg-[#D4AF37]/90 transition"
            >
              Découvrir le SaaS
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A1A2F] border-t border-white/10 px-6 py-4">
            <nav className="flex flex-col gap-4 mb-4">
              <a href="#accompagnement" className="text-white/70 hover:text-[#D4AF37] transition" onClick={() => setMobileMenuOpen(false)}>Accompagnement</a>
              <a href="#environnement" className="text-white/70 hover:text-[#D4AF37] transition" onClick={() => setMobileMenuOpen(false)}>Environnement</a>
              <a href="#excellence" className="text-white/70 hover:text-[#D4AF37] transition" onClick={() => setMobileMenuOpen(false)}>Excellence</a>
              <Link to="/contact" className="text-white/70 hover:text-[#D4AF37] transition" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="w-full px-4 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-md flex items-center justify-center gap-2"
                >
                  {language}
                  <ChevronDown size={16} />
                </button>
                {langMenuOpen && (
                  <div className="mt-2 bg-[#0A1A2F] border border-[#D4AF37]/30 rounded-md">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-[#D4AF37]/20 transition ${
                          language === lang.code ? 'text-[#D4AF37]' : 'text-white'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/login" className="px-4 py-2 text-white/80 hover:text-[#D4AF37] transition text-center">
                Connexion
              </Link>
              <Link to="/app-modules" className="px-4 py-2 bg-[#D4AF37] text-black rounded-md font-medium text-center">
                Découvrir le SaaS
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-black to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Powalyze
          </h1>
          <p className="text-2xl md:text-3xl text-[#60A5FA] mb-8 font-light">
            L'expertise en pilotage stratégique, gouvernance et décision exécutive.
          </p>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-12">
            J'accompagne les directions, les équipes projets et les organisations en croissance dans la structuration de leur gouvernance, l'analyse de leurs données et l'amélioration de leurs décisions — avec la rigueur, la précision et l'exigence des standards d'excellence.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/60">
            <span className="font-light">Clarté</span>
            <span className="text-white/30">·</span>
            <span className="font-light">Maîtrise</span>
            <span className="text-white/30">·</span>
            <span className="font-light">Impact</span>
          </div>
        </div>
      </section>

      {/* Accompagnement Section */}
      <section id="accompagnement" className="py-20 px-6 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Un accompagnement stratégique,<br />structuré et mesurable
          </h2>
          <p className="text-center text-white/60 mb-16 text-lg max-w-3xl mx-auto">
            Powalyze combine mon expertise senior et un environnement numérique professionnel conçu pour offrir :
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Vision claire et consolidée", desc: "Une vue d'ensemble complète de vos projets, portefeuilles et priorités" },
              { icon: Shield, title: "Gouvernance structurée", desc: "Des processus clairs, des rôles définis, des décisions traçables" },
              { icon: TrendingUp, title: "Maîtrise des risques", desc: "Identification précoce, analyse de propagation, mitigation proactive" },
              { icon: Zap, title: "Prise de décision plus rapide", desc: "Informations fiables, synthèses exécutives, alignement facilité" },
              { icon: Users, title: "Organisation plus alignée", desc: "Équipes synchronisées, priorités partagées, capacité optimisée" },
              { icon: Target, title: "Résultats mesurables", desc: "Indicateurs précis, suivi rigoureux, amélioration continue" }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/40 border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/60 transition group">
                <item.icon className="w-12 h-12 text-[#D4AF37] mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Platform Section */}
      <section id="environnement" className="py-20 px-6 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Powalyze : votre environnement<br />professionnel de pilotage
          </h2>
          <p className="text-center text-[#60A5FA] mb-4 text-xl font-light">
            Un environnement numérique conçu pour les directions exigeantes
          </p>
          <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
            Powalyze n'est pas un "outil".<br />
            C'est un cadre professionnel, structuré autour de modules essentiels :
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: BarChart3, title: "Portfolio Manager", desc: "Vision globale, arbitrages, priorités, capacité." },
              { icon: Target, title: "Project Health", desc: "Santé projet, risques, dépendances, alertes." },
              { icon: Shield, title: "Risk Intelligence Center", desc: "Analyse des risques, propagation, signaux faibles." },
              { icon: Users, title: "Decision Room", desc: "Synthèses exécutives, décisions, alignement." },
              { icon: Lightbulb, title: "Predictive Intelligence", desc: "Analyse avancée et recommandations basées sur vos données." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/60 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition group">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Video Demo */}
          <div className="relative max-w-4xl mx-auto">
            <h3 className="text-2xl font-light text-white text-center mb-4">Découvrez Powalyze en action</h3>
            <p className="text-[#60A5FA] text-sm text-center mb-6">Vue portefeuille • Alerte IA • Comité • Arbitrage • Power BI • Décision tracée</p>
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl">
              <video 
                controls 
                className="w-full h-full"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23000' width='100' height='100'/%3E%3C/svg%3E"
              >
                <source src="/videos/powalyze-manifeste.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Sécurité & Conformité
          </h2>
          <p className="text-center text-white/60 mb-16 text-lg">
            Vos données stratégiques protégées au plus haut niveau
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {[
              { icon: Lock, title: "Encryption SSL/TLS", desc: "Données chiffrées en transit" },
              { icon: Server, title: "Hébergement Sécurisé", desc: "Infrastructure certifiée ISO 27001" },
              { icon: Shield, title: "Accès Contrôlé", desc: "Authentification multi-facteurs" },
              { icon: Users, title: "Permissions Granulaires", desc: "Droits d'accès par rôle" },
              { icon: Database, title: "Backups Automatiques", desc: "Sauvegarde quotidienne sécurisée" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white/50 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 text-sm text-white/50">
              <span>Conforme RGPD</span>
              <span>·</span>
              <span>SOC 2 Type II</span>
              <span>·</span>
              <span>ISO 27001</span>
              <span>·</span>
              <span>Hébergement Europe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section id="excellence" className="py-20 px-6 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
            Une approche d'excellence,<br />sans compromis
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Précision", desc: "Chaque livrable est clair, structuré et immédiatement exploitable." },
              { icon: Shield, title: "Fiabilité", desc: "Des méthodes éprouvées, des analyses cohérentes, des décisions maîtrisées." },
              { icon: Award, title: "Exigence", desc: "Pas de superflu, pas de complexité inutile, pas de compromis sur la qualité." },
              { icon: Eye, title: "Clarté", desc: "Une communication simple, directe, lisible — pensée pour les directions." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#D4AF37] rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-[#D4AF37]/30">
                  <item.icon className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour Qui Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white">Pour qui ?</h2>
          <p className="text-center text-white/60 mb-16 text-lg">J'accompagne :</p>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Profils</h3>
              <ul className="space-y-3">
                {["PME", "Scale-ups", "Directions générales", "Équipes projets", "PMO", "DSI", "Organisations en transformation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Qui souhaitent :</h3>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Structurer leur gouvernance" },
                  { icon: Target, text: "Maîtriser leurs projets" },
                  { icon: TrendingUp, text: "Anticiper les risques" },
                  { icon: Zap, text: "Accélérer leurs décisions" },
                  { icon: Award, text: "Professionnaliser leur pilotage" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition">
                      <item.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-white/80 group-hover:text-white transition">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0A1A2F] to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white leading-tight">
            Élevez votre pilotage<br />au niveau d'excellence.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-10 py-4 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#D4AF37]/90 transition shadow-lg shadow-[#D4AF37]/30 text-lg"
            >
              Accéder au SaaS
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-medium hover:bg-[#D4AF37] hover:text-black transition text-lg"
            >
              Parler de votre contexte
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white hover:text-black transition text-lg"
            >
              Planifier un échange
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black border-t border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-[#D4AF37] mb-3">Powalyze</div>
            <p className="text-white/50 text-sm">Precision & Excellence in Decision Intelligence</p>
          </div>
          <div className="flex justify-center gap-8 text-sm text-white/60 mb-8">
            <Link to="/login" className="hover:text-[#D4AF37] transition">Connexion SaaS</Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition">Contact</Link>
            <Link to="/cgu" className="hover:text-[#D4AF37] transition">CGU</Link>
          </div>
          <div className="text-center text-white/40 text-sm">
            © 2026 Powalyze. Precision & Excellence.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
