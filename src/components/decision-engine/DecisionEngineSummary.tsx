/**
 * DecisionEngineSummary
 * 
 * Widget résumé pour le Cockpit Exécutif
 */

import { Brain, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DecisionEngineResult, DecisionRecommendation } from '@/types/decisionEngine';

interface DecisionEngineSummaryProps {
  data: DecisionEngineResult | null;
  loading?: boolean;
}

export function DecisionEngineSummary({ data, loading }: DecisionEngineSummaryProps) {
  if (loading) {
    return (
      <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-[#D4AF37] animate-pulse" />
          <h3 className="text-lg font-light">Decision Engine</h3>
        </div>
        <p className="text-white/40 text-sm">Analyse en cours...</p>
      </div>
    );
  }

  if (!data || data.recommendations.length === 0) {
    return (
      <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-lg font-light">Decision Engine</h3>
        </div>
        <p className="text-white/60 text-sm font-light mb-4">
          Aucune décision prioritaire détectée. Vos projets sont sous contrôle.
        </p>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <Zap className="w-4 h-4" />
          <span>Strategic Pulse: {data?.global_summary.strategic_pulse || 85}%</span>
        </div>
      </div>
    );
  }

  const topRecommendation = data.recommendations[0];
  const criticalCount = data.recommendations.filter((r: DecisionRecommendation) => r.priority === 'critical').length;

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6 hover:border-[#D4AF37]/30 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-lg font-light">Decision Engine</h3>
        </div>
        <div className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-sm">
          <span className="text-sm font-medium text-[#D4AF37]">
            {data.recommendations.length} décisions
          </span>
        </div>
      </div>

      {/* Strategic Pulse */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-light text-white/60">Strategic Pulse</span>
          <span className="text-xl font-light text-[#D4AF37]">
            {data.global_summary.strategic_pulse}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] rounded-full transition-all"
            style={{ width: `${data.global_summary.strategic_pulse}%` }}
          />
        </div>
      </div>

      {/* Top Recommendation */}
      <div className="bg-white/[0.02] border border-white/5 rounded-sm p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          {topRecommendation.priority === 'critical' && (
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
          )}
          {topRecommendation.priority === 'high' && (
            <TrendingUp className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
          )}
          {(topRecommendation.priority === 'medium' || topRecommendation.priority === 'low') && (
            <Zap className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
          )}
          <div className="flex-1">
            <div className="text-sm font-medium mb-2">{topRecommendation.title}</div>
            <div className="text-xs text-white/60 font-light line-clamp-2">
              {topRecommendation.description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-white/40">Confiance:</span>
          <span className="text-[#D4AF37] font-medium">
            {Math.round(topRecommendation.confidence_score * 100)}%
          </span>
        </div>
      </div>

      {/* Stats */}
      {criticalCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-orange-400 mb-4">
          <AlertTriangle className="w-4 h-4" />
          <span>{criticalCount} décision{criticalCount > 1 ? 's' : ''} critique{criticalCount > 1 ? 's' : ''}</span>
        </div>
      )}

      {/* CTA */}
      <Link
        to="/decision-engine"
        className="block w-full px-4 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-center font-light hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm text-sm uppercase tracking-wide"
      >
        Voir toutes les décisions
      </Link>
    </div>
  );
}
