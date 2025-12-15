# Complete Deployment Guide

## Prerequisites
1.  **Azure Subscription:** With permission to register apps.
2.  **Power BI Pro License:** For publishing.
3.  **Power BI Capacity:**
    *   *Production:* Power BI Embedded (A-SKU) or Premium (P-SKU/F-SKU).
    *   *Testing:* Power BI Pro (Master User) or Embedded Trial.
4.  **Node.js Environment:** For backend.

## Step-by-Step Setup

### Phase 1: Azure Configuration
1.  **App Registration:** Create a new App in Azure AD.
    *   *Type:* Web App.
    *   *Secret:* Generate a Client Secret.
2.  **Security Group:** Create an Azure AD Security Group (e.g., "PowerBI Service Principals") and add the App to it.

### Phase 2: Power BI Service Configuration
1.  **Admin Portal:**
    *   Enable "Allow service principals to use Power BI APIs".
    *   Restrict to the Security Group created above.
2.  **Workspace:**
    *   Create a "Production" Workspace.
    *   Add the Service Principal (App) as an **Admin** or **Member** of the workspace.
3.  **Publish:**
    *   Publish the `.pbix` file to this workspace.
    *   Set up Gateway/Credentials for the dataset refresh.

### Phase 3: Backend Deployment
1.  **Environment Variables:**
    *   `AZURE_TENANT_ID`
    *   `AZURE_CLIENT_ID`
    *   `AZURE_CLIENT_SECRET`
    *   `PBI_WORKSPACE_ID`
    *   `PBI_REPORT_ID`
2.  **Deploy:** Push Node.js app to Azure App Service / Heroku / Vercel (Serverless functions).

### Phase 4: Frontend Deployment
1.  **Build:** `npm run build`
2.  **Env:** Set `VITE_API_URL` to point to the backend.
3.  **Deploy:** Push static assets to Azure Static Web Apps / Vercel / Netlify.

## Verification Checklist
- [ ] Backend returns a valid token with 200 OK.
- [ ] Report renders in Frontend.
- [ ] RLS is working (User A sees only Client A data).
- [ ] Auto-refresh of token works after 1 hour.