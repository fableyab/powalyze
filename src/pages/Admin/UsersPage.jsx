import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUserPlus, FiEdit2, FiTrash2, FiMail, FiShield } from 'react-icons/fi';

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Marie Dubois', email: 'marie.dubois@techcorp.ch', role: 'Admin', org: 'TechCorp SA', status: 'Actif', lastLogin: '2023-12-23' },
    { id: 2, name: 'Jean Martin', email: 'jean.martin@innovation.ch', role: 'User', org: 'Innovation Labs', status: 'Actif', lastLogin: '2023-12-22' },
    { id: 3, name: 'Sophie Laurent', email: 'sophie.laurent@global.ch', role: 'Manager', org: 'Global Ventures', status: 'Actif', lastLogin: '2023-12-23' },
    { id: 4, name: 'Pierre Durand', email: 'pierre.durand@startup.ch', role: 'User', org: 'Startup Hub', status: 'Inactif', lastLogin: '2023-12-15' },
    { id: 5, name: 'Émilie Bernard', email: 'emilie.bernard@consulting.ch', role: 'Admin', org: 'Consulting Pro', status: 'Actif', lastLogin: '2023-12-23' },
    { id: 6, name: 'Lucas Petit', email: 'lucas.petit@digital.ch', role: 'User', org: 'Digital Solutions', status: 'Actif', lastLogin: '2023-12-21' },
  ];

  const roleColors = {
    Admin: 'bg-red-500/20 text-red-400 border-red-500/30',
    Manager: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    User: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
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
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-400 mt-2">{users.length} utilisateurs au total</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#BFA76A] to-[#D4AF37] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#BFA76A]/20 transition-all">
          <FiUserPlus className="w-5 h-5" />
          Ajouter Utilisateur
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou organisation..."
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

      {/* Users Table */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#BFA76A]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A] border-b border-[#BFA76A]/20">
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Utilisateur</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Organisation</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Dernière Connexion</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[#BFA76A]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#BFA76A]/10 hover:bg-[#0A0A0A]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BFA76A] to-[#D4AF37] flex items-center justify-center font-bold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiMail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.org}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${roleColors[user.role]}`}>
                      <FiShield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{user.lastLogin}</td>
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

export default UsersPage;