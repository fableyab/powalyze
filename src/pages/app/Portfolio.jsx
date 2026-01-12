import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import CockpitLayout from "../../components/layout/CockpitLayout";
import customSupabaseClient from '@/lib/customSupabaseClient';
import { initiativeService } from '@/lib/initiativeService';
import { Link } from 'react-router-dom';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0, atRisk: 0 });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadPortfolio();
    }
  }, [user, filter]);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      // Récupérer l'organisation de l'utilisateur
      const { data: userOrgs, error: orgError } = await customSupabaseClient
        .from('user_organizations')
        .select('organization_id')
        .eq('user_id', user.id);

      if (orgError) throw orgError;

      if (!userOrgs || userOrgs.length === 0) {
        setInitiatives([]);
        setLoading(false);
        return;
      }

      const organizationId = userOrgs[0].organization_id;

      // Récupérer les initiatives
      let data = await initiativeService.getInitiatives(organizationId);

      // Filtrer par statut
      if (filter !== 'all') {
        data = data.filter(i => i.status === filter);
      }

      setInitiatives(data);

      // Calculer les statistiques
      const total = data.length;
      const inProgress = data.filter(i => i.status === 'in_progress').length;
      const completed = data.filter(i => i.status === 'completed').length;
      const atRisk = data.filter(i => i.status === 'at_risk').length;

      setStats({ total, inProgress, completed, atRisk });
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'planned': 'text-blue-400 bg-blue-500/10',
      'in_progress': 'text-green-400 bg-green-500/10',
      'completed': 'text-emerald-400 bg-emerald-500/10',
      'at_risk': 'text-red-400 bg-red-500/10',
      'on_hold': 'text-yellow-400 bg-yellow-500/10',
      'cancelled': 'text-gray-400 bg-gray-500/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-500/10';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'planned': 'Planifié',
      'in_progress': 'En cours',
      'completed': 'Terminé',
      'at_risk': 'À risque',
      'on_hold': 'En attente',
      'cancelled': 'Annulé'
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <CockpitLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Chargement du portfolio...</div>
        </div>
      </CockpitLayout>
    );
  }

  return (
    <CockpitLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-2">Portfolio</h1>
          <p className="text-[0.9rem] text-slate-300">
            Vue consolidée de vos initiatives et de leurs impacts.
          </p>
        </div>
        <Link
          to="/app/projects/new"
          className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded hover:opacity-90 transition-opacity"
        >
          + Nouvelle initiative
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/30 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Total</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-black/30 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">En cours</div>
          <div className="text-3xl font-bold text-green-400">{stats.inProgress}</div>
        </div>
        <div className="bg-black/30 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Terminés</div>
          <div className="text-3xl font-bold text-emerald-400">{stats.completed}</div>
        </div>
        <div className="bg-black/30 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">À risque</div>
          <div className="text-3xl font-bold text-red-400">{stats.atRisk}</div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'planned', 'in_progress', 'at_risk', 'on_hold', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              filter === status
                ? 'bg-[#D4AF37] text-black font-medium'
                : 'bg-black/30 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {status === 'all' ? 'Tous' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Liste des initiatives */}
      {initiatives.length === 0 ? (
        <div className="border border-slate-800 bg-black/30 rounded-lg p-8 text-center">
          <div className="text-slate-400 mb-4">
            {filter === 'all' 
              ? 'Aucune initiative dans votre portfolio.'
              : `Aucune initiative avec le statut "${getStatusLabel(filter)}".`}
          </div>
          <Link
            to="/app/projects/new"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded hover:opacity-90 transition-opacity"
          >
            Créer votre première initiative
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="bg-black/30 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white">{initiative.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                  {getStatusLabel(initiative.status)}
                </span>
              </div>

              {initiative.description && (
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {initiative.description}
                </p>
              )}

              <div className="space-y-2">
                {initiative.progress !== null && (
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progression</span>
                      <span>{initiative.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF]"
                        style={{ width: `${initiative.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 text-xs text-slate-400">
                  {initiative.start_date && (
                    <div>
                      <span className="text-slate-500">Début:</span> {new Date(initiative.start_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  {initiative.end_date && (
                    <div>
                      <span className="text-slate-500">Fin:</span> {new Date(initiative.end_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>

                {initiative.budget && (
                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Budget:</span> {initiative.budget.toLocaleString('fr-FR')} €
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800">
                <Link
                  to={`/app/projects/${initiative.id}`}
                  className="text-[#D4AF37] text-sm hover:text-[#4A9EFF] transition-colors"
                >
                  Voir les détails →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </CockpitLayout>
  );
}
