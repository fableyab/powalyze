import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Play, BarChart3, Target, 
  TrendingUp, Zap, Eye, Shield 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CinematicHero = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [activeMetric, setActiveMetric] = useState(0);
  
  const metrics = [
    { 
      value: "94%", 
      label: language === 'fr' ? "Projets alignés stratégie" : language === 'en' ? "Projects aligned with strategy" : "Projekte strategisch ausgerichtet",
      icon: Target,
      color: "from-emerald-500 to-green-400"
    },
    { 
      value: "38%", 
      label: language === 'fr' ? "Réduction des coûts projets" : language === 'en' ? "Project cost reduction" : "Projektkostensenkung",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-400"
    },
    { 
      value: "2.4x", 
      label: language === 'fr' ? "Accélération du ROI" : language === 'en' ? "ROI acceleration" : "ROI-Beschleunigung",
      icon: Zap,
      color: "from-amber-500 to-orange-400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  const content = {
    fr: {
      badge: "Intelligence Exécutive",
      title: "Votre portefeuille de projets",
      titleHighlight: "en hyper-clarté exécutive",
      subtitle: "Powalyze transforme vos données complexes en décisions immédiates. Simulez, prédisez, optimisez. Pour les dirigeants qui veulent des réponses, pas des rapports.",
      cta1: "Démo interactive",
      cta2: "Scanner votre PMO",
      trusted: "Adoptée par des leaders banking, trading, energy"
    },
    en: {
      badge: "Executive Intelligence",
      title: "Your project portfolio in",
      titleHighlight: "hyper-executive clarity",
      subtitle: "Powalyze transforms complex data into immediate decisions. Simulate, predict, optimize. For leaders who want answers, not reports.",
      cta1: "Interactive Demo",
      cta2: "Scan Your PMO",
      trusted: "Adopted by banking, trading, energy leaders"
    },
    de: {
      badge: "Executive Intelligence",
      title: "Ihr Projektportfolio in",
      titleHighlight: "hyper-exekutiver Klarheit",
      subtitle: "Powalyze verwandelt komplexe Daten in sofortige Entscheidungen. Simulieren, vorhersagen, optimieren. Für Führungskräfte, die Antworten wollen, keine Berichte.",
      cta1: "Interaktive Demo",
      cta2: "PMO scannen",
      trusted: "Von Führungskräften in Banking, Trading, Energy übernommen"
    }
  };

  const text = content[language] || content.fr;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient Orbs */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#BFA76A] rounded-full blur-[150px] opacity-20"
      />
      <motion.div 
        style={{ y: useTransform(y, v => -v) }}
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-10"
      />

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-[#BFA76A]/30 px-6 py-3 rounded-full mb-8"
        >
          <Sparkles className="text-[#BFA76A]" size={16} />
          <span className="text-sm uppercase tracking-widest text-[#BFA76A] font-bold">
            {text.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-5 tracking-tight"
        >
          <span className="text-white">{text.title}</span>
          <br />
          <span className="bg-gradient-to-r from-[#BFA76A] via-amber-400 to-amber-300 bg-clip-text text-transparent">
            {text.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          {text.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/boardroom-demo">
            <Button 
              size="xl" 
              className="group relative overflow-hidden bg-gradient-to-r from-[#BFA76A] to-amber-600 text-black hover:from-amber-600 hover:to-[#BFA76A] font-bold text-lg px-10 py-6 shadow-2xl shadow-[#BFA76A]/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play size={20} />
                {text.cta1}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </Button>
          </Link>

          <Link to="/pmo-maturity-scan">
            <Button
              size="xl"
              variant="outline"
              className="relative backdrop-blur-xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-[#BFA76A]/50 px-10 py-6 group transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Shield size={20} />
                {text.cta2}
                <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm text-gray-500 font-light tracking-wide"
        >
          {text.trusted}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-2 bg-[#BFA76A] rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
