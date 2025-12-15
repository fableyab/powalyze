# Powalyze PMO 360 - Complete Developer Guide

## 1. Overview
Powalyze PMO 360 is a React-based SPA that integrates Power BI Embedded to provide a comprehensive Project Portfolio Management solution. It uses a "App-Owns-Data" embedding strategy.

## 2. Architecture
- **Frontend**: Vite + React + Tailwind + Recharts
- **Embedding**: powerbi-client-react wrapper
- **Auth**: Azure AD (for internal) + Custom Auth (for SaaS clients)
- **Backend (Mocked)**: Node.js logic simulated in browser services for demo.

## 3. Data Model & DAX
The Power BI model is a Star Schema:
- **Fact Tables**: `Fact_Costs`, `Fact_Risks`, `Fact_Milestones`
- **Dim Tables**: `Dim_Projects`, `Dim_Time`, `Dim_Clients`

### Key Measures
\`\`\`dax
Budget Variance % = DIVIDE([Actual Cost] - [Planned Cost], [Planned Cost], 0)
Portfolio Health Score = AVERAGE(Dim_Projects[HealthScore])
Risk Exposure = SUMX(Fact_Risks, [Probability] * [Impact])
\`\`\`

## 4. Security (RLS)
Security is handled via the `EffectiveIdentity` property when generating the embed token.
- `username`: The Client ID (e.g., "Novartis")
- `roles`: ["Client_Viewer"]
- `datasets`: [The Dataset ID]

## 5. Deployment
1. Build frontend: \`npm run build\`
2. Deploy backend to Azure App Service / Heroku.
3. Configure environment variables in backend.
4. Set up Power BI Service Principal in Azure Portal.