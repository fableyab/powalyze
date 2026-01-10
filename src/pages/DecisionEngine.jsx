import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Clock, 
  DollarSign, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ChevronRight,
  BarChart3,
  Activity
} from 'lucide-react';

const DecisionEngine = () => {
  // Décisions prioritaires
  const decisions = [
    {
      id: 1,
      priority: 'Critique',
      title: 'Renforcer l\'équipe ERP (+1 FTE fonctionnel)',
      context: 'L\'analyse des dépendances montre que le projet ERP NextGen crée une tension majeure sur la supply chain. Le retard actuel de 6-8 semaines impacte directement la migration Cloud et la logistique.',
      impacts: [
        { type: 'Temporel', value: 'Retard réduit de 6 semaines', positive: true },
        { type: 'Risque', value: 'Risque supply chain abaissé de 37%', positive: true },
        { type: 'Capacité', value: 'Charge IT stabilisée à 85%', positive: true },
        { type: 'Budgétaire', value: 'Coût additionnel : +12k CHF', positive: false }
      ],
      recommendation: 'C\'est l\'action la plus impactante à court terme. Le coût est marginal comparé au risque de propagation.',
      confidence: 94
    },
    {
      id: 2,
      priority: 'Haute',
      title: 'Réduire le périmètre Cloud non critique',
      context: 'La migration Cloud dépasse le budget initial de 18%. L\'analyse montre que 30% des workloads migrés ont un usage réel inférieur à 15%.',
      impacts: [
        { type: 'Budgétaire', value: 'Économie potentielle : 80k CHF', positive: true },
        { type: 'Risque', value: 'Surcharge supprimée', positive: true },
        { type: 'Dépendance', value: 'Dépendance ERP allégée', positive: true },
        { type: 'Temporel', value: 'Retard réduit de 2 semaines', positive: true }
      ],
      recommendation: 'Recentrer la migration sur les workloads critiques permettra de tenir les objectifs budgétaires sans compromettre la valeur métier.',
      confidence: 87
    },
    {
      id: 3,
      priority: 'Opportunité',
      title: 'Accélérer le déploiement Digital Workplace',
      context: 'Le projet Digital Workplace 2.0 avance avec une vélocité 23% supérieure à la prévision. Les utilisateurs pilotes affichent un NPS de 81.',
      impacts: [
        { type: 'Stratégique', value: 'Gain de productivité anticipé de +15%', positive: true },
        { type: 'Satisfaction', value: 'NPS utilisateurs : 81/100', positive: true },
        { type: 'Capacité', value: 'Capacité IT disponible : +8%', positive: true },
        { type: 'Risque', value: 'Aucun risque majeur identifié', positive: true }
      ],
      recommendation: 'Capitaliser sur cette dynamique positive permettrait de libérer de la capacité pour les projets sous tension.',
      confidence: 91
    }
  ];

  // Scénarios comparatifs pour décision 1
  const scenarios = [
    {
      option: 'A',
      name: 'Ajouter 1 FTE fonctionnel',
      impact: '+4 semaines gagnées',
      risk: 'Risque abaissé de 37%',
      cost: '+12k CHF',
      timeToValue: '2 semaines',
      recommended: true,
      score: 94
    },
    {
      option: 'B',
      name: 'Réduire le périmètre ERP',
      impact: '+2 semaines gagnées',
      risk: 'Risque abaissé de 18%',
      cost: '0 CHF',
      timeToValue: '1 semaine',
      recommended: false,
      score: 71
    },
    {
      option: 'C',
      name: 'Décaler le projet de 8 semaines',
      impact: 'Aucun gain immédiat',
      risk: 'Risque maintenu',
      cost: '0 CHF',
      timeToValue: '0 semaine',
      recommended: false,
      score: 43
    }
  ];

  // Timeline de projection (8 semaines)
  const projection = [
    { week: 'Aujourd\'hui', risk: 85, delay: 6, budget: 118, capacity: 92 },
    { week: '+2 semaines', risk: 72, delay: 5, budget: 115, capacity: 88 },
    { week: '+4 semaines', risk: 58, delay: 3, budget: 112, capacity: 85 },
    { week: '+8 semaines', risk: 34, delay: 0, budget: 108, capacity: 82 }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-sm px-4 py-2 mb-6">
              <Brain className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-light text-[#D4AF37] uppercase tracking-wider">
                Decision Engine
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Le cerveau de <span className="text-[#D4AF37]">Powalyze</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-3xl mx-auto mb-8">
              Que dois-je décider aujourd'hui pour réduire les risques, accélérer les projets et optimiser les ressources ?
            </p>

            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-light text-[#D4AF37] mb-2">3</div>
                <div className="text-sm font-light text-white/60">Décisions prioritaires</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-light text-[#D4AF37] mb-2">94%</div>
                <div className="text-sm font-light text-white/60">Confiance moyenne</div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-light text-[#D4AF37] mb-2">8</div>
                <div className="text-sm font-light text-white/60">Projets analysés</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Décisions prioritaires */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Décisions recommandées aujourd'hui
            </h2>
            <p className="text-lg font-light text-white/60">
              Le moteur a analysé 8 projets actifs, 147 dépendances, 12 risques et 39 personnes
            </p>
          </motion.div>

          <div className="space-y-6">
            {decisions.map((decision, index) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-[#D4AF37]/30 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`
                      px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-wider
                      ${decision.priority === 'Critique' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                      ${decision.priority === 'Haute' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : ''}
                      ${decision.priority === 'Opportunité' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : ''}
                    `}>
                      {decision.priority}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-light mb-3">{decision.title}</h3>
                      <p className="text-white/60 font-light leading-relaxed">{decision.context}</p>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-3xl font-light text-[#D4AF37] mb-1">{decision.confidence}%</div>
                    <div className="text-xs font-light text-white/40 uppercase">Confiance</div>
                  </div>
                </div>

                {/* Impacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {decision.impacts.map((impact, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-sm p-4">
                      {impact.positive ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                          {impact.type}
                        </div>
                        <div className={`font-light ${impact.positive ? 'text-white' : 'text-orange-300'}`}>
                          {impact.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommandation */}
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-sm p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-2">
                        Analyse stratégique
                      </div>
                      <p className="font-light text-white/90 leading-relaxed">
                        {decision.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#4A9EFF] hover:text-white transition-all rounded-sm text-sm uppercase tracking-wide">
                    Appliquer cette décision
                  </button>
                  <button className="px-6 py-3 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide">
                    Voir les scénarios
                  </button>
                  <button className="px-6 py-3 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide">
                    Comparer les options
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vue Scénarios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Analyse comparative des scénarios
            </h2>
            <p className="text-lg font-light text-white/60">
              Décision #1 : Renforcer l'équipe ERP — 3 options analysées
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.option}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative bg-white/[0.02] border rounded-sm p-8 transition-all
                  ${scenario.recommended 
                    ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}
              >
                {scenario.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-[#000000] text-xs font-medium uppercase tracking-wider rounded-sm">
                    ⭐ Recommandé
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl font-light text-[#D4AF37] mb-2">
                    Option {scenario.option}
                  </div>
                  <div className="text-lg font-light">{scenario.name}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Impact temporel
                    </div>
                    <div className="font-light">{scenario.impact}</div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Réduction du risque
                    </div>
                    <div className="font-light">{scenario.risk}</div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Coût estimé
                    </div>
                    <div className="font-light">{scenario.cost}</div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Time to value
                    </div>
                    <div className="font-light">{scenario.timeToValue}</div>
                  </div>
                </div>

                {/* Score */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-light text-white/60">Score d'impact</span>
                    <span className="text-2xl font-light text-[#D4AF37]">{scenario.score}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D4AF37] rounded-full transition-all"
                      style={{ width: `${scenario.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projection Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Projection stratégique (8 semaines)
            </h2>
            <p className="text-lg font-light text-white/60">
              Évolution prévisionnelle si vous appliquez l'Option A
            </p>
          </motion.div>

          <div className="bg-white/[0.02] border border-white/10 rounded-sm p-8">
            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {projection.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < projection.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#000000] mb-3">
                      <span className="text-sm font-medium text-[#D4AF37]">{index === 0 ? '📍' : '📊'}</span>
                    </div>
                    <div className="text-sm font-medium text-white/80">{point.week}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/[0.02] border border-white/5 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/40">Risque</span>
                        <span className={`text-sm font-medium ${point.risk > 70 ? 'text-red-400' : point.risk > 50 ? 'text-orange-400' : 'text-green-400'}`}>
                          {point.risk}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${point.risk > 70 ? 'bg-red-400' : point.risk > 50 ? 'bg-orange-400' : 'bg-green-400'}`}
                          style={{ width: `${point.risk}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/40">Retard</span>
                        <span className="text-sm font-medium text-white">{point.delay} sem.</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/40">Budget</span>
                        <span className="text-sm font-medium text-white">{point.budget}%</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/40">Capacité</span>
                        <span className="text-sm font-medium text-white">{point.capacity}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Insights */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-sm p-6">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-[#D4AF37] mb-3">Synthèse stratégique</h4>
                  <div className="space-y-2 font-light text-white/90">
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Le risque critique diminue de 85% à 34% en 8 semaines</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>Le retard ERP est résorbé complètement à +8 semaines</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span>La capacité IT se stabilise autour de 82% (zone optimale)</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                      <span>Le budget reste légèrement au-dessus de la cible (+8%)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narration Exécutive */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-sm p-12"
          >
            <div className="flex items-start gap-6">
              <Brain className="w-12 h-12 text-[#D4AF37] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-light mb-6">Conseil stratégique</h3>
                <div className="space-y-4 text-lg font-light text-white/80 leading-relaxed">
                  <p>
                    L'analyse des dépendances montre que le projet ERP crée une <span className="text-[#D4AF37]">tension majeure</span> sur l'ensemble du portefeuille.
                  </p>
                  <p>
                    Ajouter 1 FTE fonctionnel permettrait de réduire le retard de <span className="text-[#D4AF37]">6 semaines</span> et de stabiliser la supply chain.
                  </p>
                  <p>
                    C'est l'action <span className="text-[#D4AF37]">la plus impactante à court terme</span>, avec un coût marginal (12k CHF) comparé au risque de propagation (impact estimé : 240k CHF).
                  </p>
                  <p className="pt-6 border-t border-white/10">
                    <span className="text-white">Recommandation :</span> Prendre cette décision dans les <span className="text-[#D4AF37]">48 heures</span> pour maximiser l'impact.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Prêt à piloter vos décisions<br />avec cette <span className="text-[#D4AF37]">intelligence stratégique</span> ?
            </h2>
            <p className="text-xl font-light text-white/60 mb-8">
              Le Decision Engine est inclus dans tous les plans Powalyze
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#4A9EFF] hover:text-white transition-all rounded-sm text-sm uppercase tracking-wide inline-flex items-center gap-2"
              >
                Démarrer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/demo-mode"
                className="px-8 py-4 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide"
              >
                Voir la démo en direct
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DecisionEngine;
