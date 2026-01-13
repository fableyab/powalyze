/**
 * PAGE AI ANOMALIES
 * Détection automatique d'anomalies
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import KPICard from '@/components/KPICard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getAnomalies } from '@/lib/portfolioService';

export default function AIAnomalies() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    loadAnomalies();
  }, [workspaceId]);

  const loadAnomalies = async () => {
    try {
      setLoading(true);
      const data = await getAnomalies(workspaceId);
      setAnomalies(data || []);
    } catch (error) {
      console.error('Erreur chargement anomalies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600/20 text-red-400 border-red-600/30';
      case 'high':
        return 'bg-amber-600/20 text-amber-400 border-amber-600/30';
      case 'medium':
        return 'bg-[#4A9EFF]/20 text-[#4A9EFF] border-[#4A9EFF]/30';
      case 'low':
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
    }
  };

  const getSeverityIcon = (severity) => {
    if (severity === 'critical' || severity === 'high') return AlertTriangle;
    return TrendingDown;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Analyse des anomalies...</div>
      </div>
    );
  }

  const critical = anomalies.filter(a => a.severity === 'critical');
  const high = anomalies.filter(a => a.severity === 'high');
  const medium = anomalies.filter(a => a.severity === 'medium');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Détection <span className="text-[#D4AF37]">Anomalies</span>
          </h1>
          <p className="text-gray-400 font-light">
            Identification automatique par IA
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPICard
            title="Critiques"
            value={critical.length}
            icon={AlertTriangle}
            color="red"
            description="Action immédiate"
          />
          <KPICard
            title="Élevées"
            value={high.length}
            icon={TrendingUp}
            color="gold"
            description="Surveillance active"
          />
          <KPICard
            title="Moyennes"
            value={medium.length}
            icon={TrendingDown}
            color="blue"
            description="À surveiller"
          />
          <KPICard
            title="Total"
            value={anomalies.length}
            icon={AlertTriangle}
            color="gray"
            description="Toutes anomalies"
          />
        </div>

        {/* Liste anomalies */}
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => {
            const SeverityIcon = getSeverityIcon(anomaly.severity);

            return (
              <div
                key={index}
                className={`
                  bg-[#0A1A2F] border rounded-xl p-6
                  ${getSeverityColor(anomaly.severity)}
                `}
              >
                <div className="flex items-start gap-4">
                  <SeverityIcon className="h-6 w-6 flex-shrink-0 mt-1" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-light text-white">{anomaly.anomaly_type}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity}
                      </span>
                    </div>

                    <p className="text-white/90 mb-4">{anomaly.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-white/60 mb-1">Initiative</p>
                        <p className="text-white font-light">{anomaly.initiative_name}</p>
                      </div>
                      <div>
                        <p className="text-white/60 mb-1">Détecté le</p>
                        <p className="text-white font-light flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {anomaly.detected_at
                            ? new Date(anomaly.detected_at).toLocaleDateString('fr-FR')
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {anomaly.metrics && Object.keys(anomaly.metrics).length > 0 && (
                      <div className="p-3 bg-black/30 rounded-lg">
                        <p className="text-xs text-white/60 mb-2">Métriques</p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          {Object.entries(anomaly.metrics).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-white/60">{key}: </span>
                              <span className="text-white font-light">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {anomaly.severity === 'critical' && (
                      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity text-sm">
                        Créer plan d'action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {anomalies.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <AlertTriangle className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucune anomalie détectée</p>
            <p className="text-sm text-gray-600 mt-2">Le portefeuille est en bonne santé</p>
          </div>
        )}
      </div>
    </div>
  );
}
