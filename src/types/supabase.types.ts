/**
 * POWALYZE TYPE DEFINITIONS
 * TypeScript interfaces matching Supabase schema
 * Generated from: migrations/001_powalyze_saas_schema.sql
 */

// ============================================================================
// ORGANIZATION TYPES
// ============================================================================
export interface Organization {
  id: string;
  name: string;
  industry?: 'banking' | 'energy' | 'trading' | 'healthcare' | 'manufacturing' | 'telecom' | 'other';
  size?: 'small' | 'medium' | 'large' | 'enterprise';
  country?: string;
  language?: 'en' | 'fr' | 'de' | 'es';
  logoUrl?: string;
  subscriptionPlan: 'starter' | 'professional' | 'enterprise';
  subscriptionStatus: 'active' | 'trial' | 'paused' | 'cancelled';
  maxUsers: number;
  maxProjects: number;
  features?: Record<string, boolean>;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// USER TYPES
// ============================================================================
export interface User {
  id: string;
  authId: string;
  organizationId: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================
export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  status: 'not_started' | 'in_progress' | 'blocked' | 'completed' | 'on_hold';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  actualSpend?: number;
  value?: number;
  realizedValue?: number;
  strategicAlignment?: number; // 0-100
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// PROJECT HEALTH PASSPORT
// ============================================================================
export interface ProjectHealthPassport {
  id: string;
  projectId: string;
  healthScore?: number; // 0-100
  riskScore?: number; // 0-100
  budgetScore?: number; // 0-100
  timelineScore?: number; // 0-100
  valueScore?: number; // 0-100
  qualityScore?: number; // 0-100
  stakeholderSatisfaction?: number; // 0-100
  healthStatus: 'excellent' | 'good' | 'at_risk' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// RISK TYPES
// ============================================================================
export interface Risk {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  category?: 'technical' | 'schedule' | 'budget' | 'resource' | 'stakeholder' | 'external';
  probability: number; // 0-100
  impact: number; // 0-100
  severity: number; // calculated: probability * impact / 100
  status: 'open' | 'mitigated' | 'closed' | 'escalated';
  mitigationPlan?: string;
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// PROJECT DEPENDENCIES
// ============================================================================
export interface ProjectDependency {
  id: string;
  projectId: string;
  dependsOnProjectId: string;
  dependencyType?: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lagDays?: number;
  isCritical?: boolean;
  createdAt: Date;
}

// ============================================================================
// KPI TYPES
// ============================================================================
export interface KPI {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  value?: number;
  target?: number;
  unit: string; // %, days, $, count, etc.
  baseline?: number;
  thresholdWarning?: number;
  thresholdCritical?: number;
  status: 'undefined' | 'on_track' | 'at_risk' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// DECISION ENGINE TYPES
// ============================================================================
export interface DecisionEngineResult {
  id: string;
  projectId: string;
  recommendation: 'go' | 'no_go' | 'delay' | 'reprioritize' | 'optimize';
  score: number; // 0-100
  confidence?: number; // 0-100
  justification?: string;
  factors?: Record<string, number>; // {health: 0.7, risk: 0.3, ...}
  modelVersion?: string;
  createdAt: Date;
}

// ============================================================================
// PREDICTIVE PMO FORECASTS
// ============================================================================
export interface PredictivePMOForecast {
  id: string;
  projectId: string;
  forecastType: 'delay' | 'budget_overrun' | 'risk_spike' | 'scope_creep' | 'resource_shortage';
  probability: number; // 0-100
  predictedDate?: Date;
  impactDays?: number;
  impactCost?: number;
  confidence?: number; // 0-100
  explanation?: string;
  mitigationSuggestions?: string;
  modelVersion?: string;
  createdAt: Date;
}

// ============================================================================
// MATURITY SCAN TYPES
// ============================================================================
export interface MaturityScanResult {
  id: string;
  organizationId: string;
  scanName?: string;
  score: number; // 0-100
  maturityLevel: 'initial' | 'developing' | 'established' | 'advanced' | 'optimizing';
  dimensionScores?: {
    governance?: number;
    delivery?: number;
    risk?: number;
    data?: number;
    change?: number;
  };
  recommendations?: string;
  actionItems?: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    timeline?: string;
    owner?: string;
  }>;
  createdById?: string;
  createdAt: Date;
}

// ============================================================================
// PMO DNA TYPES
// ============================================================================
export interface PMODNAProfile {
  id: string;
  organizationId: string;
  dna: {
    structure?: {
      type: 'centralized' | 'hybrid' | 'embedded';
      reportingLine?: string;
      headcount?: number;
    };
    capabilities?: Record<string, number>;
    maturity?: Record<string, any>;
    culture?: Record<string, any>;
    techStack?: Record<string, any>;
  };
  recommendations?: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    timeline?: string;
    expectedImpact?: string;
  }>;
  generatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// DIGITAL TWIN TYPES
// ============================================================================
export interface DigitalTwinSnapshot {
  id: string;
  organizationId: string;
  snapshotName?: string;
  snapshot: {
    projects?: Array<{
      id: string;
      name: string;
      status: string;
      health?: number;
      risk?: number;
    }>;
    portfolioHealth?: {
      overall?: number;
      byStatus?: Record<string, number>;
      byPriority?: Record<string, number>;
    };
    dependencies?: any[];
    criticalRisks?: Risk[];
    resourceUtilization?: Record<string, any>;
    valueRealization?: Record<string, any>;
  };
  scenarioType?: 'current' | 'baseline' | 'optimized' | 'predicted';
  isBaseline?: boolean;
  createdById?: string;
  createdAt: Date;
}

// ============================================================================
// MULTIVERSE SCENARIO TYPES
// ============================================================================
export interface MultiverseScenario {
  id: string;
  projectId: string;
  scenarioName: string;
  scenarioType?: 'optimistic' | 'pessimistic' | 'realistic' | 'custom';
  parameters: {
    budgetChange?: number;
    timelineChange?: number;
    teamSizeChange?: number;
    priorityBoost?: boolean;
    externalRisks?: string[];
    resourceAvailability?: number;
  };
  predictedOutcomes?: {
    newEndDate?: Date;
    newCost?: number;
    newRiskScore?: number;
    healthImpact?: number;
    feasibilityScore?: number;
    recommendations?: string[];
  };
  feasibilityScore?: number; // 0-100
  comparisonToBaseline?: Record<string, any>;
  createdById?: string;
  createdAt: Date;
}

// ============================================================================
// GENOME EDITOR TYPES
// ============================================================================
export interface GenomeEditorState {
  id: string;
  projectId: string;
  genome: {
    coreGenes?: Record<string, any>;
    healthGenes?: Record<string, any>;
    riskGenes?: Record<string, any>;
    mutationHistory?: Array<{
      date: Date;
      change: string;
      rationale?: string;
    }>;
  };
  mutationCount?: number;
  lastMutationAt?: Date;
  optimizationScore?: number; // 0-100
  impactAnalysis?: Record<string, any>;
  createdById?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// STRATEGIC PULSE TYPES
// ============================================================================
export interface StrategicPulse {
  id: string;
  organizationId: string;
  pulse: {
    rhythm?: {
      heartbeatHealth?: number;
      regularity?: number;
      trend?: 'improving' | 'stable' | 'declining';
    };
    anomalies?: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      projects?: string[];
      timestamp?: Date;
    }>;
    criticalSignals?: Array<{
      signal: string;
      impact: 'low' | 'medium' | 'high';
      affectedCount?: number;
    }>;
    portfolioHealthTrend?: 'declining' | 'stable' | 'improving';
    resourceStress?: {
      pressureLevel?: number;
      bottlenecks?: string[];
    };
    dependenciesStress?: {
      criticalChains?: number;
      atRisk?: number;
    };
    stakeholderSentiment?: number;
    burnRate?: number;
    recoveryTimeEstimate?: number;
  };
  healthIndex?: number; // 0-100
  healthStatus: 'critical' | 'at_risk' | 'stable' | 'excellent';
  alertCount?: number;
  trend?: 'improving' | 'stable' | 'declining';
  lastAlertAt?: Date;
  recommendations?: Array<{
    action: string;
    priority: 'high' | 'medium' | 'low';
    expectedImpact?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// AUDIT LOG TYPES
// ============================================================================
export interface AuditLog {
  id: string;
  organizationId: string;
  userId?: string;
  action: 'INSERT' | 'UPDATE' | 'DELETE';
  resourceType: string;
  resourceId?: string;
  changes?: {
    old?: Record<string, any>;
    new?: Record<string, any>;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// ============================================================================
// AGGREGATED/COMPUTED TYPES
// ============================================================================

export interface PortfolioMetrics {
  totalProjects: number;
  projectsByStatus: Record<string, number>;
  projectsByPriority: Record<string, number>;
  overallHealth: number;
  overallRisk: number;
  totalBudget: number;
  totalSpend: number;
  budgetUtilization: number; // percentage
  onTimeProjects: number;
  atRiskProjects: number;
  valueRealized: number;
  valueAtRisk: number;
}

export interface DashboardData {
  organization: Organization;
  metrics: PortfolioMetrics;
  topRisks: Risk[];
  criticalProjects: Project[];
  keyForecasts: PredictivePMOForecast[];
  strategicPulse: StrategicPulse;
  lastUpdated: Date;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateProjectRequest {
  organizationId: string;
  name: string;
  description?: string;
  status?: Project['status'];
  priority?: Project['priority'];
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  value?: number;
  strategicAlignment?: number;
  ownerId?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: Project['status'];
  priority?: Project['priority'];
  startDate?: Date;
  endDate?: Date;
  budget?: number;
  actualSpend?: number;
  value?: number;
  realizedValue?: number;
  strategicAlignment?: number;
  ownerId?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface APIErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: Record<string, any>;
  timestamp: Date;
}
