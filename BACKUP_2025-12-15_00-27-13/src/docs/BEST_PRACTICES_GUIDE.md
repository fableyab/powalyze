# Best Practices Guide

## Data Modeling
*   **Star Schema:** Always. No snowflake unless unavoidable.
*   **Integers for Keys:** Use Integers for joining tables (surrogate keys), not Strings/GUIDs, for 2x performance.
*   **Measures Table:** Keep all measures in a dedicated empty table.

## DAX
*   **DIVIDE:** Safe division.
*   **Variables (VAR):** Use for readability and performance (caches result).
*   **Avoid Iterator Functions (FILTER) on entire tables:** Filter columns, not tables.

## Security
*   **Least Privilege:** Service Principal should only have access to the specific Production Workspace.
*   **RLS Testing:** Test RLS roles extensively in PBI Desktop before deploying.

## Frontend
*   **Bootstrap:** Use `powerbi.bootstrap()` to initialize the iframe div before the token arrives. This reduces perceived load time.
*   **Phased Loading:** Load the layout/skeleton first, then embed the report.