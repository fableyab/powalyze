# 📡 API REST - Endpoints Complets

> **Base URL:** `/api/v1`  
> **Authentication:** Bearer Token (JWT) dans header `Authorization`

---

## 🔐 1. Authentication & Organization

### POST `/auth/login`
Authentification utilisateur avec email/password.

**Request Body:**
```json
{
  "email": "marie.dupont@acme.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-marie-001",
    "email": "marie.dupont@acme.com",
    "first_name": "Marie",
    "last_name": "Dupont",
    "role": "PMO",
    "organization_id": "org-acme-corp-123"
  },
  "organization": {
    "id": "org-acme-corp-123",
    "name": "Acme Corporation",
    "domain": "acme.com"
  }
}
```

---

### GET `/me`
Récupère les informations de l'utilisateur connecté.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": "user-marie-001",
  "email": "marie.dupont@acme.com",
  "first_name": "Marie",
  "last_name": "Dupont",
  "role": "PMO",
  "organization": {
    "id": "org-acme-corp-123",
    "name": "Acme Corporation"
  },
  "permissions": ["VIEW_PORTFOLIOS", "MANAGE_COMMITTEES", "APPROVE_DECISIONS"]
}
```

---

## 📊 2. Portfolios & Projects

### GET `/portfolios`
Liste tous les portfolios de l'organisation.

**Query Parameters:**
- `status` (optional): `ACTIVE`, `ON_HOLD`, `CLOSED`
- `search` (optional): Recherche par nom

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "portfolio-digital-001",
      "name": "Transformation Digitale",
      "description": "Programme de digitalisation complète",
      "owner_user_id": "user-marie-001",
      "owner": {
        "first_name": "Marie",
        "last_name": "Dupont"
      },
      "status": "ACTIVE",
      "strategic_axis": "DIGITAL",
      "priority": 1,
      "project_count": 3,
      "total_budget": 5000000,
      "health_distribution": {
        "GREEN": 2,
        "AMBER": 1,
        "RED": 0
      }
    }
  ],
  "total": 2
}
```

---

### GET `/portfolios/:id`
Détails d'un portfolio spécifique avec ses programmes et projets.

**Response (200 OK):**
```json
{
  "id": "portfolio-digital-001",
  "name": "Transformation Digitale",
  "description": "Programme de digitalisation complète",
  "owner": {
    "id": "user-marie-001",
    "first_name": "Marie",
    "last_name": "Dupont"
  },
  "status": "ACTIVE",
  "programs": [
    {
      "id": "program-cloud-001",
      "name": "Migration Cloud Azure",
      "project_count": 2
    }
  ],
  "projects": [
    {
      "id": "project-erp-001",
      "name": "Refonte ERP SAP",
      "status": "IN_PROGRESS",
      "health": "GREEN",
      "progress": 65
    }
  ],
  "total_budget_planned": 5000000,
  "total_budget_actual": 3200000,
  "created_at": "2025-01-01T00:00:00Z"
}
```

---

### POST `/portfolios`
Créer un nouveau portfolio.

**Request Body:**
```json
{
  "name": "Excellence Opérationnelle",
  "description": "Amélioration des processus internes",
  "owner_user_id": "user-marie-001",
  "status": "ACTIVE",
  "strategic_axis": "OPERATIONS",
  "priority": 2
}
```

**Response (201 Created):**
```json
{
  "id": "portfolio-ops-002",
  "name": "Excellence Opérationnelle",
  "created_at": "2026-01-09T12:00:00Z"
}
```

---

### PATCH `/portfolios/:id`
Mettre à jour un portfolio.

**Request Body:**
```json
{
  "status": "ON_HOLD",
  "priority": 3
}
```

**Response (200 OK):**
```json
{
  "id": "portfolio-ops-002",
  "updated_at": "2026-01-09T12:30:00Z"
}
```

---

### GET `/projects`
Liste tous les projets avec filtres.

