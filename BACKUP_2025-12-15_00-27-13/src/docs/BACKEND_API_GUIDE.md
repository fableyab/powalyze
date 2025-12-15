# Power BI Backend API Documentation

This document describes the Node.js backend architecture required to support the Powalyze PMO 360 frontend.

## 1. Architecture Overview
The backend is an Express.js server responsible for:
- Authenticating with Azure AD (Service Principal).
- Generating Embed Tokens for Power BI reports.
- Handling Row-Level Security (RLS) identity mapping.
- Serving as a proxy for any data write-back operations.

## 2. API Endpoints

### `POST /api/embed-token`
Generates a secure token for embedding a specific report.

**Request:**
\`\`\`json
{
  "reportId": "uuid-string",
  "datasetId": "uuid-string"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "ey...",
  "expiration": "2024-12-31T23:59:59Z",
  "tokenId": "uuid"
}
\`\`\`

### `GET /api/reports`
Lists available reports from the workspace.

## 3. Data Model (Backend)
The backend manages the following entities in a PostgreSQL (Supabase) database, which is synced to Power BI:
- **Projects**: Core entity.
- **Costs**: 1-to-many with Projects.
- **Risks**: 1-to-many with Projects.

## 4. Implementation Code (Node.js Reference)

\`\`\`javascript
// src/services/tokenService.js
const getEmbedToken = async (reportId, datasetId, identity) => {
  const pbiConfig = require('../config/powerbiConfig');
  // ... using powerbi-client-node
  const embedToken = await pbiClient.reports.generateTokenInGroup(
    pbiConfig.workspaceId,
    reportId,
    {
       accessLevel: "View",
       identities: [identity], // RLS
       allowSaveAs: false
    }
  );
  return embedToken;
};
\`\`\`