import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reports = [
  {
    id: 'r1',
    name: 'Dashboard Commercial',
    role: 'VALUE_HUNTER',
    source: 'POWER_BI',
    summary:
      'Les ventes Q1 sont en forte progression, mais fortement concentrées sur 2 segments clients.',
    keySignals: [
      'Croissance du pipeline à +18% vs Q4.',
      'Dépendance à 2 comptes majeurs représentant 41% du chiffre.',
      'Objectifs dépassés sur 3 régions, en retard sur 2.',
    ],
    tensionWith: ['r2'],
    alignmentScore: 88,
    riskImpact: 'MEDIUM',
  },
  {
    id: 'r2',
    name: 'Analyse Financière Q4',
    role: 'MARGIN_GUARDIAN',
    source: 'POWER_BI',
    summary:
      'Les marges sont sous pression sur les offres les plus vendues, avec une hausse nette des remises.',
    keySignals: [
      'Taux de remise moyen en hausse de 3,2 points.',
      'Marge brute en baisse sur 2 produits phares.',
      'Coûts opérationnels stables sur le périmètre.',
    ],
    tensionWith: ['r1'],
    alignmentScore: 76,
    riskImpact: 'HIGH',
  },
  {
    id: 'r3',
    name: 'KPIs Projet PMO',
    role: 'RISK_MASTER',
    source: 'POWER_BI',
    summary:
      'Plusieurs projets structurants sont en retard, avec des impacts potentiels sur la capacité à livrer.',
    keySignals: [
      '3 projets critiques en dérive planning > 30 jours.',
      "2 initiatives IA ne disposent pas encore de sponsor clair.",
      'Le programme Cloud Migration est sous forte tension de ressources.',
    ],
    tensionWith: ['r1', 'r2'],
    alignmentScore: 91,
    riskImpact: 'HIGH',
  },
];

const tensions = [
  {
    id: 't1',
    title: 'Croissance vs Marges',
    description:
      'Le rapport Commercial affiche une forte croissance, alors que le rapport Finance signale une érosion des marges sur les offres les plus vendues.',
    reportsInvolved: ['r1', 'r2'],
    severity: 'HIGH',
    decisionHook:
      "Faut-il ajuster la politique de remise et revoir le mix d'offres prioritaires ?",
  },
  {
    id: 't2',
    title: 'Promesses commerciales vs Capacité de delivery',
    description:
      'Les engagements commerciaux sur Q1 reposent sur des capacités dépendant de projets en dérive dans le portefeuille PMO.',
    reportsInvolved: ['r1', 'r3'],
    severity: 'HIGH',
    decisionHook:
      'Faut-il replanifier certaines livraisons ou ajuster les engagements clients ?',
  },
  {
    id: 't3',
    title: 'Investissements IA vs Risque opérationnel',
    description:
      "Les projets IA affichent un potentiel de valeur élevé, mais s'appuient sur une infrastructure cloud encore sous tension.",
    reportsInvolved: ['r2', 'r3'],
    severity: 'MEDIUM',
    decisionHook:
      "Faut-il séquencer différemment les investissements IA en fonction de la maturité infrastructure ?",
  },
];

const roleLabel = {
  VALUE_HUNTER: 'Chasseur de valeur',
  MARGIN_GUARDIAN: 'Gardien des marges',
  RISK_MASTER: 'Maître des risques',
};

const roleColor = {
  VALUE_HUNTER: 'bg-blue-50 text-blue-700',
  MARGIN_GUARDIAN: 'bg-emerald-50 text-emerald-700',
  RISK_MASTER: 'bg-amber-50 text-amber-700',
};

const severityColor = {
  LOW: 'bg-slate-50 text-slate-700 border-slate-200',
  MEDIUM: 'bg-amber-50 text-amber-800 border-amber-200',
  HIGH: 'bg-red-50 text-red-800 border-red-200',
};

