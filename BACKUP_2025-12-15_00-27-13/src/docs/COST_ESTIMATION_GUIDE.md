# Cost Estimation Guide

## 1. Power BI Embedded Capacity
*   **A1 SKU:** ~$750 / month (continuous).
    *   Supports ~300 concurrent page views/hour (approx).
*   **A4 SKU:** ~$6,000 / month.
*   **Optimization:** Pause capacity at night (12 hours/day) -> **50% savings**.

## 2. Azure App Service (Backend)
*   **B1 Plan:** ~$13 / month (Dev).
*   **S1 Plan:** ~$75 / month (Prod).

## 3. Data Storage (Azure SQL)
*   **Standard S0:** ~$15 / month.
*   **DTU Scaling:** Scale up during ETL loads.

## Total Estimated Monthly Cost (MVP)
*   Capacity (A1, 12h/day): $375
*   Backend: $75
*   Database: $15
*   **Total: ~$465 / month**