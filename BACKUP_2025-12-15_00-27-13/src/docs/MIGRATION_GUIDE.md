# Migration Guide

## From Power BI Premium (User-Owns-Data) to Embedded (App-Owns-Data)
1.  **Auth Change:** Switch from user login (popup) to Service Principal (silent backend auth).
2.  **Workspace:** Move reports to a workspace assigned to an Embedded Capacity.
3.  **Code:** Update `powerbi-client` config to use `TokenType.Embed` instead of `TokenType.Aad`.

## From Excel/Manual to Power BI
1.  **Data Ingestion:** Create Dataflows to ingest Excel files from SharePoint.
2.  **Modeling:** Recreate Excel logic in DAX measures.
3.  **Validation:** Run parallel reporting for 1 month to validate numbers.