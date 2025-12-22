import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import ProjectHealthScore from '../common/ProjectHealthScore';

const ProjectListTable = ({ projects }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'active': 'bg-green-100 text-green-700 border-green-300',
      'at-risk': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'on-hold': 'bg-gray-100 text-gray-700 border-gray-300',
      'completed': 'bg-blue-100 text-blue-700 border-blue-300'
    };
    const labels = {
      'active': 'Actif',
      'at-risk': 'À risque',
      'on-hold': 'En pause',
      'completed': 'Terminé'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Projet
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Health Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Responsable
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Progression
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.program}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(project.status)}
                </td>
                <td className="px-6 py-4">
                  <ProjectHealthScore project={project} showLabel={false} size="sm" />
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{project.owner}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">
                    CHF {(project.budgetUsed / 1000).toFixed(0)}K / {(project.budgetTotal / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.round((project.budgetUsed / project.budgetTotal) * 100)}% consommé
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/app/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Voir
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListTable;
