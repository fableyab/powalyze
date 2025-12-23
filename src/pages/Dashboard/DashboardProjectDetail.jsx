import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { useTasksContext } from '@/contexts/TasksContext';
import BackToDashboard from '@/components/dashboard/BackToDashboard';
import TaskItem from '@/components/tasks/TaskItem';
import TaskForm from '@/components/tasks/TaskForm';
import { FiFolder, FiCalendar, FiUser, FiSettings, FiTrendingUp, FiDollarSign, FiAlertTriangle, FiCheckCircle, FiClock, FiPlus } from 'react-icons/fi';

const DashboardProjectDetail = () => {
  const { projectId } = useParams();
  const { getProjectById, getProjectTasks } = useDashboardContext();
  const { toggleTaskStatus, updateTask, deleteTask } = useTasksContext();
  
  const project = getProjectById(projectId);
  const projectTasks = getProjectTasks(projectId);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFilter, setTaskFilter] = useState('all');

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8">
        <BackToDashboard className="mb-6" />
        <div className="bg-[#111] border border-white/10 rounded-lg p-12 text-center">
          <FiAlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Projet introuvable</h1>
          <p className="text-gray-400">Le projet demandé n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'planification': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'en-cours': 'bg-green-500/20 text-green-400 border-green-500/50',
      'en-pause': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'termine': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
      'annule': 'bg-red-500/20 text-red-400 border-red-500/50'
    };
    return colors[status] || colors['en-cours'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'critique': 'bg-red-500/20 text-red-400 border-red-500/50',
      'haute': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'moyenne': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'basse': 'bg-green-500/20 text-green-400 border-green-500/50'
    };
    return colors[priority] || colors['moyenne'];
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-[#BFA76A]';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const filteredTasks = projectTasks.filter(task => {
    if (taskFilter === 'all') return true;
    return task.status === taskFilter;
  });

  const taskStats = {
    total: projectTasks.length,
    todo: projectTasks.filter(t => t.status === 'todo').length,
    inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
    review: projectTasks.filter(t => t.status === 'review').length,
    done: projectTasks.filter(t => t.status === 'done').length
  };

  const handleToggleTask = (taskId) => {
    toggleTaskStatus(taskId);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteTask(taskId);
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1">
          <BackToDashboard />
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
              <FiFolder className="w-8 h-8 text-[#BFA76A]" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
              <p className="text-gray-400 mb-4">{project.description || 'Aucune description disponible'}</p>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status === 'en-cours' ? 'En cours' :
                   project.status === 'en-pause' ? 'En pause' :
                   project.status === 'termine' ? 'Terminé' :
                   project.status === 'annule' ? 'Annulé' :
                   'Planification'}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium border ${getPriorityColor(project.priority)}`}>
                  {project.priority === 'critique' ? 'Critique' :
                   project.priority === 'haute' ? 'Haute' :
                   project.priority === 'moyenne' ? 'Moyenne' :
                   'Basse'}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-white/5 text-gray-400 border border-white/10">
                  {project.category || 'Sans catégorie'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Link
          to={`/dashboard/projet/${projectId}/settings`}
          className="px-6 py-3 bg-[#111] border border-white/10 text-white font-medium rounded-lg hover:border-[#BFA76A]/50 hover:bg-[#1A1A1A] transition-all flex items-center gap-2"
        >
          <FiSettings />
          <span>Paramètres</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
              <FiTrendingUp className="text-[#BFA76A]" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Progression</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-white">{project.progress || 0}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(project.progress || 0)} transition-all`}
                style={{ width: `${project.progress || 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FiCheckCircle className="text-blue-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Tâches</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {taskStats.done}/{taskStats.total}
          </div>
          <div className="text-xs text-gray-500">tâches terminées</div>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FiDollarSign className="text-green-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Budget</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            €{((project.budgetUsed || 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-500">
            sur €{((project.budget || 0) / 1000).toFixed(0)}K
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiClock className="text-purple-400" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Échéance</span>
          </div>
          <div className="text-lg font-bold text-white mb-1">{formatDate(project.endDate)}</div>
          <div className="text-xs text-gray-500">
            Début: {formatDate(project.startDate)}
          </div>
        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <FiUser className="text-[#BFA76A]" />
            <h3 className="font-bold text-white">Manager</h3>
          </div>
          <p className="text-lg text-white">{project.manager || 'Non assigné'}</p>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <FiCalendar className="text-[#BFA76A]" />
            <h3 className="font-bold text-white">Dates</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-400">Début: </span>
              <span className="text-white font-medium">{formatDate(project.startDate)}</span>
            </div>
            <div>
              <span className="text-gray-400">Fin: </span>
              <span className="text-white font-medium">{formatDate(project.endDate)}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <FiFolder className="text-[#BFA76A]" />
            <h3 className="font-bold text-white">Documents</h3>
          </div>
          <p className="text-lg text-white">
            {project.documents?.length || 0} document{(project.documents?.length || 0) > 1 ? 's' : ''}
          </p>
          <Link 
            to="/espace-pro/documents"
            className="text-sm text-[#BFA76A] hover:text-[#BFA76A]/80 transition-colors mt-2 inline-block"
          >
            Voir les documents →
          </Link>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-[#111] border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tâches du Projet</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            className="px-4 py-2 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-colors flex items-center gap-2"
          >
            <FiPlus />
            <span>Nouvelle Tâche</span>
          </button>
        </div>

        {/* Task Filters */}
        <div className="flex gap-2 mb-6">
          {[
            { value: 'all', label: `Toutes (${taskStats.total})` },
            { value: 'todo', label: `À faire (${taskStats.todo})` },
            { value: 'in-progress', label: `En cours (${taskStats.inProgress})` },
            { value: 'review', label: `Revue (${taskStats.review})` },
            { value: 'done', label: `Terminées (${taskStats.done})` }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setTaskFilter(filter.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                taskFilter === filter.value
                  ? 'bg-[#BFA76A] text-black'
                  : 'bg-white/5 border border-white/10 text-white hover:border-[#BFA76A]/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <FiCheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Aucune tâche pour ce filtre</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleToggleTask(task.id)}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default DashboardProjectDetail;
