import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const decisions = [
  {
    id: 'd1',
    title: 'Cloud Migration timing',
    question: "Faut-il maintenir la date cible de fin janvier pour le programme Cloud Migration ?",
    impactSummary:
      "Décision structurante pour les coûts d'infrastructure, la sécurité et la capacité de livraison des équipes.",
    deadline: '2026-01-12',
    status: 'PENDING',
    owner: 'CIO',
    evidence: [
      'Le budget consommé atteint 68% pour 54% de progression.',
      'Aucune interruption majeure rapportée sur les environnements critiques.',
      'Le risque de surcharge des équipes est signalé dans 3 projets dépendants.',
    ],
    risks: [
      "Maintenir la date augmente la pression sur les équipes et le risque d'incident.",
      "Reporter de 2 mois génère un surcoût d'infrastructure estimé à 180k.",
      'Une décision tardive complexifie la coordination avec 4 projets dépendants.',
    ],
    history: [
      '2025-12-10 : Décision préparatoire – validation du scope final.',
      '2025-12-22 : Alerte sur la charge des équipes Ops.',
    ],
  },
  {
    id: 'd2',
    title: 'Budget shift to AI & Data',
    question:
      "Convient-il de réallouer 8% du budget de projets à faible valeur vers les initiatives IA & Data ?",
    impactSummary:
      "Décision à fort impact sur la valeur délivrée Q1 et la trajectoire stratégique data/IA.",
    deadline: '2026-01-20',
    status: 'PENDING',
    owner: 'CFO & CDO',
    evidence: [
      'Les projets IA affichent un ROI projeté 2,3x supérieur à la moyenne.',
      '3 projets Run consomment 12% du budget pour une valeur marginale.',
      "L'alignement stratégique des initiatives IA dépasse 90%.",
    ],
    risks: [
      "Réduire certains budgets Run peut impacter la stabilité opérationnelle.",
      'Nécessite un arbitrage transversal entre IT, Finance et Métiers.',
    ],
    history: ['2025-11-30 : Première recommandation IA émise par Powalyze.'],
  },
  {
    id: 'd3',
    title: 'Closing low-value projects',
    question:
      "Faut-il fermer 2 projets identifiés comme à faible valeur et dérive budgétaire ?",
    impactSummary:
      "Permet de libérer des ressources pour des initiatives plus stratégiques et mieux alignées.",
    deadline: '2026-01-18',
    status: 'PENDING',
    owner: 'PMO',
    evidence: [
      'Les 2 projets concernés cumulent 24% de dépassement budgétaire.',
      "La direction métier n'a pas réaffirmé la priorité depuis 6 mois.",
    ],
    risks: [
      'Perception négative possible du côté des sponsors initiaux.',
      'Éventuels coûts de sortie à gérer contractuellement.',
    ],
    history: ['2025-10-05 : Revue – signal faible sur la pertinence des projets.'],
  },
];

const statusLabel = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  DEFERRED: 'Deferred',
};

