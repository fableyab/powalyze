import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cpu, Brain, Clock, Film, Satellite, Dna, Music,
  Magnet, Bomb, Compass, Ghost, Users, Edit, Activity, TrendingUp,
  ArrowRight, Sparkles, Zap
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const NextGenGallery = () => {
  const { language } = useLanguage();

  const modules = [
    {
      id: 'multiverse',
      icon: Cpu,
      gradient: 'from-[#00D9FF] to-cyan-600',
      status: 'demo',
      route: '/next-gen/multiverse',
      title: { fr: "Multiverse Engine", en: "Multiverse Engine", de: "Multiverse Engine" },
      tagline: { fr: "5 futurs parallèles", en: "5 parallel futures", de: "5 parallele Zukünfte" },
      impact: { fr: "-70% incertitude", en: "-70% uncertainty", de: "-70% Unsicherheit" }
    },
    {
      id: 'cortex',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-600',
      status: 'demo',
      route: '/next-gen/cortex',
      title: { fr: "Cortex Organisationnel", en: "Organizational Cortex", de: "Organisationskortex" },
      tagline: { fr: "Carte neuronale 3D", en: "3D neural map", de: "3D-Nervenkarte" },
      impact: { fr: "Interactions visibles", en: "Visible interactions", de: "Sichtbare Interaktionen" }
    },
    {
      id: 'timewarp',
      icon: Clock,
      gradient: 'from-emerald-500 to-green-600',
      status: 'soon',
      title: { fr: "Time Warp PMO", en: "Time Warp PMO", de: "Time Warp PMO" },
      tagline: { fr: "Replay historique + ML", en: "Historical replay + ML", de: "Historisches Replay + ML" },
      impact: { fr: "Erreurs comprises", en: "Errors understood", de: "Fehler verstanden" }
    },
    {
      id: 'cinematic',
      icon: Film,
      gradient: 'from-amber-500 to-orange-600',
      status: 'soon',
      title: { fr: "Cinematic Decision Room", en: "Cinematic Decision Room", de: "Cinematic Decision Room" },
      tagline: { fr: "Expérience immersive", en: "Immersive experience", de: "Immersives Erlebnis" },
      impact: { fr: "Mémorisation 5x", en: "5x memorization", de: "5x Erinnerung" }
    },
    {
      id: 'gravity',
      icon: Satellite,
      gradient: 'from-blue-500 to-indigo-600',
      status: 'soon',
      title: { fr: "Project Gravity Map", en: "Project Gravity Map", de: "Project Gravity Map" },
      tagline: { fr: "Visualisation astrophysique", en: "Astrophysical visualization", de: "Astrophysische Visualisierung" },
      impact: { fr: "Priorités évidentes", en: "Obvious priorities", de: "Offensichtliche Prioritäten" }
    },
    {
      id: 'dna',
      icon: Dna,
      gradient: 'from-red-500 to-pink-600',
      status: 'soon',
      title: { fr: "DNA Builder", en: "DNA Builder", de: "DNA Builder" },
      tagline: { fr: "Édite l'ADN organisationnel", en: "Edit organizational DNA", de: "Bearbeite organisatorische DNA" },
      impact: { fr: "Transformation tangible", en: "Tangible transformation", de: "Greifbare Transformation" }
    },
    {
      id: 'composer',
      icon: Music,
      gradient: 'from-violet-500 to-purple-600',
      status: 'roadmap',
      title: { fr: "Scenario Composer", en: "Scenario Composer", de: "Scenario Composer" },
      tagline: { fr: "Stratégie comme symphonie", en: "Strategy as symphony", de: "Strategie als Symphonie" },
      impact: { fr: "Narratif puissant", en: "Powerful narrative", de: "Kraftvolle Erzählung" }
    },
    {
      id: 'magnet',
      icon: Magnet,
      gradient: 'from-teal-500 to-cyan-600',
      status: 'roadmap',
      title: { fr: "Value Magnet", en: "Value Magnet", de: "Value Magnet" },
      tagline: { fr: "IRM de la valeur", en: "Value MRI", de: "Wert-MRT" },
      impact: { fr: "Fuites révélées", en: "Leaks revealed", de: "Lecks aufgedeckt" }
    },
    {
      id: 'crisis',
      icon: Bomb,
      gradient: 'from-orange-500 to-red-600',
      status: 'roadmap',
      title: { fr: "Crisis Simulator", en: "Crisis Simulator", de: "Krisensimulator" },
      tagline: { fr: "Crash test entreprise", en: "Company crash test", de: "Unternehmens-Crashtest" },
      impact: { fr: "Résilience testée", en: "Resilience tested", de: "Belastbarkeit getestet" }
    },
    {
      id: 'compass',
      icon: Compass,
      gradient: 'from-cyan-500 to-blue-600',
      status: 'roadmap',
      title: { fr: "Strategic Compass", en: "Strategic Compass", de: "Strategischer Kompass" },
      tagline: { fr: "GPS stratégique", en: "Strategic GPS", de: "Strategisches GPS" },
      impact: { fr: "Correction proactive", en: "Proactive correction", de: "Proaktive Korrektur" }
    },
    {
      id: 'ghost',
      icon: Ghost,
      gradient: 'from-gray-500 to-slate-600',
      status: 'roadmap',
      title: { fr: "Ghost Mode", en: "Ghost Mode", de: "Geistmodus" },
      tagline: { fr: "Surveillance autonome", en: "Autonomous monitoring", de: "Autonome Überwachung" },
      impact: { fr: "Crises évitées", en: "Crises avoided", de: "Krisen vermieden" }
    },
    {
      id: 'twin',
      icon: Users,
      gradient: 'from-pink-500 to-rose-600',
      status: 'roadmap',
      title: { fr: "Executive Twin", en: "Executive Twin", de: "Executive Twin" },
      tagline: { fr: "Clone numérique", en: "Digital clone", de: "Digitaler Klon" },
      impact: { fr: "Décisions cohérentes", en: "Consistent decisions", de: "Konsistente Entscheidungen" }
    },
    {
      id: 'genome',
      icon: Edit,
      gradient: 'from-lime-500 to-green-600',
      status: 'roadmap',
      title: { fr: "Genome Editor", en: "Genome Editor", de: "Genom-Editor" },
      tagline: { fr: "Édite chaque gène", en: "Edit every gene", de: "Bearbeite jedes Gen" },
      impact: { fr: "Trade-offs clairs", en: "Clear trade-offs", de: "Klare Kompromisse" }
    },
    {
      id: 'pulse',
      icon: Activity,
      gradient: 'from-rose-500 to-red-600',
      status: 'roadmap',
      title: { fr: "Strategic Pulse", en: "Strategic Pulse", de: "Strategischer Puls" },
      tagline: { fr: "ECG stratégique", en: "Strategic ECG", de: "Strategisches EKG" },
      impact: { fr: "Santé visible", en: "Visible health", de: "Sichtbare Gesundheit" }
    },
    {
      id: 'evolution',
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-purple-600',
      status: 'roadmap',
      title: { fr: "Evolution Engine", en: "Evolution Engine", de: "Evolutionsmotor" },
      tagline: { fr: "PMO next-gen auto", en: "Auto next-gen PMO", de: "Auto Next-Gen PMO" },
      impact: { fr: "ROI 5.2x", en: "ROI 5.2x", de: "ROI 5.2x" }
    }
  ];

  const content = {
    fr: {
      badge: "Laboratoire du Futur",
      title: "Les 15 Modules",
      titleHighlight: "Impossibles",
      subtitle: "Des produits qui n'ont jamais existé. Des concepts qui redéfinissent le PMO. Une vision qui crée un océan bleu total.",
      demo: "Démo interactive",
      soon: "Bientôt disponible",
      roadmap: "En développement",
      explore: "Explorer",
      viewAll: "Voir la vision complète",
      demoNotice: "🎬 Prototypes interactifs - Testez maintenant"
    },
    en: {
      badge: "Future Laboratory",
      title: "The 15",
      titleHighlight: "Impossible Modules",
      subtitle: "Products that never existed. Concepts that redefine PMO. A vision that creates a total blue ocean.",
      demo: "Interactive demo",
      soon: "Coming soon",
      roadmap: "In development",
      explore: "Explore",
      viewAll: "View complete vision",
      demoNotice: "🎬 Interactive prototypes - Test now"
    },
    de: {
      badge: "Labor der Zukunft",
      title: "Die 15",
      titleHighlight: "Unmögliche Module",
      subtitle: "Produkte, die noch nie existierten. Konzepte, die PMO neu definieren. Eine Vision, die einen totalen blauen Ozean schafft.",
      demo: "Interaktive Demo",
      soon: "Demnächst verfügbar",
      roadmap: "In Entwicklung",
      explore: "Erkunden",
      viewAll: "Vollständige Vision ansehen",
      demoNotice: "🎬 Interaktive Prototypen - Jetzt testen"
    }
  };

  const text = content[language] || content.fr;

  const getStatusBadge = (status) => {
    switch(status) {
      case 'demo':
        return { text: text.demo, color: 'bg-[#00F744]/20 text-[#00F744]' };
      case 'soon':
        return { text: text.soon, color: 'bg-[#FFD60A]/20 text-[#FFD60A]' };
      case 'roadmap':
        return { text: text.roadmap, color: 'bg-white/20 text-white' };
      default:
        return { text: '', color: '' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title={`${text.title} ${text.titleHighlight} | Powalyze Next-Gen`}
        description={text.subtitle}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D9FF08_1px,transparent_1px),linear-gradient(to_bottom,#00D9FF08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00D9FF] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF006E] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 px-6 py-3 rounded-full mb-8">
              <Sparkles className="text-[#00D9FF]" size={16} />
              <span className="text-sm uppercase tracking-widest text-[#00D9FF] font-bold">
                {text.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">{text.title} </span>
              <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {text.titleHighlight}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {text.subtitle}
            </p>

            <p className="text-sm text-gray-500">{text.demoNotice}</p>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const status = getStatusBadge(module.status);
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* Glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Card */}
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-white/30 rounded-2xl p-6 h-full flex flex-col transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${status.color}`}>
                        {status.text}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{module.title[language]}</h3>
                    <p className="text-sm text-gray-400 mb-3">{module.tagline[language]}</p>
                    <p className={`text-xs bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent font-bold mb-6`}>
                      {module.impact[language]}
                    </p>

                    {/* CTA */}
                    {module.route ? (
                      <Link to={module.route} className="mt-auto">
                        <Button
                          className={`w-full bg-gradient-to-r ${module.gradient} text-white hover:opacity-90 font-bold group-hover:scale-105 transition-transform`}
                        >
                          {text.explore}
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className="mt-auto w-full bg-white/10 text-gray-400 cursor-not-allowed"
                      >
                        {status.text}
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 backdrop-blur-xl bg-gradient-to-r from-[#00D9FF]/10 to-purple-500/10 border border-[#00D9FF]/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Découvrez la vision complète</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Pitch deck, roadmap, architecture technique — tout est documenté.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#00D9FF] to-cyan-600 text-black hover:from-cyan-600 hover:to-[#00D9FF] font-bold px-10"
                >
                  Réserver une démo
                  <Zap className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default NextGenGallery;
