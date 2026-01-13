/**
 * PAGE DATA CATALOG
 * Catalogue des sources de données
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Database, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getCatalog } from '@/lib/dataService';

export default function DataCatalog() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const [filters, setFilters] = useState({
    source: 'all',
    sensitivity: 'all'
  });

  useEffect(() => {
    loadCatalog();
  }, [workspaceId]);

  const loadCatalog = async () => {
    try {
      setLoading(true);
      const data = await getCatalog(workspaceId);
      setCatalog(data || []);
    } catch (error) {
      console.error('Erreur chargement catalogue:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCatalog = catalog.filter(entry => {
    if (filters.source !== 'all' && entry.source !== filters.source) return false;
    if (filters.sensitivity !== 'all' && entry.sensitivity !== filters.sensitivity) return false;
    return true;
  });

  const getSensitivityColor = (sensitivity) => {
    switch (sensitivity) {
      case 'restricted':
        return 'bg-red-600/20 text-red-400';
      case 'confidential':
        return 'bg-amber-600/20 text-amber-400';
      case 'public':
      default:
        return 'bg-emerald-600/20 text-emerald-400';
    }
  };

  const getQualityColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement du catalogue...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Catalogue <span className="text-[#D4AF37]">Données</span>
          </h1>
          <p className="text-gray-400 font-light">
            Inventaire centralisé des sources de données
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4 flex gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Source</label>
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="px-4 py-2 bg-black border border-gray-800 rounded-lg text-white"
            >
              <option value="all">Toutes</option>
              <option value="supabase">Supabase</option>
              <option value="jira">Jira</option>
              <option value="sap">SAP</option>
              <option value="monday">Monday</option>
              <option value="excel">Excel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Sensibilité</label>
            <select
              value={filters.sensitivity}
              onChange={(e) => setFilters({ ...filters, sensitivity: e.target.value })}
              className="px-4 py-2 bg-black border border-gray-800 rounded-lg text-white"
            >
              <option value="all">Toutes</option>
              <option value="public">Public</option>
              <option value="confidential">Confidentiel</option>
              <option value="restricted">Restreint</option>
            </select>
          </div>
        </div>

        {/* Table catalogue */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/50 border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-light text-gray-400">Source</th>
                <th className="px-6 py-4 text-left text-sm font-light text-gray-400">Table/Dataset</th>
                <th className="px-6 py-4 text-left text-sm font-light text-gray-400">Sensibilité</th>
                <th className="px-6 py-4 text-left text-sm font-light text-gray-400">Qualité</th>
                <th className="px-6 py-4 text-left text-sm font-light text-gray-400">Dernière MAJ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredCatalog.map((entry) => (
                <tr key={entry.id} className="hover:bg-black/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-[#D4AF37]" />
                      <span className="text-white font-light capitalize">{entry.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-light">{entry.table_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getSensitivityColor(entry.sensitivity)}`}>
                      <Shield className="inline h-3 w-3 mr-1" />
                      {entry.sensitivity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-light ${getQualityColor(entry.quality_score || 0)}`}>
                        {entry.quality_score || 0}%
                      </span>
                      {(entry.quality_score || 0) >= 80 ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {entry.last_updated
                      ? new Date(entry.last_updated).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCatalog.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Database className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucune entrée dans le catalogue</p>
          </div>
        )}
      </div>
    </div>
  );
}
