/**
 * DecisionRecommendationCard
 * 
 * Carte affichant une recommandation de décision avec ses impacts
 */

import { CheckCircle2, AlertTriangle, Brain, TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import type { DecisionRecommendation, DecisionPriority, ImpactDimension } from '@/types/decisionEngine';

interface DecisionRecommendationCardProps {
  recommendation: DecisionRecommendation;
  onApply?: (id: string) => void;
  onViewScenarios?: (id: string) => void;
  onCompare?: (id: string) => void;
}

export function DecisionRecommendationCard({
  recommendation,
  onApply,
  onViewScenarios,
  onCompare
}: DecisionRecommendationCardProps) {
  
  const priorityStyles: Record<DecisionPriority, string> = {
    critical: 'bg-red-500/10 text-red-400 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    low: 'bg-green-500/10 text-green-400 border-green-500/20'
  };

  const getImpactIcon = (dimension: ImpactDimension | string) => {
    switch (dimension) {
      case 'time': return <Clock className="w-5 h-5" />;
      case 'budget': return <DollarSign className="w-5 h-5" />;
      case 'capacity': return <Users className="w-5 h-5" />;
      case 'risk': return <AlertTriangle className="w-5 h-5" />;
      case 'strategy': return <TrendingUp className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-sm p-8 hover:border-[#D4AF37]/30 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4 flex-1">
          <div className={`
            px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-wider border
            ${priorityStyles[recommendation.priority]}
          `}>
            {recommendation.priority}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-light mb-3">{recommendation.title}</h3>
            <p className="text-white/60 font-light leading-relaxed">{recommendation.description}</p>
          </div>
        </div>
        
        <div className="text-right ml-6">
          <div className="text-3xl font-light text-[#D4AF37] mb-1">
            {Math.round(recommendation.confidence_score * 100)}%
          </div>
          <div className="text-xs font-light text-white/40 uppercase">Confiance</div>
        </div>
      </div>

      {/* Impacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {recommendation.impacts.map((impact: any, i: number) => (
          <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-sm p-4">
            {impact.direction === 'improve' ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : impact.direction === 'worsen' ? (
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            ) : (
              <div className="w-5 h-5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getImpactIcon(impact.dimension)}
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  {impact.dimension}
                </span>
              </div>
              <div className={`font-light ${
                impact.direction === 'improve' ? 'text-white' : 
                impact.direction === 'worsen' ? 'text-orange-300' : 
                'text-white/60'
              }`}>
                {impact.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rationale */}
      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-sm p-6 mb-6">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
          <div>
            <div className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-2">
              Analyse stratégique
            </div>
            <p className="font-light text-white/90 leading-relaxed">
              {recommendation.rationale}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {onApply && (
          <button
            onClick={() => onApply(recommendation.id)}
            className="px-6 py-3 bg-[#D4AF37] text-[#000000] font-medium hover:bg-[#4A9EFF] hover:text-white transition-all rounded-sm text-sm uppercase tracking-wide"
          >
            Appliquer cette décision
          </button>
        )}
        {onViewScenarios && (
          <button
            onClick={() => onViewScenarios(recommendation.id)}
            className="px-6 py-3 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide"
          >
            Voir les scénarios
          </button>
        )}
        {onCompare && (
          <button
            onClick={() => onCompare(recommendation.id)}
            className="px-6 py-3 border border-white/20 text-white font-light hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm text-sm uppercase tracking-wide"
          >
            Comparer les options
          </button>
        )}
      </div>
    </div>
  );
}