**Query Parameters:**
- `portfolioId` (optional): Filtrer par portfolio
- `status` (optional): `NOT_STARTED`, `IN_PROGRESS`, `AT_RISK`, `BLOCKED`, `DONE`
- `health` (optional): `GREEN`, `AMBER`, `RED`
- `search` (optional): Recherche par nom

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "project-erp-001",
      "name": "Refonte ERP SAP",
      "portfolio_id": "portfolio-digital-001",
      "portfolio": {
        "name": "Transformation Digitale"
      },
      "sponsor": {
        "first_name": "Jean",
        "last_name": "Martin"
      },
      "project_manager": {
        "first_name": "Thomas",
        "last_name": "Leroy"
      },
      "status": "IN_PROGRESS",
      "health": "GREEN",
      "start_date": "2025-01-15",
      "end_date": "2025-12-31",
      "budget_planned": 1500000,
      "budget_actual": 980000,
      "progress": 65
    }
  ],
  "total": 5
}
```

---

### GET `/projects/:id`
Vue 360° d'un projet avec toutes les données liées (risques, décisions, documents, KPI).

**Response (200 OK):**
```json
{
  "id": "project-erp-001",
  "name": "Refonte ERP SAP",
  "description": "Migration vers SAP S/4HANA",
  "portfolio": {
    "id": "portfolio-digital-001",
    "name": "Transformation Digitale"
  },
  "sponsor": {
    "id": "user-jean-002",
    "first_name": "Jean",
    "last_name": "Martin"
  },
  "project_manager": {
    "id": "user-thomas-004",
    "first_name": "Thomas",
    "last_name": "Leroy"
  },
  "status": "IN_PROGRESS",
  "health": "GREEN",
  "start_date": "2025-01-15",
  "end_date": "2025-12-31",
  "budget_planned": 1500000,
  "budget_actual": 980000,
  "progress": 65,
  "risks": [
    {
      "id": "risk-001",
      "title": "Résistance au changement",
      "severity": 12,
      "status": "OPEN"
    }
  ],
  "decisions": [
    {
      "id": "decision-001",
      "title": "Validation Phase 2",
      "status": "TAKEN",
      "decision_date": "2025-12-15"
    }
  ],
  "documents": [
    {
      "id": "doc-001",
      "title": "Charte Projet SAP",
      "document_type": "CHARTER"
    }
  ],
  "comments": [
    {
      "id": "comment-001",
      "content": "Migration serveurs complétée",
      "user": {
        "first_name": "Thomas",
        "last_name": "Leroy"
      },
      "created_at": "2025-11-20T10:00:00Z"
    }
  ]
}
```

---

### POST `/projects`
Créer un nouveau projet.

**Request Body:**
```json
{
  "name": "Refonte CRM Salesforce",
  "description": "Migration vers Salesforce Sales Cloud",
  "portfolio_id": "portfolio-digital-001",
  "sponsor_user_id": "user-jean-002",
  "project_manager_user_id": "user-thomas-004",
  "status": "NOT_STARTED",
  "health": "GREEN",
  "start_date": "2026-02-01",
  "end_date": "2026-08-31",
  "budget_planned": 800000
}
```

**Response (201 Created):**
```json
{
  "id": "project-crm-006",
  "name": "Refonte CRM Salesforce",
  "created_at": "2026-01-09T13:00:00Z"
}
```

---

### PATCH `/projects/:id`
Mettre à jour un projet (avancement, santé, budget).

**Request Body:**
```json
{
  "progress": 75,
  "health": "AMBER",
  "budget_actual": 1200000
}
```

**Response (200 OK):**
```json
{
  "id": "project-erp-001",
  "progress": 75,
  "health": "AMBER",
  "updated_at": "2026-01-09T14:00:00Z"
}
```

---

## 🏛️ 3. Committees

### GET `/committees`
Liste des comités avec filtres.

**Query Parameters:**
- `from` (optional): Date de début (ISO 8601)
- `to` (optional): Date de fin
- `status` (optional): `PLANNED`, `IN_PROGRESS`, `CLOSED`
- `type` (optional): Type de comité

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "committee-copil-001",
      "committee_type": "COPIL Transformation",
      "date": "2026-01-15T14:00:00Z",
      "status": "PLANNED",
      "chair": {
        "first_name": "Jean",
        "last_name": "Martin"
      },
      "participants": ["user-marie-001", "user-sophie-003", "user-thomas-004"],
      "participant_count": 3,
      "item_count": 5
    }
  ],
  "total": 2
}
```

