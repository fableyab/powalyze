import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from '@/lib/projectService';
import { getDecisions } from '@/lib/decisionService';
import { toast } from 'react-hot-toast';

export default function DashboardSensible() {
  const [view, setView] = useState("executive");
  const [pulses, setPulses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données réelles depuis Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Charger les projets
        const projectsResult = await getProjects();
        if (projectsResult.success && projectsResult.data && projectsResult.data.length > 0) {
          setProjects(projectsResult.data);
        } else {
          // Environnement vide - pas de données de test
          setProjects([]);
        }

        // Charger les décisions
        const decisionsResult = await getDecisions();
        if (decisionsResult && decisionsResult.success) {
          const decisionsData = Array.isArray(decisionsResult) ? decisionsResult : (decisionsResult?.data || []);
          setDecisions(decisionsData);
        } else {
          setDecisions([]);
        }
      } catch (error) {
        console.error('Erreur chargement données:', error);
        // Environnement vide en cas d'erreur
        setProjects([]);
        setDecisions([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // génère des "pulses" KPI vivants - Swiss Precision
  useEffect(() => {
    const base = [
      { id: "kpi1", label: "Engagement Rate", value: 86, trend: "up" },
      { id: "kpi2", label: "Portfolio Health", value: 74, trend: "stable" },
      { id: "kpi3", label: "Risk Control", value: 63, trend: "up" },
      { id: "kpi4", label: "Decision Latency", value: 12, trend: "down" },
    ];
    setPulses(base);

    const interval = setInterval(() => {
      setPulses((prev) =>
        prev.map((p) => {
          const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          let value = Math.min(100, Math.max(0, p.value + delta));
          let trend = p.trend;
          if (delta > 0) trend = "up";
          if (delta < 0) trend = "down";
          if (delta === 0) trend = "stable";
          return { ...p, value, trend };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const filteredInitiatives = useMemo(() => {
    if (view === "executive") return projects;
    if (view === "pmo") return projects.filter((p) => p.lane !== "Run");
    if (view === "risk") return projects.filter((p) => p.risk_level !== "Faible");
    return projects;
  }, [view, projects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020713] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          <p className="text-white/60 mt-4 text-sm">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020713] text-white">
      {/* halo central "Powalyze" */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(circle_at_10%_80%,rgba(56,189,248,0.15),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#D4AF37]/30 text-xs font-light text-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-700">
              PZ
            </div>
            <div>
              <div className="text-[10px] font-light tracking-[0.3em] text-white uppercase">
                POWALYZE
              </div>
              <div className="text-[8px] text-white/30 tracking-[0.2em] font-extralight uppercase">Swiss Precision</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton active href="#top">
              Global View
            </NavButton>
            <NavButton href="#lane-grid">Run / Change / Transform</NavButton>
            <NavButton href="#signals">Signals & Pulses</NavButton>
            <NavButton href="#timeline">Decision Timeline</NavButton>
            <div className="border-t border-white/5 my-2" />
            <NavButton href="/app/projets-sensible">Projects</NavButton>
            <NavButton href="/app/portfolio-sensible">Portfolio</NavButton>
            <NavButton href="/app/alertes-sensible">Alerts</NavButton>
            <NavButton href="/app/equipe-sensible">Équipe</NavButton>
            <NavButton href="/app/documents-sensible">Documents</NavButton>
          </nav>

          <div className="border-t border-white/5 px-4 py-3 text-[9px] text-white/30 font-light tracking-[0.1em]">
            POWALYZE • SWISS PRECISION<br />
            Executive Governance OS
          </div>
        </aside>

        {/* Main */}
        <main
          id="top"
          className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40"
        >
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-white/5 bg-black/95 backdrop-blur-2xl px-5 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-extralight tracking-tight text-white">
                  Executive Dashboard
                </h1>
                <p className="text-[10px] lg:text-xs text-white/30 font-light tracking-[0.1em]">
                  Real-time governance intelligence • Portfolio, Risks, Decisions, Weak Signals
                </p>
              </div>
              <ViewSwitcher view={view} onChange={setView} />
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4 lg:space-y-5">
            {/* Ligne 1 : anneau central + pulses */}
            <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
              <CentralRing view={view} initiatives={filteredInitiatives} />
              <PulsesPanel pulses={pulses} />
            </section>

            {/* Ligne 2 : grille Run / Change / Transform */}
            <section
              id="lane-grid"
              className="grid gap-4 2xl:grid-cols-3"
            >
              <LaneColumn
                title="Run"
                subtitle="Stabilité du socle"
                color="from-sky-500/40 via-sky-500/10 to-transparent"
                initiatives={filteredInitiatives.filter((i) => i.lane === "Run")}
              />
              <LaneColumn
                title="Change"
                subtitle="Évolution contrôlée"
                color="from-emerald-500/40 via-emerald-500/10 to-transparent"
                initiatives={filteredInitiatives.filter((i) => i.lane === "Change")}
              />
              <LaneColumn
                title="Transform"
                subtitle="Paris stratégiques"
                color="from-fuchsia-500/40 via-fuchsia-500/10 to-transparent"
                initiatives={filteredInitiatives.filter((i) => i.lane === "Transform")}
              />
            </section>

            {/* Ligne 3 : signaux + timeline */}
            <section
              id="signals"
              className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <SignalsMiniChart initiatives={filteredInitiatives} />
              <TimelineDecisions decisions={decisions} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* === UI components === */

function NavButton({ href, children, active }) {
  const isExternal = href?.startsWith('#');
  
  if (isExternal) {
    return (
      <a
        href={href}
        className={[
          "flex items-center gap-2 rounded-[2px] px-3 py-2.5 text-white/40 hover:bg-white/5 hover:text-white transition-all duration-500 text-[10px] font-light tracking-[0.1em] uppercase",
          active ? "bg-white/5 text-white border-l-2 border-[#D4AF37]" : "",
        ].join(" ")}
      >
        <span className="h-1 w-1 rounded-full bg-[#D4AF37]/50" />
        <span>{children}</span>
      </a>
    );
  }
  
  return (
    <Link
      to={href}
      className={[
        "flex items-center gap-2 rounded-[2px] px-3 py-2.5 text-white/40 hover:bg-white/5 hover:text-white transition-all duration-500 text-[10px] font-light tracking-[0.1em] uppercase",
        active ? "bg-white/5 text-white border-l-2 border-[#D4AF37]" : "",
      ].join(" ")}
    >
      <span className="h-1 w-1 rounded-full bg-[#D4AF37]/50" />
      <span>{children}</span>
    </Link>
  );
}

function ViewSwitcher({ view, onChange }) {
  const tabs = [
    { id: "executive", label: "Executive", desc: "Strategic View" },
    { id: "pmo", label: "PMO", desc: "Capacity & Sequence" },
    { id: "risk", label: "Risk", desc: "Exposure Analysis" },
  ];
  return (
    <div className="flex rounded-2xl border border-white/15 bg-black/60 px-1 py-1 text-[10px] lg:text-xs">
      {tabs.map((t) => {
        const active = t.id === view;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={[
              "flex flex-col px-2.5 py-1.5 rounded-xl transition",
              active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5",
            ].join(" ")}
          >
            <span className="font-medium">{t.label}</span>
            <span className="text-[9px] text-white/50">{t.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

function CentralRing({ view, initiatives }) {
  // État vide - pas de données
  if (initiatives.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl px-5 py-4 lg:px-7 lg:py-6">
        <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center">
          <div className="h-32 w-32 rounded-full border-2 border-dashed border-white/20 mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-white/80 text-sm font-light mb-2">Aucune initiative pour le moment</h3>
          <p className="text-white/50 text-xs max-w-xs">Créez vos premiers projets pour voir apparaître les indicateurs de santé du portefeuille.</p>
          <Link 
            to="/app/projects/new" 
            className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-white text-xs font-medium hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
          >
            Créer une initiative
          </Link>
        </div>
      </div>
    );
  }

  const progressAvg =
    initiatives.reduce((acc, i) => acc + (i.progress || 0), 0) /
      Math.max(initiatives.length, 1) || 0;

  const riskScore =
    initiatives.reduce((acc, i) => {
      const riskLevel = i.risk_level || i.riskLevel; // Support both formats
      if (riskLevel === "Élevé" || riskLevel === "high") return acc + 2;
      if (riskLevel === "Moyen" || riskLevel === "medium") return acc + 1;
      return acc;
    }, 0) * 8;

  const label =
    view === "executive"
      ? "Santé du portefeuille"
      : view === "pmo"
      ? "Charge & avancement"
      : "Profil de risque";

  const accentColor =
    view === "executive"
      ? "from-[#D4AF37] to-[#fceabb]"
      : view === "pmo"
      ? "from-sky-400 to-cyan-300"
      : "from-rose-400 to-orange-300";

  const metricMain =
    view === "risk" ? clamp(100 - riskScore, 0, 100) : clamp(progressAvg, 0, 100);

  const metricComp = view === "risk" ? riskScore : initiatives.length * 11;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl px-5 py-4 lg:px-7 lg:py-6">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-5 lg:gap-8">
        {/* anneau */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative h-40 w-40 lg:h-52 lg:w-52">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-white/0 border border-white/10" />
            <div className="absolute inset-4 rounded-full bg-black/70 backdrop-blur-xl border border-white/10" />
            <div
              className="absolute inset-1 rounded-full border-2 border-dashed border-white/15 animate-[spin_16s_linear_infinite]"
            />
            <div
              className={[
                "absolute inset-2 rounded-full border border-transparent border-t-2 animate-[spin_9s_linear_infinite]",
                accentColor,
              ].join(" ")}
            />
            <div className="absolute inset-8 flex flex-col items-center justify-center text-center">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-1">
                {label}
              </div>
              <div className="text-3xl font-semibold mb-1">
                {Math.round(metricMain)}%
              </div>
              <div className="text-[11px] text-white/60">
                {view === "risk"
                  ? "Robustesse face aux risques prioritaires"
                  : "Avancement consolidé des initiatives"}
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-white/40">
              {initiatives.length} initiatives dans cette vue
            </div>
          </div>
        </div>

        {/* détail texte */}
        <div className="flex-1 space-y-3 text-xs">
          <div>
            <div className="text-[11px] uppercase tracking-[0.17em] text-white/50 mb-1">
              Lecture instantanée
            </div>
            <p className="text-white/70 text-[11px] lg:text-xs leading-relaxed">
              Ce cercle n&apos;est pas un simple KPI. Il traduit en temps réel la
              tension globale de votre portefeuille, en combinant progrès,
              criticité des risques et densité de décisions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MiniMetric
              label="Indice de tension"
              value={clamp(metricComp, 0, 100)}
              mode={view === "risk" ? "hot" : "neutral"}
            />
            <MiniMetric
              label="Signal d'alignement"
              value={clamp(100 - Math.abs(50 - metricMain), 0, 100)}
              mode="cool"
            />
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-white/60">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Flux stable
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Zone de vigilance
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              Tension stratégique
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value, mode }) {
  const navigate = useNavigate();
  const color =
    mode === "cool"
      ? "from-sky-400 to-cyan-300"
      : mode === "hot"
      ? "from-rose-400 to-orange-300"
      : "from-[#D4AF37] to-[#fceabb]";
  
  const handleClick = () => {
    if (label.includes('Sanit\u00e9')) {
      navigate('/app/portfolio-sensible');
    } else if (label.includes('Risque')) {
      navigate('/app/alertes-sensible');
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-2xl border border-white/10 bg-white/5 p-2.5 cursor-pointer hover:bg-white/10 hover:scale-[1.02] transition"
    >
      <div className="text-[10px] text-white/60 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold">{Math.round(value)}%</div>
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PulsesPanel({ pulses }) {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl px-4 py-4 lg:px-5 lg:py-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1">
            Pulses instantanés
          </div>
          <div className="text-xs text-white/60">
            Comment le système &quot;ressent&quot; votre gouvernance.
          </div>
        </div>
        <div className="text-[10px] text-white/50">
          Rafraîchi toutes les 3–4 secondes
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-2 lg:gap-3 text-xs">
        {pulses.map((p) => {
          const handleClick = () => {
            if (p.label.includes('Transformation')) {
              navigate('/app/projets-sensible?filter=Transform');
            } else if (p.label.includes('PMO')) {
              navigate('/app/projets-sensible');
            } else if (p.label.includes('Risque')) {
              navigate('/app/alertes-sensible');
            } else if (p.label.includes('D\u00e9cision')) {
              navigate('/app/projets-sensible');
            }
          };
          
          return (
          <div
            key={p.id}
            onClick={handleClick}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 cursor-pointer hover:bg-white/10 hover:scale-[1.02] transition"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-transparent opacity-20" />
            <div className="relative flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="text-[10px] text-white/60">{p.label}</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-lg font-semibold">{p.value}</div>
                  <div className="text-[10px] text-white/50">/ 100</div>
                </div>
              </div>
              <TrendBadge trend={p.trend} />
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

function TrendBadge({ trend }) {
  const label =
    trend === "up" ? "Amélioration" : trend === "down" ? "Dégradation" : "Stable";
  const color =
    trend === "up"
      ? "text-emerald-300 bg-emerald-400/10 border-emerald-400/40"
      : trend === "down"
      ? "text-rose-300 bg-rose-400/10 border-rose-400/40"
      : "text-sky-200 bg-sky-400/10 border-sky-400/40";
  const symbol = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  return (
    <div
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px]",
        color,
      ].join(" ")}
    >
      <span>{symbol}</span>
      <span>{label}</span>
    </div>
  );
}

function LaneColumn({ title, subtitle, color, initiatives }) {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4">
      <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-40`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-semibold">{title}</div>
            <div className="text-[10px] text-white/60">{subtitle}</div>
          </div>
          <div className="text-[10px] text-white/50">
            {initiatives.length} initiative(s)
          </div>
        </div>
        {initiatives.length === 0 ? (
          <div className="text-[11px] text-white/60 mt-3">
            Rien ici pour le moment. Le cockpit reflétera automatiquement ce lane dès que
            vous y affecterez des initiatives.
          </div>
        ) : (
          <div className="space-y-2 mt-2 text-[11px]">
            {initiatives.map((i) => {
              const handleClick = () => {
                navigate(`/app/projets-sensible?id=${i.id}`);
              };
              
              return (
              <div
                key={i.id}
                onClick={handleClick}
                className="rounded-2xl border border-white/15 bg-black/40 px-3 py-2 cursor-pointer hover:bg-black/30 hover:border-white/25 hover:scale-[1.01] transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{i.name || i.title}</div>
                    <div className="text-[10px] text-white/60">
                      Sponsor : {i.owner || i.sponsor || 'N/A'} · Impact : {i.impact || i.strategic_impact || 'N/A'}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-14 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-white"
                          style={{ width: `${i.progress || 0}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-white/70">
                        {i.progress || 0}%
                      </div>
                    </div>
                    <div className="text-[9px] text-white/60">
                      Risque :{" "}
                      <span
                        className={
                          (i.riskLevel === "Élevé" || i.risk_level === "high")
                            ? "text-rose-300"
                            : (i.riskLevel === "Moyen" || i.risk_level === "medium")
                            ? "text-amber-200"
                            : "text-emerald-200"
                        }
                      >
                        {i.riskLevel || i.risk_level || 'Faible'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SignalsMiniChart({ initiatives }) {
  const points = useMemo(() => {
    if (!initiatives.length) return [];
    const max = 100;
    return initiatives.map((i, idx) => ({
      x: (idx / Math.max(initiatives.length - 1, 1)) * 100,
      y: 100 - (i.progress / max) * 80 - 10,
      label: i.name,
    }));
  }, [initiatives]);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1">
            Signature du portefeuille
          </div>
          <div className="text-xs text-white/60">
            Un &quot;electrocardiogramme&quot; de l&apos;avancement.
          </div>
        </div>
      </div>
      <div className="mt-3 h-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent rounded-2xl" />
        <svg className="relative z-10 h-full w-full">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            points={points
              .map((p) => `${p.x} ${p.y}`)
              .join(" ")}
          />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={3.2} fill="#020617" stroke="#e5e7eb" />
            </g>
          ))}
        </svg>
        <div className="absolute inset-x-2 bottom-1 flex justify-between text-[9px] text-white/40">
          {initiatives.map((i) => (
            <span key={i.id} className="truncate max-w-[25%]">
              {i.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineDecisions({ decisions = [] }) {
  const navigate = useNavigate();
  
  return (
    <div
      id="timeline"
      className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1">
            Timeline des décisions
          </div>
          <div className="text-xs text-white/60">
            Lecture verticale des choix structurants.
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-3">
        {decisions.length === 0 ? (
          <div className="text-[11px] text-white/60 py-4 text-center">
            Aucune décision enregistrée. Les décisions stratégiques apparaîtront ici.
          </div>
        ) : (
          decisions.map((d, index) => {
          const handleClick = () => {
            navigate(`/app/projets-sensible?decision=${d.id}`);
          };
          
          return (
          <div 
            key={d.id} 
            onClick={handleClick}
            className="flex gap-3 text-xs cursor-pointer hover:bg-white/5 rounded-xl p-2 -m-2 transition"
          >
            <div className="flex flex-col items-center mt-1">
              <div
                className={[
                  "h-6 w-6 flex items-center justify-center rounded-full border text-[10px]",
                  (d.type === "Go" || d.decision_type === "go")
                    ? "border-emerald-400/60 text-emerald-300 bg-emerald-400/10"
                    : (d.type === "Stop" || d.decision_type === "stop")
                    ? "border-rose-400/60 text-rose-300 bg-rose-400/10"
                    : (d.type === "Replan" || d.decision_type === "replan")
                    ? "border-amber-300/60 text-amber-200 bg-amber-300/10"
                    : "border-sky-300/60 text-sky-200 bg-sky-300/10",
                ].join(" ")}
              >
                {(d.type === "Go" || d.decision_type === "go")
                  ? "GO"
                  : (d.type === "Stop" || d.decision_type === "stop")
                  ? "X"
                  : (d.type === "Replan" || d.decision_type === "replan")
                  ? "↺"
                  : "👁"}
              </div>
              {index < decisions.length - 1 && (
                <div className="flex-1 w-px bg-gradient-to-b from-white/40 to-transparent mt-1" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-[11px] lg:text-xs">
                  {d.title}
                </div>
                <div className="text-[10px] text-white/50">
                  {d.time || (d.created_at ? new Date(d.created_at).toLocaleDateString('fr-FR') : '')}
                </div>
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">
                Stream : {d.stream || d.category || 'N/A'}
              </div>
              <div className="text-[10px] text-white/70 mt-1">
                {d.impact || d.description || ''}
              </div>
            </div>
          </div>
          );
        }))}
      </div>
    </div>
  );
}

/* === helpers === */

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
