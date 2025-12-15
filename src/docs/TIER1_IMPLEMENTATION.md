# Tier 1 Implementation Guide: Integrated Demo

**Objective:** Embed a secure Power BI report into the Powalyze React application to demonstrate analytics capabilities to prospects.

## Prerequisites
1.  **Power BI Pro License**: Required to publish to a workspace.
2.  **Workspace**: A dedicated workspace named `Powalyze_Demo`.
3.  **Report**: A .pbix file with sample data (not sensitive).

## Implementation Steps

### Step 1: Publish Report
1.  Open your report in Power BI Desktop.
2.  Publish to `Powalyze_Demo` workspace.
3.  In the Power BI Service, open the report.
4.  Go to **File > Embed report > Website or Portal**.
5.  Copy the **Secure Embed URL** (starts with `https://app.powerbi.com/reportEmbed...`).
    *   *Note: Do NOT use "Publish to Web (Public)" if the data is sensitive, even for a demo.*

### Step 2: Configure React Component
Create a generic Iframe wrapper component:
`src/components/PowerBIEmbed/DemoReportIframe.jsx`