---

### GET `/committees/:id`
Détails d'un comité avec ordre du jour et décisions.

**Response (200 OK):**
```json
{
  "id": "committee-copil-001",
  "committee_type": "COPIL Transformation",
  "date": "2026-01-15T14:00:00Z",
  "status": "PLANNED",
  "chair": {
    "id": "user-jean-002",
    "first_name": "Jean",
    "last_name": "Martin"
  },
  "participants": [
    {
      "id": "user-marie-001",
      "first_name": "Marie",
      "last_name": "Dupont",
      "role": "PMO"
    }
  ],
  "notes": "Ordre du jour validé",
  "items": [
    {
      "id": "item-001",
      "title": "Point avancement Projet ERP",
      "item_type": "PROJECT",
      "item_order": 1,
      "related_project": {
        "id": "project-erp-001",
        "name": "Refonte ERP SAP"
      },
      "status": "PENDING"
    }
  ],
  "decisions": [
    {
      "id": "decision-001",
      "title": "Validation Phase 2",
      "status": "TAKEN"
    }
  ]
}
```

---

### POST `/committees`
Créer un nouveau comité.

**Request Body:**
```json
{
  "committee_type": "CODIR Q1 2026",
  "date": "2026-03-20T10:00:00Z",
  "status": "PLANNED",
  "chair_user_id": "user-jean-002",
  "participants": ["user-marie-001", "user-sophie-003", "user-thomas-004"],
  "notes": "Revue stratégique trimestrielle"
}
```

**Response (201 Created):**
```json
{
  "id": "committee-codir-002",
  "committee_type": "CODIR Q1 2026",
  "created_at": "2026-01-09T15:00:00Z"
}
```

---

### PATCH `/committees/:id`
Mettre à jour un comité (statut, notes).

**Request Body:**
```json
{
  "status": "CLOSED",
  "notes": "Comité clôturé - 3 décisions prises"
}
```

**Response (200 OK):**
```json
{
  "id": "committee-copil-001",
  "status": "CLOSED",
  "updated_at": "2026-01-15T16:30:00Z"
}
```

---

### GET `/committees/:id/items`
Liste des points de l'ordre du jour.

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "item-001",
      "title": "Point avancement Projet ERP",
      "item_type": "PROJECT",
      "item_order": 1,
      "status": "COMPLETED",
      "related_project_id": "project-erp-001"
    },
    {
      "id": "item-002",
      "title": "Risque critique sécurité",
      "item_type": "RISK",
      "item_order": 2,
      "status": "PENDING",
      "related_risk_id": "risk-security-001"
    }
  ]
}
```

---

### POST `/committees/:id/items`
Ajouter un point à l'ordre du jour.

**Request Body:**
```json
{
  "title": "Validation Budget 2026",
  "item_type": "DECISION",
  "item_order": 3,
  "related_decision_id": "decision-budget-002"
}
```

**Response (201 Created):**
```json
{
  "id": "item-003",
  "title": "Validation Budget 2026",
  "created_at": "2026-01-09T16:00:00Z"
}
```

---

## ✅ 4. Decisions

### GET `/decisions`
Registre central des décisions.

**Query Parameters:**
- `status` (optional): `PLANNED`, `TAKEN`, `REJECTED`, `DEFERRED`
- `type` (optional): `GO`, `NO_GO`, `SCOPE_CHANGE`, `BUDGET`, etc.
- `portfolioId` (optional)
- `projectId` (optional)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "decision-001",
      "title": "Validation Phase 2 - Migration SAP",
      "description": "Approuver le lancement de la phase 2",
      "decision_type": "GO",
      "status": "TAKEN",
      "decision_date": "2025-12-15T10:00:00Z",
      "created_by": {
        "first_name": "Marie",
        "last_name": "Dupont"
      },
      "approved_by": {
        "first_name": "Jean",
        "last_name": "Martin"
      },
      "related_project": {
        "id": "project-erp-001",
        "name": "Refonte ERP SAP"
      },
      "impact_summary": "Budget additionnel de 500K€ approuvé",
      "action_count": 3
    }
  ],
  "total": 2
}
```

