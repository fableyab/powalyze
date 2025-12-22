import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutGrid, List, Calendar, BarChart3, Users, FolderKanban,
  Plus, Search, Filter, ChevronDown, MoreHorizontal, Clock,
  CheckCircle2, AlertCircle, PlayCircle, PauseCircle, Target,
  TrendingUp, DollarSign, UserCheck, Briefcase, ArrowRight,
  Settings, Bell, MessageSquare, FileText, Zap, Star
} from 'lucide-react';

// Données de démonstration PMO
const demoProjects = [
  {
    id: 1,
    name: "Migration Cloud Azure",
    client: "Swiss Bank Corp",
    status: "in-progress",
    priority: "high",
    progress: 68,
    budget: 450000,
    spent: 306000,
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    owner: "Marc Dubois",
    team: ["Sophie L.", "Jean P.", "Anna M."],
    tasks: { total: 48, completed: 32, inProgress: 12, blocked: 4 },
    health: "on-track",
    category: "IT Infrastructure"
  },
  {
    id: 2,
    name: "Dashboard Power BI Finance",
    client: "Nestlé SA",
    status: "in-progress",
    priority: "high",
    progress: 45,
    budget: 180000,
    spent: 81000,
    startDate: "2025-02-01",
    endDate: "2025-05-15",
    owner: "Sophie Laurent",
    team: ["Marc D.", "Pierre K."],
    tasks: { total: 32, completed: 14, inProgress: 15, blocked: 3 },
    health: "at-risk",
    category: "Data & BI"
  },
  {
    id: 3,
    name: "Automatisation RH",
    client: "Rolex Group",
    status: "planning",
    priority: "medium",
    progress: 15,
    budget: 95000,
    spent: 14250,
    startDate: "2025-03-01",
    endDate: "2025-07-30",
    owner: "Anna Martin",
    team: ["Jean P.", "Marc D.", "Sophie L.", "Luc B."],
    tasks: { total: 24, completed: 4, inProgress: 8, blocked: 0 },
    health: "on-track",
    category: "Automation"
  },
  {
    id: 4,
    name: "Refonte ERP SAP",
    client: "Credit Suisse",
    status: "in-progress",
    priority: "critical",
    progress: 82,
    budget: 1200000,
    spent: 984000,
    startDate: "2024-09-01",
    endDate: "2025-03-31",
    owner: "Marc Dubois",
    team: ["Sophie L.", "Jean P.", "Anna M.", "Pierre K.", "Luc B."],
    tasks: { total: 156, completed: 128, inProgress: 24, blocked: 4 },
    health: "on-track",
    category: "IT Infrastructure"
  },
  {
    id: 5,
    name: "PMO Framework Setup",
    client: "UBS AG",
    status: "completed",
    priority: "high",
    progress: 100,
    budget: 280000,
    spent: 265000,
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    owner: "Sophie Laurent",
    team: ["Marc D.", "Anna M."],
    tasks: { total: 64, completed: 64, inProgress: 0, blocked: 0 },
    health: "completed",
    category: "PMO"
  },
  {
    id: 6,
    name: "Cybersecurity Audit",
    client: "Swiss Re",
    status: "on-hold",
    priority: "medium",
    progress: 35,
    budget: 120000,
    spent: 42000,
    startDate: "2025-01-15",
    endDate: "2025-04-30",
    owner: "Jean Petit",
    team: ["Marc D."],
    tasks: { total: 28, completed: 10, inProgress: 0, blocked: 18 },
    health: "blocked",
    category: "Security"
  }
];

const demoTasks = [
  { id: 1, title: "Finaliser architecture cloud", project: "Migration Cloud Azure", assignee: "Marc D.", status: "in-progress", priority: "high", dueDate: "2025-03-25" },
  { id: 2, title: "Validation DAT Power BI", project: "Dashboard Power BI Finance", assignee: "Sophie L.", status: "review", priority: "high", dueDate: "2025-03-22" },
  { id: 3, title: "Tests intégration API", project: "Migration Cloud Azure", assignee: "Jean P.", status: "todo", priority: "medium", dueDate: "2025-03-28" },
  { id: 4, title: "Formation équipe RH", project: "Automatisation RH", assignee: "Anna M.", status: "in-progress", priority: "medium", dueDate: "2025-03-30" },
  { id: 5, title: "Review sécurité module paiement", project: "Refonte ERP SAP", assignee: "Pierre K.", status: "blocked", priority: "critical", dueDate: "2025-03-20" },
  { id: 6, title: "Documentation technique v2", project: "PMO Framework Setup", assignee: "Sophie L.", status: "completed", priority: "low", dueDate: "2025-03-15" },
  { id: 7, title: "Sprint planning Q2", project: "Migration Cloud Azure", assignee: "Marc D.", status: "todo", priority: "high", dueDate: "2025-03-26" },
  { id: 8, title: "Rapport mensuel client", project: "Dashboard Power BI Finance", assignee: "Sophie L.", status: "in-progress", priority: "medium", dueDate: "2025-03-31" },
];

