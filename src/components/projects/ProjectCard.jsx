import React from 'react';
import { FiCalendar, FiUser, FiFolder, FiAlertCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import { PROJECT_STATUSES, PROJECT_PRIORITIES } from '@/contexts/ProjectsContext';

export default function ProjectCard({ project, onEdit, onDelete, onClick }) {
  const status = PROJECT_STATUSES.find(s => s.id === project.status);
  const priority = PROJECT_PRIORITIES.find(p => p.id === project.priority);
  
  const statusColors = {
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    green: 'bg-green-500/20 text-green-400 border-green-500/50',
    red: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  const priorityColors = {
    red: 'bg-red-500/20 text-red-400 border-red-500/50',
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    green: 'bg-green-500/20 text-green-400 border-green-500/50',
  };

  return (
    <div 
      className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#BFA76A] transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status?.color]}`}>
              <span>{status?.icon}</span>
              {status?.label}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[priority?.color]}`}>
              <span>{priority?.icon}</span>
              {priority?.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit?.(project); }}
            className="p-2 rounded-lg hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 transition-all"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(project); }}
            className="p-2 rounded-lg hover:bg-red-500/20 border border-red-500/50 text-red-400 transition-all"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      )}

      {/* Meta */}
      <div className="space-y-2 text-sm">
        {project.manager && (
          <div className="flex items-center gap-2 text-gray-400">
            <FiUser className="w-4 h-4 text-[#BFA76A]" />
            <span>Chef de projet: {project.manager}</span>
          </div>
        )}
        {project.startDate && (
          <div className="flex items-center gap-2 text-gray-400">
            <FiCalendar className="w-4 h-4 text-[#BFA76A]" />
            <span>
              {new Date(project.startDate).toLocaleDateString('fr-FR')}
              {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('fr-FR')}`}
            </span>
          </div>
        )}
        {project.category && (
          <div className="flex items-center gap-2 text-gray-400">
            <FiFolder className="w-4 h-4 text-[#BFA76A]" />
            <span>{project.category}</span>
          </div>
        )}
        {project.documents && project.documents.length > 0 && (
          <div className="flex items-center gap-2 text-gray-400">
            <FiFolder className="w-4 h-4 text-[#BFA76A]" />
            <span>{project.documents.length} document{project.documents.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}