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

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[10px] font-mono text-white/60 hover:text-[#D4AF37] transition-colors tracking-wider uppercase">
                Capabilities
              </a>
              <a href="#intelligence" className="text-[10px] font-mono text-white/60 hover:text-[#D4AF37] transition-colors tracking-wider uppercase">
                Intelligence
              </a>
              <a href="#security" className="text-[10px] font-mono text-white/60 hover:text-[#D4AF37] transition-colors tracking-wider uppercase">
                Security
              </a>
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-[10px] font-mono tracking-wider hover:scale-105 transition-transform uppercase"
              >
                Access Platform
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/videos/manifeste-powalyze.mp4"
            className="w-full h-full object-cover scale-110"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#4A9EFF]/10" />
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-30">
          <button
            onClick={toggleVideo}
            className="group w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
          >
            {videoPlaying ? (
              <Pause className="w-5 h-5 text-white/90 group-hover:text-white" />
            ) : (
              <Play className="w-5 h-5 text-white/90 group-hover:text-white ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="group w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
          >
            {videoMuted ? (
              <VolumeX className="w-5 h-5 text-white/90 group-hover:text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/90 group-hover:text-white" />
            )}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-7xl mx-auto">
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/60 border border-[#D4AF37]/30 backdrop-blur-xl mb-8">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]/90 uppercase">
              System.Enterprise v2.4.7
            </span>
          </div>

          {/* Main Headline - Industrial */}
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-extralight mb-6 leading-[0.85] tracking-tighter">
            <span className="block text-white/95 mb-2">ORCHESTRATE</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#4A9EFF] bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h1>

          {/* Subheadline - Minimal */}
          <p className="text-xs md:text-sm font-light text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
            STRATEGIC GOVERNANCE PLATFORM / AI-POWERED DECISION ENGINE / REAL-TIME ANALYTICS
          </p>

          {/* CTA Buttons - Industrial */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <Link
              to="/demo-mode"
              className="group relative px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-mono text-[11px] tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/50 uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                Initialize Trial
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="group px-8 py-3 bg-black/60 backdrop-blur-xl border border-white/20 text-white font-mono text-[11px] tracking-wider hover:bg-white/5 transition-all duration-300 flex items-center gap-2 uppercase">
              <Eye className="w-3.5 h-3.5" />
              View Demo
            </button>
          </div>

          {/* Live Metrics - Technical Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`relative p-4 bg-black/40 backdrop-blur-xl border transition-all duration-500 ${
                    activeMetric === index
                      ? 'border-[#D4AF37]/50 bg-black/60'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                    <div className="text-[9px] font-mono text-white/40">LIVE</div>
                  </div>
                  <div className={`text-2xl font-mono mb-0.5 ${metric.color}`}>{metric.value}</div>
                  <div className="text-[9px] font-mono text-white/50 uppercase tracking-wider">{metric.label}</div>
                  {activeMetric === index && (
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Features Section - Swiss Grid */}
      <section id="features" className="relative py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Technical */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="text-[9px] font-mono text-[#D4AF37] tracking-widest mb-2 uppercase">/ CORE CAPABILITIES</div>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
                <span className="text-white">ADVANCED</span>{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                  INFRASTRUCTURE
                </span>
              </h2>
            </div>
            <p className="text-[11px] text-white/50 font-mono max-w-2xl mx-auto tracking-wide">
              ENTERPRISE-GRADE ARCHITECTURE FOR MISSION-CRITICAL OPERATIONS
            </p>
          </div>

          {/* Features Grid - Industrial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Technical corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]/30" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                    <div className="text-[9px] font-mono text-white/40">MODULE_{(index + 1).toString().padStart(2, '0')}</div>
                  </div>
                  <h3 className="text-sm font-mono text-white mb-2 uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-[10px] text-white/50 font-light leading-relaxed">{feature.description}</p>
                  
                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Immersive */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0A0F] to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#4A9EFF]/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content - Technical CTA */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="text-[9px] font-mono text-[#D4AF37] tracking-widest mb-3 uppercase">/ READY TO DEPLOY</div>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-tight">
              <span className="text-white">TRANSFORM YOUR</span>
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                GOVERNANCE LAYER
              </span>
            </h2>
          </div>
          <p className="text-[11px] md:text-xs text-white/50 font-mono mb-10 max-w-2xl mx-auto tracking-wide">
            JOIN LEADING ORGANIZATIONS ORCHESTRATING EXCELLENCE WITH POWALYZE ENTERPRISE PLATFORM
          </p>
          <Link
            to="/demo-mode"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-[11px] font-mono tracking-wider hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/50 uppercase"
          >
            Initialize System
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - Industrial Minimal */}
      <footer className="relative border-t border-white/10 bg-black py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="text-xl font-mono tracking-wider mb-1">
                <span className="text-white">POW</span>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">ALYZE</span>
              </div>
              <p className="text-[9px] text-white/40 font-mono tracking-wider">ENTERPRISE_PORTFOLIO_INTELLIGENCE_v2.4.7</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-mono text-white/40 hover:text-[#D4AF37] transition-colors uppercase">
                About
              </a>
              <a href="#" className="text-[10px] font-mono text-white/40 hover:text-[#D4AF37] transition-colors uppercase">
                Contact
              </a>
              <a href="#" className="text-[10px] font-mono text-white/40 hover:text-[#D4AF37] transition-colors uppercase">
                Privacy
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[9px] text-white/30 font-mono tracking-wide">
              © 2025 POWALYZE.COM / ENGINEERED IN SWITZERLAND / ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
