import {
  AlertTriangle,
  CalendarCheck,
  FileCheck,
  BarChart3,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function CockpitHighTech() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2A] to-[#0A1628] py-32 px-8 overflow-hidden">

      {/* GRID TECH ANIMÉ */}
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />

      {/* LUMIÈRE CENTRALE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      {/* CONTENT */}
      <div className="relative max-w-[1600px] mx-auto">

        {/* TITLE + BADGE */}
        <div className="flex items-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-brand-gold tracking-[0.2em] uppercase">Executive</span>
          </div>
          <h1 className="text-6xl font-light text-white tracking-tight">
            Cockpit <span className="font-semibold text-brand-gold">OS</span>
          </h1>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 — Santé du portefeuille */}
          <CockpitCard
            title="Santé du portefeuille"
            icon={TrendingUp}
            value="12 projets"
            sub="8 GREEN • 3 AMBER • 1 RED"
            bars={[80, 60, 90, 50, 70]}
          />

          {/* CARD 2 — Projets à risque */}
          <CockpitCard
            title="Projets à risque"
            icon={AlertTriangle}
            value="3 critiques"
            sub="Analyse IA disponible"
            bars={[30, 70, 55, 40, 85]}
          />

          {/* CARD 3 — Décisions en attente */}
          <CockpitCard
            title="Décisions en attente"
            icon={FileCheck}
            value="5 décisions"
            sub="2 urgentes"
            bars={[40, 50, 60, 30, 90]}
          />

          {/* CARD 4 — Signaux IA */}
          <CockpitCard
            title="Signaux IA"
            icon={Activity}
            value="7 signaux"
            sub="3 dérives probables"
            bars={[20, 40, 80, 60, 50]}
          />

          {/* CARD 5 — Prochains comités */}
          <CockpitCard
            title="Prochains comités"
            icon={CalendarCheck}
            value="2 cette semaine"
            sub="Comité stratégique • Comité IT"
            bars={[60, 30, 50, 70, 40]}
          />

          {/* CARD 6 — KPI stratégiques */}
          <CockpitCard
            title="KPI stratégiques"
            icon={BarChart3}
            value="6 KPI"
            sub="Mise à jour automatique"
            bars={[90, 70, 40, 60, 80]}
          />

        </div>
      </div>
    </section>
  );
}

/* COMPONENT — CARD PREMIUM */
function CockpitCard({ title, icon: Icon, value, sub, bars }) {
  return (
    <div
      className="
        group relative p-10 rounded-3xl 
        bg-gradient-to-br from-white/[0.07] to-white/[0.02]
        backdrop-blur-2xl 
        border border-white/[0.08]
        hover:border-brand-gold/30
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        hover:shadow-[0_8px_48px_rgba(212,175,55,0.15)]
        hover:scale-[1.02]
        transition-all duration-500 ease-out
        overflow-hidden
      "
    >
      {/* EFFET LUMIÈRE HOVER */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 via-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/10 flex items-center justify-center backdrop-blur-sm">
          <Icon size={24} className="text-brand-gold" strokeWidth={1.5} />
        </div>
        <ArrowUpRight size={20} className="text-white/30 group-hover:text-brand-gold/60 transition-colors duration-300" strokeWidth={1.5} />
      </div>

      {/* TITLE */}
      <h3 className="text-sm font-medium text-white/60 mb-3 tracking-wide uppercase">{title}</h3>

      {/* VALUE */}
      <div className="text-4xl font-light text-white mb-2 tracking-tight">{value}</div>

      {/* SUBTEXT */}
      <p className="text-white/40 text-xs mb-8 leading-relaxed">{sub}</p>

      {/* MICRO‑GRAPH PREMIUM */}
      <div className="h-12 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="
              flex-1 rounded-t-md bg-gradient-to-t from-brand-gold/60 to-brand-gold/20
              group-hover:from-brand-gold group-hover:to-brand-gold/40
              transition-all duration-700
              shadow-[0_0_20px_rgba(212,175,55,0.3)]
            "
            style={{ 
              height: `${h}%`,
              transitionDelay: `${i * 50}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
}
