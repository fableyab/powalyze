# Exemples d'Utilisation - Powalyze Governance SaaS

> Scénarios concrets d'utilisation des services et pages

---

## 📋 Table des Matières

1. [Scénario PMO: Préparer un Comité](#scénario-pmo-préparer-un-comité)
2. [Scénario Executive: Approuver des Décisions](#scénario-executive-approuver-des-décisions)
3. [Scénario Chef de Projet: Gérer les Risques](#scénario-chef-de-projet-gérer-les-risques)
4. [Scénario Data: Configurer des KPI](#scénario-data-configurer-des-kpi)
5. [Scénario Consultant: Modèle de Gouvernance](#scénario-consultant-modèle-de-gouvernance)
6. [Intégration Power BI](#intégration-power-bi)
7. [API REST Personnalisée](#api-rest-personnalisée)

---

## Scénario PMO: Préparer un Comité

### Contexte
Marie est PMO chez Acme Corp. Elle doit préparer le COPIL mensuel du 15 janvier 2026.

### Étape 1: Créer le comité

```javascript
import { committeeService } from '@/lib/committeeService';

// Récupérer le type de comité "COPIL"
const { data: types } = await committeeTypeService.getCommitteeTypes(organizationId);
const copilType = types.find(t => t.name === 'COPIL');

// Créer le comité
const committee = await committeeService.createCommittee(organizationId, {
  committee_type_id: copilType.id,
  date: '2026-01-15T14:00:00Z',
  status: 'PLANNED',
  agenda: 'Revue des projets Q1 + Décisions budget Q2',
  chair_user_id: 'marie-user-id',
  participants: [
    'ceo-user-id',
    'cfo-user-id',
    'cto-user-id',
    'marie-user-id'
  ],
  notes: ''
});

console.log('Comité créé:', committee.id);
```

### Étape 2: Ajouter les points à l'ordre du jour

```javascript
import { committeeItemService } from '@/lib/committeeService';
import { projectService } from '@/lib/portfolioService';
import { riskService } from '@/lib/decisionRiskService';

// Récupérer les projets AT_RISK
const { data: atRiskProjects } = await projectService.getProjects(organizationId, {
  status: 'AT_RISK'
});

// Récupérer les risques critiques (severity >= 15)
const { data: criticalRisks } = await riskService.getCriticalRisks(organizationId);

// Ajouter un item pour chaque projet AT_RISK
for (let i = 0; i < atRiskProjects.length; i++) {
  const project = atRiskProjects[i];
  await committeeItemService.createCommitteeItem({
    committee_id: committee.id,
    type: 'PROJECT_REVIEW',
    title: `Revue projet ${project.name}`,
    description: `Projet en difficulté - Budget: ${project.budget_actual}€ / ${project.budget_planned}€`,
    related_project_id: project.id,
    status: 'PENDING',
    order_index: i
  });
}

// Ajouter un item pour chaque risque critique
let orderIndex = atRiskProjects.length;
for (const risk of criticalRisks) {
  await committeeItemService.createCommitteeItem({
    committee_id: committee.id,
    type: 'RISK_REVIEW',
    title: `Risque critique: ${risk.title}`,
    description: `Sévérité: ${risk.severity}/25`,
    related_risk_id: risk.id,
    status: 'PENDING',
    order_index: orderIndex++
  });
}

console.log('Ordre du jour créé avec', orderIndex, 'points');
```

### Étape 3: Prendre des décisions pendant le comité

```javascript
import { decisionService, decisionActionService } from '@/lib/decisionRiskService';

// Le comité décide d'augmenter le budget du projet XYZ
const decision = await decisionService.createDecision(organizationId, {
  title: 'Augmentation budget Projet XYZ',
  description: 'Budget supplémentaire de 50K€ pour rattraper le retard',
  decision_date: '2026-01-15',
  status: 'TAKEN',
  decision_type: 'BUDGET',
  committee_id: committee.id,
  created_by_user_id: 'marie-user-id',
  approved_by_user_id: 'ceo-user-id',
  related_project_id: 'project-xyz-id',
  impact_summary: 'Permet de recruter 2 devs supplémentaires pendant 3 mois'
});

// Créer l'action associée
await decisionActionService.createAction({
  decision_id: decision.id,
  title: 'Recruter 2 développeurs seniors',
  description: 'Profils React + Node.js, mission 3 mois',
  owner_user_id: 'hr-manager-id',
  due_date: '2026-02-01',
  status: 'OPEN'
});

console.log('Décision prise et action créée');
```

### Étape 4: Clôturer le comité et exporter

```javascript
// Marquer le comité comme CLOSED
await committeeService.updateCommittee(committee.id, {
  status: 'CLOSED',
  notes: `
    **Présents**: CEO, CFO, CTO, PMO
    **Points clés**:
    - 3 projets AT_RISK revus
    - 2 risques critiques traités
    - 1 décision budgétaire prise
    
    **Prochaine séance**: 15 février 2026
  `
});

// Exporter le compte-rendu
const report = await committeeService.exportCommitteeReport(committee.id);
console.log('Compte-rendu:', report);

// Format Markdown généré:
// # COPIL - 15 janvier 2026
// 
// **Président**: Marie Dupont  
// **Participants**: 4
// 
// ## Ordre du jour
// 1. ✅ Revue projet XYZ (AT_RISK)
// 2. ✅ Revue projet ABC (AT_RISK)
// 3. ✅ Risque critique: Dérive budget Q1
// 
// ## Décisions prises
// - **BUDGET** - Augmentation budget Projet XYZ (+50K€)
//   - Action: Recruter 2 développeurs seniors (Due: 01/02/2026)
// 
// ## Notes
// Présents: CEO, CFO, CTO, PMO...
```

---

## Scénario Executive: Approuver des Décisions

### Contexte
Jean est CEO. Il consulte le Decision Hub pour valider les décisions en attente.

### Étape 1: Voir les décisions en attente

```javascript
import { decisionService } from '@/lib/decisionRiskService';

// Page DecisionHub.jsx - Au chargement
const { data: pendingDecisions } = await decisionService.getPendingDecisions(organizationId);

console.log('Décisions en attente:', pendingDecisions);
// [
//   {
//     id: 'dec-123',
//     title: 'Lancer le projet Innovation AI',
//     decision_type: 'GO',
//     related_project: { name: 'Innovation AI' },
//     created_by: { first_name: 'Marie', last_name: 'Dupont' },
//     impact_summary: 'Investissement 100K€, ROI estimé +500K€ en 2 ans',
//     status: 'PLANNED'
//   },
//   ...
// ]
```

### Étape 2: Approuver une décision

```javascript
// User clique sur "Approuver"
const handleApprove = async (decisionId) => {
  try {
    await decisionService.approveDecision(decisionId, user.id);
    
    // Recharger les décisions
    const { data: updated } = await decisionService.getPendingDecisions(organizationId);
    setPendingDecisions(updated);
    
    // Notification
    toast.success('Décision approuvée');
  } catch (error) {
    toast.error('Erreur lors de l\'approbation');
  }
};

// Backend: decisionService.approveDecision() met à jour:
// - status: 'PLANNED' → 'TAKEN'
// - approved_by_user_id: user.id
// - decision_date: Date actuelle
```

### Étape 3: Rejeter une décision

```javascript
const handleReject = async (decisionId) => {
  try {
    await decisionService.rejectDecision(decisionId);
    
    // Recharger
    const { data: updated } = await decisionService.getPendingDecisions(organizationId);
    setPendingDecisions(updated);
    
    toast.success('Décision rejetée');
  } catch (error) {
    toast.error('Erreur lors du rejet');
  }
};

// Backend: decisionService.rejectDecision() met à jour:
// - status: 'PLANNED' → 'REJECTED'
```

---

## Scénario Chef de Projet: Gérer les Risques

### Contexte
Thomas est chef de projet sur "Migration Cloud". Il identifie un risque de sécurité.

### Étape 1: Déclarer le risque

```javascript
import { riskService } from '@/lib/decisionRiskService';

const risk = await riskService.createRisk(organizationId, {
  title: 'Vulnérabilité sécurité API Gateway',
  description: `
    L'API Gateway actuelle ne supporte pas OAuth 2.0.
    Risque d'accès non autorisé aux données clients.
  `,
  owner_user_id: 'thomas-user-id',
  related_project_id: 'migration-cloud-project-id',
  probability: 4,  // 1-5 (4 = Probable)
  impact: 5,       // 1-5 (5 = Critique)
  // severity: 20 (calculé automatiquement: 4 × 5)
  status: 'OPEN',
  mitigation_plan: `
    1. Audit sécurité complet (1 semaine)
    2. Implémentation OAuth 2.0 (2 semaines)
    3. Pentest externe (1 semaine)
  `
});

console.log('Risque créé:', risk);
// severity = 20 → Zone ROUGE dans la matrice 5x5
```

### Étape 2: Suivre le risque dans RiskIntelligence

```jsx
// Page RiskIntelligence.jsx - Vue "Risques"
const { data: risks } = await riskService.getRisks(organizationId, {
  status: 'OPEN',
  minSeverity: 15 // Uniquement risques critiques
});

// Affichage
<div className="grid gap-4">
  {risks.map(risk => (
    <motion.div
      key={risk.id}
      className="bg-[#0A1A2F]/50 border border-gray-700 rounded-xl p-6"
    >
      {/* Badge sévérité */}
      <span className={`
        px-3 py-1 rounded-full text-xs font-bold
        ${risk.severity >= 20 ? 'bg-red-500/20 text-red-400' : ''}
        ${risk.severity >= 15 && risk.severity < 20 ? 'bg-amber-500/20 text-amber-400' : ''}
      `}>
        Sévérité: {risk.severity}/25
      </span>
      
      {/* Titre + Description */}
      <h3 className="text-white font-bold mt-4">{risk.title}</h3>
      <p className="text-gray-400 text-sm mt-2">{risk.description}</p>
      
      {/* Probabilité × Impact */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-xs">Probabilité</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(i => (
              <div 
                key={i}
                className={`w-8 h-2 rounded ${i <= risk.probability ? 'bg-red-500' : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Impact</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(i => (
              <div 
                key={i}
                className={`w-8 h-2 rounded ${i <= risk.impact ? 'bg-red-500' : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Plan de mitigation */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-400 text-xs font-medium">Plan de mitigation</p>
        <p className="text-gray-300 text-sm mt-2 whitespace-pre-line">
          {risk.mitigation_plan}
        </p>
      </div>
    </motion.div>
  ))}
</div>
```

### Étape 3: Visualiser dans la matrice 5x5

```javascript
// Page RiskIntelligence.jsx - Vue "Matrice"
const { data: matrix } = await riskService.getRiskMatrix(organizationId);

// matrix = [
//   [0, 1, 2, 3, 5],  // Probabilité 1
//   [1, 2, 4, 6, 8],  // Probabilité 2
//   [0, 1, 3, 5, 7],  // Probabilité 3
//   [1, 2, 4, 7, 9],  // Probabilité 4 ← Notre risque
//   [0, 1, 2, 4, 6]   // Probabilité 5
// ]

// Le risque (prob=4, impact=5) apparaît dans matrix[3][4] = 9 risques
```

---

## Scénario Data: Configurer des KPI

### Contexte
Sophie est Data Analyst. Elle doit configurer le KPI "Taux de réussite projets".

### Étape 1: Créer la définition KPI

```javascript
import { kpiDefinitionService } from '@/lib/kpiService';

const kpiDef = await kpiDefinitionService.createKPIDefinition(organizationId, {
  name: 'Taux de réussite projets',
  code: 'PROJECT_SUCCESS_RATE',
  description: 'Pourcentage de projets terminés en GREEN sur le total',
  unit: '%',
  target_value: 85.0, // Objectif: 85%
  direction: 'HIGHER_IS_BETTER'
});

console.log('KPI créé:', kpiDef);
```

### Étape 2: Enregistrer des valeurs

```javascript
import { kpiValueService } from '@/lib/kpiService';

// Calcul manuel (ou via job automatique)
const { data: projects } = await projectService.getProjects(organizationId, {
  status: 'DONE'
});

const totalDone = projects.length;
const greenProjects = projects.filter(p => p.health === 'GREEN').length;
const successRate = (greenProjects / totalDone) * 100;

// Enregistrer la valeur
await kpiValueService.recordKPIValue(organizationId, {
  kpi_definition_id: kpiDef.id,
  scope_type: 'ORGANIZATION',
  scope_id: organizationId,
  value: successRate,
  date: new Date().toISOString().split('T')[0]
});

console.log('KPI enregistré:', successRate, '%');
```

### Étape 3: Afficher le trend sur 30 jours

```javascript
const trend = await kpiValueService.getKPITrend(
  kpiDef.id,
  'ORGANIZATION',
  organizationId,
  30 // derniers 30 jours
);

console.log('Trend:', trend);
// [
//   { date: '2025-12-10', value: 78.5 },
//   { date: '2025-12-20', value: 82.3 },
//   { date: '2026-01-09', value: 87.1 }  ← Au-dessus de la cible!
// ]

// Utiliser Chart.js ou Recharts pour afficher la courbe
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

<LineChart width={600} height={300} data={trend}>
  <XAxis dataKey="date" />
  <YAxis domain={[0, 100]} />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} />
  {/* Ligne cible à 85% */}
  <Line type="monotone" data={[{date: trend[0].date, value: 85}, {date: trend[trend.length-1].date, value: 85}]} stroke="#ef4444" strokeDasharray="5 5" />
</LineChart>
```

---

## Scénario Consultant: Modèle de Gouvernance

### Contexte
Julien est consultant. Il configure un modèle de gouvernance pour un nouveau client.

### Étape 1: Créer les types de comités

```javascript
import { committeeTypeService } from '@/lib/committeeService';

const comiteTypes = [
  {
    name: 'COPIL (Comité de Pilotage)',
    description: 'Revue exécutive mensuelle avec décisions stratégiques',
    frequency: 'MONTHLY',
    default_participants: [] // À remplir après création users
  },
  {
    name: 'CODIR (Comité de Direction)',
    description: 'Revue direction trimestrielle pour alignement stratégique',
    frequency: 'QUARTERLY',
    default_participants: []
  },
  {
    name: 'Comité Technique',
    description: 'Revue hebdomadaire des équipes techniques',
    frequency: 'WEEKLY',
    default_participants: []
  },
  {
    name: 'Comité Risques',
    description: 'Revue bimensuelle des risques critiques',
    frequency: 'BIWEEKLY',
    default_participants: []
  }
];

for (const type of comiteTypes) {
  const created = await committeeTypeService.createCommitteeType(organizationId, type);
  console.log('Type créé:', created.name);
}
```

### Étape 2: Créer des KPI standards

```javascript
const standardKPIs = [
  {
    name: 'Taux de réussite projets',
    code: 'PROJECT_SUCCESS_RATE',
    unit: '%',
    target_value: 85.0,
    direction: 'HIGHER_IS_BETTER'
  },
  {
    name: 'Budget Variance',
    code: 'BUDGET_VARIANCE',
    description: 'Écart entre budget planifié et réel',
    unit: '%',
    target_value: 5.0, // Max 5% d'écart
    direction: 'LOWER_IS_BETTER'
  },
  {
    name: 'Délai moyen de décision',
    code: 'AVG_DECISION_TIME',
    description: 'Nombre de jours entre création et approbation d\'une décision',
    unit: 'jours',
    target_value: 7.0,
    direction: 'LOWER_IS_BETTER'
  },
  {
    name: 'Risques critiques ouverts',
    code: 'CRITICAL_RISKS_OPEN',
    description: 'Nombre de risques avec sévérité >= 15',
    unit: 'count',
    target_value: 0,
    direction: 'LOWER_IS_BETTER'
  }
];

for (const kpi of standardKPIs) {
  const created = await kpiDefinitionService.createKPIDefinition(organizationId, kpi);
  console.log('KPI créé:', created.code);
}
```

### Étape 3: Créer un portfolio template

```javascript
import { portfolioService, programService, projectService } from '@/lib/portfolioService';

// Portfolio "Transformation Digitale"
const portfolio = await portfolioService.createPortfolio(organizationId, {
  name: 'Transformation Digitale',
  description: 'Programme de modernisation IT 2026-2028',
  owner_user_id: ownerUserId,
  status: 'ACTIVE',
  strategic_axis: 'Innovation & Digitalisation',
  priority: 1,
  start_date: '2026-01-01',
  end_date: '2028-12-31',
  budget_planned: 5000000,
  budget_actual: 0
});

// Programme "Migration Cloud"
const program = await programService.createProgram(organizationId, {
  portfolio_id: portfolio.id,
  name: 'Migration Cloud',
  description: 'Migration infrastructure vers Azure',
  owner_user_id: ownerUserId,
  status: 'ACTIVE',
  start_date: '2026-01-01',
  end_date: '2027-06-30',
  budget_planned: 2000000,
  budget_actual: 0
});

// Projets types
const projectsTemplate = [
  {
    name: 'Migration BDD vers Azure SQL',
    sponsor_user_id: sponsorId,
    project_manager_user_id: pmId,
    status: 'NOT_STARTED',
    health: 'GREEN',
    budget_planned: 500000
  },
  {
    name: 'Migration Apps vers AKS',
    sponsor_user_id: sponsorId,
    project_manager_user_id: pmId,
    status: 'NOT_STARTED',
    health: 'GREEN',
    budget_planned: 800000
  }
];

for (const proj of projectsTemplate) {
  const created = await projectService.createProject(organizationId, {
    ...proj,
    portfolio_id: portfolio.id,
    program_id: program.id,
    description: '',
    start_date: '2026-03-01',
    end_date: '2026-12-31',
    budget_actual: 0,
    progress_percent: 0
  });
  console.log('Projet créé:', created.name);
}
```

---

## Intégration Power BI

### Étape 1: Configurer la connexion PostgreSQL

Dans Power BI Desktop:

1. **Obtenir les données** → **Base de données PostgreSQL**
2. Renseigner:
   - **Serveur**: `db.xxx.supabase.co`
   - **Base de données**: `postgres`
   - **Mode de connexion**: DirectQuery (pour real-time) ou Import (pour performance)
3. **Avancé** → Copier la requête SQL:

```sql
-- Vue agrégée pour Power BI
CREATE OR REPLACE VIEW powerbi_portfolio_dashboard AS
SELECT
  p.id AS portfolio_id,
  p.name AS portfolio_name,
  p.status AS portfolio_status,
  p.priority,
  COUNT(DISTINCT proj.id) AS total_projects,
  COUNT(DISTINCT CASE WHEN proj.status = 'IN_PROGRESS' THEN proj.id END) AS projects_in_progress,
  COUNT(DISTINCT CASE WHEN proj.status = 'AT_RISK' THEN proj.id END) AS projects_at_risk,
  COUNT(DISTINCT CASE WHEN proj.health = 'GREEN' THEN proj.id END) AS projects_green,
  COUNT(DISTINCT CASE WHEN proj.health = 'AMBER' THEN proj.id END) AS projects_amber,
  COUNT(DISTINCT CASE WHEN proj.health = 'RED' THEN proj.id END) AS projects_red,
  SUM(proj.budget_planned) AS total_budget_planned,
  SUM(proj.budget_actual) AS total_budget_actual,
  AVG(proj.progress_percent) AS avg_progress
FROM portfolios p
LEFT JOIN projects proj ON proj.portfolio_id = p.id
WHERE p.organization_id = current_setting('app.current_organization_id')::uuid
GROUP BY p.id, p.name, p.status, p.priority;
```

### Étape 2: Créer un rapport Power BI

**Mesures DAX:**

```dax
// Budget Variance %
Budget Variance = 
DIVIDE(
  SUM(Projects[budget_actual]) - SUM(Projects[budget_planned]),
  SUM(Projects[budget_planned]),
  0
) * 100

// Health Score (GREEN=100, AMBER=50, RED=0)
Health Score = 
CALCULATE(
  SWITCH(
    Projects[health],
    "GREEN", 100,
    "AMBER", 50,
    "RED", 0
  )
)

// Taux de réussite
Success Rate = 
DIVIDE(
  CALCULATE(COUNT(Projects[id]), Projects[health] = "GREEN", Projects[status] = "DONE"),
  CALCULATE(COUNT(Projects[id]), Projects[status] = "DONE"),
  0
) * 100
```

**Visuels recommandés:**
- Carte: Total Projets, Budget Total, Taux de Réussite
- Graphique en barres: Projets par Statut
- Graphique en secteurs: Projets par Santé (GREEN/AMBER/RED)
- Tableau: Liste projets avec Nom, PM, Budget, Santé
- Graphique en courbes: Évolution Health Score dans le temps

### Étape 3: Publier et intégrer dans Powalyze

```jsx
// Page PowerBIHub.jsx
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const PowerBIReport = () => {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: 'report',
        id: 'votre-report-id',
        embedUrl: 'https://app.powerbi.com/reportEmbed?...',
        accessToken: powerBIToken, // Obtenu via API Power BI
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: { expanded: false, visible: true },
            pageNavigation: { visible: true }
          },
          background: models.BackgroundType.Transparent
        }
      }}
      eventHandlers={
        new Map([
          ['loaded', () => console.log('Report loaded')],
          ['rendered', () => console.log('Report rendered')]
        ])
      }
      cssClassName="powerbi-report"
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
};
```

---

## API REST Personnalisée

### Créer une Supabase Edge Function

```bash
# Créer la fonction
supabase functions new portfolio-summary

# Fichier: supabase/functions/portfolio-summary/index.ts
```

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { portfolioId } = await req.json();

  // Récupérer toutes les données en 1 query complexe
  const { data, error } = await supabase.rpc('get_portfolio_full_summary', {
    p_portfolio_id: portfolioId
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

**Créer la fonction SQL:**

```sql
CREATE OR REPLACE FUNCTION get_portfolio_full_summary(p_portfolio_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'portfolio', (SELECT row_to_json(p) FROM portfolios p WHERE p.id = p_portfolio_id),
    'projects', (SELECT json_agg(proj) FROM projects proj WHERE proj.portfolio_id = p_portfolio_id),
    'risks', (SELECT json_agg(r) FROM risks r WHERE r.related_portfolio_id = p_portfolio_id),
    'decisions', (SELECT json_agg(d) FROM decisions d WHERE d.related_portfolio_id = p_portfolio_id),
    'kpis', (
      SELECT json_agg(
        json_build_object(
          'definition', kd,
          'latest_value', (
            SELECT kv.value FROM kpi_values kv 
            WHERE kv.kpi_definition_id = kd.id 
            AND kv.scope_type = 'PORTFOLIO' 
            AND kv.scope_id = p_portfolio_id 
            ORDER BY kv.date DESC LIMIT 1
          )
        )
      )
      FROM kpi_definitions kd
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Appel depuis le frontend:**

```javascript
const getPortfolioSummary = async (portfolioId) => {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/portfolio-summary`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({ portfolioId })
    }
  );
  
  return await response.json();
};

// Utilisation
const summary = await getPortfolioSummary('portfolio-123');
console.log(summary);
// {
//   portfolio: { name: '...', status: '...', ... },
//   projects: [...],
//   risks: [...],
//   decisions: [...],
//   kpis: [...]
// }
```

---

## Bonus: Webhooks pour Notifications

### Créer un trigger PostgreSQL pour notifier Slack/Teams

```sql
-- Fonction trigger pour décisions TAKEN
CREATE OR REPLACE FUNCTION notify_decision_taken()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';
  payload JSON;
BEGIN
  IF NEW.status = 'TAKEN' AND OLD.status = 'PLANNED' THEN
    payload := json_build_object(
      'text', format('✅ Nouvelle décision approuvée: %s', NEW.title),
      'blocks', json_build_array(
        json_build_object(
          'type', 'section',
          'text', json_build_object(
            'type', 'mrkdwn',
            'text', format('*%s*\n%s\n\n_Approuvé par: %s_', 
              NEW.title, 
              NEW.description,
              (SELECT first_name || ' ' || last_name FROM users WHERE id = NEW.approved_by_user_id)
            )
          )
        ),
        json_build_object(
          'type', 'actions',
          'elements', json_build_array(
            json_build_object(
              'type', 'button',
              'text', json_build_object('type', 'plain_text', 'text', 'Voir dans Powalyze'),
              'url', format('https://app.powalyze.com/app/decisions/%s', NEW.id)
            )
          )
        )
      )
    );
    
    -- Envoyer via HTTP (nécessite extension pg_net)
    PERFORM net.http_post(
      url := webhook_url,
      body := payload::TEXT
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER on_decision_taken
AFTER UPDATE ON decisions
FOR EACH ROW
EXECUTE FUNCTION notify_decision_taken();
```

---

**Auteur:** Équipe Powalyze  
**Version:** 1.0  
**Date:** 2026-01-09
