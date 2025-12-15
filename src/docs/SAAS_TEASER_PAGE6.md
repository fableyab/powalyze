# Page 6: SaaS Teaser Specification

## Purpose
A showcase page designed for demo users to explain the technology behind the report they are viewing.

## Layout & Content

### 1. Architecture Diagram (Visual)
*   **Visual:** Image/Visio export of the React + Node + Power BI architecture.
*   **Annotations:** Callouts explaining "You are here" (Frontend) and "Data is here" (Power BI Service).

### 2. "How It Works" Cards
*   **Card 1: App-Owns-Data:** Explains that the user doesn't need a Power BI license.
*   **Card 2: Row-Level Security:** Explains how their data is isolated from other tenants.
*   **Card 3: Custom Actions:** Shows a button "Click me to trigger React Event" (demonstrates bi-directional communication).

### 3. Value Proposition
*   **Text:** "Embed analytics in days, not months."
*   **Metrics:** "50% faster development", "Native look & feel".

## Interactivity
*   The "Trigger React Event" button uses a specific URL scheme or visual interaction that the `powerbi-client-react` library listens for, triggering a browser alert or console log in the demo.