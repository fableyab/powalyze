import { useState } from "react";
import { Users, UserCircle, Briefcase, Clock, Target } from "lucide-react";

export default function EquipeSensible() {
  const [filter, setFilter] = useState("all");

  const members = [
    {
      id: "1",
      name: "Sophie Martin",
      role: "PMO Lead",
      avatar: "SM",
      department: "Direction",
      projects: 12,
      utilization: 85,
      status: "available",
      color: "from-fuchsia-500 to-purple-600",
    },
    {
      id: "2",
      name: "Marc Dubois",
      role: "Directeur Transformation",
      avatar: "MD",
      department: "Transformation",
      projects: 8,
      utilization: 92,
      status: "busy",
      color: "from-sky-500 to-blue-600",
    },
    {
      id: "3",
      name: "Isabelle Leroy",
      role: "Program Manager",
      avatar: "IL",
      department: "PMO",
      projects: 6,
      utilization: 78,
      status: "available",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "4",
      name: "Thomas Bernard",
      role: "Lead Architecte",
      avatar: "TB",
      department: "IT",
      projects: 4,
      utilization: 88,
      status: "available",
      color: "from-amber-500 to-orange-600",
    },
  ];

  const filteredMembers = filter === "all" ? members : members.filter((m) => m.status === filter);

  const stats = {
    total: members.length,
    available: members.filter((m) => m.status === "available").length,
    avgUtilization: Math.round(members.reduce((acc, m) => acc + m.utilization, 0) / members.length),
    totalProjects: members.reduce((acc, m) => acc + m.projects, 0),
  };

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
              <div className="text-[11px] text-white/60">Équipe & Ressources</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 text-sm space-y-1">
            <NavButton href="/app/cockpit">Vue d&apos;ensemble</NavButton>
            <NavButton href="/app/projets-sensible">Projets</NavButton>
            <NavButton href="/app/portfolio-sensible">Portfolio</NavButton>
            <NavButton href="/app/alertes-sensible">Alertes</NavButton>
            <NavButton active>Équipe</NavButton>
            <NavButton href="/app/documents-sensible">Documents</NavButton>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/50">
            {stats.available}/{stats.total} disponibles
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-black/10 to-black/40">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-2xl px-5 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg lg:text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#D4AF37]" />
                  Équipe & Ressources
                </h1>
                <p className="text-xs lg:text-sm text-white/60">
                  Vue unifiée des capacités et de la charge
                </p>
              </div>
              <div className="flex gap-2">
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label="Tous"
                />
                <FilterButton
                  active={filter === "available"}
                  onClick={() => setFilter("available")}
                  label="Disponibles"
                />
                <FilterButton
                  active={filter === "busy"}
                  onClick={() => setFilter("busy")}
                  label="Occupés"
                />
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-4 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <StatCard
                label="Collaborateurs"
                value={stats.total}
                color="from-fuchsia-400 to-fuchsia-600"
                icon={<Users className="h-4 w-4" />}
              />
              <StatCard
                label="Disponibles"
                value={stats.available}
                color="from-emerald-400 to-emerald-600"
                icon={<UserCircle className="h-4 w-4" />}
              />
              <StatCard
                label="Taux moyen"
                value={`${stats.avgUtilization}%`}
                color="from-sky-400 to-sky-600"
                icon={<Clock className="h-4 w-4" />}
              />
              <StatCard
                label="Projets actifs"
                value={stats.totalProjects}
                color="from-amber-400 to-amber-600"
                icon={<Target className="h-4 w-4" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
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

function FilterButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-xl text-xs border transition",
        active
          ? "text-[#D4AF37] border-[#D4AF37]/40 bg-white/10"
          : "border-white/10 text-white/60 bg-white/5 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function StatCard({ label, value, color, icon }) {
  const handleClick = () => {
    if (label.toLowerCase().includes('projet')) {
      window.location.href = '/app/projets-sensible';
    } else if (label.toLowerCase().includes('collaborateur') || label.toLowerCase().includes('disponible')) {
      window.location.href = '/app/equipe-sensible';
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
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}

function MemberCard({ member }) {
  const statusConfig = {
    available: {
      label: "Disponible",
      class: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
    },
    busy: {
      label: "Occupé",
      class: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    },
  };

  const status = statusConfig[member.status];

  const handleClick = () => {
    // Navigation vers le profil du membre
    window.location.href = `/app/equipe-sensible?member=${member.id}`;
  };
  
  return (
    <div 
      onClick={handleClick}
      className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-5 hover:bg-white/5 hover:scale-[1.01] transition cursor-pointer"
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 h-16 w-16 rounded-2xl bg-gradient-to-r ${member.color} flex items-center justify-center text-xl font-bold`}>
          {member.avatar}
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <div className="text-sm font-semibold mb-1">{member.name}</div>
            <div className="text-xs text-white/70">{member.role}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] border ${status.class}`}>
              {status.label}
            </div>
            <div className="text-[10px] text-white/50">{member.department}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] text-white/50 mb-1">Projets actifs</div>
          <div className="text-lg font-semibold">{member.projects}</div>
        </div>
        <div>
          <div className="text-[10px] text-white/50 mb-1">Utilisation</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${member.color}`}
                style={{ width: `${member.utilization}%` }}
              />
            </div>
            <div className="text-xs font-semibold">{member.utilization}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
