# Troubleshooting Guide

## Common Error Codes

### 401 Unauthorized (Backend)
*   **Reason:** Backend cannot authenticate with Azure AD.
*   **Fix:** Check `AZURE_CLIENT_ID` and `AZURE_CLIENT_SECRET`. Check if secret expired.

### 403 Forbidden (Power BI)
*   **Reason:** Service Principal does not have access to Workspace.
*   **Fix:** Go to Workspace Access -> Add Service Principal App as Admin.

### "Content Not Available" (Iframe)
*   **Reason:** RLS Identity mismatch.
*   **Fix:** The `username` passed in the token generation must exist in the dataset (if using dynamic security) or the role name must match exactly.

### Slow Loading
*   **Reason:** Cold start of Capacity or complex DAX.
*   **Fix:** Check Performance Analyzer in Desktop. Check if Capacity needs scaling (A1 -> A2).