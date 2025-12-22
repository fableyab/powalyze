import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ProjectHealthScore from '../components/common/ProjectHealthScore';
import KpiCard from '../components/dashboard/KpiCard';
import HeatmapRisks from '../components/dashboard/HeatmapRisks';
import TimelineMilestones from '../components/dashboard/TimelineMilestones';
import TaskKanban from '../components/tasks/TaskKanban';
import { projects } from '../data/demoData';
import { ArrowLeft, Users, DollarSign, TrendingUp, AlertTriangle, Calendar, Edit } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="space-y-6">
        <PageHeader title="Projet introuvable" subtitle="Ce projet n'existe pas" />
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">Le projet demandé n'a pas été trouvé.</p>
          <Link to="/app/projects" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Retour au portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link to="/app/projects" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Retour au portfolio
      </Link>

      <PageHeader
        title={project.name}
        subtitle={`${project.program} • ${project.type} • Sponsor: ${project.sponsor}`}
        action={
          <button className="btn-outline flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Modifier
          </button>
        }
      />

      {/* Health Score */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <ProjectHealthScore project={project} size="lg" />
        <p className="text-gray-600 mt-4">{project.description}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Progression"
          value={project.progress}
          unit="%"
          icon={TrendingUp}
          color="blue"
        />
        <KpiCard
          label="Budget Consommé"
          value={`CHF ${(project.budgetUsed / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="amber"
        />
        <KpiCard
          label="Risques Actifs"
          value={project.risks.length}
          icon={AlertTriangle}
          color="red"
        />
        <KpiCard
          label="Équipe"
          value={project.teamSize}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Milestones & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Jalons du Projet
          </h3>
          <div className="space-y-3">
            {project.milestones.map(milestone => (
              <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{milestone.title}</p>
                  <p className="text-xs text-gray-500 capitalize">{milestone.status}</p>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {new Date(milestone.date).toLocaleDateString('fr-CH')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Risques Identifiés
          </h3>
          <div className="space-y-3">
            {project.risks.map(risk => (
              <div key={risk.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900">{risk.label}</p>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    risk.severity === 'critical' ? 'bg-red-500 text-white' :
                    risk.severity === 'high' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-gray-900'
                  }`}>
                    {risk.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{risk.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Kanban */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Tâches du Projet</h2>
        <TaskKanban projectId={project.id} />
      </div>
    </div>
  );
};

export default ProjectDetail;