// Composants UI
const StatusBadge = ({ status }) => {
  const styles = {
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'planning': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'on-hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'todo': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'review': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'blocked': 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const labels = {
    'in-progress': 'En cours',
    'completed': 'Terminé',
    'planning': 'Planification',
    'on-hold': 'En pause',
    'todo': 'À faire',
    'review': 'En review',
    'blocked': 'Bloqué',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    'critical': 'bg-red-600 text-white',
    'high': 'bg-orange-500 text-white',
    'medium': 'bg-yellow-500 text-black',
    'low': 'bg-gray-500 text-white',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const HealthIndicator = ({ health }) => {
  const config = {
    'on-track': { color: 'bg-green-500', label: 'On Track' },
    'at-risk': { color: 'bg-yellow-500', label: 'At Risk' },
    'blocked': { color: 'bg-red-500', label: 'Blocked' },
    'completed': { color: 'bg-blue-500', label: 'Completed' },
  };
  const { color, label } = config[health] || config['on-track'];
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
};

const ProgressBar = ({ value }) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1 }}
        className={`h-full rounded-full ${
          value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-blue-500' : value >= 25 ? 'bg-yellow-500' : 'bg-red-500'
        }`}
      />
    </div>
    <span className="text-sm font-medium text-white w-12">{value}%</span>
  </div>
);

