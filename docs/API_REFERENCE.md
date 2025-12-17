# POWALYZE API REFERENCE
**Version:** 1.0  
**Last Updated:** 2025-12-16  
**Status:** Complete SaaS API Specification

---

## TABLE OF CONTENTS
1. [Authentication](#authentication)
2. [Organizations](#organizations)
3. [Projects](#projects)
4. [Project Health](#project-health)
5. [Risks & Dependencies](#risks--dependencies)
6. [KPIs & Metrics](#kpis--metrics)
7. [Decision Engine](#decision-engine)
8. [Predictive PMO](#predictive-pmo)
9. [Maturity Scan](#maturity-scan)
10. [PMO DNA](#pmo-dna)
11. [Digital Twin](#digital-twin)
12. [Multiverse Scenarios](#multiverse-scenarios)
13. [Genome Editor](#genome-editor)
14. [Strategic Pulse](#strategic-pulse)
15. [Audit & Compliance](#audit--compliance)

---

## BASE URL
```
https://api.powalyze.com/v1
ws://api.powalyze.com/ws (WebSocket for real-time updates)
```

## AUTHENTICATION
All requests require Bearer token in Authorization header:
```
Authorization: Bearer {access_token}
```

---

## ORGANIZATIONS

### GET /organizations/me
Get current organization profile
```bash
curl -X GET https://api.powalyze.com/v1/organizations/me \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "org_123abc",
    "name": "Acme Corporation",
    "industry": "banking",
    "size": "enterprise",
    "country": "FR",
    "language": "fr",
    "subscriptionPlan": "enterprise",
    "subscriptionStatus": "active",
    "maxUsers": 500,
    "maxProjects": 5000,
    "features": {
      "digitalTwin": true,
      "predictiveForecasting": true,
      "genomeEditor": true,
      "multiverseScenarios": true,
      "strategicPulse": true
    },
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-12-16T14:30:00Z"
  }
}
```

### PUT /organizations/me
Update organization settings
```bash
curl -X PUT https://api.powalyze.com/v1/organizations/me \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "settings": {
      "theme": "dark",
      "notifications": true,
      "defaultDashboard": "executive"
    }
  }'
```

---

## PROJECTS

### GET /projects
List all organization projects with filtering
```bash
curl -X GET "https://api.powalyze.com/v1/projects?status=in_progress&priority=high&limit=50" \
  -H "Authorization: Bearer token"
```

**Query Parameters:**
- `status`: `not_started|in_progress|blocked|completed|on_hold`
- `priority`: `critical|high|medium|low`
- `owner_id`: Filter by project owner
- `sort_by`: `created_at|name|budget|health_score` (default: `created_at`)
- `sort_order`: `asc|desc` (default: `desc`)
- `limit`: 1-100 (default: 50)
- `offset`: Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "proj_123abc",
      "organizationId": "org_123abc",
      "name": "Digital Transformation 2025",
      "description": "Enterprise-wide digitalization initiative",
      "status": "in_progress",
      "priority": "high",
      "startDate": "2025-01-10",
      "endDate": "2025-12-31",
      "budget": 2500000,
      "actualSpend": 875000,
      "value": 5000000,
      "realizedValue": 1200000,
      "strategicAlignment": 92,
      "ownerId": "user_456def",
      "createdAt": "2025-01-10T09:00:00Z",
      "updatedAt": "2025-12-16T14:00:00Z"
    }
  ],
  "pagination": {
    "total": 145,
    "limit": 50,
    "offset": 0,
    "pages": 3
  }
}
```

### POST /projects
Create new project
```bash
curl -X POST https://api.powalyze.com/v1/projects \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cloud Migration 2025",
    "description": "Migrate on-premise systems to cloud",
    "status": "not_started",
    "priority": "high",
    "startDate": "2025-02-01",
    "endDate": "2025-08-31",
    "budget": 1800000,
    "value": 3500000,
    "strategicAlignment": 88,
    "ownerId": "user_456def"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "proj_new789xyz",
    "organizationId": "org_123abc",
    "name": "Cloud Migration 2025",
    "status": "not_started",
    "priority": "high",
    "budget": 1800000,
    "strategicAlignment": 88,
    "createdAt": "2025-12-16T14:35:00Z",
    "updatedAt": "2025-12-16T14:35:00Z"
  }
}
```

### GET /projects/{projectId}
Get project details
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc \
  -H "Authorization: Bearer token"
```

### PUT /projects/{projectId}
Update project
```bash
curl -X PUT https://api.powalyze.com/v1/projects/proj_123abc \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress",
    "actualSpend": 900000,
    "realizedValue": 1500000
  }'
```

### DELETE /projects/{projectId}
Delete project (soft delete)
```bash
curl -X DELETE https://api.powalyze.com/v1/projects/proj_123abc \
  -H "Authorization: Bearer token"
```

---

## PROJECT HEALTH

### GET /projects/{projectId}/health-passport
Get complete health assessment
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc/health-passport \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "health_123",
    "projectId": "proj_123abc",
    "healthScore": 78,
    "riskScore": 45,
    "budgetScore": 85,
    "timelineScore": 72,
    "valueScore": 80,
    "qualityScore": 76,
    "stakeholderSatisfaction": 82,
    "healthStatus": "good",
    "createdAt": "2025-12-16T14:00:00Z",
    "updatedAt": "2025-12-16T14:00:00Z"
  }
}
```

### PUT /projects/{projectId}/health-passport
Update health scores
```bash
curl -X PUT https://api.powalyze.com/v1/projects/proj_123abc/health-passport \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "healthScore": 80,
    "riskScore": 40,
    "budgetScore": 88,
    "timelineScore": 75,
    "valueScore": 82,
    "qualityScore": 78,
    "stakeholderSatisfaction": 85
  }'
```

---

## RISKS & DEPENDENCIES

### GET /projects/{projectId}/risks
List project risks
```bash
curl -X GET "https://api.powalyze.com/v1/projects/proj_123abc/risks?status=open" \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "risk_001",
      "projectId": "proj_123abc",
      "title": "Resource allocation shortage",
      "description": "Team lacks cloud architecture expertise",
      "category": "resource",
      "probability": 70,
      "impact": 85,
      "severity": 59.5,
      "status": "open",
      "mitigationPlan": "Hire external consultant, train existing team",
      "ownerId": "user_456def",
      "createdAt": "2025-12-01T10:00:00Z",
      "updatedAt": "2025-12-16T14:00:00Z"
    }
  ]
}
```

### POST /projects/{projectId}/risks
Create risk
```bash
curl -X POST https://api.powalyze.com/v1/projects/proj_123abc/risks \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Third-party API dependency",
    "category": "technical",
    "probability": 45,
    "impact": 70,
    "mitigationPlan": "Identify alternative providers, negotiate SLAs"
  }'
```

### GET /projects/{projectId}/dependencies
List project dependencies
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc/dependencies \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "dep_001",
      "projectId": "proj_123abc",
      "dependsOnProjectId": "proj_456def",
      "dependencyType": "finish_to_start",
      "lagDays": 5,
      "isCritical": true,
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ]
}
```

---

## KPIs & METRICS

### GET /projects/{projectId}/kpis
List project KPIs
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc/kpis \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "kpi_001",
      "projectId": "proj_123abc",
      "name": "Budget Utilization",
      "value": 35,
      "target": 70,
      "unit": "%",
      "baseline": 0,
      "status": "at_risk",
      "createdAt": "2025-12-16T14:00:00Z",
      "updatedAt": "2025-12-16T14:00:00Z"
    }
  ]
}
```

### POST /projects/{projectId}/kpis
Create KPI
```bash
curl -X POST https://api.powalyze.com/v1/projects/proj_123abc/kpis \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Resource Utilization",
    "value": 78,
    "target": 85,
    "unit": "%"
  }'
