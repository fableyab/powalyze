import React from 'react';
import { Search, FileText, Filter } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentsContext';

const DocumentFilters = () => {
  const { filters, updateFilters, projects } = useDocuments();

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gold-primary" />
        <h3 className="text-white font-semibold">Filtres</h3>
      </div>

      {/* Search */}
      <div>
        <label className="block text-dark-400 text-sm mb-2">Rechercher</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Nom du document..."
            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary/50"
          />
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-dark-400 text-sm mb-2">Type de fichier</label>
        <select
          value={filters.type}
          onChange={(e) => updateFilters({ type: e.target.value })}
          className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary/50"
        >
          <option value="all">Tous les types</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="word">Word</option>
        </select>
      </div>

      {/* Project Filter */}
      <div>
        <label className="block text-dark-400 text-sm mb-2">Projet</label>
        <select
          value={filters.project}
          onChange={(e) => updateFilters({ project: e.target.value })}
          className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-primary/50"
        >
          <option value="all">Tous les projets</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Count */}
      {(filters.type !== 'all' || filters.project !== 'all' || filters.search) && (
        <div className="pt-4 border-t border-dark-700">
          <button
            onClick={() => updateFilters({ type: 'all', project: 'all', search: '' })}
            className="text-gold-primary hover:text-gold-secondary text-sm font-medium transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentFilters;
