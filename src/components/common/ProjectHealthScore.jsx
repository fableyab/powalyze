import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Calcule automatiquement le Health Score d'un projet
 * Basé sur : progression, budget, risques, jalons, charge
 */
const calculateHealthScore = (project) => {
  let score = 100;

  // Pénalité progression vs plan
  if (project.progress < project.expectedProgress) {
    score -= (project.expectedProgress - project.progress) * 0.5;
  }

  // Pénalité budget
  const budgetUsageRate = (project.budgetUsed / project.budgetTotal) * 100;
  if (budgetUsageRate > project.progress + 10) {
    score -= (budgetUsageRate - project.progress) * 0.3;
  }

  // Pénalité risques
  const criticalRisks = project.risks?.filter(r => r.severity === 'critical').length || 0;
  const highRisks = project.risks?.filter(r => r.severity === 'high').length || 0;
  score -= criticalRisks * 10;
  score -= highRisks * 5;

  // Pénalité jalons en retard
  const overdueMilestones = project.milestones?.filter(m => m.status === 'overdue').length || 0;
  score -= overdueMilestones * 8;

  // Pénalité surcharge équipe
  if (project.teamLoad > 100) {
    score -= (project.teamLoad - 100) * 0.2;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Détermine le statut selon le score
 */
const getHealthStatus = (score) => {
  if (score >= 80) return { label: 'Healthy', color: 'green', icon: TrendingUp };
  if (score >= 60) return { label: 'Attention', color: 'yellow', icon: Minus };
  return { label: 'Critical', color: 'red', icon: TrendingDown };
};

const ProjectHealthScore = ({ project, showLabel = true, size = 'md' }) => {
  const score = calculateHealthScore(project);
  const status = getHealthStatus(score);
  const Icon = status.icon;

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    red: 'bg-red-100 text-red-800 border-red-300'
  };

  return (
    <div className="inline-flex items-center gap-2">
      {/* Score Badge */}
      <div
        className={`inline-flex items-center gap-1.5 rounded-lg border font-bold ${sizeClasses[size]} ${colorClasses[status.color]}`}
      >
        <Icon className={iconSizes[size]} />
        <span>{score}/100</span>
      </div>

      {/* Status Label */}
      {showLabel && (
        <span className={`font-semibold ${
          status.color === 'green' ? 'text-green-700' :
          status.color === 'yellow' ? 'text-yellow-700' :
          'text-red-700'
        }`}>
          {status.label}
        </span>
      )}
    </div>
  );
};

export default ProjectHealthScore;
export { calculateHealthScore, getHealthStatus };
