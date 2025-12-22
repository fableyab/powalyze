import React from "react";
import { CheckCircle, Clock, TrendingUp, AlertTriangle, Smile } from "lucide-react";

const kpiCards = [
  {
    title: "Avancement global",
    value: "38%",
    icon: <TrendingUp className="text-blue-600" size={32} />,
    color: "from-blue-600 to-blue-400",
    ring: "ring-blue-500",
    sub: "Basé sur les tâches complétées",
    type: "circle"
  },
  {
    title: "Respect du planning",
    value: "+4 jours",
    icon: <Clock className="text-orange-400" size={32} />,
    color: "from-orange-400 to-orange-200",
    ring: "ring-orange-400",
    sub: "Légèrement en retard",
    type: "badge"
  },
  {
    title: "Consommation budget",
    value: "40%",
    icon: <CheckCircle className="text-yellow-500" size={32} />,
    color: "from-yellow-500 to-yellow-300",
    ring: "ring-yellow-500",
    sub: "48 000 CHF dépensés / 120 000 CHF",
    type: "bar"
  },
  {
    title: "Risques actifs",
    value: "3",
    icon: <AlertTriangle className="text-yellow-400" size={32} />,
    color: "from-yellow-400 to-yellow-200",
    ring: "ring-yellow-400",
    sub: "0 critique, 1 élevé, 2 moyens",
    type: "count"
  },
  {
    title: "Satisfaction stakeholders",
    value: "82%",
    icon: <Smile className="text-green-500" size={32} />,
    color: "from-green-500 to-green-300",
    ring: "ring-green-500",
    sub: "Bonne dynamique",
    type: "score"
  }
];

const KPIDashboardPremium = () => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
    {kpiCards.map((kpi, idx) => (
      <div
        key={kpi.title}
        className={`rounded-2xl shadow-lg bg-gradient-to-br ${kpi.color} p-6 flex flex-col items-center justify-center relative min-h-[180px] transition-transform hover:scale-[1.025]`}
      >
        <div className="absolute top-4 right-4 opacity-20">{kpi.icon}</div>
        <div className="flex flex-col items-center z-10">
          <span className="text-lg font-semibold text-white drop-shadow">{kpi.title}</span>
          {kpi.type === "circle" && (
            <div className="my-4">
              <div className={`relative w-20 h-20 flex items-center justify-center`}>
                <svg className="absolute top-0 left-0" width="80" height="80">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#2563eb"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 36}
                    strokeDashoffset={2 * Math.PI * 36 * (1 - 0.38)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-bold text-blue-100">{kpi.value}</span>
              </div>
            </div>
          )}
          {kpi.type === "badge" && (
            <span className="my-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xl shadow">{kpi.value}</span>
          )}
          {kpi.type === "bar" && (
            <div className="w-32 my-4">
              <div className="w-full h-4 bg-yellow-100 rounded-full">
                <div className="h-4 bg-yellow-500 rounded-full" style={{ width: "40%" }} />
              </div>
              <span className="block text-center text-yellow-900 font-bold mt-1">{kpi.value}</span>
            </div>
          )}
          {kpi.type === "count" && (
            <span className="my-4 text-4xl font-extrabold text-yellow-400">{kpi.value}</span>
          )}
          {kpi.type === "score" && (
            <span className="my-4 text-3xl font-bold text-green-100">{kpi.value}</span>
          )}
          <span className="text-xs text-white/80 mt-2">{kpi.sub}</span>
        </div>
      </div>
    ))}
  </div>
);

export default KPIDashboardPremium;
