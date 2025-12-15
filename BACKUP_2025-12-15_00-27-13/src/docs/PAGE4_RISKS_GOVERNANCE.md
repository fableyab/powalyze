# Page 4: Risks & Governance Specification

## Purpose
To monitor compliance, active risks, and governance gates.

## Layout & Visuals

### 1. Risk Matrix (Heatmap)
*   **Visual:** Matrix Visual or Custom Heatmap.
*   **Rows:** Probability (Low, Medium, High).
*   **Columns:** Impact (Low, Medium, High, Critical).
*   **Values:** Count of Active Risks.
*   **Color Scale:** Green (Low/Low) to Red (High/Critical).

### 2. Governance Gates
*   **Funnel Chart:**
    *   *Stages:* Idea -> Definition -> Planning -> Execution -> Closing.
    *   *Values:* # Projects in each stage.
    *   *Conversion Rate:* % moving to next stage.
*   **Compliance Checklist (Table):**
    *   *Rows:* Project.
    *   *Columns:* Charter Signed?, Budget Approved?, Risks Logged?, SteerCo Held?
    *   *Icons:* Checkmark / Cross.

### 3. Alert Timeline
*   **Visual:** Table or custom card list sorted by Date (Desc).
*   **Content:** Date, Project, Alert Type (Budget Breach, Milestone Missed), Severity.

## DAX Risk Measures
*   `[Risk Score]` = `SUMX(Fact_Risks, [ProbabilityValue] * [ImpactValue])`
*   `[Risk Exposure ($)]` = `SUMX(Fact_Risks, [EstimatedCostImpact] * [Probability %])`
*   `[Governance Score]` = `([Gates Passed] / [Total Gates]) * 100`