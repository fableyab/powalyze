# Page 2: Portfolio PMO Specification

## Purpose
Operational management for Project Managers and PMO leaders to track detailed project status and prioritization.

## Layout & Visuals

### 1. Control Panel (Left Sidebar)
*   **Slicers:** Domain (IT, HR, R&D), Project Manager, Status, Phase, Priority.
*   **Date Range:** Relative Date Slicer (Next 3 Months, This Year).

### 2. Main Content
*   **Detailed Project Table (Main Visual):**
    *   *Columns:* Project Name, Sponsor, PM, Phase, Status (Icon), Health Score, budget, ROI, Next Milestone.
    *   *Conditional Formatting:*
        *   Status: Red/Amber/Green icons.
        *   Health Score: Data bars.
        *   Budget: Red text if > 100%.
*   **Impact vs Urgency (Scatter Plot/Heatmap):**
    *   *X-Axis:* Urgency Score.
    *   *Y-Axis:* Impact Score.
    *   *Legend:* Priority Level.
    *   *Play Axis:* Date (to see movement over time).

### 3. Bookmarks (View Switcher)
*   **Financial View:** Switches table columns to show Budget, Actual, Variance, ETC, EAC.
*   **Risk View:** Switches table columns to show Risk Count, High Risks, Issue Count.
*   **Timeline View:** Shows a Gantt chart visual instead of the table.

## DAX Measures Required
*   `[Selected Projects]` = `COUNTROWS(Dim_Projects)` (responds to filters).
*   `[CPI]` (Cost Performance Index) = `[EV] / [AC]`.
*   `[SPI]` (Schedule Performance Index) = `[EV] / [PV]`.

## Conditional Formatting Rules
*   **Status:**
    *   "Critical" -> Red Icon
    *   "At Risk" -> Yellow Icon
    *   "On Track" -> Green Icon