import React, { useState } from 'react';
import { FiGrid, FiList, FiPlus, FiSearch } from 'react-icons/fi';
import { useProjectsContext, PROJECT_STATUSES } from '@/contexts/ProjectsContext';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '@/components/projects/ProjectCard';

export default function ProjectsPage() {
  const { projects, deleteProject } = useProjectsContext();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: projects.length,
    actifs: projects.filter(p => p.status === 'en-cours').length,
    enPause: projects.filter(p => p.status === 'en-pause').length,
    termines: projects.filter(p => p.status === 'termine').length,
  };

  const handleDelete = (project) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le projet "${project.name}" ?`)) {
      deleteProject(project.id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Projets
          </h1>
          <p className="text-gray-400 mt-2">Gérez tous vos projets en un seul endroit</p>
        </div>
        <button 
          onClick={() => navigate('/espace-pro/projets/nouveau')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
        >
          <FiPlus className="w-5 h-5" />
          Nouveau Projet
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-[#BFA76A] mb-1">{stats.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-blue-400 mb-1">{stats.actifs}</div>
          <div className="text-sm text-gray-400">Actifs</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.enPause}</div>
          <div className="text-sm text-gray-400">En Pause</div>
        </div>
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all">
          <div className="text-3xl font-bold text-green-400 mb-1">{stats.termines}</div>
          <div className="text-sm text-gray-400">Terminés</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#0A0A0A] border border-[#BFA76A]/20 rounded-lg text-white focus:outline-none focus:border-[#BFA76A]/50"
            >
              <option value="all">Tous les statuts</option>
              {PROJECT_STATUSES.map(status => (
                <option key={status.id} value={status.id}>{status.icon} {status.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-[#0A0A0A] text-gray-400 border border-[#BFA76A]/20 hover:text-white'
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#BFA76A]/20 to-[#D4AF37]/10 border border-[#BFA76A]/30 flex items-center justify-center">
              <FiPlus className="w-12 h-12 text-[#BFA76A]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchTerm || statusFilter !== 'all' ? 'Aucun projet trouvé' : 'Aucun projet'}
            </h3>
            <p className="text-gray-400 mb-8">
              {searchTerm || statusFilter !== 'all'
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez par créer votre premier projet'
              }
            </p>
            <button
              onClick={() => navigate('/espace-pro/projets/nouveau')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all"
            >
              <FiPlus className="w-5 h-5" />
              Créer un projet
            </button>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/espace-pro/projets/${project.id}`)}
              onEdit={() => navigate(`/espace-pro/projets/${project.id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}