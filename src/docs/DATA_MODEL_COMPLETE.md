# Complete Data Model Specification

## Star Schema Overview
The model is designed as a strict Star Schema to ensure high performance with Power BI VertiPaq engine.

### Fact Tables
1.  **Fact_Projects:** Core project metrics (current snapshot).
2.  **Fact_Costs:** Transactional cost data (date, amount, type).
3.  **Fact_Milestones:** Project schedule dates (planned vs actual).
4.  **Fact_Risks:** Risk register snapshots.
5.  **Fact_Resources:** Resource allocation (hours per day/project).

### Dimension Tables
1.  **Dim_Date:** Standard calendar table (Year, Quarter, Month, Week).
2.  **Dim_Project:** Project metadata (Name, ID, Description).
3.  **Dim_Client:** **CRITICAL** for Multi-Tenancy. Contains `ClientId`, `ClientName`.
4.  **Dim_Sponsor:** Sponsor hierarchy.
5.  **Dim_Manager:** Project Manager details.
6.  **Dim_Status:** Status definitions and sort orders.

## Relationships
*   `Fact_Projects` (*-1) `Dim_Client`
*   `Fact_Projects` (*-1) `Dim_Date` (on SnapshotDate)
*   `Fact_Costs` (*-1) `Dim_Project`
*   `Fact_Costs` (*-1) `Dim_Date`
*   `Fact_Risks` (*-1) `Dim_Project`
*   All relationships are **One-to-Many (1:*)** and **Single Direction** (Dim -> Fact).

## Multi-Tenant RLS Strategy
*   **Table:** `Dim_Client`
*   **Role:** `Client_Viewer`
*   **DAX Expression:** `[ClientId] = USERNAME()` (or `CUSTOMDATA()` depending on embed implementation).
*   **Propagation:** The RLS filter on `Dim_Client` propagates to `Fact_Projects`, which then propagates to other facts via `Dim_Project` if bi-directional filters are enabled for security, or via standard path if modeled correctly (Client -> Project -> Costs).

## VertiPaq Optimization
*   **Cardinality:** High cardinality columns (UUIDs, Descriptions) moved to separate tables or removed if not needed for analysis.
*   **Data Types:** Use `Fixed Decimal Number` (Currency) for costs to save memory (4 decimal places).
*   **Local Date Tables:** Disabled in options.