# Page 1: Executive Dashboard Specification

## Purpose
To provide C-Level executives with a "single pane of glass" view of the entire project portfolio's health and financial status.

## Layout & Visuals

### 1. Top KPI Cards (Row 1)
*   **Total Projects:** Count of active projects.
*   **Portfolio Health Score:** Weighted average of project health (0-100).
*   **Budget Consumed %:** `(Total Actual Cost / Total Budget) %`.
*   **Critical Projects:** Count of projects with Status = "Critical".
*   **Schedule Variance:** Average delay in weeks.

### 2. Main Visuals
*   **Project Status Distribution (Donut Chart):**
    *   *Legend:* On Track (Green), At Risk (Yellow), Critical (Red).
    *   *Values:* Count of Projects.
    *   *Interaction:* Filters the rest of the page.
*   **Budget vs Realized (Clustered Bar Chart):**
    *   *Axis:* Portfolio / Department.
    *   *Values:* Planned Budget vs Actual Cost.
    *   *Analytics Line:* Target Budget Line.
*   **Global Footprint (Map):**
    *   *Location:* Project Country/City.
    *   *Bubble Size:* Budget Size.
    *   *Color:* Health Status.

### 3. Timeline (Gantt-style Matrix)
*   **Visual:** Matrix or Custom Gantt.
*   **Rows:** Top 10 Strategic Projects.
*   **Columns:** Months (Rolling 12).
*   **Values:** Milestones markers.

## DAX Measures Required
*   `[# Projects]` = `COUNTROWS(Dim_Projects)`
*   `[% Budget Consumed]` = `DIVIDE([Total Actual], [Total Budget], 0)`
*   `[Health Score]` = `AVERAGE(Dim_Projects[HealthValue])`
*   `[Critical Count]` = `CALCULATE([# Projects], Dim_Projects[Status] = "Critical")`

## Interaction Requirements
*   Clicking a slice on the "Status Donut" must filter the Map and Budget charts.
*   Hovering over a project in the Map should show a custom tooltip with the PM's name and next milestone.