export function signalColor(signal) {
  if (signal === "critique") return "bg-red-500/20 border-red-500/60 text-red-200";
  if (signal === "tension") return "bg-amber-500/20 border-amber-400/60 text-amber-200";
  return "bg-emerald-500/15 border-emerald-400/60 text-emerald-200"; // ok
}

export function riskLevelColor(level) {
  if (level >= 70) return "border-red-500/60 bg-red-500/10 text-red-200";
  if (level >= 40) return "border-amber-400/60 bg-amber-400/10 text-amber-200";
  return "border-sky-400/60 bg-sky-400/10 text-sky-200";
}

export function capacityBarGradient(used) {
  if (used >= 0.85) return "from-red-500 to-amber-400";
  if (used >= 0.7) return "from-amber-400 to-sky-500";
  return "from-sky-500 to-emerald-400";
}

export function impactLevelColor(impact) {
  if (impact === "high" || impact === "haut") return "bg-red-500/20 text-red-300";
  if (impact === "medium" || impact === "moyen") return "bg-amber-500/20 text-amber-300";
  return "bg-sky-500/20 text-sky-300";
}

export function statusDotColor(status) {
  if (status === "ok") return "bg-sky-400";
  if (status === "tension") return "bg-amber-400";
  return "bg-red-500"; // critique
}
