import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { LayoutDashboard, TrendingUp, AlertCircle, CheckCircle, BarChart3, Clock } from 'lucide-react';

const ExecutiveDashboard = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <LayoutDashboard className="w-12 h-12" />,
      title: 'Vue Exécutive Consolidée',
      description: 'Dashboard synthétique conçu pour les comités de direction avec les informations essentielles en un coup d\'œil.'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'KPI Stratégiques',
      description: 'Indicateurs critiques de performance, tendances, évolutions et alertes pour une prise de décision éclairée.'
    },
    {
      icon: <AlertCircle className="w-12 h-12" />,
      title: 'Alertes & Signaux',
      description: 'Détection automatique des projets en risque, dérives budgétaires, retards critiques et points de vigilance.'
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Préparation de Comités',
      description: 'Synthèses automatiques, points de décision, arbitrages à valider et historique des décisions précédentes.'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: 'Visualisations Avancées',
      description: 'Graphiques interactifs, heatmaps, matrices de risques et tableaux de bord personnalisables par rôle.'
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: 'Temps Réel',
      description: 'Données actualisées en continu, synchronisation avec vos outils et vision toujours à jour de votre portefeuille.'
    }
  ];

  const kpis = [
    'Taux d\'avancement global du portefeuille',
    'Santé financière et écarts budgétaires',
    'Niveau de risque consolidé',
    'Utilisation des ressources et capacité',
    'ROI et création de valeur',
    'Vélocité et productivité des équipes'
  ];

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white">
      <SEO 
        title="Cockpit Exécutif - Powalyze"
        description="Dashboard temps réel pour les décisions stratégiques avec KPI critiques, alertes intelligentes et préparation de comités automatisée."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#1a2332] to-[#0A1A2F]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6">
              <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37] uppercase tracking-wider">Cockpit Exécutif</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Dashboard Temps Réel pour <br />
              <span className="text-[#D4AF37]">Décisions Stratégiques</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Une vue exécutive consolidée avec KPI critiques, alertes intelligentes et préparation automatique de vos comités de direction.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c5a033] transition-all"
              >
                Voir une démo
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-white text-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pilotage Exécutif Intelligent
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Toutes les informations critiques pour vos comités et décisions stratégiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl hover:border-[#D4AF37] transition-all group"
              >
                <div className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-20 px-6 md:px-16 bg-[#0A1A2F]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a2332] to-[#0A1A2F] rounded-xl border border-white/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <BarChart3 className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-gray-400">Dashboard interactif en temps réel</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                KPI <span className="text-[#D4AF37]">Critiques</span> & Indicateurs Stratégiques
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Visualisez en un coup d'œil la santé de votre portefeuille et identifiez les points d'attention qui nécessitent votre arbitrage.
              </p>
              <ul className="space-y-4">
                {kpis.map((kpi, idx) => (
                  <motion.li
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="text-gray-300">{kpi}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-br from-[#D4AF37]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prenez de <span className="text-[#D4AF37]">Meilleures Décisions</span> Plus Rapidement
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Avec le Cockpit Exécutif, vos comités sont mieux préparés et vos décisions sont basées sur des données fiables
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c5a033] transition-all"
              >
                Commencer maintenant
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Planifier une démo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExecutiveDashboard;
