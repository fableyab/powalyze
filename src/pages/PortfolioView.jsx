import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  Activity,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { portfolioService, programService, projectService } from '@/lib/portfolioService';
import { Link } from 'react-router-dom';

const PortfolioView = () => {
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    health: '',
    portfolioId: ''
  });

  const organizationId = 'YOUR_ORG_ID'; // À remplacer

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [portfoliosData, projectsData] = await Promise.all([
        portfolioService.getPortfolios(organizationId),
        projectService.getProjects(organizationId)
      ]);
      setPortfolios(portfoliosData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filters.status && project.status !== filters.status) return false;
    if (filters.health && project.health !== filters.health) return false;
    if (filters.portfolioId && project.portfolio_id !== filters.portfolioId) return false;
    return true;
  });

  const healthColors = {
    GREEN: 'bg-green-500',
    AMBER: 'bg-amber-500',
    RED: 'bg-red-500'
  };

  const statusLabels = {
    NOT_STARTED: 'Non démarré',
    IN_PROGRESS: 'En cours',
    AT_RISK: 'À risque',
    BLOCKED: 'Bloqué',
    DONE: 'Terminé'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] via-[#0D2340] to-[#0A1A2F]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">Portfolio Manager</h1>
              <p className="text-sm text-gray-400">Vue consolidée de tous vos projets</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <button className="px-4 py-2 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouveau Projet
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-light text-white">Filtres</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Portefeuille</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                value={filters.portfolioId}
                onChange={(e) => setFilters({ ...filters, portfolioId: e.target.value })}
              >
                <option value="">Tous les portefeuilles</option>
                {portfolios.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Statut</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Tous les statuts</option>
                <option value="NOT_STARTED">Non démarré</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="AT_RISK">À risque</option>
                <option value="BLOCKED">Bloqué</option>
                <option value="DONE">Terminé</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Santé</label>
              <select
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                value={filters.health}
                onChange={(e) => setFilters({ ...filters, health: e.target.value })}
              >
                <option value="">Toutes</option>
                <option value="GREEN">Saine</option>
                <option value="AMBER">Attention</option>
                <option value="RED">Critique</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Vue Portefeuilles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, index) => {
            const portfolioProjects = projects.filter((p) => p.portfolio_id === portfolio.id);
            const healthCount = portfolioProjects.reduce(
              (acc, p) => {
                acc[p.health] = (acc[p.health] || 0) + 1;
                return acc;
              },
              { GREEN: 0, AMBER: 0, RED: 0 }
            );

            return (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                onClick={() => setSelectedPortfolio(portfolio)}
              >
                <div className="flex items-start justify-between mb-4">
                  <FolderKanban className="w-8 h-8 text-[#D4AF37]" />
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      portfolio.status === 'ACTIVE'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {portfolio.status}
                  </span>
                </div>
                <h3 className="text-xl font-light text-white mb-2">{portfolio.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{portfolio.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Projets</span>
                    <span className="text-white font-medium">{portfolioProjects.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex">
                      {healthCount.GREEN > 0 && (
                        <div
                          className="bg-green-500"
                          style={{
                            width: `${(healthCount.GREEN / portfolioProjects.length) * 100}%`
                          }}
                        />
                      )}
                      {healthCount.AMBER > 0 && (
                        <div
                          className="bg-amber-500"
                          style={{
                            width: `${(healthCount.AMBER / portfolioProjects.length) * 100}%`
                          }}
                        />
                      )}
                      {healthCount.RED > 0 && (
                        <div
                          className="bg-red-500"
                          style={{
                            width: `${(healthCount.RED / portfolioProjects.length) * 100}%`
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {portfolio.budget_planned && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10">
                      <span className="text-gray-400">Budget</span>
                      <span className="text-white">
                        {portfolio.budget_actual?.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tableau des Projets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-light text-white">
              Projets ({filteredProjects.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Portefeuille
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    PM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Santé
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Avancement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <Link to={`/projects/${project.id}`} className="text-white hover:text-[#D4AF37]">
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {project.portfolio?.name || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {project.project_manager
                          ? `${project.project_manager.first_name} ${project.project_manager.last_name}`
                          : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{statusLabels[project.status]}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${healthColors[project.health]}`} />
                        <span className="text-sm text-gray-300">{project.health}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D4AF37]"
                            style={{ width: `${project.progress_percent || 0}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{project.progress_percent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioView;