const DecisionRoom = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(decisions[0]?.id);
  const [activeTab, setActiveTab] = useState('EVIDENCE');
  const [chosenStatus, setChosenStatus] = useState('APPROVED');
  const [rationale, setRationale] = useState('');

  const selected = decisions.find((d) => d.id === selectedId);

  const listForTab =
    activeTab === 'EVIDENCE'
      ? selected.evidence
      : activeTab === 'RISKS'
      ? selected.risks
      : selected.history;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Executive Decision Room
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Un espace dédié aux décisions structurantes. Powalyze rassemble éléments factuels, risques et historique
            pour sécuriser vos arbitrages.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => navigate('/app/theater')}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Back to Theater
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Export decision log
          </button>
          <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50">
            Share with executive team
          </button>
        </div>
      </header>

      {/* KPI / context */}
      <section className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Decisions awaiting
          </span>
          <p className="text-lg font-semibold text-slate-900">
            {decisions.length}
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Decision horizon
          </span>
          <p className="text-sm font-medium text-slate-900">
            Next {decisions.length} weeks
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Room purpose
          </span>
          <p className="text-sm text-slate-700">
            Clarifier, documenter et sécuriser vos choix stratégiques.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Decision focus + evidence */}
        <section className="space-y-4">
          {/* Decision selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Decision focus
                </h2>
                <span className="text-[11px] text-slate-500">
                  Sélectionnez une décision à préparer et à arbitrer.
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {decisions.map((d) => {
                const isSelected = d.id === selectedId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedId(d.id)}
                    className={[
                      'flex flex-col rounded-lg border px-3 py-3 text-left text-xs shadow-sm transition',
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300 hover:bg-white',
                    ].join(' ')}
                  >
                    <span className="mb-1 text-[11px] font-medium uppercase tracking-wide">
                      {statusLabel[d.status]}
                    </span>
                    <span
                      className={[
                        'text-[13px] font-semibold',
                        isSelected ? 'text-white' : 'text-slate-900',
                      ].join(' ')}
                    >
                      {d.title}
                    </span>
                    <span
                      className={[
                        'mt-1 line-clamp-3',
                        isSelected ? 'text-slate-100' : 'text-slate-600',
                      ].join(' ')}
                    >
                      {d.impactSummary}
                    </span>
                    <span
                      className={[
                        'mt-2 text-[11px]',
                        isSelected ? 'text-slate-200' : 'text-slate-500',
                      ].join(' ')}
                    >
                      Deadline: {d.deadline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evidence / Risks / History */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-slate-900">
                {selected.title}
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                {selected.question}
              </p>
            </div>

            <div className="mb-3 flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('EVIDENCE')}
                className={[
                  'rounded-md px-2 py-1',
                  activeTab === 'EVIDENCE'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                ].join(' ')}
              >
                Evidence
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('RISKS')}
                className={[
                  'rounded-md px-2 py-1',
                  activeTab === 'RISKS'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                ].join(' ')}
              >
                Risks &amp; trade-offs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('HISTORY')}
                className={[
                  'rounded-md px-2 py-1',
                  activeTab === 'HISTORY'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                ].join(' ')}
              >
                History
              </button>
            </div>

            <ul className="space-y-2 text-sm text-slate-700">
              {listForTab.map((line, index) => (
                <li
                  key={index}
                  className="flex gap-2 rounded-md bg-slate-50 px-3 py-2"
                >
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Commit panel */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Commit decision
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Enregistrée avec owner, date et justification. Exploitable en audit et en revue exécutive.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Decision status
              </label>
              <select
                value={chosenStatus}
                onChange={(e) => setChosenStatus(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-xs text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="APPROVED">Approve</option>
                <option value="REJECTED">Reject</option>
                <option value="DEFERRED">Defer</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Decision owner
              </label>
              <input
                type="text"
                value={selected.owner}
                readOnly
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Rationale
              </label>
              <textarea
                rows={5}
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="Expliquez les éléments qui soutiennent votre décision (faits, risques acceptés, alternatives écartées…)."
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-xs text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                // Simulation de commit
                console.log('Decision committed:', {
                  decision: selected.title,
                  status: chosenStatus,
                  owner: selected.owner,
                  rationale,
                  timestamp: new Date().toISOString(),
                });
                alert(`Decision "${selected.title}" committed as ${chosenStatus}.\n\nImpact:\n- KPIs will update\n- Portfolio will reflect changes\n- Theater will generate new act`);
                // Navigate to portfolio to see impact
                setTimeout(() => navigate('/app/portfolio-premium'), 1000);
              }}
              className="mt-2 w-full rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              Confirm decision and log
            </button>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                Decision impact preview
              </h3>
              <p className="mt-1 text-xs text-slate-700">
                Cette décision sera archivée, traçable dans l'historique exécutif, et exploitable pour les revues de gouvernance.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500">
        <span>Powalyze Decision Room · v1.0</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Designed for executive governance</span>
      </footer>
    </main>
  );
};

export default DecisionRoom;
