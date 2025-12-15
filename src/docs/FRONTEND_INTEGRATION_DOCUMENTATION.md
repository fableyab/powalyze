# Frontend Integration Documentation

## Overview
The frontend uses `powerbi-client-react` to render the report. It handles the lifecycle of the embed token (refreshing it before expiration).

## Core Component: `PowerBIEmbedContainer`

### Props
*   `reportId`: The UUID of the report to load.
*   `phasedLoading`: Boolean to enable phased loading (load container -> then report).
*   `cssClassName`: Styles for the container.

### Lifecycle
1.  **Mount:** Call backend `/api/powerbi/token`.
2.  **Bootstrap:** Initialize the embed container (faster UX).
3.  **Embed:** Load the report using the returned token.
4.  **Refresh:** Set a timeout to call backend again 5 minutes before token expiry.

## Code Example