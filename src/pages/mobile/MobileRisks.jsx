import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseData } from '@/lib/useSupabaseData';
import MobileCard from '@/components/mobile/MobileCard';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

/**
 * Page Risques mobile
 */
const MobileRisks = () => {
  const { profile } = useAuth();

  // Pour l'instant, afficher les projets avec risque élevé
  // À adapter selon votre schéma de table 'risks' si elle existe
  const { data: projects, loading } = useSupabaseData(
    'projects',
    profile?.tenant_id
      ? [
          { column: 'tenant_id', value: profile.tenant_id },
          { column: 'risk', value: 'High', operator: 'in' }
        ]
      : [],
    'id, name, risk, status'
  );

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'Critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'High':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'Medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  const getRiskColor = (risk) => {
    const colors = {
      Critical: 'bg-red-500',
      High: 'bg-orange-500',
      Medium: 'bg-yellow-500',
      Low: 'bg-green-500'
    };
    return colors[risk] || 'bg-slate-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-500">Chargement...</div>
      </div>
    );
  }

  // Mock data si pas de projets à risque
  const mockRisks = [
    {
      id: '1',
      title: 'Dépendance fournisseur critique',
      level: 'Critical',
      project_name: 'Migration Cloud',
      description: 'Un seul fournisseur pour composant critique'
    },
    {
      id: '2',
      title: 'Retard planning',
      level: 'High',
      project_name: 'Refonte CRM',
      description: 'Retard de 2 semaines sur jalons critiques'
    },
    {
      id: '3',
      title: 'Compétences manquantes',
      level: 'Medium',
      project_name: 'Data Lake',
      description: 'Manque expertise data engineering'
    }
  ];

  const risksToDisplay = projects?.length > 0
    ? projects.map(p => ({
        id: p.id,
        title: `Risque projet: ${p.name}`,
        level: p.risk,
        project_name: p.name,
        description: `Statut: ${p.status}`
      }))
    : mockRisks;

  // Statistiques
  const criticalCount = risksToDisplay.filter(r => r.level === 'Critical').length;
  const highCount = risksToDisplay.filter(r => r.level === 'High').length;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Risques</h2>
        <p className="text-sm text-slate-500 mt-1">
          {criticalCount} critique{criticalCount > 1 ? 's' : ''} • {highCount} élevé
          {highCount > 1 ? 's' : ''}
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-red-50 rounded-xl p-3 border border-red-100">
          <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          <div className="text-xs text-red-700 font-medium mt-1">Critique</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">{highCount}</div>
          <div className="text-xs text-orange-700 font-medium mt-1">Élevé</div>
        </div>
        <div className="bg-green-50 rounded-xl p-3 border border-green-100">
          <div className="text-2xl font-bold text-green-600">
            {risksToDisplay.length - criticalCount - highCount}
          </div>
          <div className="text-xs text-green-700 font-medium mt-1">Autres</div>
        </div>
      </div>

      {/* Liste des risques */}
      <div className="space-y-3">
        {risksToDisplay.map((risk) => (
          <MobileCard key={risk.id}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getRiskColor(risk.level)}/10`}>
                {getRiskIcon(risk.level)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {risk.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      risk.level === 'Critical'
                        ? 'bg-red-100 text-red-700'
                        : risk.level === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : risk.level === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {risk.level}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{risk.project_name}</p>
                <p className="text-sm text-slate-700">{risk.description}</p>
              </div>
            </div>
          </MobileCard>
        ))}
      </div>

      {/* Empty state */}
      {risksToDisplay.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center px-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Aucun risque détecté
          </h3>
          <p className="text-slate-500 text-sm">
            Tous les projets sont sous contrôle
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileRisks;
