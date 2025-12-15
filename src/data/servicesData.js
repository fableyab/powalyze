
import { 
  Shield, Target, BarChart, Bot, Layers, PieChart, 
  CheckCircle, Clock, TrendingUp, Users, FileText, Globe 
} from 'lucide-react';

export const servicesData = {
  "it-governance": {
    slug: "pilotage-it",
    icon: Shield,
    title: {
      fr: "Pilotage IT & Gouvernance",
      en: "IT Steering & Governance",
      de: "IT-Steuerung & Governance"
    },
    subtitle: {
      fr: "Alignez votre IT avec votre stratégie métier",
      en: "Align your IT with your business strategy",
      de: "Richten Sie Ihre IT an Ihrer Geschäftsstrategie aus"
    },
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    overview: {
      title: { fr: "La Gouvernance IT Moderne", en: "Modern IT Governance", de: "Moderne IT-Governance" },
      content: {
        fr: "Le pilotage IT ne se limite plus à la gestion des coûts. C'est un levier stratégique pour l'innovation et la compétitivité. Notre approche assure que chaque investissement technologique crée de la valeur tangible.",
        en: "IT steering is no longer just about cost management. It is a strategic lever for innovation and competitiveness. Our approach ensures that every technology investment creates tangible value.",
        de: "IT-Steuerung beschränkt sich nicht mehr nur auf Kostenmanagement. Sie ist ein strategischer Hebel für Innovation und Wettbewerbsfähigkeit. Unser Ansatz stellt sicher, dass jede Technologieinvestition greifbaren Wert schafft."
      },
      benefits: [
        { fr: "Alignement Business-IT", en: "Business-IT Alignment", de: "Business-IT-Ausrichtung" },
        { fr: "Réduction des Risques", en: "Risk Reduction", de: "Risikoreduzierung" },
        { fr: "Optimisation des Coûts", en: "Cost Optimization", de: "Kostenoptimierung" },
        { fr: "Conformité Réglementaire", en: "Regulatory Compliance", de: "Einhaltung gesetzlicher Vorschriften" }
      ]
    },
    context: {
      title: { fr: "Contexte & Enjeux", en: "Context & Challenges", de: "Kontext & Herausforderungen" },
      content: {
        fr: "Dans un paysage technologique en mutation rapide, les DSI font face à une pression croissante : faire plus avec moins, sécuriser le patrimoine numérique et soutenir l'agilité métier. En Suisse, la conformité (nLPD) ajoute une couche de complexité nécessitant une gouvernance robuste mais flexible.",
        en: "In a rapidly changing technological landscape, CIOs face increasing pressure: do more with less, secure digital assets, and support business agility. In Switzerland, compliance (nFADP) adds a layer of complexity requiring robust yet flexible governance.",
        de: "In einer sich schnell wandelnden Technologielandschaft stehen CIOs unter wachsendem Druck: mehr mit weniger erreichen, digitale Vermögenswerte sichern und Geschäftsagilität unterstützen. In der Schweiz fügt die Compliance (nDSG) eine Komplexitätsebene hinzu, die eine robuste, aber flexible Governance erfordert."
      }
    },
    methodology: {
      framework: "COBIT 2019 / ITIL 4",
      steps: [
        { title: { fr: "Audit", en: "Audit", de: "Audit" }, desc: { fr: "Analyse de maturité", en: "Maturity analysis", de: "Reifegradanalyse" } },
        { title: { fr: "Cadrage", en: "Framing", de: "Rahmenbedingungen" }, desc: { fr: "Définition de la cible", en: "Target definition", de: "Zieldefinition" } },
        { title: { fr: "Implémentation", en: "Implementation", de: "Implementierung" }, desc: { fr: "Déploiement des processus", en: "Process deployment", de: "Prozessbereitstellung" } },
        { title: { fr: "Mesure", en: "Measurement", de: "Messung" }, desc: { fr: "KPIs et amélioration", en: "KPIs and improvement", de: "KPIs und Verbesserung" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "ROI Amélioré", en: "Improved ROI", de: "Verbesserter ROI" }, value: "+25%" },
        { title: { fr: "Risques Réduits", en: "Reduced Risks", de: "Reduzierte Risiken" }, value: "-40%" },
        { title: { fr: "Productivité", en: "Productivity", de: "Produktivität" }, value: "+15%" }
      ]
    }
  },
  "strategic-pmo": {
    slug: "pmo-strategique",
    icon: Target,
    title: {
      fr: "PMO Stratégique",
      en: "Strategic PMO",
      de: "Strategisches PMO"
    },
    subtitle: {
      fr: "Maximisez la valeur de vos projets",
      en: "Maximize the value of your projects",
      de: "Maximieren Sie den Wert Ihrer Projekte"
    },
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    overview: {
      title: { fr: "L'Excellence Opérationnelle", en: "Operational Excellence", de: "Operative Exzellenz" },
      content: {
        fr: "Transformez votre PMO en centre de valeur. Nous structurons vos portefeuilles pour garantir que chaque projet contribue aux objectifs stratégiques de l'entreprise.",
        en: "Transform your PMO into a value center. We structure your portfolios to ensure that every project contributes to the company's strategic goals.",
        de: "Verwandeln Sie Ihr PMO in ein Wertzentrum. Wir strukturieren Ihre Portfolios, um sicherzustellen, dass jedes Projekt zu den strategischen Zielen des Unternehmens beiträgt."
      },
      benefits: [
        { fr: "Priorisation par la Valeur", en: "Value Prioritization", de: "Priorisierung nach Wert" },
        { fr: "Visibilité 360°", en: "360° Visibility", de: "360° Sichtbarkeit" },
        { fr: "Gestion des Ressources", en: "Resource Management", de: "Ressourcenmanagement" }
      ]
    },
    context: {
      title: { fr: "Pourquoi un PMO Stratégique ?", en: "Why a Strategic PMO?", de: "Warum ein strategisches PMO?" },
      content: {
        fr: "70% des projets échouent par manque d'alignement. Un PMO stratégique fait le lien entre la vision du COMEX et l'exécution terrain, assurant cohérence et performance.",
        en: "70% of projects fail due to lack of alignment. A strategic PMO bridges the gap between Executive vision and field execution, ensuring consistency and performance.",
        de: "70% der Projekte scheitern an mangelnder Ausrichtung. Ein strategisches PMO schlägt die Brücke zwischen der Vision der Geschäftsleitung und der Ausführung vor Ort und sorgt für Konsistenz und Leistung."
      }
    },
    methodology: {
      framework: "PMI / Prince2 / Agile",
      steps: [
        { title: { fr: "Diagnostic", en: "Diagnosis", de: "Diagnose" }, desc: { fr: "État des lieux", en: "Current state", de: "Bestandsaufnahme" } },
        { title: { fr: "Standardisation", en: "Standardization", de: "Standardisierung" }, desc: { fr: "Processus & Outils", en: "Processes & Tools", de: "Prozesse & Tools" } },
        { title: { fr: "Pilotage", en: "Steering", de: "Steuerung" }, desc: { fr: "Tableaux de bord", en: "Dashboards", de: "Dashboards" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "Projets à l'heure", en: "On-time Projects", de: "Pünktliche Projekte" }, value: "90%" },
        { title: { fr: "Budget respecté", en: "Budget Adherence", de: "Budget Einhaltung" }, value: "+30%" }
      ]
    }
  },
  "data-power-bi": {
    slug: "data-power-bi",
    icon: BarChart,
    title: {
      fr: "Data & Power BI",
      en: "Data & Power BI",
      de: "Daten & Power BI"
    },
    subtitle: {
      fr: "Transformez vos données en décisions",
      en: "Turn your data into decisions",
      de: "Verwandeln Sie Daten in Entscheidungen"
    },
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    overview: {
      title: { fr: "Intelligence Décisionnelle", en: "Business Intelligence", de: "Business Intelligence" },
      content: {
        fr: "Passez du reporting statique au pilotage dynamique. Nos experts Power BI conçoivent des tableaux de bord interactifs qui révèlent les tendances cachées de votre activité.",
        en: "Move from static reporting to dynamic steering. Our Power BI experts design interactive dashboards that reveal hidden trends in your business.",
        de: "Wechseln Sie von statischem Reporting zu dynamischer Steuerung. Unsere Power BI-Experten entwerfen interaktive Dashboards, die verborgene Trends in Ihrem Geschäft aufdecken."
      },
      benefits: [
        { fr: "Temps Réel", en: "Real Time", de: "Echtzeit" },
        { fr: "Self-Service BI", en: "Self-Service BI", de: "Self-Service BI" },
        { fr: "Mobile Ready", en: "Mobile Ready", de: "Mobil bereit" }
      ]
    },
    context: {
      title: { fr: "La Data au Cœur de la Stratégie", en: "Data at the Core of Strategy", de: "Daten im Mittelpunkt der Strategie" },
      content: {
        fr: "Les entreprises data-driven surperforment leurs concurrents. Nous vous aidons à structurer votre patrimoine de données (Data Warehouse, Lakehouse) et à le valoriser via Microsoft Power BI.",
        en: "Data-driven companies outperform their competitors. We help you structure your data assets (Data Warehouse, Lakehouse) and leverage them via Microsoft Power BI.",
        de: "Datengetriebene Unternehmen übertreffen ihre Konkurrenten. Wir helfen Ihnen, Ihre Datenbestände (Data Warehouse, Lakehouse) zu strukturieren und über Microsoft Power BI zu nutzen."
      }
    },
    methodology: {
      framework: "Microsoft Power Platform",
      steps: [
        { title: { fr: "Collecte", en: "Ingest", de: "Erfassung" }, desc: { fr: "ETL & Connecteurs", en: "ETL & Connectors", de: "ETL & Konnektoren" } },
        { title: { fr: "Modélisation", en: "Model", de: "Modellierung" }, desc: { fr: "Star Schema", en: "Star Schema", de: "Sternschema" } },
        { title: { fr: "Visualisation", en: "Visualize", de: "Visualisierung" }, desc: { fr: "UX/UI Design", en: "UX/UI Design", de: "UX/UI Design" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "Gain de temps", en: "Time Savings", de: "Zeitersparnis" }, value: "40h/mois" },
        { title: { fr: "Adoption", en: "Adoption", de: "Akzeptanz" }, value: "100%" }
      ]
    }
  },
  "automation-ai": {
    slug: "automatisation-ia",
    icon: Bot,
    title: {
      fr: "Automatisation & IA",
      en: "Automation & AI",
      de: "Automatisierung & KI"
    },
    subtitle: {
      fr: "Optimisez vos processus avec l'IA",
      en: "Optimize processes with AI",
      de: "Optimieren Sie Prozesse mit KI"
    },
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    overview: {
      title: { fr: "L'Ère de l'Hyper-Automatisation", en: "The Era of Hyper-Automation", de: "Das Zeitalter der Hyper-Automatisierung" },
      content: {
        fr: "Libérez vos équipes des tâches répétitives. Nous combinons RPA (Robotic Process Automation) et IA générative pour automatiser les flux de travail complexes.",
        en: "Free your teams from repetitive tasks. We combine RPA (Robotic Process Automation) and Generative AI to automate complex workflows.",
        de: "Befreien Sie Ihre Teams von wiederkehrenden Aufgaben. Wir kombinieren RPA (Robotic Process Automation) und generative KI, um komplexe Arbeitsabläufe zu automatisieren."
      },
      benefits: [
        { fr: "Efficacité 24/7", en: "24/7 Efficiency", de: "24/7 Effizienz" },
        { fr: "Réduction d'Erreurs", en: "Error Reduction", de: "Fehlerreduzierung" },
        { fr: "Scalabilité", en: "Scalability", de: "Skalierbarkeit" }
      ]
    },
    context: {
      title: { fr: "Pourquoi Automatiser ?", en: "Why Automate?", de: "Warum automatisieren?" },
      content: {
        fr: "L'automatisation n'est plus une option, c'est une nécessité de survie. Elle permet de réduire les coûts opérationnels tout en améliorant la qualité de service et la satisfaction employé.",
        en: "Automation is no longer an option, it's a survival necessity. It reduces operational costs while improving service quality and employee satisfaction.",
        de: "Automatisierung ist keine Option mehr, sondern eine Überlebensnotwendigkeit. Sie senkt die Betriebskosten und verbessert gleichzeitig die Servicequalität und die Mitarbeiterzufriedenheit."
      }
    },
    methodology: {
      framework: "Power Automate / UiPath",
      steps: [
        { title: { fr: "Analyse", en: "Analysis", de: "Analyse" }, desc: { fr: "Identification des flux", en: "Workflow ID", de: "Workflow-ID" } },
        { title: { fr: "Design", en: "Design", de: "Design" }, desc: { fr: "Architecture", en: "Architecture", de: "Architektur" } },
        { title: { fr: "Dev", en: "Dev", de: "Entwicklung" }, desc: { fr: "Développement agile", en: "Agile Dev", de: "Agile Entwicklung" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "Productivité", en: "Productivity", de: "Produktivität" }, value: "+40%" },
        { title: { fr: "Coûts Ops", en: "Ops Costs", de: "Betriebskosten" }, value: "-30%" }
      ]
    }
  },
  "portfolio-management": {
    slug: "portefeuilles-priorisation",
    icon: Layers,
    title: {
      fr: "Portefeuilles & Priorisation",
      en: "Portfolio & Prioritization",
      de: "Portfolios & Priorisierung"
    },
    subtitle: {
      fr: "Arbitrez vos investissements avec certitude",
      en: "Arbitrate your investments with certainty",
      de: "Entscheiden Sie über Ihre Investitionen mit Sicherheit"
    },
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    overview: {
      title: { fr: "Gestion de Portefeuille", en: "Portfolio Management", de: "Portfoliomanagement" },
      content: {
        fr: "Ne lancez plus de projets au hasard. Nous mettons en place des modèles de scoring et de priorisation pour aligner vos ressources sur les initiatives à plus fort ROI.",
        en: "Don't launch projects randomly anymore. We implement scoring and prioritization models to align your resources with the highest ROI initiatives.",
        de: "Starten Sie keine Projekte mehr zufällig. Wir implementieren Scoring- und Priorisierungsmodelle, um Ihre Ressourcen auf die Initiativen mit dem höchsten ROI auszurichten."
      },
      benefits: [
        { fr: "Scoring Objectif", en: "Objective Scoring", de: "Objektives Scoring" },
        { fr: "Capacity Planning", en: "Capacity Planning", de: "Kapazitätsplanung" },
        { fr: "Roadmap Claire", en: "Clear Roadmap", de: "Klare Roadmap" }
      ]
    },
    context: {
      title: { fr: "L'Enjeu de la Priorisation", en: "The Prioritization Challenge", de: "Die Herausforderung der Priorisierung" },
      content: {
        fr: "Dans un monde aux ressources limitées, choisir c'est renoncer. Nos méthodes d'arbitrage vous donnent les clés pour renoncer aux projets à faible valeur et accélérer les pépites.",
        en: "In a resource-constrained world, choosing means giving up. Our arbitration methods give you the keys to drop low-value projects and accelerate the gems.",
        de: "In einer Welt mit begrenzten Ressourcen bedeutet Wählen Verzichten. Unsere Schiedsverfahren geben Ihnen die Schlüssel, um Projekte mit geringem Wert aufzugeben und die Perlen zu beschleunigen."
      }
    },
    methodology: {
      framework: "MoSCoW / WSJF",
      steps: [
        { title: { fr: "Critères", en: "Criteria", de: "Kriterien" }, desc: { fr: "Définition de la valeur", en: "Value definition", de: "Wertdefinition" } },
        { title: { fr: "Scoring", en: "Scoring", de: "Scoring" }, desc: { fr: "Évaluation", en: "Evaluation", de: "Bewertung" } },
        { title: { fr: "Sélection", en: "Selection", de: "Auswahl" }, desc: { fr: "Arbitrage COMEX", en: "Board Decision", de: "Vorstandsentscheidung" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "Valeur Délivrée", en: "Delivered Value", de: "Gelieferter Wert" }, value: "+35%" },
        { title: { fr: "Gaspillage", en: "Waste", de: "Verschwendung" }, value: "-20%" }
      ]
    }
  },
  "executive-reporting": {
    slug: "reporting-executif",
    icon: PieChart,
    title: {
      fr: "Reporting Exécutif",
      en: "Executive Reporting",
      de: "Executive Reporting"
    },
    subtitle: {
      fr: "La vision dont les dirigeants ont besoin",
      en: "The vision leaders need",
      de: "Die Vision, die Führungskräfte brauchen"
    },
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    overview: {
      title: { fr: "Tableaux de Bord Stratégiques", en: "Strategic Dashboards", de: "Strategische Dashboards" },
      content: {
        fr: "Les dirigeants n'ont pas le temps pour les détails superflus. Nous concevons des cockpits de pilotage synthétiques, clairs et orientés action pour le Top Management.",
        en: "Leaders don't have time for superfluous details. We design synthetic, clear, and action-oriented cockpits for Top Management.",
        de: "Führungskräfte haben keine Zeit für überflüssige Details. Wir entwerfen synthetische, klare und handlungsorientierte Cockpits für das Top-Management."
      },
      benefits: [
        { fr: "Synthèse", en: "Synthesis", de: "Synthese" },
        { fr: "Clarté", en: "Clarity", de: "Klarheit" },
        { fr: "Aide à la Décision", en: "Decision Support", de: "Entscheidungshilfe" }
      ]
    },
    context: {
      title: { fr: "L'Information au Service du Leadership", en: "Information Serving Leadership", de: "Information im Dienste der Führung" },
      content: {
        fr: "Un bon reporting exécutif ne se contente pas de montrer les chiffres, il raconte une histoire et met en lumière les zones de risque et d'opportunité nécessitant une attention immédiate.",
        en: "Good executive reporting doesn't just show numbers, it tells a story and highlights risk and opportunity areas requiring immediate attention.",
        de: "Gutes Executive Reporting zeigt nicht nur Zahlen, es erzählt eine Geschichte und hebt Risiko- und Chancenbereiche hervor, die sofortige Aufmerksamkeit erfordern."
      }
    },
    methodology: {
      framework: "IBCS / Data Storytelling",
      steps: [
        { title: { fr: "Besoins", en: "Needs", de: "Bedürfnisse" }, desc: { fr: "Interviews Dirigeants", en: "Leader Interviews", de: "Führungskräfte-Interviews" } },
        { title: { fr: "KPIs", en: "KPIs", de: "KPIs" }, desc: { fr: "Définition métriques", en: "Metrics definition", de: "Metriken-Definition" } },
        { title: { fr: "Design", en: "Design", de: "Design" }, desc: { fr: "Maquettage", en: "Prototyping", de: "Prototyping" } }
      ]
    },
    benefitsSection: {
      list: [
        { title: { fr: "Prise de décision", en: "Decision Making", de: "Entscheidungsfindung" }, value: "x2 Rapide" },
        { title: { fr: "Alignement", en: "Alignment", de: "Ausrichtung" }, value: "100%" }
      ]
    }
  }
};
