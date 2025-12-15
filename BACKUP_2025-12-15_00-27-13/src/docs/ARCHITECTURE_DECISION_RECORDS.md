# Architecture Decision Records (ADR)

## ADR-001: App-Owns-Data Strategy
*   **Decision:** We chose "App-Owns-Data".
*   **Rationale:** To allow white-labeling and remove the licensing burden from end-clients. Clients should not know Power BI is running underneath.

## ADR-002: Single Dataset Multi-Tenancy
*   **Decision:** Use one master dataset with RLS.
*   **Rationale:** Managing 100+ separate datasets for 100 clients is unmaintainable (schema changes would need to be replicated 100 times). RLS scales better.

## ADR-003: Service Principal Auth
*   **Decision:** Use Service Principal instead of "Master User" account.
*   **Rationale:** Master User requires MFA which breaks automation. Service Principal is the Microsoft-recommended secure method for server-side auth.