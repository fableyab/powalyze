import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Zap, Share2, Theater, Gavel } from 'lucide-react';
import { insightReports, domainLabel, domainBadgeClass } from '../data/insightData';

const InsightCommandCenter = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('ALL');
  const [sort, setSort] = useState('MOST_VIEWED');

  const totalReports = insightReports.length;
  const totalViews = insightReports.reduce((sum, r) => sum + r.views, 0);
  const domainsCovered = new Set(insightReports.map((r) => r.domain)).size;
  const alertsCount = insightReports.filter((r) => r.hasAlert).length;

  const mostViewed = insightReports.reduce((top, r) =>
    !top || r.views > top.views ? r : top,
  );

  const lastUpdated = insightReports
    .map((r) => r.lastUpdated)
    .sort()
    .slice(-1)[0];

  const filteredReports = useMemo(() => {
    let result = [...insightReports];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }

    if (domain !== 'ALL') {
      result = result.filter((r) => r.domain === domain);
    }

    if (sort === 'MOST_VIEWED') {
      result = result.sort((a, b) => b.views - a.views);
    } else {
      result = result.sort(
        (a, b) => a.lastUpdated.localeCompare(b.lastUpdated) * -1,
      );
    }

    return result;
  }, [search, domain, sort]);

  const favoriteReports = insightReports.filter((r) => r.isFavorite);
  const recentReports = [...insightReports].sort(
    (a, b) => a.lastUpdated.localeCompare(b.lastUpdated) * -1,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Premium Insight Header */}
      <header className="mb-10">
        <h1 className="mb-6 text-center text-2xl font-medium text-slate-700 md:text-3xl">
          Voici ce que vos données essaient de vous dire aujourd'hui.
        </h1>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
            <TrendingUp className="mt-0.5 text-emerald-400" size={20} />
            <div>
              <p className="text-sm font-medium text-white">
                Croissance commerciale forte mais concentrée
              </p>
              <span className="mt-1 text-xs text-slate-400">
                Pipeline +18% mais 41% sur 2 comptes
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
            <AlertTriangle className="mt-0.5 text-amber-400" size={20} />
            <div>
              <p className="text-sm font-medium text-white">
                Marge sous pression sur Q4
              </p>
              <span className="mt-1 text-xs text-slate-400">
                Remises +3.2 pts, marge brute en baisse
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
            <Zap className="mt-0.5 text-rose-400" size={20} />
            <div>
              <p className="text-sm font-medium text-white">
                3 projets critiques PMO détectés
              </p>
              <span className="mt-1 text-xs text-slate-400">
                Dérive planning &gt;30 jours, tension ressources
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Insight Radar */}
      <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Insight Radar
          </h2>
          <p className="text-xs text-slate-500">
            Niveau de tension par domaine stratégique
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-5 gap-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 h-24 w-2 rounded-full bg-gradient-to-t from-emerald-200 to-emerald-600" />
            <span className="text-xs font-medium text-slate-700">Finance</span>
            <span className="text-[10px] text-slate-500">76%</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 h-32 w-2 rounded-full bg-gradient-to-t from-blue-200 to-blue-600" />
            <span className="text-xs font-medium text-slate-700">Commercial</span>
            <span className="text-[10px] text-slate-500">88%</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 h-36 w-2 rounded-full bg-gradient-to-t from-amber-200 to-amber-600" />
            <span className="text-xs font-medium text-slate-700">PMO</span>
            <span className="text-[10px] text-slate-500">91%</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 h-28 w-2 rounded-full bg-gradient-to-t from-rose-200 to-rose-600" />
            <span className="text-xs font-medium text-slate-700">Risques</span>
            <span className="text-[10px] text-slate-500">82%</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2 h-20 w-2 rounded-full bg-gradient-to-t from-violet-200 to-violet-600" />
            <span className="text-xs font-medium text-slate-700">Stratégie</span>
            <span className="text-[10px] text-slate-500">71%</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Plus la barre est haute, plus le domaine nécessite votre attention.
        </p>
      </section>

      {/* Filters */}
      <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search reports by name or description…"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="ALL">Domain: All</option>
            <option value="FINANCE">Finance</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="PMO">PMO</option>
            <option value="RISK">Risk</option>
            <option value="STRATEGY">Strategy</option>
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

      {/* Main grid: collections + reports */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Collections / Smart sections */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Smart collections
            </h2>
            <span className="text-[11px] text-slate-500">
              Accès rapide aux rapports qui comptent vraiment pour vous.
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-1">
            {/* Recommended for you */}
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recommended for you
              </h3>
              <p className="mb-2 text-[11px] text-slate-500">
                Basé sur les vues, les favoris et les domaines à forte tension.
              </p>
              <ul className="space-y-1">
                {[insightReports[0], insightReports[1], insightReports[3]]
                  .filter(Boolean)
                  .map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-900 line-clamp-1">
                          {r.name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {domainLabel[r.domain]} · {r.views} views
                        </span>
                      </div>
                      {r.hasAlert && (
                        <span className="ml-2 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">
                          Alert
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Favorites */}
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Favorites
              </h3>
              <ul className="space-y-1">
                {favoriteReports.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between rounded-md border border-slate-100 bg-white px-3 py-2"
                  >
                    <span className="text-xs font-medium text-slate-900 line-clamp-1">
                      {r.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {r.views} views
                    </span>
                  </li>
                ))}
                {favoriteReports.length === 0 && (
                  <p className="text-[11px] text-slate-500">
                    No favorite reports yet.
                  </p>
                )}
              </ul>
            </div>

            {/* Recently viewed */}
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
                      {r.name}
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
              <h2 className="text-sm font-semibold text-slate-900">
                Reports
              </h2>
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
                className="group rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span
                      className={[
                        'inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        domainBadgeClass[report.domain],
                      ].join(' ')}
                    >
                      {domainLabel[report.domain]}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900">
                      {report.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
                      {report.status === 'FINALIZED' ? '✓ Finalized' : '○ Draft'}
                    </span>
                    {report.hasAlert && (
                      <span className="flex items-center gap-1 rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700">
                        ⚠ Alert
                      </span>
                    )}
                  </div>
                </div>

                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  {report.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-slate-700">Updated:</span>
                    {report.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-slate-700">Views:</span>
                    {report.views}
                  </span>
                </div>

                {report.hasAlert && (
                  <div className="mb-3 rounded-md border-l-4 border-rose-400 bg-rose-50 px-3 py-2">
                    <p className="text-xs font-medium text-rose-800">
                      Tension détectée sur ce domaine
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800">
                    <span>Open report</span>
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
                    <Share2 size={12} />
                    <span>Share</span>
                  </button>
                  <button 
                    onClick={() => navigate('/app/theater')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100"
                  >
                    <Theater size={12} />
                    <span>Open in Theater</span>
                  </button>
                  <button 
                    onClick={() => navigate('/app/decision-room')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900 hover:bg-emerald-100"
                  >
                    <Gavel size={12} />
                    <span>Send to Decision Room</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {/* Tensions détectées */}
      <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Tensions détectées
          </h2>
          <p className="text-xs text-slate-500">
            Conflits stratégiques identifiés entre domaines
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <button
            onClick={() => navigate('/app/theater')}
            className="group flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-left transition hover:border-red-300 hover:bg-red-100"
          >
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm font-semibold text-red-900">
                Croissance vs Marges
              </p>
              <span className="text-xs text-red-700">
                Commercial pousse, Finance alerte
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/theater')}
            className="group flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left transition hover:border-amber-300 hover:bg-amber-100"
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Promesses vs Delivery
              </p>
              <span className="text-xs text-amber-700">
                Écart entre pipeline et capacité PMO
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/theater')}
            className="group flex items-start gap-3 rounded-lg border border-violet-200 bg-violet-50 p-4 text-left transition hover:border-violet-300 hover:bg-violet-100"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-semibold text-violet-900">
                IA vs Infrastructure
              </p>
              <span className="text-xs text-violet-700">
                Investissements IA sans ressources Cloud
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section className="mb-10 rounded-xl border border-slate-300 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center shadow-xl">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Prêt à analyser ces tensions ?
        </h2>
        <p className="mb-6 text-sm text-slate-300">
          Le Cognitive Analytics Theater transforme vos rapports en acteurs qui débattent et révèlent les conflits stratégiques.
        </p>
        <button
          onClick={() => navigate('/app/theater')}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
        >
          <Theater size={20} />
          <span>Analyser ces tensions dans le Cognitive Analytics Theater →</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
        <span>Powalyze Insight Command Center · v1.0</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>From static reports to decision-ready insights</span>
      </footer>
    </main>
  );
};

export default InsightCommandCenter;
