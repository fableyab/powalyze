import { FileCheck, ArrowRightCircle, CheckCircle2, Users2, Calendar } from "lucide-react";

export default function DecisionHubHighTech() {
  const decisions = [
    {
      id: "DEC-2026-001",
      title: "Valider le budget 2026",
      impact: "Critique",
      impactColor: "rose",
      actions: 3,
      owner: "CFO",
      deadline: "15 Jan",
      status: "pending",
    },
    {
      id: "DEC-2026-002",
      title: "Reprioriser le portefeuille IT",
      impact: "Élevé",
      impactColor: "amber",
      actions: 2,
      owner: "CIO",
      deadline: "20 Jan",
      status: "in-progress",
    },
    {
      id: "DEC-2026-003",
      title: "Approuver programme IA",
      impact: "Stratégique",
      impactColor: "emerald",
      actions: 5,
      owner: "CEO",
      deadline: "25 Jan",
      status: "pending",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-t from-[#0D1B2A] to-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.06]" />
      
      {/* LUMIÈRE */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-amber-400 tracking-[0.2em] uppercase">Executive</span>
          </div>
          <h1 className="text-6xl font-light text-white tracking-tight">
            Decision <span className="font-semibold text-brand-gold">Registry</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {decisions.map((d, i) => (
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
              {/* STATUS BADGE */}
              <div className="absolute top-6 right-6">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                  d.status === 'pending' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    d.status === 'pending' ? 'bg-amber-400' : 'bg-blue-400 animate-pulse'
                  }`} />
                  {d.status === 'pending' ? 'En attente' : 'En cours'}
                </div>
              </div>

              {/* ID */}
              <div className="mb-6">
                <p className="text-white/40 text-xs font-mono tracking-wider">{d.id}</p>
              </div>

              {/* TITLE */}
              <h3 className="text-2xl font-light text-white mb-6 leading-tight">{d.title}</h3>

              {/* IMPACT BADGE */}
              <div className="mb-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${d.impactColor}-500/10 border border-${d.impactColor}-500/20`}>
                  <div className={`w-2 h-2 rounded-full bg-${d.impactColor}-400`} />
                  <span className={`text-sm font-medium text-${d.impactColor}-400`}>Impact {d.impact}</span>
                </div>
              </div>

              {/* METADATA GRID */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Responsable</p>
                  <div className="flex items-center gap-2">
                    <Users2 size={14} className="text-brand-gold" strokeWidth={1.5} />
                    <p className="text-white text-sm font-light">{d.owner}</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">Échéance</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-gold" strokeWidth={1.5} />
                    <p className="text-white text-sm font-light">{d.deadline}</p>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 size={18} className="text-brand-gold" strokeWidth={1.5} />
                  <span className="text-sm">{d.actions} actions</span>
                </div>
                <ArrowRightCircle size={20} className="text-white/30 group-hover:text-brand-gold transition-colors duration-300" strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
