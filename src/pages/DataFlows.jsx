/**
 * PAGE DATA FLOWS
 * Gestion des jobs d'automatisation et flux de données
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Zap, Play, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getDataJobs, triggerJob } from '@/lib/dataService';

export default function DataFlows() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, [workspaceId]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getDataJobs(workspaceId);
      setJobs(data || []);
    } catch (error) {
      console.error('Erreur chargement jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerJob = async (jobId) => {
    try {
      await triggerJob(jobId);
      await loadJobs();
    } catch (error) {
      console.error('Erreur déclenchement job:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-600/20 text-emerald-400';
      case 'running':
        return 'bg-[#4A9EFF]/20 text-[#4A9EFF]';
      case 'failed':
        return 'bg-red-600/20 text-red-400';
      case 'pending':
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return CheckCircle2;
      case 'running':
        return Clock;
      case 'failed':
        return XCircle;
      case 'pending':
      default:
        return Clock;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white font-light">Chargement des flux...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Flux <span className="text-[#D4AF37]">Automatisés</span>
          </h1>
          <p className="text-gray-400 font-light">
            Jobs de synchronisation et transformation
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-[#D4AF37]" />
              <span className="text-sm text-gray-400">Total jobs</span>
            </div>
            <p className="text-3xl font-light">{jobs.length}</p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-gray-400">Réussis</span>
            </div>
            <p className="text-3xl font-light text-emerald-400">
              {jobs.filter(j => j.status === 'success').length}
            </p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-[#4A9EFF]" />
              <span className="text-sm text-gray-400">En cours</span>
            </div>
            <p className="text-3xl font-light text-[#4A9EFF]">
              {jobs.filter(j => j.status === 'running').length}
            </p>
          </div>
          <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm text-gray-400">Échecs</span>
            </div>
            <p className="text-3xl font-light text-red-400">
              {jobs.filter(j => j.status === 'failed').length}
            </p>
          </div>
        </div>

        {/* Liste jobs */}
        <div className="space-y-4">
          {jobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);

            return (
              <div
                key={job.id}
                className="bg-[#0A1A2F] border border-gray-800 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-light">{job.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(job.status)}`}>
                        <StatusIcon className="inline h-3 w-3 mr-1" />
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-500 mb-1">Type</p>
                        <p className="text-white font-light capitalize">{job.job_type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Dernière exécution</p>
                        <p className="text-white font-light">
                          {job.last_run
                            ? new Date(job.last_run).toLocaleString('fr-FR')
                            : 'Jamais'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Prochaine exécution</p>
                        <p className="text-white font-light">
                          {job.next_run
                            ? new Date(job.next_run).toLocaleString('fr-FR')
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Fréquence</p>
                        <p className="text-white font-light capitalize">
                          {job.config?.frequency || 'Manuel'}
                        </p>
                      </div>
                    </div>

                    {job.error_message && (
                      <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-lg text-sm text-red-400 mb-3">
                        Erreur: {job.error_message}
                      </div>
                    )}

                    <button
                      onClick={() => handleTriggerJob(job.id)}
                      disabled={job.status === 'running'}
                      className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {job.status === 'running' ? 'En cours...' : 'Déclencher'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0A1A2F] border border-gray-800 rounded-xl">
            <Zap className="h-12 w-12 text-gray-600 mb-4" />
            <p className="text-gray-500 font-light">Aucun job configuré</p>
          </div>
        )}
      </div>
    </div>
  );
}
