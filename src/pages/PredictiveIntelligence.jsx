import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, AlertTriangle, TrendingUp } from 'lucide-react';

const PredictiveIntelligence = () => {
  const [openSection, setOpenSection] = useState('overview');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Données des risques
  const riskItems = [
    {
      id: 'resources',
      title: 'Ressources insuffisantes',
      description: 'La capacité de certains rôles clés est sous tension sur les 6 prochaines semaines.',
      level: 'high'
    },
    {
      id: 'dependencies',
      title: 'Dépendances externes non sécurisées',
      description: 'Plusieurs livrables critiques dépendent de fournisseurs sans engagement clair.',
      level: 'high'
    },
    {
      id: 'priorities',
      title: 'Conflits de priorités',
      description: 'Des projets majeurs se disputent les mêmes ressources stratégiques.',
      level: 'medium'
    },
    {
      id: 'scope',
      title: 'Scope instable',
      description: 'Des changements réguliers de périmètre augmentent la complexité et le risque.',
      level: 'medium'
    },
    {
      id: 'integrations',
      title: 'Intégrations tierces sensibles',
      description: 'Plusieurs interfaces critiques sont encore en phase d\'alignement technique.',
      level: 'medium'
    },
    {
      id: 'tests',
      title: 'Couverture de tests insuffisante',
      description: 'La couverture de tests automatisés est trop faible sur des modules à fort impact.',
      level: 'high'
    },
    {
      id: 'docs',
      title: 'Documentation incomplète',
      description: 'Certaines décisions clés ne sont pas tracées, ce qui complique les arbitrages.',
      level: 'low'
    },
    {
      id: 'team',
      title: 'Équipe instable',
      description: 'Des changements fréquents dans l\'équipe augmentent le risque de perte de contexte.',
      level: 'medium'
    }
  ];

  // Scénarios
  const scenarios = [
    {
      id: 'optimistic',
      label: 'Scénario optimiste',
      description: 'Livraison dans les délais avec une dérive budgétaire < 3%, risques majeurs maîtrisés.'
    },
    {
      id: 'realistic',
      label: 'Scénario réaliste',
      description: 'Retard de 8 à 12 jours sur les projets critiques, 1 risque majeur à traiter rapidement.'
    },
    {
      id: 'conservative',
      label: 'Scénario prudent',
      description: 'Retard de 20 à 30 jours si aucune action n\'est prise, surcharge persistante sur 2 rôles clés.'
    }
  ];

  // Recommandations
  const recommendations = [
    {
      id: 'capacity-redistribution',
      title: 'Réallouer 20% de la capacité d\'un rôle clé',
      impact: 'Réduction du risque de retard de 87% à 42%.',
      details: 'Décharger les projets secondaires pour concentrer la capacité sur les livrables critiques.'
    },
    {
      id: 'freeze-scope',
      title: 'Geler les demandes de changement pendant 2 semaines',
      impact: 'Stabilisation du périmètre et réduction de la complexité.',
      details: 'Permet d\'absorber le backlog existant avant d\'introduire de nouvelles demandes.'
    },
    {
      id: 'prioritize-dependency',
      title: 'Prioriser la dépendance critique la plus risquée',
      impact: 'Réduction de la probabilité de blocage transversal sur plusieurs projets.',
      details: 'Sécuriser les livrables en amont pour éviter les effets de cascade.'
    },
    {
      id: 'add-tests',
      title: 'Renforcer les tests automatisés sur un module à fort impact',
      impact: 'Diminution du risque de régressions tardives.',
      details: 'Cibler en priorité les fonctionnalités les plus utilisées et les plus critiques.'
    }
  ];

  const levelColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'low':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  const toggleSection = (id) => {
    setOpenSection(current => current === id ? null : id);
  };

  const handleAskAI = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setErrorMsg(null);
    setAnswer(null);

    try {
      // Simulation API - Logique adaptée de Next.js
      if (question.trim().length === 0) {
        throw new Error('Aucune question fournie.');
      }

      // --- MOCK DE RÉPONSE IA ---
      // Simulation d'une vraie IA (à remplacer par un vrai appel backend plus tard)
      const mockAnswer = `
**Voici une analyse prédictive basée sur votre question :**

• Votre question : "${question}"

• **Analyse :** L'IA détecte plusieurs facteurs potentiels selon les données du portefeuille actuel.

• **Risques probables :**
  - Retard sur les projets dépendants de ressources critiques
  - Dérive budgétaire sur les initiatives à forte complexité
  - Signaux faibles liés à la charge de travail et aux dépendances externes

• **Recommandation prioritaire :**
  Prioriser les projets à forte valeur, sécuriser les dépendances critiques
  et rééquilibrer la capacité sur les rôles sous tension.

• **Impact estimé :**
  Une réallocation de 20% de la capacité pourrait réduire le risque de retard
  de 87% à 42% sur les 6 prochaines semaines.

*(Ceci est une réponse simulée — l'IA réelle fournira une analyse plus précise basée sur vos données)*
`;

      // Simulation délai réseau
      await new Promise(resolve => setTimeout(resolve, 1500));

      setAnswer(mockAnswer);
    } catch (err) {
      setErrorMsg('Erreur lors de l\'analyse. Veuillez réessayer.');
      console.error('Erreur API Predictive Intelligence :', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      handleAskAI();
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 pb-8 border-b border-slate-800"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-wider text-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            Predictive Intelligence
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            L'IA qui anticipe, analyse et éclaire vos décisions
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl">
            Une intelligence prédictive intégrée à Powalyze pour détecter les signaux faibles,
            prévoir les risques et vous aider à agir avant qu'il ne soit trop tard.
          </p>
        </motion.header>

        {/* GRID PRINCIPALE */}
        <div className="grid gap-6 lg:grid-cols-[2fr,1.3fr]">
          {/* COLONNE GAUCHE */}
          <div className="space-y-6">
            {/* Vue d'ensemble */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900/80 p-6 hover:border-purple-500/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleSection('overview')}
                className="flex w-full items-center justify-between gap-2 text-left group"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                    Vue d'ensemble prédictive
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Une vision synthétique de vos risques, dérives et capacités.
                  </p>
                </div>
                {openSection === 'overview' ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {openSection === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                  >
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 hover:bg-red-500/20 transition-colors">
                      <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
                      <p className="text-xs uppercase tracking-wide text-red-200/90 mb-1">
                        Projets à risque élevé
                      </p>
                      <p className="text-2xl font-bold text-red-100">3 / 12</p>
                      <p className="mt-2 text-xs text-red-100/80">
                        Nécessitent une attention prioritaire.
                      </p>
                    </div>

                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 hover:bg-amber-500/20 transition-colors">
                      <Sparkles className="w-6 h-6 text-amber-400 mb-2" />
                      <p className="text-xs uppercase tracking-wide text-amber-200/90 mb-1">
                        Risques émergents
                      </p>
                      <p className="text-2xl font-bold text-amber-100">8</p>
                      <p className="mt-2 text-xs text-amber-100/80">
                        Identifiés avant leur matérialisation.
                      </p>
                    </div>

                    <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 hover:bg-sky-500/20 transition-colors">
                      <TrendingUp className="w-6 h-6 text-sky-400 mb-2" />
                      <p className="text-xs uppercase tracking-wide text-sky-200/90 mb-1">
                        Dérive budgétaire prévue
                      </p>
                      <p className="text-2xl font-bold text-sky-100">
                        +5.2<span className="text-base">%</span>
                      </p>
                      <p className="mt-2 text-xs text-sky-100/80">
                        Concerne principalement 2 projets majeurs.
                      </p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 hover:bg-emerald-500/20 transition-colors">
                      <AlertTriangle className="w-6 h-6 text-emerald-400 mb-2" />
                      <p className="text-xs uppercase tracking-wide text-emerald-200/90 mb-1">
                        Capacité future
                      </p>
                      <p className="text-xl font-bold text-emerald-100">
                        Saturation dans 6 semaines
                      </p>
                      <p className="mt-2 text-xs text-emerald-100/80">
                        Sur 3 rôles clés du portefeuille.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Risques majeurs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 hover:border-purple-500/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleSection('risks')}
                className="flex w-full items-center justify-between gap-2 text-left group"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                    Risques majeurs identifiés
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Les facteurs qui compromettent le plus vos délais, budgets et résultats.
                  </p>
                </div>
                {openSection === 'risks' ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {openSection === 'risks' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    {riskItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-4 hover:bg-slate-900 hover:border-slate-700 transition-all"
                      >
                        <span
                          className={`mt-1 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${levelColor(item.level)}`}
                        >
                          {item.level === 'high' ? 'Élevé' : item.level === 'medium' ? 'Modéré' : 'Faible'}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Scénarios */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 hover:border-purple-500/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleSection('scenarios')}
                className="flex w-full items-center justify-between gap-2 text-left group"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                    Scénarios intelligents
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Plusieurs futurs possibles, construits à partir de vos données réelles.
                  </p>
                </div>
                {openSection === 'scenarios' ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {openSection === 'scenarios' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 grid gap-4 sm:grid-cols-3"
                  >
                    {scenarios.map((scenario, index) => (
                      <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 hover:bg-slate-900 hover:border-slate-700 transition-all"
                      >
                        <p className="text-sm font-semibold text-slate-100 mb-2">
                          {scenario.label}
                        </p>
                        <p className="text-xs text-slate-400">
                          {scenario.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Recommandations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 hover:border-purple-500/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleSection('recommendations')}
                className="flex w-full items-center justify-between gap-2 text-left group"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                    Recommandations de l'IA
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Des actions concrètes pour réduire les risques et stabiliser le portefeuille.
                  </p>
                </div>
                {openSection === 'recommendations' ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {openSection === 'recommendations' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 space-y-3"
                  >
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-lg border border-slate-800 bg-slate-900/70 p-4 hover:bg-slate-900 hover:border-emerald-500/30 transition-all"
                      >
                        <p className="text-sm font-semibold text-slate-100">
                          {rec.title}
                        </p>
                        <p className="mt-2 text-xs text-emerald-300 font-medium">
                          Impact : {rec.impact}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          {rec.details}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>

          {/* COLONNE DROITE : IA CONVERSATIONNELLE */}
          <aside className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-purple-500/30 bg-gradient-to-b from-slate-950 to-slate-900/80 p-6 sticky top-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-purple-100">
                    Poser une question à l'IA
                  </h2>
                  <p className="text-xs text-purple-100/80">
                    Interrogez Predictive Intelligence
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-slate-300 block">
                  Votre question
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-purple-500/40 bg-black/40 px-4 py-3">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ex. : Quels projets risquent de déraper ce trimestre ?"
                    className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAskAI}
                    disabled={loading || !question.trim()}
                    className="rounded-md bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:bg-purple-500/50 disabled:text-white/50"
                  >
                    {loading ? 'Analyse...' : 'Demander'}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-red-300"
                >
                  {errorMsg}
                </motion.p>
              )}

              {answer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4"
                >
                  <p className="text-sm font-semibold text-purple-100 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Réponse de l'IA
                  </p>
                  <p className="text-sm text-purple-50 whitespace-pre-line leading-relaxed">
                    {answer}
                  </p>
                </motion.div>
              )}

              {!answer && !errorMsg && (
                <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm font-semibold text-slate-100 mb-3">
                    Exemples de questions
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Quels projets sont les plus exposés ce trimestre ?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Quels sont les signaux faibles que je dois surveiller ?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>Quel est l'impact si je décale le projet X d'un mois ?</span>
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-5"
            >
              <p className="text-sm font-semibold text-slate-100 mb-3">
                Comment fonctionne Predictive Intelligence ?
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                L'IA s'appuie sur vos données de projets, d'historique, de capacités et de risques
                pour identifier des tendances, détecter des signaux faibles et générer des
                scénarios. Elle ne remplace pas vos décisions, elle les prépare.
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PredictiveIntelligence;
