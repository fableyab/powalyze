# Page 3: Data Analysis Specification

## Purpose
Deep-dive analytical capabilities to identify root causes of cost overruns, delays, and resource bottlenecks.

## Layout & Visuals

### 1. Cost Analysis Section
*   **Decomposition Tree:**
    *   *Analyze:* Total Cost Variance.
    *   *Explain By:* Department -> Project -> Phase -> Cost Type (License, Labor, T&E).
*   **Waterfall Chart:**
    *   *Breakdown:* Budget -> Approved Changes -> Actual Spend -> Forecast to Complete.

### 2. Delay Analysis Section
*   **Histogram of Delays:**
    *   *X-Axis:* Delay Buckets (0-1w, 1-4w, >4w).
    *   *Y-Axis:* Count of Projects.
*   **Correlation Plot:**
    *   *X-Axis:* Project Complexity Score.
    *   *Y-Axis:* Schedule Variance (Days).
    *   *Insight:* Do complex projects systematically fail?

### 3. Resource Analysis Section
*   **Stacked Area Chart:**
    *   *X-Axis:* Time (Month).
    *   *Y-Axis:* Hours.
    *   *Legend:* Role / Resource Type.
    *   *Analysis:* Capacity Line (Constant) vs Demand (Area).

## Power Query Requirements
*   **Merge:** Join `Fact_Costs` with `Dim_CostTypes`.
*   **Group By:** Pre-aggregate daily resource hours to weekly for performance.
*   **Custom Column:** `DelayCategory` = `if [Variance] > 30 then "High" else "Low"`.

## DAX Analytics
*   `[Sys Delay %]` = `CALCULATE([# Projects], [Schedule Variance] > 0) / [# Projects]`
*   `[Cost Efficiency]` = `DIVIDE([Earned Value], [Actual Cost], 0)`