---

### GET `/decisions/:id`
Détails d'une décision avec contexte, impacts et actions.

**Response (200 OK):**
```json
{
  "id": "decision-001",
  "title": "Validation Phase 2 - Migration SAP",
  "description": "Approuver le lancement de la phase 2 après succès des tests",
  "decision_type": "GO",
  "status": "TAKEN",
  "decision_date": "2025-12-15T10:00:00Z",
  "created_by": {
    "id": "user-marie-001",
    "first_name": "Marie",
    "last_name": "Dupont"
  },
  "approved_by": {
    "id": "user-jean-002",
    "first_name": "Jean",
    "last_name": "Martin"
  },
  "committee": {
    "id": "committee-copil-001",
    "committee_type": "COPIL Transformation"
  },
  "related_portfolio": {
    "id": "portfolio-digital-001",
    "name": "Transformation Digitale"
  },
  "related_project": {
    "id": "project-erp-001",
    "name": "Refonte ERP SAP"
  },
  "impact_summary": "Budget additionnel de 500K€ approuvé pour accélérer la migration",
  "actions": [
    {
      "id": "action-001",
      "title": "Recruter 2 consultants SAP",
      "owner": {
        "first_name": "Thomas",
        "last_name": "Leroy"
      },
      "due_date": "2026-01-31",
      "status": "IN_PROGRESS"
    }
  ],
  "created_at": "2025-12-10T14:00:00Z",
  "updated_at": "2025-12-15T10:30:00Z"
}
```

---

### POST `/decisions`
Créer une nouvelle décision.

**Request Body:**
```json
{
  "title": "Validation Budget Marketing Q1",
  "description": "Approuver le budget marketing de 200K€",
  "decision_type": "BUDGET",
  "status": "PLANNED",
  "committee_id": "committee-codir-002",
  "related_portfolio_id": "portfolio-digital-001",
  "impact_summary": "Investissement dans campagnes digitales"
}
```

**Response (201 Created):**
```json
{
  "id": "decision-003",
  "title": "Validation Budget Marketing Q1",
  "created_at": "2026-01-09T17:00:00Z"
}
```

---

### PATCH `/decisions/:id`
Mettre à jour une décision (statut, approbation).

**Request Body:**
```json
{
  "status": "TAKEN",
  "decision_date": "2026-01-15T14:00:00Z",
  "approved_by_user_id": "user-jean-002"
}
```

**Response (200 OK):**
```json
{
  "id": "decision-003",
  "status": "TAKEN",
  "decision_date": "2026-01-15T14:00:00Z",
  "updated_at": "2026-01-15T14:05:00Z"
}
```

---

## ⚠️ 5. Risks & Predictive Signals

### GET `/risks`
Liste des risques avec filtres.

