import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Shield, 
  Zap,
  CheckCircle,
  Lock,
  Globe,
  Users,
  Target,
  BarChart3,
  FileText,
  Bell,
  Network,
  Mail,
  KeyRound,
  UserCheck
} from 'lucide-react';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState('fr');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const languages = {
    fr: {
      flag: '🇫🇷',
      hero: {
        title: 'La plateforme de gouvernance stratégique qui unifie vos portefeuilles, données et décisions',
        subtitle: 'Powalyze combine l\'excellence PMO, la rigueur suisse, la puissance de l\'analyse de données, la précision de Power BI et l\'anticipation de l\'IA prédictive.',
        cta1: 'Découvrir la plateforme',
        cta2: 'Créer un compte',
        security: 'L\'accès au tableau de bord nécessite un compte professionnel sécurisé (email professionnel + mot de passe 12+ caractères).'
      },
      menu: ['Accueil', 'Plateforme', 'Modules', 'Gouvernance & IA', 'Cas d\'usage', 'Tarifs', 'À propos', 'Contact', 'Connexion', 'Créer un compte']
    },
    en: {
      flag: '🇬🇧',
      hero: {
        title: 'The strategic governance platform that unifies your portfolios, data and decisions',
        subtitle: 'Powalyze combines PMO excellence, Swiss rigor, data analysis power, Power BI precision and predictive AI anticipation.',
        cta1: 'Discover the platform',
        cta2: 'Create an account',
        security: 'Dashboard access requires a secure professional account (professional email + 12+ character password).'
      },
      menu: ['Home', 'Platform', 'Modules', 'Governance & AI', 'Use Cases', 'Pricing', 'About', 'Contact', 'Login', 'Create Account']
    },
    de: {
      flag: '🇩🇪',
      hero: {
        title: 'Die strategische Governance-Plattform, die Ihre Portfolios, Daten und Entscheidungen vereint',
        subtitle: 'Powalyze kombiniert PMO-Exzellenz, Schweizer Präzision, Datenanalysekraft, Power BI-Genauigkeit und vorausschauende KI.',
        cta1: 'Plattform entdecken',
        cta2: 'Konto erstellen',
        security: 'Der Dashboard-Zugang erfordert ein sicheres professionelles Konto (professionelle E-Mail + Passwort mit 12+ Zeichen).'
      },
      menu: ['Startseite', 'Plattform', 'Module', 'Governance & KI', 'Anwendungsfälle', 'Preise', 'Über uns', 'Kontakt', 'Anmelden', 'Konto erstellen']
    },
    no: {
      flag: '🇳🇴',
      hero: {
        title: 'Den strategiske styringsplattformen som forener porteføljer, data og beslutninger',
        subtitle: 'Powalyze kombinerer PMO-ekspertise, sveitsisk presisjon, dataanalysekraft, Power BI-nøyaktighet og prediktiv AI.',
        cta1: 'Oppdag plattformen',
        cta2: 'Opprett konto',
        security: 'Dashboard-tilgang krever en sikker profesjonell konto (profesjonell e-post + passord med 12+ tegn).'
      },
      menu: ['Hjem', 'Plattform', 'Moduler', 'Styring & AI', 'Brukstilfeller', 'Priser', 'Om oss', 'Kontakt', 'Logg inn', 'Opprett konto']
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <SEO 
        title="Powalyze - Plateforme de Gouvernance Stratégique Suisse & International"
        description="La plateforme de gouvernance stratégique qui unifie vos portefeuilles, vos données et vos décisions. Excellence PMO, rigueur suisse, IA prédictive."
      />
      <Header />

      {/* HERO SECTION - Vidéo Background Full-Screen (Style 14h30) */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#000000] to-[#2d1810]" />
          {/* Gradient placeholder - ready for MP4 video */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Overlay noir transparent */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24">
          {/* Language Selector */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 mb-12"
          >
            {Object.keys(languages).map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeLang === lang 
                    ? 'bg-[#D4AF37] text-black font-semibold' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                }`}
              >
                {languages[lang].flag} {lang.toUpperCase()}
              </button>
            ))}
          </motion.div>

          {/* Hero Content - Centré */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-8 text-white leading-tight">
              La plateforme suisse de gouvernance stratégique qui transforme vos données en décisions.
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light max-w-4xl mx-auto">
              Un cockpit de gouvernance moderne, conçu pour structurer vos portefeuilles, fiabiliser vos données et anticiper vos décisions grâce à l'IA.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="#modules"
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#B8976A] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Découvrir la plateforme
              </a>
              <Link
                to="/signup"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              >
                Créer un compte
              </Link>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3">
                <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  L'accès au tableau de bord nécessite un compte professionnel sécurisé.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 - LE PROBLÈME (version noir + or) */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-white">
              Votre organisation ne manque pas d'outils.<br />
              <span className="text-[#D4AF37]">Elle manque d'un système.</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-lg text-gray-300 mb-8 text-center">
              Les PMO, Data Analysts, chefs de projets et directions stratégiques font face à :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Trop de projets, pas assez de visibilité',
                'Données incohérentes ou dispersées',
                'Comités trop longs, peu décisionnels',
                'Reporting manuel, chronophage, non fiable',
                'Décisions basées sur l\'intuition',
                'Risques détectés trop tard',
                'Aucun suivi clair des arbitrages',
                'Manque d\'anticipation',
                'Outils génériques inadaptés'
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-[#D4AF37] mt-0.5">•</div>
                    <p className="text-gray-200 text-sm">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl text-[#D4AF37] font-light">
              Powalyze résout ces problèmes en unifiant gouvernance, données, reporting et IA dans un système cohérent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - LE CONCEPT (style vidéo background, noir + or) */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-white">
              Powalyze n'est pas un outil.<br />
              <span className="text-[#D4AF37]">C'est votre Operating System de gouvernance.</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-xl text-gray-300 mb-10 text-center font-light">
              Un OS stratégique qui combine :
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Shield className="w-10 h-10" />,
                  title: 'PMO',
                  desc: 'structure, rituels, comités, arbitrages'
                },
                {
                  icon: <TrendingUp className="w-10 h-10" />,
                  title: 'Data',
                  desc: 'fiabilité, consolidation, modèles'
                },
                {
                  icon: <LayoutDashboard className="w-10 h-10" />,
                  title: 'Power BI',
                  desc: 'visibilité exécutive'
                },
                {
                  icon: <Globe className="w-10 h-10" />,
                  title: 'SaaS',
                  desc: 'cockpit de gouvernance'
                },
                {
                  icon: <Zap className="w-10 h-10" />,
                  title: 'IA prédictive',
                  desc: 'anticipation, signaux faibles, scénarios'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
                >
                  <div className="text-[#D4AF37] mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <p className="text-xl text-white font-light">Tout est intégré.</p>
            <p className="text-xl text-white font-light">Tout est cohérent.</p>
            <p className="text-xl text-[#D4AF37] font-semibold">Tout est orienté décision.</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - LES MODULES (présentation noir + or, style premium) */}
      <section id="modules" className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-white">
              Les modules de votre <span className="text-[#D4AF37]">Operating System</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                number: '1',
                title: 'Portfolio Manager',
                desc: 'Structurez vos projets, programmes et portefeuilles avec une clarté totale.'
              },
              {
                icon: <BarChart3 className="w-10 h-10" />,
                number: '2',
                title: 'Executive Dashboard',
                desc: 'Une vue exécutive conçue pour les comités : synthèses, KPI, arbitrages.'
              },
              {
                icon: <CheckCircle className="w-10 h-10" />,
                number: '3',
                title: 'Decision Hub',
                desc: 'Toutes les décisions, actions, risques et documents — tracés, centralisés, auditables.'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                number: '4',
                title: 'Predictive Intelligence',
                desc: 'Détection des signaux faibles, prévisions, scénarios, recommandations intelligentes.'
              },
              {
                icon: <LayoutDashboard className="w-10 h-10" />,
                number: '5',
                title: 'Power BI Integration',
                desc: 'Dashboards stratégiques, automatisation, export intelligent.'
              },
              {
                icon: <Shield className="w-10 h-10" />,
                number: '6',
                title: 'Governance Engine',
                desc: 'Rituels, rôles, responsabilités, conformité, alignement stratégique.'
              }
            ].map((module, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group relative"
              >
                <div className="absolute top-4 right-4 text-5xl font-extralight text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-all">
                  {module.number}
                </div>
                <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{module.title}</h3>
                <p className="text-gray-300 leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - ONBOARDING PREMIUM (accès sécurisé) */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-center text-white">
              Accédez à votre <span className="text-[#D4AF37]">tableau de bord sécurisé</span>.
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Pour garantir la confidentialité et la conformité :
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: 'Email professionnel obligatoire',
                  desc: 'Validation du domaine en temps réel'
                },
                {
                  icon: <KeyRound className="w-8 h-8" />,
                  title: 'Mot de passe sécurisé',
                  desc: '12+ caractères minimum avec complexité'
                },
                {
                  icon: <UserCheck className="w-8 h-8" />,
                  title: 'Validation par email',
                  desc: 'Lien de confirmation instantané'
                },
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: 'Espaces isolés et chiffrés',
                  desc: 'AES-256 pour chaque organisation'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Journalisation des accès',
                  desc: 'Audit trail complet et permanent'
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: 'Traçabilité complète',
                  desc: 'Conformité RGPD, ISO 27001, SOC 2'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                  <div className="text-[#D4AF37] mb-4">{item.icon}</div>
                  <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/5 p-8 rounded-xl border border-[#D4AF37]/30 mb-10">
              <p className="text-center text-xl text-white font-light">
                Le tableau de bord n'est accessible qu'après connexion.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-10 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#B8976A] transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Créer un compte
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-lg"
              >
                Connexion sécurisée
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 - RÉSULTATS (version consulting) */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-center text-white">
              Des résultats <span className="text-[#D4AF37]">mesurables, immédiats, durables</span>.
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-12">
              {[
                {
                  metric: '50%',
                  desc: 'de temps gagné sur la préparation des comités'
                },
                {
                  metric: '3x',
                  desc: 'Décisions plus rapides et mieux argumentées'
                },
                {
                  metric: '100%',
                  desc: 'Reporting automatisé et fiable'
                },
                {
                  metric: '80%',
                  desc: 'Risques anticipés'
                },
                {
                  metric: '95%',
                  desc: 'Gouvernance durable'
                },
                {
                  metric: '85%',
                  desc: 'Alignement PMO / Direction / Terrain'
                }
              ].map((result, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 text-center hover:border-[#D4AF37]/50 transition-all"
                >
                  <div className="text-5xl font-bold text-[#D4AF37] mb-3">{result.metric}</div>
                  <p className="text-sm text-gray-300">{result.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 - CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-[#D4AF37]/10 via-[#0A1628] to-[#0F1B2E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-white">
              Passez d’un pilotage réactif à un <span className="text-[#D4AF37]">pilotage intelligent</span>.
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Rejoignez les organisations qui gouvernent avec précision, anticipé et impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-10 py-5 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#B8976A] transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Créer un compte
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-lg"
              >
                Être accompagné
              </Link>
            </div>
            
            <p className="text-xs text-gray-400 mt-8">
              Traductions disponibles : 🇫🇷 Français · 🇬🇧 English · 🇩🇪 Deutsch · 🇳🇴 Norsk
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

