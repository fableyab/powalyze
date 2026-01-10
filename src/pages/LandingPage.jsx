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

      {/* Hero - Ultra clair + Social proof */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* One Line Positioning */}
          <div className="mb-8">
            <p className="text-sm font-medium text-black/50 uppercase tracking-wider mb-3">
              {dict.hero.tagline}
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight tracking-tight leading-none mb-6">
              {dict.hero.title}
            </h1>
            <p className="text-2xl sm:text-3xl font-light text-black/60 max-w-3xl mx-auto leading-relaxed">
              {dict.hero.subtitle}
            </p>
          </div>

          {/* Accroche 2 lignes */}
          <div className="max-w-2xl mx-auto mb-10 space-y-3">
            <p className="text-lg text-black/70 leading-relaxed">
              {dict.hero.line1}
            </p>
            <p className="text-lg text-black/70 leading-relaxed">
              {dict.hero.line2}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard?demo=1')}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white rounded-full font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              {dict.hero.primaryCTA}
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-black/5 border border-black/10 rounded-full font-medium hover:bg-black/10 transition-colors"
            >
              {dict.hero.secondaryCTA}
            </button>
          </div>

          {/* Réassurance */}
          <p className="text-sm text-black/50 max-w-2xl mx-auto">
            {dict.hero.reassurance}
          </p>
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

      {/* Ce que Powalyze remplace */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-4">{dict.replaces.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Avant */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-red-400">{dict.replaces.before.title}</h3>
              <ul className="space-y-3">
                {dict.replaces.before.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="text-red-400 mt-1">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avec */}
            <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#4A9EFF]/20 backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/30">
              <h3 className="text-xl font-semibold mb-6 text-[#D4AF37]">{dict.replaces.with.title}</h3>
              <ul className="space-y-3">
                {dict.replaces.with.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <Check className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Résultat */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-green-400">{dict.replaces.result.title}</h3>
              <ul className="space-y-3">
                {dict.replaces.result.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
              <div className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider mb-3">
                {dict.demo.scene1.tag}
              </div>
              <h3 className="text-4xl font-light mb-6">{dict.demo.scene1.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-6">
                {dict.demo.scene1.text}
              </p>
              <ul className="space-y-3">
                {dict.demo.scene1.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-12 aspect-video flex items-center justify-center border border-black/10">
              <BarChart3 className="w-24 h-24 text-[#D4AF37] opacity-30" />
            </div>
          </div>

          {/* Scène 2 - Comité */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-12 aspect-video flex items-center justify-center border border-black/10 md:order-first order-last">
              <Users className="w-24 h-24 text-[#4A9EFF] opacity-30" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#4A9EFF] uppercase tracking-wider mb-3">
                {dict.demo.scene2.tag}
              </div>
              <h3 className="text-4xl font-light mb-6">{dict.demo.scene2.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-6">
                {dict.demo.scene2.text}
              </p>
              <ul className="space-y-3">
                {dict.demo.scene2.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scène 3 - Data */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider mb-3">
                {dict.demo.scene3.tag}
              </div>
              <h3 className="text-4xl font-light mb-6">{dict.demo.scene3.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-6">
                {dict.demo.scene3.text}
              </p>
              <ul className="space-y-3">
                {dict.demo.scene3.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-12 aspect-video flex items-center justify-center border border-black/10">
              <Database className="w-24 h-24 text-[#D4AF37] opacity-30" />
            </div>
          </div>

          {/* Scène 4 - Trace */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-3xl p-12 aspect-video flex items-center justify-center border border-black/10 md:order-first order-last">
              <FileText className="w-24 h-24 text-[#4A9EFF] opacity-30" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#4A9EFF] uppercase tracking-wider mb-3">
                {dict.demo.scene4.tag}
              </div>
              <h3 className="text-4xl font-light mb-6">{dict.demo.scene4.title}</h3>
              <p className="text-xl text-black/70 leading-relaxed mb-6">
                {dict.demo.scene4.text}
              </p>
              <ul className="space-y-3">
                {dict.demo.scene4.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"></div>
                    {feature}
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
