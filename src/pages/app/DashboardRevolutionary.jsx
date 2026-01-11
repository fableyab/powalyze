import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Target, Zap, Users, TrendingUp, Calendar, FileText, Settings, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const kpis = [
  { label: "% On Track", value: "72%", accent: "bg-emerald-400" },
  { label: "Budget utilisé", value: "61%", accent: "bg-amber-400" },
  { label: "Alignement stratégique", value: "88%", accent: "bg-sky-400" }
];

const committees = [
  {
    name: "Comité Portefeuille Stratégique",
    date: "Jeu 24 Oct",
    time: "09:00 – 10:30",
    decisions: 7,
    status: "Préparé",
    progress: 76
  },
  {
    name: "Comité Risques & Conformité",
    date: "Lun 28 Oct",
    time: "14:00 – 15:30",
    decisions: 5,
    status: "En préparation",
    progress: 48
  },
  {
    name: "Board Q4 Transformation",
    date: "Mar 05 Nov",
    time: "16:00 – 18:00",
    decisions: 9,
    status: "À cadrer",
    progress: 22
  }
];

const projectsColumns = [
  {
    id: "strategic",
    title: "Stratégique",
    color: "from-emerald-400/40 to-emerald-500/10",
    items: [
      {
        name: "Programme Digital Core",
        owner: "PMO Central",
        budget: "1.2 M€",
        risk: "low"
      },
      {
        name: "Modernisation Data Platform",
        owner: "Direction Data",
        budget: "850 k€",
        risk: "medium"
      }
    ]
  },
  {
    id: "inprogress",
    title: "En cours",
    color: "from-sky-400/40 to-sky-500/10",
    items: [
      {
        name: "Refonte Portail Clients",
        owner: "IT Delivery",
        budget: "540 k€",
        risk: "low"
      },
      {
        name: "Automatisation Reporting KPIs",
        owner: "PMO",
        budget: "210 k€",
        risk: "low"
      },
      {
        name: "Migration Cloud Applicative",
        owner: "Infra & Cloud",
        budget: "930 k€",
        risk: "medium"
      }
    ]
  },
  {
    id: "atrisk",
    title: "À risque",
    color: "from-amber-400/40 to-amber-500/10",
    items: [
      {
        name: "Programme ERP Groupe",
        owner: "Finance & IT",
        budget: "2.4 M€",
        risk: "high"
      },
      {
        name: "Convergence Outils Legacy",
        owner: "Architecture",
        budget: "390 k€",
        risk: "high"
      }
    ]
  },
  {
    id: "onhold",
    title: "En pause",
    color: "from-slate-400/30 to-slate-700/10",
    items: [
      {
        name: "Pilote IA PMO",
        owner: "Innovation",
        budget: "120 k€",
        risk: "medium"
      }
    ]
  }
];

const decisionsFeed = [
  {
    title: "Valider budget additionnel – ERP Groupe",
    owner: "CFO & CIO",
    due: "Aujourd'hui",
    status: "À arbitrer"
  },
  {
    title: "Confirmer scope phase 2 – Digital Core",
    owner: "Comité Portefeuille",
    due: "Demain",
    status: "En préparation"
  },
  {
    title: "Clôturer risque majeur – Migration Cloud",
    owner: "Risk Officer",
    due: "Dans 3 jours",
    status: "En cours"
  },
  {
    title: "Prioriser backlog – Portail Clients",
    owner: "Product Owner",
    due: "Cette semaine",
    status: "À planifier"
  }
];

function riskDot(risk) {
  if (risk === "low") return "bg-emerald-400";
  if (risk === "medium") return "bg-amber-400";
  return "bg-rose-500";
}

