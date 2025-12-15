import { Briefcase, AlertTriangle, Users, TrendingUp, TrendingDown, DollarSign, Activity, CheckCircle, Clock } from 'lucide-react';

/**
 * Comprehensive Demo Data for Powalyze
 * Includes realistic datasets for Projects, PMO Reports, Power BI mocks, and Analytics.
 */

export const demoProjects = [
  {
    id: "PROJ-001",
    name: "Global SAP Migration",
    client: "Acme Corp",
    manager: "Sarah Connor",
    status: "In Progress",
    health: "At Risk",
    budget: 2500000,
    spent: 1850000,
    currency: "EUR",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    teamSize: 12,
    riskLevel: "High",
    description: "Migrating legacy ERP systems to SAP S/4HANA across 3 continents.",
    risks: [
      { id: "R1", title: "Data Migration Errors", impact: "High", probability: "Medium" },
      { id: "R2", title: "Key Resource Unavailable", impact: "High", probability: "High" }
    ],
    milestones: [
      { name: "Blueprint", status: "Completed", date: "2024-03-01" },
      { name: "Development", status: "In Progress", date: "2024-12-01" },
      { name: "UAT", status: "Pending", date: "2025-03-01" }
    ]
  },
  {
    id: "PROJ-002",
    name: "Cloud Infrastructure Setup",
    client: "TechGiant Inc",
    manager: "John Smith",
    status: "On Track",
    health: "Healthy",
    budget: 850000,
    spent: 320000,
    currency: "USD",
    progress: 42,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    teamSize: 6,
    riskLevel: "Low",
    description: "Setting up scalable AWS infrastructure for new product launch.",
    risks: [],
    milestones: [
      { name: "Architecture Review", status: "Completed", date: "2024-04-15" }
    ]
  },
  {
    id: "PROJ-003",
    name: "AI Customer Support Bot",
    client: "RetailPlus",
    manager: "Emily Chen",
    status: "In Progress",
    health: "Critical",
    budget: 450000,
    spent: 420000,
    currency: "EUR",
    progress: 88,
    startDate: "2024-02-01",
    endDate: "2024-10-30",
    teamSize: 8,
    riskLevel: "Critical",
    description: "Implementing GenAI for tier 1 customer support automation.",
    risks: [
      { id: "R3", title: "Budget Overrun", impact: "High", probability: "Certain" },
      { id: "R4", title: "API Latency Issues", impact: "Medium", probability: "High" }
    ],
    milestones: [
      { name: "Prototype", status: "Completed", date: "2024-04-01" },
      { name: "Live Pilot", status: "Delayed", date: "2024-09-01" }
    ]
  },
  {
    id: "PROJ-004",
    name: "Mobile App Redesign",
    client: "FinTech Sol",
    manager: "Mike Ross",
    status: "Planning",
    health: "Healthy",
    budget: 120000,
    spent: 5000,
    currency: "GBP",
    progress: 5,
    startDate: "2024-10-01",
    endDate: "2025-02-28",
    teamSize: 4,
    riskLevel: "Low",
    description: "UX/UI overhaul of the main consumer banking application.",
    risks: [],
    milestones: []
  },
  {
    id: "PROJ-005",
    name: "Cybersecurity Audit",
    client: "HealthCare Bros",
    manager: "Lisa Wong",
    status: "Completed",
    health: "Healthy",
    budget: 80000,
    spent: 78000,
    currency: "USD",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    teamSize: 3,
    riskLevel: "Low",
    description: "Annual security compliance and penetration testing.",
    risks: [],
    milestones: []
  }
];

export const demoKPIs = [
  { id: 1, label: "Total Budget", value: "€3.8M", change: "+12%", trend: "up", icon: DollarSign, color: "text-blue-500" },
  { id: 2, label: "Portfolio Health", value: "82%", change: "-2.4%", trend: "down", icon: Activity, color: "text-green-500" },
  { id: 3, label: "Active Projects", value: "12", change: "+2", trend: "up", icon: Briefcase, color: "text-[#BFA76A]" },
  { id: 4, label: "Critical Risks", value: "3", change: "+1", trend: "up", icon: AlertTriangle, color: "text-red-500" }
];

export const demoRisks = [
  { id: 'R1', name: 'Resource Shortage', prob: 'High', impact: 'High', project: 'Global SAP Migration' },
  { id: 'R2', name: 'Budget Overrun', prob: 'Medium', impact: 'High', project: 'AI Customer Support Bot' },
  { id: 'R3', name: 'Vendor Delay', prob: 'High', impact: 'Medium', project: 'Global SAP Migration' },
  { id: 'R4', name: 'Scope Creep', prob: 'Low', impact: 'Low', project: 'Cloud Infrastructure Setup' },
  { id: 'R5', name: 'Regulatory Change', prob: 'Low', impact: 'Critical', project: 'FinTech Sol' },
];

export const demoPowerBIReports = [
  {
    id: "PBI-001",
    name: "Executive PMO Dashboard",
    workspace: "Executive Workspace",
    type: "Dashboard",
    lastRefreshed: "2024-10-25T08:30:00Z",
    owner: "Admin",
    dataset: "PMO_Master_Dataset"
  },
  {
    id: "PBI-002",
    name: "Financial Performance Q3",
    workspace: "Finance",
    type: "Report",
    lastRefreshed: "2024-10-24T18:00:00Z",
    owner: "CFO Office",
    dataset: "Finance_Q3_2024"
  },
  {
    id: "PBI-003",
    name: "Resource Utilization Heatmap",
    workspace: "HR Analytics",
    type: "Report",
    lastRefreshed: "2024-10-25T09:15:00Z",
    owner: "HR Director",
    dataset: "HR_Resources_Live"
  }
];

export const demoAnalytics = {
  sessions: [
    { date: 'Mon', value: 120 },
    { date: 'Tue', value: 132 },
    { date: 'Wed', value: 101 },
    { date: 'Thu', value: 134 },
    { date: 'Fri', value: 190 },
    { date: 'Sat', value: 230 },
    { date: 'Sun', value: 210 },
  ],
  conversions: {
    signup: 12.5,
    pro: 3.2,
    enterprise: 0.8
  },
  topPages: [
    { path: '/dashboard', views: 1540 },
    { path: '/reports/pmo', views: 890 },
    { path: '/settings', views: 320 }
  ]
};