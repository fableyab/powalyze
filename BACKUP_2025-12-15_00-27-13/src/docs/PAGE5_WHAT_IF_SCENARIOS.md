# Page 5: What-If Scenarios Specification

## Purpose
To simulate the impact of strategic decisions (budget cuts, delays) on the portfolio without changing the underlying data.

## Layout & Visuals

### 1. Simulation Parameters (What-If Parameters)
*   **Budget Reduction %:** Slider (0% to 50%).
*   **Capacity Reduction %:** Slider (0% to 30%).
*   **Global Delay (Weeks):** Slider (0 to 12).

### 2. Comparison Visuals (Current vs Simulated)
*   **KPI Cards (Comparative):**
    *   *Total Budget:* Current vs Simulated.
    *   *Projected Delivery:* Current vs Simulated.
    *   *Projects Cancelled:* 0 vs (Calculated based on cut).
*   **Bar Chart (Before/After):**
    *   *X-Axis:* Scenario (Baseline, Simulated).
    *   *Y-Axis:* Portfolio Value / ROI.

## DAX Logic for Simulation
*   `[Simulated Budget]` = `[Total Budget] * (1 - 'Budget Param'[Value])`
*   `[Simulated ROI]` = `CALCULATE([Total ROI], FILTER(Dim_Projects, [Priority] < 'Cutoff Threshold'))`
*   `[Projects Dropped]` = `CALCULATE([# Projects], [Cumulative Cost] > [Simulated Budget])` (Requires ranking logic).

## UX Considerations
*   Use a "Reset" button (Bookmark) to set all sliders back to 0.
*   Use clear color coding: Grey for Baseline, Purple for Simulation.