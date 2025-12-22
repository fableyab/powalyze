import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, Filter, Calendar, TrendingUp, TrendingDown,
  DollarSign, Clock, Users, Briefcase, Target, BarChart3, PieChart,
  LineChart, ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle,
  XCircle, Zap, ChevronDown, FileText, Share2
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 185000, budget: 200000, projects: 4, completed: 1 },
  { month: 'Fév', revenue: 210000, budget: 195000, projects: 5, completed: 2 },
  { month: 'Mar', revenue: 195000, budget: 220000, projects: 6, completed: 1 },
  { month: 'Avr', revenue: 240000, budget: 235000, projects: 6, completed: 3 },
  { month: 'Mai', revenue: 255000, budget: 250000, projects: 7, completed: 2 },
  { month: 'Juin', revenue: 280000, budget: 270000, projects: 8, completed: 2 },
];

const projectsData = [
  { name: "Migration Cloud Azure", status: "in-progress", progress: 68, budget: 450000, spent: 306000, roi: 2.4 },
  { name: "Dashboard Power BI", status: "in-progress", progress: 45, budget: 180000, spent: 81000, roi: 3.1 },
  { name: "Automatisation RH", status: "planning", progress: 15, budget: 95000, spent: 14250, roi: 4.2 },
  { name: "Refonte ERP SAP", status: "in-progress", progress: 82, budget: 1200000, spent: 984000, roi: 1.8 },
  { name: "PMO Framework Setup", status: "completed", progress: 100, budget: 280000, spent: 265000, roi: 5.6 },
  { name: "Cybersecurity Audit", status: "on-hold", progress: 35, budget: 120000, spent: 42000, roi: 2.9 },
];

const kpis = {
  totalRevenue: 1365000,
  revenueChange: 12.5,
  totalBudget: 2925000,
  budgetUsed: 1692250,
  avgROI: 3.3,
  roiChange: 0.4,
  activeProjects: 6,
  completedProjects: 11,
  onTimeDelivery: 87,
  clientSatisfaction: 94,
  teamUtilization: 78,
  riskScore: 23,
};

const MetricCard = ({ title, value, change, icon: Icon, color, suffix = '' }) => (
  <div className="bg-[#111] rounded-xl p-5 border border-white/10">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}{suffix}</div>
    <div className="text-xs text-gray-500">{title}</div>
  </div>
);

const MiniChart = ({ data, dataKey, color }) => {
  const max = Math.max(...data.map(d => d[dataKey]));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ height: 0 }}
          animate={{ height: `${(item[dataKey] / max) * 100}%` }}
          transition={{ delay: idx * 0.1 }}
          className={`flex-1 ${color} rounded-t`}
        />
      ))}
    </div>
  );
};

const ProgressBar = ({ value, color = 'bg-[#BFA76A]' }) => (
  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      className={`h-full ${color} rounded-full`}
    />
  </div>
);

