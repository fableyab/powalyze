import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Barre de filtres simple et efficace pour le portfolio
 * Avec badges cliquables
 */
const PortfolioFiltersBar = ({ filters, onFilterChange, onClear }) => {
  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'gray' },
    { value: 'active', label: 'Actifs', color: 'green' },
    { value: 'at-risk', label: 'À risque', color: 'yellow' },
    { value: 'on-hold', label: 'En pause', color: 'gray' },
    { value: 'completed', label: 'Terminés', color: 'blue' }
  ];

  const criticalityOptions = [
    { value: 'all', label: 'Toutes', color: 'gray' },
    { value: 'critical', label: 'Critique', color: 'red' },
    { value: 'high', label: 'Haute', color: 'orange' },
    { value: 'medium', label: 'Moyenne', color: 'yellow' },
    { value: 'low', label: 'Basse', color: 'green' }
  ];

  const programOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'transformation-digitale', label: 'Transformation Digitale' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'excellence-operationnelle', label: 'Excellence Opérationnelle' }
  ];

  const ownerOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'Jean Dupont', label: 'Jean Dupont' },
    { value: 'Marie Martin', label: 'Marie Martin' },
    { value: 'Pierre Dubois', label: 'Pierre Dubois' }
  ];

  const colorClasses = {
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
    green: 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300',
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300',
    red: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300',
    orange: 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300'
  };

  const activeClasses = {
    gray: 'bg-gray-700 text-white border-gray-700',
    green: 'bg-green-600 text-white border-green-600',
    yellow: 'bg-yellow-600 text-white border-yellow-600',
    blue: 'bg-blue-600 text-white border-blue-600',
    red: 'bg-red-600 text-white border-red-600',
    orange: 'bg-orange-600 text-white border-orange-600'
  };

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.criticality !== 'all' || 
    filters.program !== 'all' || 
    filters.owner !== 'all';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      {/* Status */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Statut
        </label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => {
            const isActive = filters.status === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onFilterChange('status', option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  isActive ? activeClasses[option.color] : colorClasses[option.color]
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Criticality */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Criticité
        </label>
        <div className="flex flex-wrap gap-2">
          {criticalityOptions.map((option) => {
            const isActive = filters.criticality === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onFilterChange('criticality', option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  isActive ? activeClasses[option.color] : colorClasses[option.color]
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Program */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Programme
        </label>
        <div className="flex flex-wrap gap-2">
          {programOptions.map((option) => {
            const isActive = filters.program === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onFilterChange('program', option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  isActive ? 'bg-powalyze-blue text-white border-powalyze-blue' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Owner */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Responsable
        </label>
        <div className="flex flex-wrap gap-2">
          {ownerOptions.map((option) => {
            const isActive = filters.owner === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onFilterChange('owner', option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  isActive ? 'bg-powalyze-blue text-white border-powalyze-blue' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-powalyze-blue transition-colors"
          >
            <X className="w-4 h-4" />
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioFiltersBar;
