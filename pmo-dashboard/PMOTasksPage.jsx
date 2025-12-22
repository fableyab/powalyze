import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Calendar, Clock, AlertTriangle, CheckCircle2,
  Circle, MoreHorizontal, Flag, User, Tag, MessageSquare, Paperclip,
  ChevronRight, ChevronDown, Filter, SortDesc, Zap, Target, ArrowUpRight
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Finaliser architecture Azure",
    description: "Valider le design de l'infrastructure cloud avec l'équipe sécurité",
    project: "Migration Cloud Azure",
    assignee: "Marc Dubois",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-25",
    tags: ["Infrastructure", "Azure"],
    subtasks: [
      { id: 1, title: "Schéma réseau", done: true },
      { id: 2, title: "Règles firewall", done: true },
      { id: 3, title: "Configuration VPN", done: false },
    ],
    comments: 5,
    attachments: 3
  },
  {
    id: 2,
    title: "Développer dashboard Finance",
    description: "Créer les visualisations Power BI pour le département finance",
    project: "Dashboard Power BI Finance",
    assignee: "Sophie Laurent",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-28",
    tags: ["Power BI", "Finance"],
    subtasks: [
      { id: 1, title: "Connexion SAP", done: true },
      { id: 2, title: "Modèle de données", done: true },
      { id: 3, title: "Visuels KPIs", done: false },
      { id: 4, title: "Tests utilisateurs", done: false },
    ],
    comments: 8,
    attachments: 2
  },
  {
    id: 3,
    title: "Review code migration",
    description: "Revue du code de migration des données legacy",
    project: "Refonte ERP SAP",
    assignee: "Jean Petit",
    status: "todo",
    priority: "critical",
    dueDate: "2025-01-20",
    tags: ["SAP", "Code Review"],
    subtasks: [],
    comments: 2,
    attachments: 1
  },
  {
    id: 4,
    title: "Documentation API",
    description: "Documenter les nouvelles API REST pour l'intégration",
    project: "Migration Cloud Azure",
    assignee: "Pierre Keller",
    status: "todo",
    priority: "medium",
    dueDate: "2025-02-01",
    tags: ["API", "Documentation"],
    subtasks: [
      { id: 1, title: "Endpoints auth", done: false },
      { id: 2, title: "Endpoints data", done: false },
    ],
    comments: 0,
    attachments: 0
  },
  {
    id: 5,
    title: "Tests de charge",
    description: "Exécuter les tests de performance sur l'environnement de staging",
    project: "Refonte ERP SAP",
    assignee: "Luc Bernard",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-22",
    tags: ["Testing", "Performance"],
    subtasks: [
      { id: 1, title: "Scénarios de test", done: true },
      { id: 2, title: "Exécution tests", done: false },
      { id: 3, title: "Rapport", done: false },
    ],
    comments: 3,
    attachments: 1
  },
  {
    id: 6,
    title: "Formation utilisateurs RH",
    description: "Préparer et animer les sessions de formation pour le module RH",
    project: "Automatisation RH",
    assignee: "Anna Martin",
    status: "todo",
    priority: "medium",
    dueDate: "2025-02-15",
    tags: ["Formation", "RH"],
    subtasks: [
      { id: 1, title: "Supports de formation", done: false },
      { id: 2, title: "Planning sessions", done: false },
    ],
    comments: 1,
    attachments: 2
  },
  {
    id: 7,
    title: "Audit sécurité phase 2",
    description: "Analyser les vulnérabilités identifiées dans la phase 1",
    project: "Cybersecurity Audit",
    assignee: "Thomas Weber",
    status: "blocked",
    priority: "high",
    dueDate: "2025-01-30",
    tags: ["Sécurité", "Audit"],
    subtasks: [],
    comments: 4,
    attachments: 5
  },
  {
    id: 8,
    title: "Setup CI/CD pipeline",
    description: "Configurer le pipeline d'intégration et déploiement continu",
    project: "DevOps Transformation",
    assignee: "Luc Bernard",
    status: "todo",
    priority: "medium",
    dueDate: "2025-04-15",
    tags: ["DevOps", "CI/CD"],
    subtasks: [
      { id: 1, title: "Config GitLab", done: false },
      { id: 2, title: "Scripts build", done: false },
      { id: 3, title: "Tests automatisés", done: false },
    ],
    comments: 0,
    attachments: 0
  },
  {
    id: 9,
    title: "Optimiser requêtes SQL",
    description: "Améliorer les performances des requêtes du Data Lake",
    project: "Data Lake Implementation",
    assignee: "Sophie Laurent",
    status: "completed",
    priority: "medium",
    dueDate: "2025-01-15",
    tags: ["SQL", "Performance"],
    subtasks: [
      { id: 1, title: "Analyse requêtes", done: true },
      { id: 2, title: "Index optimization", done: true },
    ],
    comments: 6,
    attachments: 1
  },
  {
    id: 10,
    title: "Design mockups v2",
    description: "Créer les maquettes pour la nouvelle version de l'interface",
    project: "Dashboard Power BI Finance",
    assignee: "Anna Martin",
    status: "completed",
    priority: "high",
    dueDate: "2025-01-10",
    tags: ["Design", "UI/UX"],
    subtasks: [
      { id: 1, title: "Wireframes", done: true },
      { id: 2, title: "Maquettes HD", done: true },
      { id: 3, title: "Validation client", done: true },
    ],
    comments: 12,
    attachments: 8
  }
];

