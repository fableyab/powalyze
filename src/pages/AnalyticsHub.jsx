import React, { useMemo, useState } from 'react';
import { analyticsReports } from '../data/analyticsData';

const AnalyticsHub = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState('MOST_VIEWED');

  const totalReports = analyticsReports.length;
  const totalViews = analyticsReports.reduce((s, r) => s + r.views, 0);
  const categoriesCovered = new Set(analyticsReports.map((r) => r.category)).size;
  const mostViewed = analyticsReports.reduce((top, r) =>
    !top || r.views > top.views ? r : top,
  );
  const lastUpdated = analyticsReports
    .map((r) => r.lastUpdated)
    .sort()
    .slice(-1)[0];

  const filteredReports = useMemo(() => {
    let result = [...analyticsReports];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }

    if (category !== 'ALL') {
      result = result.filter((r) => r.category === category);
    }

    if (sort === 'MOST_VIEWED') {
      result = result.sort((a, b) => b.views - a.views);
    } else if (sort === 'RECENT') {
      result = result.sort(
        (a, b) => a.lastUpdated.localeCompare(b.lastUpdated) * -1,
      );
    }

    return result;
  }, [search, category, sort]);

  const favoriteReports = analyticsReports.filter((r) => r.isFavorite);
  const recentReports = [...analyticsReports].sort(
    (a, b) => a.lastUpdated.localeCompare(b.lastUpdated) * -1,
  );

  const viewsTopReport = mostViewed
    ? Math.round((mostViewed.views / totalViews) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Analytics &amp; Insights Hub
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-[15px]">
            Centralisez, explorez et partagez vos rapports stratégiques. Powalyze unifie vos insights commerciaux,
            financiers et PMO dans un cockpit unique.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Open in Power BI
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Export usage stats
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Manage access
          </button>
        </div>
      </header>

      {/* KPI ribbon */}
      <section className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Active reports
          </span>
          <span className="text-lg font-semibold text-slate-900">
            {totalReports}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Total views
          </span>
          <span className="text-lg font-semibold text-slate-900">
            {totalViews}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Categories covered
          </span>
          <span className="text-lg font-semibold text-slate-900">
            {categoriesCovered}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Last updated
          </span>
          <span className="text-sm font-medium text-slate-900">
            {lastUpdated}
          </span>
        </div>
        {mostViewed && (
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Most viewed
            </span>
            <span className="text-sm font-medium text-slate-900 line-clamp-2">
              {mostViewed.title}
            </span>
          </div>
        )}
      </section>

      {/* AI insights */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              AI insights
            </h2>
            <span className="text-[11px] text-slate-500">
              Analyse des usages de vos rapports stratégiques.
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-700">
          Les rapports{' '}
          <span className="font-semibold text-slate-900">
            {mostViewed.title}
          </span>{' '}
          concentrent une part majeure des consultations. Ils représentent environ{' '}
          <span className="font-semibold text-slate-900">
            {viewsTopReport}% des vues totales
          </span>
          . Intégrez ce rapport dans vos rituels de pilotage hebdomadaires pour maximiser son impact.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800">
            Pin to executive dashboard
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
            View detailed usage
          </button>
        </div>
      </section>

      {/* Search + filters */}
      <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="Search reports by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="ALL">Category: All</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="FINANCE">Finance</option>
            <option value="PMO">PMO</option>
          </select>

          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="MOST_VIEWED">Sort by: Most viewed</option>
            <option value="RECENT">Sort by: Most recent</option>
          </select>
        </div>
      </section>

      {/* Main grid */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {/* Collections */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Collections
            </h2>
            <span className="text-[11px] text-slate-500">
              Accès rapide à vos rapports clés.
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Favorites
              </h3>
              {favoriteReports.length === 0 && (
                <p className="text-[11px] text-slate-500">
                  No favorite reports yet.
                </p>
              )}
              <ul className="space-y-1">
                {favoriteReports.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <span className="text-xs font-medium text-slate-900 line-clamp-1">
                      {r.title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {r.views} views
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recently updated
              </h3>
              <ul className="space-y-1">
                {recentReports.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-md border border-slate-100 bg-white px-3 py-2"
                  >
                    <span className="text-xs font-medium text-slate-900 line-clamp-1">
                      {r.title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {r.lastUpdated}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Reports list */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Reports</h2>
              <span className="text-[11px] text-slate-500">
                {filteredReports.length} report
                {filteredReports.length > 1 ? 's' : ''} matching your filters.
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => (
              <article
                key={report.id}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span
                      className={`mb-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        report.category === 'COMMERCIAL'
                          ? 'bg-blue-50 text-blue-700'
                          : report.category === 'FINANCE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {report.category === 'COMMERCIAL'
                        ? 'Commercial'
                        : report.category === 'FINANCE'
                        ? 'Finance'
                        : 'PMO'}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {report.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {report.source === 'POWER_BI'
                      ? 'Power BI'
                      : report.source}
                  </span>
                </div>

                <p className="mb-2 text-xs text-slate-600">
                  {report.description}
                </p>

                <div className="mb-2 flex flex-wrap gap-4 text-[11px] text-slate-500">
                  <span>
                    Last updated:{' '}
                    <span className="font-medium text-slate-800">
                      {report.lastUpdated}
                    </span>
                  </span>
                  <span>
                    Views:{' '}
                    <span className="font-medium text-slate-800">
                      {report.views}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800">
                    Open report
                  </button>
                  <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-50">
                    Share
                  </button>
                  <button className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">
                    Add to dashboard
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
        <span>Powalyze Analytics · v1.0</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Language: EN</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Support: PMO &amp; Data Office</span>
      </footer>
    </main>
  );
};

export default AnalyticsHub;
