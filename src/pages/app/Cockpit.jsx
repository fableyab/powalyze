import { useState, useEffect } from 'react';
import CockpitLayout from "../../components/layout/CockpitLayout";
import { useCockpitData } from "../../hooks/useCockpitData";
import { useAuth } from "../../contexts/SupabaseAuthContext";
import { signalColor, riskLevelColor, capacityBarGradient, impactLevelColor, statusDotColor } from "../../utils/cockpitColors";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users, Target, Zap } from 'lucide-react';

export default function CockpitPage() {
  const { orgId } = useAuth();
  const { data, loading } = useCockpitData(orgId);
  const [liveMetrics, setLiveMetrics] = useState({ projects: 847, budget: 2.8, team: 124 });

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

  if (loading) {
    return (
      <CockpitLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white/60">Chargement du cockpit...</div>
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
      {/* Header Visuel Ultra-Premium */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-[#D4AF37] via-white to-[#4A9EFF] bg-clip-text text-transparent">
              Executive Cockpit
            </h1>
            <p className="text-white/60">
              Real-time governance intelligence & strategic insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            {signal && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-xl blur-xl"></div>
                <div className="relative flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                      {Math.round(signal.global_score)}%
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Health Score</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    signal.signal === "critique" ? "bg-red-500" :
                    signal.signal === "tension" ? "bg-amber-500" : "bg-emerald-500"
                  }`}></div>
                </div>
              </div>
            )}
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Last Update</div>
              <div className="text-sm text-white/80 font-mono">{timestamps.lastUpdate}</div>
            </div>
          </div>
        </div>

        {/* KPIs LIVE Ultra-Visuels */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-[#4A9EFF]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 hover:border-[#D4AF37]/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/50">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-semibold">LIVE</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2 tabular-nums">{liveMetrics.projects}</div>
              <div className="text-sm text-white/60">Active Projects</div>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400 font-semibold">+12% vs last month</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 hover:border-blue-400/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400 font-semibold">LIVE</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2 tabular-nums">€{liveMetrics.budget}M</div>
              <div className="text-sm text-white/60">Portfolio Budget</div>
              <div className="flex items-center gap-2 mt-3">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400 font-semibold">94.7% allocated</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-emerald-400/30 rounded-2xl p-6 hover:border-emerald-400/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-400 font-semibold">LIVE</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-white mb-2 tabular-nums">{liveMetrics.team}</div>
              <div className="text-sm text-white/60">Team Members</div>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-semibold">+8 this quarter</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ligne du haut */}
      <div className="grid gap-5 md:grid-cols-3 mb-6">
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
