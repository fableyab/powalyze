import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseData } from '@/lib/useSupabaseData';
import MobileKPI from '@/components/mobile/MobileKPI';
import MobileCard from '@/components/mobile/MobileCard';
import MobileProgress from '@/components/mobile/MobileProgress';
import MobileLoader from '@/components/mobile/MobileLoader';
import { BarChart3, AlertTriangle, Users, DollarSign } from 'lucide-react';

/**
 * Page Cockpit mobile - Vue d'ensemble des KPIs
 */
const MobileCockpit = () => {
  const { profile } = useAuth();

  // Récupérer les projets du tenant
  const { data: projects, loading: loadingProjects } = useSupabaseData(
    'projects',
    profile?.tenant_id ? [{ column: 'tenant_id', value: profile.tenant_id }] : []
  );

  // Statistiques calculées
  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.status === 'in_progress')?.length || 0;
  const avgProgress = projects?.length > 0
    ? projects.reduce((sum, p) => sum + (p.budget_actual || 0), 0) / projects.length
    : 0;

  if (loadingProjects) {
    return <MobileLoader message="Chargement des données..." />;
  }

  return (
    <div className="p-4 space-y-4">
      {/* KPIs principaux */}
      <div className="grid grid-cols-2 gap-3">
        <MobileKPI
          label="Projets actifs"
          value={activeProjects}
          trend={2.5}
          variant="primary"
        />
        <MobileKPI
          label="Total projets"
          value={totalProjects}
          variant="neutral"
        />
      </div>

      <MobileKPI
        label="Budget moyen utilisé"
        value={`${avgProgress.toFixed(1)}%`}
        trend={5.2}
        variant="success"
      />

      {/* Synthèse par statut */}
      <MobileCard>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#4A9EFF]" />
          Distribution des projets
        </h2>
        <div className="space-y-3">
          <MobileProgress
            label="En cours"
            value={(activeProjects / totalProjects) * 100}
            color="blue"
          />
          <MobileProgress
            label="Planifiés"
            value={(projects?.filter(p => p.status === 'planned').length / totalProjects) * 100}
            color="orange"
          />
          <MobileProgress
            label="Terminés"
            value={(projects?.filter(p => p.status === 'done').length / totalProjects) * 100}
            color="green"
          />
        </div>
      </MobileCard>

      {/* Alertes récentes */}
      <MobileCard>
        <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alertes
        </h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Budget critique</p>
              <p className="text-xs text-slate-600">2 projets dépassent 90%</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">Nouveau projet</p>
              <p className="text-xs text-slate-600">1 projet ajouté aujourd'hui</p>
            </div>
          </div>
        </div>
      </MobileCard>
    </div>
  );
};

export default MobileCockpit;