```

---

## DECISION ENGINE

### POST /projects/{projectId}/decision-analysis
Get AI-powered go/no-go recommendation
```bash
curl -X POST https://api.powalyze.com/v1/projects/proj_123abc/decision-analysis \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "decision_001",
    "projectId": "proj_123abc",
    "recommendation": "go",
    "score": 82,
    "confidence": 88,
    "justification": "Project health is strong (78/100), aligned with strategy (92%), and risk is manageable. Resource plan is solid. Recommend proceeding with caution on timeline.",
    "factors": {
      "health": 0.78,
      "risk": 0.55,
      "alignment": 0.92,
      "budgetControl": 0.85,
      "stakeholderSupport": 0.82
    },
    "modelVersion": "1.2.3",
    "createdAt": "2025-12-16T14:35:00Z"
  }
}
```

---

## PREDICTIVE PMO

### GET /projects/{projectId}/forecasts
Get risk forecasts
```bash
curl -X GET "https://api.powalyze.com/v1/projects/proj_123abc/forecasts?forecast_type=delay" \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "forecast_001",
      "projectId": "proj_123abc",
      "forecastType": "delay",
      "probability": 62,
      "predictedDate": "2025-09-15",
      "impactDays": 30,
      "confidence": 75,
      "explanation": "Resource constraint combined with vendor delay pattern suggests 30-day slip likely",
      "mitigationSuggestions": "Accelerate hiring, negotiate hard deadlines with vendors, reduce scope",
      "modelVersion": "1.2.3",
      "createdAt": "2025-12-16T14:00:00Z"
    }
  ]
}
```

---

## MATURITY SCAN

### POST /maturity-scan
Create maturity assessment
```bash
curl -X POST https://api.powalyze.com/v1/maturity-scan \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "scanName": "Q4 2025 Assessment",
    "responses": {
      "question_1": 4,
      "question_2": 3,
      "question_3": 5,
      "question_4": 2,
      "question_5": 4,
      "question_6": 3,
      "question_7": 4,
      "question_8": 5,
      "question_9": 3,
      "question_10": 2
    }
  }'
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "maturity_001",
    "organizationId": "org_123abc",
    "score": 62,
    "maturityLevel": "established",
    "dimensionScores": {
      "governance": 45,
      "delivery": 60,
      "risk": 55,
      "data": 70,
      "change": 40
    },
    "recommendations": "Focus on change management and governance frameworks. Strong data capabilities suggest doubling down on analytics. Investment in methodology formalization needed.",
    "actionItems": [
      {
        "priority": "high",
        "action": "Implement PMBOK-aligned governance framework",
        "timeline": "3 months",
        "owner": "PMO Director"
      }
    ],
    "createdAt": "2025-12-16T14:35:00Z"
  }
}
```

### GET /maturity-scan/results
Get historical scan results
```bash
curl -X GET https://api.powalyze.com/v1/maturity-scan/results \
  -H "Authorization: Bearer token"
