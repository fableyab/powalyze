import { AlertTriangle, Activity, Brain, TrendingDown, Zap, Target } from "lucide-react";

export default function RiskIntelligenceHighTech() {
  const risks = [
    {
      id: "RISK-001",
      title: "Retard planning projet CRM",
      score: 78,
      severity: "critical",
      signals: 3,
      trend: "increasing",
      category: "Planning",
      mitigation: "En cours",
    },
    {
      id: "RISK-002",
      title: "Dérive budget infrastructure",
      score: 64,
      severity: "high",
      signals: 2,
      trend: "stable",
      category: "Budget",
      mitigation: "Planifié",
    },
    {
      id: "RISK-003",
      title: "Ressources clés à risque",
      score: 45,
      severity: "medium",
      signals: 4,
      trend: "decreasing",
      category: "RH",
      mitigation: "Résolu",
    },
  ];

  return (
    <section className="relative py-32 bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.06]" />
      
      {/* LUMIÈRE ROUGE CRITIQUE */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-rose-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-8">
        <div className="flex items-center gap-4 mb-20">
          <div className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-rose-400 tracking-[0.2em] uppercase">AI-Powered</span>
          </div>
          <h1 className="text-6xl font-light text-white tracking-tight">
            Risk <span className="font-semibold text-brand-gold">Intelligence</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {risks.map((r, i) => {
            const severityColors = {
              critical: { bg: 'rose', glow: 'rgba(244,63,94,0.3)' },
              high: { bg: 'amber', glow: 'rgba(245,158,11,0.3)' },
              medium: { bg: 'blue', glow: 'rgba(59,130,246,0.3)' },
            };
            const color = severityColors[r.severity];
            
            return (
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
                {/* SEVERITY INDICATOR */}
                <div className="absolute top-0 left-0 right-0 h-1">
                  <div 
                    className={`h-full bg-${color.bg}-500 shadow-[0_0_20px_${color.glow}]`}
                    style={{ width: `${r.score}%` }}
                  />
                </div>

                {/* ID + CATEGORY */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/40 text-xs font-mono tracking-wider">{r.id}</p>
                  <span className="text-white/40 text-xs uppercase tracking-wider">{r.category}</span>
                </div>

                {/* SCORE CIRCLE */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative w-24 h-24">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={`rgb(${color.bg === 'rose' ? '244,63,94' : color.bg === 'amber' ? '245,158,11' : '59,130,246'})`}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - r.score / 100)}`}
                        className="transition-all duration-1000"
                        style={{ filter: `drop-shadow(0 0 8px ${color.glow})` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-light text-white">{r.score}</span>
                    </div>
                  </div>

                  {/* TREND */}
                  <div className={`p-3 rounded-2xl ${
                    r.trend === 'increasing' ? 'bg-rose-500/10' : 
                    r.trend === 'decreasing' ? 'bg-emerald-500/10' : 
                    'bg-amber-500/10'
                  }`}>
                    <TrendingDown 
                      size={24} 
                      className={`${
                        r.trend === 'increasing' ? 'text-rose-400 rotate-180' : 
                        r.trend === 'decreasing' ? 'text-emerald-400' : 
                        'text-amber-400 rotate-90'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-light text-white mb-6 leading-tight">{r.title}</h3>

                {/* AI SIGNALS */}
                <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain size={18} className="text-brand-gold" strokeWidth={1.5} />
                    <span className="text-white/60 text-sm">Analyse IA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-400" strokeWidth={1.5} />
                    <p className="text-white text-sm font-light">{r.signals} signaux faibles détectés</p>
                  </div>
                </div>

                {/* MITIGATION */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Mitigation</span>
                  <span className={`text-sm font-medium ${
                    r.mitigation === 'En cours' ? 'text-blue-400' :
                    r.mitigation === 'Planifié' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>{r.mitigation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
