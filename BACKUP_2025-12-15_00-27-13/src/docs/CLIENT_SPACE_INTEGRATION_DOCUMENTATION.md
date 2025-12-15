# Client Space & Integration Documentation

## Overview
This document outlines the setup, architecture, and usage of the new Client Space, Data Integration modules, and Contact functionalities implemented in the Powalyze application.

## 1. Client Space Implementation
**Route:** `/client/space`
**File:** `src/pages/ClientSpace/ClientSpacePage.jsx`

### Features
*   **Welcome Dashboard:** Personalized greeting for logged-in users (defaulting to "Demo User").
*   **Live Metrics:** Real-time KPI cards showing Total Projects, Budget, Hours, and PMO Health.
*   **Interactive Visualization:** 
    *   Implements `recharts` to render high-fidelity financial performance bar charts and project trend line charts.
    *   Simulates a "Live Power BI" experience using React components for faster loading and smoother interaction without requiring an embedded token for the demo.
*   **Data Integration Module:**
    *   Visual status indicators for connected data sources (SQL Server, SharePoint, Salesforce).
    *   Shows sync latency and connection health.
    *   "Add Source" placeholder for future extensibility.

## 2. Contact & Consultation Flow
**Route:** `/contact`
**Components:** `src/pages/ContactPage.jsx`, `src/components/Forms/ConsultationForm.jsx`

### Updates
*   **Formspree Endpoint:** Updated to `https://formspree.io/f/xeoyznlq`.
*   **Simplified Form:** 
    *   Reduced to essential fields: Email, Preference, Date.
    *   Removed Name, Phone, Message fields to streamline user entry for "Call me back" requests.
*   **Office Locations:** Added detailed address information for:
    *   **Suisse:** Genève, Zurich, Lausanne.
    *   **France:** Paris (Champs-Élysées).
*   **CTA Redirection:** Marketing buttons labeled "Demander une Consultation" now redirect to the external landing page `https://powalyze.ch/pmo-360-demo` to optimize conversion flow.

## 3. Power BI Advanced Page
**Route:** `/power-bi-advanced`

*   **Pricing Simplified:** Removed standard pricing tiers. Now displays only the "Enterprise Sur Mesure" option to emphasize the bespoke nature of the service.
*   **CTA Update:** The main action button links to the external demo page.

## 4. Technical Details

### Dependencies
*   `recharts`: For chart rendering.
*   `lucide-react`: For iconography.
*   `framer-motion`: For animations.
*   `shadcn/ui`: For UI components (Cards, Buttons, Inputs).

### Styling
*   **Theme:** Strict Dark Mode (`#0A0A0A` background).
*   **Accent:** Gold (`#BFA76A`) used for primary actions and highlights.
*   **Responsive:** Grid layouts adjust from 1 column (mobile) to 4 columns (desktop).

## 5. Troubleshooting

### Form Not Submitting
*   Check internet connection.
*   Ensure the email is valid.
*   Verify Formspree quota is not exceeded for the endpoint.

### Charts Not Appearing
*   Ensure `recharts` is installed (`npm install recharts`).
*   Check console for any ResizeObserver errors (common with responsive containers).

### Navigation Links
*   If "Demander une Consultation" 404s, verify the external URL in the `href` attribute.