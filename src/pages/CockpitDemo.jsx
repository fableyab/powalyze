import { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  DollarSign,
  Target,
  Users,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Données mockées pour la démo
const DEMO_DATA = {
  kpis: {
    totalProjects: 24,
    activeProjects: 18,
    completedProjects: 6,
    totalBudget: 12500000,
    spentBudget: 8750000,
    onTrackProjects: 14,
    atRiskProjects: 3,
    offTrackProjects: 1,
    teamMembers: 87
  },
  budgetByMonth: [
    { month: 'Jan', planned: 980000, actual: 920000 },
    { month: 'Fév', planned: 1050000, actual: 1100000 },
    { month: 'Mar', planned: 1200000, actual: 1180000 },
    { month: 'Avr', planned: 1100000, actual: 1050000 },
    { month: 'Mai', planned: 1300000, actual: 1250000 },
    { month: 'Jun', planned: 1400000, actual: 1350000 }
  ],
  projectsByStatus: [
    { name: 'En cours', value: 18, color: '#4A9EFF' },
    { name: 'Terminés', value: 6, color: '#10B981' },
    { name: 'En attente', value: 3, color: '#F59E0B' }
  ],
  projectsByHealth: [
    { name: 'Sur les rails', value: 14, color: '#10B981' },
    { name: 'À risque', value: 3, color: '#F59E0B' },
    { name: 'Hors piste', value: 1, color: '#EF4444' }
  ],
  topProjects: [
    { code: 'PRJ-001', name: 'Transformation Digitale', health: 'ON_TRACK', budget: 2500000, completion: 75 },
    { code: 'PRJ-002', name: 'Migration Cloud Azure', health: 'ON_TRACK', budget: 1800000, completion: 60 },
    { code: 'PRJ-003', name: 'Refonte ERP', health: 'AT_RISK', budget: 3200000, completion: 45 },
    { code: 'PRJ-004', name: 'App Mobile Retail', health: 'ON_TRACK', budget: 950000, completion: 85 },
    { code: 'PRJ-005', name: 'Data Warehouse', health: 'OFF_TRACK', budget: 1600000, completion: 30 }
  ],
  risks: [
    { title: 'Retard livraison infrastructure', impact: 'HIGH', probability: 'MEDIUM', project: 'PRJ-003' },
    { title: 'Ressources insuffisantes équipe dev', impact: 'MEDIUM', probability: 'HIGH', project: 'PRJ-005' },
    { title: 'Budget dépassé Q2', impact: 'CRITICAL', probability: 'LOW', project: 'PRJ-001' }
  ],
  timeline: [
    { month: 'Jan', completed: 2, started: 3, planned: 1 },
    { month: 'Fév', completed: 1, started: 2, planned: 2 },
    { month: 'Mar', completed: 3, started: 4, planned: 1 },
    { month: 'Avr', completed: 2, started: 1, planned: 3 },
    { month: 'Mai', completed: 1, started: 3, planned: 2 },
    { month: 'Jun', completed: 2, started: 2, planned: 1 }
  ]
};

export default function CockpitDemo() {
  const [timeRange, setTimeRange] = useState('6m');
  const { kpis } = DEMO_DATA;

  const budgetUsagePercent = Math.round((kpis.spentBudget / kpis.totalBudget) * 100);

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header avec badge DEMO */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-extralight">Cockpit Exécutif</h1>
                <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium rounded-full border border-[#D4AF37]/30">
                  MODE DÉMO
                </span>
              </div>
              <p className="text-slate-400 font-light">
                Vue d'ensemble stratégique temps réel - Données de démonstration
              </p>
            </div>
            <div className="flex gap-2">
              {['1m', '3m', '6m', '1a'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs Principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Projets Actifs"
            value={kpis.activeProjects}
            total={kpis.totalProjects}
            icon={Activity}
            color="blue"
            trend="+12%"
            trendUp={true}
          />
          <KPICard
            title="Budget Total"
            value={`${(kpis.totalBudget / 1000000).toFixed(1)}M€`}
            subtitle={`${budgetUsagePercent}% utilisé`}
            icon={DollarSign}
            color="gold"
            trend="-5%"
            trendUp={false}
          />
          <KPICard
            title="Santé Globale"
            value={kpis.onTrackProjects}
            subtitle="sur les rails"
            icon={CheckCircle}
            color="green"
            trend="+8%"
            trendUp={true}
          />
          <KPICard
            title="Équipe"
            value={kpis.teamMembers}
            subtitle="collaborateurs"
            icon={Users}
            color="purple"
            trend="+3"
            trendUp={true}
          />
        </div>

        {/* Graphiques Principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Budget Evolution */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              Évolution Budgétaire
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={DEMO_DATA.budgetByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value / 1000}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                  formatter={(value) => `${(value / 1000).toFixed(0)}K€`}
                />
                <Legend />
                <Bar dataKey="planned" fill="#4A9EFF" name="Planifié" />
                <Bar dataKey="actual" fill="#D4AF37" name="Réalisé" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution Projets */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-[#D4AF37]" />
              Distribution des Projets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-3">Par Statut</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={DEMO_DATA.projectsByStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => entry.value}
                    >
                      {DEMO_DATA.projectsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-3">Par Santé</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={DEMO_DATA.projectsByHealth}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={(entry) => entry.value}
                    >
                      {DEMO_DATA.projectsByHealth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Projets */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            Timeline des Projets
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={DEMO_DATA.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Legend />
              <Area type="monotone" dataKey="completed" stackId="1" stroke="#10B981" fill="#10B981" name="Terminés" />
              <Area type="monotone" dataKey="started" stackId="1" stroke="#4A9EFF" fill="#4A9EFF" name="Démarrés" />
              <Area type="monotone" dataKey="planned" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Planifiés" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section: Top Projects + Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Projects */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#D4AF37]" />
              Projets Clés
            </h3>
            <div className="space-y-3">
              {DEMO_DATA.topProjects.map((project) => (
                <div key={project.code} className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-[#D4AF37]">{project.code}</span>
                        {getHealthBadge(project.health)}
                      </div>
                      <p className="font-medium text-sm">{project.name}</p>
                    </div>
                    <span className="text-sm text-slate-400">{(project.budget / 1000).toFixed(0)}K€</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full transition-all"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{project.completion}% complété</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risks Alert */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Risques Majeurs
            </h3>
            <div className="space-y-3">
              {DEMO_DATA.risks.map((risk, index) => (
                <div key={index} className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm flex-1">{risk.title}</h4>
                    {getImpactBadge(risk.impact)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Projet: {risk.project}</span>
                    <span>•</span>
                    {getProbabilityBadge(risk.probability)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                3 risques nécessitent une attention immédiate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant KPI Card
function KPICard({ title, value, total, subtitle, icon: Icon, color, trend, trendUp }) {
  const colors = {
    blue: 'text-[#4A9EFF]',
    gold: 'text-[#D4AF37]',
    green: 'text-green-500',
    purple: 'text-purple-500'
  };

  return (
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-light">{title}</span>
        <Icon className={`w-5 h-5 ${colors[color]}`} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-extralight mb-1">
            {value}
            {total && <span className="text-slate-500 text-xl ml-1">/{total}</span>}
          </p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function getHealthBadge(health) {
  const styles = {
    ON_TRACK: 'bg-green-500/20 text-green-400 border-green-500/30',
    AT_RISK: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    OFF_TRACK: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  const labels = { ON_TRACK: 'Sur les rails', AT_RISK: 'À risque', OFF_TRACK: 'Hors piste' };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[health]}`}>{labels[health]}</span>;
}

function getImpactBadge(impact) {
  const styles = {
    LOW: 'bg-blue-500/20 text-blue-400',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400',
    HIGH: 'bg-orange-500/20 text-orange-400',
    CRITICAL: 'bg-red-500/20 text-red-400'
  };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[impact]}`}>{impact}</span>;
}

function getProbabilityBadge(probability) {
  const styles = {
    LOW: 'bg-slate-500/20 text-slate-400',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400',
    HIGH: 'bg-red-500/20 text-red-400'
  };
  const labels = { LOW: 'Prob. Faible', MEDIUM: 'Prob. Moyenne', HIGH: 'Prob. Élevée' };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[probability]}`}>{labels[probability]}</span>;
}
