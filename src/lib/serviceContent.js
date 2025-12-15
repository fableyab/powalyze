import {
  Target, ShieldCheck, Database, Bot, Layout, FileBarChart,
  CheckCircle, Users, Clock, TrendingUp, Globe, Briefcase,
  Lightbulb, Activity, Lock, Share2, Layers, Cpu, Search,
  Landmark, Cloud, Factory, ShoppingBag, DollarSign, Truck,
  FileText, Mail, Filter, PieChart, Tablet, Map,
} from 'lucide-react';

export const serviceContent = {
  fr: {
    pilotageIT: {
      hero: { title: "Pilotage IT & Gouvernance", subtitle: "Alignez votre stratégie IT avec vos objectifs business", cta: "Demander un audit" },
      intro: { title: "La DSI comme partenaire stratégique", content: "Optimisez votre infrastructure IT avec une gestion stratégique et une gouvernance efficace pour soutenir vos objectifs métier." },
      challenges: [
        { title: "Shadow IT", desc: "Prolifération d'outils non maîtrisés par la DSI." },
        { title: "Dette Technique", desc: "Systèmes obsolètes freinant l'innovation." },
        { title: "Alignement Business", desc: "Décalage entre les livrables IT et les attentes métiers." },
        { title: "Maîtrise des Coûts", desc: "Difficulté à suivre le TCO." }
      ],
      methodology: [
        { title: "Audit & Diagnostic", desc: "Analyse de la maturité actuelle (CMMI) et des processus existants." },
        { title: "Définition de la Cible", desc: "Construction de la feuille de route stratégique IT à 3 ans." },
        { title: "Gouvernance", desc: "Mise en place des comités (CODIR, COPIL) et des instances de décision." },
        { title: "KPIs & Pilotage", desc: "Définition des indicateurs de performance et tableaux de bord." }
      ],
      useCases: [
        { title: "Fusion Bancaire", desc: "Harmonisation des SI. Résultat : -25% de coûts.", icon: Landmark },
        { title: "Transformation Agile", desc: "Passage à SAFe. Time-to-market divisé par 2.", icon: Activity },
        { title: "Gouvernance Cloud", desc: "Mise en place FinOps. Économies cloud de 30%.", icon: Cloud }
      ]
    },
    pmoStrategique: {
      hero: { title: "PMO Stratégique", subtitle: "De la gestion de projet au pilotage de la valeur", cta: "Structurer votre PMO" },
      intro: { title: "L'excellence dans l'exécution", p1: "Alignez vos projets avec la stratégie d'entreprise grâce à une gestion de portefeuille optimisée et une gouvernance de projet robuste.", p2: "Nous construisons avec vous un PMO qui aligne portefeuille, ressources et bénéfices." },
      challenges: [
        { title: "Manque de Visibilité", desc: "Impossible d'avoir une vue consolidée du portefeuille." },
        { title: "Surcharge Ressources", desc: "Goulots d'étranglement sur les compétences clés." },
        { title: "Projets Zombies", desc: "Projets qui consomment du budget sans apporter de valeur." },
        { title: "Retards Chroniques", desc: "Dérives systématiques des plannings et budgets." }
      ],
      benefits: [
        { title: "Visibilité 360°", desc: "Portefeuille consolidé, statuts temps réel.", icon: Layout },
        { title: "Décisions Factuelles", desc: "Priorisation basée sur la valeur, le risque et la capacité.", icon: Target },
        { title: "Productivité", desc: "Jusqu'à 15% de capacité libérée sur les équipes clés.", icon: Activity }
      ],
      features: [
        { title: "Scoring & Arbitrage", desc: "Modèle de scoring multi-critères.", icon: Filter },
        { title: "Capacity Planning", desc: "Vision charge/capacité par rôle.", icon: Users },
        { title: "Roadmap & Jalons", desc: "Synchronisation des jalons clés.", icon: Clock }
      ],
      useCases: [
        { title: "PMO Industriel", desc: "Pilotage de 200+ projets R&D. Gain 15%.", icon: Factory },
        { title: "Secteur Public", desc: "PMO transverse pour administration cantonale.", icon: Landmark },
        { title: "Luxe & Retail", desc: "Optimisation portefeuille IT/Digital.", icon: ShoppingBag }
      ],
      methodology: { title: "Notre démarche en 4 étapes", steps: [
        { title: "Cadrage", desc: "Définition du mandat et des parties prenantes." },
        { title: "Standardisation", desc: "Harmonisation des méthodes (Waterfall, Agile, Hybride)." },
        { title: "Outillage", desc: "Implémentation PPM avec dashboards exécutifs." },
        { title: "Adoption", desc: "Conduite du changement et coaching des PM." }
      ]},
      metrics: [
        { after: "-25%", label: "Retards Projets" },
        { after: "+15%", label: "Capacité Libérée" },
        { after: "-30%", label: "Dérives Budget" }
      ]
    },
    dataPowerBI: {
      hero: { title: "Data & Power BI", subtitle: "Transformez vos données brutes en or décisionnel", cta: "Voir nos Dashboards" },
      intro: { title: "La donnée au service de la décision", content: "Transformez vos données en insights actionnables avec nos solutions de business intelligence et de visualisation avancée." },
      challenges: [
        { title: "Silos de Données", desc: "Données fragmentées entre ERP, CRM et Excel." },
        { title: "Qualité des Données", desc: "Données incomplètes ou incohérentes." },
        { title: "Adoption Utilisateur", desc: "Rapports existants trop complexes ou peu utilisés." },
        { title: "Sécurité", desc: "Gestion des accès et confidentialité (RLS)." }
      ],
      methodology: [
        { title: "Data Engineering", desc: "Collecte, nettoyage et modélisation (ETL/ELT)." },
        { title: "UX/UI Design", desc: "Conception de tableaux de bord ergonomiques." },
        { title: "Développement", desc: "Implémentation Power BI et DAX avancé." },
        { title: "Déploiement", desc: "Publication, sécurisation et formation." }
      ],
      useCases: [
        { title: "Sales Analytics", desc: "Dashboard commercial temps réel pour 500+ vendeurs.", icon: TrendingUp },
        { title: "Finance Reporting", desc: "Automatisation du P&L. Gain 5 jours/mois.", icon: DollarSign },
        { title: "Supply Chain", desc: "Optimisation des stocks et suivi logistique.", icon: Truck }
      ]
    },
    automationIA: {
      hero: { title: "Automatisation & IA", subtitle: "Libérez le potentiel humain en automatisant le reste", cta: "Explorer l'IA" },
      intro: { title: "L'efficacité opérationnelle réinventée", p1: "Automatisez vos processus métier et exploitez l'IA pour améliorer l'efficacité opérationnelle et la prise de décision.", p2: "Nous identifions les processus répétitifs, prototypons vite et mesurons le ROI." },
      benefits: [
        { title: "Productivité +40%", desc: "Automatisation des tâches à faible valeur.", icon: Activity },
        { title: "Réduction des Erreurs", desc: "Moins de risques grâce aux bots.", icon: ShieldCheck },
        { title: "Scalabilité", desc: "Absorber les pics sans sur-staffing.", icon: Layers }
      ],
      features: [
        { title: "Process Mining", desc: "Cartographie et détection des quick wins.", icon: Search },
        { title: "RPA & Bots", desc: "Automatisation RPA et API-first.", icon: Bot },
        { title: "IA Générative", desc: "Assistants métier intelligents.", icon: Lightbulb }
      ],
      challenges: [
        { title: "Tâches Répétitives", desc: "Perte de temps sur saisies manuelles." },
        { title: "Erreurs Humaines", desc: "Risques de conformité." },
        { title: "Scalabilité", desc: "Incapacité à gérer les pics." },
        { title: "Coûts Opérationnels", desc: "Coûts de traitement trop élevés." }
      ],
      methodology: [
        { title: "Process Mining", desc: "Analyse des processus." },
        { title: "Prototypage", desc: "POC rapide." },
        { title: "Développement", desc: "Création de bots RPA." },
        { title: "MCO", desc: "Maintenance et supervision." }
      ],
      useCases: [
        { title: "Traitement Factures", desc: "Automatisation à 95% du P2P.", icon: FileText },
        { title: "Onboarding RH", desc: "Création auto des comptes et accès.", icon: Users },
        { title: "Service Client", desc: "Tri et réponse auto des emails.", icon: Mail }
      ]
    },
    portfolio: {
      hero: { title: "Portefeuilles & Priorisation", subtitle: "Faites les bons choix, au bon moment", cta: "Optimiser mon portefeuille" },
      intro: { title: "L'arbitrage éclairé", content: "Gérez efficacement votre portefeuille de projets avec une priorisation intelligente basée sur la valeur métier." },
      challenges: [
        { title: "Trop de Projets", desc: "Dispersion des efforts et budgets." },
        { title: "Priorisation Floue", desc: "C'est celui qui crie le plus fort qui gagne." },
        { title: "ROI Inconnu", desc: "Difficulté à mesurer la valeur réelle." },
        { title: "Conflits Ressources", desc: "Arbitrages permanents." }
      ],
      methodology: [
        { title: "Inventaire", desc: "Recensement exhaustif des initiatives." },
        { title: "Scoring", desc: "Modèle de scoring pondéré." },
        { title: "Arbitrage", desc: "Revues de portefeuille trimestrielles." },
        { title: "Planification", desc: "Construction de la roadmap." }
      ],
      useCases: [
        { title: "Priorisation IT", desc: "Réduction du backlog de 40%.", icon: Filter },
        { title: "Allocation Budgétaire", desc: "Réallocation vers innovation.", icon: PieChart },
        { title: "Alignement Stratégique", desc: "100% des projets top-priorité staffés.", icon: Target }
      ]
    },
    executiveReporting: {
      hero: { title: "Reporting Exécutif", subtitle: "La vision claire dont le COMEX a besoin", cta: "Voir les exemples" },
      intro: { title: "Décider avec confiance", content: "Fournissez aux décideurs des rapports clairs et actionnables pour une gouvernance d'entreprise optimale." },
      challenges: [
        { title: "Information Noyée", desc: "Trop de détails, pas assez de synthèse." },
        { title: "Données Obsolètes", desc: "Rapports qui arrivent 2 semaines après." },
        { title: "Manque de Confiance", desc: "Chiffres contradictoires." },
        { title: "Format Inadapté", desc: "Excel illisibles sur mobile." }
      ],
      methodology: [
        { title: "Définition KPIs", desc: "Ateliers avec top management." },
        { title: "Data Viz", desc: "Design épuré et impactant (IBCS)." },
        { title: "Automatisation", desc: "Flux automatisés temps réel." },
        { title: "Mobile First", desc: "Accessibilité sur tous terminaux." }
      ],
      useCases: [
        { title: "Dashboard CEO", desc: "Vue 360° sur iPad.", icon: Tablet },
        { title: "Suivi Stratégique", desc: "Monitoring du plan stratégique 5 ans.", icon: Map },
        { title: "Reporting Investisseurs", desc: "Rapports mensuels automatisés.", icon: FileBarChart }
      ]
    }
  },
  en: {
    pilotageIT: {
      hero: { title: "IT Steering & Governance", subtitle: "Align IT Strategy with Business Goals", cta: "Request Audit" },
      intro: { title: "IT as a Strategic Partner", content: "Optimize your IT infrastructure with strategic management and effective governance to support your business objectives." },
      challenges: [
        { title: "Shadow IT", desc: "Proliferation of uncontrolled tools." },
        { title: "Technical Debt", desc: "Obsolete systems hindering innovation." },
        { title: "Business Alignment", desc: "Gap between IT deliverables and business expectations." },
        { title: "Cost Control", desc: "Difficulty tracking TCO." }
      ],
      methodology: [
        { title: "Audit & Diagnosis", desc: "Analysis of current maturity (CMMI) and existing processes." },
        { title: "Target Definition", desc: "Build 3-year strategic IT roadmap." },
        { title: "Governance", desc: "Establish committees (CODIR, COPIL) and decision bodies." },
        { title: "KPIs & Steering", desc: "Define performance indicators and dashboards." }
      ],
      useCases: [
        { title: "Bank Merger", desc: "Systems harmonization. Result: -25% operational costs.", icon: Landmark },
        { title: "Agile Transformation", desc: "Transition to SAFe. Time-to-market halved.", icon: Activity },
        { title: "Cloud Governance", desc: "FinOps implementation. 30% cloud savings.", icon: Cloud }
      ]
    },
    pmoStrategique: {
      hero: { title: "Strategic PMO", subtitle: "From Project Management to Value Steering", cta: "Structure Your PMO" },
      intro: { title: "Excellence in Execution", p1: "Align your projects with business strategy through optimized portfolio management and robust project governance.", p2: "We build a PMO that aligns portfolio, resources and benefits." },
      challenges: [
        { title: "Lack of Visibility", desc: "Impossible to have consolidated portfolio view." },
        { title: "Resource Overload", desc: "Bottlenecks on key skills." },
        { title: "Zombie Projects", desc: "Projects consuming budget without value." },
        { title: "Chronic Delays", desc: "Systematic schedule and budget drifts." }
      ],
      benefits: [
        { title: "360° Visibility", desc: "Consolidated portfolio, real-time status." },
        { title: "Factual Decisions", desc: "Prioritization based on value, risk and capacity." },
        { title: "Productivity", desc: "Up to 15% capacity freed for key teams." }
      ],
      features: [
        { title: "Scoring & Arbitration", desc: "Multi-criteria scoring model." },
        { title: "Capacity Planning", desc: "Load/capacity view by role." },
        { title: "Roadmap & Milestones", desc: "Synchronization of critical milestones." }
      ],
      useCases: [
        { title: "Industrial PMO", desc: "Steering 200+ R&D projects. 15% productivity gain.", icon: Factory },
        { title: "Public Sector", desc: "Cross-functional PMO for cantonal administration.", icon: Landmark },
        { title: "Luxury & Retail", desc: "IT/Digital portfolio optimization.", icon: ShoppingBag }
      ],
      methodology: { title: "Our 4-Step Approach", steps: [
        { title: "Scoping", desc: "Define mandate and stakeholders." },
        { title: "Standardization", desc: "Harmonize methods (Waterfall, Agile, Hybrid)." },
        { title: "Tooling", desc: "Implement PPM with executive dashboards." },
        { title: "Adoption", desc: "Change management and PM coaching." }
      ]},
      metrics: [
        { after: "-25%", label: "Project Delays" },
        { after: "+15%", label: "Capacity Freed" },
        { after: "-30%", label: "Budget Drifts" }
      ]
    },
    dataPowerBI: {
      hero: { title: "Data & Power BI", subtitle: "Transform Raw Data Into Decision Gold", cta: "View Our Dashboards" },
      intro: { title: "Data at the Service of Decision", content: "Transform your data into actionable insights with our business intelligence and advanced visualization solutions." },
      challenges: [
        { title: "Data Silos", desc: "Data fragmented across ERP, CRM and Excel." },
        { title: "Data Quality", desc: "Incomplete or inconsistent data." },
        { title: "User Adoption", desc: "Existing reports too complex or underused." },
        { title: "Security", desc: "Access management and confidentiality (RLS)." }
      ],
      methodology: [
        { title: "Data Engineering", desc: "Collection, cleansing and modeling (ETL/ELT)." },
        { title: "UX/UI Design", desc: "Design of ergonomic dashboards." },
        { title: "Development", desc: "Power BI implementation and advanced DAX." },
        { title: "Deployment", desc: "Publication, security and training." }
      ],
      useCases: [
        { title: "Sales Analytics", desc: "Real-time sales dashboard for 500+ sellers.", icon: TrendingUp },
        { title: "Finance Reporting", desc: "P&L automation. Save 5 days/month.", icon: DollarSign },
        { title: "Supply Chain", desc: "Inventory optimization and global logistics tracking.", icon: Truck }
      ]
    },
    automationIA: {
      hero: { title: "Automation & AI", subtitle: "Free Human Potential by Automating the Rest", cta: "Explore AI" },
      intro: { title: "Operational Efficiency Reinvented", p1: "Automate your business processes and leverage AI to improve operational efficiency and decision-making.", p2: "We identify repetitive processes, prototype quickly and measure ROI." },
      benefits: [
        { title: "Productivity +40%", desc: "Automate low-value tasks to free teams." },
        { title: "Error Reduction", desc: "Less compliance and quality risks with bots." },
        { title: "Scalability", desc: "Handle peaks without over-staffing." }
      ],
      features: [
        { title: "Process Mining", desc: "Process mapping and quick-win detection." },
        { title: "RPA & Bots", desc: "RPA and API-first automation." },
        { title: "Generative AI", desc: "Intelligent business assistants." }
      ],
      challenges: [
        { title: "Repetitive Tasks", desc: "Wasted time on manual data entry." },
        { title: "Human Errors", desc: "Compliance and quality risks." },
        { title: "Scalability", desc: "Inability to handle traffic peaks." },
        { title: "Operational Costs", desc: "High transaction costs." }
      ],
      methodology: [
        { title: "Process Mining", desc: "Process analysis." },
        { title: "Prototyping", desc: "Fast POC." },
        { title: "Development", desc: "RPA bot creation." },
        { title: "Maintenance", desc: "Support and supervision." }
      ],
      useCases: [
        { title: "Invoice Processing", desc: "95% automation of P2P." },
        { title: "HR Onboarding", desc: "Auto account and access creation.", icon: Users },
        { title: "Customer Service", desc: "Auto email sorting and response.", icon: Mail }
      ]
    },
    portfolio: {
      hero: { title: "Portfolio & Prioritization", subtitle: "Make the Right Choices, at the Right Time", cta: "Optimize My Portfolio" },
      intro: { title: "Informed Arbitration", content: "Effectively manage your project portfolio with intelligent prioritization based on business value." },
      challenges: [
        { title: "Too Many Projects", desc: "Dispersion of efforts and budgets." },
        { title: "Fuzzy Prioritization", desc: "Loudest voice wins." },
        { title: "Unknown ROI", desc: "Difficulty measuring real value." },
        { title: "Resource Conflicts", desc: "Constant arbitration." }
      ],
      methodology: [
        { title: "Inventory", desc: "Exhaustive list of initiatives." },
        { title: "Scoring", desc: "Weighted scoring model." },
        { title: "Arbitration", desc: "Quarterly portfolio reviews." },
        { title: "Planning", desc: "Build capacity roadmap." }
      ],
      useCases: [
        { title: "IT Prioritization", desc: "Reduce backlog by 40%.", icon: Filter },
        { title: "Budget Allocation", desc: "Reallocate to innovation.", icon: PieChart },
        { title: "Strategic Alignment", desc: "100% top-priority projects staffed.", icon: Target }
      ]
    },
    executiveReporting: {
      hero: { title: "Executive Reporting", subtitle: "The Clear Vision Your COMEX Needs", cta: "View Examples" },
      intro: { title: "Decide with Confidence", content: "Provide decision-makers with clear, actionable reports for optimal enterprise governance." },
      challenges: [
        { title: "Drowning in Data", desc: "Too much detail, not enough summary." },
        { title: "Stale Data", desc: "Reports arriving 2 weeks late." },
        { title: "Lack of Trust", desc: "Contradictory figures." },
        { title: "Wrong Format", desc: "Excel unreadable on mobile." }
      ],
      methodology: [
        { title: "Define KPIs", desc: "Workshops with top management." },
        { title: "Data Viz", desc: "Clean and impactful design (IBCS)." },
        { title: "Automation", desc: "Real-time automated data flows." },
        { title: "Mobile First", desc: "Accessibility on all devices." }
      ],
      useCases: [
        { title: "CEO Dashboard", desc: "360° company view on iPad.", icon: Tablet },
        { title: "Strategic Tracking", desc: "5-year plan execution monitoring.", icon: Map },
        { title: "Investor Reporting", desc: "Auto-generated monthly reports.", icon: FileBarChart }
      ]
    }
  },
  de: {
    pilotageIT: {
      hero: { title: "IT-Steuerung & Governance", subtitle: "IT-Strategie mit Geschaeftszielen abstimmen", cta: "Audit anfordern" },
      intro: { title: "IT als strategischer Partner", content: "Optimieren Sie Ihre IT-Infrastruktur durch strategische Verwaltung und effektive Governance zur Unterstuetzung Ihrer Geschaeftsziele." },
      challenges: [
        { title: "Shadow IT", desc: "Unkontrollierte Tool-Verbreitung." },
        { title: "Technische Schulden", desc: "Veraltete Systeme hemmen Innovation." },
        { title: "Business-Abstimmung", desc: "Lucke zwischen IT-Leistungen und Erwartungen." },
        { title: "Kostenkontrolle", desc: "Schwierigkeit beim TCO-Tracking." }
      ],
      methodology: [
        { title: "Audit & Diagnose", desc: "Analyse der aktuellen Reifegrade (CMMI)." },
        { title: "Zieldefinition", desc: "Aufbau einer 3-jaehrigen IT-Roadmap." },
        { title: "Governance", desc: "Einrichtung von Komitees." },
        { title: "KPIs & Steuerung", desc: "Definition von Leistungsindikatoren." }
      ],
      useCases: [
        { title: "Bankenfusion", desc: "Systemharmonisierung. Ergebnis: -25% Kosten.", icon: Landmark },
        { title: "Agile-Transformation", desc: "Uebergang zu SAFe. Time-to-market halbiert.", icon: Activity },
        { title: "Cloud-Governance", desc: "FinOps-Implementierung. 30% Cloud-Einsparungen.", icon: Cloud }
      ]
    },
    pmoStrategique: {
      hero: { title: "Strategisches PMO", subtitle: "Von Projektmanagement zur Wertsteuerung", cta: "PMO strukturieren" },
      intro: { title: "Exzellenz in der Ausfuehrung", p1: "Richten Sie Ihre Projekte an der Unternehmensstrategien aus und optimieren Sie Ihr Portfoliomanagement sowie die Projektgovernance.", p2: "Wir bauen mit Ihnen ein PMO auf, das Portfolio, Ressourcen und Nutzen abstimmt." },
      challenges: [
        { title: "Fehlende Transparenz", desc: "Keine konsolidierte Portfolioansicht." },
        { title: "Ressourcenengpaesse", desc: "Engpaesse bei Schluesselkompetenzen." },
        { title: "Zombie-Projekte", desc: "Projekte verbrauchen Budget ohne Wert." },
        { title: "Chronische Verzoegerungen", desc: "Systematische Planungs- und Budgetabweichungen." }
      ],
      benefits: [
        { title: "360-Grad-Sichtbarkeit", desc: "Konsolidiertes Portfolio, Echtzeit-Status." },
        { title: "Faktengestuetzte Entscheidungen", desc: "Priorisierung basierend auf Wert und Risiko." },
        { title: "Produktivitaet", desc: "Bis zu 15% Kapazitaet fuer Kernteams freigegeben." }
      ],
      features: [
        { title: "Scoring & Schiedsverfahren", desc: "Multi-Kriterien-Scoring-Modell." },
        { title: "Kapazitaetsplanung", desc: "Last-/Kapazitaetsansicht pro Rolle." },
        { title: "Roadmap & Meilensteine", desc: "Synchronisierung kritischer Meilensteine." }
      ],
      useCases: [
        { title: "Industrie-PMO", desc: "Steuerung von 200+ F&E-Projekten. 15% Produktivitaetsgewinn.", icon: Factory },
        { title: "Oeffentlicher Sektor", desc: "Bereichsuebergreifendes PMO fuer Kantonal-Verwaltung.", icon: Landmark },
        { title: "Luxus & Retail", desc: "Optimierung des IT-/Digital-Portfolios.", icon: ShoppingBag }
      ],
      methodology: { title: "Unser 4-Schritte-Ansatz", steps: [
        { title: "Abgrenzung", desc: "Definition des Mandats und der Stakeholder." },
        { title: "Standardisierung", desc: "Harmonisierung der Methoden." },
        { title: "Ausruestung", desc: "PPM-Implementierung mit Exec-Dashboards." },
        { title: "Adoption", desc: "Aenderungsmanagement und PM-Coaching." }
      ]},
      metrics: [
        { after: "-25%", label: "Projektverzögerungen" },
        { after: "+15%", label: "Kapazität freigegeben" },
        { after: "-30%", label: "Budgetabweichungen" }
      ]
    },
    dataPowerBI: {
      hero: { title: "Data & Power BI", subtitle: "Wandeln Sie Rohdaten in Entscheidungsgold um", cta: "Unsere Dashboards anzeigen" },
      intro: { title: "Daten im Dienste der Entscheidung", content: "Wandeln Sie Ihre Daten in handlungsf aehige Erkenntnisse um mit unseren Business-Intelligence- und erweiterten Visualisierungsloesungen." },
      challenges: [
        { title: "Datensaeulen", desc: "Daten fragmentiert zwischen ERP, CRM und Excel." },
        { title: "Datenqualitaet", desc: "Unvollstaendige oder inkonsistente Daten." },
        { title: "Benutzerakzeptanz", desc: "Vorhandene Berichte zu komplex oder untergenutzt." },
        { title: "Sicherheit", desc: "Zugriffsverwaltung und Vertraulichkeit (RLS)." }
      ],
      methodology: [
        { title: "Datentechnik", desc: "Erfassung, Bereinigung und Modellierung (ETL/ELT)." },
        { title: "UX/UI-Design", desc: "Design ergonomischer Dashboards." },
        { title: "Entwicklung", desc: "Power BI-Implementierung und erweiterte DAX." },
        { title: "Bereitstellung", desc: "Veroeffentlichung, Sicherheit und Schulung." }
      ],
      useCases: [
        { title: "Verkaufsanalyse", desc: "Echtzeit-Verkaufsdashboard fuer 500+ Verkaeufer.", icon: TrendingUp },
        { title: "Finanzberichterstattung", desc: "P&L-Automatisierung. 5 Tage pro Monat sparen.", icon: DollarSign },
        { title: "Supply Chain", desc: "Bestandsoptimierung und globales Logistik-Tracking.", icon: Truck }
      ]
    },
    automationIA: {
      hero: { title: "Automatisierung & KI", subtitle: "Befreien Sie menschliches Potenzial durch Automatisierung", cta: "KI erkunden" },
      intro: { title: "Operative Effizienz neu erfunden", p1: "Automatisieren Sie Ihre Geschaeftsprozesse und nutzen Sie KI zur Verbesserung der operativen Effizienz und Entscheidungsfindung.", p2: "Wir identifizieren wiederholte Prozesse, prototypisieren schnell und messen den ROI." },
      benefits: [
        { title: "Produktivitaet +40%", desc: "Automatisierung von Aufgaben mit geringem Mehrwert." },
        { title: "Fehlerreduktion", desc: "Weniger Compliance- und Qualitaetsrisiken durch Bots." },
        { title: "Skalierbarkeit", desc: "Peakgelegenheiten ohne Ueberbesetzung beweltigen." }
      ],
      features: [
        { title: "Process Mining", desc: "Prozessabbildung und Quick-Win-Erkennung." },
        { title: "RPA & Bots", desc: "RPA und API-first-Automatisierung." },
        { title: "Generative KI", desc: "Intelligente Geschaeftsassistenten." }
      ],
      challenges: [
        { title: "Wiederholte Aufgaben", desc: "Zeitverschwendung bei manueller Dateneingabe." },
        { title: "Menschliche Fehler", desc: "Compliance- und Qualitaetsrisiken." },
        { title: "Skalierbarkeit", desc: "Unmoeglichkeit, Verkehrsspitzen zu bewaeltigen." },
        { title: "Betriebskosten", desc: "Hohe Transaktionskosten." }
      ],
      methodology: [
        { title: "Process Mining", desc: "Prozessanalyse." },
        { title: "Prototyping", desc: "Schnelles POC." },
        { title: "Entwicklung", desc: "RPA-Bot-Erstellung." },
        { title: "Wartung", desc: "Support und Ueberwachung." }
      ],
      useCases: [
        { title: "Rechnungsverarbeitung", desc: "95% Automatisierung von P2P.", icon: FileText },
        { title: "HR-Onboarding", desc: "Automatische Konto- und Zugriffserstellung.", icon: Users },
        { title: "Kundenservice", desc: "Automatisches Email-Sorting und Antworten.", icon: Mail }
      ]
    },
    portfolio: {
      hero: { title: "Portfolio & Priorisierung", subtitle: "Treffen Sie die richtigen Entscheidungen zum richtigen Zeitpunkt", cta: "Mein Portfolio optimieren" },
      intro: { title: "Informierte Schiedsgerichtsbarkeit", content: "Verwalten Sie Ihr Projektportfolio effektiv mit intelligenter Priorisierung auf der Grundlage des Geschaeftswerts." },
      challenges: [
        { title: "Zu viele Projekte", desc: "Zerstreuung von Aufwaenden und Budgets." },
        { title: "Unscharfe Priorisierung", desc: "Die lauteste Stimme gewinnt." },
        { title: "Unbekannter ROI", desc: "Schwierigkeit beim Messen des realen Werts." },
        { title: "Ressourcenkonflikte", desc: "Staendige Schiedsgerichtsbarkeit." }
      ],
      methodology: [
        { title: "Inventar", desc: "Erschoepfende Liste von Initiativen." },
        { title: "Scoring", desc: "Gewichtetes Scoring-Modell." },
        { title: "Schiedsgerichtsbarkeit", desc: "Vierteljährliche Portfolio-Bewertungen." },
        { title: "Planung", desc: "Kapazitaets-Roadmap erstellen." }
      ],
      useCases: [
        { title: "IT-Priorisierung", desc: "Backlog um 40% reduzieren.", icon: Filter },
        { title: "Budgetzuteilung", desc: "Umverteilung fuer Innovation.", icon: PieChart },
        { title: "Strategische Abstimmung", desc: "100% Top-Prioritaets-Projekte besetzt.", icon: Target }
      ]
    },
    executiveReporting: {
      hero: { title: "Fuehrungs-Reporting", subtitle: "Die klare Sicht, die Ihr COMEX braucht", cta: "Beispiele anzeigen" },
      intro: { title: "Mit Vertrauen entscheiden", content: "Bieten Sie Entscheidungstraegern klare, handlungsfaehige Berichte fuer optimale Unternehmensgovernance." },
      challenges: [
        { title: "Datenueberlastung", desc: "Zu viele Details, nicht genug Zusammenfassung." },
        { title: "Veraltete Daten", desc: "Berichte kommen 2 Wochen zu spaet an." },
        { title: "Mangelndes Vertrauen", desc: "Widerspruechliche Zahlen." },
        { title: "Falsches Format", desc: "Excel auf Mobile unlesbar." }
      ],
      methodology: [
        { title: "KPIs definieren", desc: "Workshops mit Top-Management." },
        { title: "Daten-Visualisierung", desc: "Sauberes und wirkungsvolles Design (IBCS)." },
        { title: "Automatisierung", desc: "Echtzeit-automatisierte Datenfluesse." },
        { title: "Mobile First", desc: "Zugaenglichkeit auf allen Geraeten." }
      ],
      useCases: [
        { title: "CEO-Dashboard", desc: "360-Grad-Unternehmensansicht auf iPad.", icon: Tablet },
        { title: "Strategische Verfolgung", desc: "Verfolgung der 5-Jahres-Plan-Ausfuehrung.", icon: Map },
        { title: "Investorenberichterstattung", desc: "Automatisch generierte Monatsberichte.", icon: FileBarChart }
      ]
    }
  }
};
