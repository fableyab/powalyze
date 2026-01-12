import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getPortfolios, getPortfolioStats } from '@/lib/portfolioServiceV2';
import { getProjects } from '@/lib/projectServiceV2';
import { 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function DashboardExecutive() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [projects, setProjects] = useState([]);
  const [globalStats, setGlobalStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const organizationId = user?.user_metadata?.organization_id;

  useEffect(() => {
    if (!organizationId) return;
    loadDashboardData();
  }, [organizationId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [portfoliosData, projectsData] = await Promise.all([
        getPortfolios(organizationId),
        getProjects(organizationId)
      ]);

      setPortfolios(portfoliosData);
      setProjects(projectsData);

      // Calculate global stats
      const stats = {
        totalPortfolios: portfoliosData.length,
        activePortfolios: portfoliosData.filter(p => p.status === 'ACTIVE').length,
        totalProjects: projectsData.length,
        activeProjects: projectsData.filter(p => p.status === 'IN_PROGRESS').length,
        onTrackProjects: projectsData.filter(p => p.health_status === 'ON_TRACK').length,
        atRiskProjects: projectsData.filter(p => p.health_status === 'AT_RISK').length,
        offTrackProjects: projectsData.filter(p => p.health_status === 'OFF_TRACK').length,
        totalBudget: projectsData.reduce((sum, p) => sum + (p.budget_total || 0), 0),
        spentBudget: projectsData.reduce((sum, p) => sum + (p.budget_spent || 0), 0),
        avgCompletion: projectsData.length > 0
          ? Math.round(projectsData.reduce((sum, p) => sum + (p.completion_percent || 0), 0) / projectsData.length)
          : 0
      };

      setGlobalStats(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 animate-spin mx-auto mb-4 text-[#D4AF37]" />
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extralight mb-2">Tableau de Bord Exécutif</h1>
          <p className="text-slate-400 font-light">
            Vue d'ensemble stratégique de vos portefeuilles et projets
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Portefeuilles Actifs</span>
              <Activity className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-extralight mb-1">{globalStats?.activePortfolios || 0}</p>
            <p className="text-xs text-slate-500">
              sur {globalStats?.totalPortfolios || 0} total
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Projets en Cours</span>
              <Target className="w-5 h-5 text-[#4A9EFF]" />
            </div>
            <p className="text-3xl font-extralight mb-1">{globalStats?.activeProjects || 0}</p>
            <p className="text-xs text-slate-500">
              sur {globalStats?.totalProjects || 0} total
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Santé Globale</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-extralight mb-1">{globalStats?.onTrackProjects || 0}</p>
            <p className="text-xs text-slate-500">
              {globalStats?.atRiskProjects || 0} à risque, {globalStats?.offTrackProjects || 0} hors piste
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm font-light">Budget Total</span>
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-extralight mb-1">
              {((globalStats?.totalBudget || 0) / 1000000).toFixed(1)}M€
            </p>
            <p className="text-xs text-slate-500">
              {Math.round(((globalStats?.spentBudget || 0) / (globalStats?.totalBudget || 1)) * 100)}% consommé
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Portfolio Health Distribution */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              Santé des Projets
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Sur les rails
                  </span>
                  <span className="font-medium">{globalStats?.onTrackProjects || 0} projets</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${((globalStats?.onTrackProjects || 0) / (globalStats?.totalProjects || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    À risque
                  </span>
                  <span className="font-medium">{globalStats?.atRiskProjects || 0} projets</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${((globalStats?.atRiskProjects || 0) / (globalStats?.totalProjects || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Hors piste
                  </span>
                  <span className="font-medium">{globalStats?.offTrackProjects || 0} projets</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${((globalStats?.offTrackProjects || 0) / (globalStats?.totalProjects || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
              Performance Budgétaire
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-sm">Budget Total</p>
                  <p className="text-2xl font-extralight">
                    {((globalStats?.totalBudget || 0) / 1000000).toFixed(2)}M€
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-sm">Budget Consommé</p>
                  <p className="text-2xl font-extralight text-[#4A9EFF]">
                    {((globalStats?.spentBudget || 0) / 1000000).toFixed(2)}M€
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Taux de consommation</p>
                  <p className="text-lg font-medium">
                    {Math.round(((globalStats?.spentBudget || 0) / (globalStats?.totalBudget || 1)) * 100)}%
                  </p>
                </div>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] h-4 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      ((globalStats?.spentBudget || 0) / (globalStats?.totalBudget || 1)) * 100,
                      100
                    )}%`
                  }}
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-slate-400 text-sm">Budget Restant</p>
                  <p className="text-xl font-light text-green-400">
                    {(((globalStats?.totalBudget || 0) - (globalStats?.spentBudget || 0)) / 1000000).toFixed(2)}M€
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolios Summary */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-light">Portefeuilles Stratégiques</h3>
            <button
              onClick={() => navigate('/portfolios')}
              className="flex items-center gap-2 text-[#D4AF37] hover:underline text-sm"
            >
              Voir tous
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {portfolios.length === 0 ? (
            <div className="bg-slate-900 p-12 rounded-lg border border-slate-800 text-center">
              <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-light mb-2">Aucun portefeuille</h3>
              <p className="text-slate-400 mb-6">
                Créez votre premier portefeuille stratégique pour structurer vos projets
              </p>
              <button
                onClick={() => navigate('/portfolios/new')}
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90 transition"
              >
                Créer un portefeuille
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolios.slice(0, 6).map((portfolio) => (
                <div
                  key={portfolio.id}
                  onClick={() => navigate(`/portfolios/${portfolio.id}`)}
                  className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{portfolio.name}</h4>
                      {portfolio.code && (
                        <p className="text-xs text-slate-400 font-mono">{portfolio.code}</p>
                      )}
                    </div>
                    {getHealthBadge(portfolio.health_status)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Projets</span>
                      <span className="text-slate-200 font-medium">
                        {portfolio.projects_count || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Budget</span>
                      <span className="text-slate-200 font-medium">
                        {((portfolio.budget_total || 0) / 1000).toFixed(0)}K€
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Critical Projects */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-light">Projets Nécessitant une Attention</h3>
            <button
              onClick={() => navigate('/projects-v2')}
              className="flex items-center gap-2 text-[#D4AF37] hover:underline text-sm"
            >
              Voir tous
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {projects.filter(p => p.health_status !== 'ON_TRACK').length === 0 ? (
            <div className="bg-slate-900 p-12 rounded-lg border border-slate-800 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-light mb-2">Tous les projets sont sur les rails</h3>
              <p className="text-slate-400">Aucun projet ne nécessite d'attention particulière</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {projects
                .filter(p => p.health_status !== 'ON_TRACK')
                .slice(0, 5)
                .map((project) => (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/projects-v2/${project.id}`)}
                    className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="font-mono text-sm text-[#D4AF37]">{project.code}</span>
                        <div className="flex-1">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-slate-400">
                            {project.manager_name || 'Manager non assigné'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Avancement</p>
                          <p className="text-lg font-medium">{project.completion_percent || 0}%</p>
                        </div>
                        {getHealthBadge(project.health_status)}
                        {project.health_status === 'OFF_TRACK' && (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions
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
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[health] || styles.ON_TRACK}`}>
      {labels[health] || health}
    </span>
  );
}