**Query Parameters:**
- `status` (optional): `OPEN`, `MITIGATED`, `CLOSED`, `ACCEPTED`
- `portfolioId` (optional)
- `projectId` (optional)
- `ownerId` (optional)
- `minSeverity` (optional): Filtre sévérité minimale (1-25)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "risk-security-001",
      "title": "Faille sécurité API",
      "description": "Vulnérabilité découverte dans API externe",
      "owner": {
        "first_name": "Sophie",
        "last_name": "Bernard"
      },
      "related_project": {
        "id": "project-erp-001",
        "name": "Refonte ERP SAP"
      },
      "probability": 4,
      "impact": 5,
      "severity": 20,
      "status": "OPEN",
      "mitigation_plan": "Patch de sécurité déployé en urgence",
      "created_at": "2025-11-01T09:00:00Z"
    }
  ],
  "total": 3
}
```

---

### GET `/risks/:id`
Détails d'un risque avec plan de mitigation.

**Response (200 OK):**
```json
{
  "id": "risk-security-001",
  "title": "Faille sécurité API",
  "description": "Vulnérabilité CVE-2025-12345 découverte dans API externe utilisée par le projet ERP",
  "owner": {
    "id": "user-sophie-003",
    "first_name": "Sophie",
    "last_name": "Bernard"
  },
  "related_portfolio": {
    "id": "portfolio-digital-001",
    "name": "Transformation Digitale"
  },
  "related_project": {
    "id": "project-erp-001",
    "name": "Refonte ERP SAP"
  },
  "probability": 4,
  "impact": 5,
  "severity": 20,
  "status": "OPEN",
  "mitigation_plan": "1. Patch de sécurité déployé en urgence\n2. Audit complet de l'API\n3. Tests de pénétration planifiés",
  "created_at": "2025-11-01T09:00:00Z",
  "updated_at": "2025-11-02T14:30:00Z"
}
```

---

### POST `/risks`
Déclarer un nouveau risque.

**Request Body:**
```json
{
  "title": "Dépendance fournisseur unique",
  "description": "Risque de dépendance totale vis-à-vis d'un seul fournisseur cloud",
  "owner_user_id": "user-thomas-004",
  "related_project_id": "project-erp-001",
  "probability": 3,
  "impact": 4,
  "status": "OPEN",
  "mitigation_plan": "Évaluer des solutions multi-cloud"
}
```

**Response (201 Created):**
```json
{
  "id": "risk-vendor-002",
  "title": "Dépendance fournisseur unique",
  "severity": 12,
  "created_at": "2026-01-09T18:00:00Z"
}
```

---

### PATCH `/risks/:id`
Mettre à jour un risque (statut, mitigation).

**Request Body:**
```json
{
  "status": "MITIGATED",
  "mitigation_plan": "Solution multi-cloud mise en place avec Azure + AWS"
}
```

**Response (200 OK):**
```json
{
  "id": "risk-vendor-002",
  "status": "MITIGATED",
  "updated_at": "2026-02-15T10:00:00Z"
}
```

---

### GET `/predictive-signals`
Signaux IA prédictifs (alertes automatiques).

**Query Parameters:**
- `sourceType` (optional): `PROJECT`, `PORTFOLIO`
- `sourceId` (optional): ID de l'entité source
- `minScore` (optional): Score minimum (0-100)
- `acknowledged` (optional): `true` / `false`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "signal-001",
      "signal_type": "DELAY_RISK",
      "message": "Risque de dérive planning détecté sur Projet ERP SAP",
      "score": 87,
      "source_type": "PROJECT",
      "source_id": "project-erp-001",
      "source": {
        "name": "Refonte ERP SAP"
      },
      "recommended_action": "Revoir le planning et identifier les goulots d'étranglement",
      "is_acknowledged": false,
      "created_at": "2026-01-08T08:00:00Z"
    },
    {
      "id": "signal-002",
      "signal_type": "BUDGET_RISK",
      "message": "Dépassement budget prévu de 15% sur Projet CRM",
      "score": 72,
      "source_type": "PROJECT",
      "source_id": "project-crm-002",
      "source": {
        "name": "Migration CRM"
      },
      "recommended_action": "Organiser une revue budgétaire urgente avec le sponsor",
      "is_acknowledged": false,
      "created_at": "2026-01-07T12:00:00Z"
    }
  ],
  "total": 2
}
```

---

### PATCH `/predictive-signals/:id/acknowledge`
Accuser réception d'un signal IA.

**Request Body:**
```json
{
  "acknowledged_by_user_id": "user-marie-001"
}
```

**Response (200 OK):**
```json
{
  "id": "signal-001",
  "is_acknowledged": true,
  "acknowledged_at": "2026-01-09T19:00:00Z"
}
```

---

## 📈 6. KPIs

### GET `/kpis/definitions`
Liste des définitions de KPI.