export default function DashboardRevolutionary() {
  const navItems = [
    { label: "Vue", icon: Activity },
    { label: "Portfolio", icon: Target },
    { label: "Comités", icon: Calendar },
    { label: "KPIs", icon: TrendingUp },
    { label: "Risques", icon: AlertTriangle },
    { label: "Stratégie", icon: FileText },
    { label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#050A12] text-white">
      {/* Fond dynamique */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050A12] via-[#050A20] to-black" />
        <div className="absolute -left-32 top-[-10%] h-96 w-96 rounded-full bg-[#D4AF37]/18 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-[#1E3A8A]/35 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
      </div>

      <div className="flex h-screen">
        {/* Navigation verticale gauche */}
        <aside className="flex w-20 flex-col items-center border-r border-white/10 bg-black/30 pb-6 pt-4 backdrop-blur-xl">
          <div className="mb-10 mt-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] text-xs font-bold text-black shadow-[0_0_35px_rgba(212,175,55,0.8)]">
            PZ
          </div>
          <nav className="flex flex-1 flex-col items-center gap-4 text-[10px] uppercase tracking-[0.12em] text-white/50">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  className={`flex h-12 w-12 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[9px] ${
                    i === 0 ? "text-[#D4AF37] border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.5)]" : ""
                  }`}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon className="mb-1 h-4 w-4" />
                  <span className="text-[8px]">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </aside>

        {/* Contenu principal */}
        <div className="flex flex-1 flex-col">
          {/* Header top */}
          <header className="flex items-center justify-between border-b border-white/10 bg-black/25 px-8 py-4 backdrop-blur-xl">
            <div>
              <div className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
                Powalyze
              </div>
              <div className="mt-1 text-sm text-white/70">
                Le système d'exploitation de votre gouvernance, PMO et Data.
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Modes */}
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-[11px]">
                {["Board", "PMO", "Data"].map((mode, i) => (
                  <button
                    key={mode}
                    className={`rounded-full px-3 py-1 ${
                      i === 1
                        ? "bg-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.7)]"
                        : "text-white/70"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              {/* Profil */}
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500" />
                <div className="pr-2">
                  <div className="text-[11px] font-medium">Fabrice – PMO & Data</div>
                  <div className="text-[10px] text-white/50">Espace Gouvernance Exécutive</div>
                </div>
              </div>
            </div>
          </header>

          {/* Corps */}
          <main className="flex flex-1 gap-4 overflow-hidden px-6 py-4">
            {/* Colonne centrale (gauche + milieu) */}
            <div className="flex flex-[3] flex-col gap-4">
              {/* Ligne supérieure : Vue d'ensemble + Comités */}
              <div className="flex gap-4">
                {/* Vue d'ensemble gouvernance */}
                <motion.section
                  className="flex flex-1 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Vue d'ensemble de la gouvernance</h2>
                      <p className="text-[11px] text-white/60">
                        Santé du portefeuille, capacité d'exécution, risques majeurs.
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] text-emerald-300">
                      Portefeuille global · Semaine en cours
                    </span>
                  </div>

                  {/* KPIs */}
                  <div className="mb-4 flex gap-2">
                    {kpis.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2"
                      >
                        <div className={`h-6 w-1.5 rounded-full ${kpi.accent}`} />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">
                            {kpi.label}
                          </span>
                          <span className="text-sm font-semibold text-white">{kpi.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Graphique simplifié */}
                  <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/40 px-3 py-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),_transparent_60%)] opacity-40" />
                    {/* Axes */}
                    <div className="relative flex h-full flex-col justify-between text-[9px] text-white/30">
                      {[100, 75, 50, 25, 0].map((val) => (
                        <div key={val} className="flex items-center gap-1">
                          <span className="w-7 text-right">{val}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                        </div>
                      ))}
                    </div>
                    {/* Courbes stylisées */}
                    <svg className="pointer-events-none absolute inset-0" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="rgba(56,189,248,0.7)"
                        strokeWidth="2"
                        points="40,150 100,120 160,130 220,110 280,105 340,80 400,90"
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(212,175,55,0.9)"
                        strokeWidth="2.2"
                        points="40,160 100,135 160,125 220,95 280,85 340,70 400,60"
                      />
                      <polyline
                        fill="none"
                        stroke="rgba(248,250,252,0.6)"
                        strokeWidth="1.6"
                        strokeDasharray="4 3"
                        points="40,170 100,150 160,140 220,130 280,115 340,100 400,95"
                      />
                    </svg>
                    {/* Légende */}
                    <div className="absolute bottom-2 left-3 flex gap-4 text-[10px] text-white/70">
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Capacité
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> Santé portefeuille
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-100" /> Engagements
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Comités à venir */}
                <motion.section
                  className="flex w-80 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Comités à venir</h2>
                      <p className="text-[11px] text-white/60">
                        Agenda, décisions et préparation.
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">
                      Semaine + 2
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    {committees.map((c) => (
                      <motion.div
                        key={c.name}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3"
                        whileHover={{ y: -2, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#D4AF37]/10 opacity-0 transition-opacity hover:opacity-100" />
                        <div className="relative flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-[11px] font-medium text-white">
                              {c.name}
                            </div>
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] text-emerald-300">
                              {c.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-white/60">
                            <span>{c.date}</span>
                            <span>{c.time}</span>
                            <span>{c.decisions} décisions</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-400"
                              style={{ width: `${c.progress}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Portefeuille (board) */}
              <motion.section
                className="flex flex-1 gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {projectsColumns.map((col) => (
                  <div key={col.id} className="flex min-w-[0] flex-1 flex-col">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`h-1.5 w-6 rounded-full bg-gradient-to-r ${col.color}`}
                        />
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                          {col.title}
                        </h3>
                      </div>
                      <span className="text-[10px] text-white/40">
                        {col.items.length} projets
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
                      {col.items.map((p) => (
                        <motion.div
                          key={p.name}
                          className="group rounded-2xl border border-white/10 bg-black/40 p-2.5"
                          whileHover={{ y: -2, scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        >
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <div className="text-[11px] font-medium text-white line-clamp-1">
                              {p.name}
                            </div>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/60 whitespace-nowrap">
                              {p.owner}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-white/60">
                            <span className="rounded-full bg-white/5 px-2 py-0.5">
                              Budget · {p.budget}
                            </span>
                            <div className="flex items-center gap-1">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${riskDot(p.risk)}`}
                              />
                              <span>Risque</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.section>
            </div>

            {/* Colonne droite : Fil des décisions */}
            <motion.aside
              className="flex w-80 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Fil des décisions</h2>
                  <p className="text-[11px] text-white/60">
                    Derniers arbitrages, engagements et suivis.
                  </p>
                </div>
                <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-[10px] text-[#FDE68A]">
                  Live
                </span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-[11px]">
                {decisionsFeed.map((d, idx) => (
                  <motion.div
                    key={d.title}
                    className="rounded-2xl border border-white/10 bg-black/40 p-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + idx * 0.06 }}
                  >
                    <div className="mb-1 text-[11px] font-medium text-white">
                      {d.title}
                    </div>
                    <div className="mb-1 flex items-center justify-between text-[10px] text-white/55">
                      <span>{d.owner}</span>
                      <span>{d.due}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-white/60">
                        Décision
                      </span>
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-200">
                        {d.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          </main>
        </div>
      </div>
    </div>
  );
}
