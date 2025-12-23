import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiDollarSign } from 'react-icons/fi';

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { id: 1, name: 'Digital Transformation', org: 'TechCorp SA', status: 'En cours', progress: 75, budget: '€450K', team: 12, deadline: '2024-03-31', priority: 'Haute' },
    { id: 2, name: 'Cloud Migration', org: 'Global Ventures', status: 'En cours', progress: 45, budget: '€320K', team: 8, deadline: '2024-06-15', priority: 'Critique' },
    { id: 3, name: 'AI Integration', org: 'Innovation Labs', status: 'Planifié', progress: 15, budget: '€280K', team: 6, deadline: '2024-09-30', priority: 'Moyenne' },
    { id: 4, name: 'Mobile App v2', org: 'Startup Hub', status: 'En pause', progress: 60, budget: '€120K', team: 5, deadline: '2024-05-20', priority: 'Basse' },
    { id: 5, name: 'Data Analytics Platform', org: 'Consulting Pro', status: 'En cours', progress: 90, budget: '€580K', team: 15, deadline: '2024-02-28', priority: 'Critique' },
  ];

  const statusColors = {
    'En cours': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Planifié': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'En pause': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Terminé': 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const priorityColors = {
    'Critique': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Haute': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Moyenne': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Basse': 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Gestion des Projets
          </h1>
          <p className="text-gray-400 mt-2">{projects.length} projets globaux</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all">
          <FiPlus className="w-5 h-5" />
          Nouveau Projet
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#BFA76A]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] border border-[#BFA76A]/20 rounded-lg text-white hover:border-[#BFA76A]/50 transition-colors">
          <FiFilter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A] border-b border-[#BFA76A]/20">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Projet</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Organisation</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Progression</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Priorité</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Équipe</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-[#BFA76A]/10 hover:bg-[#0A0A0A]/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{project.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{project.org}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-[#0A0A0A] rounded-full h-2 overflow-hidden border border-[#BFA76A]/20">
                      <div
                        className="h-full bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">{project.progress}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[project.priority]}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <FiDollarSign className="w-4 h-4" />
                      {project.budget}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <FiUsers className="w-4 h-4" />
                      {project.team}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FiCalendar className="w-4 h-4" />
                      {project.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;