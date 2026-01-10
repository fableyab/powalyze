import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Theater, 
  Gavel, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ExecutiveHub = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10 lg:py-10">
      {/* Hero Header */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-slate-900 p-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Executive Command Center
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-600">
          La première plateforme qui transforme vos données en décisions exécutives.
          <br />
          <span className="font-medium text-slate-900">Explorer → Comprendre → Arbitrer.</span>
        </p>
      </header>

      {/* KPI Ribbon */}
      <section className="mb-12 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-4">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">8</p>
          <span className="text-xs text-slate-600">Reports analysés</span>
        </div>
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">3</p>
          <span className="text-xs text-slate-600">Tensions actives</span>
        </div>
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <Gavel className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">3</p>
          <span className="text-xs text-slate-600">Décisions en attente</span>
        </div>
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <TrendingUp className="h-5 w-5 text-slate-600" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">94%</p>
          <span className="text-xs text-slate-600">Strategic alignment</span>
        </div>
      </section>

      {/* The Cognitive Chain */}
      <section className="mb-8">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Votre chaîne cognitive
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Module 1: Analytics Hub */}
          <Link
            to="/app/analytics-hub"
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="absolute right-4 top-4 opacity-10 transition group-hover:opacity-20">
              <BarChart3 className="h-20 w-20 text-blue-600" />
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>

              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Analytics Hub
                </h3>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                  ÉTAPE 1
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-600">
                Explorez vos 8 rapports stratégiques. Identifiez les signaux,
                les tendances et les anomalies.
              </p>

              <div className="mb-4 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>8 reports avec filtres et collections</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>AI insights sur les patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>1,994 vues cumulées</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-blue-600 group-hover:gap-3 transition-all">
                <span>Explorer les rapports</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          {/* Module 2: Theater */}
          <Link
            to="/app/theater"
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="absolute right-4 top-4 opacity-10 transition group-hover:opacity-20">
              <Theater className="h-20 w-20 text-amber-600" />
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex rounded-lg bg-amber-50 p-3">
                <Theater className="h-6 w-6 text-amber-600" />
              </div>

              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Analytics Theater
                </h3>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                  ÉTAPE 2
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-600">
                Vos rapports deviennent des acteurs. Ils dialoguent, se
                contredisent et révèlent les tensions stratégiques.
              </p>

              <div className="mb-4 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>3 acteurs : Value, Margin, Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>3 tensions détectées</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Decision hooks générés</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-amber-600 group-hover:gap-3 transition-all">
                <span>Voir les tensions</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          {/* Module 3: Decision Room */}
          <Link
            to="/app/decision-room"
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="absolute right-4 top-4 opacity-10 transition group-hover:opacity-20">
              <Gavel className="h-20 w-20 text-emerald-600" />
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3">
                <Gavel className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Decision Room
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  ÉTAPE 3
                </span>
              </div>

              <p className="mb-4 text-sm text-slate-600">
                Transformez les tensions en décisions formelles. Avec les
                faits, les risques et la traçabilité complète.
              </p>

              <div className="mb-4 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>3 décisions à arbitrer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Evidence + Risks + History</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Commit formel et traçable</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 group-hover:gap-3 transition-all">
                <span>Arbitrer maintenant</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Actions rapides
        </h2>
        <div className="grid gap-3 md:grid-cols-4">
          <Link
            to="/app/portfolio"
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-xs font-medium text-slate-900">
              Portfolio Overview
            </p>
            <p className="mt-1 text-[11px] text-slate-600">8 projets actifs</p>
          </Link>
          <Link
            to="/app/projects"
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-xs font-medium text-slate-900">Projects</p>
            <p className="mt-1 text-[11px] text-slate-600">4 projets listés</p>
          </Link>
          <Link
            to="/app/dashboard-premium"
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-xs font-medium text-slate-900">
              Executive Dashboard
            </p>
            <p className="mt-1 text-[11px] text-slate-600">Vue consolidée</p>
          </Link>
          <Link
            to="/app/alerts"
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-xs font-medium text-slate-900">Risk Intelligence</p>
            <p className="mt-1 text-[11px] text-slate-600">
              Centre de renseignement
            </p>
          </Link>
        </div>
      </section>

      {/* New Pages Access */}
      <section className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Découvrir Powalyze
        </h2>
        <div className="grid gap-3 md:grid-cols-4">
          <Link
            to="/app/how-it-works"
            className="rounded-lg border border-blue-200 bg-white p-3 text-center transition hover:border-blue-400 hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-900">
              Comment ça marche
            </p>
            <p className="mt-1 text-[11px] text-slate-600">5 étapes clés</p>
          </Link>
          <Link
            to="/app/pitch-deck"
            className="rounded-lg border border-blue-200 bg-white p-3 text-center transition hover:border-blue-400 hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-900">Pitch Deck</p>
            <p className="mt-1 text-[11px] text-slate-600">10 slides interactifs</p>
          </Link>
          <Link
            to="/consulting"
            className="rounded-lg border border-blue-200 bg-white p-3 text-center transition hover:border-blue-400 hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-900">Consulting & SaaS</p>
            <p className="mt-1 text-[11px] text-slate-600">Offre modulable</p>
          </Link>
          <Link
            to="/about"
            className="rounded-lg border border-blue-200 bg-white p-3 text-center transition hover:border-blue-400 hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-900">À propos</p>
            <p className="mt-1 text-[11px] text-slate-600">PMO Senior · Expert BI</p>
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-white">
          Ce que Powalyze change
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 text-left md:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Avant
            </p>
            <p className="text-sm text-white">
              Vous avez 50 rapports. Vous ne savez pas quoi regarder ni quoi
              décider.
            </p>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Maintenant
            </p>
            <p className="text-sm text-white">
              Powalyze révèle les 3 tensions qui comptent et les décisions à
              prendre.
            </p>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Résultat
            </p>
            <p className="text-sm text-white">
              Vous passez de l'analyse paralysante à l'arbitrage éclairé.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-slate-200 pt-6 text-[11px] text-slate-500">
        <span>Powalyze Executive Command Center · v1.0</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>From data to decisions</span>
      </footer>
    </main>
  );
};

export default ExecutiveHub;
