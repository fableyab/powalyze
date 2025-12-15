# Best Practices Guide

## Data Modeling
*   **Star Schema:** Always use Star Schema. Avoid bi-directional relationships unless absolutely necessary (and understand the performance impact).
*   **Hide Fields:** Hide all foreign keys and utility columns in Report View.
*   **Measures Table:** Group measures in a dedicated `_Measures` table (folder).

## DAX
*   **Variables:** Use `VAR` for readability and performance (calculates once).
*   **DIVIDE:** Always use `DIVIDE(a, b, 0)` instead of `a/b` to handle divide-by-zero safely.
*   **Filter Context:** Be explicit with `CALCULATE` and `ALL`/`FILTER`.

## Power Query
*   **Query Folding:** Ensure steps "fold" back to the SQL source (Native Query). Put folding-breaking steps (like Index Column) last.
*   **Parameters:** Use parameters for Server Name and Database Name to easily switch between Dev/Test/Prod.

## Security
*   **Service Principal:** Never use a Master User (username/password) in production. Use Service Principal (App Secret/Cert).
*   **Scope:** Grant only the minimum required API scopes in Azure AD.
*   **Dataset Isolation:** For ultra-high security requirements, consider separate workspaces/datasets per client (though harder to maintain).

## Frontend
*   **Bootstrap:** Use `powerbi.bootstrap()` for faster perceived loading time before the token is ready.
*   **Phased Loading:** Load a simple report page first, then allow navigation to complex pages.