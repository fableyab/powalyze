
import { 
  BarChart, Layers, Users, Shield, TrendingUp, 
  FileText, Workflow, Globe, CheckCircle 
} from 'lucide-react';

export const pmoSolutionData = {
  hero: {
    title: {
      fr: "La Solution PMO Complète de Powalyze",
      en: "Powalyze's Complete PMO Solution",
      de: "Die komplette PMO-Lösung von Powalyze"
    },
    subtitle: {
      fr: "Pilotage stratégique, gouvernance et transformation",
      en: "Strategic steering, governance, and transformation",
      de: "Strategische Steuerung, Governance und Transformation"
    },
    cta: {
      fr: "Demander une démo",
      en: "Request a Demo",
      de: "Demo anfordern"
    }
  },
  overview: {
    title: {
      fr: "Pourquoi choisir Powalyze ?",
      en: "Why Choose Powalyze?",
      de: "Warum Powalyze wählen?"
    },
    benefits: [
      { fr: "Visibilité à 360° sur le portefeuille", en: "360° Portfolio Visibility", de: "360° Portfolio-Sichtbarkeit" },
      { fr: "Alignement stratégique garanti", en: "Guaranteed Strategic Alignment", de: "Garantierte strategische Ausrichtung" },
      { fr: "Réduction des risques opérationnels", en: "Reduced Operational Risks", de: "Reduzierung operationeller Risiken" },
      { fr: "Optimisation des ressources", en: "Resource Optimization", de: "Ressourcenoptimierung" },
      { fr: "Reporting automatisé temps réel", en: "Automated Real-time Reporting", de: "Automatisiertes Echtzeit-Reporting" },
      { fr: "Gouvernance standardisée", en: "Standardized Governance", de: "Standardisierte Governance" }
    ]
  },
  features: [
    {
      id: "portfolio",
      icon: Layers,
      title: { fr: "Gestion de Portefeuille", en: "Portfolio Management", de: "Portfoliomanagement" },
      desc: { fr: "Centralisez tous vos projets et programmes.", en: "Centralize all your projects and programs.", de: "Zentralisieren Sie alle Ihre Projekte." }
    },
    {
      id: "governance",
      icon: Shield,
      title: { fr: "Gouvernance Projet", en: "Project Governance", de: "Projekt-Governance" },
      desc: { fr: "Standards, processus et conformité.", en: "Standards, processes, and compliance.", de: "Standards, Prozesse und Compliance." }
    },
    {
      id: "resources",
      icon: Users,
      title: { fr: "Planification Ressources", en: "Resource Planning", de: "Ressourcenplanung" },
      desc: { fr: "Allocation optimale et gestion de la capacité.", en: "Optimal allocation and capacity management.", de: "Optimale Allokation und Kapazitätsmanagement." }
    },
    {
      id: "risks",
      icon: TrendingUp,
      title: { fr: "Gestion des Risques", en: "Risk Management", de: "Risikomanagement" },
      desc: { fr: "Identification et mitigation proactive.", en: "Proactive identification and mitigation.", de: "Proaktive Identifikation und Minderung." }
    },
    {
      id: "reporting",
      icon: BarChart,
      title: { fr: "Reporting & Analytics", en: "Reporting & Analytics", de: "Reporting & Analytik" },
      desc: { fr: "Dashboards Power BI décisionnels.", en: "Actionable Power BI dashboards.", de: "Entscheidungsorientierte Power BI Dashboards." }
    },
    {
      id: "docs",
      icon: FileText,
      title: { fr: "Gestion Documentaire", en: "Document Management", de: "Dokumentenmanagement" },
      desc: { fr: "Centralisation et versioning des livrables.", en: "Centralization and versioning of deliverables.", de: "Zentralisierung und Versionierung von Leistungen." }
    },
    {
      id: "integration",
      icon: Workflow,
      title: { fr: "Intégrations", en: "Integrations", de: "Integrationen" },
      desc: { fr: "Connecteurs Jira, DevOps, SAP, etc.", en: "Jira, DevOps, SAP connectors, etc.", de: "Jira, DevOps, SAP Anschlüsse usw." }
    },
    {
      id: "scalability",
      icon: Globe,
      title: { fr: "Scalabilité", en: "Scalability", de: "Skalierbarkeit" },
      desc: { fr: "Une solution qui grandit avec vous.", en: "A solution that grows with you.", de: "Eine Lösung, die mit Ihnen wächst." }
    }
  ],
  useCases: [
    {
      id: "banking",
      industry: "Banque",
      title: { fr: "Transformation Digitale Bancaire", en: "Banking Digital Transformation", de: "Digitale Transformation im Bankwesen" },
      challenge: { fr: "Manque de visibilité sur 50+ projets.", en: "Lack of visibility on 50+ projects.", de: "Mangelnde Sichtbarkeit bei 50+ Projekten." },
      solution: { fr: "Implémentation PMO 360 & Power BI.", en: "PMO 360 & Power BI Implementation.", de: "Implementierung von PMO 360 & Power BI." },
      results: { fr: "-15% de coûts, +20% de productivité.", en: "-15% costs, +20% productivity.", de: "-15% Kosten, +20% Produktivität." }
    },
    {
      id: "pharma",
      industry: "Pharma",
      title: { fr: "Conformité & R&D", en: "Compliance & R&D", de: "Compliance & F&E" },
      challenge: { fr: "Délais de mise sur le marché trop longs.", en: "Time-to-market too long.", de: "Zu lange Markteinführungszeiten." },
      solution: { fr: "Gouvernance Agile & Gestion des Risques.", en: "Agile Governance & Risk Management.", de: "Agile Governance & Risikomanagement." },
      results: { fr: "Accélération de 30% du pipeline.", en: "30% pipeline acceleration.", de: "30% Pipeline-Beschleunigung." }
    },
    {
      id: "manufacturing",
      industry: "Industrie",
      title: { fr: "Optimisation Supply Chain", en: "Supply Chain Optimization", de: "Lieferkettenoptimierung" },
      challenge: { fr: "Silos de données entre départements.", en: "Data silos between departments.", de: "Datensilos zwischen Abteilungen." },
      solution: { fr: "Hub de données centralisé.", en: "Centralized data hub.", de: "Zentralisierter Daten-Hub." },
      results: { fr: "Vision unifiée temps réel.", en: "Unified real-time vision.", de: "Vereinheitlichte Echtzeit-Vision." }
    }
  ],
  pricing: [
    {
      id: "starter",
      name: "Starter",
      price: { fr: "2'500 CHF / mois", en: "2,500 CHF / month", de: "2'500 CHF / Monat" },
      desc: { fr: "Pour les PME en croissance.", en: "For growing SMEs.", de: "Für wachsende KMU." },
      features: [
        { fr: "Gestion de 10 projets", en: "10 Projects Management", de: "Verwaltung von 10 Projekten" },
        { fr: "5 Utilisateurs", en: "5 Users", de: "5 Benutzer" },
        { fr: "Reporting Standard", en: "Standard Reporting", de: "Standard Reporting" }
      ]
    },
    {
      id: "pro",
      name: "Professional",
      price: { fr: "5'000 CHF / mois", en: "5,000 CHF / month", de: "5'000 CHF / Monat" },
      desc: { fr: "Pour les organisations matures.", en: "For mature organizations.", de: "Für reife Organisationen." },
      recommended: true,
      features: [
        { fr: "Projets illimités", en: "Unlimited Projects", de: "Unbegrenzte Projekte" },
        { fr: "20 Utilisateurs", en: "20 Users", de: "20 Benutzer" },
        { fr: "Reporting Avancé Power BI", en: "Advanced Power BI Reporting", de: "Erweitertes Power BI Reporting" },
        { fr: "Gestion des Risques", en: "Risk Management", de: "Risikomanagement" }
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { fr: "Sur mesure", en: "Custom", de: "Nach Maß" },
      desc: { fr: "Pour les grandes entreprises.", en: "For large enterprises.", de: "Für Großunternehmen." },
      features: [
        { fr: "Utilisateurs illimités", en: "Unlimited Users", de: "Unbegrenzte Benutzer" },
        { fr: "Intégrations sur mesure", en: "Custom Integrations", de: "Maßgeschneiderte Integrationen" },
        { fr: "Support dédié 24/7", en: "Dedicated 24/7 Support", de: "Dedizierter 24/7 Support" },
        { fr: "On-premise option", en: "On-premise option", de: "On-Premise-Option" }
      ]
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Jean-Pierre D.",
      role: "CTO",
      company: "SwissTech Bank",
      quote: { 
        fr: "Powalyze a transformé notre approche projet. La visibilité est totale.",
        en: "Powalyze transformed our project approach. Visibility is total.",
        de: "Powalyze hat unseren Projektansatz verändert. Die Sichtbarkeit ist total."
      },
      rating: 5
    },
    {
      id: 2,
      name: "Sarah L.",
      role: "Head of PMO",
      company: "PharmaCorp",
      quote: { 
        fr: "Un outil puissant et une équipe d'experts à l'écoute.",
        en: "A powerful tool and a team of experts who listen.",
        de: "Ein leistungsstarkes Tool und ein Expertenteam, das zuhört."
      },
      rating: 5
    },
    {
      id: 3,
      name: "Marc Weber",
      role: "CEO",
      company: "Weber Industries",
      quote: { 
        fr: "Le ROI a été atteint en moins de 6 mois.",
        en: "ROI was achieved in less than 6 months.",
        de: "Der ROI wurde in weniger als 6 Monaten erreicht."
      },
      rating: 4
    }
  ],
  faq: [
    {
      q: { fr: "Combien de temps pour l'implémentation ?", en: "Implementation time?", de: "Implementierungszeit?" },
      a: { fr: "En moyenne 4 à 8 semaines selon la complexité.", en: "Average 4-8 weeks depending on complexity.", de: "Durchschnittlich 4-8 Wochen je nach Komplexität." }
    },
    {
      q: { fr: "Est-ce compatible avec Jira ?", en: "Compatible with Jira?", de: "Kompatibel mit Jira?" },
      a: { fr: "Oui, nous avons des connecteurs natifs.", en: "Yes, we have native connectors.", de: "Ja, wir haben native Konnektoren." }
    }
  ]
};
