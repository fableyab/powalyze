# Operations Documentation

## Monitoring
### Power BI Capacity Metrics app
*   Install the official Metrics App in Power BI.
*   **Key Metrics:** CPU Utilization, Memory Usage, Overload Throttling.
*   **Alert:** Set alert if CPU > 80% for > 15 mins.

## Scaling
*   **Auto-Scale:** Use Azure Logic Apps or Azure Functions to scale the capacity up (e.g., A1 to A2) during known peak times (e.g., Monday morning reporting) and scale down afterwards.
*   **Pause:** Pause capacity at 8 PM and resume at 6 AM to save ~50% cost.

## Troubleshooting
### "Token Expired"
*   Frontend refresh logic failed. User must reload page.
*   *Fix:* Check `setInterval` logic in React component.

### "Content Not Available"
*   Usually RLS mapping failure.
*   *Fix:* Check backend logs to see what `username` was passed to `GenerateToken`. Ensure it matches a valid Client ID in `Dim_Client`.