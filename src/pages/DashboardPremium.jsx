import React from 'react';

const DashboardPremium = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Executive Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Vue consolidée de votre portefeuille, de vos KPIs stratégiques et des actions prioritaires.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Switch portfolio
          </button>
        </div>
      </header>

      {/* KPI Ribbon */}
      <section className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Strategic alignment</span>
          <p className="text-lg font-semibold text-slate-900">94%</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Budget utilization</span>
          <p className="text-lg font-semibold text-slate-900">88%</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Risk exposure</span>
          <p className="text-lg font-semibold text-slate-900">Low</p>
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">Portfolio health</span>
          <p className="text-lg font-semibold text-slate-900">9.0 / 10</p>
        </div>
      </section>

      {/* Next Best Action */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Next best action</h2>
        <p className="mt-2 text-sm text-slate-700">
          Valider le budget du programme <strong>Cloud Migration</strong> avant le 12 janvier pour maintenir la trajectoire.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800">
            Open Cloud Migration
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
            View financial impact
          </button>
        </div>
      </section>

      {/* Activity */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
        <ul className="mt-3 space-y-3 text-sm text-slate-700">
          <li className="flex justify-between border-b border-slate-100 pb-2">
            <span>Budget updated — Cloud Migration Program</span>
            <span className="text-[11px] text-slate-500">12 min ago</span>
          </li>
          <li className="flex justify-between border-b border-slate-100 pb-2">
            <span>Phase 2 approved — AI Customer Insights</span>
            <span className="text-[11px] text-slate-500">43 min ago</span>
          </li>
          <li className="flex justify-between">
            <span>Risk downgraded — ERP Modernization</span>
            <span className="text-[11px] text-slate-500">Today</span>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default DashboardPremium;
