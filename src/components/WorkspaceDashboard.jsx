import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Users, CheckCircle2, Clock, 
  AlertCircle, FolderKanban, Calendar, Target, Zap,
  ArrowRight, Plus, Star, MoreVertical, Search, Filter
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const WorkspaceDashboard = () => {
  const [viewMode, setViewMode] = useState('overview');

  // Data
  const projectsData = [
    { name: 'Lun', projets: 12, taches: 45, heures: 32 },
    { name: 'Mar', projets: 15, taches: 52, heures: 38 },
    { name: 'Mer', projets: 18, taches: 48, heures: 42 },
    { name: 'Jeu', projets: 16, taches: 55, heures: 40 },
    { name: 'Ven', projets: 20, taches: 60, heures: 45 },
    { name: 'Sam', projets: 14, taches: 35, heures: 25 },
    { name: 'Dim', projets: 10, taches: 28, heures: 18 },
  ];

  const tasksByStatus = [
    { name: 'À faire', value: 45, color: '#94a3b8' },
    { name: 'En cours', value: 32, color: '#3b82f6' },
    { name: 'En révision', value: 18, color: '#f59e0b' },
    { name: 'Terminé', value: 67, color: '#10b981' },
  ];

  const recentProjects = [
    { id: 1, name: 'Refonte Site Web', progress: 75, status: 'En cours', team: 5, deadline: '2025-01-15', priority: 'Haute' },
    { id: 2, name: 'Migration Cloud', progress: 45, status: 'En cours', team: 8, deadline: '2025-02-20', priority: 'Critique' },
    { id: 3, name: 'App Mobile', progress: 90, status: 'Révision', team: 4, deadline: '2024-12-30', priority: 'Moyenne' },
    { id: 4, name: 'Dashboard Analytics', progress: 30, status: 'Planifié', team: 6, deadline: '2025-03-10', priority: 'Basse' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Design mockups validation', project: 'Refonte Site Web', assignee: 'Marie D.', due: 'Aujourd\'hui', priority: 'Haute' },
    { id: 2, title: 'Backend API development', project: 'App Mobile', assignee: 'Jean P.', due: 'Demain', priority: 'Critique' },
    { id: 3, title: 'Testing phase 1', project: 'Migration Cloud', assignee: 'Sophie L.', due: 'Cette semaine', priority: 'Moyenne' },
    { id: 4, title: 'Client presentation', project: 'Dashboard Analytics', assignee: 'Thomas R.', due: 'Lundi prochain', priority: 'Haute' },
  ];

  const teamActivity = [
    { user: 'Marie D.', action: 'a complété', target: 'Design mockups', time: 'Il y a 5min', avatar: 'MD' },
    { user: 'Jean P.', action: 'a créé', target: 'Backend API task', time: 'Il y a 12min', avatar: 'JP' },
    { user: 'Sophie L.', action: 'a commenté', target: 'Migration plan', time: 'Il y a 23min', avatar: 'SL' },
    { user: 'Thomas R.', action: 'a assigné', target: 'Client meeting', time: 'Il y a 1h', avatar: 'TR' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critique': return 'bg-red-100 text-red-700 border-red-200';
      case 'Haute': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Moyenne': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Basse': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur Powalyze</h1>
          <p className="text-gray-500 mt-1">Voici un aperçu de vos projets et tâches</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-gray-500 mt-1">Projets actifs</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">162</p>
          <p className="text-sm text-gray-500 mt-1">Tâches complétées</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              -5%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-sm text-gray-500 mt-1">Tâches en retard</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">32</p>
          <p className="text-sm text-gray-500 mt-1">Membres d'équipe</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Activité de la semaine</h2>
            <select className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-sm">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>Ce mois</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectsData}>
              <defs>
                <linearGradient id="colorProjets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTaches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="projets" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProjets)" name="Projets" />
              <Area type="monotone" dataKey="taches" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTaches)" name="Tâches" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition des tâches</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={tasksByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {tasksByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {tasksByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects and Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Projets récents</h2>
            <Link to="/pmo-projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Voir tout <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progression</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{project.team} membres</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Tâches à venir</h2>
            <Link to="/pmo-tasks" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Voir tout <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3 flex-1">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between ml-7">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                      {task.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-600">{task.assignee}</span>
                  </div>
                  <span className="text-xs text-gray-500">{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Activité de l'équipe</h2>
          <Link to="/pmo-team" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Voir tout</Link>
        </div>
        <div className="space-y-4">
          {teamActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span>
                  {' '}<span className="text-gray-600">{activity.action}</span>
                  {' '}<span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
