import { addDays, subDays, format, subMonths, addMonths } from 'date-fns';

const generateProjects = (count) => {
  const projects = [];
  const statuses = ['On Track', 'At Risk', 'Critical', 'Completed'];
  const clients = ['Acme Corp', 'TechGiant', 'FinBank', 'HealthPlus', 'RetailCo'];
  
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const budget = Math.floor(Math.random() * 500000) + 50000;
    const spent = Math.floor(budget * (Math.random() * 0.8 + 0.1));
    
    projects.push({
      id: `P-${1000+i}`,
      name: `Project ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${i}`,
      client: clients[Math.floor(Math.random() * clients.length)],
      status,
      phase: ['Planning', 'Execution', 'Testing', 'Closure'][Math.floor(Math.random() * 4)],
      budget,
      spent,
      roi: Math.floor(Math.random() * 200) + '%',
      startDate: format(subMonths(new Date(), Math.floor(Math.random() * 6)), 'yyyy-MM-dd'),
      endDate: format(addMonths(new Date(), Math.floor(Math.random() * 6)), 'yyyy-MM-dd'),
      riskLevel: status === 'Critical' ? 'High' : status === 'At Risk' ? 'Medium' : 'Low',
      progress: Math.floor(Math.random() * 100),
      manager: `Manager ${i}`
    });
  }
  return projects;
};

const generateRisks = (projectId) => {
  const risks = [];
  const count = Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    risks.push({
      id: `R-${projectId}-${i}`,
      title: `Risk ${i} description`,
      description: `Detailed risk description for project`,
      probability: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      impact: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
      owner: 'Project Manager',
      status: 'Active'
    });
  }
  return risks;
};

const generateCostTrends = (months = 12) => {
  const data = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
     data.push({
        name: format(subMonths(now, i), 'MMM'),
        month: format(subMonths(now, i), 'MMM'),
        planned: Math.floor(Math.random() * 100000) + 50000,
        actual: Math.floor(Math.random() * 100000) + 50000,
        forecast: Math.floor(Math.random() * 100000) + 55000,
     });
  }
  return data;
};

const calculateKPIs = (projects) => {
  const total = projects.length;
  const critical = projects.filter(p => p.status === 'Critical').length;
  const atRisk = projects.filter(p => p.status === 'At Risk').length;
  const onTrack = projects.filter(p => p.status === 'On Track').length;
  const budgetTotal = projects.reduce((acc, p) => acc + p.budget, 0);
  const spentTotal = projects.reduce((acc, p) => acc + p.spent, 0);
  
  return {
    projectCount: total,
    portfolioHealth: 100 - ((critical * 2 + atRisk) / total * 100),
    budgetConsumedPct: (spentTotal / budgetTotal) * 100,
    scheduleVariance: (Math.random() * 2 - 1).toFixed(1),
    totalBudget: budgetTotal,
    totalSpent: spentTotal,
    onTrackPct: (onTrack / total) * 100,
    atRiskPct: (atRisk / total) * 100
  };
};

export const sampleDataService = {
  generateProjects,
  generateRisks,
  generateCostTrends,
  calculateKPIs,
  
  generateProjectTrackingData: () => {
    const projects = generateProjects(20);
    const timelineData = projects.slice(0, 5).map(p => ({
      name: p.name,
      start: Math.floor(Math.random() * 20),
      duration: Math.floor(Math.random() * 40) + 20,
      status: p.status
    }));
    return { projects, timelineData, kpis: calculateKPIs(projects) };
  },

  generateFinancialData: () => {
    return { 
      trendData: generateCostTrends(),
      costDistribution: [
        { name: 'Labor', value: 450000, color: '#3A7BFF' },
        { name: 'Licenses', value: 120000, color: '#BFA76A' },
        { name: 'Infrastructure', value: 80000, color: '#10B981' },
        { name: 'Travel', value: 30000, color: '#F59E0B' },
      ]
    };
  },

  generateSalesData: () => {
    return {
      salesTrend: Array.from({ length: 12 }, (_, i) => ({
        month: format(subMonths(new Date(), 11 - i), 'MMM'),
        revenue: Math.floor(Math.random() * 50000) + 20000,
        target: 45000
      })),
      byRegion: [
        { name: 'North America', value: 45, color: '#3A7BFF' },
        { name: 'Europe', value: 30, color: '#BFA76A' },
        { name: 'Asia', value: 15, color: '#10B981' }
      ]
    };
  },

  generatePMOData: () => {
    const risks = [];
    for(let i=0; i<15; i++) risks.push(...generateRisks(`P-${i}`));
    return {
      risks: risks.slice(0, 20),
      statusCounts: [
        { name: 'On Track', value: 12, color: '#10B981' },
        { name: 'At Risk', value: 5, color: '#F59E0B' },
        { name: 'Critical', value: 2, color: '#EF4444' },
      ]
    };
  }
};