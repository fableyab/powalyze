import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioSegments, portfolioProjects, getPortfolioKPIs } from '../data/portfolioData';

const PortfolioPremium = () => {
  const kpis = getPortfolioKPIs();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Portfolio overview
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Vue exécutive de l'ensemble du portefeuille : valeur, risques, alignement stratégique et arbitrages clés.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link 
            to="/app/portfolio/analytics" 
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Open analytics
          </Link>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Export portfolio
          </button>
        </div>
      </header>

      {/* KPI Ribbon */}
      <section className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-5">
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Active projects</span>
          <p className="text-lg font-semibold text-slate-900">{kpis.activeProjects}</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Portfolio value</span>
          <p className="text-lg font-semibold text-slate-900">{formatCurrency(kpis.portfolioValue)}</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Budget committed</span>
          <p className="text-lg font-semibold text-slate-900">{formatCurrency(kpis.portfolioValue * 0.81)}</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Critical projects</span>
          <p className="text-lg font-semibold text-red-600">{kpis.criticalProjects}</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Strategic alignment</span>
          <p className="text-lg font-semibold text-slate-900">{kpis.avgAlignment}/10</p>
        </div>
      </section>

      {/* Segments */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Portfolio segments</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolioSegments.map((segment) => {
            const segmentProjects = portfolioProjects.filter(p => p.segment === segment.id);
            const segmentBudget = segmentProjects.reduce((sum, p) => sum + p.budget, 0);
            
            return (
              <Link
                key={segment.id}
                to={`/app/portfolio/${segment.id}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:border-slate-300 hover:bg-white"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{segment.icon}</span>
                  <h3 className="text-sm font-semibold text-slate-900">{segment.name}</h3>
                </div>
                <p className="text-xs text-slate-600">
                  {segmentProjects.length} projects · {formatCurrency(segmentBudget)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Portfolio projects</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
                <th className="py-2">Project</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Value</th>
                <th>Risk</th>
                <th>Alignment</th>
                <th>Deadline</th>
                <th>Owner</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {portfolioProjects.map((project) => {
                const segment = portfolioSegments.find(s => s.id === project.segment);
                
                return (
                  <tr key={project.id}>
                    <td className="py-3 font-medium text-slate-900">{project.name}</td>
                    <td>
                      <span className="text-xs text-slate-600">
                        {segment?.icon} {segment?.name}
                      </span>
                    </td>
                    <td>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        project.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700' :
                        project.status === 'CRITICAL' ? 'bg-red-50 text-red-700' :
                        project.status === 'ON_HOLD' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-green-50 text-green-700'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{formatCurrency(project.budget)}</td>
                    <td>
                      <span className="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                        {project.value}/10
                      </span>
                    </td>
                    <td>
                      <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                        {project.risk}/10
                      </span>
                    </td>
                    <td>
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                        {project.alignment}/10
                      </span>
                    </td>
                    <td className="text-slate-600">{project.deadline}</td>
                    <td className="text-slate-600">{project.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPremium;
