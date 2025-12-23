import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiCalendar, FiUser, FiSettings, FiTrendingUp } from 'react-icons/fi';

const DashboardProjectCard = ({ project }) => {
  const navigate = useNavigate();

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
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleOpenProject = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/projet/${project.id}`);
  };

  const handleSettings = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/projet/${project.id}/settings`);
  };

  return (
    <div
      onClick={handleOpenProject}
      className="bg-[#111] border border-white/10 rounded-lg p-6 hover:border-[#BFA76A]/50 hover:shadow-lg hover:shadow-[#BFA76A]/10 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center">
            <FiFolder className="w-6 h-6 text-[#BFA76A]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#BFA76A] transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-gray-400">{project.category || 'Sans catégorie'}</p>
          </div>
        </div>
        <button
          onClick={handleSettings}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
          title="Paramètres du projet"
        >
          <FiSettings className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
          {project.status === 'en-cours' ? 'En cours' :
           project.status === 'en-pause' ? 'En pause' :
           project.status === 'termine' ? 'Terminé' :
           project.status === 'annule' ? 'Annulé' :
           'Planification'}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(project.priority)}`}>
          {project.priority === 'critique' ? 'Critique' :
           project.priority === 'haute' ? 'Haute' :
           project.priority === 'moyenne' ? 'Moyenne' :
           'Basse'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <FiTrendingUp className="w-3 h-3" />
            Progression
          </span>
          <span className="text-xs font-bold text-[#BFA76A]">{project.progress || 0}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(project.progress || 0)} transition-all duration-300`}
            style={{ width: `${project.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <FiUser className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Manager</p>
            <p className="text-sm text-white font-medium">{project.manager || 'Non assigné'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Échéance</p>
            <p className="text-sm text-white font-medium">{formatDate(project.endDate)}</p>
          </div>
        </div>
      </div>

      {/* Documents count */}
      {project.documents && project.documents.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gray-400">
            {project.documents.length} document{project.documents.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardProjectCard;
