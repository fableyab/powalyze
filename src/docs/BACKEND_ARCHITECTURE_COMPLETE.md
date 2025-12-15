# Complete Backend Architecture (Node.js)

## Overview
The backend serves as the secure gatekeeper between the React Frontend and the Power BI Service. It handles authentication, token generation, and RLS mapping.

## Tech Stack
*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js
*   **Auth Library:** `msal-node` (Azure AD Authentication)
*   **Power BI Library:** `powerbi-client-node`

## Core Components

### 1. Service Principal Auth (`authService.js`)
Authenticates the app against Azure AD to get an `access_token` for the Power BI REST API.