# Performance Optimization Guide

## 1. Backend Optimization
*   **Token Caching:** Embed tokens expire in 1 hour. Cache them in Redis for 55 minutes to reduce API calls to Azure.
*   **Parallel Requests:** If generating tokens for multiple reports, use `Promise.all`.

## 2. Power BI Optimization
*   **Aggregations:** Use Aggregation tables for large datasets (Billions of rows).
*   **Incremental Refresh:** Only refresh the last 30 days of data.
*   **Remove Unused Columns:** Reduce dataset size to improve load into memory.

## 3. Frontend Optimization
*   **Single Page Application:** Don't destroy/re-create the iframe on navigation if possible. Hide/Show it using CSS for instant switching.
*   **Filters:** Apply filters in the Embed Configuration (JS) rather than loading all data and then filtering.