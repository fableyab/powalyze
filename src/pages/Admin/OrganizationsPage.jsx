import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiUsers, FiBriefcase, FiMapPin } from 'react-icons/fi';

function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const organizations = [
    { id: 1, name: 'TechCorp SA', location: 'Genève, CH', users: 87, projects: 23, plan: 'Enterprise', status: 'Actif', created: '2023-01-15' },
    { id: 2, name: 'Innovation Labs', location: 'Lausanne, CH', users: 45, projects: 12, plan: 'Pro', status: 'Actif', created: '2023-03-22' },
    { id: 3, name: 'Global Ventures', location: 'Zürich, CH', users: 156, projects: 45, plan: 'Enterprise', status: 'Actif', created: '2023-02-10' },
    { id: 4, name: 'Startup Hub', location: 'Berne, CH', users: 12, projects: 5, plan: 'Starter', status: 'Inactif', created: '2023-06-05' },
    { id: 5, name: 'Consulting Pro', location: 'Neuchâtel, CH', users: 67, projects: 18, plan: 'Pro', status: 'Actif', created: '2023-04-18' },
  ];

  const planColors = {
    Enterprise: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Pro: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Starter: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const statusColors = {
    Actif: 'bg-green-500/20 text-green-400 border-green-500/30',
    Inactif: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] bg-clip-text text-transparent">
            Gestion des Organisations
          </h1>
          <p className="text-gray-400 mt-2">{organizations.length} organisations actives</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all">
          <FiPlus className="w-5 h-5" />
          Nouvelle Organisation
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une organisation..."
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

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl p-6 hover:border-[#BFA76A]/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{org.name}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <FiMapPin className="w-4 h-4" />
                  {org.location}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#BFA76A]/10">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <FiUsers className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Utilisateurs</span>
                </div>
                <p className="text-2xl font-bold text-white">{org.users}</p>
              </div>
              <div className="bg-[#0A0A0A] rounded-lg p-3 border border-[#BFA76A]/10">
                <div className="flex items-center gap-2 text-green-400 mb-1">
                  <FiBriefcase className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Projets</span>
                </div>
                <p className="text-2xl font-bold text-white">{org.projects}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#BFA76A]/10">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${planColors[org.plan]}`}>
                {org.plan}
              </span>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${statusColors[org.status]}`}>
                {org.status}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-4">Créée le {org.created}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizationsPage;