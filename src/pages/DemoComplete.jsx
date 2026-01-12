import { useState } from 'react';
import { 
  TrendingUp, AlertTriangle, CheckCircle, Activity, DollarSign, Target, Users, 
  Calendar, BarChart3, Layers, FileText, Shield, Zap, Brain, Globe, Sparkles,
  ArrowRight, Play, ChevronRight, X, Maximize2, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';

// Données complètes pour la démo client
const DEMO_DATA = {
  company: {
    name: "Global Tech Industries",
    projects: 42,
    portfolios: 8,
    budget: 28500000,
    team: 156
  },
  kpis: {
    totalProjects: 42,
    activeProjects: 34,
    completedProjects: 8,
    totalBudget: 28500000,
    spentBudget: 19250000,
    onTrackProjects: 28,
    atRiskProjects: 5,
    offTrackProjects: 1,
    teamMembers: 156,
    portfolios: 8
  },
  budgetEvolution: [
    { month: 'Jan', planned: 2100000, actual: 2050000, forecast: 2100000 },
    { month: 'Fév', planned: 2250000, actual: 2300000, forecast: 2250000 },
    { month: 'Mar', planned: 2400000, actual: 2380000, forecast: 2400000 },
    { month: 'Avr', planned: 2350000, actual: 2300000, forecast: 2350000 },
    { month: 'Mai', planned: 2600000, actual: 2550000, forecast: 2600000 },
    { month: 'Jun', planned: 2800000, actual: 2750000, forecast: 2800000 },
    { month: 'Jul', planned: 2900000, actual: 0, forecast: 2850000 },
    { month: 'Aoû', planned: 3100000, actual: 0, forecast: 3050000 }
  ],
  projectsByStatus: [
    { name: 'En cours', value: 34, color: '#4A9EFF' },
    { name: 'Terminés', value: 8, color: '#10B981' },
    { name: 'En attente', value: 5, color: '#F59E0B' }
  ],
  projectsByHealth: [
    { name: 'Sur les rails', value: 28, color: '#10B981' },
    { name: 'À risque', value: 5, color: '#F59E0B' },
    { name: 'Critique', value: 1, color: '#EF4444' }
  ],
  portfolios: [
    { 
      id: 1, 
      name: 'Transformation Digitale', 
      projects: 12, 
      budget: 8500000, 
      health: 92,
      progress: 68,
      color: '#D4AF37'
    },
    { 
      id: 2, 
      name: 'Innovation Produits', 
      projects: 8, 
      budget: 6200000, 
      health: 85,
      progress: 54,
      color: '#4A9EFF'
    },
    { 
      id: 3, 
      name: 'Infrastructure IT', 
      projects: 10, 
      budget: 5800000, 
      health: 78,
      progress: 72,
      color: '#10B981'
    },
    { 
      id: 4, 
      name: 'Excellence Opérationnelle', 
      projects: 7, 
      budget: 4500000, 
      health: 88,
      progress: 61,
      color: '#8B5CF6'
    }
  ],
  topProjects: [
    { 
      id: 'PRJ-001', 
      name: 'Migration Cloud AWS', 
      portfolio: 'Infrastructure IT',
      health: 95, 
      progress: 78, 
      budget: 2500000,
      spent: 1950000,
      manager: 'Sophie Martin',
      deadline: '2026-06-30',
      status: 'on-track'
    },
    { 
      id: 'PRJ-002', 
      name: 'Plateforme e-Commerce', 
      portfolio: 'Transformation Digitale',
      health: 88, 
      progress: 65, 
      budget: 3200000,
      spent: 2080000,
      manager: 'Thomas Dubois',
      deadline: '2026-09-15',
      status: 'on-track'
    },
    { 
      id: 'PRJ-003', 
      name: 'IA Predictive Analytics', 
      portfolio: 'Innovation Produits',
      health: 72, 
      progress: 45, 
      budget: 1800000,
      spent: 810000,
      manager: 'Marie Laurent',
      deadline: '2026-12-31',
      status: 'at-risk'
    },
    { 
      id: 'PRJ-004', 
      name: 'Refonte ERP SAP', 
      portfolio: 'Excellence Opérationnelle',
      health: 92, 
      progress: 82, 
      budget: 4500000,
      spent: 3690000,
      manager: 'Jean Dupont',
      deadline: '2026-05-15',
      status: 'on-track'
    },
    { 
      id: 'PRJ-005', 
      name: 'App Mobile B2B', 
      portfolio: 'Transformation Digitale',
      health: 58, 
      progress: 38, 
      budget: 950000,
      spent: 361000,
      manager: 'Claire Rousseau',
      deadline: '2026-08-30',
      status: 'critical'
    }
  ],
  risks: [
    { 
      id: 1, 
      title: 'Retard livraison fournisseur Cloud', 
      impact: 'Élevé', 
      probability: 'Moyenne',
      project: 'PRJ-001',
      mitigation: 'Plan B avec fournisseur alternatif'
    },
    { 
      id: 2, 
      title: 'Dépassement budget R&D IA', 
      impact: 'Moyen', 
      probability: 'Élevée',
      project: 'PRJ-003',
      mitigation: 'Révision scope et priorisation features'
    },
    { 
      id: 3, 
      title: 'Pénurie ressources développement', 
      impact: 'Élevé', 
      probability: 'Moyenne',
      project: 'PRJ-005',
      mitigation: 'Recrutement externe et prestataires'
    }
  ],
  radarData: [
    { dimension: 'Stratégie', value: 92, fullMark: 100 },
    { dimension: 'Exécution', value: 85, fullMark: 100 },
    { dimension: 'Budget', value: 88, fullMark: 100 },
    { dimension: 'Équipe', value: 90, fullMark: 100 },
    { dimension: 'Innovation', value: 78, fullMark: 100 },
    { dimension: 'Qualité', value: 94, fullMark: 100 }
  ],
  decisions: [
    { id: 1, title: 'Validation budget Q3 Transformation Digitale', date: '2026-01-20', impact: 'Élevé' },
    { id: 2, title: 'Arbitrage ressources projet IA', date: '2026-01-18', impact: 'Moyen' },
    { id: 3, title: 'Go/No-Go lancement App Mobile', date: '2026-01-25', impact: 'Élevé' }
  ],
  teamCapacity: [
    { name: 'Développement', members: 45, capacity: 85, projects: 12 },
    { name: 'Data & IA', members: 18, capacity: 92, projects: 5 },
    { name: 'Infrastructure', members: 25, capacity: 78, projects: 8 },
    { name: 'Product Management', members: 22, capacity: 88, projects: 10 },
    { name: 'Design UX', members: 12, capacity: 72, projects: 6 }
  ]
};

export default function DemoComplete() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const sections = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Globe },
    { id: 'portfolios', label: 'Portefeuilles', icon: Layers },
    { id: 'projects', label: 'Projets', icon: Target },
    { id: 'cockpit', label: 'Cockpit Exécutif', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'risks', label: 'Risques', icon: AlertTriangle }
  ];

  const getHealthColor = (health) => {
    if (health >= 80) return 'from-emerald-500 to-green-600';
    if (health >= 60) return 'from-amber-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getHealthBadge = (health) => {
    if (health >= 80) return { label: 'Excellent', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (health >= 60) return { label: 'Attention', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { label: 'Critique', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header Premium */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] blur-xl opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Powalyze</h1>
                <p className="text-sm text-white/50">Strategic Portfolio Management Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#4A9EFF]/10 border border-[#D4AF37]/30 rounded-lg">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Client</div>
                <div className="text-sm text-white font-semibold">{DEMO_DATA.company.name}</div>
              </div>
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="text-xs text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  MODE DÉMO
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold shadow-lg'
                      : 'bg-white/5 text-white/60 hover:text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-[1800px] mx-auto px-8 py-8">
        
        {/* Vue d'ensemble */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Portefeuilles Actifs', value: DEMO_DATA.kpis.portfolios, icon: Layers, color: 'from-purple-500 to-pink-500' },
                { label: 'Projets en Cours', value: DEMO_DATA.kpis.activeProjects, icon: Target, color: 'from-[#D4AF37] to-[#4A9EFF]' },
                { label: 'Budget Total', value: `${(DEMO_DATA.kpis.totalBudget / 1000000).toFixed(1)}M€`, icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
                { label: 'Équipe', value: DEMO_DATA.kpis.teamMembers, icon: Users, color: 'from-emerald-500 to-teal-500' }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 rounded-2xl blur-2xl group-hover:opacity-30 transition-all`}></div>
                    <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                      <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Graphiques principaux */}
            <div className="grid grid-cols-2 gap-6">
              {/* Évolution Budget */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                  Évolution Budgétaire
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={DEMO_DATA.budgetEvolution}>
                    <defs>
                      <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => [`${(value/1000000).toFixed(2)}M€`, '']}
                    />
                    <Area type="monotone" dataKey="planned" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" name="Planifié" />
                    <Area type="monotone" dataKey="actual" stroke="#4A9EFF" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Réel" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Distribution Projets */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-[#4A9EFF]" />
                  Distribution des Projets
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={DEMO_DATA.projectsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {DEMO_DATA.projectsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={DEMO_DATA.projectsByHealth}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {DEMO_DATA.projectsByHealth.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Par Statut</div>
                    {DEMO_DATA.projectsByStatus.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-white/80">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Par Santé</div>
                    {DEMO_DATA.projectsByHealth.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-white/80">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#4A9EFF]/20 to-purple-500/20 border border-[#D4AF37]/30 p-8">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Explorez toutes les fonctionnalités</h3>
                  <p className="text-white/70">Découvrez comment Powalyze transforme la gestion de vos portefeuilles stratégiques</p>
                </div>
                <button 
                  onClick={() => setActiveSection('portfolios')}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all flex items-center gap-2"
                >
                  Commencer la démo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#4A9EFF]/10 animate-shimmer"></div>
            </div>
          </div>
        )}

        {/* Section Portefeuilles */}
        {activeSection === 'portfolios' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Portefeuilles Stratégiques</h2>
                <p className="text-white/60">Vue consolidée de vos portefeuilles de projets</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {DEMO_DATA.portfolios.map(portfolio => (
                <div key={portfolio.id} className="relative group">
                  <div className="absolute inset-0 opacity-20 rounded-2xl blur-2xl transition-all" style={{ backgroundColor: portfolio.color }}></div>
                  <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: portfolio.color }}></div>
                          <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span>{portfolio.projects} projets</span>
                          <span>•</span>
                          <span>{(portfolio.budget / 1000000).toFixed(1)}M€</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getHealthBadge(portfolio.health).color} border`}>
                        {getHealthBadge(portfolio.health).label}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Santé */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/70">Santé Globale</span>
                          <span className="text-white font-semibold">{portfolio.health}%</span>
                        </div>
                        <div className="h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className={`h-full bg-gradient-to-r ${getHealthColor(portfolio.health)} transition-all duration-500`}
                            style={{ width: `${portfolio.health}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Progression */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/70">Progression</span>
                          <span className="text-white font-semibold">{portfolio.progress}%</span>
                        </div>
                        <div className="h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className="h-full bg-gradient-to-r from-[#4A9EFF] to-[#D4AF37] transition-all duration-500"
                            style={{ width: `${portfolio.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                      Voir les détails
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Projets */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Projets Stratégiques</h2>
                <p className="text-white/60">Suivi détaillé de vos projets prioritaires</p>
              </div>
            </div>

            <div className="space-y-4">
              {DEMO_DATA.topProjects.map(project => {
                const badge = getHealthBadge(project.health);
                const budgetUsed = (project.spent / project.budget) * 100;
                
                return (
                  <div 
                    key={project.id} 
                    className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono text-white/50">{project.id}</span>
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${badge.color} border`}>
                            {badge.label}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-4 h-4" />
                            {project.portfolio}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {project.manager}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(project.deadline).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-1">{project.health}%</div>
                        <div className="text-xs text-white/50">Score santé</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-4">
                      {/* Progression */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/70">Progression</span>
                          <span className="text-white font-semibold">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className="h-full bg-gradient-to-r from-[#4A9EFF] to-[#D4AF37]"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/70">Budget utilisé</span>
                          <span className="text-white font-semibold">{budgetUsed.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                          <div 
                            className={`h-full ${budgetUsed > 90 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
                            style={{ width: `${budgetUsed}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Budget montant */}
                      <div className="text-right">
                        <div className="text-sm text-white/70 mb-1">Budget</div>
                        <div className="text-lg font-bold text-white">
                          {(project.spent / 1000000).toFixed(2)}M€ / {(project.budget / 1000000).toFixed(2)}M€
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section Cockpit */}
        {activeSection === 'cockpit' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Brain className="w-8 h-8 text-[#D4AF37]" />
                Cockpit Exécutif Intelligent
              </h2>
              <p className="text-white/60">Vue stratégique temps réel avec intelligence prédictive</p>
            </div>

            {/* Radar Multi-dimensionnel */}
            <div className="bg-gradient-to-br from-purple-950/30 via-blue-950/30 to-cyan-950/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Analyse Multi-Dimensionnelle
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={DEMO_DATA.radarData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis 
                      dataKey="dimension" 
                      tick={{ fill: '#ffffff80', fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]}
                      tick={{ fill: '#ffffff60', fontSize: 10 }}
                    />
                    <Radar 
                      name="Performance" 
                      dataKey="value" 
                      stroke="#D4AF37" 
                      fill="#D4AF37" 
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Radar 
                      name="Objectif" 
                      dataKey="fullMark" 
                      stroke="#4A9EFF" 
                      fill="#4A9EFF" 
                      fillOpacity={0.1}
                      strokeWidth={1}
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Capacité équipes */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Capacité des Équipes
              </h3>
              <div className="space-y-4">
                {DEMO_DATA.teamCapacity.map(team => (
                  <div key={team.name}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">{team.name}</span>
                        <span className="text-xs text-white/50">{team.members} membres • {team.projects} projets</span>
                      </div>
                      <span className="text-white/80 font-semibold">{team.capacity}%</span>
                    </div>
                    <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/10">
                      <div 
                        className={`h-full ${team.capacity > 90 ? 'bg-gradient-to-r from-red-500 to-orange-500' : team.capacity > 75 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
                        style={{ width: `${team.capacity}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section Analytics */}
        {activeSection === 'analytics' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Analytics & Insights</h2>
              <p className="text-white/60">Analyses avancées et tendances prédictives</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Évolution budgétaire détaillée */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 col-span-2">
                <h3 className="text-lg font-semibold text-white mb-6">Évolution Budgétaire avec Prévisions</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={DEMO_DATA.budgetEvolution}>
                    <defs>
                      <linearGradient id="colorPlanned2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActual2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      formatter={(value) => [`${(value/1000000).toFixed(2)}M€`, '']}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="planned" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned2)" name="Planifié" />
                    <Area type="monotone" dataKey="actual" stroke="#4A9EFF" strokeWidth={2} fillOpacity={1} fill="url(#colorActual2)" name="Réel" />
                    <Area type="monotone" dataKey="forecast" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" name="Prévision" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Métriques clés */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Taux de réussite', value: '94.3%', trend: '+2.1%', color: 'emerald' },
                  { label: 'ROI Moyen', value: '247%', trend: '+15%', color: 'blue' },
                  { label: 'Délai moyen', value: '6.2 mois', trend: '-0.8 mois', color: 'purple' },
                  { label: 'Satisfaction', value: '4.7/5', trend: '+0.3', color: 'amber' }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-white/60 mb-2">{metric.label}</div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className={`text-xs font-semibold text-${metric.color}-400 flex items-center gap-1`}>
                      <TrendingUp className="w-3 h-3" />
                      {metric.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Distribution portefeuilles */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Répartition par Portefeuille</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={DEMO_DATA.portfolios.map(p => ({ name: p.name, value: p.budget, color: p.color }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {DEMO_DATA.portfolios.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000000cc', border: '1px solid #ffffff20', borderRadius: '8px' }}
                      formatter={(value) => `${(value/1000000).toFixed(1)}M€`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Section Risques */}
        {activeSection === 'risks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Gestion des Risques</h2>
                <p className="text-white/60">Identification et mitigation des risques stratégiques</p>
              </div>
            </div>

            <div className="grid gap-4">
              {DEMO_DATA.risks.map(risk => (
                <div key={risk.id} className="bg-black/60 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 hover:border-red-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{risk.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <span className="font-mono">{risk.project}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            risk.impact === 'Élevé' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            Impact: {risk.impact}
                          </div>
                          <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            risk.probability === 'Élevée' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            Prob: {risk.probability}
                          </div>
                        </div>
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-lg p-3">
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Plan de mitigation</div>
                        <div className="text-sm text-white/80">{risk.mitigation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrice risques */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Matrice Impact / Probabilité</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Faible', 'Moyen', 'Élevé'].map((prob, y) => (
                  ['Faible', 'Moyen', 'Élevé'].map((imp, x) => {
                    const severity = x + y;
                    const color = severity >= 4 ? 'bg-red-500/20 border-red-500/40' : severity >= 2 ? 'bg-amber-500/20 border-amber-500/40' : 'bg-emerald-500/20 border-emerald-500/40';
                    return (
                      <div key={`${x}-${y}`} className={`h-24 rounded-xl border ${color} flex items-center justify-center text-center p-2`}>
                        <div>
                          <div className="text-xs text-white/50 mb-1">{imp}</div>
                          <div className="text-xs text-white/70">{prob}</div>
                        </div>
                      </div>
                    );
                  })
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Projet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setSelectedProject(null)}>
          <div className="bg-black/95 border border-white/20 rounded-3xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-sm font-mono text-white/50 mb-2">{selectedProject.id}</div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h2>
                <div className="flex items-center gap-4 text-white/60">
                  <span>{selectedProject.portfolio}</span>
                  <span>•</span>
                  <span>{selectedProject.manager}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Santé</div>
                <div className="text-3xl font-bold text-white">{selectedProject.health}%</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Progression</div>
                <div className="text-3xl font-bold text-white">{selectedProject.progress}%</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Budget</div>
                <div className="text-xl font-bold text-white">
                  {(selectedProject.spent / 1000000).toFixed(1)}M€ / {(selectedProject.budget / 1000000).toFixed(1)}M€
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Date limite</div>
                <div className="text-white font-semibold">{new Date(selectedProject.deadline).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-2">Statut</div>
                <div className={`inline-block px-3 py-1.5 rounded-lg text-sm font-semibold ${getHealthBadge(selectedProject.health).color} border`}>
                  {getHealthBadge(selectedProject.health).label}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl mt-12">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/40">
              © 2026 Powalyze • Strategic Portfolio Management Platform
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm text-white/60 hover:text-white transition-all">Documentation</button>
              <button className="text-sm text-white/60 hover:text-white transition-all">Support</button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:shadow-lg transition-all">
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
