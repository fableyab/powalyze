import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Données de démo cohérentes avec le projet premium
const data = [
  { phase: "Kickoff", date: "2025-01-15", progress: 0 },
  { phase: "Analyse", date: "2025-02-01", progress: 8 },
  { phase: "Planification", date: "2025-03-01", progress: 18 },
  { phase: "Architecture", date: "2025-04-01", progress: 22 },
  { phase: "Développement", date: "2025-06-01", progress: 32 },
  { phase: "Tests", date: "2025-09-01", progress: 38 },
  { phase: "Go-Live", date: "2025-10-30", progress: 38 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 border border-blue-200 rounded-lg px-4 py-2 shadow text-blue-900">
        <div className="font-bold text-blue-700">{payload[0].payload.phase}</div>
        <div className="text-xs text-blue-500">{payload[0].payload.date}</div>
        <div className="mt-1 text-sm">Avancement : <span className="font-semibold">{payload[0].value}%</span></div>
      </div>
    );
  }
  return null;
};

const ProgressAreaChart = () => (
  <div className="w-full h-80 bg-gradient-to-br from-blue-900/80 to-blue-700/60 rounded-2xl shadow-lg p-6 flex flex-col">
    <h3 className="text-xl font-bold text-blue-100 mb-2">Avancement du projet</h3>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#bfa76a" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="phase" tick={{ fill: '#bfa76a', fontWeight: 600 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fill: '#bfa76a', fontWeight: 600 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ color: '#bfa76a', fontWeight: 700 }} />
        <Area type="monotone" dataKey="progress" stroke="#2563eb" fill="url(#colorProgress)" strokeWidth={3} dot={{ r: 5, fill: '#bfa76a', stroke: '#2563eb', strokeWidth: 2 }} isAnimationActive={true} />
      </AreaChart>
    </ResponsiveContainer>
    <div className="text-xs text-blue-200 mt-2">Phases clés, retards et accélérations visibles d’un coup d’œil.</div>
  </div>
);

export default ProgressAreaChart;
