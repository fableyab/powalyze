
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
      hero: {
        title: "Pilotage IT & Gouvernance",
        subtitle: "Alignez votre stratégie IT avec vos objectifs business",
        cta: "Demander un audit"
      },
      intro: {
        title: "La DSI comme partenaire stratégique",
        content: `Dans un environnement technologique en constante évolution, la Direction des Systèmes d'Information (DSI) ne peut plus être un simple centre de coûts. Elle doit devenir un véritable partenaire stratégique, capable d'anticiper les besoins métiers et de délivrer de la valeur rapidement. Notre approche du Pilotage IT vise à transformer votre gouvernance pour garantir que chaque investissement technologique soutient directement la vision de l'entreprise.`
      },
      challenges: [
        { title: "Shadow IT", desc: "Prolifération d'outils non maîtrisés par la DSI." },
        { title: "Dette Technique", desc: "Systèmes obsolètes freinant l'innovation." },
        { title: "Alignement Business", desc: "Décalage entre les livrables IT et les attentes métiers." },
        { title: "Maîtrise des Coûts", desc: "Difficulté à suivre le TCO (Total Cost of Ownership)." }
      ],
      methodology: [
        { title: "Audit & Diagnostic", desc: "Analyse de la maturité actuelle (CMMI) et des processus existants." },
        { title: "Définition de la Cible", desc: "Construction de la feuille de route stratégique IT à 3 ans." },
        { title: "Gouvernance", desc: "Mise en place des comités (CODIR, COPIL) et des instances de décision." },
        { title: "KPIs & Pilotage", desc: "Définition des indicateurs de performance et tableaux de bord." }
      ],
      useCases: [
        { title: "Fusion Bancaire", desc: "Harmonisation des SI de deux banques privées. Résultat : -25% de coûts opérationnels.", icon: Landmark },
        { title: "Transformation Agile", desc: "Passage d'un modèle Cycle en V à SAFe pour une assurance. Time-to-market divisé par 2.", icon: Activity },
        { title: "Gouvernance Cloud", desc: "Mise en place FinOps pour un groupe industriel. Économies cloud de 30%.", icon: Cloud }
      ]
    },
    pmoStrategique: {
      hero: {
        title: "PMO Stratégique",
        subtitle: "De la gestion de projet au pilotage de la valeur",
        cta: "Structurer votre PMO"
      },
      intro: {
        title: "L'excellence dans l'exécution",
        p1: "Le PMO moderne est une tour de contrôle qui arbitre, priorise et sécurise la création de valeur.",
        p2: "Nous construisons avec vous un PMO qui aligne portefeuille, ressources et bénéfices, avec des dashboards exécutifs prêts pour le COMEX."
      },
      challenges: [
        { title: "Manque de Visibilité", desc: "Impossible d'avoir une vue consolidée du portefeuille." },
        { title: "Surcharge Ressources", desc: "Goulots d'étranglement sur les compétences clés." },
        { title: "Projets Zombies", desc: "Projets qui consomment du budget sans apporter de valeur." },
        { title: "Retards Chroniques", desc: "Dérives systématiques des plannings et budgets." }
      ],
      benefits: [
        { title: "Visibilité 360°", desc: "Portefeuille consolidé, statuts temps réel, alertes sur dérives.", icon: Layout },
        { title: "Décisions Factuelles", desc: "Priorisation basée sur la valeur, le risque et la capacité.", icon: Target },
        { title: "Productivité", desc: "Jusqu'à 15% de capacité libérée sur les équipes clés.", icon: Activity },
        { title: "Gouvernance", desc: "Rituels COPIL/CODIR structurés, décisions tracées.", icon: Landmark },
        { title: "Time-to-Value", desc: "Standardisation et modèles réutilisables pour accélérer les déploiements.", icon: Layers },
        { title: "Reporting Exécutif", desc: "Tableaux de bord Board-ready (IBCS), mobile-friendly.", icon: FileBarChart }
      ],
      features: [
        { title: "Scoring & Arbitrage", desc: "Modèle de scoring multi-critères (valeur, coût, risque, complexité).", icon: Filter },
        { title: "Capacity Planning", desc: "Vision charge/capacité par rôle et équipe pour éviter les goulots.", icon: Users },
        { title: "Roadmap & Jalons", desc: "Synchronisation des jalons clés, dépendances critiques mises en évidence.", icon: Clock },
        { title: "Budget & ROI", desc: "Suivi des CAPEX/OPEX, ROI prévisionnel vs réalisé, variances en un clic.", icon: DollarSign },
        { title: "Risques & Conformité", desc: "Registre des risques, plans de mitigation, ownership clair.", icon: ShieldCheck },
        { title: "Change & Adoption", desc: "Guides, formations et accompagnement pour ancrer les nouvelles pratiques.", icon: Lightbulb }
      ],
      useCases: [
        { title: "PMO Industriel", desc: "Pilotage de 200+ projets R&D. Gain de productivité de 15%.", icon: Factory },
        { title: "Secteur Public", desc: "Mise en place d'un PMO transverse pour une administration cantonale.", icon: Landmark },
        { title: "Luxe & Retail", desc: "Optimisation du portefeuille IT/Digital. ROI x3 sur la fonction PMO.", icon: ShoppingBag },
        { title: "Fusion / M&A", desc: "Harmonisation de portefeuilles et convergence des méthodes post-fusion.", icon: Share2 }
      ],
      methodology: {
        title: "Notre démarche en 4 étapes",
        steps: [
          { title: "Cadrage", desc: "Définition du mandat, de la valeur cible et des parties prenantes." },
          { title: "Standardisation", desc: "Harmonisation des méthodes (Waterfall, Agile, Hybride) et modèles prêts à l’emploi." },
          { title: "Outillage", desc: "Implémentation PPM (portefeuille, capacité, risques, finances) avec dashboards exécutifs." },
          { title: "Adoption", desc: "Conduite du changement, coaching des PM, rituels et gouvernance opérationnelle." }
        ]
      },
      metrics: [
        { after: "-25%", before: "N/A", label: "Retards Projets" },
        { after: "+15%", before: "N/A", label: "Capacité Libérée" },
        { after: "-30%", before: "N/A", label: "Dérives Budget" },
        { after: "+40%", before: "N/A", label: "Adoption Méthodes" },
        { after: "1 vue", before: "N/A", label: "Portefeuille Unifié" },
        { after: "<48h", before: "N/A", label: "Décisions COPIL" }
      ],
      cta: {
        title: "Prêt à structurer votre PMO ?",
        subtitle: "Obtenez un diagnostic en 10 jours et des tableaux de bord prêts pour le COMEX.",
        btnDemo: "Planifier une session",
        btnGuide: "Télécharger la checklist PMO"
      }
    },
    dataPowerBI: {
      hero: {
        title: "Data & Power BI",
        subtitle: "Transformez vos données brutes en or décisionnel",
        cta: "Voir nos Dashboards"
      },
      intro: {
        title: "La donnée au service de la décision",
        content: `Vos données racontent une histoire. Savez-vous l'écouter ? Avec Microsoft Power BI, nous transformons des millions de lignes de données complexes en visualisations claires, interactives et actionnables. De l'architecture de données (Data Warehouse) à la dataviz finale, nous vous accompagnons sur toute la chaîne de valeur de la Business Intelligence.`
      },
      challenges: [
        { title: "Silos de Données", desc: "Données fragmentées entre ERP, CRM et Excel." },
        { title: "Qualité des Données", desc: "Données incomplètes ou incohérentes (Data Quality)." },
        { title: "Adoption Utilisateur", desc: "Rapports existants trop complexes ou peu utilisés." },
        { title: "Sécurité", desc: "Gestion des accès et confidentialité (RLS)." }
      ],
      methodology: [
        { title: "Data Engineering", desc: "Collecte, nettoyage et modélisation (ETL/ELT)." },
        { title: "UX/UI Design", desc: "Conception de tableaux de bord ergonomiques et intuitifs." },
        { title: "Développement", desc: "Implémentation Power BI, DAX avancé et intégration." },
        { title: "Déploiement", desc: "Publication, sécurisation et formation des utilisateurs." }
      ],
      useCases: [
        { title: "Sales Analytics", desc: "Dashboard commercial temps réel pour 500+ vendeurs.", icon: TrendingUp },
        { title: "Finance Reporting", desc: "Automatisation du P&L et du bilan. Gain de 5 jours/mois.", icon: DollarSign },
        { title: "Supply Chain", desc: "Optimisation des stocks et suivi logistique mondial.", icon: Truck }
      ]
    },
    automationIA: {
      hero: {
        title: "Automatisation & IA",
        subtitle: "Libérez le potentiel humain en automatisant le reste",
        cta: "Explorer l'IA"
      },
      intro: {
        title: "L'efficacité opérationnelle réinventée",
        p1: "L'IA, le RPA et l'hyper-automatisation sont des leviers immédiats de productivité et de qualité.",
        p2: "Nous identifions les processus répétitifs, prototypons vite, industrialisons et mesurons le ROI avec des dashboards temps réel."
      },
      benefits: [
        { title: "Productivité +40%", desc: "Automatisation des tâches à faible valeur pour libérer les équipes.", icon: Activity },
        { title: "Réduction des Erreurs", desc: "Moins de risques de conformité et de qualité grâce aux bots.", icon: ShieldCheck },
        { title: "Scalabilité", desc: "Absorber les pics de charge sans sur-staffing.", icon: Layers },
        { title: "Time-to-Value", desc: "POC en semaines, industrialisation progressive.", icon: Clock },
        { title: "Coûts Optimisés", desc: "Baisse du coût par transaction grâce à l'automatisation.", icon: DollarSign },
        { title: "Expérience Collaborateur", desc: "Moins de tâches répétitives, plus de missions à forte valeur.", icon: Users }
      ],
      features: [
        { title: "Process Mining", desc: "Cartographie et détection des quick wins automatiques.", icon: Search },
        { title: "RPA & Bots", desc: "Automatisation RPA (UI) et API-first selon le besoin.", icon: Bot },
        { title: "IA Générative", desc: "Assistants métier (email, synthèse, rédaction, QA).", icon: Lightbulb },
        { title: "NLP & Vision", desc: "Extraction intelligente des documents, routing, classification.", icon: Mail },
        { title: "Orchestration", desc: "Pilotage des workflows et des erreurs, MCO, alerting.", icon: Layout },
        { title: "Sécurité & Gouvernance", desc: "Accès, logs, conformité et monitoring centralisé.", icon: Lock }
      ],
      challenges: [
        { title: "Tâches Répétitives", desc: "Perte de temps sur des saisies manuelles." },
        { title: "Erreurs Humaines", desc: "Risques de conformité et de qualité." },
        { title: "Scalabilité", desc: "Incapacité à gérer les pics de charge." },
        { title: "Coûts Opérationnels", desc: "Coûts de traitement trop élevés." }
      ],
      methodology: [
        { title: "Process Mining", desc: "Analyse des processus pour identifier les candidats à l'automatisation." },
        { title: "Prototypage", desc: "POC rapide pour valider la faisabilité technique." },
        { title: "Développement", desc: "Création de bots RPA ou de flux Power Automate." },
        { title: "MCO", desc: "Maintien en conditions opérationnelles et supervision." }
      ],
      useCases: [
        { title: "Traitement Factures", desc: "Automatisation à 95% du processus procure-to-pay.", icon: FileText },
        { title: "Onboarding RH", desc: "Création automatique des comptes et accès pour les nouveaux arrivants.", icon: Users },
        { title: "Service Client", desc: "Tri et réponse automatique aux emails via IA (NLP).", icon: Mail }
      ],
      cta: {
        title: "Prêt à lancer vos automatisations ?",
        btnDemo: "Demander une démo"
      }
    },
    portfolio: {
      hero: {
        title: "Portefeuilles & Priorisation",
        subtitle: "Faites les bons choix, au bon moment",
        cta: "Optimiser mon portefeuille"
      },
      intro: {
        title: "L'arbitrage éclairé",
        content: `Dans un monde aux ressources limitées, choisir c'est renoncer. Mais renoncer à quoi ? Notre service de gestion de portefeuille vous aide à évaluer, comparer et prioriser vos initiatives selon des critères objectifs de valeur, de risque et d'alignement stratégique. Maximisez la valeur globale de votre portefeuille.`
      },
      challenges: [
        { title: "Trop de Projets", desc: "Dispersion des efforts et des budgets." },
        { title: "Priorisation Floue", desc: "C'est celui qui crie le plus fort qui gagne." },
        { title: "ROI Inconnu", desc: "Difficulté à mesurer la valeur réelle des initiatives." },
        { title: "Conflits Ressources", desc: "Arbitrages permanents entre projets et run." }
      ],
      methodology: [
        { title: "Inventaire", desc: "Recensement exhaustif des initiatives en cours et à venir." },
        { title: "Scoring", desc: "Mise en place d'un modèle de scoring pondéré (Value vs Effort)." },
        { title: "Arbitrage", desc: "Animation des revues de portefeuille trimestrielles." },
        { title: "Planification", desc: "Construction de la roadmap capacitaire." }
      ],
      useCases: [
        { title: "Priorisation IT", desc: "Réduction du backlog de 40% en éliminant les projets à faible valeur.", icon: Filter },
        { title: "Allocation Budgétaire", desc: "Réallocation de 2M CHF vers des projets d'innovation.", icon: PieChart },
        { title: "Alignement Stratégique", desc: "Garantie que 100% des projets top-priorité sont staffés.", icon: Target }
      ]
    },
    executiveReporting: {
      hero: {
        title: "Reporting Exécutif",
        subtitle: "La vision claire dont le COMEX a besoin",
        cta: "Voir les exemples"
      },
      intro: {
        title: "Décider avec confiance",
        content: `Les dirigeants n'ont pas besoin de plus de données, ils ont besoin de plus de clarté. Nos solutions de Reporting Exécutif synthétisent l'information complexe en indicateurs clés (KPIs) visuels et pertinents. Nous concevons des tableaux de bord "Board-Ready" qui permettent de piloter l'entreprise en un coup d'œil.`
      },
      challenges: [
        { title: "Information Noyée", desc: "Trop de détails, pas assez de synthèse." },
        { title: "Données Obsolètes", desc: "Rapports qui arrivent 2 semaines après la clôture." },
        { title: "Manque de Confiance", desc: "Chiffres contradictoires selon les départements." },
        { title: "Format Inadapté", desc: "Excel illisibles sur mobile ou tablette." }
      ],
      methodology: [
        { title: "Définition KPIs", desc: "Ateliers avec le top management pour cibler les indicateurs vitaux." },
        { title: "Data Viz", desc: "Design épuré et impactant (IBCS standards)." },
        { title: "Automatisation", desc: "Flux de données automatisés pour du temps réel." },
        { title: "Mobile First", desc: "Accessibilité des rapports sur tous les terminaux." }
      ],
      useCases: [
        { title: "Dashboard CEO", desc: "Vue 360° de l'entreprise (Finance, RH, Ops) sur iPad.", icon: Tablet },
        { title: "Suivi Stratégique", desc: "Monitoring de l'exécution du plan stratégique à 5 ans.", icon: Map },
        { title: "Reporting Investisseurs", desc: "Production automatisée des rapports mensuels pour les actionnaires.", icon: FileBarChart }
      ]
    }
  },
  en: {
    // English content would mirror French structure
    // Simplifying for brevity in this response, but structure is ready for full translation
    pilotageIT: {
        hero: { title: "IT Steering & Governance", subtitle: "Align IT Strategy with Business Goals", cta: "Request Audit" },
        intro: { title: "IT as a Strategic Partner", content: "Transform your IT department from a cost center to a value generator." },
        challenges: [{ title: "Shadow IT", desc: "Uncontrolled tool proliferation." }],
        methodology: [{ title: "Audit", desc: "Maturity analysis." }],
        useCases: [{ title: "Bank Merger", desc: "IT Harmonization." }]
    },
    // ... maps to other keys
  },
  de: {
    // German content would mirror structure
    pilotageIT: {
        hero: { title: "IT-Steuerung & Governance", subtitle: "IT-Strategie mit Geschäftszielen abstimmen", cta: "Audit anfordern" },
        intro: { title: "IT als strategischer Partner", content: "Verwandeln Sie Ihre IT-Abteilung von einer Kostenstelle in einen Werttreiber." },
        challenges: [{ title: "Shadow IT", desc: "Unkontrollierte Tool-Verbreitung." }],
        methodology: [{ title: "Audit", desc: "Reifegradanalyse." }],
        useCases: [{ title: "Bankenfusion", desc: "IT-Harmonisierung." }]
    }
    // ... maps to other keys
  }
};

