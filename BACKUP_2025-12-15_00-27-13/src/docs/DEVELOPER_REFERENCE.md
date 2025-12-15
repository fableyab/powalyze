# Developer Reference

## Frontend Hooks
`usePowerBIEmbed(config)`: Custom hook handling the bootstrap/embed lifecycle.

## Backend Services
`PbiService.getEmbedToken(reportId, identity)`: Main entry point for token generation.

## Key Config Files
*   `src/config/powerbiConfig.js`: Stores Report IDs and Workspace IDs.
*   `src/services/powerbiService.js`: Mock service for demo / Real service wrapper.