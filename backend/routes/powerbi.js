/**
 * 🔐 Power BI Token Generation Route (Backend Express)
 * Génère un token sécurisé pour embed Power BI
 * Jamais exposé au frontend
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * POST /api/powerbi/token
 * Body: { reportId: "xxxx-xxxx-xxxx" }
 * Returns: { token: "...", expiration: "..." }
 */
router.post('/token', async (req, res) => {
  try {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ error: 'Missing reportId' });
    }

    const TENANT_ID = process.env.POWERBI_TENANT_ID;
    const CLIENT_ID = process.env.POWERBI_CLIENT_ID;
    const CLIENT_SECRET = process.env.POWERBI_CLIENT_SECRET;
    const WORKSPACE_ID = process.env.POWERBI_WORKSPACE_ID;

    // Validation
    if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET || !WORKSPACE_ID) {
      return res.status(500).json({ 
        error: 'Missing Power BI configuration in backend/.env' 
      });
    }

    // 1. Authentification Azure AD
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'https://analysis.windows.net/powerbi/api/.default',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. Génération du token Power BI Embed
    const embedResponse = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${WORKSPACE_ID}/reports/${reportId}/GenerateToken`,
      { accessLevel: 'View' },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.json({
      token: embedResponse.data.token,
      expiration: embedResponse.data.expiration,
    });

  } catch (error) {
    console.error('❌ Power BI Token Error:', error.response?.data || error.message);
    
    return res.status(500).json({ 
      error: 'Failed to generate Power BI token',
      details: error.response?.data || error.message 
    });
  }
});

module.exports = router;
