import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, BarChart3, Calendar, DollarSign, AlertTriangle, Folder, CheckCircle2, TrendingUp } from 'lucide-react';
import { getProjectById } from '@/lib/projectServiceV2';
import { getPhasesByProject } from '@/lib/phaseService';
import { getBudgetEntriesByProject } from '@/lib/budgetService';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [phases, setPhases] = useState([]);
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProject();
  }, [id]);

  async function loadProject() {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setProject(data);
      
      // Charger phases
      const phasesData = await getPhasesByProject(id);
      setPhases(phasesData);
      
      // Charger budget entries
      const budgetData = await getBudgetEntriesByProject(id);
      setBudgetEntries(budgetData);
    } catch (error) {
      console.error('Erreur chargement projet:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-slate-400 mb-4">Projet introuvable</h2>
          <Link to="/projects-v2" className="text-[#D4AF37] hover:underline">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const getHealthBadge = (health) => {
    const colors = {
      ON_TRACK: 'bg-green-500/10 text-green-500 border-green-500/20',
      AT_RISK: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      OFF_TRACK: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    const labels = { ON_TRACK: 'On Track', AT_RISK: 'At Risk', OFF_TRACK: 'Off Track' };
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded border ${colors[health]}`}>
        {labels[health]}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Folder },
    { id: 'phases', label: 'Phases', icon: Calendar },
    { id: 'budget', label: 'Budget & Performance', icon: DollarSign },
    { id: 'risks', label: 'Risques', icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/projects-v2')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm text-slate-500">{project.code}</span>
                {getHealthBadge(project.health_status)}
                <span className="px-3 py-1 text-sm bg-slate-800 text-slate-300 rounded">
                  {project.status.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-3xl font-extralight text-slate-100 mb-2">{project.name}</h1>
              <p className="text-slate-400 text-sm">{project.type} • {project.department}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 bg-slate-900 border border-slate-800 rounded hover:border-slate-700">
                <Edit className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 bg-slate-900 border border-slate-800 rounded hover:border-red-500/50">
                <Trash2 className="w-5 h-5 text-slate-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">Budget Total</div>
            <div className="text-2xl font-light text-slate-100">
              {(project.budget_total / 1000).toFixed(0)}k €
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {(project.budget_spent / 1000).toFixed(0)}k dépensés
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">Avancement</div>
            <div className="text-2xl font-light text-green-400">{project.completion_percent}%</div>
            <div className="w-full h-1 bg-slate-800 rounded-full mt-2">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${project.completion_percent}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">Phases</div>
            <div className="text-2xl font-light text-slate-100">{phases.length}</div>
            <div className="text-xs text-slate-500 mt-1">
              {phases.filter(p => p.status === 'DONE').length} terminées
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-1">Risques Ouverts</div>
            <div className="text-2xl font-light text-yellow-400">
              {project.risks?.filter(r => r.status === 'OPEN').length || 0}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {project.risk_level} risk level
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-800 mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#D4AF37] text-[#D4AF37]'
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
        <div className="mb-8">
          {activeTab === 'overview' && <OverviewTab project={project} />}
          {activeTab === 'phases' && <PhasesTab phases={phases} projectId={id} onUpdate={loadProject} />}
          {activeTab === 'budget' && <BudgetTab project={project} budgetEntries={budgetEntries} />}
          {activeTab === 'risks' && <RisksTab risks={project.risks || []} projectId={id} />}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB: Overview
// ============================================================================
function OverviewTab({ project }) {
  return (
    <div className="space-y-6">
      {/* Gouvernance */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-light text-[#D4AF37] mb-4">Gouvernance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Sponsor</div>
            <div className="text-slate-200">
              {project.sponsor?.name || 'Non assigné'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Project Manager</div>
            <div className="text-slate-200">
              {project.manager?.name || 'Non assigné'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Fréquence comités</div>
            <div className="text-slate-200">{project.committee_frequency || 'Non défini'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Portfolio</div>
            <div className="text-slate-200">
              {project.portfolio?.name || 'Aucun'}
            </div>
          </div>
        </div>
      </div>

      {/* Objectifs */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-light text-[#D4AF37] mb-4">Objectif Principal</h3>
        <p className="text-slate-300 leading-relaxed">{project.main_objective}</p>
      </div>

      {/* Planning */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-light text-[#D4AF37] mb-4">Planning</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Date début</div>
            <div className="text-slate-200">{new Date(project.start_date).toLocaleDateString('fr-FR')}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Date fin prévisionnelle</div>
            <div className="text-slate-200">{new Date(project.end_date).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      {project.kpis && project.kpis.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-light text-[#D4AF37] mb-4">KPIs</h3>
          <div className="space-y-3">
            {project.kpis.map((kpi) => (
              <div key={kpi.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-slate-200">{kpi.name}</div>
                  <div className="text-xs text-slate-500">{kpi.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-300">
                    {kpi.current_value} / {kpi.target_value} {kpi.unit}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    kpi.status === 'ON_TRACK' ? 'bg-green-500/10 text-green-500' :
                    kpi.status === 'AT_RISK' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {kpi.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TAB: Phases
// ============================================================================
function PhasesTab({ phases, projectId, onUpdate }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-light text-slate-200">Phases d'exécution</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90">
          + Ajouter une phase
        </button>
      </div>

      {phases.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
          <Calendar className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">Aucune phase définie</p>
        </div>
      ) : (
        <div className="space-y-3">
          {phases.map((phase, index) => (
            <div key={phase.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm text-slate-400">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-100">{phase.name}</h4>
                    <p className="text-sm text-slate-500">{phase.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded ${
                  phase.status === 'DONE' ? 'bg-green-500/10 text-green-500' :
                  phase.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-slate-700 text-slate-400'
                }`}>
                  {phase.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Période</div>
                  <div className="text-sm text-slate-300">
                    {new Date(phase.start_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Budget</div>
                  <div className="text-sm text-slate-300">
                    {(phase.budget_spent / 1000).toFixed(0)}k / {(phase.budget_allocated / 1000).toFixed(0)}k €
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tasks</div>
                  <div className="text-sm text-slate-300">
                    {phase.completed_tasks} / {phase.task_count}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Avancement</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-300">{phase.completion_percent}%</span>
                    <div className="flex-1 h-1 bg-slate-800 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${phase.completion_percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TAB: Budget & Performance
// ============================================================================
function BudgetTab({ project, budgetEntries }) {
  const plannedTotal = budgetEntries
    .filter(e => e.type === 'PLANNED')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const actualTotal = budgetEntries
    .filter(e => e.type === 'ACTUAL')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="text-slate-400 text-sm mb-1">Budget Total</div>
          <div className="text-2xl font-light text-slate-100">
            {(project.budget_total / 1000).toFixed(0)}k €
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="text-slate-400 text-sm mb-1">Dépensé</div>
          <div className="text-2xl font-light text-yellow-400">
            {(actualTotal / 1000).toFixed(0)}k €
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
          <div className="text-slate-400 text-sm mb-1">Restant</div>
          <div className="text-2xl font-light text-green-400">
            {((project.budget_total - actualTotal) / 1000).toFixed(0)}k €
          </div>
        </div>
      </div>

      {/* Budget Entries */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-light text-[#D4AF37] mb-4">Entrées Budgétaires</h3>
        {budgetEntries.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Aucune entrée budgétaire</p>
        ) : (
          <div className="space-y-2">
            {budgetEntries.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <span className="text-sm text-slate-300">{entry.category}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    entry.type === 'PLANNED' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {entry.type}
                  </span>
                </div>
                <span className="text-sm text-slate-200">{(entry.amount / 1000).toFixed(1)}k €</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TAB: Risks
// ============================================================================
function RisksTab({ risks, projectId }) {
  const openRisks = risks.filter(r => r.status === 'OPEN');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-light text-slate-200">
          Risques ({openRisks.length} ouverts sur {risks.length})
        </h3>
        <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-medium rounded-lg hover:opacity-90">
          + Ajouter un risque
        </button>
      </div>

      {risks.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
          <AlertTriangle className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">Aucun risque identifié</p>
        </div>
      ) : (
        <div className="space-y-3">
          {risks.map((risk) => (
            <div key={risk.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-medium text-slate-100">{risk.title}</h4>
                <span className={`px-3 py-1 text-xs font-medium rounded ${
                  risk.status === 'OPEN' ? 'bg-red-500/10 text-red-500' :
                  risk.status === 'MITIGATED' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-green-500'
                }`}>
                  {risk.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4">{risk.description}</p>
              <div className="flex gap-4">
                <div>
                  <span className="text-xs text-slate-500">Impact:</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    risk.impact === 'CRITICAL' || risk.impact === 'HIGH' ? 'bg-red-500/10 text-red-400' :
                    risk.impact === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {risk.impact}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Probabilité:</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${
                    risk.probability === 'HIGH' ? 'bg-red-500/10 text-red-400' :
                    risk.probability === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {risk.probability}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
