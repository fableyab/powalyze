import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: 'Observe · Power BI & Data Sources',
    subtitle: 'Les données brutes deviennent des signaux.',
    description:
      'Powalyze connecte vos rapports Power BI, vos dashboards, vos KPIs et vos données opérationnelles. Chaque élément est analysé, contextualisé et enrichi pour détecter les signaux faibles, les anomalies et les tendances.',
    bullets: [
      'Connexion directe Power BI / Data Lake',
      'Détection automatique des variations et anomalies',
      'Analyse croisée Finance / Commercial / PMO / Risques',
      'Extraction des signaux faibles et dépendances',
    ],
    cta: 'Voir Insight Command Center',
    href: '/app/insight-command-center',
  },
  {
    id: 2,
    title: 'Understand · Insight Command Center',
    subtitle: 'Les signaux deviennent une histoire.',
    description:
      "Le Command Center transforme vos données en insights décisionnels. Il révèle les tensions, les contradictions, les opportunités et les risques. C'est votre cockpit analytique.",
    bullets: [
      'Synthèse exécutive automatique',
      'Tensions détectées entre domaines',
      'Collections intelligentes et recommandations',
      'Radar stratégique multi-domaines',
    ],
    cta: 'Ouvrir le Command Center',
    href: '/app/insight-command-center',
  },
  {
    id: 3,
    title: 'Reveal · Cognitive Analytics Theater',
    subtitle: 'Les rapports deviennent des acteurs.',
    description:
      'Le Theater met en scène vos rapports comme des acteurs qui débattent entre eux. Il révèle les conflits stratégiques : croissance vs marges, promesses vs capacité, IA vs infrastructure.',
    bullets: [
      'Rapports transformés en rôles narratifs',
      'Détection des conflits et tensions',
      'Dialogue inter-rapports',
      'Génération automatique de Decision Hooks',
    ],
    cta: 'Entrer dans le Theater',
    href: '/app/theater',
  },
  {
    id: 4,
    title: 'Decide · Executive Decision Room',
    subtitle: "L'histoire devient une décision.",
    description:
      'La Decision Room structure vos arbitrages : faits, risques, impacts, historique, options. Chaque décision devient traçable, gouvernée et exploitable.',
    bullets: [
      'Evidence Board complet',
      'Analyse des risques et impacts',
      'Validation formelle (Approve / Reject / Defer)',
      'Decision Log auditable',
    ],
    cta: 'Ouvrir la Decision Room',
    href: '/app/decision-room',
  },
  {
    id: 5,
    title: 'Impact · Portfolio & Dashboard',
    subtitle: 'La décision devient un changement réel.',
    description:
      'Chaque décision met à jour automatiquement vos KPIs, vos projets, vos risques et vos prévisions. Powalyze devient un système vivant.',
    bullets: [
      'Mise à jour automatique des KPIs',
      'Recalcul des risques et dépendances',
      'Propagation dans le portefeuille',
      'Boucle décisionnelle fermée',
    ],
    cta: 'Voir le Dashboard',
    href: '/app/dashboard-premium',
  },
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 lg:px-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          How Powalyze Works
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
          Powalyze transforme vos données en décisions exécutives grâce à un flux unique :
          Observe → Understand → Reveal → Decide → Impact.
        </p>
      </header>

      {/* Steps */}
      <section className="space-y-10">
        {steps.map((step) => (
          <article
            key={step.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                {step.id}. {step.title}
              </h2>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {step.subtitle}
              </span>
            </div>

            <p className="mb-4 max-w-3xl text-sm text-slate-700">
              {step.description}
            </p>

            <ul className="mb-6 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
              {step.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2"
                >
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to={step.href}
              className="inline-block rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              {step.cta}
            </Link>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 pt-4 text-center text-[11px] text-slate-500">
        Powalyze · Executive Decision System · v1.0
      </footer>
    </main>
  );
};

export default HowItWorks;
