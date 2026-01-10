import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ChevronRight,
  Sparkles,
  User,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Footer from '@/components/Footer';

const RiskHeatmap = () => {
  const { t } = useTranslation('risks');
  const [selectedRisk, setSelectedRisk] = useState(null);

  // Données des risques par projet
  const risks = [
    {
      id: 1,
      project: t('data.orion.project'),
      level: 'critical',
      problem: t('data.orion.problem'),
      impact: t('data.orion.impact'),
      decision: t('data.orion.decision'),
      responsible: t('data.orion.responsible'),
      deadline: t('data.orion.deadline'),
      description: t('data.orion.description'),
      actions: [
        t('data.orion.action1'),
        t('data.orion.action2'),
        t('data.orion.action3')
      ],
      estimatedDelay: t('data.orion.delay'),
      budgetImpact: t('data.orion.budget')
    },
    {
      id: 2,
      project: t('data.phoenix.project'),
      level: 'warning',
      problem: t('data.phoenix.problem'),
      impact: t('data.phoenix.impact'),
      decision: t('data.phoenix.decision'),
      responsible: t('data.phoenix.responsible'),
      deadline: t('data.phoenix.deadline'),
      description: t('data.phoenix.description'),
      actions: [
        t('data.phoenix.action1'),
        t('data.phoenix.action2'),
        t('data.phoenix.action3')
      ],
      estimatedDelay: t('data.phoenix.delay'),
      budgetImpact: t('data.phoenix.budget')
    },
    {
      id: 3,
      project: t('data.atlas.project'),
      level: 'warning',
      problem: t('data.atlas.problem'),
      impact: t('data.atlas.impact'),
      decision: t('data.atlas.decision'),
      responsible: t('data.atlas.responsible'),
      deadline: t('data.atlas.deadline'),
      description: t('data.atlas.description'),
      actions: [
        t('data.atlas.action1'),
        t('data.atlas.action2'),
        t('data.atlas.action3')
      ],
      estimatedDelay: t('data.atlas.delay'),
      budgetImpact: t('data.atlas.budget')
    },
    {
      id: 4,
      project: t('data.nova.project'),
      level: 'warning',
      problem: t('data.nova.problem'),
      impact: t('data.nova.impact'),
      decision: t('data.nova.decision'),
      responsible: t('data.nova.responsible'),
      deadline: t('data.nova.deadline'),
      description: t('data.nova.description'),
      actions: [
        t('data.nova.action1'),
        t('data.nova.action2'),
        t('data.nova.action3')
      ],
      estimatedDelay: t('data.nova.delay'),
      budgetImpact: t('data.nova.budget')
    }
  ];

  // Statistiques
  const stats = {
    green: 8,
    warning: 3,
    critical: 1,
    total: 12
  };

  // Synthèse IA
  const aiSummary = {
    criticalCount: stats.critical,
    urgentAction: t('aiSummary.urgentAction'),
    status: 'warning',
    recommendation: t('aiSummary.recommendation')
  };

  const getLevelConfig = (level) => {
    switch (level) {
      case 'critical':
        return {
          label: t('levels.critical'),
          icon: AlertTriangle,
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          badge: 'bg-red-500/20 text-red-400'
        };
      case 'warning':
        return {
          label: t('levels.warning'),
          icon: Clock,
          color: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          badge: 'bg-orange-500/20 text-orange-400'
        };
      case 'ok':
        return {
          label: t('levels.ok'),
          icon: CheckCircle2,
          color: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          badge: 'bg-green-500/20 text-green-400'
        };
      default:
        return {
          label: t('levels.unknown', 'Inconnu'),
          icon: AlertTriangle,
          color: 'text-slate-400',
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/30',
          badge: 'bg-slate-500/20 text-slate-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#D4AF37] rounded-xl">
              <TrendingUp className="w-6 h-6 text-[#0F0F0F]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-light text-white">{t('title')}</h1>
              <p className="text-white/50 text-sm font-light">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* État Global */}
        <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-light text-white">{t('globalStatus.title')}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-light text-green-400 mb-1">{stats.green}</div>
                    <div className="text-sm text-green-300/70 font-light">{t('globalStatus.okProjects')}</div>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-400/50" />
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-light text-orange-400 mb-1">{stats.warning}</div>
                    <div className="text-sm text-orange-300/70 font-light">{t('globalStatus.warningProjects')}</div>
                  </div>
                  <Clock className="w-8 h-8 text-orange-400/50" />
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-light text-red-400 mb-1">{stats.critical}</div>
                    <div className="text-sm text-red-300/70 font-light">{t('globalStatus.criticalProject')}</div>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-400/50" />
                </div>
              </div>
            </div>

            {/* Synthèse IA */}
            <div className="bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#4A9EFF] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#4A9EFF] mb-2">{t('aiSummary.title')}</div>
                  <div className="text-white/90 font-light text-sm mb-3">
                    <strong className="text-red-400">{aiSummary.criticalCount} {t('aiSummary.criticalRisk')}</strong> {t('aiSummary.identified')}
                    <br />
                    {aiSummary.urgentAction}
                  </div>
                  <div className="text-white/70 font-light text-sm">
                    {aiSummary.recommendation}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Immédiate Recommandée */}
        {risks.filter(r => r.level === 'critical').map((risk) => {
          const config = getLevelConfig(risk.level);
          const Icon = config.icon;
          
          return (
            <Card key={risk.id} className="bg-red-500/5 border-red-500/30 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/20 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
                        {t('immediateAction.title')}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{risk.project}</h3>
                    <div className="text-white/70 font-light text-sm mb-4">
                      <strong className="text-white">{t('immediateAction.decisionRequired')}</strong> {risk.decision}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="w-4 h-4" />
                        {risk.responsible}
                      </div>
                      <div className="flex items-center gap-2 text-red-400">
                        <Clock className="w-4 h-4" />
                        {t('immediateAction.deadline')} {risk.deadline}
                      </div>
                    </div>
                    <Button 
                      onClick={() => setSelectedRisk(risk)}
                      className="bg-red-500 hover:bg-red-600 text-white gap-2"
                    >
                      {t('immediateAction.viewActions')}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Tableau des Risques */}
        <Card className="bg-white/[0.02] border-white/10 mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-light text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />
              {t('allRisks.title')}
            </h2>

            <div className="space-y-3">
              {risks.map((risk) => {
                const config = getLevelConfig(risk.level);
                const Icon = config.icon;

                return (
                  <div
                    key={risk.id}
                    onClick={() => setSelectedRisk(risk)}
                    className={`${config.bg} ${config.border} border rounded-lg p-4 cursor-pointer hover:bg-white/5 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 ${config.badge} rounded-lg flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3 className="text-white font-medium">{risk.project}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badge} whitespace-nowrap`}>
                            {config.label}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div>
                            <div className="text-white/40 text-xs mb-1">{t('allRisks.problem')}</div>
                            <div className="text-white/80 font-light">{risk.problem}</div>
                          </div>
                          <div>
                            <div className="text-white/40 text-xs mb-1">{t('allRisks.impact')}</div>
                            <div className="text-white/80 font-light">{risk.impact}</div>
                          </div>
                          <div>
                            <div className="text-white/40 text-xs mb-1">{t('immediateAction.responsible')}</div>
                            <div className="text-white/80 font-light">{risk.responsible}</div>
                          </div>
                          <div>
                            <div className="text-white/40 text-xs mb-1">{t('immediateAction.deadline')}</div>
                            <div className={`font-light ${risk.level === 'critical' ? 'text-red-400' : 'text-white/80'}`}>
                              {risk.deadline}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Modal Détails Risque */}
        {selectedRisk && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRisk(null)}
          >
            <Card 
              className="bg-[#1A1A1A] border-[#D4AF37]/30 max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-6">
                {(() => {
                  const config = getLevelConfig(selectedRisk.level);
                  const Icon = config.icon;
                  
                  return (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 ${config.badge} rounded-lg`}>
                            <Icon className={`w-6 h-6 ${config.color}`} />
                          </div>
                          <div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.badge} mb-2 inline-block`}>
                              {config.label}
                            </span>
                            <h2 className="text-xl font-medium text-white mb-1">{selectedRisk.project}</h2>
                            <p className="text-white/60 font-light text-sm">{selectedRisk.problem}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedRisk(null)}
                          className="text-white/40 hover:text-white/80 transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('allRisks.impact')}</div>
                          <div className="text-white font-light">{selectedRisk.impact}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('allRisks.decision')}</div>
                          <div className="text-white font-light">{selectedRisk.decision}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('immediateAction.responsible')}</div>
                          <div className="text-white font-light">{selectedRisk.responsible}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('immediateAction.deadline')}</div>
                          <div className={`font-light ${selectedRisk.level === 'critical' ? 'text-red-400' : 'text-white'}`}>
                            {selectedRisk.deadline}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('modal.estimatedDelay')}</div>
                          <div className="text-orange-400 font-light">{selectedRisk.estimatedDelay}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs mb-1">{t('modal.budgetImpact')}</div>
                          <div className="text-orange-400 font-light">{selectedRisk.budgetImpact}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                          {t('modal.description')}
                        </h3>
                        <p className="text-white/70 font-light text-sm leading-relaxed">
                          {selectedRisk.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          {t('modal.actions')}
                        </h3>
                        <div className="space-y-2">
                          {selectedRisk.actions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-xs font-medium flex-shrink-0">
                                {idx + 1}
                              </div>
                              <p className="text-white/80 font-light text-sm">{action}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => setSelectedRisk(null)}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          {t('common:close', 'Fermer')}
                        </Button>
                        <Button 
                          className="flex-1 bg-[#D4AF37] hover:bg-[#B8976A] text-[#0F0F0F] gap-2"
                        >
                          {t('modal.validateDecision')}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RiskHeatmap;