const TheaterPage = () => {
  const navigate = useNavigate();
  const [selectedReportId, setSelectedReportId] = useState('r1');
  const [selectedTensionId, setSelectedTensionId] = useState('t1');

  const selectedReport = useMemo(
    () => reports.find((r) => r.id === selectedReportId),
    [selectedReportId],
  );

  const selectedTension = useMemo(
    () => tensions.find((t) => t.id === selectedTensionId),
    [selectedTensionId],
  );

  const involvedReportsForTension = useMemo(
    () =>
      selectedTension.reportsInvolved
        .map((id) => reports.find((r) => r.id === id))
        .filter(Boolean),
    [selectedTension],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Cognitive Analytics Theater
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Vos rapports ne sont plus des fichiers statiques. Ils deviennent des acteurs qui débattent, se contredisent
            et révèlent les tensions stratégiques de votre organisation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Launch theater mode
          </button>
          <button 
            onClick={() => navigate('/app/decision-room')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Send to Decision Room
          </button>
        </div>
      </header>

      {/* Stage intro */}
      <section className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Reports on stage
          </span>
          <p className="text-lg font-semibold text-slate-900">{reports.length}</p>
          <p className="text-xs text-slate-600">
            Commercial, Finance, PMO – une vision croisée de votre réalité.
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Active tensions
          </span>
          <p className="text-lg font-semibold text-slate-900">
            {tensions.length}
          </p>
          <p className="text-xs text-slate-600">
            Conflits constructifs entre croissance, marges et risques.
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Theater purpose
          </span>
          <p className="text-sm text-slate-700">
            Mettre en scène ce que vos rapports essaient de vous dire – avant vos prochaines décisions.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]">
        {/* Left side: actors + chosen report */}
        <section className="space-y-4">
          {/* Actors on stage */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Actors on stage
                </h2>
                <span className="text-[11px] text-slate-500">
                  Chaque rapport prend un rôle dans votre récit stratégique.
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {reports.map((report) => {
                const isSelected = report.id === selectedReportId;
                return (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => setSelectedReportId(report.id)}
                    className={[
                      'flex flex-col rounded-lg border px-3 py-3 text-left text-xs shadow-sm transition',
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-white',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'mb-1 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
                        isSelected
                          ? 'bg-slate-800 text-slate-50'
                          : roleColor[report.role],
                      ].join(' ')}
                    >
                      {roleLabel[report.role]}
                    </span>
                    <span
                      className={[
                        'text-[13px] font-semibold',
                        isSelected ? 'text-white' : 'text-slate-900',
                      ].join(' ')}
                    >
                      {report.name}
                    </span>
                    <span
                      className={[
                        'mt-1 line-clamp-3',
                        isSelected ? 'text-slate-100' : 'text-slate-600',
                      ].join(' ')}
                    >
                      {report.summary}
                    </span>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span
                        className={
                          isSelected ? 'text-slate-200' : 'text-slate-500'
                        }
                      >
                        Source: {report.source}
                      </span>
                      <span
                        className={
                          isSelected ? 'text-slate-200' : 'text-slate-500'
                        }
                      >
                        Alignment: {report.alignmentScore}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected report monologue */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {selectedReport.name} · Monologue
                </h2>
                <span className="text-[11px] text-slate-500">
                  Ce que ce rapport essaie de vous dire, ici et maintenant.
                </span>
              </div>
            </div>

            <p className="mb-3 text-sm text-slate-700">
              {selectedReport.summary}
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              {selectedReport.keySignals.map((signal, index) => (
                <li
                  key={index}
                  className="flex gap-2 rounded-md bg-slate-50 px-3 py-2"
                >
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right side: tensions + decision hook */}
        <section className="space-y-4">
          {/* Tensions board */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Tensions on stage
                </h2>
                <span className="text-[11px] text-slate-500">
                  Conflits constructifs entre rapports – là où se cache la vraie décision.
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {tensions.map((tension) => {
                const isSelected = tension.id === selectedTensionId;
                const severityStyles = severityColor[tension.severity];
                return (
                  <button
                    key={tension.id}
                    type="button"
                    onClick={() => setSelectedTensionId(tension.id)}
                    className={[
                      'flex w-full flex-col rounded-lg border px-3 py-3 text-left text-xs shadow-sm transition',
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : severityStyles,
                    ].join(' ')}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span
                        className={[
                          'text-[11px] font-semibold uppercase tracking-wide',
                          isSelected ? 'text-slate-100' : 'text-slate-700',
                        ].join(' ')}
                      >
                        {tension.title}
                      </span>
                      <span
                        className={[
                          'rounded-full px-2 py-0.5 text-[10px] font-medium',
                          isSelected
                            ? 'bg-slate-800 text-slate-50'
                            : 'bg-white/70 text-slate-800',
                        ].join(' ')}
                      >
                        {tension.severity === 'HIGH'
                          ? 'High'
                          : tension.severity === 'MEDIUM'
                          ? 'Medium'
                          : 'Low'}{' '}
                        tension
                      </span>
                    </div>
                    <span
                      className={[
                        'mt-1 line-clamp-3',
                        isSelected ? 'text-slate-100' : 'text-slate-700',
                      ].join(' ')}
                    >
                      {tension.description}
                    </span>
                    <span
                      className={[
                        'mt-2 text-[11px]',
                        isSelected ? 'text-slate-200' : 'text-slate-600',
                      ].join(' ')}
                    >
                      Reports: {tension.reportsInvolved.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dialogue & decision hook */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Scene focus · {selectedTension.title}
              </h2>
              <span className="text-[11px] text-slate-500">
                Dialogue entre rapports et question de décision associée.
              </span>
            </div>

            <div className="mb-3 space-y-2 rounded-md bg-slate-50 p-3 text-xs text-slate-700">
              {involvedReportsForTension.map((report) => (
                <div key={report.id} className="flex gap-2">
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <p>
                    <span className="font-semibold">{report.name} :</span>{' '}
                    "{report.summary}"
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-3">
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Decision hook
              </span>
              <p className="mt-1 text-sm text-slate-800">
                {selectedTension.decisionHook}
              </p>
              <p className="mt-2 text-[11px] text-slate-500">
                Envoyez cette tension dans la Decision Room pour arbitrage formel.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button 
                  onClick={() => navigate('/app/decision-room')}
                  className="rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                >
                  Open in Decision Room
                </button>
                <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50">
                  Share scene
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
        <span>Powalyze Cognitive Analytics Theater · v1.0</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>From static reports to living stories</span>
      </footer>
    </main>
  );
};

export default TheaterPage;
