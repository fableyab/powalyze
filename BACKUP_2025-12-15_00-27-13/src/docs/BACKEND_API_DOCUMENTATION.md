# Backend API Documentation

## Overview
The Node.js backend exposes endpoints to generate Power BI Embed Tokens. It must be secured to prevent unauthorized token generation.

## Endpoints

### `POST /api/powerbi/token`
Generates an embed token for a specific report.

**Headers:**
*   `Authorization`: Bearer <User_JWT>

**Body:**