import React from 'react';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/dashboard/KpiCard';
import ProgressAreaChart from '../components/dashboard/ProgressAreaChart';
import BudgetProgressLineChart from '../components/dashboard/BudgetProgressLineChart';
import HeatmapRisks from '../components/dashboard/HeatmapRisks';
import TimelineMilestones from '../components/dashboard/TimelineMilestones';
import { kpis, progressHistory, budgetHistory } from '../data/demoData';
import { FolderKanban, TrendingUp, DollarSign, Users, Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard PMO"
        subtitle="Vue d'ensemble de vos projets et programmes"
        action={
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nouveau projet
          </button>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Projets Actifs"
          value={kpis.activeProjects}
          icon={FolderKanban}
          color="blue"
          trend="up"
          trendValue="+2 ce mois"
        />
        <KpiCard
          label="Progression Moyenne"
          value={kpis.averageProgress}
          unit="%"
          icon={TrendingUp}
          color="green"
          trend="up"
          trendValue="+4% vs mois dernier"
        />
        <KpiCard
          label="Budget Consommé"
          value={`CHF ${(kpis.budgetUsed / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          color="amber"
          trend="neutral"
          trendValue={`${Math.round((kpis.budgetUsed / kpis.totalBudget) * 100)}% du total`}
        />
        <KpiCard
          label="Équipe Mobilisée"
          value={kpis.teamSize}
          icon={Users}
          color="purple"
          trend="up"
          trendValue="+3 depuis dernier mois"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressAreaChart data={progressHistory} />
        <BudgetProgressLineChart data={budgetHistory} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeatmapRisks />
        <TimelineMilestones />
      </div>
    </div>
  );
};

export default Dashboard;
