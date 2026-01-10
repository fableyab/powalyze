import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseData } from '@/lib/useSupabaseData';
import MobileCard from '@/components/mobile/MobileCard';
import MobileProgress from '@/components/mobile/MobileProgress';
import { ChevronRight, Clock, CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';

/**
 * Page Portefeuille mobile - Liste des projets
 */
const MobilePortfolio = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const { data: projects, loading } = useSupabaseData(
    'projects',
    profile?.tenant_id ? [{ column: 'tenant_id', value: profile.tenant_id }] : [],
    'id, name, status, risk, budget_planned, budget_actual, start_date, end_date'
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'on_hold':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      planned: 'Planifié',
      in_progress: 'En cours',
      on_hold: 'En pause',
      done: 'Terminé',
      cancelled: 'Annulé'
    };
    return labels[status] || status;
  };

  const getRiskColor = (risk) => {
    const colors = {
      Low: 'bg-green-100 text-green-700',
      Medium: 'bg-yellow-100 text-yellow-700',
      High: 'bg-orange-100 text-orange-700',
      Critical: 'bg-red-100 text-red-700'
    };
    return colors[risk] || 'bg-slate-100 text-slate-700';
  };

  const calculateProgress = (project) => {
    if (!project.budget_planned || project.budget_planned === 0) return 0;
    return Math.min(100, (project.budget_actual / project.budget_planned) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Chargement...</div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Aucun projet
        </h3>
        <p className="text-slate-500 text-sm">
          Les projets de votre portefeuille apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Portefeuille</h2>
        <p className="text-sm text-slate-500 mt-1">
          {projects.length} projet{projects.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des projets */}
      {projects.map((project) => (
        <MobileCard
          key={project.id}
          onClick={() => navigate(`/mobile/project/${project.id}`)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getStatusIcon(project.status)}
                <h3 className="font-semibold text-slate-900 text-base">
                  {project.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">{getStatusLabel(project.status)}</span>
                <span className="text-slate-300">•</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${getRiskColor(project.risk)}`}>
                  {project.risk}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </div>

          {/* Progress bar */}
          {project.budget_planned > 0 && (
            <div className="mt-3">
              <MobileProgress
                label="Budget"
                value={calculateProgress(project)}
                color={calculateProgress(project) > 90 ? 'red' : 'blue'}
              />
            </div>
          )}

          {/* Dates */}
          {(project.start_date || project.end_date) && (
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
              {project.start_date && (
                <span>Début: {new Date(project.start_date).toLocaleDateString('fr-FR')}</span>
              )}
              {project.end_date && (
                <span>Fin: {new Date(project.end_date).toLocaleDateString('fr-FR')}</span>
              )}
            </div>
          )}
        </MobileCard>
      ))}
    </div>
  );
};

export default MobilePortfolio;
