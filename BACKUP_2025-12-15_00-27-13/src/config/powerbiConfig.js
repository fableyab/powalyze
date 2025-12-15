export const powerbiConfig = {
  // Service Principal Configuration (Mocked for frontend-only demo)
  authorityUrl: "https://login.microsoftonline.com/common/",
  resourceUrl: "https://analysis.windows.net/powerbi/api",
  apiUrl: "https://api.powerbi.com/",
  
  // Workspace & Report IDs (Placeholders)
  workspaceId: "f6bfd646-b718-44dc-a378-b73e6b50601c",
  reportId: "5b218778-e7a5-4d73-8187-f10824047715",
  datasetId: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
  
  // Settings
  tokenExpiration: 60, // minutes
  autoRefreshInterval: 30000, // ms
  
  // Feature Flags
  enableRLS: true,
  enableEditing: false,
  enablePanes: {
    filters: true,
    pageNavigation: true
  }
};