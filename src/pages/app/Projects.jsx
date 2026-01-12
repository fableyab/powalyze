import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import initiativeService from '@/lib/initiativeService';
import CockpitLayout from '@/components/layout/CockpitLayout';
import EmptyState from '@/components/EmptyState';
import logger from '@/lib/logger';
import { Plus, TrendingUp, AlertCircle, CheckCircle2, FolderOpen } from 'lucide-react';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    planned: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  async function loadProjects() {
    try {
      // Charger TOUS les projets (pas besoin d'organisation)
      const data = await initiativeService.getInitiatives();
      setProjects(data || []);

      // Calculer les stats
      setStats({
        total: data?.length || 0,
        planned: data?.filter(p => p.status === 'planned').length || 0,
        inProgress: data?.filter(p => p.status === 'in_progress').length || 0,
        completed: data?.filter(p => p.status === 'completed').length || 0,
      });
    } catch (error) {
      logger.error('ProjectsPage.loadProjects', error, { userId: user?.id });
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/10';
      case 'in_progress': return 'text-blue-400 bg-blue-500/10';
      case 'on_hold': return 'text-orange-400 bg-orange-500/10';
      case 'planned': return 'text-purple-400 bg-purple-500/10';
      default: return 'text-white/60 bg-white/5';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'on_hold': return 'En pause';
      case 'planned': return 'Planifié';
      default: return status;
    }
  };

  return (
    <CockpitLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Projets</h1>
            <p className="text-sm text-white/60">
              Vue d'ensemble des projets du portefeuille.
            </p>
          </div>
          <Link
            to="/app/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#f2c34d] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouveau projet
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <div className="text-2xl font-semibold text-white">{stats.total}</div>
            <div className="text-xs text-white/60">Total projets</div>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <div className="text-2xl font-semibold text-purple-400">{stats.planned}</div>
            <div className="text-xs text-white/60">Planifiés</div>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="text-2xl font-semibold text-blue-400">{stats.inProgress}</div>
            <div className="text-xs text-white/60">En cours</div>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="text-2xl font-semibold text-green-400">{stats.completed}</div>
            <div className="text-xs text-white/60">Terminés</div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-white/60">
            Chargement des projets...
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <EmptyState
            icon={FolderOpen}
            title="Aucun projet"
            description="Créez votre premier projet pour commencer à gérer votre portfolio stratégique."
            actionLabel="Créer un projet"
            actionRoute="/app/projects/new"
          />
        )}

        {/* Projects list */}
        {!loading && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-4 hover:bg-black/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-medium text-white truncate">
                        {project.name}
                      </h3>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(project.status)}`}>
                        {project.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {project.status === 'in_progress' && <TrendingUp className="w-3 h-3" />}
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    
                    {project.description && (
                      <p className="text-sm text-white/60 mb-2 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>Créé le {new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                      {project.progress > 0 && (
                        <span>Progression : {project.progress}%</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  {project.progress > 0 && (
                    <div className="w-24 shrink-0">
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-white/60 text-center mt-1">
                        {project.progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CockpitLayout>
  );
}

