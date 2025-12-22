/**
 * PROJECTS PAGE
 * Vue complète des projets avec Kanban, Table et filtres
 */

import React, { useState } from 'react';
import { Plus, LayoutGrid, List, Filter, Search } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { Tabs } from '@/shared/components/ui/Tabs';
import { Badge } from '@/shared/components/ui/Badge';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { useWorkspace } from '../context/WorkspaceContext';
import ProjectBoard from '@/features/projects/components/ProjectBoard';
import ProjectTable from '@/features/projects/components/ProjectTable';
import ProjectModal from '@/features/projects/components/ProjectModal';
import { PROJECT_STATUS } from '@/lib/constants';

export default function ProjectsPage() {
  const { state, addProject, loadDemoData, isDemoLoaded } = useWorkspace();
  const { projects } = state;

  const [viewMode, setViewMode] = useState('board'); // 'board' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  // Filtrage
  const filteredProjects = projects.filter(project => {
    const matchSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchPriority = filterPriority === 'all' || project.priority === filterPriority;

    return matchSearch && matchStatus && matchPriority;
  });

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
  };

  const handleCreateProject = (projectData) => {
    addProject({
      ...projectData,
      id: Date.now(),
      progress: 0,
      budget: parseFloat(projectData.budget) || 0,
      spent: 0,
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projets</h1>
          <p className="text-gray-400">{stats.total} projets • {stats.active} actifs</p>
        </div>

        <div className="flex gap-2">
          {!isDemoLoaded && projects.length === 0 && (
            <Button variant="outline" onClick={loadDemoData} className="gap-2">
              Charger données démo
            </Button>
          )}
          <Button variant="primary" onClick={() => setModalOpen(true)} className="gap-2">
            <Plus size={18} />
            Nouveau projet
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(PROJECT_STATUS).map(([key, config]) => {
          const count = projects.filter(p => p.status === config.id).length;
          return (
            <div
              key={key}
              className={`p-4 rounded-lg bg-${config.color}-500/10 border border-${config.color}-500/30`}
            >
              <p className={`text-2xl font-bold text-${config.color}-400 mb-1`}>{count}</p>
              <p className="text-sm text-gray-400">{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <Input
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Statut"
            options={[
              { value: 'all', label: 'Tous les statuts' },
              ...Object.entries(PROJECT_STATUS).map(([key, config]) => ({
                value: config.id,
                label: config.label,
              })),
            ]}
            className="min-w-[180px]"
          />

          <Select
            value={filterPriority}
            onChange={setFilterPriority}
            placeholder="Priorité"
            options={[
              { value: 'all', label: 'Toutes priorités' },
              { value: 'critical', label: 'Critique' },
              { value: 'high', label: 'Haute' },
              { value: 'medium', label: 'Moyenne' },
              { value: 'low', label: 'Basse' },
            ]}
            className="min-w-[180px]"
          />

          <div className="flex gap-1 border border-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === 'board' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('board')}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="Aucun projet"
          description={searchQuery || filterStatus !== 'all' || filterPriority !== 'all' 
            ? "Aucun projet ne correspond aux filtres" 
            : "Commencez par créer votre premier projet"}
          action={
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              <Plus size={18} />
              Créer un projet
            </Button>
          }
        />
      ) : viewMode === 'board' ? (
        <ProjectBoard projects={filteredProjects} />
      ) : (
        <ProjectTable projects={filteredProjects} />
      )}

      {/* Create/Edit Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
