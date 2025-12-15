export const pmoStyles = {
  colors: {
    background: "#0A0A0A",
    surface: "#111111",
    surfaceHighlight: "#1A1A1A",
    border: "rgba(255, 255, 255, 0.1)",
    borderHighlight: "rgba(191, 167, 106, 0.3)", // Gold highlight
    gold: "#BFA76A",
    goldDim: "rgba(191, 167, 106, 0.1)",
    blue: "#3A7BFF",
    blueDim: "rgba(58, 123, 255, 0.1)",
    green: "#10B981",
    greenDim: "rgba(16, 185, 129, 0.1)",
    red: "#EF4444",
    redDim: "rgba(239, 68, 68, 0.1)",
    text: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF",
      muted: "#6B7280"
    }
  },
  layout: {
    card: "bg-[#111111] border border-white/10 rounded-xl p-6 hover:border-[#BFA76A]/30 transition-all duration-300 shadow-xl",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    container: "container mx-auto px-6 py-8"
  },
  typography: {
    h1: "text-3xl md:text-4xl font-display font-bold text-white",
    h2: "text-2xl font-bold text-white mb-4",
    h3: "text-lg font-bold text-white mb-2",
    label: "text-xs font-bold text-gray-500 uppercase tracking-wider"
  }
};