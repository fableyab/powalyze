import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDashboardContext, DASHBOARD_VIEWS, DASHBOARD_FILTER_PRESETS } from '@/contexts/DashboardContext';
import DashboardProjectCard from '@/components/dashboard/DashboardProjectCard';
import { FiFolder, FiCheckSquare, FiDollarSign, FiUsers, FiSearch, FiGrid, FiList, FiFilter, FiArrowRight, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

const DashboardMain = () => {
  const {
    getDashboardStats,
    getFilteredProjects,
    getCriticalTasks,
    getUpcomingEvents,
    dashboardView,
    setDashboardView,
    filterPreset,
    setFilterPreset,
    searchQuery,
    setSearchQuery
  } = useDashboardContext();

  const stats = getDashboardStats();
  const projects = getFilteredProjects();
  const criticalTasks = getCriticalTasks();
  const upcomingEvents = getUpcomingEvents();

  const [showFilters, setShowFilters] = useState(false);

  const statsCards = [
    { 
      label: 'Projets Actifs', 
      value: stats.activeProjects.toString(), 
      total: stats.totalProjects,
      icon: FiFolder, 
      color: 'text-[#BFA76A]', 
      bg: 'bg-[#BFA76A]/20',
      link: '/espace-pro/projets'
    },
    { 
      label: 'Tâches en Cours', 
      value: stats.inProgressTasks.toString(), 
      total: stats.todayTasks,
      icon: FiCheckSquare, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/20',
      link: '/espace-pro/taches'
    },
    { 
      label: 'Budget Utilisé', 
      value: `${stats.budgetPercentage}%`, 
      detail: `€${(stats.usedBudget / 1000000).toFixed(2)}M / €${(stats.totalBudget / 1000000).toFixed(2)}M`,
      icon: FiDollarSign, 
      color: 'text-green-400', 
      bg: 'bg-green-500/20',
      link: '/espace-pro/rapports'
    },
    { 
      label: 'Membres Équipe', 
      value: stats.teamMembers.toString(), 
      icon: FiUsers, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/20',
      link: '/espace-pro/equipe'
    },
  ];

  const filterButtons = [
    { value: DASHBOARD_FILTER_PRESETS.ALL, label: 'Tous les projets' },
    { value: DASHBOARD_FILTER_PRESETS.ACTIVE, label: 'Projets actifs' },
    { value: DASHBOARD_FILTER_PRESETS.CRITICAL, label: 'Projets critiques' },
    { value: DASHBOARD_FILTER_PRESETS.COMPLETED, label: 'Projets terminés' }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      'critique': 'text-red-400',
      'haute': 'text-orange-400',
      'moyenne': 'text-yellow-400',
      'basse': 'text-green-400'
    };
    return colors[priority] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Vue d'ensemble de vos projets et activités</p>
        </div>
        <Link 
          to="/espace-pro/projets/nouveau"
          className="px-6 py-3 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-colors"
        >
          Nouveau Projet
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="bg-[#111] border border-white/10 p-6 rounded-lg hover:border-[#BFA76A]/50 hover:shadow-lg hover:shadow-[#BFA76A]/10 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <Icon className={stat.color} size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-[#BFA76A] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              {stat.detail && <div className="text-xs text-gray-500">{stat.detail}</div>}
              {stat.total !== undefined && <div className="text-xs text-gray-500">sur {stat.total} total</div>}
            </Link>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 bg-[#111] border rounded-lg flex items-center gap-2 transition-colors ${
              showFilters ? 'border-[#BFA76A] text-[#BFA76A]' : 'border-white/10 text-white hover:border-[#BFA76A]/50'
            }`}
          >
            <FiFilter />
            <span>Filtrer</span>
          </button>
          <button
            onClick={() => setDashboardView(DASHBOARD_VIEWS.GRID)}
            className={`px-4 py-3 bg-[#111] border rounded-lg transition-colors ${
              dashboardView === DASHBOARD_VIEWS.GRID ? 'border-[#BFA76A] text-[#BFA76A]' : 'border-white/10 text-white hover:border-[#BFA76A]/50'
            }`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setDashboardView(DASHBOARD_VIEWS.LIST)}
            className={`px-4 py-3 bg-[#111] border rounded-lg transition-colors ${
              dashboardView === DASHBOARD_VIEWS.LIST ? 'border-[#BFA76A] text-[#BFA76A]' : 'border-white/10 text-white hover:border-[#BFA76A]/50'
            }`}
          >
            <FiList />
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {filterButtons.map(filter => (
            <button
              key={filter.value}
              onClick={() => setFilterPreset(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterPreset === filter.value
                  ? 'bg-[#BFA76A] text-black'
                  : 'bg-[#111] border border-white/10 text-white hover:border-[#BFA76A]/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Mes Projets ({projects.length})
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-lg p-12 text-center">
            <FiFolder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'Aucun projet ne correspond à votre recherche.' : 'Commencez par créer votre premier projet.'}
            </p>
            <Link 
              to="/espace-pro/projets/nouveau"
              className="inline-block px-6 py-3 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-colors"
            >
              Créer un projet
            </Link>
          </div>
        ) : (
          <div className={dashboardView === DASHBOARD_VIEWS.GRID 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {projects.map(project => (
              <DashboardProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Row: Critical Tasks & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Critical Tasks */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FiAlertTriangle className="text-red-400" />
              Tâches Critiques
            </h2>
            <Link to="/espace-pro/taches" className="flex items-center gap-2 text-[#BFA76A] hover:text-[#BFA76A]/80 transition-colors">
              <span className="text-sm">Voir tout</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {criticalTasks.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aucune tâche critique</p>
            ) : (
              criticalTasks.map((task) => (
                <div key={task.id} className="border border-white/10 rounded-lg p-4 hover:border-[#BFA76A]/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <span className={`text-xs font-bold ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  {task.project && <p className="text-sm text-gray-400 mb-2">{task.project}</p>}
                  {task.dueDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FiCalendar size={14} />
                      <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FiCalendar className="text-[#BFA76A]" />
              Événements à Venir
            </h2>
            <Link to="/espace-pro/calendrier" className="flex items-center gap-2 text-[#BFA76A] hover:text-[#BFA76A]/80 transition-colors">
              <span className="text-sm">Voir tout</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aucun événement à venir</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="border border-white/10 rounded-lg p-4 hover:border-[#BFA76A]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
                      <FiCalendar className="text-[#BFA76A]" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.project}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
