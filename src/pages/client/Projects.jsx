import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects, PROJECT_STATUSES, PROJECT_PRIORITIES } from '../../../contexts/ProjectsContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Input';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * Page liste des projets avec filtres
 */
const Projects = () => {
  const { projects, filterProjects, deleteProject } = useProjects();
  const { isMobile } = useResponsive();

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Appliquer les filtres
  const filteredProjects = filterProjects(filters);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Couleur du statut
  const getStatusColor = (status) => {
    const colors = {
      'en-cours': 'bg-blue-500',
      'termine': 'bg-green-500',
      'planification': 'bg-yellow-500',
      'en-pause': 'bg-orange-500',
      'annule': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  // Couleur de la priorité
  const getPriorityColor = (priority) => {
    const colors = {
      'critique': 'text-red-500',
      'haute': 'text-orange-500',
      'moyenne': 'text-yellow-500',
      'basse': 'text-green-500',
    };
    return colors[priority] || 'text-gray-500';
  };

  const handleDelete = (projectId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      deleteProject(projectId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Projets
          </h1>
          <p className="text-dark-300">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/espace-client/projets/nouveau">
          <Button variant="primary">
            <span className="mr-2">➕</span>
            {!isMobile && 'Nouveau projet'}
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <Card padding="normal">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-primary"
            />
          </div>
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={Object.entries(PROJECT_STATUSES).map(([key, label]) => ({
              value: key,
              label,
            }))}
            placeholder="Tous les statuts"
            fullWidth
          />
          <Select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            options={Object.entries(PROJECT_PRIORITIES).map(([key, label]) => ({
              value: key,
              label,
            }))}
            placeholder="Toutes priorités"
            fullWidth
          />
        </div>

        {/* View mode toggle (Desktop only) */}
        {!isMobile && (
          <div className="flex items-center justify-end mt-4 space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gold-primary text-dark-primary' : 'bg-dark-700 text-dark-300'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gold-primary text-dark-primary' : 'bg-dark-700 text-dark-300'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </Card>

      {/* Liste des projets */}
      {filteredProjects.length === 0 ? (
        <Card padding="large">
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">📁</span>
            <h3 className="text-xl font-semibold text-white mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-dark-300 mb-6">
              {filters.search || filters.status || filters.priority
                ? 'Essayez de modifier vos filtres'
                : 'Créez votre premier projet pour commencer'}
            </p>
            <Link to="/espace-client/projets/nouveau">
              <Button variant="primary">Créer un projet</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className={viewMode === 'grid' && !isMobile ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              padding="normal"
              hoverable
              onClick={() => window.location.href = `/espace-client/projets/${project.id}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex-1 mr-2">
                  {project.name}
                </h3>
                <span className={`px-2 py-1 ${getStatusColor(project.status)} text-white text-xs rounded-full whitespace-nowrap`}>
                  {PROJECT_STATUSES[project.status]}
                </span>
              </div>

              {/* Description */}
              {project.description && (
                <p className="text-dark-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}

              {/* Métadonnées */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Manager:</span>
                  <span className="text-white">{project.manager}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Priorité:</span>
                  <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                    {PROJECT_PRIORITIES[project.priority]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Progression:</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="mb-4">
                <div className="w-full bg-dark-600 rounded-full h-2">
                  <div
                    className="bg-gold-primary h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-xs text-dark-400 mb-4">
                <span>Début: {formatDate(project.startDate)}</span>
                <span>Fin: {formatDate(project.endDate)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link to={`/espace-client/projets/${project.id}`} className="flex-1">
                  <Button variant="primary" size="sm" fullWidth>
                    Voir détails
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  🗑️
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
