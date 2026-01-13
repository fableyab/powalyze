/**
 * PAGE PROJECT ROADMAP
 * Timeline et gestion des dépendances
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Map, GitBranch, AlertTriangle, CheckCircle2 } from 'lucide-react';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getWorkspaceTimeline, detectDependencies, checkDependencyConflicts, getCriticalPath } from '@/lib/roadmapService';

export default function ProjectRoadmap() {
  const { workspaceId, initiativeId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [criticalPath, setCriticalPath] = useState([]);

  useEffect(() => {
    loadRoadmapData();
  }, [workspaceId, initiativeId]);

  const loadRoadmapData = async () => {
    try {
      setLoading(true);
      const timeline = await getWorkspaceTimeline(workspaceId);
      setTimelineData(timeline?.items || []);

      // Détection automatique des dépendances
      const detected = await detectDependencies(workspaceId);
      setDependencies(detected || []);

      // Si initiative spécifique, vérifier conflits et chemin critique
      if (initiativeId) {
        const [conflictsData, pathData] = await Promise.all([
          checkDependencyConflicts(initiativeId),
          getCriticalPath(initiativeId)
        ]);
        setConflicts(conflictsData?.conflicts || []);
        setCriticalPath(pathData?.path || []);
      }
    } catch (error) {
      console.error('Erreur chargement roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement de la roadmap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Roadmap <span className="text-[#D4AF37]">Projet</span>
          </h1>
          <p className="text-gray-400 font-light">
            Timeline et dépendances des initiatives
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Map className="h-5 w-5 text-[#D4AF37]" />
              <span className="text-sm text-gray-400">Éléments roadmap</span>
            </div>
            <p className="text-3xl font-light">{timelineData.length}</p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <GitBranch className="h-5 w-5 text-[#4A9EFF]" />
              <span className="text-sm text-gray-400">Dépendances détectées</span>
            </div>
            <p className="text-3xl font-light">{dependencies.length}</p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-sm text-gray-400">Conflits</span>
            </div>
            <p className="text-3xl font-light text-red-400">{conflicts.length}</p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-gray-400">Chemin critique</span>
            </div>
            <p className="text-3xl font-light">{criticalPath.length} items</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-light mb-4">Timeline du portefeuille</h2>
          <RoadmapTimeline items={timelineData} showDependencies={true} />
        </div>

        {/* Dépendances suggérées */}
        {dependencies.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-[#D4AF37]" />
              Dépendances suggérées (IA)
            </h2>
            <div className="space-y-3">
              {dependencies.map((dep, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs
                          ${dep.confidence === 'high' ? 'bg-emerald-600/20 text-emerald-400' : ''}
                          ${dep.confidence === 'medium' ? 'bg-amber-600/20 text-amber-400' : ''}
                        `}>
                          Confiance: {dep.confidence}
                        </span>
                      </div>
                      <p className="text-white font-light mb-2">
                        <span className="text-[#D4AF37]">{dep.source_name}</span>
                        {' → '}
                        <span className="text-[#4A9EFF]">{dep.target_name}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Gap détecté: {dep.gap_days} jours
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity text-sm">
                      Appliquer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conflits */}
        {conflicts.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              Conflits de dépendances
            </h2>
            <div className="space-y-3">
              {conflicts.map((conflict, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A1A2F] border border-red-600/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h3 className="text-white font-light">{conflict.type}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{conflict.description}</p>
                  {conflict.items && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {conflict.items.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-600/20 text-red-400 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chemin critique */}
        {criticalPath.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              Chemin critique
            </h2>
            <div className="bg-[#0A1A2F] border border-emerald-600/30 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-4">
                Séquence d'éléments dont tout retard impacte la date de fin du projet
              </p>
              <div className="flex flex-wrap gap-2">
                {criticalPath.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg text-sm">
                      {item.title}
                    </span>
                    {idx < criticalPath.length - 1 && (
                      <span className="text-gray-600">→</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Durée totale: {criticalPath.reduce((sum, item) => sum + (item.duration || 0), 0)} jours
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {timelineData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Map className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucun élément de roadmap</p>
          </div>
        )}
      </div>
    </div>
  );
}
