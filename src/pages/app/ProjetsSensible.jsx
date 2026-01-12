import { useState, useEffect } from "react";
import { Target, Plus, Filter, Search, TrendingUp, Calendar, Users, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjects, getProjectStats } from '@/lib/projectService';
import { toast } from 'react-hot-toast';

export default function ProjetsSensible() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, budget: 0, spent: 0 });
  const [loading, setLoading] = useState(true);

  // Charger les projets depuis Supabase
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const result = await getProjects();
        if (result.success) {
          setProjects(result.data || []);
        } else {
          toast.error('Erreur chargement projets');
        }

        // Charger les stats
        const statsResult = await getProjectStats();
        if (statsResult.success) {
          setStats(statsResult.data);
        }
      } catch (error) {
        console.error('Erreur chargement projets:', error);
        toast.error('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter !== "all" && p.lane !== filter) return false;
    if (searchTerm && !(p.name || p.title || '').toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020713] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          <p className="text-white/60 mt-4 text-sm">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020713] text-white">
      {/* Radial glow */}
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.20),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] text-xs font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.9)]">
              PZ
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
                Powalyze
              </div>
              <div className="text-[11px] text-white/60">Gestion projets</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton href="/app/cockpit">Vue d&apos;ensemble</NavButton>
            <NavButton active>Projets</NavButton>
            <NavButton href="/app/portfolio-sensible">Portfolio</NavButton>
            <NavButton href="/app/alertes-sensible">Alertes</NavButton>
            <NavButton href="/app/equipe-sensible">Équipe</NavButton>
            <NavButton href="/app/documents-sensible">Documents</NavButton>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/50">
            {stats.total} projets actifs • {((stats.spent / stats.budget) * 100).toFixed(0)}% budget utilisé
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-5 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#D4AF37]" />
                  Projets stratégiques
                </h1>
                <p className="text-xs lg:text-sm text-white/60">
                  Pilotez vos initiatives avec précision
                </p>
              </div>
              <button
                onClick={() => navigate("/app/projects/new")}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold text-sm hover:opacity-90 transition"
              >
                <Plus className="h-4 w-4" />
                Nouveau projet
              </button>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard
                label="Projets actifs"
                value={stats.active}
                total={stats.total}
                icon={<Target className="h-4 w-4" />}
                color="from-emerald-400 to-emerald-600"
              />
              <StatCard
                label="Budget total"
                value={`${(stats.budget / 1000000).toFixed(1)}M€`}
                subtitle={`${(stats.spent / 1000000).toFixed(1)}M€ dépensés`}
                icon={<TrendingUp className="h-4 w-4" />}
                color="from-sky-400 to-sky-600"
              />
              <StatCard
                label="Taux d'avancement"
                value={`${Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%`}
                subtitle="Moyenne portfolio"
                icon={<Calendar className="h-4 w-4" />}
                color="from-[#D4AF37] to-[#fceabb]"
              />
              <StatCard
                label="Ressources"
                value={projects.reduce((acc, p) => acc + p.team, 0)}
                subtitle="Membres actifs"
                icon={<Users className="h-4 w-4" />}
                color="from-fuchsia-400 to-fuchsia-600"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div className="flex gap-2">
                {["all", "Transform", "Change", "Run"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={[
                      "px-4 py-2.5 rounded-2xl text-sm font-medium transition",
                      filter === f
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10",
                    ].join(" ")}
                  >
                    {f === "all" ? "Tous" : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onClick={() => navigate(`/app/projects/${project.id}`)} />
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

function StatCard({ label, value, subtitle, total, icon, color }) {
  const handleClick = () => {
    // Navigation basée sur le type de stat
    if (label.toLowerCase().includes('projet')) {
      window.location.href = '/app/projets-sensible';
    } else if (label.toLowerCase().includes('budget')) {
      window.location.href = '/app/portfolio-sensible';
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 cursor-pointer hover:scale-[1.02] hover:border-white/20 transition"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</div>
        <div className={`p-2 rounded-xl bg-gradient-to-r ${color}`}>{icon}</div>
      </div>
      <div className="text-2xl font-semibold mb-1">
        {value}
        {total && <span className="text-sm text-white/50 ml-1">/ {total}</span>}
      </div>
      {subtitle && <div className="text-[10px] text-white/60">{subtitle}</div>}
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const risk = project.risk || project.risk_level || 'Faible';
  const riskColor =
    (risk === "Élevé" || risk === "high")
      ? "text-rose-300 bg-rose-400/10 border-rose-400/40"
      : (risk === "Moyen" || risk === "medium")
      ? "text-amber-300 bg-amber-400/10 border-amber-400/40"
      : "text-emerald-300 bg-emerald-400/10 border-emerald-400/40";

  const lane = project.lane || 'Run';
  const laneColor =
    lane === "Transform"
      ? "from-fuchsia-500/40 via-fuchsia-500/10 to-transparent"
      : lane === "Change"
      ? "from-emerald-500/40 via-emerald-500/10 to-transparent"
      : "from-sky-500/40 via-sky-500/10 to-transparent";

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-4 cursor-pointer hover:border-[#D4AF37]/50 transition group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${laneColor} opacity-30 group-hover:opacity-50 transition`} />
      
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold mb-1">{project.name || project.title}</div>
            <div className="text-[10px] text-white/60">Sponsor: {project.sponsor || project.owner || 'N/A'}</div>
          </div>
          <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] ${riskColor}`}>
            <AlertTriangle className="h-3 w-3" />
            <span>{risk}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/60">Avancement</span>
            <span className="text-white/90 font-semibold">{project.progress || 0}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
              style={{ width: `${project.progress || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1 text-white/60">
            <Users className="h-3 w-3" />
            <span>{project.team || project.team_size || 0} membres</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <Calendar className="h-3 w-3" />
            <span>{project.deadline ? new Date(project.deadline).toLocaleDateString("fr-FR") : 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="text-[10px] text-white/60">
            Budget: {project.budget ? ((project.budget / 1000).toFixed(0) + 'k€') : 'N/A'}
          </div>
          <div className="text-[10px] text-white/90 font-semibold">
            {project.spent && project.budget ? 
              `${((project.spent / project.budget) * 100).toFixed(0)}% consommé` : 
              'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}