const PriorityBadge = ({ priority }) => {
  const config = {
    critical: { color: 'bg-red-600 text-white', icon: AlertTriangle },
    high: { color: 'bg-orange-500 text-white', icon: Flag },
    medium: { color: 'bg-yellow-500 text-black', icon: Flag },
    low: { color: 'bg-gray-500 text-white', icon: Flag }
  };
  const { color, icon: Icon } = config[priority];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${color}`}>
      <Icon size={10} />
      {priority}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  const config = {
    'todo': { icon: Circle, color: 'text-gray-400' },
    'in-progress': { icon: Clock, color: 'text-blue-400' },
    'completed': { icon: CheckCircle2, color: 'text-green-400' },
    'blocked': { icon: AlertTriangle, color: 'text-red-400' }
  };
  const { icon: Icon, color } = config[status];
  return <Icon size={18} className={color} />;
};

const TaskCard = ({ task, onClick }) => {
  const completedSubtasks = task.subtasks.filter(s => s.done).length;
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0 && task.status !== 'completed';
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0 && task.status !== 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onClick={onClick}
      className={`bg-[#111] rounded-xl border transition-all cursor-pointer group ${
        isOverdue ? 'border-red-500/50' : isDueSoon ? 'border-yellow-500/50' : 'border-white/10 hover:border-[#BFA76A]/50'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <StatusIcon status={task.status} />
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-white/10 rounded">
              <MoreHorizontal size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        <h3 className="font-medium text-white mb-2 line-clamp-2">{task.title}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400">
              {tag}
            </span>
          ))}
        </div>

        {task.subtasks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Sous-tâches</span>
              <span>{completedSubtasks}/{task.subtasks.length}</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#BFA76A] rounded-full transition-all"
                style={{ width: `${(completedSubtasks / task.subtasks.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-[8px] font-bold text-black">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-[10px] text-gray-500">{task.assignee.split(' ')[0]}</span>
          </div>
          <div className={`flex items-center gap-1 text-[10px] ${
            isOverdue ? 'text-red-400' : isDueSoon ? 'text-yellow-400' : 'text-gray-500'
          }`}>
            <Calendar size={10} />
            {new Date(task.dueDate).toLocaleDateString('fr-CH', { day: 'numeric', month: 'short' })}
          </div>
        </div>
      </div>

      {(task.comments > 0 || task.attachments > 0) && (
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-gray-500">
          {task.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare size={10} /> {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip size={10} /> {task.attachments}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

const TasksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const groupedTasks = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    blocked: filteredTasks.filter(t => t.status === 'blocked'),
    completed: filteredTasks.filter(t => t.status === 'completed')
  };

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  const columns = [
    { id: 'todo', label: 'À Faire', color: 'border-gray-500' },
    { id: 'in-progress', label: 'En Cours', color: 'border-blue-500' },
    { id: 'blocked', label: 'Bloqué', color: 'border-red-500' },
    { id: 'completed', label: 'Terminé', color: 'border-green-500' }
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
                  <Target size={20} />
                </div>
                <div>
                  <div className="font-bold text-white">Tâches</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Gestion des tâches</div>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black text-sm font-bold hover:opacity-90">
              <Plus size={16} />
              Nouvelle Tâche
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-gray-400">{stats.todo}</div>
              <div className="text-xs text-gray-500">À Faire</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">{stats.inProgress}</div>
              <div className="text-xs text-gray-500">En Cours</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-xs text-gray-500">Terminé</div>
            </div>
            <div className="bg-[#111] rounded-xl p-5 border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
              <div className="text-xs text-gray-500">En retard</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 bg-[#111] rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher une tâche..."
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
                <option value="todo">À Faire</option>
                <option value="in-progress">En Cours</option>
                <option value="blocked">Bloqué</option>
                <option value="completed">Terminé</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none"
              >
                <option value="all">Toutes priorités</option>
                <option value="critical">Critique</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredTasks.length} tâche(s)
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-4 gap-6">
            {columns.map(column => (
              <div key={column.id} className="space-y-4">
                <div className={`flex items-center justify-between p-3 bg-[#111] rounded-xl border-t-2 ${column.color}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{column.label}</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded text-xs">
                      {groupedTasks[column.id].length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-white/10 rounded">
                    <Plus size={16} className="text-gray-500" />
                  </button>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {groupedTasks[column.id].map(task => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Task Detail Modal */}
          <AnimatePresence>
            {selectedTask && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                onClick={() => setSelectedTask(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#111] rounded-2xl border border-white/10 max-w-2xl w-full overflow-hidden max-h-[80vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <StatusIcon status={selectedTask.status} />
                        <div>
                          <h2 className="text-xl font-bold mb-1">{selectedTask.title}</h2>
                          <p className="text-sm text-[#BFA76A]">{selectedTask.project}</p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-white" onClick={() => setSelectedTask(null)}>✕</button>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <PriorityBadge priority={selectedTask.priority} />
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        selectedTask.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        selectedTask.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        selectedTask.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {selectedTask.status === 'todo' ? 'À Faire' :
                         selectedTask.status === 'in-progress' ? 'En Cours' :
                         selectedTask.status === 'blocked' ? 'Bloqué' : 'Terminé'}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-6">{selectedTask.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <User size={14} /> Assigné à
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#8B7355] flex items-center justify-center text-xs font-bold text-black">
                            {selectedTask.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{selectedTask.assignee}</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar size={14} /> Échéance
                        </div>
                        <span className="font-medium">
                          {new Date(selectedTask.dueDate).toLocaleDateString('fr-CH', { 
                            weekday: 'long', day: 'numeric', month: 'long' 
                          })}
                        </span>
                      </div>
                    </div>

                    {selectedTask.subtasks.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-400 mb-3">Sous-tâches</h3>
                        <div className="space-y-2">
                          {selectedTask.subtasks.map(subtask => (
                            <div key={subtask.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                              {subtask.done ? (
                                <CheckCircle2 size={16} className="text-green-400" />
                              ) : (
                                <Circle size={16} className="text-gray-500" />
                              )}
                              <span className={subtask.done ? 'text-gray-500 line-through' : ''}>{subtask.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTask.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-[#BFA76A]/20 text-[#BFA76A] rounded-lg text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <MessageSquare size={16} /> {selectedTask.comments} Commentaires
                      </button>
                      <button className="flex-1 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Paperclip size={16} /> {selectedTask.attachments} Pièces jointes
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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

export default TasksPage;
