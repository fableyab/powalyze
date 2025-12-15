# Data Model Documentation

## Overview
The data model is a strictly typed **Star Schema** designed for high concurrency and RLS performance.

## 1. Dimension Tables
### `Dim_Client`
*   **PK:** `ClientId` (GUID)
*   **Columns:** `ClientName`, `SubscriptionTier`, `Region`
*   **Role:** Security anchor. RLS is applied here: `[ClientId] = USERNAME()`.

### `Dim_Project`
*   **PK:** `ProjectId`
*   **FK:** `ClientId`
*   **Columns:** `ProjectName`, `Status`, `Phase`, `Priority`, `ManagerID`
*   **Relationship:** Many-to-One to `Dim_Client`.

### `Dim_Date`
*   **PK:** `DateKey` (Integer YYYYMMDD)
*   **Columns:** `Date`, `Year`, `Quarter`, `Month`, `FiscalYear`
*   **Role:** Standard time intelligence.

## 2. Fact Tables
### `Fact_Projects`
*   **Grain:** One row per project snapshot (daily/weekly).
*   **FKs:** `ProjectId`, `DateKey`, `ClientId`.
*   **Metrics:** `Budget`, `Forecast`, `Actuals_YTD`, `HealthScore`.

### `Fact_Risks`
*   **Grain:** One row per risk entry.
*   **FKs:** `ProjectId`.
*   **Metrics:** `ProbabilityScore`, `ImpactScore`, `ExposureValue`.

## 3. Relationships & Optimization
*   **Direction:** All relationships are Single Direction (1->*) from Dimension to Fact.
*   **RLS Propagation:** `Dim_Client` -> `Dim_Project` -> `Fact_*`.
*   **VertiPaq Settings:**
    *   High cardinality columns (Descriptions, URLs) are removed or split to reduce memory footprint.
    *   Aggregations are pre-calculated in Power Query where possible.