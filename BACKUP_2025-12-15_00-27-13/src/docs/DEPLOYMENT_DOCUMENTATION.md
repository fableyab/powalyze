# Deployment Documentation

## Prerequisites
1.  **Azure Subscription** (Active).
2.  **Power BI Pro License** (for publishing master reports).
3.  **Git Repository** (GitHub/GitLab).

## Step-by-Step Guide

### 1. Power BI Service Setup
1.  Create Workspace "Powalyze_Prod".
2.  Add Service Principal as Admin.
3.  Assign Workspace to Embedded Capacity (A1/F64).

### 2. Backend Deployment (Azure App Service)
1.  Create App Service.
2.  Set Environment Variables:
    *   `AZURE_TENANT_ID`
    *   `AZURE_CLIENT_ID`
    *   `AZURE_CLIENT_SECRET`
    *   `PBI_WORKSPACE_ID`
3.  Deploy Node.js code.

### 3. Frontend Deployment (Static Web App)
1.  Build React app: `npm run build`.
2.  Deploy `dist/` folder to Azure Static Web Apps or CDN.
3.  Configure API Proxy (if needed) to route `/api/*` to the Backend App Service.

## Production Checklist
- [ ] RLS roles tested with "View As" in Desktop.
- [ ] Service Principal added to Workspace.
- [ ] Capacity is Active (not paused).
- [ ] Client Secrets are valid.
- [ ] CORS rules configured on Backend to allow Frontend domain.