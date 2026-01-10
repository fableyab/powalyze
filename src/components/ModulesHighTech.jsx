import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  FileCheck,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

const modules = [
  {
    title: "Cockpit exécutif",
    icon: LayoutDashboard,
    description:
      "Vue globale, signaux IA, risques critiques et décisions en attente.",
  },
  {
    title: "Portfolio Manager",
    icon: FolderKanban,
    description:
      "Pilotage multi‑portefeuilles, priorisation, santé et alignement stratégique.",
  },
  {
    title: "Committee Center",
    icon: CalendarCheck,
    description:
      "Préparation automatique, points critiques, décisions à prendre.",
  },
  {
    title: "Decision Hub",
    icon: FileCheck,
    description:
      "Registre centralisé, impacts, actions et traçabilité complète.",
  },
  {
    title: "Risk Intelligence",
    icon: AlertTriangle,
    description:
      "Signaux faibles, score IA, recommandations et mitigation.",
  },
  {
    title: "Reporting Power BI",
    icon: BarChart3,
    description:
      "Dashboards exécutifs, KPI, tendances et analyses avancées.",
  },
];

export default function ModulesHighTech() {
  return (
    <section
      id="modules"
      className="relative py-24 bg-brand-blue-dark overflow-hidden"
    >
      {/* GRID TECH BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/grid-tech.svg')] bg-cover bg-center pointer-events-none" />

      {/* TITLE */}
      <div className="relative max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Les modules Powalyze
        </h2>
        <p className="text-white/70 text-lg">
          Un OS de gouvernance conçu pour la performance, la clarté et l'IA.
        </p>
      </div>

      {/* MODULES GRID */}
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {modules.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="
                group relative p-8 rounded-2xl 
                bg-white/5 backdrop-blur-xl 
                border border-white/10 
                shadow-[0_0_20px_rgba(212,175,55,0.05)]
                hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]
                transition-all duration-300
                hover:-translate-y-2
                overflow-hidden
              "
            >
              {/* GOLD SCANLINE */}
              <div
                className="
                  absolute inset-0 bg-gradient-to-b 
                  from-transparent via-brand-gold/5 to-transparent 
                  translate-y-[-100%] group-hover:translate-y-[100%]
                  transition-transform duration-1000
                "
              />

              {/* ICON */}
              <div
                className="
                  w-14 h-14 flex items-center justify-center 
                  rounded-xl mb-6
                  bg-brand-gold/15 border border-brand-gold/30
                  group-hover:bg-brand-gold/25
                  transition-all
                "
              >
                <Icon size={28} className="text-brand-gold" />
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {m.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {m.description}
              </p>

              {/* MICRO‑GRAPH (FAKE ANIMATION) */}
              <div className="h-10 flex items-end gap-1">
                {[30, 50, 40, 70, 55].map((h, idx) => (
                  <div
                    key={idx}
                    className="
                      w-2 rounded-sm bg-brand-gold/40 
                      group-hover:bg-brand-gold 
                      transition-all duration-500
                    "
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
