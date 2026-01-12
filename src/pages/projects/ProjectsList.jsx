import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, FolderKanban, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getProjects } from '@/lib/projectServiceV2';

export default function ProjectsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    health_status: '',
    portfolio_id: '',
    type: ''
  });

  useEffect(() => {
    loadProjects();
  }, [filters]);

  async function loadProjects() {
    try {
      setLoading(true);
      // Récupérer organization_id depuis le profil user
      const orgId = user?.user_metadata?.organization_id || user?.organization_id;
      const data = await getProjects(orgId, filters);
      setProjects(data);
    } catch (error) {
      console.error('Erreur chargement projets:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PLANNED': return <Clock className="w-4 h-4 text-slate-400" />;
      case 'IN_PROGRESS': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'DONE': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getHealthBadge = (health) => {
    const colors = {
      ON_TRACK: 'bg-green-500/10 text-green-500 border-green-500/20',
      AT_RISK: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      OFF_TRACK: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    const labels = {
      ON_TRACK: 'On Track',
      AT_RISK: 'At Risk',
      OFF_TRACK: 'Off Track'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${colors[health]}`}>
        {labels[health]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extralight text-slate-100 mb-2">
              Projects
            </h1>
            <p className="text-slate-400 text-sm">
              Source unique de vérité pour tous les projets de l'organisation
            </p>
          </div>
          <button
            onClick={() => navigate('/projects/new')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Créer un projet
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher par nom ou code projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <button className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
            <Filter className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">Total Projets</div>
            <div className="text-2xl font-light text-slate-100">{projects.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">En Cours</div>
            <div className="text-2xl font-light text-blue-400">
              {projects.filter(p => p.status === 'IN_PROGRESS').length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">On Track</div>
            <div className="text-2xl font-light text-green-400">
              {projects.filter(p => p.health_status === 'ON_TRACK').length}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">At Risk</div>
            <div className="text-2xl font-light text-yellow-400">
              {projects.filter(p => p.health_status === 'AT_RISK').length}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
            <FolderKanban className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-light text-slate-400 mb-2">Aucun projet</h3>
            <p className="text-slate-500 mb-4">Créez votre premier projet pour commencer</p>
            <button
              onClick={() => navigate('/projects/new')}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-black font-medium rounded-lg hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
              Créer un projet
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Code</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Nom</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Portfolio</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Manager</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Santé</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Budget</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Avancement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-slate-300">{project.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-100">{project.name}</div>
                      <div className="text-xs text-slate-500">{project.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      {project.portfolio ? (
                        <span className="text-sm text-slate-300">{project.portfolio.name}</span>
                      ) : (
                        <span className="text-xs text-slate-600">Aucun</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {project.manager ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#4A9EFF] flex items-center justify-center text-xs font-medium text-black">
                            {project.manager.name.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-300">{project.manager.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600">Non assigné</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-slate-300">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getHealthBadge(project.health_status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">
                        {(project.budget_spent / 1000).toFixed(0)}k / {(project.budget_total / 1000).toFixed(0)}k €
                      </div>
                      <div className="w-24 h-1 bg-slate-800 rounded-full mt-1">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full"
                          style={{ width: `${Math.min((project.budget_spent / project.budget_total) * 100, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-300">{project.completion_percent}%</span>
                        <div className="w-16 h-1 bg-slate-800 rounded-full">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${project.completion_percent}%` }}
                          />
                        </div>
                      </div>
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
