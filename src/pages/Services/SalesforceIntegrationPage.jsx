import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Cloud, Check, ArrowRight, Zap, Shield, TrendingUp, Bot, Sparkles, BarChart3, Database, Lock, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SalesforceIntegrationPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Intégration Salesforce + IA Générative | Powalyze</title>
        <meta name="description" content="Connectez Salesforce CRM avec vos outils de pilotage PMO et IA générative pour une vue 360° intelligente de vos projets clients." />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A1E0]/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#00A1E0] blur-[150px] opacity-10"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A1E0]/20 to-purple-500/20 border border-[#00A1E0]/30 px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-[#00A1E0]" size={16} />
                <span className="text-xs uppercase tracking-wider text-[#00A1E0] font-semibold">IA Générative + CRM</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Salesforce + <span className="bg-gradient-to-r from-[#00A1E0] to-purple-400 bg-clip-text text-transparent">IA Générative</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Synchronisez Sales Cloud, Service Cloud et Marketing Cloud avec vos projets PMO. <span className="text-white font-semibold">L'IA générative analyse vos données Salesforce</span> pour prédire les opportunités, optimiser vos campagnes et générer des insights automatiquement.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/pmo-360-demo">
                  <Button className="h-14 px-8 bg-gradient-to-r from-[#00A1E0] to-blue-600 text-white hover:from-[#0081B8] hover:to-blue-700 font-bold text-lg shadow-lg shadow-[#00A1E0]/30">
                    <Bot className="mr-2" size={20} />
                    Démo IA + Salesforce
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
              {/* Visual Hero Image with IA Badge */}
              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl border border-[#00A1E0]/30 p-8 shadow-2xl relative overflow-hidden">
                {/* IA Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-purple-500/20 to-[#00A1E0]/20 backdrop-blur-sm border border-purple-400/30 px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-purple-400" />
                      <span className="text-xs font-semibold text-purple-300">IA Générative</span>
                    </div>
                  </div>
                </div>

                {/* Salesforce Logo Area */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00A1E0]/30 to-blue-600/30 rounded-2xl flex items-center justify-center shadow-lg">
                    <Cloud size={40} className="text-[#00A1E0]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Salesforce Cloud Ecosystem</div>
                    <div className="text-2xl font-bold">CRM 360° + IA</div>
                  </div>
                </div>

                {/* Connected Services */}
                <div className="space-y-3">
                  {[
                    { name: 'Sales Cloud', icon: TrendingUp, ai: 'Prédiction opportunités' },
                    { name: 'Service Cloud', icon: Shield, ai: 'Support intelligent' },
                    { name: 'Marketing Cloud', icon: Sparkles, ai: 'Campagnes auto-optimisées' },
                    { name: 'Analytics + Einstein AI', icon: BarChart3, ai: 'Insights génératifs' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 hover:border-[#00A1E0]/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00A1E0]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00A1E0]/20 transition-all">
                          <item.icon size={20} className="text-[#00A1E0]" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-purple-400">
                        <Bot size={14} />
                        <span className="hidden sm:inline">{item.ai}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* IA Générative Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0A0A0A] via-purple-950/5 to-[#0F0F0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 px-6 py-3 rounded-full mb-6">
              <Bot className="text-purple-400" size={20} />
              <span className="text-sm uppercase tracking-wider text-purple-300 font-bold">Propulsé par IA Générative</span>
            </div>
            <h2 className="text-5xl font-display font-bold mb-6">
              Salesforce <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Intelligent</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Notre IA générative analyse en continu vos données Salesforce pour générer des insights actionnables, automatiser les tâches répétitives et prédire les tendances futures.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Génération Auto de Rapports',
                desc: 'L\'IA rédige automatiquement des résumés exécutifs de vos données Salesforce en langage naturel',
                gradient: 'from-purple-500/20 to-pink-500/20',
                border: 'purple-500/30'
              },
              {
                icon: TrendingUp,
                title: 'Prédiction d\'Opportunités',
                desc: 'Analyse prédictive du pipeline : taux de conversion, probabilité de closing, montant estimé',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                border: 'blue-500/30'
              },
              {
                icon: Bot,
                title: 'Assistant IA Conversationnel',
                desc: 'Posez des questions en langage naturel sur vos données CRM, obtenez des réponses instantanées',
                gradient: 'from-green-500/20 to-emerald-500/20',
                border: 'green-500/30'
              },
              {
                icon: Workflow,
                title: 'Automatisation Intelligente',
                desc: 'Workflows auto-optimisés : enrichissement leads, scoring contacts, routage intelligent des tickets',
                gradient: 'from-orange-500/20 to-red-500/20',
                border: 'orange-500/30'
              }
            ].map((feature, i) => (
              <div key={i} className={`bg-gradient-to-br ${feature.gradient} border border-${feature.border} rounded-2xl p-6 hover:scale-105 transition-transform duration-300`}>
                <div className="w-14 h-14 bg-black/50 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-[#0F0F0F]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Fonctionnalités Clés d'Intégration</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une intégration native et bidirectionnelle pour piloter vos projets clients avec l'intelligence artificielle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Sync Temps Réel + IA',
                desc: 'Données Salesforce synchronisées toutes les 5 min avec analyse IA automatique pour détecter anomalies et tendances',
                color: '#00A1E0',
                badge: 'Temps réel'
              },
              {
                icon: Shield,
                title: 'Sécurité Enterprise + Audit IA',
                desc: 'OAuth 2.0, encryption SSL/TLS, conformité GDPR. L\'IA audite automatiquement les accès suspects',
                color: '#BFA76A',
                badge: 'Sécurisé'
              },
              {
                icon: Database,
                title: 'Data Warehouse Intelligent',
                desc: 'Centralisation Salesforce + PMO dans un lac de données. IA pour nettoyage et enrichissement automatique',
                color: '#4ADE80',
                badge: 'Smart Data'
              },
              {
                icon: BarChart3,
                title: 'Analytics Prédictif IA',
                desc: 'Prédiction de churn clients, scoring opportunités, forecast revenue basé sur ML avancé',
                color: '#8B5CF6',
                badge: 'Prédictif'
              },
              {
                icon: Lock,
                title: 'Gouvernance + Compliance IA',
                desc: 'L\'IA vérifie automatiquement la conformité RGPD de vos workflows Salesforce et alerte en cas de risque',
                color: '#EF4444',
                badge: 'Compliance'
              },
              {
                icon: Workflow,
                title: 'Orchestration Multi-Cloud',
                desc: 'Intégration Salesforce + SAP + Microsoft 365. IA pour routage intelligent des données entre systèmes',
                color: '#F59E0B',
                badge: 'Multi-cloud'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-[#00A1E0]/50 transition-all group relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-semibold border border-purple-400/30">
                    {feature.badge}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-black/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases with IA */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Cas d'Usage <span className="text-purple-400">IA</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comment l'IA générative transforme votre expérience Salesforce au quotidien
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Portfolio Client 360° Intelligent',
                desc: 'L\'IA associe automatiquement chaque opportunité Salesforce à un projet PMO, suggère des allocations de ressources optimales et prédit les risques de dérapage. Tracking intelligent des jalons avec alertes prédictives.',
                metrics: ['95% précision IA', '4h/semaine économisées', 'ROI +40%'],
                icon: BarChart3,
                aiFeature: 'IA générative analyse les patterns historiques pour recommander la meilleure stratégie projet'
              },
              {
                title: 'Reporting Exécutif Auto-Généré',
                desc: 'Dashboards Power BI alimentés par Salesforce + IA. L\'assistant IA rédige automatiquement des résumés exécutifs en langage naturel, extrait les insights clés et génère des recommandations actionnables.',
                metrics: ['Mise à jour temps réel', '12 KPIs + insights IA', 'Alertes prédictives'],
                icon: Sparkles,
                aiFeature: 'Génération automatique de rapports narratifs à partir des données brutes'
              },
              {
                title: 'Prévision Revenue + Prédiction ML',
                desc: 'IA avancée qui analyse l\'historique Salesforce sur 5 ans pour prédire les délais projets, ajuster les forecasts commerciaux et détecter les opportunités sous-estimées. Machine Learning continuellement entraîné sur vos données.',
                metrics: ['Précision 92%', 'Anticipation 6 mois', 'Réduction risque -45%'],
                icon: TrendingUp,
                aiFeature: 'Modèle ML propriétaire entraîné sur 10M+ de deals pour prédire votre pipeline'
              },
              {
                title: 'Gestion Ressources Augmentée par IA',
                desc: 'Allocation intelligente des équipes basée sur le pipeline Salesforce, compétences disponibles et charge prévisionnelle. L\'IA équilibre automatiquement les workloads et détecte les goulots d\'étranglement avant qu\'ils ne surviennent.',
                metrics: ['Taux utilisation 95%', 'Conflits -75%', 'Satisfaction équipe +35%'],
                icon: Workflow,
                aiFeature: 'Optimisation continue par algorithmes génétiques pour le staffing optimal'
              }
            ].map((usecase, i) => (
              <div key={i} className="bg-gradient-to-br from-[#111] via-[#111] to-purple-950/10 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <usecase.icon size={28} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{usecase.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">{usecase.desc}</p>
                
                {/* IA Feature Highlight */}
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Bot size={20} className="text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-200">{usecase.aiFeature}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {usecase.metrics.map((metric, j) => (
                    <span key={j} className="text-xs bg-gradient-to-r from-[#00A1E0]/20 to-purple-500/20 text-white px-4 py-2 rounded-full font-semibold border border-[#00A1E0]/30">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#111] via-purple-950/20 to-[#111] border border-[#00A1E0]/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00A1E0]/10 via-purple-500/10 to-transparent blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A1E0]/10 to-purple-500/10 border border-[#00A1E0]/30 px-6 py-3 rounded-full mb-8">
                <Sparkles className="text-purple-400" size={18} />
                <span className="text-sm font-semibold text-white">Installation 48h • Formation IA incluse • Support 24/7</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Prêt à connecter Salesforce avec l'<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">IA Générative</span> ?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Rejoignez les <span className="text-white font-bold">+150 entreprises</span> qui pilotent leur CRM avec l'IA. Démo personnalisée en 30 min.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pmo-360-demo">
                  <Button className="h-16 px-10 bg-gradient-to-r from-[#00A1E0] to-blue-600 text-white hover:from-[#0081B8] hover:to-blue-700 font-bold text-lg shadow-xl shadow-[#00A1E0]/30 group">
                    <Bot className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                    Démo IA + Salesforce
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg">
                    Parler à un expert
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-green-500" />
                  <span>Certifié Salesforce Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-blue-500" />
                  <span>GDPR & SOC2</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-500" />
                  <span>Propulsé par IA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SalesforceIntegrationPage;
