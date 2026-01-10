/**
 * Decision Engine - Type Definitions
 * 
 * Modèle de données complet pour le moteur de recommandations
 */

export type ProjectStatus = 'on_track' | 'at_risk' | 'critical';
export type StrategicPriority = 'low' | 'medium' | 'high';
export type RiskCategory = 'budget' | 'delay' | 'scope' | 'resource' | 'strategic';
export type RiskStatus = 'open' | 'mitigated' | 'closed';
export type DecisionType = 'add_resource' | 'reduce_scope' | 'shift_deadline' | 'reprioritize' | 'merge_projects' | 'pause_project';
export type DecisionPriority = 'low' | 'medium' | 'high' | 'critical';
export type ImpactDimension = 'time' | 'budget' | 'risk' | 'capacity' | 'strategy';
export type ImpactDirection = 'improve' | 'worsen' | 'neutral';
export type ImpactUnit = 'weeks' | 'currency' | 'risk_score' | 'fte' | 'index' | 'percentage';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number; // 0-100
  budget_planned: number;
  budget_spent: number;
  deadline: Date | string;
  team_size: number;
  dependencies: string[]; // project ids
  portfolio_id: string;
  risk_score: number; // 0-100
  velocity: number; // points/sprint
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Portfolio {
  id: string;
  name: string;
  strategic_priority: StrategicPriority;
  global_progress: number; // 0-100
  global_risk_score: number; // 0-100
  budget_planned: number;
  budget_spent: number;
  project_count?: number;
  created_at?: Date | string;
}

export interface Risk {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  probability: number; // 0-1
  impact: number; // 0-1
  propagation_targets: string[]; // project ids
  category: RiskCategory;
  status: RiskStatus;
  mitigation_plan?: string;
  created_at?: Date | string;
}

export interface Capacity {
  team_id: string;
  team_name: string;
  capacity_total: number; // FTE or points
  capacity_used: number;
  overload_index: number; // 0-1
  projects_assigned: string[]; // project ids
}

export interface DecisionImpact {
  dimension: ImpactDimension;
  delta_value: number; // ex: -4 weeks, +80000 CHF, -0.25 risk
  unit: ImpactUnit;
  direction: ImpactDirection;
  description: string;
}

export interface DecisionRecommendation {
  id: string;
  type: DecisionType;
  target_project_id: string | null;
  target_portfolio_id: string | null;
  title: string;
  description: string;
  rationale: string;
  impacts: DecisionImpact[];
  confidence_score: number; // 0-1
  priority: DecisionPriority;
  created_at: Date | string;
  scenarios?: DecisionScenario[];
}

export interface DecisionScenario {
  option: string; // A, B, C
  name: string;
  impacts: DecisionImpact[];
  cost: number;
  timeToValue: number; // weeks
  riskReduction: number; // 0-1
  score: number; // 0-100
  recommended: boolean;
}

export interface DecisionEngineResult {
  tenant_id: string;
  generated_at: Date | string;
  recommendations: DecisionRecommendation[];
  global_summary: {
    main_risks: string[];
    main_opportunities: string[];
    strategic_pulse: number; // 0-100
    total_projects_analyzed: number;
    critical_projects: number;
    high_risk_projects: number;
  };
}

export interface DecisionEngineParams {
  tenant_id: string;
  timeframe?: 'current' | 'next_4_weeks' | 'next_quarter';
  max_recommendations?: number;
  project_id?: string; // optional: filter by project
}

export interface TensionPoint {
  project_id: string;
  project_name: string;
  tension_type: 'budget_pressure' | 'delay_risk' | 'capacity_overload' | 'risk_critical' | 'dependency_blocked';
  severity: number; // 0-1
  priority_score: number;
  data: {
    risk_score?: number;
    budget_ratio?: number;
    delay_weeks?: number;
    overload_index?: number;
  };
}

export interface DecisionEngineConfig {
  weights: {
    risk_score: number;
    budget_pressure: number;
    delay_risk: number;
    strategic_priority: number;
  };
  thresholds: {
    risk_critical: number;
    budget_alert: number;
    overload_alert: number;
    confidence_minimum: number;
  };
}
