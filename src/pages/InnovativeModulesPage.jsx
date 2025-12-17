import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Cpu, TrendingUp, Brain, FileText, Sliders, Radar, 
  Presentation, Scan, DollarSign, AlertTriangle, MessageSquare,
  Heart, Target, Video, ArrowRight, Sparkles, Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const InnovativeModulesPage = () => {
  const { language } = useLanguage();
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      id: 'digital-twin',
      icon: Cpu,
      gradient: 'from-blue-500 to-cyan-400',
      title: {
        fr: "PMO Digital Twin",
        en: "PMO Digital Twin",
        de: "PMO Digital Twin"
      },
      tagline: {
        fr: "Simulez l'impact de chaque décision avant de la prendre",
        en: "Simulate the impact of every decision before making it",
        de: "Simulieren Sie die Auswirkungen jeder Entscheidung, bevor Sie sie treffen"
      },
      description: {
        fr: "Créez un jumeau numérique complet de votre portefeuille de projets. Testez des scénarios what-if en temps réel : réaffectation de budget, repriorisation, allocation de ressources. Visualisez instantanément l'impact sur les délais, coûts et risques.",
        en: "Create a complete digital twin of your project portfolio. Test real-time what-if scenarios: budget reallocation, reprioritization, resource allocation. Instantly visualize the impact on timelines, costs, and risks.",
        de: "Erstellen Sie einen vollständigen digitalen Zwilling Ihres Projektportfolios. Testen Sie Was-wäre-wenn-Szenarien in Echtzeit: Budgetumverteilung, Neupriorisierung, Ressourcenzuteilung. Visualisieren Sie sofort die Auswirkungen auf Fristen, Kosten und Risiken."
      },
      features: {
        fr: ["Simulation multi-scénarios", "Impact analysis en temps réel", "Optimisation IA des ressources"],
        en: ["Multi-scenario simulation", "Real-time impact analysis", "AI resource optimization"],
        de: ["Multi-Szenario-Simulation", "Echtzeit-Auswirkungsanalyse", "KI-Ressourcenoptimierung"]
      },
      metrics: {
        fr: "42% de réduction des erreurs d'estimation",
        en: "42% reduction in estimation errors",
        de: "42% Reduzierung der Schätzfehler"
      }
    },
    {
      id: 'decision-engine',
      icon: Target,
      gradient: 'from-emerald-500 to-green-400',
      title: {
        fr: "Decision Engine",
        en: "Decision Engine",
        de: "Decision Engine"
      },
      tagline: {
        fr: "Go / No-Go / Reprioriser. Justification automatique pour le comité.",
        en: "Go / No-Go / Reprioritize. Automatic justification for the board.",
        de: "Go / No-Go / Repriorisieren. Automatische Begründung für den Vorstand."
      },
      description: {
        fr: "L'IA analyse automatiquement chaque projet selon 20+ critères stratégiques, financiers, techniques et humains. Elle génère un score décisionnel clair (Go/No-Go/Delay/Reprioriser) avec justification exécutive argumentée et recommandations d'action.",
        en: "AI automatically analyzes each project across 20+ strategic, financial, technical, and human criteria. It generates a clear decision score (Go/No-Go/Delay/Reprioritize) with executive justification and action recommendations.",
        de: "KI analysiert automatisch jedes Projekt nach 20+ strategischen, finanziellen, technischen und menschlichen Kriterien. Sie generiert einen klaren Entscheidungswert (Go/No-Go/Verzögerung/Repriorisierung) mit Führungsbegründung und Handlungsempfehlungen."
      },
      features: {
        fr: ["Scoring multi-critères", "Justification argumentée", "Recommandations exécutives"],
        en: ["Multi-criteria scoring", "Argued justification", "Executive recommendations"],
        de: ["Multikriterienbewertung", "Argumentierte Begründung", "Executive Empfehlungen"]
      },
      metrics: {
        fr: "67% plus rapide pour les décisions comité",
        en: "67% faster board decisions",
        de: "67% schnellere Vorstandsentscheidungen"
      }
    },
    {
      id: 'predictive-pmo',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-400',
      title: {
        fr: "Predictive PMO",
        en: "Predictive PMO",
        de: "Predictive PMO"
      },
      tagline: {
        fr: "Détectez les problèmes 30 jours avant qu'ils surviennent",
        en: "Detect problems 30 days before they occur",
        de: "Erkennen Sie Probleme 30 Tage im Voraus"
      },
      description: {
        fr: "Machine Learning analyse patterns historiques, signaux faibles et tendances cachées pour prédire retards, dépassements de budget et risques futurs. Vous recevez des alertes intelligentes avant que les problèmes ne deviennent critiques.",
        en: "Machine Learning analyzes historical patterns, weak signals, and hidden trends to predict delays, budget overruns, and future risks. You receive intelligent alerts before problems become critical.",
        de: "Machine Learning analysiert historische Muster, schwache Signale und versteckte Trends, um Verzögerungen, Budgetüberschreitungen und zukünftige Risiken vorherzusagen. Sie erhalten intelligente Warnungen, bevor Probleme kritisch werden."
      },
      features: {
        fr: ["Prédiction ML", "Alertes anticipées", "Analyse de tendances"],
        en: ["ML prediction", "Early alerts", "Trend analysis"],
        de: ["ML-Vorhersage", "Frühwarnungen", "Trendanalyse"]
      },
      metrics: {
        fr: "81% des dérives détectées en avance",
        en: "81% of drifts detected in advance",
        de: "81% der Abweichungen im Voraus erkannt"
      }
    },
    {
      id: 'storytelling',
      icon: FileText,
      gradient: 'from-amber-500 to-orange-400',
      title: {
        fr: "Storytelling Automatique",
        en: "Automatic Storytelling",
        de: "Automatisches Storytelling"
      },
      tagline: {
        fr: "PPT premium + executive summary générés automatiquement",
        en: "Premium PPT + executive summary generated automatically",
        de: "Premium-PPT + Executive Summary automatisch generiert"
      },
      description: {
        fr: "L'IA transforme vos données en récit exécutif cohérent. Génération automatique de PowerPoint premium, executive summaries et rapports narratifs. Design professionnel, graphiques impactants, storytelling optimisé pour comités de direction.",
        en: "AI transforms your data into coherent executive narrative. Automatic generation of premium PowerPoint, executive summaries, and narrative reports. Professional design, impactful graphics, storytelling optimized for executive committees.",
        de: "KI verwandelt Ihre Daten in eine kohärente Executive-Erzählung. Automatische Generierung von Premium-PowerPoint, Executive Summaries und narrativen Berichten. Professionelles Design, wirkungsvolle Grafiken, Storytelling optimiert für Führungsgremien."
      },
      features: {
        fr: ["Génération PPT premium", "Executive summaries", "Design automatique"],
        en: ["Premium PPT generation", "Executive summaries", "Automatic design"],
        de: ["Premium-PPT-Generierung", "Executive Summaries", "Automatisches Design"]
      },
      metrics: {
        fr: "90% de temps gagné sur le reporting",
        en: "90% time saved on reporting",
        de: "90% Zeitersparnis beim Reporting"
      }
    },
    {
      id: 'configurator',
      icon: Sliders,
      gradient: 'from-red-500 to-rose-400',
      title: {
        fr: "PMO Configurator",
        en: "PMO Configurator",
        de: "PMO Configurator"
      },
      tagline: {
        fr: "Configurez votre PMO comme une Tesla : roadmap + budget + plan d'action",
        en: "Configure your PMO like a Tesla: roadmap + budget + action plan",
        de: "Konfigurieren Sie Ihr PMO wie einen Tesla: Roadmap + Budget + Aktionsplan"
      },
      description: {
        fr: "Interface configurateur interactive style Tesla. Sélectionnez vos besoins, contraintes et objectifs. Le système génère automatiquement une roadmap PMO personnalisée, un budget détaillé et un plan d'action opérationnel. Exportable en PDF premium.",
        en: "Tesla-style interactive configurator interface. Select your needs, constraints, and objectives. The system automatically generates a personalized PMO roadmap, detailed budget, and operational action plan. Exportable as premium PDF.",
        de: "Interaktive Konfigurator-Schnittstelle im Tesla-Stil. Wählen Sie Ihre Bedürfnisse, Einschränkungen und Ziele. Das System generiert automatisch eine personalisierte PMO-Roadmap, ein detailliertes Budget und einen operativen Aktionsplan. Als Premium-PDF exportierbar."
      },
      features: {
        fr: ["Interface interactive", "Génération roadmap", "Export PDF premium"],
        en: ["Interactive interface", "Roadmap generation", "Premium PDF export"],
        de: ["Interaktive Oberfläche", "Roadmap-Generierung", "Premium-PDF-Export"]
      },
      metrics: {
        fr: "Roadmap PMO en 15 minutes vs 3 semaines",
        en: "PMO roadmap in 15 minutes vs 3 weeks",
        de: "PMO-Roadmap in 15 Minuten statt 3 Wochen"
      }
    },
    {
      id: 'radar-360',
      icon: Radar,
      gradient: 'from-indigo-500 to-purple-400',
      title: {
        fr: "Project Radar 360°",
        en: "Project Radar 360°",
        de: "Project Radar 360°"
      },
      tagline: {
        fr: "Vue circulaire unique de la santé de vos projets",
        en: "Unique circular view of your project health",
        de: "Einzigartige Rundumsicht auf die Gesundheit Ihrer Projekte"
      },
      description: {
        fr: "Visualisation radar 360° innovante qui affiche simultanément budget, délais, ressources, risques et satisfaction parties prenantes. Un coup d'œil suffit pour identifier les projets critiques. Interface cinématique unique au monde.",
        en: "Innovative 360° radar visualization displaying simultaneously budget, timelines, resources, risks, and stakeholder satisfaction. One glance identifies critical projects. World's first cinematic interface.",
        de: "Innovative 360°-Radar-Visualisierung, die gleichzeitig Budget, Fristen, Ressourcen, Risiken und Stakeholder-Zufriedenheit anzeigt. Ein Blick identifiziert kritische Projekte. Weltweit erste kinematografische Schnittstelle."
      },
      features: {
        fr: ["Vue 360° simultanée", "Identification instantanée", "Interface cinématique"],
        en: ["Simultaneous 360° view", "Instant identification", "Cinematic interface"],
        de: ["Simultane 360°-Ansicht", "Sofortige Identifikation", "Kinematografische Schnittstelle"]
      },
      metrics: {
        fr: "5 secondes pour évaluer tout le portefeuille",
        en: "5 seconds to evaluate entire portfolio",
        de: "5 Sekunden zur Bewertung des gesamten Portfolios"
      }
    },
    {
      id: 'boardroom-mode',
      icon: Presentation,
      gradient: 'from-teal-500 to-cyan-400',
      title: {
        fr: "Boardroom Mode",
        en: "Boardroom Mode",
        de: "Boardroom Mode"
      },
      tagline: {
        fr: "Interface spéciale comité exécutif : ultra claire, ultra premium",
        en: "Special executive committee interface: ultra clear, ultra premium",
        de: "Spezielle Führungsgremium-Schnittstelle: ultraklar, ultrapremium"
      },
      description: {
        fr: "Mode d'affichage ultra-épuré conçu spécifiquement pour les réunions de comité de direction. Plein écran, animations cinématiques, focus sur l'essentiel. Contrôle gestuel ou télécommande. Impression de professionnalisme et maîtrise absolue.",
        en: "Ultra-refined display mode designed specifically for executive committee meetings. Full screen, cinematic animations, focus on essentials. Gesture or remote control. Impression of absolute professionalism and mastery.",
        de: "Ultra-reduzierter Anzeigemodus speziell für Führungsgremium-Sitzungen entwickelt. Vollbild, kinematografische Animationen, Fokus auf das Wesentliche. Gesten- oder Fernbedienung. Eindruck absoluter Professionalität und Beherrschung."
      },
      features: {
        fr: ["Plein écran cinématique", "Contrôle gestuel", "Animations premium"],
        en: ["Cinematic full screen", "Gesture control", "Premium animations"],
        de: ["Kinematografischer Vollbildmodus", "Gestensteuerung", "Premium-Animationen"]
      },
      metrics: {
        fr: "96% satisfaction C-level",
        en: "96% C-level satisfaction",
        de: "96% C-Level-Zufriedenheit"
      }
    },
    {
      id: 'dna-scan',
      icon: Scan,
      gradient: 'from-pink-500 to-rose-400',
      title: {
        fr: "PMO DNA Scan",
        en: "PMO DNA Scan",
        de: "PMO DNA Scan"
      },
      tagline: {
        fr: "Profil ADN de votre PMO + recommandations personnalisées",
        en: "DNA profile of your PMO + personalized recommendations",
        de: "DNA-Profil Ihres PMO + personalisierte Empfehlungen"
      },
      description: {
        fr: "Analyse approfondie de l'ADN de votre organisation projet : culture, maturité, forces, faiblesses, opportunités. L'IA génère un profil ADN unique avec recommandations d'évolution sur-mesure. Rapport premium avec visualisations impactantes.",
        en: "Deep analysis of your project organization's DNA: culture, maturity, strengths, weaknesses, opportunities. AI generates a unique DNA profile with tailored evolution recommendations. Premium report with impactful visualizations.",
        de: "Tiefenanalyse der DNA Ihrer Projektorganisation: Kultur, Reife, Stärken, Schwächen, Chancen. KI generiert ein einzigartiges DNA-Profil mit maßgeschneiderten Evolutionsempfehlungen. Premium-Bericht mit wirkungsvollen Visualisierungen."
      },
      features: {
        fr: ["Profil ADN unique", "Recommandations personnalisées", "Rapport premium"],
        en: ["Unique DNA profile", "Personalized recommendations", "Premium report"],
        de: ["Einzigartiges DNA-Profil", "Personalisierte Empfehlungen", "Premium-Bericht"]
      },
      metrics: {
        fr: "Audit complet en 20 minutes",
        en: "Complete audit in 20 minutes",
        de: "Vollständige Prüfung in 20 Minuten"
      }
    },
    {
      id: 'maturity-scan',
      icon: Target,
      gradient: 'from-violet-500 to-purple-400',
      title: {
        fr: "PMO Maturity Scan",
        en: "PMO Maturity Scan",
        de: "PMO Maturity Scan"
      },
      tagline: {
        fr: "Score de maturité + radar + recommandations + rapport premium",
        en: "Maturity score + radar + recommendations + premium report",
        de: "Reifegrad + Radar + Empfehlungen + Premium-Bericht"
      },
      description: {
        fr: "Questionnaire intelligent qui évalue votre maturité PMO sur 8 dimensions clés. Génération automatique d'un score global, d'un radar visuel et d'un plan d'action priorisé. Rapport PDF téléchargeable style cabinet de conseil premium.",
        en: "Intelligent questionnaire evaluating your PMO maturity across 8 key dimensions. Automatic generation of overall score, visual radar, and prioritized action plan. Downloadable premium consulting-style PDF report.",
        de: "Intelligenter Fragebogen zur Bewertung Ihrer PMO-Reife in 8 Schlüsseldimensionen. Automatische Generierung eines Gesamtscores, visuellen Radars und priorisierten Aktionsplans. Herunterladbarer Premium-Beratungsbericht im PDF-Format."
      },
      features: {
        fr: ["Questionnaire intelligent", "Score + radar", "Plan d'action"],
        en: ["Intelligent questionnaire", "Score + radar", "Action plan"],
        de: ["Intelligenter Fragebogen", "Score + Radar", "Aktionsplan"]
      },
      metrics: {
        fr: "Utilisé par 200+ PMOs",
        en: "Used by 200+ PMOs",
        de: "Von 200+ PMOs verwendet"
      }
    },
    {
      id: 'pmo-as-service',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-400',
      title: {
        fr: "PMO-as-a-Service",
        en: "PMO-as-a-Service",
        de: "PMO-as-a-Service"
      },
      tagline: {
        fr: "Abonnement mensuel : dashboards + reporting + alertes + pilotage",
        en: "Monthly subscription: dashboards + reporting + alerts + steering",
        de: "Monatliches Abonnement: Dashboards + Reporting + Warnungen + Steuerung"
      },
      description: {
        fr: "Service clé en main par abonnement mensuel. Vous accédez à tous les modules Powalyze + dashboards personnalisés + reporting automatisé + alertes intelligentes + support expert. Mise en œuvre en 48h. Pas d'engagement long terme.",
        en: "Turnkey service on monthly subscription. Access all Powalyze modules + custom dashboards + automated reporting + intelligent alerts + expert support. 48h implementation. No long-term commitment.",
        de: "Schlüsselfertiger Service im Monatsabonnement. Zugriff auf alle Powalyze-Module + benutzerdefinierte Dashboards + automatisiertes Reporting + intelligente Warnungen + Expertenunterstützung. 48h-Implementierung. Keine langfristige Bindung."
      },
      features: {
        fr: ["Tous les modules", "Support expert", "Mise en œuvre 48h"],
        en: ["All modules", "Expert support", "48h implementation"],
        de: ["Alle Module", "Expertenunterstützung", "48h-Implementierung"]
      },
      metrics: {
        fr: "À partir de 2'900 CHF/mois",
        en: "Starting at 2,900 CHF/month",
        de: "Ab 2'900 CHF/Monat"
      }
    },
    {
      id: 'risk-warning',
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-400',
      title: {
        fr: "Risk Early Warning System",
        en: "Risk Early Warning System",
        de: "Risk Early Warning System"
      },
      tagline: {
        fr: "Alertes intelligentes basées sur signaux faibles",
        en: "Intelligent alerts based on weak signals",
        de: "Intelligente Warnungen basierend auf schwachen Signalen"
      },
      description: {
        fr: "IA qui surveille 24/7 des centaines de signaux faibles : retards mineurs, changements d'équipe, budget glissant, baisse de vélocité. Elle détecte patterns invisibles à l'œil humain et vous alerte avant que les risques ne deviennent critiques.",
        en: "AI monitoring 24/7 hundreds of weak signals: minor delays, team changes, budget drift, velocity decrease. It detects patterns invisible to the human eye and alerts you before risks become critical.",
        de: "KI überwacht 24/7 Hunderte schwacher Signale: kleinere Verzögerungen, Teamänderungen, Budgetabweichungen, Geschwindigkeitsabnahme. Sie erkennt für das menschliche Auge unsichtbare Muster und warnt Sie, bevor Risiken kritisch werden."
      },
      features: {
        fr: ["Surveillance 24/7", "Détection signaux faibles", "Alertes prédictives"],
        en: ["24/7 monitoring", "Weak signal detection", "Predictive alerts"],
        de: ["24/7-Überwachung", "Schwachsignalerkennung", "Prädiktive Warnungen"]
      },
      metrics: {
        fr: "73% des crises évitées",
        en: "73% of crises avoided",
        de: "73% der Krisen vermieden"
      }
    },
    {
      id: 'pmo-chat',
      icon: MessageSquare,
      gradient: 'from-blue-500 to-indigo-400',
      title: {
        fr: "PMO Chat Executive",
        en: "PMO Executive Chat",
        de: "PMO Executive Chat"
      },
      tagline: {
        fr: "Assistant conversationnel IA spécialisé PMO",
        en: "AI conversational assistant specialized in PMO",
        de: "KI-Konversationsassistent spezialisiert auf PMO"
      },
      description: {
        fr: "Posez vos questions en langage naturel : 'Quels projets risquent de déraper ce trimestre ?', 'Compare le ROI des initiatives cloud'. L'IA analyse instantanément votre portefeuille et répond avec insights actionnables et graphiques.",
        en: "Ask questions in natural language: 'Which projects are at risk this quarter?', 'Compare cloud initiative ROI'. AI instantly analyzes your portfolio and responds with actionable insights and graphics.",
        de: "Stellen Sie Fragen in natürlicher Sprache: 'Welche Projekte sind dieses Quartal gefährdet?', 'Vergleichen Sie den ROI von Cloud-Initiativen'. KI analysiert sofort Ihr Portfolio und antwortet mit umsetzbaren Erkenntnissen und Grafiken."
      },
      features: {
        fr: ["Langage naturel", "Analyses instantanées", "Insights actionnables"],
        en: ["Natural language", "Instant analysis", "Actionable insights"],
        de: ["Natürliche Sprache", "Sofortige Analyse", "Umsetzbare Erkenntnisse"]
      },
      metrics: {
        fr: "Réponse en <3 secondes",
        en: "Response in <3 seconds",
        de: "Antwort in <3 Sekunden"
      }
    },
    {
      id: 'health-passport',
      icon: Heart,
      gradient: 'from-red-500 to-pink-400',
      title: {
        fr: "Project Health Passport",
        en: "Project Health Passport",
        de: "Project Health Passport"
      },
      tagline: {
        fr: "Passeport santé unique pour chaque projet",
        en: "Unique health passport for each project",
        de: "Einzigartiger Gesundheitspass für jedes Projekt"
      },
      description: {
        fr: "Chaque projet dispose d'un 'passeport santé' visuel et synthétique : score global, indicateurs clés, historique de santé, prédictions futures, recommandations. Format ultra-clair pour décideurs pressés. Exportable et partageable.",
        en: "Each project has a visual and synthetic 'health passport': overall score, key indicators, health history, future predictions, recommendations. Ultra-clear format for busy decision-makers. Exportable and shareable.",
        de: "Jedes Projekt verfügt über einen visuellen und synthetischen 'Gesundheitspass': Gesamtscore, Schlüsselindikatoren, Gesundheitshistorie, Zukunftsprognosen, Empfehlungen. Ultraklares Format für vielbeschäftigte Entscheidungsträger. Exportierbar und teilbar."
      },
      features: {
        fr: ["Score global", "Historique visuel", "Prédictions futures"],
        en: ["Overall score", "Visual history", "Future predictions"],
        de: ["Gesamtscore", "Visuelle Historie", "Zukunftsprognosen"]
      },
      metrics: {
        fr: "Score santé en temps réel",
        en: "Real-time health score",
        de: "Echtzeit-Gesundheitsscore"
      }
    },
    {
      id: 'benchmark-engine',
      icon: BarChart3,
      gradient: 'from-cyan-500 to-blue-400',
      title: {
        fr: "Benchmark Engine",
        en: "Benchmark Engine",
        de: "Benchmark Engine"
      },
      tagline: {
        fr: "Comparaison sectorielle + recommandations basées sur best practices",
        en: "Sector comparison + recommendations based on best practices",
        de: "Branchenvergleich + Empfehlungen basierend auf Best Practices"
      },
      description: {
        fr: "Comparez automatiquement vos KPIs PMO avec des benchmarks sectoriels anonymisés (banking, trading, energy, manufacturing). Identifiez vos forces et faiblesses relatives. Recevez des recommandations basées sur les best practices des leaders du marché.",
        en: "Automatically compare your PMO KPIs with anonymized sector benchmarks (banking, trading, energy, manufacturing). Identify your relative strengths and weaknesses. Receive recommendations based on market leader best practices.",
        de: "Vergleichen Sie automatisch Ihre PMO-KPIs mit anonymisierten Branchen-Benchmarks (Banking, Trading, Energie, Fertigung). Identifizieren Sie Ihre relativen Stärken und Schwächen. Erhalten Sie Empfehlungen basierend auf Best Practices der Marktführer."
      },
      features: {
        fr: ["Benchmarks sectoriels", "Analyse comparative", "Best practices"],
        en: ["Sector benchmarks", "Comparative analysis", "Best practices"],
        de: ["Branchen-Benchmarks", "Vergleichsanalyse", "Best Practices"]
      },
      metrics: {
        fr: "Base de 500+ organisations",
        en: "Database of 500+ organizations",
        de: "Datenbank von 500+ Organisationen"
      }
    },
    {
      id: 'cinematic-dashboard',
      icon: Video,
      gradient: 'from-purple-500 to-pink-500',
      title: {
        fr: "Cinematic Dashboard",
        en: "Cinematic Dashboard",
        de: "Cinematic Dashboard"
      },
      tagline: {
        fr: "Dashboards animés, narratifs, premium",
        en: "Animated, narrative, premium dashboards",
        de: "Animierte, narrative, Premium-Dashboards"
      },
      description: {
        fr: "Dashboards qui racontent une histoire. Animations fluides, transitions cinématiques, focus narratif. L'information s'affiche de manière progressive et captivante, comme un film. Idéal pour présentations exécutives mémorables et impactantes.",
        en: "Dashboards that tell a story. Fluid animations, cinematic transitions, narrative focus. Information displays progressively and captivatingly, like a film. Ideal for memorable and impactful executive presentations.",
        de: "Dashboards, die eine Geschichte erzählen. Flüssige Animationen, kinematografische Übergänge, narrativer Fokus. Informationen werden progressiv und fesselnd angezeigt, wie ein Film. Ideal für einprägsame und wirkungsvolle Executive-Präsentationen."
      },
      features: {
        fr: ["Animations cinématiques", "Storytelling visuel", "Transitions fluides"],
        en: ["Cinematic animations", "Visual storytelling", "Fluid transitions"],
        de: ["Kinematografische Animationen", "Visuelles Storytelling", "Flüssige Übergänge"]
      },
      metrics: {
        fr: "98% mémorisation vs 23% slides classiques",
        en: "98% retention vs 23% classic slides",
        de: "98% Erinnerung vs. 23% klassische Folien"
      }
    }
  ];

  const content = {
    fr: {
      badge: "15 Modules Innovants",
      title: "La plateforme PMO",
      titleHighlight: "la plus avancée au monde",
      subtitle: "Powalyze réinvente la gestion de projets avec 15 modules exclusifs propulsés par IA. Des fonctionnalités que vous ne trouverez nulle part ailleurs.",
      cta: "Demander une démo complète",
      features: "Fonctionnalités clés",
      impact: "Impact mesuré"
    },
    en: {
      badge: "15 Innovative Modules",
      title: "The world's most",
      titleHighlight: "advanced PMO platform",
      subtitle: "Powalyze reinvents project management with 15 exclusive AI-powered modules. Features you won't find anywhere else.",
      cta: "Request full demo",
      features: "Key features",
      impact: "Measured impact"
    },
    de: {
      badge: "15 innovative Module",
      title: "Die weltweit",
      titleHighlight: "fortschrittlichste PMO-Plattform",
      subtitle: "Powalyze erfindet das Projektmanagement mit 15 exklusiven KI-gestützten Modulen neu. Funktionen, die Sie nirgendwo anders finden.",
      cta: "Vollständige Demo anfordern",
      features: "Hauptfunktionen",
      impact: "Gemessene Auswirkung"
    }
  };

  const text = content[language] || content.fr;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title={`${text.title} ${text.titleHighlight} | Powalyze`}
        description={text.subtitle}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-[#BFA76A]/30 px-6 py-3 rounded-full mb-8">
              <Sparkles className="text-[#BFA76A]" size={16} />
              <span className="text-sm uppercase tracking-widest text-[#BFA76A] font-bold">
                {text.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">{text.title}</span>
              <br />
              <span className="bg-gradient-to-r from-[#BFA76A] via-amber-400 to-amber-300 bg-clip-text text-transparent">
                {text.titleHighlight}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              {text.subtitle}
            </p>

            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#BFA76A] to-amber-600 text-black hover:from-amber-600 hover:to-[#BFA76A] font-bold px-8"
              >
                {text.cta}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isSelected = selectedModule === module.id;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedModule(isSelected ? null : module.id)}
                  className="group relative cursor-pointer"
                >
                  <div className={`relative backdrop-blur-xl bg-white/5 border rounded-2xl p-6 transition-all duration-300 ${
                    isSelected ? 'border-[#BFA76A] shadow-2xl shadow-[#BFA76A]/20 scale-105' : 'border-white/10 hover:border-white/20'
                  }`}>
                    {/* Icon with Gradient */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 bg-gradient-to-br ${module.gradient} bg-opacity-10 border border-white/10`}>
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#BFA76A] transition-colors">
                      {module.title[language] || module.title.fr}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {module.tagline[language] || module.tagline.fr}
                    </p>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isSelected ? 180 : 0 }}
                      className="absolute top-6 right-6 text-[#BFA76A]"
                    >
                      <ArrowRight size={20} />
                    </motion.div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-white/10"
                        >
                          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            {module.description[language] || module.description.fr}
                          </p>

                          <div className="mb-4">
                            <h4 className="text-xs uppercase tracking-wider text-[#BFA76A] font-bold mb-2">
                              {text.features}
                            </h4>
                            <ul className="space-y-2">
                              {(module.features[language] || module.features.fr).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                  <Check size={14} className="text-[#BFA76A]" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={`p-3 rounded-lg bg-gradient-to-r ${module.gradient} bg-opacity-10 border border-white/10`}>
                            <p className="text-xs uppercase tracking-wider text-[#BFA76A] font-bold mb-1">
                              {text.impact}
                            </p>
                            <p className="text-sm font-bold text-white">
                              {module.metrics[language] || module.metrics.fr}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
            className="mt-20 text-center"
          >
            <div className="backdrop-blur-xl bg-gradient-to-r from-[#BFA76A]/10 to-purple-500/10 border border-[#BFA76A]/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'fr' ? "Prêt à révolutionner votre PMO ?" : language === 'en' ? "Ready to revolutionize your PMO?" : "Bereit, Ihr PMO zu revolutionieren?"}
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                {language === 'fr' 
                  ? "Discutons de vos besoins et découvrez comment ces 15 modules peuvent transformer votre organisation projet."
                  : language === 'en'
                  ? "Let's discuss your needs and discover how these 15 modules can transform your project organization."
                  : "Lassen Sie uns über Ihre Bedürfnisse sprechen und entdecken Sie, wie diese 15 Module Ihre Projektorganisation transformieren können."}
              </p>
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#BFA76A] to-amber-600 text-black hover:from-amber-600 hover:to-[#BFA76A] font-bold px-10"
                >
                  {language === 'fr' ? "Réserver une session stratégique" : language === 'en' ? "Book a strategic session" : "Strategische Sitzung buchen"}
                  <ArrowRight className="ml-2" size={20} />
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

export default InnovativeModulesPage;