```

---

## PMO DNA

### GET /pmo-dna
Get organizational PMO DNA
```bash
curl -X GET https://api.powalyze.com/v1/pmo-dna \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "dna_001",
    "organizationId": "org_123abc",
    "dna": {
      "structure": {
        "type": "hybrid",
        "reportingLine": "CFO",
        "headcount": 18,
        "centers": ["EMEA", "APAC"]
      },
      "capabilities": {
        "governance": 65,
        "delivery": 72,
        "risk": 58,
        "data": 78,
        "change": 52
      },
      "maturity": {
        "current": "established",
        "targetIn12M": "advanced"
      },
      "culture": {
        "innovation": 6.5,
        "collaboration": 7.2,
        "accountability": 6.8
      },
      "techStack": {
        "ppm": "Microsoft Project",
        "dashboard": "Power BI",
        "collaboration": "Slack, Teams"
      }
    },
    "recommendations": [
      {
        "priority": "high",
        "action": "Upgrade to enterprise PPM platform",
        "timeline": "6 months",
        "expectedImpact": "30% improvement in reporting efficiency"
      }
    ],
    "updatedAt": "2025-12-16T14:00:00Z"
  }
}
```

### PUT /pmo-dna
Update PMO DNA
```bash
curl -X PUT https://api.powalyze.com/v1/pmo-dna \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "dna": {
      "structure": {
        "type": "hybrid",
        "headcount": 20
      },
      "capabilities": {
        "governance": 70,
        "delivery": 75
      }
    }
  }'
