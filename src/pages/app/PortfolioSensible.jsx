import { useState, useEffect } from "react";
import { Layers, TrendingUp, DollarSign, Target, AlertCircle, Clock } from "lucide-react";
import { getProjectStats } from '@/lib/projectService';
import { toast } from 'react-hot-toast';

export default function PortfolioSensible() {
  const [view, setView] = useState("strategic");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les stats depuis Supabase
  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const result = await getProjectStats();
        if (result.success) {
          setStats(result.data);
        } else {
          toast.error('Erreur chargement statistiques');
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error);
        toast.error('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  // Données statiques pour les segments (peut être adapté plus tard)
  const segments = [
    {
      id: "strategic",
      name: "Stratégique",
      color: "from-fuchsia-500 to-purple-600",
      projects: stats?.total || 0,
      budget: stats?.totalBudget || 0,
      progress: stats?.avgProgress || 0,
      risk: "Moyen",
    },
    {
      id: "operational",
      name: "Opérationnel",
      color: "from-emerald-500 to-teal-600",
      projects: Math.floor((stats?.total || 0) * 0.5),
      budget: Math.floor((stats?.totalBudget || 0) * 0.4),
      progress: (stats?.avgProgress || 0) + 10,
      risk: "Faible",
    },
    {
      id: "compliance",
      name: "Conformité",
      color: "from-sky-500 to-blue-600",
      projects: Math.floor((stats?.total || 0) * 0.3),
      budget: Math.floor((stats?.totalBudget || 0) * 0.3),
      progress: (stats?.avgProgress || 0) - 5,
      risk: "Élevé",
    },
  ];

  const kpis = [
    { 
      label: "Valeur livrée", 
      value: stats ? `${((stats.totalBudget || 0) / 1000000).toFixed(1)}M€` : "0M€", 
      trend: "+18%", 
      icon: <DollarSign className="h-4 w-4" /> 
    },
    { 
      label: "Projets on-track", 
      value: stats ? `${stats.active || 0}/${stats.total || 0}` : "0/0", 
      trend: "+5%", 
      icon: <Target className="h-4 w-4" /> 
    },
    { 
      label: "Projets actifs", 
      value: String(stats?.active || 0), 
      trend: "stable", 
      icon: <AlertCircle className="h-4 w-4" /> 
    },
    { 
      label: "Avancement moyen", 
      value: `${Math.round(stats?.avgProgress || 0)}%`, 
      trend: "+8%", 
      icon: <Clock className="h-4 w-4" /> 
    },
  ];

  const activeSegment = segments.find((s) => s.id === view);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020713] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          <p className="text-white/60 mt-4 text-sm">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020713] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.20),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] text-xs font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.9)]">
              PZ
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
                Powalyze
              </div>
              <div className="text-[11px] text-white/60">Portfolio</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton href="/app/cockpit">Vue d&apos;ensemble</NavButton>
            <NavButton href="/app/projets-sensible">Projets</NavButton>
            <NavButton active>Portfolio</NavButton>
            <NavButton href="/app/alertes-sensible">Alertes</NavButton>
            <NavButton href="/app/equipe-sensible">Équipe</NavButton>
            <NavButton href="/app/documents-sensible">Documents</NavButton>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/50">
            {segments.reduce((acc, s) => acc + s.projects, 0)} projets • {((segments.reduce((acc, s) => acc + s.budget, 0)) / 1000000).toFixed(1)}M€
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-5 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#D4AF37]" />
                  Portfolio stratégique
                </h1>
                <p className="text-xs lg:text-sm text-white/60">
                  Vision consolidée de vos investissements
                </p>
              </div>
              <ViewSwitcher view={view} onChange={setView} segments={segments} />
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.label} {...kpi} />
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {segments.map((segment) => (
                <SegmentCard key={segment.id} segment={segment} />
              ))}
            </div>

            {activeSegment && (
              <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Détails segment : {activeSegment.name}</h2>
                    <p className="text-xs text-white/60">{activeSegment.projects} projets actifs</p>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${activeSegment.color} text-sm font-semibold`}>
                    {((activeSegment.budget / 1000000)).toFixed(1)}M€
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/60 mb-1">Avancement moyen</div>
                    <div className="text-2xl font-semibold">{activeSegment.progress}%</div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${activeSegment.color}`} style={{ width: `${activeSegment.progress}%` }} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/60 mb-1">Niveau de risque</div>
                    <div className="text-2xl font-semibold">{activeSegment.risk}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[10px] text-white/60 mb-1">Budget restant</div>
                    <div className="text-2xl font-semibold">
                      {((activeSegment.budget * (100 - activeSegment.progress) / 100) / 1000000).toFixed(1)}M€
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ href, children, active }) {
  return (
    <a
      href={href}
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition text-xs",
        active ? "bg-white/10 text-white" : "",
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70" />
      <span>{children}</span>
    </a>
  );
}

function ViewSwitcher({ view, onChange, segments }) {
  return (
    <div className="flex rounded-2xl border border-white/15 bg-black/60 px-1 py-1 text-[10px]">
      {segments.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={[
            "px-3 py-1.5 rounded-xl transition text-xs",
            view === s.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
          ].join(" ")}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}

function KpiCard({ label, value, trend, icon }) {
  const handleClick = () => {
    if (label.toLowerCase().includes('valeur')) {
      window.location.href = '/app/portfolio-sensible';
    } else if (label.toLowerCase().includes('risque')) {
      window.location.href = '/app/alertes-sensible';
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 cursor-pointer hover:scale-[1.02] hover:border-white/20 transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</div>
        <div className="p-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#fceabb]">{icon}</div>
      </div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="text-[10px] text-emerald-300">{trend}</div>
    </div>
  );
}

function SegmentCard({ segment }) {
  const handleClick = () => {
    // Navigation vers la vue détaillée du segment
    window.location.href = `/app/projets-sensible?segment=${segment.id}`;
  };
  
  return (
    <div 
      onClick={handleClick}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-5 cursor-pointer hover:scale-[1.02] hover:border-white/20 transition"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-20`} />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{segment.name}</div>
          <TrendingUp className="h-4 w-4 text-white/60" />
        </div>
        <div className="text-2xl font-bold">{segment.projects}</div>
        <div className="text-[10px] text-white/60">projets actifs</div>
        <div className="pt-3 border-t border-white/10">
          <div className="text-[10px] text-white/60 mb-1">Budget alloué</div>
          <div className="text-lg font-semibold">{(segment.budget / 1000000).toFixed(1)}M€</div>
        </div>
      </div>
    </div>
  );
}
