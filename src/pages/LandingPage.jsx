import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Check, TrendingUp, Users, Database, GitBranch, BarChart3, FileText, Zap, Globe, Sparkles } from 'lucide-react';
import { useDictionary } from '@/lib/i18n/useDictionary';
import { locales, localeNames } from '@/lib/i18n/config';
import { LogoWithText } from '@/components/LogoPowalyze';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { dict, locale, setLocale, loading } = useDictionary();
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Live stats animation
  const [roi, setRoi] = useState(327);
  const [months, setMonths] = useState(3.7);
  const [uptime, setUptime] = useState(99.9);

  // Fonction de scroll smooth sans hash dans l'URL
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoi(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(300, Math.min(350, prev + change));
      });
      setMonths(prev => {
        const change = (Math.random() - 0.5) * 0.2;
        return Math.max(3.0, Math.min(4.5, prev + change));
      });
      setUptime(prev => {
        const change = (Math.random() - 0.5) * 0.05;
        return Math.max(99.5, Math.min(100, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Protection contre dict undefined - valeurs par défaut
  if (!dict) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="landing-page-dark relative bg-black text-slate-200 overflow-x-hidden">
      
      {/* Navigation - Swiss Precision */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <LogoWithText size="default" />
            <div className="flex items-center gap-10">
              <button 
                onClick={(e) => scrollToSection(e, 'for-who')} 
                className="hidden sm:block text-xs text-slate-300 hover:text-slate-100 transition-all duration-500 font-light tracking-[0.15em] uppercase cursor-pointer bg-transparent border-none"
              >
                {dict.nav.forWho}
              </button>
              <button 
                onClick={(e) => scrollToSection(e, 'product')} 
                className="hidden sm:block text-[10px] text-slate-200 hover:text-slate-100 transition-all duration-500 font-light tracking-[0.2em] uppercase cursor-pointer bg-transparent border-none"
              >
                {dict.nav.product}
              </button>
              <button 
                onClick={(e) => scrollToSection(e, 'scenarios')} 
                className="hidden sm:block text-[10px] text-slate-200 hover:text-slate-100 transition-all duration-500 font-light tracking-[0.2em] uppercase cursor-pointer bg-transparent border-none"
              >
                {dict.nav.scenarios}
              </button>
              <Link to="/contact" className="hidden sm:block text-[10px] text-slate-200 hover:text-[#D4AF37] transition-all duration-500 font-light tracking-[0.2em] uppercase">
                Contact
              </Link>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-2 border border-slate-700 rounded-[2px] text-[9px] text-slate-200 hover:border-[#D4AF37] hover:text-slate-100 transition-all duration-500 font-light tracking-[0.2em]"
                >
                  <Globe className="w-3 h-3" />
                  <span className="uppercase">{locale}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-black backdrop-blur-2xl border border-slate-800 rounded-[2px] overflow-hidden shadow-2xl">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setShowLangMenu(false);
                        }}
                        className={`block w-full text-left px-6 py-3 text-[10px] hover:bg-slate-900 transition-all duration-500 tracking-[0.15em] uppercase ${
                          locale === loc ? 'text-[#D4AF37] bg-slate-900 font-light' : 'text-slate-400 font-light'
                        }`}
                      >
                        {localeNames[loc]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-[#D4AF37] text-white rounded-[2px] text-[10px] font-medium hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase"
              >
                {dict.nav.login}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Swiss Precision Design */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
        {/* Fond dégradé avec couleurs visibles */}
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Gradient gold intense haut gauche */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#D4AF37]/20 rounded-full blur-[120px]" />
        
        {/* Gradient bleu intense bas droite */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4A9EFF]/15 rounded-full blur-[100px]" />
        
        {/* Éléments géométriques dorés */}
        <div className="absolute top-20 left-10 w-1 h-40 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />
        <div className="absolute top-40 left-10 w-40 h-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
        <div className="absolute bottom-40 right-20 w-1 h-60 bg-gradient-to-t from-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-40 right-20 w-60 h-1 bg-gradient-to-l from-[#D4AF37]/30 to-transparent" />
        
        {/* Grille visible */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Swiss Quality Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-[#D4AF37]/30 rounded-[2px] mb-12 backdrop-blur-xl bg-black/50">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <rect x="8" y="2" width="8" height="20" fill="#D4AF37" opacity="0.4"/>
              <rect x="2" y="8" width="20" height="8" fill="#D4AF37" opacity="0.4"/>
            </svg>
            <span className="text-xs font-light text-[#D4AF37] tracking-[0.25em] uppercase">
              Swiss Precision
            </span>
            <div className="w-px h-4 bg-[#D4AF37]/30" />
            <span className="text-xs font-light text-slate-200 tracking-[0.2em] uppercase">
              Made for Excellence
            </span>
          </div>

          {/* Title - Swiss Typography */}
          <div className="mb-12 space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] leading-[1.05] text-slate-100">
              {dict?.hero?.title || 'La plateforme qui transforme votre gouvernance'}
            </h1>
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            </div>
            <p className="text-base text-slate-200 max-w-xl mx-auto leading-relaxed font-light tracking-[0.03em]">
              {dict?.hero?.subtitle || 'Powalyze réunit le meilleur du PMO et de l\'analyse de données'}
            </p>
          </div>

          {/* CTAs - Swiss Luxury */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              onClick={() => navigate('/dashboard')}
              className="group relative px-10 py-4 bg-[#D4AF37] text-black rounded-[2px] text-[11px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-3">
                {dict.hero.primaryCTA}
                <Play className="w-3 h-3" />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-transparent border border-slate-700 rounded-[2px] text-[11px] font-light text-slate-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-500 tracking-[0.2em] uppercase"
            >
              {dict.hero.secondaryCTA}
            </button>
          </div>

          {/* Swiss Precision Metrics */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="grid grid-cols-3 gap-20 pt-16 max-w-4xl mx-auto">
              {/* ROI */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative text-center space-y-4">
                  <div className="text-4xl font-extralight text-slate-100 tabular-nums tracking-tight">
                    {roi.toFixed(0)}<span className="text-xl text-slate-500">%</span>
                  </div>
                  <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                  <div className="text-[10px] text-slate-200 uppercase tracking-[0.2em] font-light">
                    Return on Investment
                  </div>
                </div>
              </div>

              {/* Time to Value */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative text-center space-y-4">
                  <div className="text-4xl font-extralight text-slate-100 tabular-nums tracking-tight">
                    {months.toFixed(1)}<span className="text-xl text-gray-500">m</span>
                  </div>
                  <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                  <div className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-light">
                    Time to Value
                  </div>
                </div>
              </div>

              {/* Uptime */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative text-center space-y-4">
                  <div className="text-4xl font-extralight text-gray-900 tabular-nums tracking-tight">
                    {uptime.toFixed(2)}<span className="text-xl text-gray-500">%</span>
                  </div>
                  <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                  <div className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-light">
                    Uptime Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swiss Trust Indicators */}
          <div className="flex items-center justify-center gap-10 mt-16">
            <div className="text-[10px] tracking-[0.25em] uppercase text-slate-300">ISO 27001</div>
            <div className="w-px h-4 bg-slate-400" />
            <div className="text-[10px] tracking-[0.25em] uppercase text-slate-300">SOC 2 Type II</div>
            <div className="w-px h-4 bg-slate-400" />
            <div className="text-[10px] tracking-[0.25em] uppercase text-slate-300">GDPR Compliant</div>
          </div>

          {/* Manifeste Video */}
          <div className="flex items-center justify-center mt-8 px-4 sm:px-6 mb-16">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-video rounded-md overflow-hidden border border-slate-700/30 shadow-lg">
              <video
                className="w-full h-full object-contain bg-black"
                controls
                preload="metadata"
              >
                <source src="/videos/manifeste.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>

        {/* Precision indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="text-[7px] text-slate-300 uppercase tracking-[0.4em] font-light">Discover More</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Pour qui - Swiss Precision Personas */}
      <section id="for-who" className="py-32 px-6 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.4)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(212,175,55,0.4)_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            </div>
            <h2 className="text-4xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.forWho.title}</h2>
            <p className="text-base text-gray-900 font-light tracking-[0.02em]">{dict.forWho.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* PMO */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-16 h-16 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <GitBranch className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-5 text-gray-900 tracking-tight">{dict.forWho.pmo.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed mb-4 font-light">
                  {dict.forWho.pmo.line1}
                </p>
                <p className="text-xs text-gray-800 font-light">
                  {dict.forWho.pmo.line2}
                </p>
              </div>
            </div>

            {/* Data Leaders */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <Database className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-4 text-gray-900 tracking-tight">{dict.forWho.data.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed mb-4 font-light">
                  {dict.forWho.data.line1}
                </p>
                <p className="text-xs text-gray-800 font-light">
                  {dict.forWho.data.line2}
                </p>
              </div>
            </div>

            {/* Direction */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-4 text-gray-900 tracking-tight">{dict.forWho.direction.title}</h3>
                <p className="text-sm text-gray-900 leading-relaxed mb-4 font-light">
                  {dict.forWho.direction.line1}
                </p>
                <p className="text-xs text-gray-800 font-light">
                  {dict.forWho.direction.line2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que Powalyze remplace - Swiss Precision */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extralight mb-2 text-gray-900 tracking-tight">{dict.replaces.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Avant */}
            <div className="bg-white backdrop-blur-xl rounded-[2px] p-8 border border-red-200 shadow-md">
              <h3 className="text-sm font-light mb-6 text-red-600 uppercase tracking-[0.2em]">{dict.replaces.before.title}</h3>
              <ul className="space-y-3">
                {dict.replaces.before.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 text-xs">×</span>
                    <span className="text-xs text-gray-600 leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avec */}
            <div className="bg-white backdrop-blur-xl rounded-[2px] p-8 border border-[#D4AF37]/40 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08),transparent_70%)]" />
              <div className="relative">
                <h3 className="text-sm font-light mb-6 text-[#D4AF37] uppercase tracking-[0.2em]">{dict.replaces.with.title}</h3>
                <ul className="space-y-3">
                  {dict.replaces.with.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-3 h-3 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-900 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Résultat */}
            <div className="bg-white backdrop-blur-xl rounded-[2px] p-8 border border-green-200 shadow-md">
              <h3 className="text-sm font-light mb-6 text-green-600 uppercase tracking-[0.2em]">{dict.replaces.result.title}</h3>
              <ul className="space-y-3">
                {dict.replaces.result.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <TrendingUp className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-900 leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services d'excellence - Swiss Precision */}
      <section className="py-32 px-6 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.4)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(212,175,55,0.4)_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>
            <h2 className="text-5xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.services.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pilotage stratégique */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-6 text-gray-900 tracking-tight">{dict.services.pilotage.title}</h3>
                <ul className="space-y-3">
                  {dict.services.pilotage.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* PMO opérationnel */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <GitBranch className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-6 text-gray-900 tracking-tight">{dict.services.pmo.title}</h3>
                <ul className="space-y-3">
                  {dict.services.pmo.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Data & Power BI */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-6 text-gray-900 tracking-tight">{dict.services.data.title}</h3>
                <ul className="space-y-3">
                  {dict.services.data.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* IA & Automatisation */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-10 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-14 h-14 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center mb-8">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-light mb-6 text-gray-900 tracking-tight">{dict.services.ai.title}</h3>
                <ul className="space-y-3">
                  {dict.services.ai.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900 leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Démo guidée - Swiss Precision Scenes */}
      <section id="product" className="py-32 px-6 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.4)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(212,175,55,0.4)_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>
            <h2 className="text-5xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.demo.title}</h2>
            <p className="text-sm text-gray-900 max-w-2xl mx-auto font-light tracking-[0.05em]">{dict.demo.subtitle}</p>
          </div>

          {/* Scène 1 - Portfolio */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2px] text-[9px] font-light text-[#D4AF37] uppercase tracking-[0.25em] mb-8 shadow-md">
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                {dict.demo.scene1.tag}
              </div>
              <h3 className="text-3xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.demo.scene1.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 font-light">
                {dict.demo.scene1.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene1.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                    </div>
                    <span className="leading-relaxed font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative bg-white backdrop-blur-xl rounded-[2px] p-8 border border-gray-200 shadow-xl">
                {/* Mock Portfolio Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-xs font-light text-gray-900 uppercase tracking-wider">Portfolio Health</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-500">Healthy</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-4 border border-gray-200">
                      <div className="text-xs text-gray-900 mb-2">Active Projects</div>
                      <div className="text-3xl font-extralight text-gray-900">847</div>
                      <div className="text-xs text-green-500 mt-2">↑ 12.3%</div>
                    </div>
                    <div className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-4 border border-gray-200">
                      <div className="text-xs text-gray-900 mb-2">Total Value</div>
                      <div className="text-3xl font-extralight text-[#D4AF37]">€2.8M</div>
                      <div className="text-xs text-green-500 mt-2">↑ 8.7%</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-900">Success Rate</span>
                      <span className="text-sm font-light text-gray-900">94.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full" style={{width: '94.7%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scène 2 - Comité */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative group md:order-first order-last">
              <div className="absolute inset-0 bg-[#4A9EFF]/10 blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative bg-white backdrop-blur-xl rounded-[2px] p-8 border border-gray-200 shadow-xl">
                {/* Mock Committee Interface */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 border border-[#4A9EFF]/30 rounded-[2px] flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#4A9EFF]" />
                    </div>
                    <div>
                      <div className="text-sm font-light text-gray-900">Board Meeting Q1 2026</div>
                      <div className="text-xs text-gray-900">Live • 12 participants</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'Portfolio Review', status: 'done', color: 'green' },
                      { title: 'Budget Allocation', status: 'live', color: 'blue' },
                      { title: 'Risk Assessment', status: 'pending', color: 'gray' }
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-4 border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.color === 'green' ? 'bg-green-400' :
                            item.color === 'blue' ? 'bg-[#4A9EFF] animate-pulse' :
                            'bg-gray-400'
                          }`}></div>
                          <span className="text-sm font-light text-gray-900">{item.title}</span>
                        </div>
                        <span className={`text-xs font-light px-3 py-1 rounded-[2px] ${
                          item.status === 'done' ? 'bg-green-100 text-green-600 border border-green-200' :
                          item.status === 'live' ? 'bg-blue-100 text-[#4A9EFF] border border-blue-200' :
                          'bg-slate-800 text-white border border-slate-700'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-[#4A9EFF]/30 rounded-[2px] text-[9px] font-light text-[#4A9EFF] uppercase tracking-[0.25em] mb-8 shadow-md">
                <span className="w-1 h-1 bg-[#4A9EFF] rounded-full animate-pulse"></span>
                {dict.demo.scene2.tag}
              </div>
              <h3 className="text-3xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.demo.scene2.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 font-light">
                {dict.demo.scene2.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene2.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 border border-[#4A9EFF]/30 rounded-[2px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#4A9EFF]" />
                    </div>
                    <span className="leading-relaxed font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scène 3 - Data */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2px] text-[9px] font-light text-[#D4AF37] uppercase tracking-[0.25em] mb-8 shadow-md">
                <Zap className="w-3 h-3" />
                {dict.demo.scene3.tag}
              </div>
              <h3 className="text-3xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.demo.scene3.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 font-light">
                {dict.demo.scene3.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene3.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 border border-[#D4AF37]/30 rounded-[2px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                    </div>
                    <span className="leading-relaxed font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative bg-white backdrop-blur-xl rounded-[2px] p-8 border border-gray-200 shadow-xl">
                {/* Mock Data Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-[2px] border border-green-200">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs font-light text-green-600">Connected</span>
                    </div>
                    <span className="text-xs text-gray-900">Power BI • Azure Synapse</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '2.4M', label: 'Data Points', trend: '+12%' },
                      { value: '847', label: 'Projects', trend: '+8%' },
                      { value: '99.9%', label: 'Accuracy', trend: '—' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-3 border border-gray-200">
                        <div className="text-xl font-extralight text-[#D4AF37] mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-gray-900 mb-1">{stat.label}</div>
                        <div className="text-[10px] text-green-500">{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 backdrop-blur-xl rounded-[2px] p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-900">Real-time Sync</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-[#4A9EFF] rounded-t-[1px] transition-all" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scène 4 - Trace */}
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative group md:order-first order-last">
              <div className="absolute inset-0 bg-purple-500/10 blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
              <div className="relative bg-white backdrop-blur-xl rounded-[2px] p-8 border border-gray-200 shadow-xl">
                {/* Mock Audit Trail */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 border border-purple-400/30 rounded-[2px] flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-light text-gray-900">Decision History</div>
                      <div className="text-xs text-gray-900">Full audit trail</div>
                    </div>
                  </div>
                  {[
                    { action: 'Budget approved', user: 'CFO', time: '2 min ago', type: 'success' },
                    { action: 'Risk flagged', user: 'PMO Lead', time: '15 min ago', type: 'warning' },
                    { action: 'Project updated', user: 'CTO', time: '1 hour ago', type: 'info' },
                    { action: 'Meeting scheduled', user: 'Board', time: '3 hours ago', type: 'info' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 backdrop-blur-xl rounded-[2px] p-3 border border-gray-200">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        log.type === 'success' ? 'bg-green-400' :
                        log.type === 'warning' ? 'bg-yellow-400' :
                        'bg-[#4A9EFF]'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-light text-gray-900">{log.action}</div>
                        <div className="text-[10px] text-gray-900 mt-1">{log.user} • {log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-purple-400/30 rounded-[2px] text-[9px] font-light text-purple-500 uppercase tracking-[0.25em] mb-8 shadow-md">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                {dict.demo.scene4.tag}
              </div>
              <h3 className="text-3xl font-extralight mb-6 text-gray-900 tracking-tight">{dict.demo.scene4.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8 font-light">
                {dict.demo.scene4.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene4.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="w-5 h-5 border border-purple-400/30 rounded-[2px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="leading-relaxed font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Intégrations Power BI / Data */}
      <section className="py-20 px-6 bg-gradient-to-b from-black/5 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-light mb-6">{dict.integrations.title}</h2>
          <p className="text-2xl text-black/60 leading-relaxed mb-12 max-w-3xl mx-auto">
            {dict.integrations.subtitle}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {dict.integrations.items.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-black/10 text-left">
                <Zap className="w-8 h-8 text-[#D4AF37] mb-4" />
                <p className="text-gray-900 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-black/50 italic">
            {dict.integrations.tagline}
          </p>
        </div>
      </section>

      {/* Scénarios concrets */}
      <section id="scenarios" className="py-20 px-6 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">{dict.scenarios.title}</h2>
          </div>

          <div className="space-y-12">
            {/* Scénario 1 */}
            <div className="bg-gray-50 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{dict.scenarios.scenario1.title}</h3>
                  <p className="text-gray-900 text-lg leading-relaxed">
                    {dict.scenarios.scenario1.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Scénario 2 */}
            <div className="bg-gray-50 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{dict.scenarios.scenario2.title}</h3>
                  <p className="text-gray-900 text-lg leading-relaxed">
                    {dict.scenarios.scenario2.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Scénario 3 */}
            <div className="bg-gray-50 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{dict.scenarios.scenario3.title}</h3>
                  <p className="text-gray-900 text-lg leading-relaxed">
                    {dict.scenarios.scenario3.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marchés - Suisse + France */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.4)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(212,175,55,0.4)_0.5px,transparent_0.5px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>
            <h2 className="text-5xl font-extralight mb-4 text-gray-900 tracking-tight">{dict.markets.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Suisse */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-12 border border-gray-200 hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2px] text-[9px] font-light text-[#D4AF37] uppercase tracking-[0.25em] mb-6 shadow-md">
                  <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                  {dict.markets.switzerland.title}
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900 tracking-tight">{dict.markets.switzerland.subtitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                  {dict.markets.switzerland.text}
                </p>
              </div>
            </div>

            {/* France */}
            <div className="group relative bg-white backdrop-blur-xl rounded-[2px] p-12 border border-gray-200 hover:border-[#4A9EFF]/50 hover:shadow-xl transition-all duration-700">
              <div className="absolute inset-0 bg-[#4A9EFF]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white backdrop-blur-xl border border-[#4A9EFF]/30 rounded-[2px] text-[9px] font-light text-[#4A9EFF] uppercase tracking-[0.25em] mb-6 shadow-md">
                  <span className="w-1 h-1 bg-[#4A9EFF] rounded-full"></span>
                  {dict.markets.france.title}
                </div>
                <h3 className="text-2xl font-light mb-4 text-gray-900 tracking-tight">{dict.markets.france.subtitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                  {dict.markets.france.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-br from-white via-[#D4AF37]/5 to-[#4A9EFF]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-light mb-6 leading-tight">
            {dict.finalCTA.title}
          </h2>
          <p className="text-2xl text-black/60 mb-12 leading-relaxed max-w-2xl mx-auto">
            {dict.finalCTA.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => {
                // Track CTA click with Google Analytics
                if (window.gtag) {
                  window.gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: 'hero_cta',
                    value: dict.finalCTA.primaryBtn
                  });
                }
                navigate('/dashboard?demo=1');
              }}
              className="px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
            >
              {dict.finalCTA.primaryBtn}
              <Play className="w-5 h-5" />
            </button>
            <a
              href="mailto:contact@powalyze.com"
              className="px-10 py-5 bg-gray-800 text-white rounded-full text-lg font-medium hover:bg-gray-900 transition-colors"
            >
              {dict.finalCTA.secondaryBtn}
            </a>
          </div>

          <p className="text-sm text-black/50">
            {dict.finalCTA.footer}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-semibold mb-4">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                  Powalyze
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {dict.footer.tagline}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{dict.footer.product.title}</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {dict.footer.product.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{dict.footer.company.title}</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {dict.footer.company.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{dict.footer.legal.title}</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {dict.footer.legal.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-white/50">
            © 2026 Powalyze. {dict.footer.copyright}
          </div>
        </div>
      </footer>

    </div>
  );
}
