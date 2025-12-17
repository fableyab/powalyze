import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Target, Check, ArrowRight, Shield, TrendingUp, Bot, Sparkles, BarChart3, Users, Workflow, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PMOGovernancePage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Helmet>
        <title>PMO & Gouvernance + IA Générative | Powalyze</title>
        <meta name="description" content="Alignez vos portefeuilles de projets avec l'IA générative. Pilotage stratégique, priorisation intelligente et optimisation des ressources." />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/10 via-transparent to-purple-500/5"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#BFA76A] blur-[150px] opacity-10"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BFA76A]/20 to-purple-500/20 border border-[#BFA76A]/30 px-4 py-2 rounded-full mb-6">
                <Sparkles className="text-[#BFA76A]" size={16} />
                <span className="text-xs uppercase tracking-wider text-[#BFA76A] font-semibold">Strategic PMO + IA</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                PMO & Gouvernance
                <br />
                <span className="bg-gradient-to-r from-[#BFA76A] to-amber-400 bg-clip-text text-transparent">Augmentée par IA</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Alignez vos portefeuilles de projets avec la stratégie globale grâce à l'<span className="text-white font-semibold">IA générative</span>. Pilotage stratégique, priorisation intelligente et optimisation automatique des ressources par machine learning.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/pmo-360-demo">
                  <Button className="h-14 px-8 bg-gradient-to-r from-[#BFA76A] to-amber-600 text-black hover:from-amber-600 hover:to-[#BFA76A] font-bold text-lg shadow-lg shadow-[#BFA76A]/30">
                    <Bot className="mr-2" size={20} />
                    Démo PMO + IA
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Hero with IA Badge */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl border border-[#BFA76A]/30 p-8 shadow-2xl relative overflow-hidden">
                {/* IA Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-purple-500/20 to-[#BFA76A]/20 backdrop-blur-sm border border-purple-400/30 px-4 py-2 rounded-full">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-purple-400" />
                      <span className="text-xs font-semibold text-purple-300">IA Générative</span>
                    </div>
                  </div>
                </div>

                {/* PMO Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#BFA76A]/30 to-amber-600/30 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target size={40} className="text-[#BFA76A]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Strategic PMO Platform</div>
                    <div className="text-2xl font-bold">Governance 360°</div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {[
                    { name: 'Portfolio Prioritization', icon: TrendingUp, ai: 'IA calcule les scores' },
                    { name: 'Resource Optimization', icon: Users, ai: 'ML alloue les équipes' },
                    { name: 'Risk Management', icon: Shield, ai: 'Prédiction des risques' },
                    { name: 'Strategic Alignment', icon: Target, ai: 'Recommandations IA' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 hover:border-[#BFA76A]/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#BFA76A]/20 transition-all">
                          <item.icon size={20} className="text-[#BFA76A]" />
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
              PMO <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Intelligent</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Notre IA générative analyse votre portefeuille de projets 24/7 pour identifier les opportunités d'optimisation, prédire les dérives et recommander les actions stratégiques.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Priorisation Intelligente',
                desc: 'L\'IA évalue automatiquement chaque projet selon 20+ critères et génère un scoring stratégique',
                gradient: 'from-purple-500/20 to-pink-500/20',
                border: 'purple-500/30'
              },
              {
                icon: TrendingUp,
                title: 'Prédiction de Dérives',
                desc: 'Machine Learning analyse patterns historiques pour anticiper les dépassements budget et délais',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                border: 'blue-500/30'
              },
              {
                icon: Bot,
                title: 'Assistant PMO IA',
                desc: 'Posez des questions en langage naturel sur votre portfolio et recevez des insights actionnables',
                gradient: 'from-green-500/20 to-emerald-500/20',
                border: 'green-500/30'
              },
              {
                icon: Workflow,
                title: 'Optimisation Ressources',
                desc: 'Algorithmes génétiques pour allocation optimale des équipes selon compétences et disponibilités',
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
            <h2 className="text-4xl font-display font-bold mb-4">Gouvernance de bout en bout</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une plateforme complète pour piloter vos portefeuilles de projets stratégiques avec l'intelligence artificielle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Strategic Alignment + IA',
                desc: 'Vérification automatique de l\'alignement stratégique de chaque projet. L\'IA recommande les projets à prioriser selon les objectifs business.',
                color: '#BFA76A',
                badge: 'Stratégique'
              },
              {
                icon: Shield,
                title: 'Risk Management Prédictif',
                desc: 'IA analyse 50+ indicateurs de risque en temps réel et prédit la probabilité de succès de chaque initiative',
                color: '#EF4444',
                badge: 'Prédictif'
              },
              {
                icon: Users,
                title: 'Resource Planning IA',
                desc: 'Optimisation automatique de l\'allocation des ressources par machine learning sur base des compétences et charge',
                color: '#4ADE80',
                badge: 'Smart Planning'
              },
              {
                icon: BarChart3,
                title: 'Portfolio Analytics',
                desc: 'Dashboards Power BI avec insights IA : santé portfolio, prévisions budget, identification quick wins',
                color: '#8B5CF6',
                badge: 'Analytics'
              },
              {
                icon: Lock,
                title: 'Governance & Compliance',
                desc: 'Audit trail complet, workflows d\'approbation automatisés, conformité GDPR avec vérification IA',
                color: '#00A1E0',
                badge: 'Compliance'
              },
              {
                icon: Zap,
                title: 'Automatisation Intelligente',
                desc: 'Génération automatique de rapports exécutifs, alertes prédictives, recommandations d\'actions par IA',
                gradient: 'from-amber-500/20 to-yellow-500/20',
                color: '#F59E0B',
                badge: 'Auto-pilot'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-[#BFA76A]/50 transition-all group relative overflow-hidden">
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
            <h2 className="text-4xl font-display font-bold mb-4">Cas d'Usage <span className="text-purple-400">Réels</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comment l'IA générative transforme le pilotage PMO dans les grandes organisations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Priorisation Stratégique Automatisée',
                desc: 'Une multinationale gère 300+ projets. L\'IA génère automatiquement un score stratégique (0-100) pour chaque projet en analysant alignement objectifs, ROI projeté, ressources requises, risques. Le PMO gagne 15h/semaine.',
                metrics: ['300+ projets analysés', 'Score en 5 secondes', '15h/sem économisées'],
                icon: Target,
                aiFeature: 'Algorithme propriétaire qui pondère 20+ critères selon la stratégie entreprise'
              },
              {
                title: 'Détection Précoce de Dérives',
                desc: 'Machine Learning entraîné sur 5 ans d\'historique prédit les dérives budget/délais 3 mois en avance. Le PMO intervient de manière proactive avant que les problèmes ne s\'aggravent. -40% de projets en dérapage.',
                metrics: ['Précision 87%', 'Alerte 3 mois en avance', '-40% dérives'],
                icon: TrendingUp,
                aiFeature: 'Modèle ML entraîné sur 10 000+ projets pour patterns de risque'
              },
              {
                title: 'Optimisation Automatique des Ressources',
                desc: 'Pour 50 collaborateurs et 80 projets actifs, l\'IA calcule l\'allocation optimale en tenant compte des compétences, disponibilités, préférences. Résultat : taux d\'utilisation à 93% et satisfaction équipe en hausse.',
                metrics: ['Taux utilisation 93%', '-60% conflits', '+28% satisfaction'],
                icon: Users,
                aiFeature: 'Algorithme génétique qui explore 100 000+ combinaisons pour trouver l\'optimum'
              },
              {
                title: 'Rapports Exécutifs Auto-Générés',
                desc: 'L\'IA rédige chaque lundi matin un executive summary en langage naturel du portfolio : projets critiques, quick wins identifiés, recommandations stratégiques. Le COMEX gagne 2h de préparation.',
                metrics: ['Rapport en 2 min', 'Insights actionnables', 'COMEX validé'],
                icon: Sparkles,
                aiFeature: 'IA générative GPT-4 affinée sur données business de l\'entreprise'
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
                    <span key={j} className="text-xs bg-gradient-to-r from-[#BFA76A]/20 to-purple-500/20 text-white px-4 py-2 rounded-full font-semibold border border-[#BFA76A]/30">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with IA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#111] via-purple-950/20 to-[#111] border border-[#BFA76A]/30 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#BFA76A]/10 via-purple-500/10 to-transparent blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BFA76A]/10 to-purple-500/10 border border-[#BFA76A]/30 px-6 py-3 rounded-full mb-8">
                <Sparkles className="text-purple-400" size={18} />
                <span className="text-sm font-semibold text-white">Déploiement en 1 semaine • Formation IA incluse • ROI garanti</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Transformez votre PMO avec l'<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">IA Générative</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Rejoignez les <span className="text-white font-bold">+200 PMO</span> qui pilotent leurs portfolios avec l'intelligence artificielle. Démo personnalisée avec vos projets réels.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pmo-360-demo">
                  <Button className="h-16 px-10 bg-gradient-to-r from-[#BFA76A] to-amber-600 text-black hover:from-amber-600 hover:to-[#BFA76A] font-bold text-lg shadow-xl shadow-[#BFA76A]/30 group">
                    <Bot className="mr-2 group-hover:scale-110 transition-transform" size={24} />
                    Démo PMO + IA
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-16 px-10 border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg">
                    Parler à un expert PMO
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-green-500" />
                  <span>ISO 27001 Certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-blue-500" />
                  <span>GDPR Compliant</span>
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

export default PMOGovernancePage;
