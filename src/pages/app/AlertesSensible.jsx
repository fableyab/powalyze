import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle2, Filter } from "lucide-react";
import { getAlerts, getAlertStats } from '@/lib/alertsService';
import { toast } from 'react-hot-toast';
import logger from '@/lib/logger';

export default function AlertesSensible() {
  const [filter, setFilter] = useState("all");
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ total: 0, critical: 0, warning: 0, info: 0 });
  const [loading, setLoading] = useState(true);

  // Charger les alertes depuis Supabase
  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        
        // Charger les alertes
        const result = await getAlerts();
        if (result.success) {
          setAlerts(result.data || []);
        } else {
          toast.error('Erreur chargement alertes');
        }

        // Charger les stats
        const statsResult = await getAlertStats();
        if (statsResult.success) {
          setStats(statsResult.data);
        }
      } catch (error) {
        logger.error('AlertesSensible.loadAlerts', error);
        toast.error('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((a) => a.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020713] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          <p className="text-white/60 mt-4 text-sm">Chargement des alertes...</p>
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
              <div className="text-[11px] text-white/60">Alertes & Signaux</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton href="/app/cockpit">Vue d&apos;ensemble</NavButton>
            <NavButton href="/app/projets-sensible">Projets</NavButton>
            <NavButton href="/app/portfolio-sensible">Portfolio</NavButton>
            <NavButton active>Alertes</NavButton>
            <NavButton href="/app/equipe-sensible">Équipe</NavButton>
            <NavButton href="/app/documents-sensible">Documents</NavButton>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/50">
            {stats.critical + stats.warning} alertes actives
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-5 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#D4AF37]" />
                  Centre d&apos;alertes
                </h1>
                <p className="text-xs lg:text-sm text-white/60">
                  Signaux faibles et événements critiques
                </p>
              </div>
              <div className="flex gap-2">
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label="Toutes"
                  count={stats.total}
                />
                <FilterButton
                  active={filter === "critical"}
                  onClick={() => setFilter("critical")}
                  label="Critiques"
                  count={stats.critical}
                  color="rose"
                />
                <FilterButton
                  active={filter === "warning"}
                  onClick={() => setFilter("warning")}
                  label="Alertes"
                  count={stats.warning}
                  color="amber"
                />
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Critiques"
                value={stats.critical}
                color="from-rose-400 to-rose-600"
                icon={<AlertTriangle className="h-4 w-4" />}
              />
              <StatCard
                label="Alertes"
                value={stats.warning}
                color="from-amber-400 to-amber-600"
                icon={<AlertCircle className="h-4 w-4" />}
              />
              <StatCard
                label="Informations"
                value={stats.info}
                color="from-sky-400 to-sky-600"
                icon={<Info className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ href, children, active }) {
  return (
    <Link
      to={href}
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white transition text-xs",
        active ? "bg-white/10 text-white" : "",
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70" />
      <span>{children}</span>
    </Link>
  );
}

function FilterButton({ active, onClick, label, count, color = "gold" }) {
  const colorClass =
    color === "rose"
      ? "text-rose-300 border-rose-400/40"
      : color === "amber"
      ? "text-amber-300 border-amber-400/40"
      : "text-[#D4AF37] border-[#D4AF37]/40";

  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-xl text-xs border transition",
        active ? `${colorClass} bg-white/10` : "border-white/10 text-white/60 bg-white/5 hover:bg-white/10",
      ].join(" ")}
    >
      {label} <span className="ml-1 font-semibold">({count})</span>
    </button>
  );
}

function StatCard({ label, value, color, icon }) {
  const handleClick = () => {
    // Filtrer les alertes par type
    const filterMap = {
      'Critiques': 'critical',
      'Alertes': 'warning',
      'Informations': 'info'
    };
    if (filterMap[label]) {
      document.querySelector(`button:contains("${label}")`)?.[0]?.click();
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 cursor-pointer hover:scale-[1.02] transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</div>
        <div className={`p-2 rounded-xl bg-gradient-to-r ${color}`}>{icon}</div>
      </div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}

function AlertCard({ alert }) {
  const typeConfig = {
    critical: {
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "border-rose-400/60 bg-rose-400/10",
      badge: "bg-rose-400/20 text-rose-300 border-rose-400/40",
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5" />,
      color: "border-amber-400/60 bg-amber-400/10",
      badge: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      color: "border-sky-400/60 bg-sky-400/10",
      badge: "bg-sky-400/20 text-sky-300 border-sky-400/40",
    },
    success: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "border-emerald-400/60 bg-emerald-400/10",
      badge: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
    },
  };

  const config = typeConfig[alert.type];
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigation vers le projet concerné
    navigate('/app/projets-sensible');
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`rounded-3xl border ${config.color} backdrop-blur-2xl p-5 cursor-pointer hover:scale-[1.01] transition`}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 p-3 rounded-2xl ${config.color}`}>{config.icon}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold mb-1">{alert.title}</div>
              <div className="text-xs text-white/70">{alert.description}</div>
            </div>
            <div className="text-[10px] text-white/50">{alert.date}</div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] border ${config.badge}`}>
              <span className="font-semibold">{alert.project}</span>
            </div>
            <div className="text-[10px] text-white/60">→ {alert.action}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
