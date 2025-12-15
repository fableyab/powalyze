import { sampleDataService } from './sampleDataService';

export const dashboardGeneratorService = {
  generateDashboard: async (data) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!data || (!data.data && !data.projects)) {
      throw new Error("Invalid data structure for dashboard generation");
    }

    const projects = data.projects || sampleDataService.generateProjects(10);
    const kpis = data.kpis || sampleDataService.calculateKPIs(projects);

    return {
      dashboardId: "gen_dash_" + Date.now(),
      title: "Generated PMO Dashboard",
      kpis,
      widgets: [
        { type: "kpi", title: "Total Budget", value: kpis.budgetConsumedPct || 0 },
        { type: "chart", title: "Project Status", data: projects.map(p => ({ category: p.status, value: 1 })) },
        { type: "table", title: "Risk Matrix", data: projects.flatMap(p => p.risks || []) }
      ],
      datasetId: "gen_ds_" + Date.now()
    };
  },

  createDataset: async (data) => {
    // Mock dataset creation
    return { id: `ds-${Date.now()}`, name: "Imported Dataset" };
  },

  createReport: async (datasetId) => {
    // Mock report creation
    return { id: `rep-${Date.now()}`, name: "Auto-Generated Report", embedUrl: "https://app.powerbi.com/reportEmbed?reportId=mock" };
  },

  publishDashboard: async (reportId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, url: "https://app.powerbi.com/groups/me/reports/" + reportId };
  }
};