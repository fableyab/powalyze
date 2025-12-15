import { addDays, subDays, format } from 'date-fns';

/**
 * Service to generate real-time simulated data streams.
 * Simulates WebSocket connections with intervals.
 */

const BASE_KPI = {
  activeProjects: 45,
  budgetConsumed: 68, // percentage
  risks: 12,
  efficiency: 92,
  revenue: 450000,
  customers: 1240,
  scheduleVariance: -2.4 // weeks
};

// Helper to jitter values realistically
const jitter = (val, range = 5) => {
  const change = (Math.random() - 0.5) * range;
  const result = val + change;
  return Number(Math.max(0, result).toFixed(1));
};

export const realtimeDataGenerator = {
  generateRealtimeKPIData: () => {
    return {
      activeProjects: Math.floor(jitter(BASE_KPI.activeProjects, 2)),
      budgetConsumed: jitter(BASE_KPI.budgetConsumed, 1.5),
      risks: Math.floor(jitter(BASE_KPI.risks, 3)),
      efficiency: jitter(BASE_KPI.efficiency, 1.5),
      revenue: Math.floor(jitter(BASE_KPI.revenue, 5000)),
      scheduleVariance: jitter(BASE_KPI.scheduleVariance, 0.2),
      timestamp: new Date().toISOString()
    };
  },

  generateRealtimeProjectData: () => {
    const projects = [
      { id: 1, name: 'Cloud Migration', progress: 78, status: 'On Track', health: 95, budget: 120000, spent: 95000 },
      { id: 2, name: 'ERP Upgrade', progress: 45, status: 'At Risk', health: 72, budget: 250000, spent: 110000 },
      { id: 3, name: 'AI Integration', progress: 12, status: 'On Track', health: 98, budget: 80000, spent: 5000 },
      { id: 4, name: 'Security Audit', progress: 92, status: 'Completed', health: 100, budget: 45000, spent: 42000 },
      { id: 5, name: 'Mobile App Refactor', progress: 34, status: 'Critical', health: 55, budget: 150000, spent: 65000 }
    ];

    return projects.map(p => ({
      ...p,
      progress: Math.min(100, Math.floor(jitter(p.progress, 2))),
      health: Math.min(100, Math.floor(jitter(p.health, 3))),
      spent: Math.floor(jitter(p.spent, 1000)),
      lastUpdate: new Date().toISOString()
    }));
  },

  generateRealtimeFinancialData: () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(m => ({
      name: m,
      budget: 50000,
      actual: Math.floor(jitter(48000, 5000)),
      forecast: Math.floor(jitter(52000, 3000)),
      variance: Math.floor(jitter(2000, 1000))
    }));
  },

  generateRealtimeSalesData: () => {
    const regions = ['NA', 'EU', 'APAC', 'LATAM'];
    return regions.map(r => ({
      region: r,
      sales: Math.floor(jitter(r === 'NA' ? 120000 : r === 'EU' ? 90000 : 50000, 5000)),
      target: r === 'NA' ? 110000 : r === 'EU' ? 85000 : 45000,
      growth: jitter(5, 2)
    }));
  },

  generateRealtimePMOData: () => {
    return {
       portfolioHealth: jitter(88, 1),
       activeRisks: Math.floor(jitter(15, 2)),
       resourceUtilization: jitter(82, 3),
       complianceRate: jitter(99, 0.5),
       openIssues: Math.floor(jitter(8, 2))
    };
  }
};