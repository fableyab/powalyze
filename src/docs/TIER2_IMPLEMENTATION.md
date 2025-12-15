# Tier 2 Implementation Guide: App-Owns-Data Prototype

**Objective:** Move away from user-based licensing (User-Owns-Data) to application-based embedding (App-Owns-Data), where the app handles authentication transparency.

## Architecture
*   **Frontend**: React (Powalyze App)
*   **Backend**: Node.js (Express) or Azure Functions
*   **Auth Provider**: Azure Active Directory (Service Principal)

## Steps

### Step 1: Azure Setup
1.  **App Registration**: Register a new app in Azure AD (`Powalyze_Embed_App`).
2.  **Secret**: Generate a Client Secret.
3.  **Permissions**: Grant `PowerBI.Service` API permissions.
4.  **Security Group**: Create an AD Security Group, add the Service Principal to it.
5.  **Admin Portal**: Enable "Allow service principals to use Power BI APIs" in Power BI Admin Portal.

### Step 2: Backend Logic (Node.js Example)
Use the `powerbi-client-node` library or native fetch.