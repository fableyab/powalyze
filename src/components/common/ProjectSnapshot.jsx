import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  Calendar, 
  Users,
  ArrowRight 
} from 'lucide-react';
import ProjectHealthScore from './ProjectHealthScore';

/**
 * Carte compacte résumant un projet
 * Utilisable partout : Dashboard, Portfolio, etc.
 */
const ProjectSnapshot = ({ project, compact = false }) => {
  return (
    <Link
      to={`/app/projects/${project.id}`}
      className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-powalyze-blue transition-all p-5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-powalyze-blue transition-colors mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500">{project.type} • {project.program}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-powalyze-blue group-hover:translate-x-1 transition-all" />
      </div>

      {/* Health Score */}
      <div className="mb-4">
        <ProjectHealthScore project={project} size="sm" />
      </div>

      {/* Metrics Grid */}
      {!compact && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Progression */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Progression</p>
              <p className="text-sm font-bold text-gray-900">{project.progress}%</p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Budget</p>
              <p className="text-sm font-bold text-gray-900">
                {Math.round((project.budgetUsed / project.budgetTotal) * 100)}%
              </p>
            </div>
          </div>

          {/* Risques */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Risques</p>
              <p className="text-sm font-bold text-gray-900">
                {project.risks?.filter(r => r.severity === 'critical' || r.severity === 'high').length || 0}
              </p>
            </div>
          </div>

          {/* Jalons */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Jalons</p>
              <p className="text-sm font-bold text-gray-900">
                {project.milestones?.filter(m => m.status === 'completed').length || 0}/{project.milestones?.length || 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{project.owner}</span>
        </div>
        <div className="flex items-center gap-2">
          {project.status === 'active' && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
              Actif
            </span>
          )}
          {project.status === 'at-risk' && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
              À risque
            </span>
          )}
          {project.status === 'on-hold' && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
              En pause
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectSnapshot;
