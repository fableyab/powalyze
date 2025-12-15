# Live Demo Documentation

This document outlines the setup and architecture for the Powalyze Live Demo functionality.

## Overview

The Live Demo section (`src/pages/LiveDemoPage.jsx`) serves as a marketing gateway to the actual interactive demo pages (`src/pages/PowerBIEmbedPage.jsx`). It is designed to showcase the capabilities of Power BI Advanced integration without immediately requiring authentication for the landing content, though the demo itself may be protected.

## Page Structure

### 1. LiveDemoPage (`/live-demo`)
- **Purpose**: Marketing landing page for the demo.
- **Components**:
  - Hero Section with CTA.
  - Feature Grid (Icons + Descriptions).
  - Preview Image linked to the actual interactive demo.
  - Use Cases cards.
  - Footer CTA.

### 2. Interactive Demo (`/powerbi-embed-page`)
- **Purpose**: The actual interactive embedded report.
- **Protection**: Protected by `AuthGuard` (requires login).

## Key Components

### PremiumChart (`src/components/PremiumVisuals/PremiumChart.jsx`)
Updated to handle potential `undefined` data gracefully.
- **Props**:
  - `data`: Array of objects (Required).
  - `series`: Array of series definitions (Required).
  - `loading`: Boolean for loading state.
  - `error`: String for error messages.
- **Safety**: Checks `Array.isArray(data)` before mapping to prevent crashes.

## Routing Updates (`src/App.jsx`)

New routes added:
- `/live-demo`: Public access.
- `/power-bi-advanced`: Public technical overview.

## Best Practices for Demo Data

1. **Mock vs Real**: Currently using mock data in `src/lib/mockDemoData.js`.
2. **Performance**: Large datasets should be paginated or aggregated on the backend if not using direct Power BI embedding.
3. **Security**: Ensure no real sensitive client data is ever used in the public demo.

## Troubleshooting

- **Chart Crashes**: Ensure `data` passed to `PremiumChart` is always an array, even if empty (`[]`).
- **404 on Refresh**: Ensure `_redirects` file exists for SPA routing on Netlify/Vercel (handled by build configuration).