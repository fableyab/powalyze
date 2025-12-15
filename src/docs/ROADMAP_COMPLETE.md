# Powalyze Technical Roadmap: From Demo to Industrialized SaaS

This roadmap outlines the 4 strategic tiers for evolving the Powalyze platform from a simple integrated demo to a scalable, multi-tenant SaaS solution using Power BI Embedded.

## Overview

| Tier | Name | Focus | Timeline | Key Feature |
|------|------|-------|----------|-------------|
| **1** | **Integrated Demo** | Quick Win & POC | **NOW** | Secure Iframe / Publish-to-Web (Secure) |
| **2** | **App-Owns-Data Proto** | Functional MVP | **Month 1-2** | Node.js Backend, Service Principal |
| **3** | **Multi-Tenant Logical** | Scalability | **Month 2-3** | Row-Level Security (RLS) |
| **4** | **SaaS Industrial** | Production | **Month 3-6** | Azure AD B2C, Dedicated Capacity |

---

## Tier 1: Démo Intégrée Sécurisée (NOW)
**Goal:** Prove the value proposition immediately using existing Power BI assets.
*   **Action:** Embed a specific "Demo Report" into the React app using a secure `iframe` or `powerbi-client` with a static token (for internal demo use).
*   **Context:** No dynamic RLS yet. All demo users see the same sample data.
*   **Deliverable:** A functional `src/pages/PowerBIDemoPage.jsx` showing a live report.

## Tier 2: Prototype "App-Owns-Data" (Months 1-2)
**Goal:** Establish the technical foundation for a white-label embedded experience.
*   **Architecture:** React Frontend + Simple Backend (Node.js/Next.js/.NET).
*   **Authentication:** The backend authenticates against Azure AD using a **Service Principal**.
*   **Flow:**
    1. Frontend requests report.
    2. Backend generates an **Embed Token**.
    3. Frontend renders report using `powerbi-client-react`.
*   **Deliverable:** A true embedded report without the Power BI chrome/nav bar.

## Tier 3: Multi-Tenant Logique (Months 2-3)
**Goal:** Onboard multiple pilot clients on a single infrastructure.
*   **Data Model:** Add `ClientID` column to all Fact/Dim tables in Power BI.
*   **Security:** Implement **Row-Level Security (RLS)** roles in Power BI Desktop (e.g., `[ClientID] = USERNAME()`).
*   **Backend Update:** When generating the Embed Token, pass the specific `identity` (Client ID) to enforce RLS.
*   **Deliverable:** Client A sees only Client A's data; Client B sees only Client B's data.

## Tier 4: Industrialisation SaaS (Months 3-6)
**Goal:** Scale for hundreds of users and automated onboarding.
*   **Identity:** Integrate **Azure AD B2C** for user management (Sign Up/Sign In).
*   **Infrastructure:** Purchase **Power BI Embedded Capacity (A-SKU or F-SKU)** for production workloads to avoid "Pro" license limits.
*   **Automation:** Terraform/scripts to deploy new workspaces or datasets automatically.
*   **Deliverable:** `portal.powalyze.ch` live in production.