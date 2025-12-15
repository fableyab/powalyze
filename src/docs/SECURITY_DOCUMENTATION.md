# Security Documentation

## 1. Service Principal Security
*   The **Client Secret** for the Azure AD App is the "Key to the Kingdom".
*   **Storage:** Must be stored in a secure vault (Azure Key Vault) and injected as an Environment Variable (`AZURE_CLIENT_SECRET`) into the backend at runtime.
*   **Rotation:** Secrets should be rotated every 3-6 months.

## 2. Token Scope
*   The backend validates that the logged-in user actually belongs to the `ClientId` they are requesting data for.
*   The generated Embed Token is strictly scoped to:
    *   Specific Report ID.
    *   Specific Dataset ID.
    *   Specific RLS Identity.
    *   Access Level: `View` (Preventing `Edit` or `SaveAs` unless explicitly authorized).

## 3. Data Protection
*   **Encryption at Rest:** Azure SQL / Power BI Service handles this natively (Microsoft Managed Keys).
*   **Encryption in Transit:** All traffic (React <-> Node <-> Azure) uses TLS 1.2+.

## 4. Audit & Monitoring
*   Enable Power BI Audit Logs in Office 365 Security Center.
*   Monitor "ViewReport" events to track usage per user/client.