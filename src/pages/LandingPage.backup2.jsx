import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { FolderKanban, LayoutDashboard, FileText, Brain, BarChart3, Shield, Database, Bell, Zap, CheckCircle, Eye, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const [lang, setLang] = useState('fr');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const copy = {
    fr: {
      langLabel: 'FR',
      menu: ['Accueil', 'Portfolio Manager', 'Cockpit Exécutif', 'Risk Manager', 'Power BI', 'AI Analytics', 'Performance', 'Contact', 'Connexion'],
      heroTitle: 'Powalyze — The Governance Operating System.',
      heroSubtitle: 'Un cockpit de gouvernance moderne qui unifie vos portefeuilles, vos données, vos reportings et l\'IA prédictive.',
      heroCtaPrimary: 'Découvrir la plateforme',
      heroCtaSecondary: 'Créer un compte',
      heroNote: 'L\'accès au tableau de bord nécessite un compte professionnel sécurisé.',
      
      problemTitle: 'Vous avez des outils.',
      problemSubtitle: 'Vous n\'avez pas encore un système de gouvernance.',
      problems: [
        'Visibilité insuffisante',
        'Données incohérentes',
        'Comités inefficaces',
        'Reporting manuel',
        'Décisions non tracées',
        'Risques détectés trop tard',
        'Aucun cadre de gouvernance',
        'Outils génériques inadaptés'
      ],
      
      conceptTitle: 'Powalyze transforme votre gouvernance en un système cohérent, fiable et anticipatif.',
      conceptSubtitle: 'Un OS stratégique qui combine :',
      conceptAxes: [
        { title: 'PMO', text: 'Structuration des portefeuilles, rituels de pilotage, comités stratégiques.' },
        { title: 'Data', text: 'Modélisation, consolidation et fiabilisation des données analytiques.' },
        { title: 'Power BI', text: 'Dashboards exécutifs, KPI stratégiques, reporting automatisé.' },
        { title: 'SaaS', text: 'Cockpit de gouvernance fluide, sécurisé et multi-utilisateurs.' },
        { title: 'IA prédictive', text: 'Détection précoce, prévision des dérives, recommandations intelligentes.' }
      ],
      
      modulesTitle: 'Les modules qui structurent votre pilotage.',
      modules: [
        { icon: 'FolderKanban', title: 'Portfolio Manager', text: 'Vue globale des initiatives, priorisation, risques, dépendances, budgets.' },
        { icon: 'LayoutDashboard', title: 'Executive Dashboard', text: 'KPI stratégiques, synthèses automatiques, préparation des arbitrages.' },
        { icon: 'FileText', title: 'Decision Hub', text: 'Historique complet des décisions, actions, responsables, impacts.' },
        { icon: 'Brain', title: 'Predictive Intelligence', text: 'Signaux faibles, prévisions, scénarios, recommandations intelligentes.' },
        { icon: 'BarChart3', title: 'Power BI Integration', text: 'Dashboards exécutifs connectés, reporting automatisé.' },
        { icon: 'Shield', title: 'Governance Engine', text: 'Rituels, rôles, responsabilités, cadre de décision stratégique.' },
        { icon: 'Database', title: 'Documents & Référentiels', text: 'Stockage sécurisé, versioning, référentiels partagés.' },
        { icon: 'Bell', title: 'Collaboration & Notifications', text: 'Commentaires contextualisés, alertes intelligentes, suivi temps réel.' },
        { icon: 'Zap', title: 'Intégrations', text: 'Connexion à vos outils existants (Power BI, SharePoint, Teams).' }
      ],
      
      demoTitle: 'Découvrez Powalyze en action.',
      demoText: 'Vue portefeuille • Alerte IA • Préparation comité • Arbitrage • Dashboard Power BI • Décision tracée',
      demoCta: 'Voir la démonstration complète',
      
      onboardingTitle: 'Un accès sécurisé à votre tableau de bord.',
      onboarding: [
        { icon: 'CheckCircle', title: 'Création de compte', text: 'Email pro + password sécurisé' },
        { icon: 'CheckCircle', title: 'Validation email', text: 'Confirmation d\'activation' },
        { icon: 'CheckCircle', title: 'Connexion', text: 'Accès sécurisé au cockpit' },
        { icon: 'Shield', title: 'Sécurité', text: 'Espaces isolés, données chiffrées' },
        { icon: 'Eye', title: 'Règle d\'accès', text: 'Dashboard accessible après connexion' }
      ],
      
      resultsTitle: 'Des résultats mesurables, immédiats, durables.',
      results: [
        '50% de temps gagné sur les comités',
        'Décisions plus rapides et mieux argumentées',
        'Reporting automatisé',
        'Risques anticipés',
        'Gouvernance durable',
        'Alignement renforcé'
      ],
      
      finalTitle: 'Passez d\'un pilotage réactif à un pilotage intelligent.',
      finalCtas: ['Créer un compte', 'Être accompagné']
    },
    en: {
      langLabel: 'EN',
      menu: ['Home', 'Portfolio Manager', 'Executive Cockpit', 'Risk Manager', 'Power BI', 'AI Analytics', 'Performance', 'Contact', 'Login'],
      heroTitle: 'Powalyze — The Governance Operating System.',
      heroSubtitle: 'The platform that unifies your portfolios, data, reporting and predictive AI into a modern governance cockpit, built for organizations that demand clarity, reliability and anticipation.',
      heroCtaPrimary: 'Explore the platform',
      heroCtaSecondary: 'Create account',
      heroNote: 'Dashboard access requires a secure professional account.',
      problemTitle: 'You have tools. You don\'t yet have a governance system.',
      problemText: 'PMOs, data analysts, project leaders and executives operate in a fragmented environment: data is scattered, decisions are hard to trace, committees are long and not truly decision‑oriented, and reporting still relies too much on manual files.',
      problems: [
        'Too many projects, not enough global visibility',
        'Inconsistent, outdated or scattered data across tools',
        'Committees that are long, poorly prepared and not decision‑driven',
        'Manual, time‑consuming and unreliable reporting',
        'Decisions based on intuition rather than facts',
        'Risks detected too late, without anticipation',
        'No clear traceability of decisions and arbitrations',
        'Misalignment between PMO, leadership and teams',
        'Generic tools that don\'t understand governance and strategic steering'
      ],
      valueTitle: 'Powalyze unifies governance, data, reporting and AI in a single system.',
      valueText: 'Powalyze is designed as a Governance Operating System: it combines PMO structure, data reliability, Power BI analytics, a modern SaaS cockpit and predictive AI.',
      valueAxes: [
        { title: 'PMO', text: 'Portfolio structuring, governance rituals, committees, arbitrations, strategic indicators.' },
        { title: 'Data', text: 'Data modelling, consolidation, quality, reference data, analytical preparation.' },
        { title: 'Power BI', text: 'Executive dashboards, strategic KPIs, visual scenarios, automated reporting.' },
        { title: 'SaaS', text: 'Governance cockpit, consolidated views, fluid experience, secure multi‑user access.' },
        { title: 'Predictive AI', text: 'Weak‑signal detection, deviation forecasts, scenario simulation, intelligent recommendations.' }
      ],
      modulesTitle: 'Modules that transform your steering.',
      modules: [
        { title: 'Portfolio Manager', text: 'Global view of initiatives, prioritization, risks, dependencies, budgets and workloads.' },
        { title: 'Executive Dashboard', text: 'Automatic summaries, strategic KPIs, smart statuses, committee‑ready views.' },
        { title: 'Decision Hub', text: 'Full decision history, actions, owners, impacts and compliance.' },
        { title: 'Predictive Intelligence', text: 'Weak signals, forecasts, scenarios, recommendations to arbitrate early.' },
        { title: 'Power BI Integration', text: 'Connected executive dashboards, automated reporting, intelligent export.' },
        { title: 'Governance Engine', text: 'Rituals, roles, responsibilities, decision framework, strategic alignment.' },
        { title: 'Documents & Repositories', text: 'Secure storage, versioning, shared references, auditability.' },
        { title: 'Collaboration & Notifications', text: 'Contextual comments, mentions, smart alerts, real‑time tracking.' },
        { title: 'Integrations', text: 'Connect to your existing tools (Power BI, SharePoint, Teams, etc.).' }
      ],
      demoTitle: 'See Powalyze in action.',
      demoText: 'The demo shows a prioritized portfolio, a predictive alert, committee preparation, a documented arbitration, an updated dashboard and a decision traced in the Decision Hub.',
      demoCtas: ['Watch full demo', 'Create account to access the dashboard'],
      onboardingTitle: 'Secure access to your dashboard.',
      onboardingBlocks: [
        { title: 'Account creation', text: 'Professional email required, secure password (12+ characters), organization name, role (PMO, Executive, Data, Project Lead, Consultant, Other).' },
        { title: 'Email validation', text: 'A confirmation email is sent to activate access. The account becomes active after validation.' },
        { title: 'Login', text: 'Login with professional email and password, with a "Forgot password?" option.' },
        { title: 'Security', text: 'Isolated client spaces, encrypted data, logged access and key actions, full traceability.' },
        { title: 'Access rule', text: 'The dashboard is only accessible after login. No data is visible without authentication.' }
      ],
      resultsTitle: 'Measurable results, not promises.',
      results: [
        'Up to 50% time saved on committee preparation.',
        'Faster, better‑argued and better‑tracked decisions.',
        'Automated, reliable and consistent reporting.',
        'Risks anticipated rather than suffered.',
        'Structured, durable and auditable governance.',
        'Stronger alignment between PMO, leadership and teams.'
      ],
      finalTitle: 'Move from reactive steering to intelligent governance.',
      finalText: 'Powalyze turns your governance into a living, coherent and anticipatory system. You stay in control, gain clarity and decide faster and better.',
      finalCtas: ['Create account', 'Talk to us']
    },
    de: {
      langLabel: 'DE',
      menu: ['Startseite', 'Portfolio Manager', 'Executive Cockpit', 'Risk Manager', 'Power BI', 'AI Analytics', 'Performance', 'Kontakt', 'Anmelden'],
      heroTitle: 'Powalyze — The Governance Operating System.',
      heroSubtitle: 'Die Plattform, die Ihre Portfolios, Daten, Reports und prädiktive KI in einem modernen Governance‑Cockpit vereint – für Organisationen, die Klarheit, Verlässlichkeit und Voraussicht verlangen.',
      heroCtaPrimary: 'Plattform entdecken',
      heroCtaSecondary: 'Konto erstellen',
      heroNote: 'Der Zugriff auf das Dashboard erfordert ein sicheres berufliches Konto.',
      problemTitle: 'Sie haben Tools. Ihnen fehlt noch ein Governance‑System.',
      problemText: 'PMOs, Data Analysts, Projektleiter und Führungskräfte arbeiten in einer fragmentierten Umgebung: Daten sind verstreut, Entscheidungen schwer nachverfolgbar, Gremien lang und wenig entscheidungsorientiert, und Reporting basiert zu oft auf manuellen Dateien.',
      problems: [
        'Zu viele Projekte, zu wenig Gesamtübersicht',
        'Inkonsistente, veraltete oder verstreute Daten',
        'Lange, schlecht vorbereitete und wenig entscheidungsorientierte Gremien',
        'Manuelles, zeitaufwändiges und unzuverlässiges Reporting',
        'Entscheidungen auf Basis von Intuition statt Fakten',
        'Risiken werden zu spät erkannt, ohne Vorausschau',
        'Keine klare Nachvollziehbarkeit von Entscheidungen und Priorisierungen',
        'Fehlende Abstimmung zwischen PMO, Management und Teams',
        'Generische Tools, die Governance und Steuerung nicht verstehen'
      ],
      valueTitle: 'Powalyze vereint Governance, Daten, Reporting und KI in einem System.',
      valueText: 'Powalyze ist als Governance Operating System konzipiert: Es kombiniert PMO‑Struktur, Datenqualität, Power‑BI‑Analytik, ein modernes SaaS‑Cockpit und prädiktive KI.',
      valueAxes: [
        { title: 'PMO', text: 'Portfoliostruktur, Governance‑Routinen, Gremien, Entscheidungen, strategische Kennzahlen.' },
        { title: 'Data', text: 'Datenmodellierung, Konsolidierung, Qualität, Referenzdaten, analytische Vorbereitung.' },
        { title: 'Power BI', text: 'Management‑Dashboards, strategische KPIs, visuelle Szenarien, automatisiertes Reporting.' },
        { title: 'SaaS', text: 'Governance‑Cockpit, konsolidierte Sichten, flüssige Experience, sicherer Multi‑User‑Zugang.' },
        { title: 'Prädiktive KI', text: 'Schwachsignale, Prognosen, Szenarien, intelligente Empfehlungen.' }
      ],
      modulesTitle: 'Module, die Ihre Steuerung transformieren.',
      modules: [
        { title: 'Portfolio Manager', text: 'Gesamtübersicht über Initiativen, Priorisierung, Risiken, Abhängigkeiten, Budgets und Auslastung.' },
        { title: 'Executive Dashboard', text: 'Automatische Zusammenfassungen, strategische KPIs, intelligente Status, Gremien‑Ready.' },
        { title: 'Decision Hub', text: 'Vollständige Entscheidungshistorie, Maßnahmen, Verantwortliche, Auswirkungen und Compliance.' },
        { title: 'Predictive Intelligence', text: 'Schwachsignale, Prognosen, Szenarien, Empfehlungen für frühzeitige Entscheidungen.' },
        { title: 'Power BI Integration', text: 'Verbundene Management‑Dashboards, automatisiertes Reporting, intelligenter Export.' },
        { title: 'Governance Engine', text: 'Routinen, Rollen, Verantwortlichkeiten, Entscheidungsrahmen, strategische Ausrichtung.' },
        { title: 'Dokumente & Referenzen', text: 'Sichere Ablage, Versionierung, gemeinsame Referenzen, Auditierbarkeit.' },
        { title: 'Kollaboration & Benachrichtigungen', text: 'Kontextbezogene Kommentare, Erwähnungen, intelligente Alerts, Echtzeit‑Verfolgung.' },
        { title: 'Integrationen', text: 'Anbindung an bestehende Tools (Power BI, SharePoint, Teams usw.).' }
      ],
      demoTitle: 'Erleben Sie Powalyze in Aktion.',
      demoText: 'Die Demo zeigt ein priorisiertes Portfolio, einen prädiktiven Alert, die Vorbereitung eines Gremiums, eine dokumentierte Entscheidung, ein aktualisiertes Dashboard und eine nachverfolgbare Entscheidung im Decision Hub.',
      demoCtas: ['Komplette Demo ansehen', 'Konto erstellen und Dashboard nutzen'],
      onboardingTitle: 'Sicherer Zugriff auf Ihr Dashboard.',
      onboardingBlocks: [
        { title: 'Kontoerstellung', text: 'Berufliche E‑Mail erforderlich, sicheres Passwort (12+ Zeichen), Organisationsname, Rolle (PMO, Management, Data, Projektleitung, Beratung, Sonstige).' },
        { title: 'E‑Mail‑Bestätigung', text: 'Eine Bestätigungs‑E‑Mail wird gesendet. Nach Aktivierung ist das Konto nutzbar.' },
        { title: 'Anmeldung', text: 'Login mit beruflicher E‑Mail und Passwort, Option „Passwort vergessen?" verfügbar.' },
        { title: 'Sicherheit', text: 'Isolierte Mandantenbereiche, verschlüsselte Daten, Protokollierung von Zugriffen und Aktionen, vollständige Nachvollziehbarkeit.' },
        { title: 'Zugriffsregel', text: 'Das Dashboard ist nur nach Anmeldung zugänglich. Ohne Authentifizierung sind keine Daten sichtbar.' }
      ],
      resultsTitle: 'Messbare Ergebnisse statt Versprechen.',
      results: [
        'Bis zu 50 % Zeitersparnis bei der Gremienvorbereitung.',
        'Schnellere, besser begründete und besser nachverfolgte Entscheidungen.',
        'Automatisiertes, verlässliches und konsistentes Reporting.',
        'Risiken werden frühzeitig erkannt statt nur reagiert.',
        'Strukturierte, nachhaltige und auditierbare Governance.',
        'Stärkere Ausrichtung zwischen PMO, Management und Teams.'
      ],
      finalTitle: 'Vom reaktiven Steuern zur intelligenten Governance.',
      finalText: 'Powalyze macht Ihre Governance zu einem lebendigen, kohärenten und vorausschauenden System. Sie behalten die Kontrolle, gewinnen Klarheit und entscheiden schneller und besser.',
      finalCtas: ['Konto erstellen', 'Mit uns sprechen']
    },
    no: {
      langLabel: 'NO',
      menu: ['Hjem', 'Portfolio Manager', 'Executive Cockpit', 'Risk Manager', 'Power BI', 'AI Analytics', 'Performance', 'Kontakt', 'Logg inn'],
      heroTitle: 'Powalyze — The Governance Operating System.',
      heroSubtitle: 'Plattformen som samler porteføljer, data, rapportering og prediktiv AI i et moderne styrings‑cockpit, for organisasjoner som krever klarhet, pålitelighet og forutsigbarhet.',
      heroCtaPrimary: 'Utforsk plattformen',
      heroCtaSecondary: 'Opprett konto',
      heroNote: 'Tilgang til dashboard krever en sikker profesjonell konto.',
      problemTitle: 'Dere har verktøy. Dere har ennå ikke et styringssystem.',
      problemText: 'PMO‑er, dataanalytikere, prosjektledere og ledelse jobber i et fragmentert miljø: data er spredt, beslutninger er vanskelige å spore, møter er lange og lite beslutningsorienterte, og rapportering er fortsatt for manuelt.',
      problems: [
        'For mange prosjekter, for lite helhetsoversikt',
        'Inkonsistente, utdaterte eller spredte data',
        'Lange, dårlig forberedte og lite beslutningsorienterte møter',
        'Manuell, tidkrevende og upålitelig rapportering',
        'Beslutninger basert på intuisjon i stedet for fakta',
        'Risiko oppdages for sent, uten forvarsel',
        'Ingen tydelig sporbarhet på beslutninger og prioriteringer',
        'Manglende samspill mellom PMO, ledelse og team',
        'Generiske verktøy som ikke forstår styring og strategisk kontroll'
      ],
      valueTitle: 'Powalyze samler styring, data, rapportering og AI i ett system.',
      valueText: 'Powalyze er designet som et Governance Operating System: det kombinerer PMO‑struktur, datakvalitet, Power BI‑analyse, et moderne SaaS‑cockpit og prediktiv AI.',
      valueAxes: [
        { title: 'PMO', text: 'Porteføljestruktur, styringsritualer, møter, beslutninger, strategiske indikatorer.' },
        { title: 'Data', text: 'Datamodellering, konsolidering, kvalitet, referansedata, analytisk forberedelse.' },
        { title: 'Power BI', text: 'Leder‑dashboards, strategiske KPI‑er, visuelle scenarier, automatisert rapportering.' },
        { title: 'SaaS', text: 'Styrings‑cockpit, konsoliderte visninger, flytende opplevelse, sikker multi‑bruker tilgang.' },
        { title: 'Prediktiv AI', text: 'Svake signaler, prognoser, scenarier, intelligente anbefalinger.' }
      ],
      modulesTitle: 'Moduler som endrer måten dere styrer på.',
      modules: [
        { title: 'Portfolio Manager', text: 'Helhetsoversikt over initiativer, prioritering, risiko, avhengigheter, budsjetter og kapasitet.' },
        { title: 'Executive Dashboard', text: 'Automatiske sammendrag, strategiske KPI‑er, smarte statuser, klar for ledermøter.' },
        { title: 'Decision Hub', text: 'Full beslutningshistorikk, tiltak, ansvarlige, konsekvenser og etterlevelse.' },
        { title: 'Predictive Intelligence', text: 'Svake signaler, prognoser, scenarier, anbefalinger for tidlige beslutninger.' },
        { title: 'Power BI Integration', text: 'Koblede leder‑dashboards, automatisert rapportering, intelligent eksport.' },
        { title: 'Governance Engine', text: 'Ritualer, roller, ansvar, beslutningsrammeverk, strategisk samstemming.' },
        { title: 'Dokumenter & Referanser', text: 'Sikker lagring, versjonering, felles referanser, revisjonsspor.' },
        { title: 'Samarbeid & Varsler', text: 'Kontekstuelle kommentarer, omtaler, smarte varsler, sanntidsoppfølging.' },
        { title: 'Integrasjoner', text: 'Kobling til eksisterende verktøy (Power BI, SharePoint, Teams osv.).' }
      ],
      demoTitle: 'Se Powalyze i praksis.',
      demoText: 'Demoen viser en prioritert portefølje, et prediktivt varsel, forberedelse til et ledermøte, en dokumentert beslutning, et oppdatert dashboard og en sporbar beslutning i Decision Hub.',
      demoCtas: ['Se full demo', 'Opprett konto for å få tilgang til dashboard'],
      onboardingTitle: 'Sikker tilgang til dashboardet.',
      onboardingBlocks: [
        { title: 'Kontoopprettelse', text: 'Profesjonell e‑post kreves, sikkert passord (12+ tegn), organisasjonsnavn, rolle (PMO, ledelse, data, prosjektleder, konsulent, annet).' },
        { title: 'E‑postbekreftelse', text: 'En bekreftelses‑epost sendes. Etter aktivering er kontoen klar til bruk.' },
        { title: 'Innlogging', text: 'Innlogging med profesjonell e‑post og passord, med «Glemt passord?»‑funksjon.' },
        { title: 'Sikkerhet', text: 'Isolerte kundeområder, krypterte data, logging av tilgang og nøkkelhandlinger, full sporbarhet.' },
        { title: 'Tilgangsregel', text: 'Dashboardet er kun tilgjengelig etter innlogging. Ingen data er synlig uten autentisering.' }
      ],
      resultsTitle: 'Målbare resultater, ikke bare løfter.',
      results: [
        'Opptil 50 % tidsbesparelse i forberedelse til møter.',
        'Raskere, bedre begrunnede og bedre fulgte beslutninger.',
        'Automatisert, pålitelig og konsistent rapportering.',
        'Risiko oppdages og håndteres tidligere.',
        'Strukturert, varig og revisjonsvennlig styring.',
        'Sterkere samspill mellom PMO, ledelse og team.'
      ],
      finalTitle: 'Gå fra reaktiv styring til intelligent governance.',
      finalText: 'Powalyze gjør styringen deres til et levende, sammenhengende og forutseende system. Dere beholder kontrollen, får klarhet og tar beslutninger raskere og bedre.',
      finalCtas: ['Opprett konto', 'Snakk med oss']
    }
  };

  const t = copy[lang];

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white font-sans">
      <SEO 
        title="Powalyze - The Governance Operating System"
        description="La plateforme qui unifie vos portefeuilles, données, reportings et IA prédictive dans un cockpit de gouvernance moderne."
      />

      {/* HERO with video background */}
      <section className="relative h-screen flex flex-col">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/powalyze-demo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A1A2F]/80" />

        {/* NAVBAR */}
        <header className="relative z-10 flex items-center justify-between px-10 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#f5e3a3]" />
            <span className="text-sm tracking-[0.25em] uppercase">Powalyze</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs">
            <a href="#home" className="hover:text-[#D4AF37] transition-colors">{t.menu[0]}</a>
            <Link to="/portfolio-manager" className="hover:text-[#D4AF37] transition-colors">{t.menu[1]}</Link>
            <Link to="/executive-dashboard" className="hover:text-[#D4AF37] transition-colors">{t.menu[2]}</Link>
            <Link to="/risk-manager" className="hover:text-[#D4AF37] transition-colors">{t.menu[3]}</Link>
            <Link to="/powerbi-reports" className="hover:text-[#D4AF37] transition-colors">{t.menu[4]}</Link>
            <Link to="/ai-analytics" className="hover:text-[#D4AF37] transition-colors">{t.menu[5]}</Link>
            <Link to="/performance-monitoring" className="hover:text-[#D4AF37] transition-colors">{t.menu[6]}</Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">{t.menu[7]}</Link>
            <Link to="/login" className="hover:text-[#D4AF37] transition-colors">{t.menu[8]}</Link>
          </nav>
          <div className="flex items-center gap-2">
            {['fr', 'en', 'de', 'no'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs px-2 py-1 rounded ${
                  lang === l ? 'bg-[#D4AF37] text-black' : 'bg-transparent border border-white/20'
                }`}
              >
                {copy[l].langLabel}
              </button>
            ))}
          </div>
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            Governance · Portfolios · Data · AI
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{t.heroTitle}</h1>
          <p className="text-sm md:text-base text-white/80 mb-6">{t.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3 mb-3">
            <button className="px-5 py-2.5 rounded-md bg-[#D4AF37] text-black text-sm font-medium">
              {t.heroCtaPrimary}
            </button>
            <Link to="/signup" className="px-5 py-2.5 rounded-md border border-white/40 text-sm font-medium">
              {t.heroCtaSecondary}
            </Link>
          </div>
          <p className="text-xs text-white/60">{t.heroNote}</p>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-white text-[#0A1A2F] py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-4"
          >
            {t.problemTitle}
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-neutral-700 mb-6"
          >
            {t.problemText}
          </motion.p>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-neutral-800 mb-4">
            {t.problems.map((p, idx) => (
              <motion.li 
                key={p}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-2"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-[#0A1A2F] text-white py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-4"
          >
            {t.valueTitle}
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-white/80 mb-8"
          >
            {t.valueText}
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {t.valueAxes.map((ax, idx) => (
              <motion.div 
                key={ax.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="border border-white/10 rounded-lg p-4 bg-white/5"
              >
                <h3 className="text-sm font-semibold text-[#D4AF37] mb-2">{ax.title}</h3>
                <p className="text-white/80">{ax.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES SECTION */}
      <section className="bg-white text-[#0A1A2F] py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-6"
          >
            {t.modulesTitle}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {t.modules.map((m, idx) => (
              <motion.div 
                key={m.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.05 }}
                className="border border-neutral-200 rounded-lg p-4"
              >
                <h3 className="text-sm font-semibold text-[#0A1A2F] mb-2">{m.title}</h3>
                <p className="text-neutral-700">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="bg-[#0A1A2F] text-white py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-4"
          >
            {t.demoTitle}
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-white/80 mb-6"
          >
            {t.demoText}
          </motion.p>
          <div className="flex flex-wrap gap-3 mb-8">
            {t.demoCtas.map((c) => (
              <button
                key={c}
                className="px-5 py-2.5 rounded-md border border-white/40 text-sm font-medium hover:bg-white/10"
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20">
            <video className="w-full h-full object-cover" controls>
              <source src="/videos/powalyze-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ONBOARDING SECTION */}
      <section className="bg-white text-[#0A1A2F] py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-6"
          >
            {t.onboardingTitle}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            {t.onboardingBlocks.map((b, idx) => (
              <motion.div 
                key={b.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="border border-neutral-200 rounded-lg p-4"
              >
                <h3 className="text-sm font-semibold mb-2">{b.title}</h3>
                <p className="text-neutral-700">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS + CTA SECTION */}
      <section className="bg-[#0A1A2F] text-white py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl font-semibold mb-4"
          >
            {t.resultsTitle}
          </motion.h2>
          <ul className="space-y-2 text-sm text-white/80 mb-8">
            {t.results.map((r, idx) => (
              <motion.li 
                key={r}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-2"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span>{r}</span>
              </motion.li>
            ))}
          </ul>
          <motion.h3 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-xl font-semibold mb-3"
          >
            {t.finalTitle}
          </motion.h3>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-white/80 mb-6"
          >
            {t.finalText}
          </motion.p>
          <div className="flex flex-wrap gap-3">
            <Link to="/signup" className="px-5 py-2.5 rounded-md bg-[#D4AF37] text-black text-sm font-medium">
              {t.finalCtas[0]}
            </Link>
            <Link to="/contact" className="px-5 py-2.5 rounded-md border border-white/40 text-sm font-medium">
              {t.finalCtas[1]}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white/60 text-xs py-6 px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Powalyze — Governance Operating System.</span>
          <div className="flex gap-4">
            <Link to="/legal" className="hover:text-white">Legal</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

