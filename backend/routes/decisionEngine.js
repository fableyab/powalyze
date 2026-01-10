/**
 * Decision Engine API Routes
 */

const express = require('express');
const router = express.Router();
const decisionEngineService = require('../services/decisionEngine');

/**
 * GET /api/decision-engine/recommendations
 * 
 * Génère les recommandations de décisions pour un tenant
 */
router.get('/recommendations', async (req, res) => {
  try {
    const {
      tenant_id,
      timeframe = 'current',
      max_recommendations = 5,
      project_id
    } = req.query;

    if (!tenant_id) {
      return res.status(400).json({
        error: 'tenant_id is required'
      });
    }

    const result = await decisionEngineService.generateRecommendations({
      tenant_id,
      timeframe,
      max_recommendations: parseInt(max_recommendations),
      project_id
    });

    res.json(result);

  } catch (error) {
    console.error('Decision Engine API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/decision-engine/project/:projectId
 * 
 * Récupère les recommandations spécifiques à un projet
 */
router.get('/project/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { tenant_id } = req.query;

    if (!tenant_id) {
      return res.status(400).json({
        error: 'tenant_id is required'
      });
    }

    const result = await decisionEngineService.generateRecommendations({
      tenant_id,
      project_id: projectId,
      max_recommendations: 10
    });

    res.json(result);

  } catch (error) {
    console.error('Decision Engine Project API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/decision-engine/health
 * 
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'decision-engine',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