const KPICard = ({ icon: Icon, label, value, trend, trendUp, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#111] rounded-xl p-5 border border-white/10 hover:border-[#BFA76A]/30 transition-all"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          <TrendingUp size={14} className={!trendUp ? 'rotate-180' : ''} />
          {trend}
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </motion.div>
);

// Vue Kanban
const KanbanView = ({ projects }) => {
  const columns = [
    { id: 'planning', label: 'Planification', color: 'border-purple-500' },
    { id: 'in-progress', label: 'En cours', color: 'border-blue-500' },
    { id: 'on-hold', label: 'En pause', color: 'border-yellow-500' },
    { id: 'completed', label: 'Terminé', color: 'border-green-500' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map(column => {
        const columnProjects = projects.filter(p => p.status === column.id);
        return (
          <div key={column.id} className="space-y-4">
            <div className={`flex items-center justify-between p-3 bg-[#111] rounded-xl border-t-2 ${column.color}`}>
              <span className="font-medium text-white">{column.label}</span>
              <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-full">
                {columnProjects.length}
              </span>
            </div>
            <div className="space-y-3">
              {columnProjects.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#111] rounded-xl p-4 border border-white/10 hover:border-[#BFA76A]/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <PriorityBadge priority={project.priority} />
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                  <p className="text-xs text-[#BFA76A] mb-3">{project.client}</p>
                  <ProgressBar value={project.progress} />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#111]">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <HealthIndicator health={project.health} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Vue Liste/Table
const TableView = ({ projects }) => (
  <div className="bg-[#111] rounded-xl border border-white/10 overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-white/10">
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Équipe</th>
          <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Santé</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, idx) => (
          <motion.tr 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#BFA76A]/20 to-[#8B7355]/20 flex items-center justify-center">
                  <Briefcase size={18} className="text-[#BFA76A]" />
                </div>
                <div>
                  <div className="font-medium text-white">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.category}</div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6 text-sm text-gray-400">{project.client}</td>
            <td className="py-4 px-6"><StatusBadge status={project.status} /></td>
            <td className="py-4 px-6 w-48"><ProgressBar value={project.progress} /></td>
            <td className="py-4 px-6">
              <div className="text-sm text-white">CHF {(project.budget / 1000).toFixed(0)}k</div>
              <div className="text-xs text-gray-500">{Math.round((project.spent / project.budget) * 100)}% dépensé</div>
            </td>
            <td className="py-4 px-6">
              <div className="flex -space-x-2">
                {project.team.slice(0, 4).map((member, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#111]">
                    {member.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {project.team.length > 4 && (
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white border-2 border-[#111]">
                    +{project.team.length - 4}
                  </div>
                )}
              </div>
            </td>
            <td className="py-4 px-6"><HealthIndicator health={project.health} /></td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Vue Timeline
const TimelineView = ({ projects }) => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  return (
    <div className="bg-[#111] rounded-xl border border-white/10 p-6 overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="flex border-b border-white/10 pb-4 mb-4">
          <div className="w-64 flex-shrink-0" />
          <div className="flex-1 grid grid-cols-12 gap-1">
            {months.map(month => (
              <div key={month} className="text-center text-xs text-gray-500">{month}</div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {projects.map((project, idx) => {
            const startMonth = new Date(project.startDate).getMonth();
            const endMonth = new Date(project.endDate).getMonth();
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center"
              >
                <div className="w-64 flex-shrink-0 pr-4">
                  <div className="font-medium text-white text-sm">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.client}</div>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1 h-8">
                  {months.map((_, monthIdx) => {
                    const isInRange = monthIdx >= startMonth && monthIdx <= endMonth;
                    const isStart = monthIdx === startMonth;
                    const isEnd = monthIdx === endMonth;
                    
                    return (
                      <div key={monthIdx} className="relative">
                        {isInRange && (
                          <div 
                            className={`absolute inset-y-1 ${isStart ? 'left-0 rounded-l-full' : 'left-0'} ${isEnd ? 'right-0 rounded-r-full' : 'right-0'} ${
                              project.health === 'completed' ? 'bg-green-500/50' :
                              project.health === 'at-risk' ? 'bg-yellow-500/50' :
                              project.health === 'blocked' ? 'bg-red-500/50' :
                              'bg-blue-500/50'
                            }`}
                          >
                            <div 
                              className={`h-full ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''} ${
                                project.health === 'completed' ? 'bg-green-500' :
                                project.health === 'at-risk' ? 'bg-yellow-500' :
                                project.health === 'blocked' ? 'bg-red-500' :
                                'bg-blue-500'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Composant principal
const PMOWorkspacePage = () => {
  const [view, setView] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');

  const views = [
    { id: 'kanban', label: 'Kanban', icon: FolderKanban },
    { id: 'table', label: 'Table', icon: List },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
  ];

  const filteredProjects = demoProjects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    activeProjects: demoProjects.filter(p => p.status === 'in-progress').length,
    avgProgress: Math.round(demoProjects.reduce((sum, p) => sum + p.progress, 0) / demoProjects.length),
    totalBudget: demoProjects.reduce((sum, p) => sum + p.spent, 0),
    teamSize: [...new Set(demoProjects.flatMap(p => p.team))].length,
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-black text-black">
                  P
                </div>
                <div>
                  <div className="font-bold text-white">POWALYZE</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">PMO Workspace</div>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/pmo-workspace" className="text-sm font-medium text-[#BFA76A]">Dashboard</Link>
                <Link to="/pmo-projects" className="text-sm font-medium text-gray-400 hover:text-white">Projets</Link>
                <Link to="/pmo-team" className="text-sm font-medium text-gray-400 hover:text-white">Équipe</Link>
                <Link to="/pmo-reports" className="text-sm font-medium text-gray-400 hover:text-white">Rapports</Link>
                <Link to="/pmo-tasks" className="text-sm font-medium text-gray-400 hover:text-white">Tâches</Link>
                <Link to="/pmo-calendar" className="text-sm font-medium text-gray-400 hover:text-white">Calendrier</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-white/10 relative">
                <Bell size={18} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link to="/pmo-settings" className="p-2 rounded-lg hover:bg-white/10">
                <Settings size={18} className="text-gray-400" />
              </Link>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center font-bold text-black text-sm">
                FF
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>Workspace</span>
                <ChevronDown size={14} />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Portfolio <span className="text-[#BFA76A]">Projets</span>
              </h1>
              <p className="text-gray-500 mt-1">Vue d'ensemble de vos projets et programmes</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10">
                <FileText size={16} />
                Exporter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
                <Plus size={16} />
                Nouveau Projet
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <KPICard 
              icon={Briefcase}
              label="Projets Actifs"
              value={stats.activeProjects}
              trend="+2"
              trendUp={true}
              color="bg-blue-500/20 text-blue-400"
            />
            <KPICard 
              icon={Target}
              label="Progression Moyenne"
              value={`${stats.avgProgress}%`}
              trend="+5%"
              trendUp={true}
              color="bg-green-500/20 text-green-400"
            />
            <KPICard 
              icon={DollarSign}
              label="Budget Consommé"
              value={`CHF ${(stats.totalBudget / 1000000).toFixed(1)}M`}
              trend="67%"
              trendUp={false}
              color="bg-[#BFA76A]/20 text-[#BFA76A]"
            />
            <KPICard 
              icon={Users}
              label="Équipe Mobilisée"
              value={stats.teamSize}
              color="bg-purple-500/20 text-purple-400"
            />
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6 bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#BFA76A]/50 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm text-gray-400 hover:text-white">
                <Filter size={14} />
                Filtres
              </button>
            </div>
            <div className="flex bg-white/5 rounded-lg p-1">
              {views.map(v => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    view === v.id 
                      ? 'bg-[#BFA76A] text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <v.icon size={16} />
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'kanban' && <KanbanView projects={filteredProjects} />}
              {view === 'table' && <TableView projects={filteredProjects} />}
              {view === 'timeline' && <TimelineView projects={filteredProjects} />}
            </motion.div>
          </AnimatePresence>

          {/* Recent Tasks */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Tâches Récentes</h2>
              <Link to="/pmo-tasks" className="flex items-center gap-1 text-sm text-[#BFA76A] hover:underline">
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {demoTasks.slice(0, 4).map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#111] rounded-xl p-4 border border-white/10 hover:border-[#BFA76A]/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
                  </div>
                  <h3 className="font-medium text-white mb-1 line-clamp-2">{task.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{task.project}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-[10px] font-bold text-black">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs text-gray-500">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {new Date(task.dueDate).toLocaleDateString('fr-CH', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Demo Badge */}
      <div className="fixed bottom-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] rounded-full text-black text-sm font-bold shadow-lg shadow-[#BFA76A]/20">
          <Zap size={16} />
          Mode Démo Live
        </div>
      </div>
    </div>
  );
};

export default PMOWorkspacePage;
