import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { 
  getPortfolioById, 
  getPortfolioStats, 
  getPortfolioRisks 
} from '@/lib/portfolioServiceV2';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  Target,
  BarChart3
} from 'lucide-react';

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [stats, setStats] = useState(null);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, risks, performance

  const organizationId = user?.user_metadata?.organization_id;

  useEffect(() => {
    if (!id || !organizationId) return;
    loadPortfolioData();
  }, [id, organizationId]);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const [portfolioData, statsData, risksData] = await Promise.all([
        getPortfolioById(id),
        getPortfolioStats(id),
        getPortfolioRisks(id)
      ]);
      setPortfolio(portfolioData);
      setStats(statsData);
      setRisks(risksData);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <Activity className="w-12 h-12 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-light mb-2">Portefeuille introuvable</h2>
          <button
            onClick={() => navigate('/portfolios')}
            className="text-[#D4AF37] hover:underline"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/portfolios')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux portefeuilles
          </button>

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-extralight">{portfolio.name}</h1>
                {getHealthBadge(portfolio.health_status)}
                {getStatusBadge(portfolio.status)}
              </div>
              {portfolio.code && (
                <p className="text-slate-400 font-mono text-sm mb-2">{portfolio.code}</p>
              )}
              {portfolio.description && (
                <p className="text-slate-300 font-light max-w-3xl">{portfolio.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/portfolios/${id}/edit`)}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {/* TODO: delete handler */}}
                className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Budget Total</span>
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-2xl font-extralight">
              {(stats?.budget_total || 0).toLocaleString()}€
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Dépensé: {(stats?.budget_spent || 0).toLocaleString()}€
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Projets</span>
              <Activity className="w-5 h-5 text-[#4A9EFF]" />
            </div>
            <p className="text-2xl font-extralight">{stats?.total_projects || 0}</p>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.active_projects || 0} actifs
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Santé Projets</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-extralight">{stats?.on_track_projects || 0}</p>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.at_risk_projects || 0} à risque
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Risques Ouverts</span>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-extralight">{risks.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              {risks.filter(r => r.impact === 'HIGH' || r.impact === 'CRITICAL').length} critiques
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-slate-800 mb-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Activity },
              { id: 'projects', label: 'Projets', icon: Target },
              { id: 'risks', label: 'Risques', icon: AlertTriangle },
              { id: 'performance', label: 'Performance', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-[#D4AF37] text-slate-200'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab portfolio={portfolio} stats={stats} />
          )}
          {activeTab === 'projects' && (
            <ProjectsTab projects={portfolio.projects || []} />
          )}
          {activeTab === 'risks' && (
            <RisksTab risks={risks} />
          )}
          {activeTab === 'performance' && (
            <PerformanceTab stats={stats} />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components for tabs
function OverviewTab({ portfolio, stats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Informations générales */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          Informations Générales
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-sm">Code</label>
            <p className="text-slate-200 font-mono">{portfolio.code || 'N/A'}</p>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Responsable</label>
            <p className="text-slate-200">{portfolio.manager_name || 'Non assigné'}</p>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Statut</label>
            <div className="mt-1">{getStatusBadge(portfolio.status)}</div>
          </div>
          <div>
            <label className="text-slate-400 text-sm">Santé Globale</label>
            <div className="mt-1">{getHealthBadge(portfolio.health_status)}</div>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          Budget
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Budget Total</span>
              <span className="text-slate-200 font-medium">
                {(stats?.budget_total || 0).toLocaleString()}€
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Dépensé</span>
              <span className="text-green-400 font-medium">
                {(stats?.budget_spent || 0).toLocaleString()}€
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Restant</span>
              <span className="text-[#4A9EFF] font-medium">
                {((stats?.budget_total || 0) - (stats?.budget_spent || 0)).toLocaleString()}€
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  ((stats?.budget_spent || 0) / (stats?.budget_total || 1)) * 100,
                  100
                )}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      {portfolio.description && (
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-medium mb-3">Description</h3>
          <p className="text-slate-300 font-light leading-relaxed">
            {portfolio.description}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectsTab({ projects }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <div className="bg-slate-900 p-12 rounded-lg border border-slate-800 text-center">
        <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
        <h3 className="text-xl font-light mb-2">Aucun projet référencé</h3>
        <p className="text-slate-400">
          Les projets seront assignés à ce portefeuille lors de leur création.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-950 border-b border-slate-800">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Code</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Nom</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Manager</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Statut</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Santé</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Budget</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Avancement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {projects.map((project) => (
            <tr
              key={project.id}
              onClick={() => navigate(`/projects-v2/${project.id}`)}
              className="hover:bg-slate-800 cursor-pointer transition"
            >
              <td className="px-6 py-4">
                <span className="font-mono text-sm text-[#D4AF37]">{project.code}</span>
              </td>
              <td className="px-6 py-4">
                <p className="font-medium">{project.name}</p>
              </td>
              <td className="px-6 py-4">
                <span className="text-slate-300">{project.manager_name || 'N/A'}</span>
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(project.status)}
              </td>
              <td className="px-6 py-4">
                {getHealthBadge(project.health_status)}
              </td>
              <td className="px-6 py-4">
                <span className="text-slate-300">
                  {(project.budget_total || 0).toLocaleString()}€
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-2 rounded-full"
                      style={{ width: `${project.completion_percent || 0}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400">
                    {project.completion_percent || 0}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RisksTab({ risks }) {
  if (risks.length === 0) {
    return (
      <div className="bg-slate-900 p-12 rounded-lg border border-slate-800 text-center">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h3 className="text-xl font-light mb-2">Aucun risque ouvert</h3>
        <p className="text-slate-400">Tous les risques du portefeuille sont maîtrisés.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {risks.map((risk) => (
        <div
          key={risk.id}
          className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 transition"
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-medium">{risk.title}</h4>
            {getImpactBadge(risk.impact)}
          </div>
          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{risk.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Projet:</span>
            <span className="text-slate-300 font-mono">{risk.project_code}</span>
            {getProbabilityBadge(risk.probability)}
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceTab({ stats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
          Projets par Statut
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Planifiés</span>
            <span className="text-slate-200 font-medium">{stats?.planned_projects || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">En cours</span>
            <span className="text-slate-200 font-medium">{stats?.active_projects || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Terminés</span>
            <span className="text-slate-200 font-medium">{stats?.completed_projects || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Santé Projets
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Sur les rails</span>
            <span className="text-green-400 font-medium">{stats?.on_track_projects || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">À risque</span>
            <span className="text-yellow-400 font-medium">{stats?.at_risk_projects || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Hors piste</span>
            <span className="text-red-400 font-medium">{stats?.off_track_projects || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#D4AF37]" />
          Performance Budgétaire
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Budget Total</span>
            <span className="text-slate-200 font-medium">
              {(stats?.budget_total || 0).toLocaleString()}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Consommé</span>
            <span className="text-[#4A9EFF] font-medium">
              {(stats?.budget_spent || 0).toLocaleString()}€
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Taux consommation</span>
            <span className="text-slate-200 font-medium">
              {Math.round(((stats?.budget_spent || 0) / (stats?.budget_total || 1)) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions (same as PortfoliosList)
function getStatusBadge(status) {
  const styles = {
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    PLANNED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    ON_HOLD: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    CLOSED: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  };
  const labels = { ACTIVE: 'Actif', PLANNED: 'Planifié', ON_HOLD: 'En attente', CLOSED: 'Clôturé' };
  return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>{labels[status]}</span>;
}

function getHealthBadge(health) {
  const styles = {
    ON_TRACK: 'bg-green-500/20 text-green-400 border-green-500/30',
    AT_RISK: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    OFF_TRACK: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  const labels = { ON_TRACK: 'Sur les rails', AT_RISK: 'À risque', OFF_TRACK: 'Hors piste' };
  return <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[health]}`}>{labels[health]}</span>;
}

function getImpactBadge(impact) {
  const styles = {
    LOW: 'bg-blue-500/20 text-blue-400',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400',
    HIGH: 'bg-orange-500/20 text-orange-400',
    CRITICAL: 'bg-red-500/20 text-red-400'
  };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[impact]}`}>{impact}</span>;
}

function getProbabilityBadge(probability) {
  const styles = {
    LOW: 'bg-slate-500/20 text-slate-400',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400',
    HIGH: 'bg-red-500/20 text-red-400'
  };
  const labels = { LOW: 'Prob. Faible', MEDIUM: 'Prob. Moyenne', HIGH: 'Prob. Élevée' };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[probability]}`}>{labels[probability]}</span>;
}
