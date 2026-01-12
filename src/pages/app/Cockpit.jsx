import { useState, useEffect, useMemo } from 'react';
import CockpitLayout from "../../components/layout/CockpitLayout";
import { useCockpitData } from "../../hooks/useCockpitData";
import { useAuth } from "../../contexts/SupabaseAuthContext";
import { signalColor, riskLevelColor, capacityBarGradient, impactLevelColor, statusDotColor } from "../../utils/cockpitColors";
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users, Target, Zap,
  Brain, Sparkles, Activity, BarChart3, Layers, Globe, Shield, Rocket
} from 'lucide-react';
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export default function CockpitPage() {
  const { orgId } = useAuth();
  const { data, loading } = useCockpitData(orgId);
  const [liveMetrics, setLiveMetrics] = useState({ projects: 847, budget: 2.8, team: 124 });
  const [aiInsights, setAiInsights] = useState([]);
  const [selectedView, setSelectedView] = useState('galaxy'); // galaxy, radar, waves, timeline
  const [waveAnimation, setWaveAnimation] = useState(0);

  // Animation des vagues de données
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAnimation(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Métriques temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        projects: Math.round(prev.projects + (Math.random() - 0.5) * 5),
        budget: +(prev.budget + (Math.random() - 0.5) * 0.1).toFixed(1),
        team: Math.round(prev.team + (Math.random() - 0.5) * 3)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Intelligence prédictive (insights IA)
  useEffect(() => {
    if (data && data.health) {
      const insights = [
        {
          type: 'prediction',
          icon: Brain,
          title: 'Prédiction Budget',
          message: `${Math.round(data.health.avg_progress)}% de progression détectée. Budget optimal atteint dans 12 jours.`,
          confidence: 87,
          color: 'from-purple-500 to-pink-500'
        },
        {
          type: 'risk',
          icon: Shield,
          title: 'Risque Identifié',
          message: `${data.tensions.filter(t => t.avg_level > 70).length} domaines en tension. Action recommandée: réaffectation ressources.`,
          confidence: 92,
          color: 'from-red-500 to-orange-500'
        },
        {
          type: 'opportunity',
          icon: Sparkles,
          title: 'Opportunité Détectée',
          message: `${data.capacity.filter(t => t.saturation < 0.6).length} équipes sous-utilisées. Potentiel d'accélération de 23%.`,
          confidence: 78,
          color: 'from-emerald-500 to-teal-500'
        }
      ];
      setAiInsights(insights);
    }
  }, [data]);

  // Données pour le radar multi-dimensionnel
  const radarData = useMemo(() => {
    if (!data || !data.health) return [];
    return [
      { dimension: 'Progress', value: Math.round(data.health.avg_progress || 0), fullMark: 100 },
      { dimension: 'Quality', value: Math.round(data.health.commitments || 0), fullMark: 100 },
      { dimension: 'Budget', value: 85, fullMark: 100 },
      { dimension: 'Team', value: 92, fullMark: 100 },
      { dimension: 'Innovation', value: 78, fullMark: 100 },
      { dimension: 'Risk Control', value: Math.round(100 - (data.health.risk_score || 0)), fullMark: 100 }
    ];
  }, [data]);

  // Données pour les vagues (wave animation)
  const waveData = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        x: i,
        y1: Math.sin((i + waveAnimation) * 0.2) * 20 + 50,
        y2: Math.cos((i + waveAnimation) * 0.15) * 15 + 50,
        y3: Math.sin((i + waveAnimation) * 0.25) * 25 + 50
      });
    }
    return points;
  }, [waveAnimation]);

  if (loading) {
    return (
      <CockpitLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-[#D4AF37]/20 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <Brain className="absolute inset-0 m-auto w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>
            <div className="text-white/60 mt-6 font-light">Initialisation du cockpit intelligent...</div>
            <div className="text-white/40 text-sm mt-2">Analyse des données en cours</div>
          </div>
        </div>
      </CockpitLayout>
    );
  }

  if (!data || !data.health) {
    return (
      <CockpitLayout>
        <div className="text-white/60">
          Aucune donnée disponible. Veuillez configurer votre organisation.
        </div>
      </CockpitLayout>
    );
  }

  const { health, signal, milestones, tensions, capacity, decisions, focus, timestamps } = data;

  return (
    <CockpitLayout>
      {/* Header Révolutionnaire avec IA */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] blur-xl opacity-50"></div>
                <Brain className="relative w-12 h-12 text-[#D4AF37]" />
              </div>
              <div>
                <h1 className="text-5xl font-extralight text-white tracking-tight">
                  Intelligence
                  <span className="ml-3 bg-gradient-to-r from-[#D4AF37] via-white to-[#4A9EFF] bg-clip-text text-transparent font-light">
                    Cockpit
                  </span>
                </h1>
                <p className="text-white/50 text-sm font-light mt-1">
                  Powered by AI • Real-time strategic governance
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Health Score Global */}
            {signal && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-sky-500/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
                <div className="relative flex items-center gap-4 px-8 py-4 bg-black/70 backdrop-blur-2xl border border-white/20 rounded-2xl">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold bg-gradient-to-br from-emerald-400 via-sky-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
                      {Math.round(signal.global_score)}%
                    </span>
                    <span className="text-[0.65rem] text-white/40 uppercase tracking-widest mt-1">Health Score</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      signal.signal === "critique" ? "bg-red-500 animate-pulse" :
                      signal.signal === "tension" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                    }`}></div>
                    <Activity className="w-4 h-4 text-white/60" />
                  </div>
                </div>
              </div>
            )}

            {/* Sélecteur de vue */}
            <div className="flex gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
              {[
                { id: 'galaxy', icon: Globe, label: 'Galaxy' },
                { id: 'radar', icon: Target, label: 'Radar' },
                { id: 'waves', icon: Activity, label: 'Waves' },
                { id: 'timeline', icon: BarChart3, label: 'Timeline' }
              ].map(view => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    selectedView === view.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold'
                      : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span className="text-xs">{view.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* IA Insights - Barre d'intelligence prédictive */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/50 via-blue-950/50 to-purple-950/50 border border-purple-500/30 p-1 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
          <div className="relative bg-black/60 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-sm font-semibold text-white">Intelligence Prédictive</span>
              <span className="text-xs text-white/40">• Mise à jour il y a {timestamps.lastUpdate}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {aiInsights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div key={idx} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-20 rounded-xl blur-xl group-hover:opacity-30 transition-all`}></div>
                    <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <Icon className="w-5 h-5 text-white/80" />
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-[0.65rem] text-green-400 font-mono">{insight.confidence}%</span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">{insight.title}</div>
                      <div className="text-[0.7rem] text-white/60 leading-relaxed">{insight.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        {/* KPIs LIVE avec animation liquide */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/40 to-[#4A9EFF]/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl p-8 hover:border-[#D4AF37]/70 transition-all overflow-hidden">
              {/* Effet liquide en arrière-plan */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at ${50 + Math.sin(waveAnimation * 0.05) * 20}% ${50 + Math.cos(waveAnimation * 0.03) * 20}%, #D4AF37 0%, transparent 50%)`
                }}></div>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] via-[#4A9EFF] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#D4AF37]/50 animate-pulse">
                    <Target className="w-8 h-8 text-black" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-xs text-green-400 font-bold tracking-wider">LIVE</span>
                  </div>
                </div>
                <div className="text-6xl font-extralight text-white mb-3 tabular-nums">{liveMetrics.projects}</div>
                <div className="text-sm text-white/70 font-light mb-4">Active Projects</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400 font-semibold">+12% ce mois</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-blue-400/40 rounded-3xl p-8 hover:border-blue-400/70 transition-all overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at ${50 + Math.cos(waveAnimation * 0.04) * 20}% ${50 + Math.sin(waveAnimation * 0.06) * 20}%, #4A9EFF 0%, transparent 50%)`
                }}></div>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></div>
                    <span className="text-xs text-blue-400 font-bold tracking-wider">LIVE</span>
                  </div>
                </div>
                <div className="text-6xl font-extralight text-white mb-3 tabular-nums">€{liveMetrics.budget}M</div>
                <div className="text-sm text-white/70 font-light mb-4">Portfolio Budget</div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-blue-400 font-semibold">94.7% alloué</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-teal-500/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border border-emerald-400/40 rounded-3xl p-8 hover:border-emerald-400/70 transition-all overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at ${50 + Math.sin(waveAnimation * 0.07) * 20}% ${50 + Math.cos(waveAnimation * 0.05) * 20}%, #10b981 0%, transparent 50%)`
                }}></div>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-xs text-emerald-400 font-bold tracking-wider">LIVE</span>
                  </div>
                </div>
                <div className="text-6xl font-extralight text-white mb-3 tabular-nums">{liveMetrics.team}</div>
                <div className="text-sm text-white/70 font-light mb-4">Team Members</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-semibold">+8 ce trimestre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone de visualisation principale - Multi-vues */}
      <div className="mb-8">
        {/* Vue Galaxy - Visualisation spatiale 3D */}
        {selectedView === 'galaxy' && (
          <div className="relative h-[500px] bg-gradient-to-br from-indigo-950/30 via-purple-950/30 to-pink-950/30 rounded-3xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            
            {/* Étoiles en arrière-plan */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: Math.random() * 0.7 + 0.3
                  }}
                ></div>
              ))}
            </div>

            {/* Projets en orbite */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Centre - Organisation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-[#D4AF37] via-[#4A9EFF] to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Layers className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Orbites de projets */}
                {decisions.slice(0, 8).map((project, idx) => {
                  const angle = (idx / 8) * 2 * Math.PI;
                  const radius = 150 + (idx % 2) * 30;
                  const x = Math.cos(angle + waveAnimation * 0.01) * radius;
                  const y = Math.sin(angle + waveAnimation * 0.01) * radius;
                  
                  return (
                    <div
                      key={project.id}
                      className="absolute transition-all duration-1000"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className="group relative">
                        <div className={`absolute inset-0 rounded-full blur-xl opacity-70 ${
                          project.impact_level === 'high' ? 'bg-red-500' :
                          project.impact_level === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></div>
                        <div className="relative w-16 h-16 bg-black/80 backdrop-blur-xl border-2 border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-1.5">
                            <div className="text-xs text-white font-semibold">{project.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Légende */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-3">Galaxy View</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-white/80">High Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-white/80">Medium Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-white/80">Low Impact</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vue Radar - Analyse multi-dimensionnelle */}
        {selectedView === 'radar' && (
          <div className="relative h-[500px] bg-gradient-to-br from-cyan-950/30 via-blue-950/30 to-indigo-950/30 rounded-3xl border border-white/10 p-8">
            <div className="h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
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
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name="Target" 
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
            
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-2">Radar View</div>
              <div className="text-sm text-white font-semibold">Multi-Dimensional Analysis</div>
            </div>
          </div>
        )}

        {/* Vue Waves - Vagues de données */}
        {selectedView === 'waves' && (
          <div className="relative h-[500px] bg-gradient-to-br from-purple-950/30 via-blue-950/30 to-cyan-950/30 rounded-3xl border border-white/10 overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData}>
                  <defs>
                    <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4A9EFF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4A9EFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="wave3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="y1" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#wave1)" />
                  <Area type="monotone" dataKey="y2" stroke="#4A9EFF" strokeWidth={2} fillOpacity={1} fill="url(#wave2)" />
                  <Area type="monotone" dataKey="y3" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#wave3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-2">Waves View</div>
              <div className="text-sm text-white font-semibold">Data Flow Visualization</div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#D4AF37]"></div>
                  <span className="text-xs text-white/70">Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#4A9EFF]"></div>
                  <span className="text-xs text-white/70">Budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-purple-500"></div>
                  <span className="text-xs text-white/70">Resources</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Bloc 1 : Santé globale */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-sky-400/30 rounded-2xl p-6 hover:border-sky-400/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
              Global Health
            </h2>
            <div className="flex gap-4">
              {[
                { label: "Progress", value: Math.round(health.avg_progress || 0), color: "from-sky-400 to-blue-500", icon: TrendingUp },
                { label: "Risks", value: Math.round(health.risk_score || 0), color: "from-amber-400 to-orange-500", icon: AlertTriangle },
                { label: "Commitments", value: Math.round(health.commitments || 0), color: "from-emerald-400 to-teal-500", icon: CheckCircle },
              ].map((item) => (
                <div key={item.label} className="flex-1 text-center">
                  <div className="relative mx-auto h-20 w-20 mb-3">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div
                      className={`absolute inset-[2px] rounded-full bg-gradient-to-tr ${item.color} opacity-70`}
                    />
                    <div className="absolute inset-[6px] rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-lg font-bold text-white tabular-nums">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloc 2 : Pulse des enjeux */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 hover:border-purple-400/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Milestones Timeline
            </h2>
            <div className="h-24 flex flex-col justify-between">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>This Week</span>
                <span>Next Milestones</span>
              </div>
              <div className="relative h-12 flex items-center">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50" />
                {milestones.slice(0, 4).map((m, idx) => {
                  const pos = 15 + (idx * 23);
                  return (
                    <div
                      key={m.id}
                      className="absolute -translate-x-1/2 group/milestone"
                      style={{ left: `${pos}%` }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${statusDotColor(m.status)} shadow-lg animate-pulse border border-white/20`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[0.65rem] text-white/40 font-mono">
                <span>NOW</span>
                <span>+10 DAYS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc 3 : Priorités du moment */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 hover:border-[#D4AF37]/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
              Top Priorities
            </h2>
            <div className="space-y-3">
              {decisions.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="group/card flex items-center justify-between rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm px-4 py-3 hover:border-[#D4AF37]/50 hover:bg-black/60 transition-all"
                >
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-white/50 font-mono mt-1">
                      {item.due_date ? new Date(item.due_date).toLocaleDateString() : "TBD"}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${impactLevelColor(
                      item.impact_level
                    )}`}
                  >
                    {item.impact_level}
                  </span>
                </div>
              ))}
              {decisions.length === 0 && (
                <div className="text-sm text-white/40 text-center py-6">
                  No pending decisions
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Bloc 4 : Risques & tensions */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6 hover:border-red-400/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Risks & Tensions
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {["strategie", "execution", "ressources", "dependances", "qualite", "conformite"].map((domain) => {
                const tension = tensions.find((t) => t.domain === domain);
                const level = tension ? Math.round(tension.avg_level) : 0;
                
                return (
                  <div
                    key={domain}
                    className={`h-14 rounded-lg border border-white/10 text-center flex flex-col items-center justify-center hover:scale-105 transition-transform ${riskLevelColor(
                      level
                    )}`}
                  >
                    <span className="text-xs capitalize font-semibold">{domain}</span>
                    <span className="text-[0.65rem] text-white/60 mt-1">{level}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bloc 5 : Capacité & charge */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 hover:border-cyan-400/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              Team Capacity
            </h2>
            <div className="space-y-4">
              {capacity.slice(0, 3).map((t) => (
                <div key={t.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm font-medium">{t.name}</span>
                    <span className="text-white/60 text-xs font-mono tabular-nums">
                      {Math.round((t.saturation || 0) * 100)}%
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/10">
                    <div
                      className={`h-full bg-gradient-to-r ${capacityBarGradient(
                        t.saturation || 0
                      )} shadow-lg transition-all duration-500`}
                      style={{ width: `${(t.saturation || 0) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {capacity.length === 0 && (
                <div className="text-sm text-white/40 text-center py-6">
                  No teams configured
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bloc 6 : Focus du jour */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div className="relative bg-black/60 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-6 hover:border-amber-400/60 transition-all">
            <h2 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Today's Focus
            </h2>
            <div className="space-y-3">
              {focus.slice(0, 3).map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm px-4 py-3 hover:border-amber-400/50 hover:bg-black/60 transition-all"
                >
                  <div className="text-sm text-amber-300 font-bold uppercase tracking-wider flex items-center gap-2">
                    {f.type === "secure" && <CheckCircle className="w-3.5 h-3.5" />}
                    {f.type === "accelerate" && <TrendingUp className="w-3.5 h-3.5" />}
                    {f.type === "arbitrate" && <Clock className="w-3.5 h-3.5" />}
                    {f.type === "secure" ? "Secure" : f.type === "accelerate" ? "Accelerate" : "Arbitrate"}
                  </div>
                  <div className="text-xs text-white/70 mt-2 leading-relaxed">
                    {f.description}
                  </div>
                </div>
              ))}
              {focus.length === 0 && (
                <div className="text-sm text-white/40 text-center py-6">
                  No focus defined
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CockpitLayout>
  );
}