```

---

## DIGITAL TWIN

### GET /digital-twin/current
Get current portfolio snapshot
```bash
curl -X GET https://api.powalyze.com/v1/digital-twin/current \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "twin_001",
    "organizationId": "org_123abc",
    "snapshotName": "Current State 2025-12-16",
    "snapshot": {
      "projects": [
        {
          "id": "proj_123abc",
          "name": "Digital Transformation",
          "status": "in_progress",
          "health": 78,
          "risk": 45,
          "budget": 2500000,
          "spend": 875000,
          "value": 5000000
        }
      ],
      "portfolioHealth": {
        "overall": 74,
        "byStatus": {
          "in_progress": 76,
          "completed": 82,
          "blocked": 45
        },
        "byPriority": {
          "critical": 72,
          "high": 75,
          "medium": 76,
          "low": 68
        }
      },
      "dependencies": [...],
      "criticalRisks": [...],
      "resourceUtilization": {
        "avgUtilization": 0.82,
        "bottlenecks": ["Cloud Architects", "QA Team"]
      },
      "valueRealization": {
        "plannedValue": 25000000,
        "realizedValue": 8500000,
        "realization%": 34
      }
    },
    "scenarioType": "current",
    "isBaseline": true,
    "createdAt": "2025-12-16T14:00:00Z"
  }
}
```

### POST /digital-twin/snapshot
Save portfolio snapshot
```bash
curl -X POST https://api.powalyze.com/v1/digital-twin/snapshot \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "snapshotName": "Baseline Q4 2025",
    "scenarioType": "baseline"
  }'
```

---

## MULTIVERSE SCENARIOS

### POST /projects/{projectId}/scenarios
Create what-if scenario
```bash
curl -X POST https://api.powalyze.com/v1/projects/proj_123abc/scenarios \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "scenarioName": "Aggressive Timeline",
    "scenarioType": "optimistic",
    "parameters": {
      "budgetChange": 0.15,
      "timelineChange": -0.3,
      "teamSizeChange": 0.2,
      "priorityBoost": true,
      "resourceAvailability": 0.95
    }
  }'
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "scenario_001",
    "projectId": "proj_123abc",
    "scenarioName": "Aggressive Timeline",
    "scenarioType": "optimistic",
    "parameters": {...},
    "predictedOutcomes": {
      "newEndDate": "2025-08-31",
      "newCost": 2875000,
      "newRiskScore": 62,
      "healthImpact": -8,
      "feasibilityScore": 72,
      "recommendations": [
        "Fast-track critical path items",
        "Increase team by 2-3 resources",
        "Negotiate vendor expedited delivery"
      ]
    },
    "feasibilityScore": 72,
    "comparisonToBaseline": {
      "timeline": "-30 days",
      "budget": "+15%",
      "risk": "+17 points"
    },
    "createdAt": "2025-12-16T14:35:00Z"
  }
}
```

### GET /projects/{projectId}/scenarios
List scenarios
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc/scenarios \
  -H "Authorization: Bearer token"
```

---

## GENOME EDITOR

### GET /projects/{projectId}/genome
Get project genome
```bash
curl -X GET https://api.powalyze.com/v1/projects/proj_123abc/genome \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "genome_001",
    "projectId": "proj_123abc",
    "genome": {
      "coreGenes": {
        "priority": "high",
        "strategicFit": 0.92,
        "resourceRequirement": "20_people",
        "complexity": "high"
      },
      "healthGenes": {
        "qualityExigency": 0.85,
        "timelineAdherence": 0.72,
        "budgetControl": 0.85,
        "stakeholderEngagement": 0.82
      },
      "riskGenes": {
        "identifiedRisks": 8,
        "complexity": 0.78,
        "uncertainty": 0.65,
        "vendorDependency": 0.45
      },
      "mutationHistory": [
        {
          "date": "2025-12-10",
          "change": "Priority increased from medium to high",
          "rationale": "Strategic alignment validated"
        }
      ]
    },
    "mutationCount": 3,
    "lastMutationAt": "2025-12-10T10:00:00Z",
    "optimizationScore": 78,
    "impactAnalysis": {
      "scoreImpact": 5,
      "riskImpact": -3,
      "budgetImpact": 150000,
      "timelineImpact": 14
    },
    "createdAt": "2025-12-01T10:00:00Z",
    "updatedAt": "2025-12-16T14:00:00Z"
  }
}
```

