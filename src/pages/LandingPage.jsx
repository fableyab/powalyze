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
              <a href="#features" className="text-sm font-light text-white/70 hover:text-white transition-colors">
                Fonctionnalités
              </a>
              <a href="#intelligence" className="text-sm font-light text-white/70 hover:text-white transition-colors">
                Intelligence
              </a>
              <a href="#security" className="text-sm font-light text-white/70 hover:text-white transition-colors">
                Sécurité
              </a>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-sm font-medium hover:scale-105 transition-transform"
              >
                Accéder à la plateforme
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
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#4A9EFF]/20 border border-white/20 backdrop-blur-xl mb-10">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-light tracking-wider text-white/90">
              ENTERPRISE-GRADE PORTFOLIO INTELLIGENCE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-[0.9]">
            <span className="block text-white mb-4">Orchestrez</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#4A9EFF] bg-clip-text text-transparent">
              l'Excellence
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 mb-14 max-w-4xl mx-auto leading-relaxed">
            La plateforme de gouvernance stratégique qui transforme vos décisions en succès mesurables.
            <br />
            <span className="text-[#D4AF37]">Intelligence artificielle</span> + <span className="text-[#4A9EFF]">Vision humaine</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              to="/demo-mode"
              className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Démarrer l'essai gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="group px-12 py-5 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white font-light text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Voir la démo interactive
            </button>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className={`relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border transition-all duration-500 ${
                    activeMetric === index
                      ? 'border-white/30 bg-white/10 scale-105'
                      : 'border-white/10'
                  }`}
                >
                  <Icon className={`w-7 h-7 md:w-9 md:h-9 mb-3 ${metric.color}`} />
                  <div className={`text-2xl md:text-4xl font-light mb-1 ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs md:text-sm text-white/60 font-light">{metric.label}</div>
                  {activeMetric === index && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 to-[#4A9EFF]/20 animate-pulse pointer-events-none" />
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
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extralight mb-6">
              <span className="text-white">Technologie</span>{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
                de pointe
              </span>
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Une infrastructure pensée pour les organisations qui ne laissent rien au hasard
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 to-[#4A9EFF]/0 group-hover:from-[#D4AF37]/10 group-hover:to-[#4A9EFF]/10 transition-all duration-300" />
                  <Icon className="relative w-12 h-12 mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <h3 className="relative text-xl font-light text-white mb-3">{feature.title}</h3>
                  <p className="relative text-white/60 font-light leading-relaxed">{feature.description}</p>
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

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extralight mb-8 leading-tight">
            <span className="text-white">Prêt à transformer</span>
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">
              votre gouvernance ?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-light mb-12 max-w-3xl mx-auto">
            Rejoignez les organisations leaders qui font confiance à Powalyze pour orchestrer leur excellence
          </p>
          <Link
            to="/demo-mode"
            className="inline-flex items-center gap-3 px-14 py-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black text-lg font-medium hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/50"
          >
            Commencer maintenant
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="relative border-t border-white/10 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-extralight tracking-wider mb-2">
                <span className="text-white">POW</span>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] bg-clip-text text-transparent">ALYZE</span>
              </div>
              <p className="text-sm text-white/50 font-light">Enterprise Portfolio Intelligence Platform</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                À propos
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-white/40 font-light">
              © 2025 Powalyze. Engineered in Switzerland with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
