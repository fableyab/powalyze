# Power BI Report Specifications

## Report Structure
The Powalyze PMO 360 report consists of 6 core pages designed for specific personas.

### Page 1: Executive Dashboard (C-Level)
*   **Goal:** Instant view of portfolio health.
*   **Visuals:**
    *   *KPI Cards:* Total Budget, Portfolio Health Score, Critical Projects Count.
    *   *Donut Chart:* Project Status Distribution (On Track / At Risk / Critical).
    *   *Map:* Global Project Footprint.
    *   *Trend Line:* Burn-rate vs Budget.
*   **Interactivity:** Clicking a status slice filters the map and KPI cards.

### Page 2: Portfolio PMO (Operational)
*   **Goal:** Tactical management for PMOs.
*   **Visuals:**
    *   *Matrix:* Projects (Rows) vs Metrics (Cols: CPI, SPI, Phase, Next Milestone).
    *   *Slicers:* Project Manager, Domain, Priority.
    *   *Gantt Chart:* Timeline of key strategic initiatives.
*   **Features:** Drill-through to "Data Analysis" page.

### Page 3: Data Analysis
*   **Goal:** Root cause analysis.
*   **Visuals:**
    *   *Decomposition Tree:* Break down Cost Variance by Dept -> Project -> Cost Type.
    *   *Scatter Plot:* Schedule Variance vs Project Complexity.
    *   *Histogram:* Distribution of delays (weeks).

### Page 4: Risks & Governance
*   **Goal:** Compliance and risk mitigation.
*   **Visuals:**
    *   *Risk Matrix (Heatmap):* Probability vs Impact.
    *   *Table:* Active Risks with mitigation plans.
    *   *Guage:* Governance Compliance Score (Charter signed, Steering Committee held).

### Page 5: What-If Scenarios
*   **Goal:** Strategic simulation.
*   **Features:**
    *   *Parameters:* Budget Cut %, Capacity Reduction %.
    *   *Measures:* `[Simulated ROI]`, `[Projects Dropped]`.
    *   *Visuals:* Comparison Bar Chart (Baseline vs Scenario).

### Page 6: SaaS Teaser
*   **Goal:** Technical showcase for the embedding technology.
*   **Content:**
    *   Architecture diagram overlay.
    *   Explanation of "App-Owns-Data".
    *   Live RLS demonstration text.