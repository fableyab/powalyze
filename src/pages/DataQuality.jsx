/**
 * PAGE DATA QUALITY
 * Vue statistiques qualité des données
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart3, TrendingUp, Shield, Database } from 'lucide-react';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getDataQualityStats } from '@/lib/dataService';

export default function DataQuality() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, [workspaceId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getDataQualityStats(workspaceId);
      setStats(data);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement des statistiques...</div>
      </div>
    );
  }

  const byQuality = stats?.by_quality || {};
  const bySensitivity = stats?.by_sensitivity || {};
  const bySource = stats?.by_source || {};

  const totalEntries = Object.values(byQuality).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Qualité <span className="text-[#D4AF37]">Données</span>
          </h1>
          <p className="text-gray-400 font-light">
            Indicateurs et statistiques de qualité
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard
            title="Qualité élevée"
            value={byQuality.high || 0}
            icon={TrendingUp}
            color="green"
            description="Score ≥ 80%"
          />
          <KPICard
            title="Qualité moyenne"
            value={byQuality.medium || 0}
            icon={BarChart3}
            color="gold"
            description="Score 50-79%"
          />
          <KPICard
            title="Qualité faible"
            value={byQuality.low || 0}
            icon={TrendingUp}
            color="red"
            description="Score < 50%"
          />
          <KPICard
            title="Total entrées"
            value={totalEntries}
            icon={Database}
            color="blue"
            description="Catalogue complet"
          />
        </div>

        {/* Distribution par qualité */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-light mb-6">Distribution par qualité</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-light">Élevée (≥80%)</span>
                <span className="text-emerald-400 font-light">{byQuality.high || 0} entrées</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${totalEntries > 0 ? ((byQuality.high || 0) / totalEntries) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-light">Moyenne (50-79%)</span>
                <span className="text-amber-400 font-light">{byQuality.medium || 0} entrées</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-500"
                  style={{ width: `${totalEntries > 0 ? ((byQuality.medium || 0) / totalEntries) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 font-light">Faible (&lt;50%)</span>
                <span className="text-red-400 font-light">{byQuality.low || 0} entrées</span>
              </div>
              <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-500"
                  style={{ width: `${totalEntries > 0 ? ((byQuality.low || 0) / totalEntries) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Par sensibilité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#D4AF37]" />
              Par sensibilité
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Public</span>
                <span className="text-emerald-400 font-light">{bySensitivity.public || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Confidentiel</span>
                <span className="text-amber-400 font-light">{bySensitivity.confidential || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Restreint</span>
                <span className="text-red-400 font-light">{bySensitivity.restricted || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-light mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-[#D4AF37]" />
              Par source
            </h2>
            <div className="space-y-3">
              {Object.entries(bySource).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-gray-400 capitalize">{source}</span>
                  <span className="text-white font-light">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalEntries === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <BarChart3 className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucune donnée de qualité disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}
