# Multi-Tenant Architecture

## Philosophy
We use a **Single Dataset** approach with dynamic Row-Level Security (RLS). This is the most scalable approach for SaaS, avoiding the management nightmare of deploying 1 dataset per client.

## RLS Implementation details

### 1. Database Level
Every transactional table (`Projects`, `Costs`) must have a `ClientId` column, or be relatable to a table that does via a 1-* chain.

### 2. Power BI Model Level
*   **Role:** `Client_Viewer`
*   **DAX Filter on `Dim_Client`:** `[ClientId] = USERNAME()`
*   **Effect:** When the backend generates a token for "Client_A", it passes "Client_A" as the username. Power BI filters `Dim_Client` to only that row. This filter propagates down to `Fact_Projects` and `Fact_Costs`, hiding all other clients' data.

## Alternative: Workspace Separation
*   *Use Case:* High-security clients (Gov/Banking) requiring physical data isolation.
*   *Implementation:* Create a separate workspace for the client. Clone the .pbix file. Parameterize the SQL connection string to point to a separate DB schema.
*   *Pros:* Physical isolation. *Cons:* Deployment complexity (CICD pipelines needed for each client).