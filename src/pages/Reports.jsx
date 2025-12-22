import React from 'react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/dashboard/KpiCard';
import ProgressAreaChart from '../components/dashboard/ProgressAreaChart';
import BudgetProgressLineChart from '../components/dashboard/BudgetProgressLineChart';
import HeatmapRisks from '../components/dashboard/HeatmapRisks';
import ProjectListTable from '../components/projects/ProjectListTable';
import { projects, kpis, progressHistory, budgetHistory } from '../data/demoData';
import { FileText, Download, Presentation, FolderKanban, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const Reports = () => {
  const projectsAtRisk = projects.filter(p => p.status === 'at-risk').length;
  const totalRisks = projects.reduce((sum, p) => sum + p.risks.length, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rapports & Analyses"
        subtitle="Vue exécutive pour le comité de direction"
        action={
          <div className="flex gap-3">
            <button className="btn-outline flex items-center gap-2">
              <Presentation className="w-5 h-5" />
              Mode Présentation
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exporter PDF
            </button>
          </div>
        }
      />

      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-start gap-4 mb-6">
          <FileText className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-black mb-2">Rapport Exécutif PMO</h2>
            <p className="text-blue-200">
              Période: {new Date().toLocaleDateString('fr-CH', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed">
          Le portefeuille compte actuellement <strong>{kpis.activeProjects} projets actifs</strong> avec une progression moyenne de <strong>{kpis.averageProgress}%</strong>. 
          Le budget consommé s'élève à <strong>CHF {(kpis.budgetUsed / 1000000).toFixed(2)}M</strong> sur un total de <strong>CHF {(kpis.totalBudget / 1000000).toFixed(2)}M</strong>. 
          <span className="text-amber-300"> {projectsAtRisk} projets nécessitent une attention particulière</span> avec <strong>{totalRisks} risques actifs</strong> identifiés.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Projets Actifs"
          value={kpis.activeProjects}
          icon={FolderKanban}
          color="blue"
        />
        <KpiCard
          label="Progression Moyenne"
          value={kpis.averageProgress}
          unit="%"
          icon={TrendingUp}
          color="green"
        />
        <KpiCard
          label="Consommation Budget"
          value={`${Math.round((kpis.budgetUsed / kpis.totalBudget) * 100)}`}
          unit="%"
          icon={DollarSign}
          color="amber"
        />
        <KpiCard
          label="Projets À Risque"
          value={projectsAtRisk}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressAreaChart data={progressHistory} />
        <BudgetProgressLineChart data={budgetHistory} />
      </div>

      {/* Risks Heatmap */}
      <HeatmapRisks />

      {/* Projects Table */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Portfolio Détaillé</h2>
        <ProjectListTable projects={projects} />
      </div>

      {/* Footer Note */}
      <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong>Note:</strong> Ce rapport est généré automatiquement par Powalyze et reflète l'état en temps réel du portefeuille de projets. 
          Les données sont actualisées quotidiennement à partir des entrées des chefs de projet. 
          Pour toute question, contactez le PMO Office à <a href="mailto:pmo@powalyze.ch" className="text-blue-600 hover:underline">pmo@powalyze.ch</a>.
        </p>
      </div>
    </div>
  );
};

export default Reports;
