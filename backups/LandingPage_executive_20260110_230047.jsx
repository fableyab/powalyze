import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, TrendingUp, Zap, Target, BarChart3, Play, Pause, Volume2, VolumeX, ArrowRight, Eye, Sparkles, Activity, Globe, Lock, Database } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const [activeMetric, setActiveMetric] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const metrics = [
    { value: '€2.4Bn', label: 'Portfolio Value', color: 'text-emerald-400', icon: TrendingUp },
    { value: '847', label: 'Active Projects', color: 'text-sky-400', icon: Target },
    { value: '99.97%', label: 'System Uptime', color: 'text-amber-400', icon: Shield },
    { value: '14ms', label: 'Response Time', color: 'text-purple-400', icon: Zap }
  ];

  const features = [
    {
      icon: Activity,
      title: 'Intelligence Prédictive',
      description: 'IA avancée pour anticiper les risques et optimiser vos décisions stratégiques en temps réel'
    },
    {
      icon: Globe,
      title: 'Gouvernance Mondiale',
      description: 'Orchestrez vos portfolios à l\'échelle internationale avec une précision Swiss-grade'
    },
    {
      icon: Lock,
      title: 'Sécurité Bancaire',
      description: 'Architecture de sécurité niveau banque suisse avec chiffrement end-to-end'
    },
    {
      icon: Database,
      title: 'Data Intelligence',
      description: 'Analytiques avancées et tableaux de bord Power BI pour une visibilité totale'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.08), transparent 40%)`
        }}
      />

      {/* Navigation - Swiss Minimal */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-extralight tracking-wider">
              <span className="text-white">POW</span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">ALYZE</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-xs font-light text-white/60 hover:text-[#D4AF37] transition-colors">
                Capabilities
              </a>
              <a href="#intelligence" className="text-xs font-light text-white/60 hover:text-[#D4AF37] transition-colors">
                Intelligence
              </a>
              <a href="#security" className="text-xs font-light text-white/60 hover:text-[#D4AF37] transition-colors">
                Security
              </a>
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-xs font-medium hover:scale-105 transition-transform"
              >
                Client Access
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Executive */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Professional Background */}
        <div className="absolute inset-0 z-0 bg-black">
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-black to-[#0A0A0F]" />
          
          {/* Technical grid - very subtle */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
          
          {/* Accent lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/30 backdrop-blur-xl mb-8">
            <div className="w-1 h-1 bg-[#D4AF37] animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/90 uppercase">
              Enterprise Platform v2.4.7
            </span>
          </div>

          {/* Main Headline - Professional Size */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight tracking-tight">
            <span className="block text-white mb-2">Strategic Portfolio</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent font-extralight">
              Governance Platform
            </span>
          </h1>

          {/* Executive Value Proposition */}
          <p className="text-sm md:text-base font-light text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time intelligence for C-suite decision making. Transform strategic initiatives into measurable business outcomes.
          </p>

          {/* CTA Buttons - Executive */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <Link
              to="/demo-mode"
              className="group relative px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium text-xs tracking-wide hover:scale-105 transition-all duration-300 shadow-xl shadow-[#D4AF37]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Demo
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/login"
              className="group px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-light text-xs tracking-wide hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              Platform Access
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Executive Metrics - Clean Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`relative p-5 bg-white/[0.02] backdrop-blur-sm border transition-all duration-500 ${
                    activeMetric === index
                      ? 'border-[#D4AF37]/40 bg-white/[0.04]'
                      : 'border-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-3 ${metric.color} opacity-80`} />
                  <div className={`text-2xl font-light mb-1 ${metric.color}`}>{metric.value}</div>
                  <div className="text-[10px] text-white/50 tracking-wide uppercase">{metric.label}</div>
                  {activeMetric === index && (
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
        </div>
      </section>

      {/* Features Section - Executive Cards */}
      <section id="features" className="relative py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Professional */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="text-[10px] text-[#D4AF37] tracking-widest mb-3 uppercase">Core Capabilities</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                <span className="text-white">Enterprise-Grade </span>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </h2>
            </div>
            <p className="text-sm text-white/60 font-light max-w-2xl mx-auto">
              Built for organizations that demand precision, security, and real-time insights
            </p>
          </div>

          {/* Features Grid - Clean Professional */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 mb-4 text-[#D4AF37] opacity-80" />
                  <h3 className="text-base font-light text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{feature.description}</p>
                  
                  {/* Subtle hover effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Executive */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0F] to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-[#4A9EFF]/5 rounded-full blur-[120px]" />
        </div>

        {/* Content - Professional */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-8">
            <div className="text-[10px] text-[#D4AF37] tracking-widest mb-4 uppercase">Ready to Scale</div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight mb-4">
              <span className="text-white">Transform Your Strategic</span>
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                Portfolio Management
              </span>
            </h2>
          </div>
          <p className="text-sm text-white/60 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Join leading enterprises leveraging Powalyze for data-driven governance and measurable business outcomes
          </p>
          <Link
            to="/demo-mode"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-xs font-medium tracking-wide hover:scale-105 transition-all duration-300 shadow-xl shadow-[#D4AF37]/30"
          >
            Schedule Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - Executive Minimal */}
      <footer className="relative border-t border-white/10 bg-black py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl font-light tracking-wider mb-1">
                <span className="text-white">Pow</span>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">alyze</span>
              </div>
              <p className="text-[10px] text-white/40 tracking-wide">Enterprise Portfolio Intelligence Platform</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors">
                About
              </a>
              <a href="#" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors">
                Contact
              </a>
              <a href="#" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] text-white/30">
              © 2025 Powalyze. Engineered in Switzerland.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
