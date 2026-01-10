import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Check, TrendingUp, Users, Database, GitBranch, BarChart3, FileText, Zap, Globe, Sparkles } from 'lucide-react';
import { useDictionary } from '@/lib/i18n/useDictionary';
import { locales, localeNames } from '@/lib/i18n/config';

export default function LandingPage() {
  const navigate = useNavigate();
  const { dict, locale, setLocale, loading } = useDictionary();
  const [showLangMenu, setShowLangMenu] = useState(false);

  if (loading || !dict) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
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

      {/* Hero Section - Cinematic Video Style */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Gradient Background - Blue Night to Black */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-black to-black"></div>
        
        {/* Golden Light Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37] opacity-10 blur-[150px] rounded-full animate-pulse"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-full mb-12">
              <span className="text-sm text-[#D4AF37] font-light tracking-wider">{dict.hero.brand.toUpperCase()}</span>
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-none tracking-tight">
            <span className="block text-white mb-4">{dict.hero.subtitle}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
            {dict.hero.text}
          </p>

          <button
            onClick={handleEnterExperience}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full text-black font-medium text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">{dict.hero.primary}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4A9EFF] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-[#D4AF37] rounded-full"></div>
              </div>
              <span className="text-xs text-white/40 tracking-wider">SCROLL</span>
            </div>
          </div>
        </div>

        {/* Transition Overlay */}
        {isExperienceStarted && (
          <div className="fixed inset-0 z-50 bg-black animate-fade-out pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl text-[#D4AF37] animate-pulse">
                <Sparkles className="w-16 h-16" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Experience Modules Section */}
      <div id="experience-modules" className="relative">
        
        {/* Module 1: GOVERNANCE - White Purity */}
        <section className="relative min-h-screen bg-white text-black flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1 bg-black/5 rounded-full mb-6">
                  <span className="text-xs tracking-wider font-medium">MODULE 01</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                  {dict.modules.governance.title}
                </h2>
                <p className="text-4xl font-light text-black/60 mb-12 leading-tight">
                  {dict.product.title}
                </p>
                <p className="text-xl text-black/50 mb-12 leading-relaxed">
                  {dict.modules.governance.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-2xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-black/50">Compliance</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4A9EFF] to-purple-600 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">94.7%</div>
                      <div className="text-sm text-black/50">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visual - Governance Dashboard Preview */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-8 h-full flex flex-col justify-between">
                    {/* Mock KPI Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-3xl font-bold mb-2">847</div>
                        <div className="text-sm text-gray-500">Active Projects</div>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">€2.8M</div>
                        <div className="text-sm text-gray-500">Portfolio Value</div>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">Governance Score</span>
                          <span className="text-2xl font-bold">94.7%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-3 rounded-full" style={{width: '94.7%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating accent */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#D4AF37] opacity-20 blur-3xl rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Module 2: PROJECTS - Blue Night */}
        <section className="relative min-h-screen bg-gradient-to-br from-[#0F2847] to-[#0A1A2F] text-white flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              {/* Visual - Floating Cards */}
              <div className="order-2 md:order-1 relative">
                <div className="relative">
                  {/* Card 1 */}
                  <div className="absolute top-0 left-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      transform: `translateY(${scrollProgress * 20}px) rotate(-5deg)`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white/60 tracking-wider">ACTIVE</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Project Alpha</h3>
                    <p className="text-sm text-white/60">On track • 87% complete</p>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute top-20 left-20 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      transform: `translateY(${scrollProgress * -30}px)`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
                      <span className="text-xs text-white/60 tracking-wider">PLANNING</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Project Beta</h3>
                    <p className="text-sm text-white/60">Starting Q2 • High priority</p>
                  </div>

                  {/* Card 3 */}
                  <div className="absolute top-40 left-10 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      transform: `translateY(${scrollProgress * 40}px) rotate(5deg)`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white/60 tracking-wider">REVIEW</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Project Gamma</h3>
                    <p className="text-sm text-white/60">Awaiting approval • $2.4M</p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-6">
                  <span className="text-xs tracking-wider font-medium text-white/80">MODULE 02</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                  {dict.modules.projects.title}
                </h2>
                <p className="text-4xl font-light text-white/60 mb-12 leading-tight">
                  {dict.product.text2}
                </p>
                <p className="text-xl text-white/50 mb-12 leading-relaxed">
                  {dict.modules.projects.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-white/70">Real-time synchronization across teams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-white/70">AI-powered risk detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <span className="text-white/70">Automated workflow optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Module 3: KPIs - Black Glass */}
        <section className="relative min-h-screen bg-black text-white flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1 bg-white/5 rounded-full mb-6">
                  <span className="text-xs tracking-wider font-medium text-white/80">MODULE 03</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                  {dict.modules.kpis.title}
                </h2>
                <p className="text-4xl font-light text-white/60 mb-12 leading-tight">
                  {dict.product.text3}
                </p>
                <p className="text-xl text-white/50 mb-12 leading-relaxed">
                  {dict.modules.kpis.description}
                </p>
              </div>

              {/* Visual - Glass Metrics */}
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  {/* Counter Animation */}
                  <div className="space-y-8">
                    <div>
                      <div className="text-sm text-white/40 mb-2 tracking-wider">REVENUE GROWTH</div>
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] tabular-nums">
                        +327%
                      </div>
                      <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-6">
                        <div className="text-sm text-white/40 mb-2">PROJECTS</div>
                        <div className="text-4xl font-bold tabular-nums">847</div>
                        <div className="text-xs text-green-500 mt-2">↑ 23 this week</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-6">
                        <div className="text-sm text-white/40 mb-2">USERS</div>
                        <div className="text-4xl font-bold tabular-nums">12.4K</div>
                        <div className="text-xs text-[#D4AF37] mt-2">↑ 8.2% MoM</div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6">
                      <div className="text-sm text-white/40 mb-4">EFFICIENCY SCORE</div>
                      <div className="flex items-end gap-1">
                        {[60, 75, 85, 70, 90, 95, 88, 92].map((height, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-[#4A9EFF] rounded-t" style={{height: `${height}%`}}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] opacity-20 blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - Immersive */}
        <section className="relative min-h-screen bg-gradient-to-br from-[#0A1A2F] via-black to-black text-white flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#D4AF37] opacity-5 blur-[200px] rounded-full animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="inline-block px-6 py-2 bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-full mb-12">
              <span className="text-sm text-[#D4AF37] font-light tracking-wider">{dict.cta.title.toUpperCase()}</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              <span className="block text-white mb-4">{dict.cta.text1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]">
                {dict.cta.text2}
              </span>
            </h2>

            <p className="text-xl text-white/50 mb-16 leading-relaxed">
              {dict.proof.text}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/demo-mode"
                className="group px-12 py-5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-500 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                {dict.cta.primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-12 py-5 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-lg hover:bg-white/10 transition-all duration-500 inline-flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                {dict.cta.secondary}
              </Link>
            </div>

            <div className="mt-24 grid grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">327%</div>
                <div className="text-sm text-white/40">Average ROI</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">3.7</div>
                <div className="text-sm text-white/40">Months to ROI</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">94.7%</div>
                <div className="text-sm text-white/40">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer - Minimal */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-white/50">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/demo-mode" className="hover:text-white transition-colors">Demo</Link></li>
                <li><a href="#roi" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-2 text-white/50">
                <li><Link to="/solutions/pmo" className="hover:text-white transition-colors">PMO</Link></li>
                <li><Link to="/solutions/executive" className="hover:text-white transition-colors">Executive</Link></li>
                <li><Link to="/solutions/data" className="hover:text-white transition-colors">Data & BI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-white/50">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>© 2026 Powalyze. Swiss precision meets Silicon Valley ambition.</p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fade-out 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
