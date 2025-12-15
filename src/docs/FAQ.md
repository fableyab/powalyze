# Frequently Asked Questions

## Technical
**Q: Can we use our own visualization libraries (D3.js) inside Power BI?**
A: Yes, via "Custom Visuals" (PBIVIZ files), but standard PBI visuals are more performant.

**Q: What happens if the Capacity is paused?**
A: The report will fail to load with a 500 error. The application should handle this gracefully (show "Maintenance Mode").

## Business
**Q: Do our clients need a Power BI Pro license?**
A: No. In "App-Owns-Data", only the ISV (You) needs a Capacity and 1 Pro license to publish. Clients just need access to your React App.

**Q: Is data secure?**
A: Yes. Data for different clients is logically separated by RLS, which is enforced by the engine and cannot be bypassed by the frontend.