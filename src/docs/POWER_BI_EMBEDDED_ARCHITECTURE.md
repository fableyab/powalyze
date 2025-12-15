# Power BI Embedded Architecture

## Integration Mode: App-Owns-Data
This mode allows the application to authenticate users via its own method (Azure AD, Auth0, Supabase) and present Power BI content without requiring end-users to have Power BI licenses.

## Components

### 1. Service Principal (Master App)
*   **Azure Identity:** An Azure AD App Registration representing the application.
*   **Permissions:** `Tenant.Read.All`, `Report.Read.All`, `Dataset.Read.All` (Power BI Service API).
*   **Security Group:** The SP is added to a specific AD Security Group which is enabled in the Power BI Admin Portal tenant settings.

### 2. Workspace Strategy
*   **Production Workspace:** Dedicated workspace backed by capacity.
*   **Access:** The Service Principal is added as an **Admin** or **Member** of this workspace.
*   **Content:** Contains the "Master Dataset" and "Master Report".

### 3. Capacity
*   **SKU:** `A-SKU` (Azure) or `F-SKU` (Fabric).
*   **Scaling:** Vertical scaling (A1 -> A4) handled via Azure automation scripts during peak loads.
*   **Pause/Resume:** Automation to pause capacity during off-hours (nights/weekends) to save costs.

## Token Flow
1.  **Frontend** requests report access.
2.  **Backend** validates user session.
3.  **Backend** uses SP Client Secret to authenticate with Azure AD -> gets `access_token`.
4.  **Backend** calls PBI REST API (`GenerateToken`) using `access_token` + RLS Identity -> gets `embed_token`.
5.  **Frontend** receives `embed_token` and renders iframe.