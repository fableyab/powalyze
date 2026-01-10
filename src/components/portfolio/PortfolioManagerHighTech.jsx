import { FolderKanban, TrendingUp, AlertTriangle, Users, Target, Zap } from "lucide-react";

export default function PortfolioManagerHighTech() {
  const portfolios = [
    {
      name: "Transformation Digitale",
      health: "GREEN",
      healthColor: "emerald",
      projects: 12,
      risks: 3,
      progress: 78,
      budget: "€2.4M",
      roi: "+34%",
    },
    {
      name: "Modernisation IT",
      health: "AMBER",
      healthColor: "amber",
      projects: 9,
      risks: 5,
      progress: 52,
      budget: "€1.8M",
      roi: "+18%",
    },
    {
      name: "Programme Innovation",
      health: "RED",
      healthColor: "rose",
      projects: 6,
      risks: 4,
      progress: 34,
      budget: "€1.2M",
      roi: "+12%",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0D1B2A] to-[#0A1628] overflow-hidden">

      {/* GRID TECH */}
      <div className="absolute inset-0 tech-grid opacity-[0.06]" />

      {/* LUMIÈRE */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-emerald-400 tracking-[0.2em] uppercase">Strategic</span>
          </div>
          <h1 className="text-6xl font-light text-white tracking-tight">
            Portfolio <span className="font-semibold text-brand-gold">Intelligence</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {portfolios.map((p, i) => (
            <div
              key={i}
              className="
                group relative p-10 rounded-3xl 
                bg-gradient-to-br from-white/[0.07] to-white/[0.02]
                backdrop-blur-2xl 
                border border-white/[0.08]
                hover:border-brand-gold/30
                hover:scale-[1.02]
                transition-all duration-500
                overflow-hidden
              "
            >
              {/* STATUT BADGE */}
              <div className="absolute top-6 right-6">
                <div className={`w-3 h-3 rounded-full bg-${p.healthColor}-500 shadow-[0_0_12px_rgba(${p.healthColor === 'emerald' ? '16,185,129' : p.healthColor === 'amber' ? '245,158,11' : '244,63,94'},0.6)]`} />
              </div>

              {/* ICON + NAME */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center backdrop-blur-sm">
                  <Target size={24} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white mb-1">{p.name}</h3>
                  <p className="text-white/40 text-sm">{p.projects} projets actifs</p>
                </div>
              </div>

              {/* METRICS GRID */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Budget</p>
                  <p className="text-white text-lg font-light">{p.budget}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">ROI</p>
                  <p className="text-emerald-400 text-lg font-light">{p.roi}</p>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Progression</span>
                  <span className="text-brand-gold text-2xl font-light">{p.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-gold/60 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* RISKS */}
              {p.risks > 0 && (
                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <AlertTriangle size={16} className="text-amber-500" strokeWidth={1.5} />
                  <span className="text-white/40 text-xs">{p.risks} risques identifiés</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
