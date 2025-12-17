import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, DollarSign, Clock, TrendingUp, AlertTriangle,
  ChevronRight, Sparkles, RefreshCw, Play, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const MultiverseEngine = () => {
  const { language } = useLanguage();
  const [selectedUniverse, setSelectedUniverse] = useState(2); // Optimal par défaut
  const [isSimulating, setIsSimulating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Données des 5 univers parallèles
  const universes = [
    {
      id: 0,
      name: { fr: "Fast-Track", en: "Fast-Track", de: "Fast-Track" },
      color: "from-red-500 to-orange-500",
      glowColor: "rgba(239, 68, 68, 0.5)",
      budget: "650k",
      timeline: "8 mois",
      risk: "15%",
      roi: "2.8x",
      completion: "Mai 2026",
      description: { 
        fr: "Livraison accélérée avec ressources maximales",
        en: "Accelerated delivery with maximum resources",
        de: "Beschleunigte Lieferung mit maximalen Ressourcen"
      },
      pros: [
        { fr: "Time-to-market optimal", en: "Optimal time-to-market", de: "Optimale Markteinführungszeit" },
        { fr: "Momentum maintenu", en: "Momentum maintained", de: "Momentum beibehalten" }
      ],
      cons: [
        { fr: "+30% budget", en: "+30% budget", de: "+30% Budget" },
        { fr: "Risque qualité", en: "Quality risk", de: "Qualitätsrisiko" }
      ]
    },
    {
      id: 1,
      name: { fr: "Budget-First", en: "Budget-First", de: "Budget-First" },
      color: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.5)",
      budget: "450k",
      timeline: "14 mois",
      risk: "35%",
      roi: "1.9x",
      completion: "Nov 2026",
      description: { 
        fr: "Optimisation budgétaire maximale",
        en: "Maximum budget optimization",
        de: "Maximale Budgetoptimierung"
      },
      pros: [
        { fr: "-10% budget économisé", en: "-10% budget saved", de: "-10% Budget gespart" },
        { fr: "Ressources minimales", en: "Minimal resources", de: "Minimale Ressourcen" }
      ],
      cons: [
        { fr: "+17% délai", en: "+17% delay", de: "+17% Verzögerung" },
        { fr: "Risque élevé", en: "High risk", de: "Hohes Risiko" }
      ]
    },
    {
      id: 2,
      name: { fr: "Optimal", en: "Optimal", de: "Optimal" },
      color: "from-emerald-500 to-green-400",
      glowColor: "rgba(16, 185, 129, 0.5)",
      budget: "520k",
      timeline: "10 mois",
      risk: "12%",
      roi: "3.5x",
      completion: "Juil 2026",
      description: { 
        fr: "Équilibre parfait risque/valeur",
        en: "Perfect risk/value balance",
        de: "Perfektes Risiko-Wert-Verhältnis"
      },
      pros: [
        { fr: "ROI maximal (3.5x)", en: "Maximum ROI (3.5x)", de: "Maximaler ROI (3.5x)" },
        { fr: "Risque contrôlé", en: "Controlled risk", de: "Kontrolliertes Risiko" },
        { fr: "Timeline raisonnable", en: "Reasonable timeline", de: "Angemessener Zeitplan" }
      ],
      cons: [
        { fr: "Budget moyen", en: "Medium budget", de: "Mittleres Budget" }
      ]
    },
    {
      id: 3,
      name: { fr: "Team-Heavy", en: "Team-Heavy", de: "Team-Heavy" },
      color: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.5)",
      budget: "580k",
      timeline: "7 mois",
      risk: "20%",
      roi: "2.4x",
      completion: "Avr 2026",
      description: { 
        fr: "Équipe renforcée pour vitesse",
        en: "Reinforced team for speed",
        de: "Verstärktes Team für Geschwindigkeit"
      },
      pros: [
        { fr: "Livraison rapide", en: "Fast delivery", de: "Schnelle Lieferung" },
        { fr: "Expertise maximale", en: "Maximum expertise", de: "Maximale Expertise" }
      ],
      cons: [
        { fr: "+16% budget", en: "+16% budget", de: "+16% Budget" },
        { fr: "Overhead coordination", en: "Coordination overhead", de: "Koordinationsaufwand" }
      ]
    },
    {
      id: 4,
      name: { fr: "Phased", en: "Phased", de: "Phased" },
      color: "from-amber-500 to-yellow-400",
      glowColor: "rgba(245, 158, 11, 0.5)",
      budget: "510k",
      timeline: "18 mois",
      risk: "5%",
      roi: "2.1x",
      completion: "Mars 2027",
      description: { 
        fr: "Déploiement progressif sécurisé",
        en: "Secure progressive deployment",
        de: "Sichere progressive Bereitstellung"
      },
      pros: [
        { fr: "Risque minimal", en: "Minimal risk", de: "Minimales Risiko" },
        { fr: "Validation continue", en: "Continuous validation", de: "Kontinuierliche Validierung" }
      ],
      cons: [
        { fr: "+50% timeline", en: "+50% timeline", de: "+50% Zeitplan" },
        { fr: "ROI retardé", en: "Delayed ROI", de: "Verzögerter ROI" }
      ]
    }
  ];

  const content = {
    fr: {
      badge: "Module Impossible",
      title: "Project Multiverse Engine",
      subtitle: "Testez chaque futur avant de décider",
      description: "Changez un paramètre, et notre moteur génère instantanément 5 univers parallèles pour votre projet. Budget, timeline, risque, ROI — tout est simulé en temps réel.",
      simulate: "Simuler les univers",
      simulating: "Simulation en cours...",
      selectUniverse: "Sélectionner cet univers",
      compare: "Comparer les univers",
      divergenceIndex: "Indice de divergence",
      switchCost: "Coût de basculement",
      recommended: "Recommandé",
      metrics: "Métriques clés",
      pros: "Avantages",
      cons: "Inconvénients",
      currentScenario: "Scénario actuel",
      demoNotice: "🎬 Démo interactive - Données simulées"
    },
    en: {
      badge: "Impossible Module",
      title: "Project Multiverse Engine",
      subtitle: "Test every future before deciding",
      description: "Change one parameter, and our engine instantly generates 5 parallel universes for your project. Budget, timeline, risk, ROI — everything simulated in real-time.",
      simulate: "Simulate universes",
      simulating: "Simulating...",
      selectUniverse: "Select this universe",
      compare: "Compare universes",
      divergenceIndex: "Divergence index",
      switchCost: "Switch cost",
      recommended: "Recommended",
      metrics: "Key metrics",
      pros: "Pros",
      cons: "Cons",
      currentScenario: "Current scenario",
      demoNotice: "🎬 Interactive demo - Simulated data"
    },
    de: {
      badge: "Unmögliches Modul",
      title: "Project Multiverse Engine",
      subtitle: "Testen Sie jede Zukunft vor der Entscheidung",
      description: "Ändern Sie einen Parameter und unsere Engine generiert sofort 5 parallele Universen für Ihr Projekt. Budget, Zeitplan, Risiko, ROI — alles in Echtzeit simuliert.",
      simulate: "Universen simulieren",
      simulating: "Simuliere...",
      selectUniverse: "Dieses Universum wählen",
      compare: "Universen vergleichen",
      divergenceIndex: "Divergenzindex",
      switchCost: "Wechselkosten",
      recommended: "Empfohlen",
      metrics: "Schlüsselmetriken",
      pros: "Vorteile",
      cons: "Nachteile",
      currentScenario: "Aktuelles Szenario",
      demoNotice: "🎬 Interaktive Demo - Simulierte Daten"
    }
  };

  const text = content[language] || content.fr;

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setShowComparison(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <SEO 
        title={`${text.title} | Powalyze Next-Gen`}
        description={text.description}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D9FF08_1px,transparent_1px),linear-gradient(to_bottom,#00D9FF08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00D9FF] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF006E] rounded-full blur-[120px] opacity-20" />

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
              <span className="text-white">{text.title.split(' ')[0]} </span>
              <span className="bg-gradient-to-r from-[#00D9FF] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {text.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {text.description}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="bg-gradient-to-r from-[#00D9FF] to-cyan-600 text-black hover:from-cyan-600 hover:to-[#00D9FF] font-bold px-8 py-6 text-lg"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    {text.simulating}
                  </>
                ) : (
                  <>
                    <Play className="mr-2" size={20} />
                    {text.simulate}
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">{text.demoNotice}</p>
          </motion.div>

          {/* Univers parallèles */}
          <AnimatePresence mode="wait">
            {isSimulating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <RefreshCw className="animate-spin text-[#00D9FF] mx-auto mb-4" size={64} />
                  <p className="text-2xl text-gray-400">Génération des univers parallèles...</p>
                </div>
              </motion.div>
            ) : showComparison && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
              >
                {universes.map((universe, index) => (
                  <motion.div
                    key={universe.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: selectedUniverse === universe.id ? 1.05 : 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedUniverse(universe.id)}
                    className={`relative cursor-pointer group`}
                  >
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: universe.glowColor }}
                    />
                    
                    {/* Card */}
                    <div className={`relative backdrop-blur-xl bg-gradient-to-br ${universe.color} bg-opacity-10 border ${
                      selectedUniverse === universe.id 
                        ? 'border-[#00D9FF] ring-2 ring-[#00D9FF]/50' 
                        : 'border-white/10 hover:border-white/30'
                    } rounded-2xl p-6 h-full flex flex-col transition-all duration-300`}>
                      {/* Universe badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${universe.color} bg-clip-text text-transparent`}>
                          {universe.name[language]}
                        </span>
                        {universe.id === 2 && (
                          <span className="text-xs bg-[#00F744]/20 text-[#00F744] px-2 py-1 rounded-full">
                            {text.recommended}
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="space-y-3 mb-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Budget</span>
                          <span className="text-sm font-bold text-white">{universe.budget} CHF</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Timeline</span>
                          <span className="text-sm font-bold text-white">{universe.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Risque</span>
                          <span className={`text-sm font-bold ${
                            parseInt(universe.risk) < 15 ? 'text-[#00F744]' : 
                            parseInt(universe.risk) < 25 ? 'text-yellow-400' : 
                            'text-[#FF006E]'
                          }`}>{universe.risk}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">ROI</span>
                          <span className="text-sm font-bold text-[#00D9FF]">{universe.roi}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                        {universe.description[language]}
                      </p>

                      {/* Select button */}
                      {selectedUniverse === universe.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Button
                            className="w-full bg-[#00D9FF] text-black hover:bg-cyan-600 font-bold text-xs"
                          >
                            {text.selectUniverse}
                            <ArrowRight size={14} className="ml-2" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Détails de l'univers sélectionné */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">
                {text.currentScenario}: {universes[selectedUniverse].name[language]}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div>
                  <h4 className="text-[#00F744] font-bold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    {text.pros}
                  </h4>
                  <ul className="space-y-2">
                    {universes[selectedUniverse].pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-[#00F744] mt-1">✓</span>
                        {pro[language]}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="text-[#FF006E] font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} />
                    {text.cons}
                  </h4>
                  <ul className="space-y-2">
                    {universes[selectedUniverse].cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                        <span className="text-[#FF006E] mt-1">✗</span>
                        {con[language]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default MultiverseEngine;