### PUT /projects/{projectId}/genome/mutate
Apply genome mutation
```bash
curl -X PUT https://api.powalyze.com/v1/projects/proj_123abc/genome/mutate \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "mutations": [
      {
        "gene": "priority",
        "from": "high",
        "to": "critical",
        "rationale": "New regulatory requirement"
      },
      {
        "gene": "resourceRequirement",
        "from": "20_people",
        "to": "25_people",
        "rationale": "Complexity assessment revised"
      }
    ]
  }'
```

---

## STRATEGIC PULSE

### GET /strategic-pulse
Get organizational pulse
```bash
curl -X GET https://api.powalyze.com/v1/strategic-pulse \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "pulse_001",
    "organizationId": "org_123abc",
    "pulse": {
      "rhythm": {
        "heartbeatHealth": 0.82,
        "regularity": 0.78,
        "trend": "improving"
      },
      "anomalies": [
        {
          "type": "resource_shortage",
          "severity": "high",
          "projects": ["proj_123abc", "proj_789xyz"],
          "timestamp": "2025-12-16T12:00:00Z"
        }
      ],
      "criticalSignals": [
        {
          "signal": "budget_overrun_trend",
          "impact": "high",
          "affectedCount": 3
        },
        {
          "signal": "timeline_drift",
          "impact": "medium",
          "affectedCount": 7
        }
      ],
      "portfolioHealthTrend": "improving",
      "resourceStress": {
        "pressureLevel": 0.72,
        "bottlenecks": ["Cloud Architects", "QA Engineers"]
      },
      "dependenciesStress": {
        "criticalChains": 4,
        "atRisk": 1
      },
      "stakeholderSentiment": 0.74,
      "burnRate": 0.78,
      "recoveryTimeEstimate": 12
    },
    "healthIndex": 76,
    "healthStatus": "stable",
    "alertCount": 3,
    "trend": "improving",
    "lastAlertAt": "2025-12-16T12:00:00Z",
    "recommendations": [
      {
        "action": "Implement resource leveling across projects",
        "priority": "high",
        "expectedImpact": "Reduce bottlenecks by 40%"
      }
    ],
    "createdAt": "2025-12-16T14:00:00Z",
    "updatedAt": "2025-12-16T14:00:00Z"
  }
}
```

### WebSocket: /ws/pulse
Real-time pulse updates
```javascript
const ws = new WebSocket('ws://api.powalyze.com/ws/pulse');
ws.addEventListener('message', (event) => {
  const pulse = JSON.parse(event.data);
  console.log('Health Index:', pulse.healthIndex);
  console.log('Alerts:', pulse.alertCount);
});
```

---

## AUDIT & COMPLIANCE

### GET /audit-logs
Get audit trail
```bash
curl -X GET "https://api.powalyze.com/v1/audit-logs?resource_type=projects&limit=100" \
  -H "Authorization: Bearer token"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "audit_001",
      "organizationId": "org_123abc",
      "userId": "user_456def",
      "action": "UPDATE",
      "resourceType": "projects",
      "resourceId": "proj_123abc",
      "changes": {
        "old": { "status": "not_started", "budget": 2000000 },
        "new": { "status": "in_progress", "budget": 2500000 }
      },
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2025-12-16T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 2543,
    "limit": 100,
    "offset": 0
  }
}
```

---

## ERROR CODES

```json
{
  "400": "Bad Request - Invalid parameters",
  "401": "Unauthorized - Missing/invalid token",
  "403": "Forbidden - Insufficient permissions",
  "404": "Not Found - Resource not found",
  "409": "Conflict - Duplicate or constraint violation",
  "422": "Unprocessable Entity - Validation error",
  "429": "Too Many Requests - Rate limited",
  "500": "Internal Server Error",
  "503": "Service Unavailable"
}
```

---

## RATE LIMITS
- **Standard**: 1000 requests/hour per user
- **Premium**: 5000 requests/hour per user
- **Enterprise**: Unlimited

---

## DOCUMENTATION
- [Full API Docs](https://docs.powalyze.com)
- [SDK Clients](https://github.com/powalyze/sdks)
- [Webhooks](https://docs.powalyze.com/webhooks)
- [GraphQL API](https://api.powalyze.com/graphql)
