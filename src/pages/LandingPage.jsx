import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Check, TrendingUp, Users, Database, GitBranch, BarChart3, FileText, Zap, Globe, Sparkles } from 'lucide-react';
import { useDictionary } from '@/lib/i18n/useDictionary';
import { locales, localeNames } from '@/lib/i18n/config';

export default function LandingPage() {
  const navigate = useNavigate();
  const { dict, locale, setLocale, loading } = useDictionary();
  const [showLangMenu, setShowLangMenu] = useState(false);

  if (loading || !dict) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-[#D4AF37] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative bg-white text-black overflow-x-hidden">
      
      {/* Navigation Apple-like */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                Powalyze
              </span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#for-who" className="hidden sm:block text-sm text-black/60 hover:text-black transition-colors">
                {dict.nav.forWho}
              </a>
              <a href="#product" className="hidden sm:block text-sm text-black/60 hover:text-black transition-colors">
                {dict.nav.product}
              </a>
              <a href="#scenarios" className="hidden sm:block text-sm text-black/60 hover:text-black transition-colors">
                {dict.nav.scenarios}
              </a>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs text-black/70 hover:bg-black/10 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase font-medium">{locale}</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl overflow-hidden shadow-2xl">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setShowLangMenu(false);
                        }}
                        className={`block w-full text-left px-6 py-3 text-sm hover:bg-black/5 transition-colors ${
                          locale === loc ? 'text-[#D4AF37] bg-black/5 font-medium' : 'text-black/70'
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
                className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-colors"
              >
                {dict.nav.login}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Ultra-Riche iTech Magnifique */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Rich Tech Background */}
        <div className="absolute inset-0">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#4A9EFF]/5"></div>
          {/* Tech grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #4A9EFF 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}></div>
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#4A9EFF]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge Enterprise */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#4A9EFF]/20 border border-[#D4AF37]/30 rounded-full mb-6 backdrop-blur-xl">
            <div className="w-2 h-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent tracking-wider uppercase">
              Enterprise-Grade Governance Platform
            </span>
          </div>

          {/* One Line Positioning */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-6 bg-gradient-to-r from-[#D4AF37] via-[#4A9EFF] to-[#D4AF37] bg-clip-text text-transparent">
              {dict.hero.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium bg-gradient-to-r from-[#D4AF37]/80 to-[#4A9EFF]/80 bg-clip-text text-transparent max-w-3xl mx-auto leading-relaxed">
              {dict.hero.subtitle}
            </p>
          </div>

          {/* CTAs Ultra-Riches */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => navigate('/dashboard?demo=1')}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-2xl font-bold text-base hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A9EFF] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">{dict.hero.primaryCTA}</span>
              <Play className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#4A9EFF]/10 border-2 border-[#D4AF37]/30 rounded-2xl font-bold text-base backdrop-blur-xl hover:border-[#4A9EFF]/50 transition-all"
            >
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                {dict.hero.secondaryCTA}
              </span>
            </button>
          </div>

          {/* Stats Enterprise Ultra-Riches */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl p-4 border border-[#D4AF37]/20">
                <div className="text-3xl font-black bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent mb-1">327%</div>
                <div className="text-xs font-semibold bg-gradient-to-r from-[#D4AF37]/60 to-[#4A9EFF]/60 bg-clip-text text-transparent">Average ROI</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A9EFF]/20 to-[#D4AF37]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl p-4 border border-[#4A9EFF]/20">
                <div className="text-3xl font-black bg-gradient-to-r from-[#4A9EFF] to-[#D4AF37] bg-clip-text text-transparent mb-1">3.7M</div>
                <div className="text-xs font-semibold bg-gradient-to-r from-[#4A9EFF]/60 to-[#D4AF37]/60 bg-clip-text text-transparent">Months to Value</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl p-4 border border-[#D4AF37]/20">
                <div className="text-3xl font-black bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent mb-1">99.9%</div>
                <div className="text-xs font-semibold bg-gradient-to-r from-[#D4AF37]/60 to-[#4A9EFF]/60 bg-clip-text text-transparent">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui - 3 personas */}
      <section id="for-who" className="py-20 px-6 bg-gradient-to-b from-white to-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">{dict.forWho.title}</h2>
            <p className="text-xl text-black/60">{dict.forWho.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* PMO */}
            <div className="bg-white rounded-3xl p-8 border border-black/10 hover:border-[#D4AF37]/30 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center mb-6">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{dict.forWho.pmo.title}</h3>
              <p className="text-black/70 leading-relaxed mb-4">
                {dict.forWho.pmo.line1}
              </p>
              <p className="text-black/60 text-sm">
                {dict.forWho.pmo.line2}
              </p>
            </div>

            {/* Data Leaders */}
            <div className="bg-white rounded-3xl p-8 border border-black/10 hover:border-[#D4AF37]/30 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{dict.forWho.data.title}</h3>
              <p className="text-black/70 leading-relaxed mb-4">
                {dict.forWho.data.line1}
              </p>
              <p className="text-black/60 text-sm">
                {dict.forWho.data.line2}
              </p>
            </div>

            {/* Direction */}
            <div className="bg-white rounded-3xl p-8 border border-black/10 hover:border-[#D4AF37]/30 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{dict.forWho.direction.title}</h3>
              <p className="text-black/70 leading-relaxed mb-4">
                {dict.forWho.direction.line1}
              </p>
              <p className="text-black/60 text-sm">
                {dict.forWho.direction.line2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que Powalyze remplace - Ultra-Riche */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Rich dark background with gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A1929] to-black"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4A9EFF 0%, transparent 50%)'
        }}></div>
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#4A9EFF]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-[#D4AF37] via-white to-[#4A9EFF] bg-clip-text text-transparent">{dict.replaces.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Avant */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border-2 border-red-400/30">
                <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">{dict.replaces.before.title}</h3>
                <ul className="space-y-2">
                  {dict.replaces.before.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 text-sm">×</span>
                      <span className="text-sm font-medium bg-gradient-to-r from-white/70 to-white/50 bg-clip-text text-transparent leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Avec */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/40 to-[#4A9EFF]/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 backdrop-blur-xl rounded-3xl p-6 border-2 border-[#D4AF37]/50">
                <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">{dict.replaces.with.title}</h3>
                <ul className="space-y-2">
                  {dict.replaces.with.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-white leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Résultat */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-[#4A9EFF]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border-2 border-green-400/30">
                <h3 className="text-base font-bold mb-4 bg-gradient-to-r from-green-400 to-[#4A9EFF] bg-clip-text text-transparent">{dict.replaces.result.title}</h3>
                <ul className="space-y-2">
                  {dict.replaces.result.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium bg-gradient-to-r from-white/70 to-white/50 bg-clip-text text-transparent leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Démo guidée - 4 scènes */}
      <section id="product" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light mb-4">{dict.demo.title}</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">{dict.demo.subtitle}</p>
          </div>

          {/* Scène 1 - Portfolio */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
                {dict.demo.scene1.tag}
              </div>
              <h3 className="text-4xl font-semibold mb-6">{dict.demo.scene1.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-8">
                {dict.demo.scene1.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene1.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/70">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-8 border border-black/10 backdrop-blur-xl">
                {/* Mock Portfolio Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-black/10">
                    <span className="text-xs font-medium text-black/50 uppercase tracking-wider">Portfolio Health</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/50 rounded-2xl p-4 border border-black/10">
                      <div className="text-xs text-black/50 mb-2">Active Projects</div>
                      <div className="text-3xl font-bold text-black">847</div>
                      <div className="text-xs text-green-600 mt-2">↑ 12.3%</div>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-4 border border-black/10">
                      <div className="text-xs text-black/50 mb-2">Total Value</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">€2.8M</div>
                      <div className="text-xs text-green-600 mt-2">↑ 8.7%</div>
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-4 border border-black/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-black/50">Success Rate</span>
                      <span className="text-sm font-bold text-black">94.7%</span>
                    </div>
                    <div className="w-full bg-black/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full" style={{width: '94.7%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scène 2 - Comité */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative group md:order-first order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A9EFF]/20 to-[#D4AF37]/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-8 border border-black/10 backdrop-blur-xl">
                {/* Mock Committee Interface */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-black/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4A9EFF] to-purple-600 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-black">Board Meeting Q1 2026</div>
                      <div className="text-xs text-black/50">Live • 12 participants</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'Portfolio Review', status: 'done', color: 'green' },
                      { title: 'Budget Allocation', status: 'live', color: 'blue' },
                      { title: 'Risk Assessment', status: 'pending', color: 'gray' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/50 rounded-xl p-4 border border-black/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.color === 'green' ? 'bg-green-500' :
                            item.color === 'blue' ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-400'
                          }`}></div>
                          <span className="text-sm font-medium text-black">{item.title}</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.status === 'done' ? 'bg-green-100 text-green-700' :
                          item.status === 'live' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A9EFF]/10 border border-[#4A9EFF]/20 rounded-full text-xs font-medium text-[#4A9EFF] uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 bg-[#4A9EFF] rounded-full animate-pulse"></span>
                {dict.demo.scene2.tag}
              </div>
              <h3 className="text-4xl font-semibold mb-6">{dict.demo.scene2.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-8">
                {dict.demo.scene2.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene2.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/70">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#4A9EFF] to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scène 3 - Data */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3" />
                {dict.demo.scene3.tag}
              </div>
              <h3 className="text-4xl font-semibold mb-6">{dict.demo.scene3.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-8">
                {dict.demo.scene3.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene3.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/70">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-8 border border-black/10 backdrop-blur-xl">
                {/* Mock Data Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-black/10">
                    <div className="flex items-center gap-2 px-2 py-1 bg-green-100 rounded-lg">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-700">Connected</span>
                    </div>
                    <span className="text-xs text-black/50">Power BI • Azure Synapse</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '2.4M', label: 'Data Points', trend: '+12%' },
                      { value: '847', label: 'Projects', trend: '+8%' },
                      { value: '99.9%', label: 'Accuracy', trend: '—' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/50 rounded-xl p-3 border border-black/10">
                        <div className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-black/50 mb-1">{stat.label}</div>
                        <div className="text-[10px] text-green-600">{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/50 rounded-xl p-4 border border-black/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-black/50">Real-time Sync</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-[#4A9EFF] rounded-t-sm transition-all" style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scène 4 - Trace */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group md:order-first order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-[#4A9EFF]/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-8 border border-black/10 backdrop-blur-xl">
                {/* Mock Audit Trail */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 pb-4 border-b border-black/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-[#4A9EFF] rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-black">Decision History</div>
                      <div className="text-xs text-black/50">Full audit trail</div>
                    </div>
                  </div>
                  {[
                    { action: 'Budget approved', user: 'CFO', time: '2 min ago', type: 'success' },
                    { action: 'Risk flagged', user: 'PMO Lead', time: '15 min ago', type: 'warning' },
                    { action: 'Project updated', user: 'CTO', time: '1 hour ago', type: 'info' },
                    { action: 'Meeting scheduled', user: 'Board', time: '3 hours ago', type: 'info' }
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/50 rounded-xl p-3 border border-black/10">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${
                        log.type === 'success' ? 'bg-green-500' :
                        log.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-black">{log.action}</div>
                        <div className="text-[10px] text-black/50 mt-1">{log.user} • {log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full text-xs font-medium text-purple-700 uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                {dict.demo.scene4.tag}
              </div>
              <h3 className="text-4xl font-semibold mb-6">{dict.demo.scene4.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-8">
                {dict.demo.scene4.text}
              </p>
              <ul className="space-y-4">
                {dict.demo.scene4.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black/70">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-[#4A9EFF] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="leading-relaxed">{feature}</span>
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
                <p className="text-black/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-black/50 italic">
            {dict.integrations.tagline}
          </p>
        </div>
      </section>

      {/* Scénarios concrets */}
      <section id="scenarios" className="py-20 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">{dict.scenarios.title}</h2>
          </div>

          <div className="space-y-12">
            {/* Scénario 1 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{dict.scenarios.scenario1.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {dict.scenarios.scenario1.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Scénario 2 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{dict.scenarios.scenario2.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {dict.scenarios.scenario2.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Scénario 3 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{dict.scenarios.scenario3.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {dict.scenarios.scenario3.text}
                  </p>
                </div>
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
              onClick={() => navigate('/dashboard?demo=1')}
              className="px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
            >
              {dict.finalCTA.primaryBtn}
              <Play className="w-5 h-5" />
            </button>
            <a
              href="mailto:contact@powalyze.com"
              className="px-10 py-5 bg-black text-white rounded-full text-lg font-medium hover:bg-black/90 transition-colors"
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
      <footer className="bg-black text-white py-16 px-6">
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
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            © 2026 Powalyze. {dict.footer.copyright}
          </div>
        </div>
      </footer>

    </div>
  );
}
