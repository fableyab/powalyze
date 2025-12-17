import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Pause, ChevronLeft, ChevronRight, Maximize2, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, 
  Clock, DollarSign, Users, Target 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const BoardroomModeDemo = () => {
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 'portfolio-health',
      title: {
        fr: "État du Portefeuille",
        en: "Portfolio Health",
        de: "Portfolio-Zustand"
      },
      metrics: [
        { 
          label: { fr: "Budget Total", en: "Total Budget", de: "Gesamtbudget" },
          value: "127.4M CHF",
          trend: "up",
          change: "+3.2%",
          icon: DollarSign,
          color: "emerald"
        },
        {
          label: { fr: "Projets Actifs", en: "Active Projects", de: "Aktive Projekte" },
          value: "47",
          trend: "neutral",
          change: "0",
          icon: Target,
          color: "blue"
        },
        {
          label: { fr: "Ressources", en: "Resources", de: "Ressourcen" },
          value: "324",
          trend: "up",
          change: "+12",
          icon: Users,
          color: "purple"
        },
        {
          label: { fr: "Risques Critiques", en: "Critical Risks", de: "Kritische Risiken" },
          value: "3",
          trend: "down",
          change: "-2",
          icon: AlertTriangle,
          color: "orange"
        }
      ],
      chart: {
        type: 'donut',
        data: [
          { label: { fr: "En cours", en: "On Track", de: "Auf Kurs" }, value: 67, color: "emerald" },
          { label: { fr: "Attention", en: "Attention", de: "Achtung" }, value: 23, color: "amber" },
          { label: { fr: "Critique", en: "Critical", de: "Kritisch" }, value: 10, color: "red" }
        ]
      }
    },
    {
      id: 'financial-overview',
      title: {
        fr: "Vue Financière Q4",
        en: "Q4 Financial Overview",
        de: "Q4 Finanzübersicht"
      },
      metrics: [
        {
          label: { fr: "Budget Consommé", en: "Budget Spent", de: "Verbrauchtes Budget" },
          value: "89.2M CHF",
          trend: "neutral",
          change: "70% du total",
          icon: DollarSign,
          color: "blue"
        },
        {
          label: { fr: "ROI Prévisionnel", en: "Projected ROI", de: "Prognostizierter ROI" },
          value: "2.4x",
          trend: "up",
          change: "+0.3x",
          icon: TrendingUp,
          color: "emerald"
        },
        {
          label: { fr: "Économies Réalisées", en: "Savings Achieved", de: "Erzielte Einsparungen" },
          value: "12.8M CHF",
          trend: "up",
          change: "+18%",
          icon: CheckCircle2,
          color: "green"
        },
        {
          label: { fr: "Budget à Risque", en: "Budget at Risk", de: "Gefährdetes Budget" },
          value: "4.1M CHF",
          trend: "down",
          change: "-2.3M",
          icon: AlertTriangle,
          color: "orange"
        }
      ],
      chart: {
        type: 'bar',
        data: [
          { label: "Q1", planned: 28, actual: 27 },
          { label: "Q2", planned: 32, actual: 31 },
          { label: "Q3", planned: 30, actual: 31 },
          { label: "Q4", planned: 38, actual: 35 }
        ]
      }
    },
    {
      id: 'top-risks',
      title: {
        fr: "Top 5 Risques Exécutifs",
        en: "Top 5 Executive Risks",
        de: "Top 5 Executive Risiken"
      },
      risks: [
        {
          project: "Cloud Migration Phase 2",
          risk: { fr: "Retard fournisseur AWS", en: "AWS vendor delay", de: "AWS-Anbieter Verzögerung" },
          impact: "high",
          probability: "medium",
          mitigation: { fr: "Plan B activé - Azure backup", en: "Plan B activated - Azure backup", de: "Plan B aktiviert - Azure Backup" },
          owner: "CTO"
        },
        {
          project: "Trading Platform Upgrade",
          risk: { fr: "Ressources clés démission", en: "Key resources resignation", de: "Schlüsselressourcen Kündigung" },
          impact: "critical",
          probability: "high",
          mitigation: { fr: "Recrutement urgent + transfert knowledge", en: "Urgent hiring + knowledge transfer", de: "Dringende Einstellung + Wissenstransfer" },
          owner: "Head of Trading"
        },
        {
          project: "Regulatory Compliance 2025",
          risk: { fr: "Deadline réglementaire Q1", en: "Q1 regulatory deadline", de: "Q1-Regulierungsfrist" },
          impact: "critical",
          probability: "medium",
          mitigation: { fr: "Fast-track + ressources additionnelles", en: "Fast-track + additional resources", de: "Schnellspur + zusätzliche Ressourcen" },
          owner: "Chief Compliance Officer"
        },
        {
          project: "Data Lake Implementation",
          risk: { fr: "Budget dépassement prévu 15%", en: "Budget overrun projected 15%", de: "Budgetüberschreitung prognostiziert 15%" },
          impact: "medium",
          probability: "high",
          mitigation: { fr: "Re-priorisation scope + phase 2 report", en: "Scope re-prioritization + phase 2 postponed", de: "Umfang-Repriorisierung + Phase 2 verschoben" },
          owner: "CDO"
        },
        {
          project: "Mobile Banking App",
          risk: { fr: "Tests sécurité insuffisants", en: "Insufficient security testing", de: "Unzureichende Sicherheitstests" },
          impact: "high",
          probability: "low",
          mitigation: { fr: "Audit externe commandé", en: "External audit commissioned", de: "Externe Prüfung beauftragt" },
          owner: "CISO"
        }
      ]
    },
    {
      id: 'strategic-initiatives',
      title: {
        fr: "Initiatives Stratégiques 2025",
        en: "2025 Strategic Initiatives",
        de: "Strategische Initiativen 2025"
      },
      initiatives: [
        {
          name: "Digital Transformation",
          status: "on-track",
          progress: 72,
          budget: "45M CHF",
          completion: "Q3 2025",
          keyMilestone: { fr: "Migration cloud 80% complète", en: "Cloud migration 80% complete", de: "Cloud-Migration 80% abgeschlossen" }
        },
        {
          name: "AI & Automation",
          status: "ahead",
          progress: 85,
          budget: "28M CHF",
          completion: "Q2 2025",
          keyMilestone: { fr: "12 processus automatisés", en: "12 processes automated", de: "12 Prozesse automatisiert" }
        },
        {
          name: "Sustainability Program",
          status: "attention",
          progress: 45,
          budget: "15M CHF",
          completion: "Q4 2025",
          keyMilestone: { fr: "Certification ISO en cours", en: "ISO certification in progress", de: "ISO-Zertifizierung im Gange" }
        },
        {
          name: "Market Expansion APAC",
          status: "on-track",
          progress: 58,
          budget: "67M CHF",
          completion: "Q1 2026",
          keyMilestone: { fr: "3 bureaux ouverts", en: "3 offices opened", de: "3 Büros eröffnet" }
        }
      ]
    }
  ];

  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 80); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'emerald';
      case 'ahead': return 'blue';
      case 'attention': return 'amber';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'amber';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#BFA76A]/5 via-transparent to-transparent" />
      
      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-12 py-8 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-display font-bold text-[#BFA76A]">POWALYZE</div>
            <div className="h-6 w-px bg-white/20" />
            <div className="text-sm text-gray-500 uppercase tracking-wider">Executive Dashboard</div>
          </div>

          <div className="flex items-center gap-4">
            {/* Slide Navigation */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentSlide(index); setProgress(0); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-[#BFA76A] w-8' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={nextSlide}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <div className="h-6 w-px bg-white/20" />

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5">
          <motion.div
            className="h-full bg-[#BFA76A]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Slides Content */}
        <div className="flex-grow flex items-center justify-center p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-7xl"
            >
              {/* Slide Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-display font-bold mb-16 text-center"
              >
                {currentSlideData.title[language] || currentSlideData.title.fr}
              </motion.h1>

              {/* Metrics Grid */}
              {currentSlideData.metrics && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {currentSlideData.metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`backdrop-blur-xl bg-gradient-to-br from-${metric.color}-500/10 to-transparent border border-white/10 rounded-2xl p-8`}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-3 bg-${metric.color}-500/20 rounded-xl`}>
                            <Icon size={24} className={`text-${metric.color}-400`} />
                          </div>
                          {metric.trend === 'up' && (
                            <div className="flex items-center gap-1 text-emerald-400 text-sm">
                              <TrendingUp size={16} />
                              <span>{metric.change}</span>
                            </div>
                          )}
                          {metric.trend === 'down' && (
                            <div className="flex items-center gap-1 text-red-400 text-sm">
                              <TrendingDown size={16} />
                              <span>{metric.change}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-4xl font-display font-bold mb-2">{metric.value}</div>
                        <div className="text-sm text-gray-500">{metric.label[language] || metric.label.fr}</div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Risks Table */}
              {currentSlideData.risks && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Projet</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Risque</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Impact</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Probabilité</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Mitigation</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSlideData.risks.map((risk, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium">{risk.project}</td>
                            <td className="px-6 py-4 text-gray-400">{risk.risk[language] || risk.risk.fr}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold bg-${getImpactColor(risk.impact)}-500/20 text-${getImpactColor(risk.impact)}-400`}>
                                {risk.impact.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold bg-${getImpactColor(risk.probability)}-500/20 text-${getImpactColor(risk.probability)}-400`}>
                                {risk.probability.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{risk.mitigation[language] || risk.mitigation.fr}</td>
                            <td className="px-6 py-4 text-sm font-bold text-[#BFA76A]">{risk.owner}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Initiatives */}
              {currentSlideData.initiatives && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentSlideData.initiatives.map((initiative, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-2xl font-bold">{initiative.name}</h3>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold bg-${getStatusColor(initiative.status)}-500/20 text-${getStatusColor(initiative.status)}-400`}>
                          {initiative.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="font-bold">{initiative.progress}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-${getStatusColor(initiative.status)}-500`}
                              initial={{ width: 0 }}
                              animate={{ width: `${initiative.progress}%` }}
                              transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500 mb-1">Budget</div>
                            <div className="font-bold">{initiative.budget}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Completion</div>
                            <div className="font-bold">{initiative.completion}</div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                          <div className="text-xs text-gray-500 mb-1">Key Milestone</div>
                          <div className="text-sm text-white">{initiative.keyMilestone[language] || initiative.keyMilestone.fr}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-12 py-6 border-t border-white/5 text-sm text-gray-500">
          <div>
            {language === 'fr' ? "Données actualisées il y a" : language === 'en' ? "Data updated" : "Daten aktualisiert"} <span className="text-[#BFA76A]">2 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardroomModeDemo;
