import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ProjectListTable from '../components/projects/ProjectListTable';
import PortfolioFiltersBar from '../components/common/PortfolioFiltersBar';
import { projects } from '../data/demoData';
import { Plus, Filter } from 'lucide-react';

const Projects = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    criticality: 'all',
    program: 'all',
    owner: 'all'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      criticality: 'all',
      program: 'all',
      owner: 'all'
    });
  };

  const filteredProjects = projects.filter(project => {
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    if (filters.program !== 'all' && project.program !== filters.program) return false;
    if (filters.owner !== 'all' && project.owner !== filters.owner) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio Projets"
        subtitle={`${filteredProjects.length} projets dans le portefeuille`}
        action={
          <div className="flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filtres
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nouveau projet
            </button>
          </div>
        }
      />

      {showFilters && (
        <PortfolioFiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      )}

      <ProjectListTable projects={filteredProjects} />
    </div>
  );
};

export default Projects;