const DonutChart = ({ data, size = 120 }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {data.map((item, idx) => {
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          return (
            <motion.path
              key={idx}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          );
        })}
        <circle cx="50" cy="50" r="25" fill="#0A0A0A" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white">{total}</span>
      </div>
    </div>
  );
};

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [reportType, setReportType] = useState('overview');

  const projectStatusData = [
    { label: 'En cours', value: 4, color: '#3b82f6' },
    { label: 'Planifié', value: 2, color: '#8b5cf6' },
    { label: 'Terminé', value: 1, color: '#22c55e' },
    { label: 'En pause', value: 1, color: '#eab308' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/pmo-workspace" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-black text-black">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">Rapports</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Analytics & Insights</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
              >
                <option value="1m">Dernier mois</option>
                <option value="3m">3 derniers mois</option>
                <option value="6m">6 derniers mois</option>
                <option value="1y">Cette année</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10">
                <Share2 size={16} />
                Partager
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
                <Download size={16} />
                Exporter PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Executive Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target size={20} className="text-[#BFA76A]" />
              Executive Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <MetricCard 
                title="Revenue Total" 
                value={`CHF ${(kpis.totalRevenue / 1000000).toFixed(1)}M`}
                change={kpis.revenueChange}
                icon={DollarSign}
                color="bg-green-500/20 text-green-400"
              />
              <MetricCard 
                title="Budget Utilisé" 
                value={`${Math.round((kpis.budgetUsed / kpis.totalBudget) * 100)}%`}
                icon={TrendingUp}
                color="bg-blue-500/20 text-blue-400"
              />
              <MetricCard 
                title="ROI Moyen" 
                value={kpis.avgROI}
                change={kpis.roiChange}
                suffix="x"
                icon={Target}
                color="bg-[#BFA76A]/20 text-[#BFA76A]"
              />
              <MetricCard 
                title="Projets Actifs" 
                value={kpis.activeProjects}
                icon={Briefcase}
                color="bg-purple-500/20 text-purple-400"
              />
              <MetricCard 
                title="Livraison On-Time" 
                value={kpis.onTimeDelivery}
                suffix="%"
                icon={Clock}
                color="bg-cyan-500/20 text-cyan-400"
              />
              <MetricCard 
                title="Satisfaction Client" 
                value={kpis.clientSatisfaction}
                suffix="%"
                icon={CheckCircle2}
                color="bg-emerald-500/20 text-emerald-400"
              />
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-[#111] rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <LineChart size={18} className="text-[#BFA76A]" />
                  Revenue vs Budget
                </h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#BFA76A]"></div>
                    <span className="text-gray-400">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500"></div>
                    <span className="text-gray-400">Budget</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2 h-48">
                {monthlyData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex gap-1 w-full h-40 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.revenue / 300000) * 100}%` }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex-1 bg-[#BFA76A] rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.budget / 300000) * 100}%` }}
                        transition={{ delay: idx * 0.1 + 0.05 }}
                        className="flex-1 bg-blue-500 rounded-t"
                      />
                    </div>
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Status Donut */}
            <div className="bg-[#111] rounded-xl p-6 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <PieChart size={18} className="text-[#BFA76A]" />
                Statut des Projets
              </h3>
              <div className="flex flex-col items-center">
                <DonutChart data={projectStatusData} size={140} />
                <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                  {projectStatusData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-400">{item.label}</span>
                      <span className="text-xs font-bold ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Projects Performance Table */}
          <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden mb-8">
            <div className="p-6 border-b border-white/10">
              <h3 className="font-bold flex items-center gap-2">
                <Briefcase size={18} className="text-[#BFA76A]" />
                Performance des Projets
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">Projet</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">Progression</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">Budget</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">Dépensé</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project, idx) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-4 px-6 font-medium">{project.name}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          project.status === 'planning' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status === 'completed' ? 'Terminé' :
                           project.status === 'in-progress' ? 'En cours' :
                           project.status === 'planning' ? 'Planification' : 'En pause'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24">
                            <ProgressBar value={project.progress} />
                          </div>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm">CHF {(project.budget / 1000).toFixed(0)}k</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={project.spent > project.budget * 0.9 ? 'text-red-400' : ''}>
                          CHF {(project.spent / 1000).toFixed(0)}k
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold ${project.roi >= 3 ? 'text-green-400' : project.roi >= 2 ? 'text-[#BFA76A]' : 'text-gray-400'}`}>
                          {project.roi}x
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk & Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111] rounded-xl p-6 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <AlertCircle size={18} className="text-[#BFA76A]" />
                Indicateurs de Risque
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Score de Risque Global</span>
                    <span className={`text-sm font-bold ${kpis.riskScore <= 30 ? 'text-green-400' : kpis.riskScore <= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {kpis.riskScore}%
                    </span>
                  </div>
                  <ProgressBar value={kpis.riskScore} color={kpis.riskScore <= 30 ? 'bg-green-500' : kpis.riskScore <= 60 ? 'bg-yellow-500' : 'bg-red-500'} />
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-400" />
                      <span className="text-sm">Projets sur les rails</span>
                    </div>
                    <span className="font-bold text-green-400">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-yellow-400" />
                      <span className="text-sm">À risque</span>
                    </div>
                    <span className="font-bold text-yellow-400">2</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle size={16} className="text-red-400" />
                      <span className="text-sm">Bloqués</span>
                    </div>
                    <span className="font-bold text-red-400">1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] rounded-xl p-6 border border-white/10">
              <h3 className="font-bold flex items-center gap-2 mb-6">
                <Users size={18} className="text-[#BFA76A]" />
                Utilisation de l'Équipe
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Utilisation Moyenne</span>
                    <span className="text-sm font-bold text-[#BFA76A]">{kpis.teamUtilization}%</span>
                  </div>
                  <ProgressBar value={kpis.teamUtilization} />
                </div>
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">5</div>
                    <div className="text-xs text-gray-500">Disponibles</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">3</div>
                    <div className="text-xs text-gray-500">Surchargés</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">8</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#BFA76A]">94%</div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] rounded-full text-black text-sm font-bold shadow-lg">
          <Zap size={16} />
          Mode Démo Live
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