**Query Parameters:**
- `scopeType` (optional): `ORGANIZATION`, `PORTFOLIO`, `PROGRAM`, `PROJECT`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "kpi-def-001",
      "name": "Taux de succès projets",
      "code": "PROJECT_SUCCESS_RATE",
      "unit": "%",
      "target_value": 90,
      "direction": "HIGHER_IS_BETTER",
      "scope_type": "ORGANIZATION"
    },
    {
      "id": "kpi-def-002",
      "name": "Écart budgétaire moyen",
      "code": "AVG_BUDGET_VARIANCE",
      "unit": "%",
      "target_value": 5,
      "direction": "LOWER_IS_BETTER",
      "scope_type": "PORTFOLIO"
    }
  ]
}
```

---

### POST `/kpis/definitions`
Créer une nouvelle définition de KPI.

**Request Body:**
```json
{
  "name": "Délai moyen de décision",
  "code": "AVG_DECISION_TIME",
  "unit": "jours",
  "target_value": 7,
  "direction": "LOWER_IS_BETTER",
  "scope_type": "ORGANIZATION"
}
```

**Response (201 Created):**
```json
{
  "id": "kpi-def-003",
  "name": "Délai moyen de décision",
  "created_at": "2026-01-09T20:00:00Z"
}
```

---

### GET `/kpis/values`
Valeurs de KPI avec historique.

**Query Parameters:**
- `scopeType`: `ORGANIZATION`, `PORTFOLIO`, `PROGRAM`, `PROJECT`
- `scopeId`: ID de l'entité
- `from` (optional): Date de début
- `to` (optional): Date de fin

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "kpi-val-001",
      "kpi_definition": {
        "id": "kpi-def-001",
        "name": "Taux de succès projets",
        "unit": "%",
        "target_value": 90
      },
      "value": 85,
      "date": "2025-12-31",
      "scope_type": "ORGANIZATION",
      "scope_id": "org-acme-corp-123"
    }
  ]
}
```

---

### POST `/kpis/values`
Enregistrer une nouvelle valeur de KPI.

**Request Body:**
```json
{
  "kpi_definition_id": "kpi-def-001",
  "value": 88,
  "date": "2026-01-09",
  "scope_type": "ORGANIZATION",
  "scope_id": "org-acme-corp-123"
}
```

**Response (201 Created):**
```json
{
  "id": "kpi-val-002",
  "value": 88,
  "created_at": "2026-01-09T21:00:00Z"
}
```

---

## 🎯 7. Executive Cockpit

### GET `/dashboard/executive`
Dashboard exécutif agrégé (santé portefeuille, top risques, décisions, comités, signaux IA).

**Response (200 OK):**
```json
{
  "portfolioHealth": {
    "green": 12,
    "amber": 4,
    "red": 2,
    "total": 18
  },
  "topRisks": [
    {
      "id": "risk-security-001",
      "title": "Faille sécurité API",
      "severity": 20,
      "project_name": "Refonte ERP SAP"
    },
    {
      "id": "risk-skills-002",
      "title": "Manque compétences DevOps",
      "severity": 15,
      "project_name": "Migration Cloud"
    }
  ],
  "pendingDecisions": [
    {
      "id": "decision-003",
      "title": "Validation Budget Marketing Q1",
      "decision_type": "BUDGET",
      "impact_summary": "200K€ pour campagnes digitales"
    }
  ],
  "upcomingCommittees": [
    {
      "id": "committee-copil-001",
      "committee_type": "COPIL Transformation",
      "date": "2026-01-15T14:00:00Z",
      "participant_count": 3,
      "item_count": 5
    }
  ],
  "predictiveSignals": [
    {
      "id": "signal-001",
      "signal_type": "DELAY_RISK",
      "message": "Risque de dérive planning détecté sur Projet ERP SAP",
      "score": 87,
      "recommended_action": "Revoir le planning"
    },
    {
      "id": "signal-002",
      "signal_type": "BUDGET_RISK",
      "message": "Dépassement budget prévu de 15% sur Projet CRM",
      "score": 72,
      "recommended_action": "Revue budgétaire urgente"
    }
  ],
  "kpiSummary": {
    "project_success_rate": 85,
    "avg_budget_variance": 8,
    "avg_decision_time": 12,
    "critical_risks_count": 1
  }
}
```

---

## 📄 8. Documents

### GET `/documents`
Liste des documents.

