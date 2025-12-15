# Powalyze PMO 360 - Complete Technical Documentation

## Executive Summary
Powalyze PMO 360 is a high-performance Project Portfolio Management (PPM) solution that leverages **Power BI Embedded** to deliver "App-Owns-Data" analytics within a custom React application. This architecture allows for a seamless, white-labeled user experience where multi-tenancy is enforced via Row-Level Security (RLS) on a single shared dataset.

## 1. Architecture Overview
The solution follows a standard 3-tier architecture:
1.  **Frontend (React/Vite):** Handles UI, navigation, and the Power BI iframe embedding via `powerbi-client-react`.
2.  **Backend (Node.js/Express):** Acts as a secure proxy to Azure AD. It holds the Service Principal secrets and generates Embed Tokens.
3.  **Data/Analytics (Power BI Service):** Hosts the semantic models, reports, and connects to underlying data sources (SQL/SharePoint).

### High-Level Diagram
`[User] <-> [React App] <-> [Node.js Backend] <-> [Azure AD & Power BI API] <-> [Power BI Capacity]`

## 2. Data Model Strategy
We utilize a **Star Schema** optimized for the VertiPaq engine.
-   **Fact Tables:** `Fact_Projects`, `Fact_Costs`, `Fact_Risks`, `Fact_Milestones`.
-   **Dimension Tables:** `Dim_Client` (Critical for RLS), `Dim_Date`, `Dim_Project`, `Dim_Manager`.
-   **Security:** RLS filters `Dim_Client` based on the authenticated user's organization ID.

## 3. Security Model
-   **Authentication:** Users log in to the React App via Azure AD (MSAL) or Custom Auth (Supabase).
-   **Authorization:** The Node.js backend maps the web user identity to a Power BI RLS Role (`Client_Viewer`) and a specific `ClientId`.
-   **Isolation:** Data segregation is logical but strict. A single dataset serves all tenants, filtered dynamically at query time.

## 4. Deployment Strategy
-   **Frontend:** Static Web App (Azure/Vercel).
-   **Backend:** Serverless Functions or App Service (Azure).
-   **Power BI:** Dedicated Workspace backed by an Embedded Capacity (A-SKU or Fabric F-SKU) for production.

---
*Refer to specific sub-documents for detailed specifications on DAX, APIs, and Operations.*