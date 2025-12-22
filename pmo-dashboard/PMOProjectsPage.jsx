import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Filter, MoreHorizontal, Calendar,
  Users, DollarSign, Clock, CheckCircle2, AlertCircle, Target,
  TrendingUp, Briefcase, Edit, Trash2, Eye, Copy, Archive,
  ChevronDown, Star, Flag, Zap
} from 'lucide-react';

const projects = [
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
    category: "IT Infrastructure",
    description: "Migration complète de l'infrastructure on-premise vers Azure Cloud avec modernisation des applications legacy."
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
    category: "Data & BI",
    description: "Création de tableaux de bord Power BI pour le département finance avec intégration SAP."
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
    category: "Automation",
    description: "Automatisation des processus RH : onboarding, gestion des congés, évaluations annuelles."
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
    category: "IT Infrastructure",
    description: "Migration vers SAP S/4HANA avec refonte complète des processus métier."
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
    category: "PMO",
    description: "Mise en place d'un framework PMO complet avec outils, processus et gouvernance."
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
    category: "Security",
    description: "Audit complet de la sécurité informatique et recommandations de remédiation."
  },
  {
    id: 7,
    name: "Data Lake Implementation",
    client: "Novartis",
    status: "in-progress",
    priority: "high",
    progress: 55,
    budget: 380000,
    spent: 209000,
    startDate: "2025-01-20",
    endDate: "2025-08-15",
    owner: "Pierre Keller",
    team: ["Sophie L.", "Marc D.", "Anna M."],
    tasks: { total: 72, completed: 40, inProgress: 28, blocked: 4 },
    health: "on-track",
    category: "Data & BI",
    description: "Mise en place d'un Data Lake Azure pour centraliser et analyser les données de recherche."
  },
  {
    id: 8,
    name: "DevOps Transformation",
    client: "Zurich Insurance",
    status: "planning",
    priority: "medium",
    progress: 8,
    budget: 220000,
    spent: 17600,
    startDate: "2025-04-01",
    endDate: "2025-10-31",
    owner: "Luc Bernard",
    team: ["Jean P.", "Marc D."],
    tasks: { total: 45, completed: 4, inProgress: 6, blocked: 0 },
    health: "on-track",
    category: "IT Infrastructure",
    description: "Transformation DevOps avec CI/CD, containerisation et infrastructure as code."
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'planning': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'on-hold': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
  const labels = {
    'in-progress': 'En cours',
    'completed': 'Terminé',
    'planning': 'Planification',
    'on-hold': 'En pause',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
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

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  };

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
                  P
                </div>
                <div>
                  <div className="font-bold text-white">Projets</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Portfolio complet</div>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
              <Plus size={16} />
              Nouveau Projet
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase size={20} className="text-[#BFA76A]" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <div className="text-xs text-gray-500">Projets Total</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={20} className="text-blue-400" />
                <span className="text-2xl font-bold">{stats.inProgress}</span>
              </div>
              <div className="text-xs text-gray-500">En Cours</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-2xl font-bold">{stats.completed}</span>
              </div>
              <div className="text-xs text-gray-500">Terminés</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign size={20} className="text-[#BFA76A]" />
                <span className="text-2xl font-bold">CHF {(stats.totalBudget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="text-xs text-gray-500">Budget Total</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#BFA76A]/50 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="in-progress">En cours</option>
                <option value="planning">Planification</option>
                <option value="on-hold">En pause</option>
                <option value="completed">Terminé</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} projet(s)
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#111] rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={project.priority} />
                      <StatusBadge status={project.status} />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} className="text-gray-500 hover:text-white" />
                    </button>
                  </div>

                  <h3 className="font-bold text-white text-lg mb-1">{project.name}</h3>
                  <p className="text-sm text-[#BFA76A] mb-3">{project.client}</p>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Budget</div>
                      <div className="text-sm font-bold">CHF {(project.budget / 1000).toFixed(0)}k</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Dépensé</div>
                      <div className="text-sm font-bold">CHF {(project.spent / 1000).toFixed(0)}k</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#111]">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white border-2 border-[#111]">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {new Date(project.endDate).toLocaleDateString('fr-CH')}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 px-5 py-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Eye size={14} /> Voir
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Edit size={14} /> Modifier
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <Copy size={14} /> Dupliquer
                  </button>
                </div>
              </motion.div>
            ))}
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

export default ProjectsPage;