**Query Parameters:**
- `projectId` (optional)
- `portfolioId` (optional)
- `documentType` (optional): `CHARTER`, `SLIDE`, `REPORT`, `CONTRACT`, `OTHER`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "doc-001",
      "title": "Charte Projet SAP",
      "document_type": "CHARTER",
      "file_path": "s3://documents/charter-sap.pdf",
      "file_size": 2048576,
      "mime_type": "application/pdf",
      "uploaded_by": {
        "first_name": "Marie",
        "last_name": "Dupont"
      },
      "related_project": {
        "id": "project-erp-001",
        "name": "Refonte ERP SAP"
      },
      "created_at": "2025-01-10T10:00:00Z"
    }
  ]
}
```

---

### POST `/documents`
Uploader un nouveau document.

**Request Body (multipart/form-data):**
```
file: [binary]
title: "Rapport Audit Sécurité"
document_type: "REPORT"
related_project_id: "project-erp-001"
```

**Response (201 Created):**
```json
{
  "id": "doc-002",
  "title": "Rapport Audit Sécurité",
  "file_path": "s3://documents/audit-report-2026.pdf",
  "created_at": "2026-01-09T22:00:00Z"
}
```

---

## 💬 9. Comments

### GET `/comments`
Commentaires polymorphiques (sur projet, risque, décision, etc.).

**Query Parameters:**
- `entityType`: `PROJECT`, `RISK`, `DECISION`, `DOCUMENT`
- `entityId`: ID de l'entité

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "comment-001",
      "content": "Migration serveurs complétée avec succès",
      "user": {
        "id": "user-thomas-004",
        "first_name": "Thomas",
        "last_name": "Leroy"
      },
      "entity_type": "PROJECT",
      "entity_id": "project-erp-001",
      "created_at": "2025-11-20T10:00:00Z"
    }
  ]
}
```

---

### POST `/comments`
Ajouter un commentaire.

**Request Body:**
```json
{
  "content": "Risque résolu - patch déployé",
  "entity_type": "RISK",
  "entity_id": "risk-security-001"
}
```

**Response (201 Created):**
```json
{
  "id": "comment-002",
  "content": "Risque résolu - patch déployé",
  "created_at": "2026-01-09T23:00:00Z"
}
```

---

## 🔔 10. Notifications

### GET `/notifications`
Liste des notifications utilisateur.

**Query Parameters:**
- `isRead` (optional): `true` / `false`
- `notificationType` (optional): `NEW_DECISION`, `RISK_UPDATED`, `COMMITTEE_UPCOMING`, `ACTION_DUE`, `SIGNAL_DETECTED`

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "notif-001",
      "notification_type": "ACTION_DUE",
      "title": "Action à échéance demain",
      "message": "L'action 'Recruter consultants SAP' est due le 31/01",
      "link": "/app/decisions/decision-001",
      "is_read": false,
      "created_at": "2026-01-30T08:00:00Z"
    },
    {
      "id": "notif-002",
      "notification_type": "SIGNAL_DETECTED",
      "title": "Nouveau signal IA",
      "message": "Risque de dérive planning détecté",
      "link": "/app/risk-intelligence",
      "is_read": false,
      "created_at": "2026-01-08T08:00:00Z"
    }
  ],
  "unread_count": 2
}
```

---

### PATCH `/notifications/:id/read`
Marquer une notification comme lue.

**Response (200 OK):**
```json
{
  "id": "notif-001",
  "is_read": true,
  "read_at": "2026-01-09T23:30:00Z"
}
```

---

## 🔒 11. Error Responses

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Le champ 'name' est requis",
  "details": {
    "field": "name",
    "constraint": "required"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Token invalide ou expiré"
}
```

### 403 Forbidden
```json
{
  "error": "FORBIDDEN",
  "message": "Vous n'avez pas les permissions pour cette action",
  "required_permission": "MANAGE_COMMITTEES"
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Projet introuvable",
  "resource_type": "project",
  "resource_id": "project-xyz-999"
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_SERVER_ERROR",
  "message": "Une erreur inattendue est survenue",
  "request_id": "req-12345-abcde"
}
```

---

## 🎉 Résumé

**Total Endpoints:** ~60 endpoints  
**Resources:** 11 principales (Auth, Portfolios, Projects, Committees, Decisions, Risks, Signals, KPIs, Documents, Comments, Notifications)  
**Verbes HTTP:** GET, POST, PATCH (pas de DELETE pour traçabilité)  
**Format:** JSON uniquement  
**Authentification:** JWT Bearer Token  
**Versioning:** `/api/v1` pour rétro-compatibilité  

---

**Prêt pour implémentation backend avec Express.js/Fastify ou Supabase Edge Functions!** 🚀
