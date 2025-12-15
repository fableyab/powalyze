# Complete Frontend Architecture (React)

## Overview
The frontend integrates the Power BI report using the `powerbi-client-react` library and manages the lifecycle of the embed token.

## Tech Stack
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Library:** `powerbi-client-react`
*   **Styling:** TailwindCSS (for wrapper containers)

## Component Structure

### `PowerBIEmbedContainer.jsx`
The main wrapper component.
*   **Props:** `reportId`, `filters` (optional).
*   **State:** `token`, `embedUrl`, `loading`, `error`.
*   **Effect:** Fetches token from backend on mount.

### `embedConfig` Object