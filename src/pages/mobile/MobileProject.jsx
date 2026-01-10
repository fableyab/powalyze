import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseSingle } from '@/lib/useSupabaseData';
import MobileCard from '@/components/mobile/MobileCard';
import MobileProgress from '@/components/mobile/MobileProgress';
import { ArrowLeft, Calendar, DollarSign, AlertTriangle, Users } from 'lucide-react';

/**
 * Page détail d'un projet (mobile)
 */
const MobileProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const { data: project, loading } = useSupabaseSingle('projects', id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Chargement...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Projet introuvable
        </h3>
        <button
          onClick={() => navigate('/mobile/portfolio')}
          className="mt-4 text-[#4A9EFF] font-medium"
        >
          Retour au portefeuille
        </button>
      </div>
    );
  }

  const budgetProgress = project.budget_planned > 0
    ? (project.budget_actual / project.budget_planned) * 100
    : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Header avec retour */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate('/mobile/portfolio')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900">{project.name}</h1>
          <p className="text-sm text-slate-500">{project.code}</p>
        </div>
      </div>

      {/* Synthèse */}
      <MobileCard>
        <h2 className="font-semibold text-slate-900 mb-3">Synthèse</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 mb-1">Statut</p>
            <p className="text-sm font-medium text-slate-900">{project.status}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Risque</p>
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                project.risk === 'Critical'
                  ? 'bg-red-100 text-red-700'
                  : project.risk === 'High'
                  ? 'bg-orange-100 text-orange-700'
                  : project.risk === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {project.risk}
            </span>
          </div>
          {project.priority && (
            <div>
              <p className="text-xs text-slate-500 mb-1">Priorité</p>
              <p className="text-sm font-medium text-slate-900">{project.priority}</p>
            </div>
          )}
        </div>
      </MobileCard>

      {/* Budget */}
      <MobileCard>
        <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#4A9EFF]" />
          Budget
        </h2>
        <MobileProgress
          label="Utilisation"
          value={budgetProgress}
          color={budgetProgress > 90 ? 'red' : 'blue'}
        />
        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
          <div>
            <p className="text-slate-500 text-xs">Planifié</p>
            <p className="font-semibold text-slate-900">
              {project.budget_planned?.toLocaleString('fr-FR')} CHF
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Utilisé</p>
            <p className="font-semibold text-slate-900">
              {project.budget_actual?.toLocaleString('fr-FR')} CHF
            </p>
          </div>
        </div>
      </MobileCard>

      {/* Calendrier */}
      {(project.start_date || project.end_date) && (
        <MobileCard>
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4A9EFF]" />
            Calendrier
          </h2>
          <div className="space-y-2 text-sm">
            {project.start_date && (
              <div className="flex justify-between">
                <span className="text-slate-500">Début</span>
                <span className="font-medium text-slate-900">
                  {new Date(project.start_date).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
            {project.end_date && (
              <div className="flex justify-between">
                <span className="text-slate-500">Fin</span>
                <span className="font-medium text-slate-900">
                  {new Date(project.end_date).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
          </div>
        </MobileCard>
      )}

      {/* Équipe */}
      {(project.sponsor || project.owner_id) && (
        <MobileCard>
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4A9EFF]" />
            Équipe
          </h2>
          <div className="space-y-2 text-sm">
            {project.sponsor && (
              <div className="flex justify-between">
                <span className="text-slate-500">Sponsor</span>
                <span className="font-medium text-slate-900">{project.sponsor}</span>
              </div>
            )}
            {project.owner_id && (
              <div className="flex justify-between">
                <span className="text-slate-500">Responsable</span>
                <span className="font-medium text-slate-900">ID: {project.owner_id}</span>
              </div>
            )}
          </div>
        </MobileCard>
      )}

      {/* Description */}
      {project.description && (
        <MobileCard>
          <h2 className="font-semibold text-slate-900 mb-2">Description</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </MobileCard>
      )}
    </div>
  );
};

export default MobileProject;
