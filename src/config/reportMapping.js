export const reportMapping = {
  // PMO Reports
  executive_pmo: {
    id: "report-pmo-exec-001",
    datasetId: "dataset-pmo-001",
    name: "PMO Executive Dashboard",
    category: "PMO",
    rlsRoles: ["Executive", "ProjectManager"]
  },
  project_tracking: {
    id: "report-pmo-track-002",
    datasetId: "dataset-pmo-001",
    name: "Project Tracking Detail",
    category: "PMO",
    rlsRoles: ["ProjectManager"]
  },
  
  // Finance Reports
  finance_overview: {
    id: "report-fin-001",
    datasetId: "dataset-fin-001",
    name: "Financial Overview",
    category: "Finance",
    rlsRoles: ["CFO", "FinanceController"]
  },
  
  // Sales Reports
  sales_analytics: {
    id: "report-sales-001",
    datasetId: "dataset-sales-001",
    name: "Sales Performance",
    category: "Sales",
    rlsRoles: ["SalesManager", "RegionalManager"]
  },
  
  // Demo Reports (Mock IDs)
  demo_pmo: {
    id: "demo-report-id-1",
    datasetId: "demo-dataset-id-1",
    name: "Demo PMO Report",
    category: "Demo",
    rlsRoles: ["DemoUser"]
  }
};

export const getReportConfig = (reportKey) => {
  return reportMapping[reportKey] || null;
};