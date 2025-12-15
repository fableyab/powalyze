# Portfolio Overview & Data Upload Documentation

## Overview
This document details the new features added to the **Power BI Advanced** page: the Portfolio Overview interactive dashboard and the Client-Side Excel/CSV Upload functionality. It also covers updates to the pricing model and contact forms.

## 1. Portfolio Overview Section
**Location:** `src/pages/PowerBIAdvancedPage.jsx`

### Features
- **Interactive Dashboard:** Built using `recharts`, showing real-time metrics for Budget vs Spent and Risk Distribution.
- **KPI Cards:** Displays aggregated data for Total Budget, Active Projects, and High Priority Risks.
- **Filtering:** Users can filter the portfolio view by status (On Track, At Risk, Delayed, Completed).
- **Mock Data:** Currently uses static `mockPortfolioData` to demonstrate capabilities without backend dependency.

### Implementation Details
- Uses `useMemo` to filter data efficiently based on user selection.
- Responsive design adapts charts for mobile viewing.
- Premium dark mode styling consistent with the brand.

## 2. Excel/CSV Upload (Full Client Data)
**Location:** `src/pages/PowerBIAdvancedPage.jsx`

### Functionality
- **File Parsing:** Uses `xlsx` library to parse `.xlsx`, `.xls`, and `.csv` files entirely in the browser.
- **Privacy:** No data is sent to a server; all processing happens client-side for security and speed.
- **Data Preview:** Displays the first 50 rows of the uploaded file in a responsive table.
- **Statistics:** Shows total row count and column names.
- **Export:** Allows users to re-export the parsed data to verify data integrity.

### Usage
1. Drag & drop a file into the upload zone or click to browse.
2. Wait for the processing bar to complete.
3. Review the data table.
4. Use the "Exporter" button to download the processed data.

## 3. Pricing Updates
**Location:** `src/pages/PowerBIAdvancedPage.jsx`

- Removed "Starter" and "Professional" tiers.
- **New Tier:** "Enterprise Sur Mesure".
- Focused on high-value, custom deployments (On-Premise, SSO, Dedicated Support).
- CTA redirects to the Contact page for a quote.

## 4. PMO Solutions Redirect
- Added a dedicated section linking to the PMO 360 Demo (`https://powalyze.ch/pmo-360-demo`).
- Highlights key benefits: Centralization and Automation.

## 5. Formspree Integration
**Location:** `src/components/Forms/ConsultationForm.jsx`

- Replaced mock submission with `fetch` call to Formspree endpoint.
- Handles success/error states with visual feedback (Success checkmark or Error alert).
- Validation ensures all required fields are present before submission.

## Troubleshooting

### File Upload Fails
- **Issue:** "Fichier trop volumineux".
- **Fix:** Ensure file is under 10MB.
- **Issue:** "Erreur de lecture".
- **Fix:** Ensure file is a valid Excel or CSV format and not corrupted.

### Charts Not Rendering
- Ensure the window has focus; `recharts` sometimes pauses animation in background tabs.
- Check console for data format errors if modifying `mockPortfolioData`.

### Form Not Sending
- Check internet connection.
- If in production, verify the Formspree Form ID in `ConsultationForm.jsx`.
- In demo mode, it will simulate success even if the ID is invalid.