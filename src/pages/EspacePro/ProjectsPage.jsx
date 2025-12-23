import React, { useState } from 'react';
import { FiGrid, FiList, FiPlus, FiSearch } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import KanbanProjectsBoard from '../ClientPortal/KanbanProjectsBoard';

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total', value: '12', color: 'text-[#BFA76A]' },
    { label: 'Actifs', value: '8', color: 'text-green-400' },
    { label: 'En Pause', value: '2', color: 'text-yellow-400' },
    { label: 'Terminés', value: '2', color: 'text-blue-400' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projets</h1>
          <p className="text-gray-400">Gérez tous vos projets en un seul endroit</p>
        </div>
        <button className="flex items-center gap-2 bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black px-6 py-3 rounded-lg font-medium transition-all">
          <FiPlus size={20} />
          Nouveau Projet
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-[#111] border-white/10 p-6">
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <Card className="bg-[#111] border-white/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'kanban'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-[#BFA76A]/20 text-[#BFA76A] border border-[#BFA76A]/50'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <FiList size={20} />
            </button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {viewMode === 'kanban' ? (
        <KanbanProjectsBoard />
      ) : (
        <Card className="bg-[#111] border-white/10 p-6">
          <p className="text-gray-400 text-center py-12">Vue liste en construction...</p>
        </Card>
      )}
    </div>
  );
};

export default ProjectsPage;