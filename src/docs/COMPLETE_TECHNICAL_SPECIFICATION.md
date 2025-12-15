# Complete Technical Specification

*This document aggregates all specifications for the Powalyze PMO 360 solution.*

## 1. System Architecture
The system relies on Azure PaaS components. The React Frontend is stateless. The Node.js Backend is stateless (sessions managed via JWT/Supabase). State is persisted in Azure SQL and Power BI Service.

## 2. Data Flow
1.  ETL (Data Factory) -> Azure SQL.
2.  Power BI Refresh -> Import to Dataset (Capacity).
3.  User Request -> Backend Auth -> Token Gen -> Frontend Render.

## 3. Security
*   **Authentication:** Azure AD B2C (External Users).
*   **Row-Level Security:** Dynamic implementation using `USERNAME()` DAX function mapped to `ClientId`.

## 4. Frontend Specs
*   **Tech:** React 18, TailwindCSS.
*   **Lib:** `powerbi-client-react`.
*   **Performance:** Reports must load < 3s (using Phased Loading).

## 5. Operations
*   **Capacity:** F64 Fabric Capacity recommended for production workloads.
*   **Alerts:** Azure Monitor setup for API latency and Capacity CPU.