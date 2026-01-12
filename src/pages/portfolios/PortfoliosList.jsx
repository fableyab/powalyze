import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getPortfolios } from '@/lib/portfolioServiceV2';
import { Search, Plus, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function PortfoliosList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const organizationId = user?.user_metadata?.organization_id;

  useEffect(() => {
    if (!organizationId) return;
    loadPortfolios();
  }, [organizationId]);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getPortfolios(organizationId);
      setPortfolios(data);
    } catch (error) {
      console.error('Error loading portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolios = portfolios.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate aggregate stats
  const totalProjects = portfolios.reduce((sum, p) => sum + (p.projects_count || 0), 0);
  const activePortfolios = portfolios.filter(p => p.status === 'ACTIVE').length;
  const totalBudget = portfolios.reduce((sum, p) => sum + (p.budget_total || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-spin mx-auto mb-4 text-[#D4AF37]" />
          <p>Chargement des portefeuilles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extralight mb-2">Portefeuilles</h1>
            <p className="text-slate-400 font-light">
              Gérez vos portefeuilles stratégiques et suivez leurs projets
            </p>
          </div>
          <button
            onClick={() => navigate('/portfolios/new')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90 transition"
          >
            <Plus className="w-5 h-5" />
            Créer un portefeuille
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Total Portefeuilles</span>
              <Activity className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-extralight">{portfolios.length}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Actifs</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-extralight">{activePortfolios}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Total Projets</span>
              <TrendingUp className="w-5 h-5 text-[#4A9EFF]" />
            </div>
            <p className="text-3xl font-extralight">{totalProjects}</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Budget Total</span>
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-extralight">{totalBudget.toLocaleString()}€</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, code ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Portfolios Table */}
        {filteredPortfolios.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
            <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-light mb-2">Aucun portefeuille trouvé</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm
                ? 'Essayez une recherche différente'
                : 'Commencez par créer votre premier portefeuille'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate('/portfolios/new')}
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90 transition"
              >
                Créer un portefeuille
              </button>
            )}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Code</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Nom</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Responsable</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Statut</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Projets</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Budget</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Santé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredPortfolios.map((portfolio) => (
                  <tr
                    key={portfolio.id}
                    onClick={() => navigate(`/portfolios/${portfolio.id}`)}
                    className="hover:bg-slate-800 cursor-pointer transition"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-[#D4AF37]">
                        {portfolio.code || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{portfolio.name}</p>
                        {portfolio.description && (
                          <p className="text-sm text-slate-400 truncate max-w-xs">
                            {portfolio.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">
                        {portfolio.manager_name || 'Non assigné'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(portfolio.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">{portfolio.projects_count || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">
                        {(portfolio.budget_total || 0).toLocaleString()}€
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getHealthBadge(portfolio.health_status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function getStatusBadge(status) {
  const styles = {
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    PLANNED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    ON_HOLD: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    CLOSED: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  };

  const labels = {
    ACTIVE: 'Actif',
    PLANNED: 'Planifié',
    ON_HOLD: 'En attente',
    CLOSED: 'Clôturé'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.PLANNED}`}>
      {labels[status] || status}
    </span>
  );
}

function getHealthBadge(health) {
  const styles = {
    ON_TRACK: 'bg-green-500/20 text-green-400 border-green-500/30',
    AT_RISK: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    OFF_TRACK: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const labels = {
    ON_TRACK: 'Sur les rails',
    AT_RISK: 'À risque',
    OFF_TRACK: 'Hors piste'
  };

  const icons = {
    ON_TRACK: <CheckCircle className="w-3 h-3" />,
    AT_RISK: <AlertTriangle className="w-3 h-3" />,
    OFF_TRACK: <AlertTriangle className="w-3 h-3" />
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[health] || styles.ON_TRACK}`}>
      {icons[health]}
      {labels[health] || health}
    </span>
  );
}
