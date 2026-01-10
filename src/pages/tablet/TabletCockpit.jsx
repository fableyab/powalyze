import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseData } from '@/lib/useSupabaseData';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

/**
 * Page Cockpit tablette - Vue d'ensemble en grille
 */
const TabletCockpit = () => {
  const { profile } = useAuth();

  const { data: projects, loading } = useSupabaseData(
    'projects',
    profile?.tenant_id ? [{ column: 'tenant_id', value: profile.tenant_id }] : []
  );

  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.status === 'in_progress')?.length || 0;
  const avgBudget = projects?.length > 0
    ? projects.reduce((sum, p) => sum + (p.budget_actual || 0), 0) / projects.length
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Chargement...</div>
      </div>
    );
  }

  const kpis = [
    {
      label: 'Projets actifs',
      value: activeProjects,
      icon: BarChart3,
      color: 'bg-blue-500',
      trend: '+2.5%'
    },
    {
      label: 'Total projets',
      value: totalProjects,
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+12%'
    },
    {
      label: 'Budget moyen',
      value: `${avgBudget.toFixed(0)}k`,
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+5.2%'
    },
    {
      label: 'Ressources actives',
      value: '24',
      icon: Users,
      color: 'bg-orange-500',
      trend: '+3'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Cockpit Exécutif</h1>
        <p className="text-slate-500 mt-2">Vue d'ensemble de votre portefeuille</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}/10`}>
                  <Icon className={`w-6 h-6 ${kpi.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{kpi.trend}</span>
              </div>
              <div className="text-sm text-slate-500 mb-1">{kpi.label}</div>
              <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* Projets par statut */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Distribution par statut
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">En cours</span>
              <span className="font-semibold text-slate-900">{activeProjects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Planifiés</span>
              <span className="font-semibold text-slate-900">
                {projects?.filter(p => p.status === 'planned').length || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Terminés</span>
              <span className="font-semibold text-slate-900">
                {projects?.filter(p => p.status === 'done').length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Risques</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-red-600">Critiques</span>
              <span className="font-semibold text-red-600">
                {projects?.filter(p => p.risk === 'Critical').length || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-600">Élevés</span>
              <span className="font-semibold text-orange-600">
                {projects?.filter(p => p.risk === 'High').length || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-600">Faibles</span>
              <span className="font-semibold text-green-600">
                {projects?.filter(p => p.risk === 'Low').length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletCockpit;
