import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function ConsultingAndSaaSPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Consulting & SaaS | Fabrice Fays · PMO Senior · Expert Power BI" 
        description="Conseil + Accompagnement + Plateforme Powalyze modulable" 
      />
      <Header />
      
      <main className="px-6 py-10 lg:px-12 lg:py-12 pt-24">
        {/* HERO */}
        <section className="mb-12 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center container mx-auto max-w-7xl">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              PMO Senior, Data Analyst & Power BI Expert.<br />
              <span className="text-slate-500">
                Et créateur de votre système de décision exécutive modulable.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-600">
              J'accompagne les entreprises dans la structuration, le pilotage et la transformation de leurs
              projets. Je conçois et opère un cockpit de décision sur mesure, combinant conseil de haut niveau
              et plateforme SaaS Powalyze, ajustée à vos besoins et à votre maturité.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <button
                onClick={() => document.getElementById('saas')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
              >
                Découvrir la plateforme Powalyze
              </button>
              <button
                onClick={() => document.getElementById('work-with-me')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-50"
              >
                Travailler avec moi
              </button>
            </div>
          </div>

          {/* Visuel "extraordinaire" stylisé */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-xl">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Executive Decision System
              </p>
              <p className="mt-2 text-sm font-semibold">
                Consulting + SaaS modulable
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Un même partenaire pour structurer vos projets, analyser vos données, et opérer une plateforme
                qui transforme vos décisions au quotidien.
              </p>

              <div className="mt-4 grid gap-3 text-[11px] md:grid-cols-3">
                <div className="rounded-lg bg-slate-800/80 p-3">
                  <p className="font-medium text-slate-100">PMO & Gouvernance</p>
                  <p className="mt-1 text-slate-400">
                    Portefeuilles, arbitrages, risques, priorisation. Un PMO senior à vos côtés.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/80 p-3">
                  <p className="font-medium text-slate-100">Data & Power BI</p>
                  <p className="mt-1 text-slate-400">
                    Modélisation, dashboards, signaux faibles. Vos données deviennent lisibles et actionnables.
                  </p>
                </div>
                <div className="rounded-lg bg-slate-800/80 p-3">
                  <p className="font-medium text-slate-100">SaaS Powalyze</p>
                  <p className="mt-1 text-slate-400">
                    Modules activables selon vos besoins. Un système qui évolue avec votre organisation.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-400">
                <span className="rounded-full border border-slate-700 px-2 py-0.5">
                  Power BI native
                </span>
                <span className="rounded-full border border-slate-700 px-2 py-0.5">
                  Portfolio & PMO
                </span>
                <span className="rounded-full border border-slate-700 px-2 py-0.5">
                  Decision Room
                </span>
                <span className="rounded-full border border-slate-700 px-2 py-0.5">
                  Support longue durée
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-slate-900/10 via-slate-500/10 to-sky-400/20 blur-2xl" />
          </div>
        </section>

        {/* CE QUE TU FAIS */}
        <section className="mb-12 container mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ce que je fais pour vous
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Mon approche repose sur une alliance rare : conseil senior, excellence data, et plateforme SaaS
            prête à l'emploi. Vous n'achetez pas un outil, vous engagez un partenaire qui conçoit et opère
            votre système de pilotage.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                1 · Conseil & PMO senior
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Structurer, prioriser, sécuriser vos projets.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Construction et pilotage de portefeuilles</li>
                <li>• Gouvernance, comités, arbitrages</li>
                <li>• Gestion des risques et dépendances</li>
                <li>• Roadmaps réalistes et assumées</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                2 · Data & Power BI
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Rendre vos données lisibles et utiles.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Modélisation de données orientée décisions</li>
                <li>• Dashboards Power BI exécutifs</li>
                <li>• Détection d'anomalies et signaux faibles</li>
                <li>• Automatisation des reportings</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                3 · SaaS Powalyze
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Un système de décision modulable.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Modules activables selon vos besoins</li>
                <li>• Intégration native Power BI</li>
                <li>• Flux complet : données → décisions</li>
                <li>• Support et accompagnement long terme</li>
              </ul>
            </div>
          </div>
        </section>

        {/* POURQUOI UN SAAS MODULABLE */}
        <section id="saas" className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm container mx-auto max-w-7xl">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Pourquoi un SaaS modulable ?
              </h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">
                Chaque organisation a une maturité, un contexte et des contraintes différentes. Mon approche
                n'est pas de vous imposer un outil, mais de faire évoluer votre cockpit de décision en
                fonction de votre réalité et de vos priorités.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Adapté à votre contexte
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Modules activés au bon moment.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Vous pouvez démarrer par un cockpit Power BI exécutif, puis étendre progressivement vers un
                Portfolio Manager, une Decision Room, ou un module de risques avancé.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Branding & process
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Aligné à votre culture.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                La plateforme est ajustée à vos termes, vos processus, vos rituels de gouvernance. Le but est
                d'augmenter votre organisation, pas de la contraindre.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Long terme
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Un partenariat durable.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Vous ne restez pas seuls face à un outil. Vous gardez un interlocuteur senior, capable de
                faire évoluer votre cockpit au rythme de vos enjeux.
              </p>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA FONCTIONNE */}
        <section className="mb-12 container mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Comment ça fonctionne ?
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Une démarche claire, orientée impact : on ne se perd pas dans l'outil, on se concentre sur ce
            qui change réellement vos décisions et vos résultats.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                1 · Diagnostic
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Comprendre vos enjeux.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Analyse de vos projets, de vos données, de vos outils et de vos rituels de gouvernance.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                2 · Mise en place
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Activer le bon cockpit.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Configuration des modules Powalyze, connexion Power BI, premiers dashboards et décisions tracées.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                3 · Accompagnement
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Opérer ensemble.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                PMO & Data au quotidien : comités, arbitrages, analyses, amélioration continue du cockpit.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                4 · Support & évolution
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Faire vivre le système.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Support adapté à votre abonnement, extensions, nouveaux modules, nouveaux cas d'usage.
              </p>
            </div>
          </div>
        </section>

        {/* MODULES DU SAAS */}
        <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm container mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Les modules clés de Powalyze
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Une plateforme modulaire qui couvre l'ensemble de votre flux décisionnel : de la donnée brute
            jusqu'à la décision formelle et son impact sur vos projets.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Power BI Insight Hub
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Vos rapports deviennent des signaux.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Centralisation, priorisation, et lecture exécutive de vos rapports Power BI.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Cognitive Analytics Theater
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Les rapports débattent entre eux.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Mise en scène des tensions : croissance vs marges, promesses vs capacité, etc.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Executive Decision Room
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Les arbitrages deviennent traçables.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Faits, risques, impacts, décisions et historique réunis dans un espace unique.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Portfolio & Project Health
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Voir l'impact des décisions.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Alignement stratégique, dérives, dépendances, et capacité réelle à livrer.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Risk Intelligence Center
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Anticiper plutôt que subir.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Cartographie dynamique des risques, alertes, et liens avec vos projets et décisions.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Documents & Evidence Hub
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Consolider la preuve.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Centralisation des documents clés liés aux projets, rapports et décisions.
              </p>
            </div>
          </div>
        </section>

        {/* ABONNEMENTS & SUPPORT */}
        <section className="mb-12 container mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Abonnements & support
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            L'outil ne suffit pas. Le vrai différenciateur, c'est la qualité du support, la capacité
            d'adaptation et la présence d'un interlocuteur senior.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Starter
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Pour démarrer simplement.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Accès à un nombre limité de modules</li>
                <li>• Support par email</li>
                <li>• Mises à jour continues</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-900 bg-slate-900 p-4 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Professional
              </p>
              <p className="mt-2 text-sm font-medium">
                Pour PMO, Data & directions.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-200">
                <li>• Modules avancés (Decision Room, Theater, Portfolio…)</li>
                <li>• Support prioritaire</li>
                <li>• Sessions régulières avec moi pour affiner votre cockpit</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Enterprise
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Pour les organisations complexes.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Modules illimités, scénarios sur mesure</li>
                <li>• Support premium et SLA dédié</li>
                <li>• Accompagnement continu au niveau exécutif</li>
              </ul>
            </div>
          </div>
        </section>

        {/* POURQUOI TRAVAILLER AVEC TOI */}
        <section id="work-with-me" className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm container mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Pourquoi travailler avec moi ?
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Vous ne cherchez pas seulement un outil ni un consultant ponctuel. Vous cherchez un partenaire
            capable de comprendre votre réalité, de challenger vos décisions, et de vous apporter un système
            durable pour mieux piloter.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Expérience
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                PMO senior & expert Power BI.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Capable de parler aussi bien au terrain qu'au Comex, avec une obsession : la décision utile.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Système
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Vous ne repartez pas avec des slides.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Vous repartez avec une plateforme opérationnelle, intégrée à vos données, qui vit avec vous.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Long terme
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Relation de confiance.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Mon ambition : devenir une extension naturelle de votre équipe, et non un prestataire de plus.
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mb-4 rounded-2xl border border-slate-900 bg-slate-900 p-6 text-center text-sm text-white shadow-sm container mx-auto max-w-7xl">
          <p className="text-sm font-medium">
            Prêt à transformer votre pilotage de projets et vos décisions ?
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Je vous accompagne. Et je vous équipe avec un système qui vous ressemble.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <button
              onClick={() => navigate('/contact')}
              className="rounded-md bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-100"
            >
              Réserver un échange
            </button>
            <button
              onClick={() => navigate('/app/executive-hub')}
              className="rounded-md border border-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-800"
            >
              Demander une démo de Powalyze
            </button>
          </div>
        </section>

        <footer className="border-t border-slate-200 pt-3 text-[11px] text-slate-500 text-center container mx-auto max-w-7xl">
          Powalyze · Consulting & Modular Executive Decision System · v1.0
        </footer>
      </main>
      <Footer />
    </div>
  );
}
