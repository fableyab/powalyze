import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Brain,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Zap,
  Filter,
  Eye
} from 'lucide-react';
import { riskService, predictiveSignalService } from '@/lib/decisionRiskService';

const RiskIntelligence = () => {
  const [loading, setLoading] = useState(true);
  const [risks, setRisks] = useState([]);
  const [signals, setSignals] = useState([]);
  const [riskMatrix, setRiskMatrix] = useState([]);
  const [activeView, setActiveView] = useState('risks'); // 'risks' | 'signals' | 'matrix'
  const [filters, setFilters] = useState({
    status: 'OPEN',
    minSeverity: 0
  });

  const organizationId = 'YOUR_ORG_ID';

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [risksData, signalsData, matrixData] = await Promise.all([
        riskService.getRisks(organizationId, filters),
        predictiveSignalService.getSignals(organizationId, { isAcknowledged: false }),
        riskService.getRiskMatrix(organizationId)
      ]);
      setRisks(risksData);
      setSignals(signalsData);
      setRiskMatrix(matrixData);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    if (severity >= 20) return 'bg-red-500';
    if (severity >= 15) return 'bg-amber-500';
    if (severity >= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const signalTypeIcons = {
    DELAY_RISK: TrendingDown,
    BUDGET_RISK: DollarSign,
    RESOURCE_OVERLOAD: Users,
    SCOPE_DRIFT: Activity
  };

  const signalTypeLabels = {
    DELAY_RISK: 'Risque de retard',
    BUDGET_RISK: 'Risque budgétaire',
    RESOURCE_OVERLOAD: 'Surcharge ressources',
    SCOPE_DRIFT: 'Dérive du scope'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] via-[#0D2340] to-[#0A1A2F]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A1A2F]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">Risk & Predictive Intelligence</h1>
              <p className="text-sm text-gray-400">Risques & Signaux faibles IA</p>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Déclarer un Risque
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('risks')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
              activeView === 'risks'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Risques ({risks.length})
          </button>
          <button
            onClick={() => setActiveView('signals')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
              activeView === 'signals'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Brain className="w-4 h-4" />
            Signaux IA ({signals.length})
          </button>
          <button
            onClick={() => setActiveView('matrix')}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
              activeView === 'matrix'
                ? 'bg-[#D4AF37] text-[#0A1A2F]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Eye className="w-4 h-4" />
            Matrice
          </button>
        </div>

        {/* Vue Risques */}
        {activeView === 'risks' && (
          <>
            {/* Filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-lg font-light text-white">Filtres</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Statut</label>
                  <select
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#D4AF37] transition-colors"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">Tous</option>
                    <option value="OPEN">Ouvert</option>
                    <option value="MITIGATED">Mitigé</option>
                    <option value="CLOSED">Fermé</option>
                    <option value="ACCEPTED">Accepté</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Sévérité minimale</label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={filters.minSeverity}
                    onChange={(e) =>
                      setFilters({ ...filters, minSeverity: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span className="font-bold text-[#D4AF37]">{filters.minSeverity}</span>
                    <span>25</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Liste des risques */}
            <div className="space-y-4">
              {risks.length > 0 ? (
                risks.map((risk, index) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Sévérité */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-xl ${getSeverityColor(
                            risk.severity
                          )}/20 flex items-center justify-center`}
                        >
                          <div className="text-center">
                            <div
                              className={`text-2xl font-bold ${getSeverityColor(
                                risk.severity
                              ).replace('bg-', 'text-')}`}
                            >
                              {risk.severity}
                            </div>
                            <div className="text-xs text-gray-400">Sévérité</div>
                          </div>
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1">
                        <h3 className="text-xl text-white mb-2">{risk.title}</h3>
                        <p className="text-gray-400 mb-4">{risk.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-xs text-gray-400">Probabilité</span>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-8 h-2 rounded ${
                                    i < risk.probability ? 'bg-amber-500' : 'bg-white/10'
                                  }`}
                                />
                              ))}
                              <span className="text-white ml-2">{risk.probability}/5</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Impact</span>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-8 h-2 rounded ${
                                    i < risk.impact ? 'bg-red-500' : 'bg-white/10'
                                  }`}
                                />
                              ))}
                              <span className="text-white ml-2">{risk.impact}/5</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-400">Owner</span>
                            <p className="text-white mt-1">
                              {risk.owner
                                ? `${risk.owner.first_name} ${risk.owner.last_name}`
                                : 'Non assigné'}
                            </p>
                          </div>
                        </div>

                        {risk.related_project && (
                          <div className="text-sm text-gray-400">
                            Projet: {risk.related_project.name}
                          </div>
                        )}

                        {risk.mitigation_plan && (
                          <div className="mt-4 p-3 bg-white/5 rounded-lg">
                            <h4 className="text-xs text-gray-400 mb-1">Plan de mitigation</h4>
                            <p className="text-sm text-white">{risk.mitigation_plan}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-2">Aucun risque</h3>
                  <p className="text-gray-400">Aucun risque ne correspond aux filtres</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Vue Signaux IA */}
        {activeView === 'signals' && (
          <div className="space-y-4">
            {signals.length > 0 ? (
              signals.map((signal, index) => {
                const Icon = signalTypeIcons[signal.signal_type] || Zap;
                return (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 rounded-2xl p-6 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-amber-400">{signal.score}</div>
                            <div className="text-xs text-gray-400">Score</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-5 h-5 text-amber-400" />
                          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                            {signalTypeLabels[signal.signal_type]}
                          </span>
                        </div>

                        <p className="text-white font-medium mb-2">{signal.message}</p>
                        <p className="text-gray-400 text-sm mb-4">
                          Recommandation: {signal.recommended_action}
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              predictiveSignalService.acknowledgeSignal(signal.id, 'USER_ID')
                            }
                            className="px-4 py-2 bg-[#D4AF37] text-[#0A1A2F] rounded-lg hover:bg-[#C4A137] transition-colors text-sm"
                          >
                            Marquer comme traité
                          </button>
                          <span className="text-xs text-gray-500">
                            {new Date(signal.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Aucun signal</h3>
                <p className="text-gray-400">Aucun signal prédictif détecté</p>
              </div>
            )}
          </div>
        )}

        {/* Vue Matrice */}
        {activeView === 'matrix' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-light text-white mb-6">Matrice de Risques 5x5</h2>
            <div className="grid grid-cols-6 gap-2">
              {/* Header */}
              <div className="col-span-1"></div>
              {[1, 2, 3, 4, 5].map((impact) => (
                <div key={`header-${impact}`} className="text-center text-sm text-gray-400">
                  Impact {impact}
                </div>
              ))}

              {/* Rows */}
              {[5, 4, 3, 2, 1].map((probability) => (
                <React.Fragment key={`row-${probability}`}>
                  <div className="flex items-center justify-center text-sm text-gray-400">
                    Prob. {probability}
                  </div>
                  {[1, 2, 3, 4, 5].map((impact) => {
                    const count = riskMatrix[probability - 1]?.[impact - 1] || 0;
                    const severity = probability * impact;
                    const bgColor =
                      severity >= 20
                        ? 'bg-red-500'
                        : severity >= 15
                        ? 'bg-amber-500'
                        : severity >= 10
                        ? 'bg-yellow-500'
                        : 'bg-green-500';

                    return (
                      <div
                        key={`cell-${probability}-${impact}`}
                        className={`${bgColor}/20 border-2 ${bgColor.replace(
                          'bg-',
                          'border-'
                        )}/40 rounded-lg h-20 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                      >
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${bgColor.replace('bg-', 'text-')}`}>
                            {count}
                          </div>
                          <div className="text-xs text-gray-400">risque{count > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Légende */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-400">Faible (1-9)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-400">Moyen (10-14)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                <span className="text-sm text-gray-400">Élevé (15-19)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-400">Critique (20-25)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RiskIntelligence;
