import React, { useState } from 'react';
import { useWorkspace } from '@/features/workspace/context/WorkspaceContext';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { FiFilter, FiDownload, FiEye } from 'react-icons/fi';

const ProjectsPage = () => {
  const { state } = useWorkspace();
  const [filters, setFilters] = useState({ status: 'all', category: 'all', priority: 'all', search: '' });

  const filteredProjects = state.projects.filter(p => {
    return (
      (filters.status === 'all' || p.status === filters.status) &&
      (filters.category === 'all' || p.category === filters.category) &&
      (filters.priority === 'all' || p.priority === filters.priority) &&
      (filters.search === '' || p.name.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="p-8 bg-neutral-975 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projets - Vue Admin</h1>
          <p className="text-gray-400">Filtrage et supervision avancés</p>
        </div>
        <Button variant="primary" icon={<FiDownload />}>Exporter CSV</Button>
      </div>
      <Card className="bg-neutral-950 border-white/10 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-brand-gold-500" />
          <h3 className="text-lg font-semibold text-white">Filtres Avancés</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input placeholder="Rechercher..." value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} />
          <Select options={[{ value: 'all', label: 'Tous les statuts' }, { value: 'planning', label: 'Planification' }, { value: 'active', label: 'Actif' }, { value: 'on-hold', label: 'En pause' }, { value: 'completed', label: 'Terminé' }, { value: 'cancelled', label: 'Annulé' }]} value={filters.status} onChange={value => setFilters({ ...filters, status: value })} />
          <Select options={[{ value: 'all', label: 'Toutes catégories' }, { value: 'IT', label: 'IT' }, { value: 'Digital', label: 'Digital' }, { value: 'DevOps', label: 'DevOps' }]} value={filters.category} onChange={value => setFilters({ ...filters, category: value })} />
          <Select options={[{ value: 'all', label: 'Toutes priorités' }, { value: 'critical', label: 'Critique' }, { value: 'high', label: 'Haute' }, { value: 'medium', label: 'Moyenne' }, { value: 'low', label: 'Basse' }]} value={filters.priority} onChange={value => setFilters({ ...filters, priority: value })} />
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map(project => (
          <Card key={project.id} className="bg-neutral-950 border-white/10 p-6 hover:border-brand-gold-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <Badge variant="outline">{project.code}</Badge>
                  <Badge variant={project.status === 'active' ? 'success' : project.status === 'completed' ? 'secondary' : 'warning'}>{project.status}</Badge>
                </div>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">Budget: <span className="text-white font-semibold">{project.budget ? `€${project.budget.toLocaleString()}` : 'N/A'}</span></span>
                  <span className="text-gray-400">Dépensé: <span className="text-white font-semibold">{project.spent ? `€${project.spent.toLocaleString()}` : 'N/A'}</span></span>
                  <span className="text-gray-400">Progression: <span className="text-brand-gold-500 font-semibold">{project.progress || 0}%</span></span>
                </div>
              </div>
              <Button variant="outline" size="sm" icon={<FiEye />}>Détails</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
