import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gauge, TrendingUp, Brain, Zap, Target, AlertTriangle,
  Activity, BarChart3, PieChart, Users, Clock, Shield,
  ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const CockpitExecutif = () => {
  const features = [
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Dashboard Temps Réel",
      description: "Indicateurs critiques actualisés automatiquement. Vue instantanée de la santé de votre organisation en un coup d'œil."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Decision Engine",
      description: "Recommandations stratégiques basées sur l'analyse de 50+ paramètres. Intelligence artificielle pour guider vos arbitrages."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Pulse",
      description: "Indice propriétaire mesurant l'alignement stratégique global. Score de 0 à 100 avec détection des écarts critiques."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Early Warning Alerts",
      description: "Système d'alerte précoce intelligent. Notification des risques critiques avant qu'ils n'impactent vos objectifs."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "KPI Critiques",
      description: "Budget, planning, ressources, risques en temps réel. Drill-down illimité pour analyse approfondie."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Portfolio Health Score",
      description: "Score de santé global du portefeuille. Analyse multi-dimensionnelle avec indicateurs de tendance."
    }
  ];

  const kpiCategories = [
    {
      category: "Performance Financière",
      kpis: [
        { name: "Budget Consommé vs Planifié", value: "78% / 75%", status: "warning" },
        { name: "ROI Portfolio", value: "+24%", status: "success" },
        { name: "Coût par Initiative", value: "$325K", status: "neutral" }
      ]
    },
    {
      category: "Livraison & Timing",
      kpis: [
        { name: "Projets On-Time", value: "67%", status: "warning" },
        { name: "Délai Moyen de Livraison", value: "-12 jours", status: "success" },
        { name: "Jalons Critiques À Venir", value: "14", status: "neutral" }
      ]
    },
    {
      category: "Risques & Qualité",
      kpis: [
        { name: "Risques Critiques Ouverts", value: "3", status: "critical" },
        { name: "Score de Qualité Moyen", value: "8.2/10", status: "success" },
        { name: "Incidents Majeurs", value: "1", status: "warning" }
      ]
    },
    {
      category: "Ressources & Capacité",
      kpis: [
        { name: "Taux d'Utilisation", value: "92%", status: "critical" },
        { name: "Compétences Manquantes", value: "5", status: "warning" },
        { name: "Turnover Projet", value: "8%", status: "neutral" }
      ]
    }
  ];

  const benefits = [
    {
      stat: "10min",
      label: "Préparation Comité",
      description: "Au lieu de 3 jours de consolidation manuelle"
    },
    {
      stat: "100%",
      label: "Données Temps Réel",
      description: "Fini les reportings obsolètes dès leur présentation"
    },
    {
      stat: "5x",
      label: "Décisions Plus Rapides",
      description: "Accès instantané aux données critiques pour arbitrages"
    },
    {
      stat: "85%",
      label: "Risques Anticipés",
      description: "Détection précoce avant impact critique"
    }
  ];

  const useCases = [
    {
      role: "CEO / General Manager",
      challenge: "Impossible de piloter efficacement sans vision consolidée temps réel",
      solution: "Dashboard exécutif avec Strategic Pulse et KPI critiques actualisés automatiquement"
    },
    {
      role: "CFO",
      challenge: "Consolidation budget manuelle fastidieuse et sujette aux erreurs",
      solution: "Vue financière temps réel avec drill-down projet par projet et alertes de dérive"
    },
    {
      role: "CIO / COO",
      challenge: "Préparation Comités de Direction trop chronophage",
      solution: "Rapports exécutifs auto-générés avec analyse d'impact et recommandations IA"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <>
      <SEO 
        title="Cockpit Exécutif - Dashboard Temps Réel pour Décisions Stratégiques"
        description="Tableau de bord exécutif temps réel avec KPI critiques, AI Decision Engine et Strategic Pulse pour piloter votre organisation."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-24 bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,102,255,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#4A9EFF]/30 bg-[#4A9EFF]/10 rounded-full mb-8 text-sm text-[#4A9EFF]">
              <Gauge className="w-4 h-4" />
              <span>Cockpit Exécutif</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight mb-8 text-white">
              Dashboard Temps Réel pour<br />
              <span className="text-[#4A9EFF]">Décisions Stratégiques</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Pilotez votre organisation avec des KPI critiques actualisés en temps réel et une intelligence artificielle qui guide vos arbitrages
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-[#4A9EFF] text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Accéder au Cockpit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-[#4A9EFF] hover:text-[#4A9EFF] transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir la Démo Live
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-light text-[#4A9EFF] mb-2">{benefit.stat}</div>
                  <div className="text-sm font-medium text-white mb-1">{benefit.label}</div>
                  <div className="text-xs text-white/60">{benefit.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Fonctionnalités Premium
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Un cockpit exécutif conçu pour les décideurs stratégiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-[#4A9EFF]/30 transition-all group"
              >
                <div className="w-12 h-12 bg-[#4A9EFF]/10 border border-[#4A9EFF]/20 rounded-sm flex items-center justify-center mb-6 text-[#4A9EFF] group-hover:bg-[#4A9EFF]/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-light mb-4 text-white">{feature.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI Preview Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#000000] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              KPI Critiques
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Exemple de dashboard exécutif avec indicateurs temps réel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {kpiCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <h3 className="text-xl font-light mb-6 text-white flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#4A9EFF]" />
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.kpis.map((kpi, kpiIndex) => (
                    <div key={kpiIndex} className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{kpi.name}</span>
                      <span className={`text-sm font-medium ${getStatusColor(kpi.status)}`}>
                        {kpi.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
              Cas d'Usage Exécutif
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Comment le Cockpit Exécutif transforme le pilotage stratégique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8"
              >
                <div className="text-sm font-medium text-[#4A9EFF] uppercase tracking-wider mb-4">
                  {useCase.role}
                </div>
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Challenge</div>
                  <p className="text-white/60 font-light">{useCase.challenge}</p>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Solution Cockpit</div>
                  <p className="text-white font-light">{useCase.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#000000] to-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-white">
            Prêt à Piloter Votre Organisation<br />avec Intelligence ?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Accédez au Cockpit Exécutif et prenez des décisions stratégiques basées sur des données temps réel
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-[#4A9EFF] text-white font-medium hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
            >
              Démarrer Gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 border border-white/20 text-white font-light hover:border-[#4A9EFF] hover:text-[#4A9EFF] transition-all rounded-sm text-sm uppercase tracking-wide"
            >
              Contacter un Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CockpitExecutif;
