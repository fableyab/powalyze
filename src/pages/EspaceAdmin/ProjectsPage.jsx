import React, { useState } from 'react';
import { FiFilter, FiDownload, FiEye } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AdminProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const projects = [
    { id: 1, name: 'Migration Azure', code: 'AZ-001', manager: 'Marie Dubois', budget: '€450K', spent: '€203K', progress: 45, status: 'active', priority: 'Haute' },
    { id: 2, name: 'E-commerce B2B', code: 'EC-002', manager: 'Thomas Martin', budget: '€320K', spent: '€198K', progress: 62, status: 'active', priority: 'Moyenne' },
    { id: 3, name: 'ISO 27001', code: 'SEC-003', manager: 'Sophie Laurent', budget: '€180K', spent: '€50K', progress: 28, status: 'planning', priority: 'Haute' },
    { id: 4, name: 'App Mobile B2C', code: 'MOB-004', manager: 'Lucas Bernard', budget: '€280K', spent: '€280K', progress: 100, status: 'completed', priority: 'Moyenne' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion des Projets</h1>
          <p className="text-gray-400">Supervision et contrôle de tous les projets</p>
        </div>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all">
          <FiDownload size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <Card className="bg-[#111] border-white/10 p-4">
        <div className="flex items-center gap-4">
          <FiFilter className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-red-500/50 focus:outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="planning">Planification</option>
            <option value="active">Actif</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-[#111] border-white/10 p-6 hover:border-red-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.code}</p>
              </div>
              <Badge className={project.priority === 'Haute' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'}>
                {project.priority}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Manager</span>
                <span className="text-white font-medium">{project.manager}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Budget / Dépensé</span>
                <span className="text-white font-medium">{project.spent} / {project.budget}</span>
              </div>
            </div>

            <Progress value={project.progress} className="mb-3" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{project.progress}% complété</span>
              <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm">
                <FiEye size={16} />
                Détails
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProjectsPage;