import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    type: 'title',
    title: 'Powalyze',
    subtitle: 'The Executive Decision System',
    tagline: 'Transformez vos données en décisions exécutives.',
    flow: 'Power BI → Insights → Tensions → Décisions → Impact.',
  },
  {
    id: 2,
    type: 'problem',
    title: 'The Problem',
    headline: 'Les organisations ne manquent pas de données.',
    subheadline: 'Elles manquent de décisions claires.',
    issues: [
      'Trop de rapports',
      'Trop de KPIs',
      'Trop de réunions',
      'Pas assez de décisions',
      'Pas de traçabilité',
      "Pas d'alignement entre Finance, Commercial, PMO, Risques",
    ],
    conclusion: "Les outils actuels montrent ce qui s'est passé. Aucun ne dit ce qu'il faut décider.",
  },
  {
    id: 3,
    type: 'vision',
    title: 'The Vision',
    headline: 'Powalyze crée une nouvelle catégorie :',
    category: 'Le Système de Décision Exécutive',
    capabilities: [
      'Il observe vos données',
      'Il comprend vos tensions',
      'Il révèle vos conflits stratégiques',
      'Il structure vos arbitrages',
      'Il met à jour vos KPIs automatiquement',
    ],
    tagline: 'Powalyze ne remplace pas vos outils. Il remplace vos réunions.',
  },
  {
    id: 4,
    type: 'flow',
    title: 'The Flow',
    headline: 'Le flux décisionnel Powalyze',
    flow: 'Observe → Understand → Reveal → Decide → Impact',
    steps: [
      { label: 'Observe', detail: 'Power BI & Data' },
      { label: 'Understand', detail: 'Insight Command Center' },
      { label: 'Reveal', detail: 'Cognitive Analytics Theater' },
      { label: 'Decide', detail: 'Executive Decision Room' },
      { label: 'Impact', detail: 'Dashboard & Portfolio' },
    ],
    tagline: 'Un pipeline décisionnel unique au monde.',
  },
  {
    id: 5,
    type: 'step',
    step: 1,
    title: 'Step 1: Observe',
    headline: 'Power BI → Signals',
    subtitle: 'Les données brutes deviennent des signaux.',
    features: [
      'Connexion Power BI / Data Lake',
      "Détection d'anomalies",
      'Analyse croisée Finance / Commercial / PMO',
      'Extraction des signaux faibles',
    ],
    tagline: 'Powalyze ne lit pas vos données. Il les interprète.',
  },
  {
    id: 6,
    type: 'step',
    step: 2,
    title: 'Step 2: Understand',
    headline: 'Insight Command Center',
    subtitle: 'Les signaux deviennent une histoire.',
    features: [
      'Synthèse exécutive automatique',
      'Radar stratégique multi-domaines',
      'Collections intelligentes',
      'Détection des tensions',
    ],
    tagline: 'Votre cockpit analytique.',
  },
  {
    id: 7,
    type: 'step',
    step: 3,
    title: 'Step 3: Reveal',
    headline: 'Cognitive Analytics Theater',
    subtitle: 'Les rapports deviennent des acteurs.',
    actors: [
      { name: 'Commercial', role: 'Chasseur de Valeur' },
      { name: 'Finance', role: 'Gardien des Marges' },
      { name: 'PMO', role: 'Maître des Risques' },
      { name: 'Risk', role: 'Sentinelle des Incidents' },
    ],
    narrative: [
      'Ils débattent.',
      'Ils se contredisent.',
      'Ils révèlent les conflits stratégiques.',
    ],
    tagline: "C'est inédit.",
  },
  {
    id: 8,
    type: 'step',
    step: 4,
    title: 'Step 4: Decide',
    headline: 'Executive Decision Room',
    subtitle: "L'histoire devient une décision.",
    features: [
      'Evidence Board',
      'Analyse des risques',
      'Options (Approve / Reject / Defer)',
      'Rationale & Owner',
      'Decision Log auditable',
    ],
    tagline: 'Chaque décision devient traçable, gouvernée et exploitable.',
  },
  {
    id: 9,
    type: 'step',
    step: 5,
    title: 'Step 5: Impact',
    headline: 'Dashboard & Portfolio',
    subtitle: 'La décision devient un changement réel.',
    features: [
      'Mise à jour automatique des KPIs',
      'Recalcul des risques',
      'Replanification des projets',
      'Alignement stratégique renforcé',
    ],
    tagline: 'Powalyze devient un système vivant.',
  },
  {
    id: 10,
    type: 'closing',
    title: 'Powalyze',
    headline: 'From data to decisions.',
    subtitle: 'Le premier système de décision exécutive.',
    ctas: [
      { label: 'Demander une démo', href: '/contact' },
      { label: 'Accéder au Cognitive Theater', href: '/app/theater' },
      { label: 'Ouvrir la Decision Room', href: '/app/decision-room' },
    ],
  },
];

const PitchDeck = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-900 px-6 py-8">
      {/* Home button */}
      <button
        onClick={() => navigate('/app/executive-hub')}
        className="absolute left-6 top-6 rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
      >
        <Home size={20} />
      </button>

      {/* Slide container */}
      <div className="relative h-[600px] w-full max-w-5xl rounded-xl border border-slate-700 bg-slate-800 p-12 shadow-2xl">
        {/* Slide 1: Title */}
        {slide.type === 'title' && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-white">
              {slide.title}
            </h1>
            <p className="mb-2 text-2xl font-medium text-slate-300">
              {slide.subtitle}
            </p>
            <p className="mb-8 text-lg text-slate-400">{slide.tagline}</p>
            <div className="mt-8 rounded-lg border border-slate-600 bg-slate-700/50 px-6 py-3">
              <p className="text-sm font-medium text-slate-200">{slide.flow}</p>
            </div>
          </div>
        )}

        {/* Slide 2: Problem */}
        {slide.type === 'problem' && (
          <div className="flex h-full flex-col justify-center">
            <h2 className="mb-4 text-4xl font-semibold text-white">
              {slide.title}
            </h2>
            <p className="mb-2 text-2xl font-medium text-slate-300">
              {slide.headline}
            </p>
            <p className="mb-8 text-xl text-rose-400">{slide.subheadline}</p>

            <div className="mb-8 grid grid-cols-2 gap-3">
              {slide.issues.map((issue, i) => (
                <div
                  key={i}
                  className="rounded-md border border-slate-600 bg-slate-700/50 px-4 py-3"
                >
                  <span className="text-sm text-slate-300">{issue}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-4">
              <p className="text-base font-medium text-amber-200">
                {slide.conclusion}
              </p>
            </div>
          </div>
        )}

        {/* Slide 3: Vision */}
        {slide.type === 'vision' && (
          <div className="flex h-full flex-col justify-center">
            <h2 className="mb-4 text-4xl font-semibold text-white">
              {slide.title}
            </h2>
            <p className="mb-2 text-xl text-slate-300">{slide.headline}</p>
            <p className="mb-8 text-3xl font-bold text-emerald-400">
              {slide.category}
            </p>

            <ul className="mb-8 space-y-3">
              {slide.capabilities.map((cap, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-md bg-slate-700/50 px-4 py-3"
                >
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-base text-slate-200">{cap}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-lg border border-slate-600 bg-slate-700/50 px-6 py-4 text-center">
              <p className="text-lg font-medium text-white">{slide.tagline}</p>
            </div>
          </div>
        )}

        {/* Slide 4: Flow */}
        {slide.type === 'flow' && (
          <div className="flex h-full flex-col justify-center">
            <h2 className="mb-4 text-4xl font-semibold text-white">
              {slide.title}
            </h2>
            <p className="mb-2 text-xl text-slate-300">{slide.headline}</p>
            <p className="mb-8 text-2xl font-bold text-blue-400">
              {slide.flow}
            </p>

            <div className="mb-8 space-y-3">
              {slide.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-700/50 px-6 py-4"
                >
                  <span className="text-lg font-semibold text-white">
                    {i + 1}. {step.label}
                  </span>
                  <span className="text-sm text-slate-400">{step.detail}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-center">
              <p className="text-base font-medium text-blue-200">
                {slide.tagline}
              </p>
            </div>
          </div>
        )}

        {/* Slide 5-9: Steps */}
        {slide.type === 'step' && (
          <div className="flex h-full flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-slate-700 px-4 py-1 text-sm font-medium text-slate-300">
                Step {slide.step}/5
              </span>
              <h2 className="text-3xl font-semibold text-white">
                {slide.title}
              </h2>
            </div>

            <p className="mb-2 text-2xl font-bold text-blue-400">
              {slide.headline}
            </p>
            <p className="mb-6 text-lg text-slate-300">{slide.subtitle}</p>

            {slide.features && (
              <ul className="mb-6 space-y-2">
                {slide.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-md bg-slate-700/50 px-4 py-3"
                  >
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
                    <span className="text-sm text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {slide.actors && (
              <div className="mb-6 grid grid-cols-2 gap-3">
                {slide.actors.map((actor, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3"
                  >
                    <p className="font-semibold text-white">{actor.name}</p>
                    <p className="text-xs text-slate-400">{actor.role}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.narrative && (
              <div className="mb-6 space-y-2">
                {slide.narrative.map((line, i) => (
                  <p key={i} className="text-center text-base text-slate-300">
                    {line}
                  </p>
                ))}
              </div>
            )}

            <div className="rounded-lg border border-slate-600 bg-slate-700/50 px-6 py-3 text-center">
              <p className="text-base font-medium text-white">{slide.tagline}</p>
            </div>
          </div>
        )}

        {/* Slide 10: Closing */}
        {slide.type === 'closing' && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-white">
              {slide.title}
            </h1>
            <p className="mb-2 text-2xl font-medium text-emerald-400">
              {slide.headline}
            </p>
            <p className="mb-12 text-lg text-slate-300">{slide.subtitle}</p>

            <div className="flex flex-col gap-3">
              {slide.ctas.map((cta, i) => (
                <button
                  key={i}
                  onClick={() => navigate(cta.href)}
                  className="rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  {cta.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm font-medium text-slate-400">
          {currentSlide + 1} / {slides.length}
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="rounded-md border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Hint */}
      <div className="absolute bottom-8 right-8 text-xs text-slate-500">
        Use ← → arrows to navigate
      </div>
    </main>
  );
};

export default PitchDeck;
