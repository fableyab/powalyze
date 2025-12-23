# 📊 Guide Technique Data & Power BI
## Powalyze - Business Intelligence & Analytics

**Version 2.5 - Décembre 2024**  
**Copyright © Powalyze - Tous droits réservés**

---

## 📋 Table des Matières

1. [Introduction à la Data Intelligence](#introduction)
2. [Architecture Data](#architecture)
3. [Power BI - Guide Complet](#powerbi)
4. [Modélisation des Données](#modelisation)
5. [DAX - Formules Avancées](#dax)
6. [Dashboards par Use Case](#dashboards)
7. [Intégrations & API](#integrations)
8. [Gouvernance des Données](#gouvernance)
9. [Performance & Optimisation](#performance)
10. [Cas d'Usage Réels](#cas-usage)

---

## 🎯 1. Introduction à la Data Intelligence

### Pourquoi la Data Intelligence est Critique pour le PMO

**Le Problème :**
- 85% des décisions sont prises sans données fiables
- 50+ heures/mois perdues à chercher l'information
- Pas de visibilité temps réel sur les KPIs
- Rapports manuels dans Excel (erreurs, délais)

**La Solution Powalyze :**
- Dashboards temps réel connectés à vos sources
- Alertes intelligentes basées sur l'IA
- Reporting automatisé multi-niveaux
- Analytics prédictifs pour anticiper les risques

**ROI Mesuré :**
- ✅ -60% de temps passé en reporting manuel
- ✅ +45% de qualité des décisions (data-driven)
- ✅ -30% de risques non détectés
- ✅ +35% de réactivité sur les incidents

---

## 🏗️ 2. Architecture Data

### Stack Technologique Complète

```
┌─────────────────────────────────────────┐
│     COUCHE PRÉSENTATION                 │
│  • Power BI Embedded                    │
│  • Dashboards interactifs               │
│  • Mobile (iOS, Android)                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│     COUCHE SÉMANTIQUE                   │
│  • Power BI Dataset (Semantic Model)    │
│  • DAX measures & calculated columns    │
│  • RLS (Row-Level Security)             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│     COUCHE TRANSFORMATION               │
│  • Power Query M (ETL)                  │
│  • Azure Data Factory                   │
│  • Dataflows                            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│     COUCHE STOCKAGE                     │
│  • Azure SQL Database (OLTP)            │
│  • Azure Synapse Analytics (OLAP)       │
│  • Data Lake Gen2 (Raw Data)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│     SOURCES DE DONNÉES                  │
│  • Jira, Azure DevOps                   │
│  • SAP, Oracle, Dynamics 365            │
│  • SharePoint, Excel, CSV               │
└─────────────────────────────────────────┘
```

### Architecture Recommandée par Taille

**PME (< 50 projets)**
- Power BI Desktop + Service
- Azure SQL Database (Basic tier)
- Connexions DirectQuery
- Coût : ~€500/mois

**Mid-Market (50-150 projets)**
- Power BI Premium Per User
- Azure SQL Database (Standard S3)
- Azure Data Factory (ETL)
- Coût : ~€2,500/mois

**Enterprise (> 150 projets)**
- Power BI Premium Capacity (P1)
- Azure Synapse Analytics
- Data Lake Gen2
- Dataflows & Datasets partagés
- Coût : ~€8,000/mois

---

## 📊 3. Power BI - Guide Complet

### 3.1 Configuration Workspace

**Étape 1 : Créer le Workspace**
```
Workspace Name: Powalyze-PMO
Capacity: Premium Per User (ou Premium P1)
Contributors: PMO Team (10 users)
Viewers: Executives (50 users)
```

**Étape 2 : Sécurité RLS (Row-Level Security)**

```dax
-- Table Users
UserEmail = USERPRINCIPALNAME()

-- Table Organizations
[UserEmail] IN VALUES(Users[Email])

-- Table Projects (filtré par Org)
RELATED(Organizations[ID]) = 
  LOOKUPVALUE(
    Users[OrganizationID],
    Users[Email],
    USERPRINCIPALNAME()
  )
```

**Étape 3 : Paramétrage du Refresh**
- Scheduled Refresh : Toutes les 2 heures (8h-20h)
- Incremental Refresh : Actif (derniers 2 ans)
- Notifications d'échec : PMO Admin

---

### 3.2 Semantic Model (Dataset)

**Structure du Modèle (Star Schema)**

```
         ┌─────────────┐
         │   DimDate   │ (Dimension)
         └──────┬──────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼───┐   ┌───▼───┐   ┌──▼────┐
│DimOrg │   │DimProj│   │DimUser│ (Dimensions)
└───────┘   └───┬───┘   └───────┘
                │
            ┌───▼────┐
            │FactKPI│ (Fact Table)
            └────────┘
```

**Table DimDate (Dimension Temps)**
```dax
DimDate = 
  ADDCOLUMNS(
    CALENDAR(DATE(2020,1,1), DATE(2030,12,31)),
    "Year", YEAR([Date]),
    "Quarter", "Q" & FORMAT([Date], "Q"),
    "Month", FORMAT([Date], "MMM"),
    "MonthNumber", MONTH([Date]),
    "Week", WEEKNUM([Date]),
    "DayOfWeek", FORMAT([Date], "DDD"),
    "IsWeekend", WEEKDAY([Date]) IN {1,7},
    "FiscalYear", IF(MONTH([Date]) >= 4, YEAR([Date]) + 1, YEAR([Date])),
    "FiscalQuarter", "FQ" & ROUNDUP((MONTH([Date]) + 9) / 3, 0)
  )
```

**Table FactKPI (Table de Faits)**
```sql
CREATE TABLE FactKPI (
  KPI_ID INT PRIMARY KEY,
  ProjectID INT FOREIGN KEY REFERENCES DimProjects(ID),
  OrganizationID INT FOREIGN KEY REFERENCES DimOrganizations(ID),
  DateID INT FOREIGN KEY REFERENCES DimDate(DateID),
  
  -- Budget
  PlannedBudget DECIMAL(12,2),
  ActualBudget DECIMAL(12,2),
  BudgetVariance AS (ActualBudget - PlannedBudget),
  BudgetVariancePct AS ((ActualBudget - PlannedBudget) / PlannedBudget * 100),
  
  -- Timeline
  PlannedDuration INT, -- en jours
  ActualDuration INT,
  TimelineVariance AS (ActualDuration - PlannedDuration),
  
  -- Quality
  PlannedQuality INT, -- score 0-100
  ActualQuality INT,
  BugsCritical INT,
  BugsMajor INT,
  BugsMinor INT,
  
  -- Team
  PlannedFTE DECIMAL(4,2),
  ActualFTE DECIMAL(4,2),
  TurnoverRate DECIMAL(5,2), -- %
  
  -- Health Score
  HealthScore AS (
    (CASE WHEN TimelineVariance <= 0 THEN 25 ELSE 5 END) +
    (CASE WHEN BudgetVariancePct <= 0 THEN 25 ELSE 5 END) +
    (CASE WHEN BugsCritical = 0 THEN 25 ELSE 5 END) +
    (CASE WHEN TurnoverRate < 10 THEN 25 ELSE 5 END)
  ),
  
  -- Status
  Status VARCHAR(20), -- 'On Track', 'At Risk', 'In Trouble'
  
  -- Timestamps
  CreatedAt DATETIME DEFAULT GETDATE(),
  UpdatedAt DATETIME DEFAULT GETDATE()
)
```

---

### 3.3 DAX Measures - Top 50

**Mesure #1 : Total des Projets**
```dax
Total Projects = COUNTROWS(Projects)
```

**Mesure #2 : Projets On Track**
```dax
Projects On Track = 
  CALCULATE(
    [Total Projects],
    Projects[Status] = "On Track"
  )
```

**Mesure #3 : % Projets On Track**
```dax
% On Track = 
  DIVIDE(
    [Projects On Track],
    [Total Projects],
    0
  )
```

**Mesure #4 : Budget Total**
```dax
Total Budget = SUM(FactKPI[PlannedBudget])
```

**Mesure #5 : Budget Consommé**
```dax
Budget Spent = SUM(FactKPI[ActualBudget])
```

**Mesure #6 : Budget Variance**
```dax
Budget Variance = [Budget Spent] - [Total Budget]
```

**Mesure #7 : Budget Variance %**
```dax
Budget Variance % = 
  DIVIDE(
    [Budget Variance],
    [Total Budget],
    0
  ) * 100
```

**Mesure #8 : Health Score Moyen**
```dax
Avg Health Score = AVERAGE(FactKPI[HealthScore])
```

**Mesure #9 : Projets At Risk**
```dax
Projects At Risk = 
  CALCULATE(
    [Total Projects],
    Projects[HealthScore] >= 50,
    Projects[HealthScore] < 75
  )
```

**Mesure #10 : Projets In Trouble**
```dax
Projects In Trouble = 
  CALCULATE(
    [Total Projects],
    Projects[HealthScore] < 50
  )
```

**Mesure #11 : Taux de Réussite**
```dax
Success Rate = 
  DIVIDE(
    CALCULATE(
      [Total Projects],
      Projects[Status] IN {"Completed", "Closed"},
      Projects[HealthScore] >= 75
    ),
    CALCULATE(
      [Total Projects],
      Projects[Status] IN {"Completed", "Closed"}
    ),
    0
  ) * 100
```

**Mesure #12 : Retard Moyen (jours)**
```dax
Avg Delay = 
  AVERAGEX(
    FILTER(
      FactKPI,
      FactKPI[TimelineVariance] > 0
    ),
    FactKPI[TimelineVariance]
  )
```

**Mesure #13 : Projets en Retard**
```dax
Projects Delayed = 
  CALCULATE(
    [Total Projects],
    FactKPI[TimelineVariance] > 0
  )
```

**Mesure #14 : % Projets en Retard**
```dax
% Delayed = 
  DIVIDE(
    [Projects Delayed],
    [Total Projects],
    0
  ) * 100
```

**Mesure #15 : Total FTE**
```dax
Total FTE = SUM(FactKPI[ActualFTE])
```

**Mesure #16 : Utilisation Ressources**
```dax
Resource Utilization = 
  DIVIDE(
    [Total FTE],
    SUM(Organizations[TotalCapacity]),
    0
  ) * 100
```

**Mesure #17 : Bugs Critiques Totaux**
```dax
Total Critical Bugs = SUM(FactKPI[BugsCritical])
```

**Mesure #18 : Bugs Critiques par Projet**
```dax
Critical Bugs Per Project = 
  DIVIDE(
    [Total Critical Bugs],
    [Total Projects],
    0
  )
```

**Mesure #19 : Taux de Turnover Moyen**
```dax
Avg Turnover = AVERAGE(FactKPI[TurnoverRate])
```

**Mesure #20 : Économies Réalisées**
```dax
Savings = 
  SUMX(
    FILTER(
      FactKPI,
      FactKPI[BudgetVariance] < 0
    ),
    ABS(FactKPI[BudgetVariance])
  )
```

**Mesure #21 : Budget Variance Favorable**
```dax
Favorable Variance = 
  CALCULATE(
    SUM(FactKPI[BudgetVariance]),
    FactKPI[BudgetVariance] < 0
  )
```

**Mesure #22 : Budget Variance Défavorable**
```dax
Unfavorable Variance = 
  CALCULATE(
    SUM(FactKPI[BudgetVariance]),
    FactKPI[BudgetVariance] > 0
  )
```

**Mesure #23 : Alignement Stratégique**
```dax
Strategic Alignment = 
  DIVIDE(
    CALCULATE(
      [Total Projects],
      Projects[StrategicPriority] IN {"P1", "P2"}
    ),
    [Total Projects],
    0
  ) * 100
```

**Mesure #24 : ROI Moyen**
```dax
Avg ROI = 
  AVERAGEX(
    Projects,
    DIVIDE(
      Projects[ExpectedBenefits] - Projects[TotalCost],
      Projects[TotalCost],
      0
    )
  ) * 100
```

**Mesure #25 : Time-to-Market Moyen**
```dax
Avg Time to Market = 
  AVERAGE(Projects[TimeToMarketDays])
```

**Mesure #26 : Satisfaction Sponsors (NPS)**
```dax
Sponsor NPS = 
  AVERAGE(Projects[SponsorSatisfactionScore])
```

**Mesure #27 : Satisfaction Équipes**
```dax
Team Satisfaction = 
  AVERAGE(Projects[TeamSatisfactionScore])
```

**Mesure #28 : Vélocité Moyenne (Agile)**
```dax
Avg Velocity = 
  AVERAGEX(
    Sprints,
    Sprints[CompletedStoryPoints]
  )
```

**Mesure #29 : Burn Rate (€/jour)**
```dax
Burn Rate = 
  DIVIDE(
    [Budget Spent],
    DATEDIFF(
      MIN(Projects[StartDate]),
      TODAY(),
      DAY
    ),
    0
  )
```

**Mesure #30 : Forecast Budget**
```dax
Budget Forecast = 
  [Budget Spent] + 
  ([Burn Rate] * 
    DATEDIFF(
      TODAY(),
      MAX(Projects[EndDate]),
      DAY
    )
  )
```

**Mesure #31 : Risques Critiques**
```dax
Critical Risks = 
  CALCULATE(
    COUNTROWS(Risks),
    Risks[Severity] = "Critical",
    Risks[Status] = "Open"
  )
```

**Mesure #32 : Taux de Mitigation Risques**
```dax
Risk Mitigation Rate = 
  DIVIDE(
    CALCULATE(
      COUNTROWS(Risks),
      Risks[Status] = "Mitigated"
    ),
    COUNTROWS(Risks),
    0
  ) * 100
```

**Mesure #33 : Taux de Change Requests**
```dax
Change Request Rate = 
  DIVIDE(
    COUNTROWS(ChangeRequests),
    [Total Projects],
    0
  )
```

**Mesure #34 : Impact Change Requests (€)**
```dax
CR Impact = SUM(ChangeRequests[BudgetImpact])
```

**Mesure #35 : Projets Nouveaux (Mois)**
```dax
New Projects This Month = 
  CALCULATE(
    [Total Projects],
    Projects[StartDate] >= EOMONTH(TODAY(), -1) + 1,
    Projects[StartDate] <= EOMONTH(TODAY(), 0)
  )
```

**Mesure #36 : Projets Clôturés (Mois)**
```dax
Closed Projects This Month = 
  CALCULATE(
    [Total Projects],
    Projects[EndDate] >= EOMONTH(TODAY(), -1) + 1,
    Projects[EndDate] <= EOMONTH(TODAY(), 0),
    Projects[Status] IN {"Completed", "Closed"}
  )
```

**Mesure #37 : Taux de Livraison (Sprint)**
```dax
Sprint Delivery Rate = 
  DIVIDE(
    SUM(Sprints[CompletedStoryPoints]),
    SUM(Sprints[PlannedStoryPoints]),
    0
  ) * 100
```

**Mesure #38 : Lead Time Moyen**
```dax
Avg Lead Time = 
  AVERAGEX(
    WorkItems,
    DATEDIFF(
      WorkItems[CreatedDate],
      WorkItems[CompletedDate],
      DAY
    )
  )
```

**Mesure #39 : Cycle Time Moyen**
```dax
Avg Cycle Time = 
  AVERAGEX(
    WorkItems,
    DATEDIFF(
      WorkItems[InProgressDate],
      WorkItems[CompletedDate],
      DAY
    )
  )
```

**Mesure #40 : WIP (Work In Progress)**
```dax
Work In Progress = 
  CALCULATE(
    COUNTROWS(WorkItems),
    WorkItems[Status] = "In Progress"
  )
```

**Mesure #41 : Throughput (items/semaine)**
```dax
Throughput = 
  DIVIDE(
    CALCULATE(
      COUNTROWS(WorkItems),
      WorkItems[CompletedDate] >= TODAY() - 7,
      WorkItems[Status] = "Done"
    ),
    1
  )
```

**Mesure #42 : Code Coverage (%)**
```dax
Code Coverage = 
  AVERAGE(Builds[CodeCoveragePercent])
```

**Mesure #43 : Build Success Rate**
```dax
Build Success Rate = 
  DIVIDE(
    CALCULATE(
      COUNTROWS(Builds),
      Builds[Status] = "Succeeded"
    ),
    COUNTROWS(Builds),
    0
  ) * 100
```

**Mesure #44 : Deployment Frequency**
```dax
Deployment Frequency = 
  DIVIDE(
    CALCULATE(
      COUNTROWS(Deployments),
      Deployments[Status] = "Success",
      Deployments[DeployDate] >= TODAY() - 30
    ),
    30
  )
```

**Mesure #45 : MTTR (Mean Time To Restore)**
```dax
MTTR = 
  AVERAGEX(
    Incidents,
    DATEDIFF(
      Incidents[DetectedDate],
      Incidents[ResolvedDate],
      HOUR
    )
  )
```

**Mesure #46 : Change Failure Rate**
```dax
Change Failure Rate = 
  DIVIDE(
    CALCULATE(
      COUNTROWS(Deployments),
      Deployments[Status] = "Failed"
    ),
    COUNTROWS(Deployments),
    0
  ) * 100
```

**Mesure #47 : Technical Debt (jours)**
```dax
Technical Debt = 
  SUM(TechnicalDebt[EstimatedDays])
```

**Mesure #48 : Innovation Index**
```dax
Innovation Index = 
  DIVIDE(
    CALCULATE(
      [Total Projects],
      Projects[Type] = "Innovation"
    ),
    [Total Projects],
    0
  ) * 100
```

**Mesure #49 : Cloud Cost Optimization**
```dax
Cloud Savings = 
  SUM(CloudResources[PotentialSavings])
```

**Mesure #50 : Security Vulnerabilities**
```dax
Security Vulns = 
  CALCULATE(
    COUNTROWS(SecurityScans),
    SecurityScans[Severity] IN {"Critical", "High"},
    SecurityScans[Status] = "Open"
  )
```

---

## 📊 4. Dashboards par Use Case

### Dashboard #1 : Executive Summary (COMEX)

**Objectif :** Vue 360° du portefeuille pour le COMEX

**KPIs Principaux (4 cartes) :**
1. Santé Globale Portefeuille : 89% 🟢
2. Alignement Stratégique : 92% 🟢
3. Respect Budgets : 81% 🟡
4. Satisfaction Sponsors : 91% 🟢

**Visualisations :**

**1. Répartition Projets par Statut (Pie Chart)**
```
🟢 On Track : 56% (28 projets)
🟡 At Risk : 30% (15 projets)
🔴 In Trouble : 8% (4 projets)
⚪ On Hold : 6% (3 projets)
```

**2. Budget vs Actuel (Stacked Bar Chart)**
```
Budget Total : €12.5M
Budget Consommé : €8.2M (66%)
Budget Restant : €4.3M (34%)
Variance : -2.3% (sous budget) 🟢
```

**3. Top 10 Projets Stratégiques (Table)**
| Projet | Priorité | Health | Budget | Avancement |
|--------|----------|--------|--------|------------|
| Migration Cloud | P1 | 85 🟢 | €2.5M | 78% |
| Transformation Agile | P1 | 90 🟢 | €1.8M | 92% |
| Nouvelle Appli Mobile | P2 | 74 🟡 | €1.2M | 65% |

**4. Timeline - Projets Majeurs (Gantt)**
- Visualisation des jalons clés
- Dépendances inter-projets
- Chemin critique

**5. Risques Critiques (Cards)**
- 4 risques critiques ouverts
- 12 risques majeurs en mitigation
- Taux de mitigation : 78%

---

### Dashboard #2 : PMO Operations

**Objectif :** Pilotage opérationnel quotidien pour le PMO

**Filtres :**
- Organisation
- Sponsor
- Status
- Date Range

**Section 1 : Vue d'Ensemble**

**KPIs (10 cartes) :**
1. Total Projets : 50
2. Projets On Track : 28 (56%)
3. Projets At Risk : 15 (30%)
4. Projets In Trouble : 4 (8%)
5. Budget Total : €12.5M
6. Budget Consommé : €8.2M (66%)
7. Retard Moyen : 8.5 jours
8. Health Score : 78/100
9. FTE Total : 180
10. Turnover Rate : 7.2%

**Section 2 : Projets par Phase**

**Stacked Column Chart :**
```
Cadrage      : 8 projets  (16%)
Développement: 22 projets (44%)
Test/Recette : 12 projets (24%)
Déploiement  : 5 projets  (10%)
Clôture      : 3 projets  (6%)
```

**Section 3 : Budget Tracking**

**Waterfall Chart :**
```
Budget Initial : €12.5M
+ Change Requests : +€800k
- Économies : -€300k
= Budget Actuel : €13M
Consommé : €8.2M
Reste : €4.8M
```

**Section 4 : Ressources**

**Heatmap Allocation :**
```
          | Dev | QA | Ops | Archi | Total
─────────────────────────────────────────
Projet A  | 8   | 2  | 1   | 1     | 12
Projet B  | 12  | 4  | 2   | 2     | 20
Projet C  | 6   | 2  | 1   | 0.5   | 9.5
─────────────────────────────────────────
Dispo     | 42  | 18 | 8   | 5     | 73
```

**Section 5 : Risques & Enjeux**

**Matrix Chart (Probabilité x Impact) :**
```
Impact
  ↑
  │  🔴 🔴         🔴🔴🔴
  │  🟡 🟡         🔴🔴
  │  🟢 🟢 🟡      🔴
  │  🟢 🟢 🟢
  │
  └────────────────────→
        Probabilité
```

---

### Dashboard #3 : Agile Metrics

**Objectif :** Suivi des équipes Agile (Scrum, Kanban)

**KPIs Agile (8 cartes) :**
1. Vélocité Moyenne : 45 SP/Sprint
2. Sprint Delivery Rate : 87%
3. Lead Time : 12.5 jours
4. Cycle Time : 8.2 jours
5. WIP : 32 items
6. Throughput : 18 items/semaine
7. Bugs : 8 critiques, 24 majeurs
8. Code Coverage : 78%

**Section 1 : Vélocité Trend**

**Line Chart :**
```
Story Points
    ↑
 60 │        ●───●
 50 │    ●───●       ●
 40 │●───●               ●
 30 │
    └─────────────────────→
     S1  S2  S3  S4  S5  S6
```

**Section 2 : Burndown Chart**

```
Remaining Work
    ↑
100 │●
 80 │ ●
 60 │  ●●
 40 │    ●●
 20 │      ●●
  0 │        ●
    └─────────────────────→
     Day 1     Day 10
```

**Section 3 : Cumulative Flow Diagram**

```
Items
    ↑
100 │           ╱Done
 80 │        ╱─╱In Progress
 60 │     ╱─╱─╱To Do
 40 │  ╱─╱─╱──╱Backlog
 20 │╱─╱─╱───╱
  0 │
    └─────────────────────→
     W1   W2   W3   W4
```

**Section 4 : Cycle Time Distribution**

**Histogram :**
```
Items
    │
 15 │     █
 10 │   █ █ █
  5 │ █ █ █ █ █
  0 │─────────────
     0-5 5-10 10-15 >15
          Days
```

---

### Dashboard #4 : Financial Tracking

**Objectif :** Suivi budgétaire détaillé

**Section 1 : Budget Consolidé**

**Sankey Diagram :**
```
Budget Initial (€12.5M)
    │
    ├─→ Dev (€5.2M, 42%)
    ├─→ Infra (€3.1M, 25%)
    ├─→ Licences (€2.2M, 18%)
    └─→ Consulting (€2M, 15%)
```

**Section 2 : Variance Analysis**

**Bullet Chart par Projet :**
```
Projet A
  Actuel  : ████████░░ 80%
  Budget  : ──────────| 100%
  Variance: -20% 🟢

Projet B
  Actuel  : ████████████ 105%
  Budget  : ──────────| 100%
  Variance: +5% 🟡
```

**Section 3 : Forecast vs Actuel**

**Line & Forecast Chart :**
```
€M
12 │              ╱ Forecast
10 │          ╱───╱
 8 │      ╱───╱ Actuel
 6 │  ╱───╱
 4 │╱─╱
 2 │
 0 │
   └────────────────────→
    Q1   Q2   Q3   Q4
```

**Section 4 : ROI Analysis**

**Scatter Chart (Investment vs ROI) :**
```
ROI (%)
    ↑
200 │        ● Projet C
150 │    ●
100 │  ●     ● Projet A
 50 │ ● ●
  0 │● Projet B
    └─────────────────────→
      €500k  €1M  €2M
        Investment
```

---

### Dashboard #5 : Resource Management

**Objectif :** Gestion des ressources et capacités

**Section 1 : Allocation Globale**

**Stacked Bar Chart (par Département) :**
```
              Alloué  Disponible
Dev          : ████████░░ 80%
QA           : ██████░░░░ 60%
Ops          : ██████████ 100%
Architecture : ███████░░░ 70%
```

**Section 2 : Heatmap - Surchargés**

```
         | Semaine 1 | Semaine 2 | Semaine 3 | Semaine 4
─────────────────────────────────────────────────────────
Dev A    |    🟢     |    🟢     |    🟡     |    🔴
Dev B    |    🟡     |    🔴     |    🔴     |    🟡
QA A     |    🟢     |    🟢     |    🟢     |    🟢
Ops A    |    🟡     |    🟡     |    🟡     |    🟡
```

Légende :
- 🟢 < 80% occupé
- 🟡 80-100% occupé
- 🔴 > 100% occupé (surchargé)

**Section 3 : Skills Matrix**

```
Skills      | Dev | QA | Ops | Expert | Total
─────────────────────────────────────────────
React       | 12  | 0  | 0   | 3      | 15
Node.js     | 15  | 2  | 5   | 4      | 26
Azure       | 8   | 3  | 10  | 5      | 26
Power BI    | 2   | 1  | 0   | 2      | 5
```

**Section 4 : Turnover Analysis**

**Line Chart :**
```
Turnover %
    ↑
15% │              ●
12% │         ●───●
 9% │    ●───●
 6% │●───●
 3% │
 0% │
    └─────────────────────→
    Q1   Q2   Q3   Q4
```

---

## 🔌 5. Intégrations & API

### Intégration Jira

**Configuration Connector :**

```javascript
// Jira REST API Configuration
const jiraConfig = {
  host: 'https://your-domain.atlassian.net',
  apiVersion: '3',
  authentication: {
    type: 'basic',
    email: 'service@powalyze.com',
    apiToken: process.env.JIRA_API_TOKEN
  }
};

// Sync Projects
async function syncJiraProjects() {
  const projects = await jira.projects.getAllProjects();
  
  projects.forEach(async (project) => {
    await db.upsertProject({
      externalId: project.id,
      name: project.name,
      key: project.key,
      lead: project.lead.displayName,
      category: project.projectCategory.name,
      status: mapJiraStatus(project.status),
      lastSync: new Date()
    });
  });
}

// Sync Issues
async function syncJiraIssues(projectKey) {
  const issues = await jira.issueSearch.searchForIssuesUsingJql({
    jql: `project = ${projectKey} AND updated >= -7d`,
    fields: ['summary', 'status', 'assignee', 'priority']
  });
  
  issues.issues.forEach(async (issue) => {
    await db.upsertWorkItem({
      externalId: issue.id,
      projectKey: projectKey,
      type: issue.fields.issuetype.name,
      title: issue.fields.summary,
      status: issue.fields.status.name,
      assignee: issue.fields.assignee?.displayName,
      priority: issue.fields.priority.name,
      lastSync: new Date()
    });
  });
}
```

**Webhooks Jira → Powalyze :**

```javascript
// Webhook Handler
app.post('/webhooks/jira', async (req, res) => {
  const event = req.body;
  
  switch(event.webhookEvent) {
    case 'jira:issue_created':
      await handleIssueCreated(event.issue);
      break;
    
    case 'jira:issue_updated':
      await handleIssueUpdated(event.issue, event.changelog);
      break;
    
    case 'jira:issue_deleted':
      await handleIssueDeleted(event.issue);
      break;
    
    case 'project_created':
      await handleProjectCreated(event.project);
      break;
  }
  
  res.status(200).send('OK');
});

async function handleIssueUpdated(issue, changelog) {
  // Détecter changement de statut
  const statusChange = changelog.items.find(i => i.field === 'status');
  
  if (statusChange) {
    await notifications.send({
      type: 'status_change',
      issue: issue.key,
      from: statusChange.fromString,
      to: statusChange.toString,
      url: issue.self
    });
    
    // Refresh dashboard si projet critique
    if (issue.fields.priority.name === 'Critical') {
      await powerbi.refreshDataset('PMO-Dashboard');
    }
  }
}
```

---

### Intégration Azure DevOps

**Configuration Service Hook :**

```javascript
// Azure DevOps API Configuration
const adoConfig = {
  orgUrl: 'https://dev.azure.com/your-org',
  token: process.env.ADO_PAT,
  apiVersion: '7.0'
};

// Sync Build Pipelines
async function syncBuildPipelines(projectName) {
  const builds = await ado.builds.getBuilds(projectName, {
    minTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days
  });
  
  builds.forEach(async (build) => {
    await db.upsertBuild({
      externalId: build.id,
      projectName: projectName,
      buildNumber: build.buildNumber,
      status: build.status,
      result: build.result,
      startTime: build.startTime,
      finishTime: build.finishTime,
      requestedBy: build.requestedBy.displayName,
      sourceBranch: build.sourceBranch,
      codeCoverage: await getCodeCoverage(projectName, build.id)
    });
  });
}

// Sync Work Items
async function syncWorkItems(projectName) {
  const wiql = `
    SELECT [System.Id], [System.Title], [System.State]
    FROM WorkItems
    WHERE [System.TeamProject] = '${projectName}'
      AND [System.ChangedDate] >= @Today - 7
  `;
  
  const result = await ado.workItemTracking.queryByWiql({ query: wiql });
  
  result.workItems.forEach(async (wi) => {
    const details = await ado.workItemTracking.getWorkItem(wi.id);
    
    await db.upsertWorkItem({
      externalId: details.id,
      projectName: projectName,
      type: details.fields['System.WorkItemType'],
      title: details.fields['System.Title'],
      state: details.fields['System.State'],
      assignedTo: details.fields['System.AssignedTo']?.displayName,
      priority: details.fields['Microsoft.VSTS.Common.Priority'],
      storyPoints: details.fields['Microsoft.VSTS.Scheduling.StoryPoints']
    });
  });
}
```

---

### API REST Powalyze

**Endpoints Principaux :**

```
GET    /api/v1/projects                  # Liste des projets
GET    /api/v1/projects/:id               # Détail d'un projet
POST   /api/v1/projects                   # Créer un projet
PUT    /api/v1/projects/:id               # Modifier un projet
DELETE /api/v1/projects/:id               # Supprimer un projet

GET    /api/v1/kpis                       # KPIs globaux
GET    /api/v1/kpis/projects/:id          # KPIs d'un projet
POST   /api/v1/kpis                       # Créer des KPIs

GET    /api/v1/dashboards                 # Liste des dashboards
GET    /api/v1/dashboards/:id/embed       # Embed URL Power BI

GET    /api/v1/organizations              # Liste des organisations
GET    /api/v1/organizations/:id/projects # Projets d'une org

GET    /api/v1/risks                      # Liste des risques
POST   /api/v1/risks                      # Créer un risque
PUT    /api/v1/risks/:id                  # Modifier un risque

GET    /api/v1/resources                  # Liste des ressources
GET    /api/v1/resources/capacity         # Capacité globale

POST   /api/v1/sync/jira                  # Sync Jira
POST   /api/v1/sync/azure-devops          # Sync Azure DevOps
```

**Exemple d'Utilisation :**

```javascript
// Récupérer les KPIs d'un projet
const response = await fetch('https://api.powalyze.com/v1/kpis/projects/123', {
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  }
});

const kpis = await response.json();

console.log(kpis);
// {
//   projectId: 123,
//   healthScore: 85,
//   budgetSpent: 820000,
//   budgetTotal: 1000000,
//   budgetVariance: -18,
//   timelineVariance: -2,
//   criticalBugs: 1,
//   teamSatisfaction: 8.5,
//   status: 'On Track'
// }
```

---

## 🛡️ 6. Gouvernance des Données

### Politique de Sécurité

**1. Row-Level Security (RLS)**

Chaque utilisateur voit uniquement les données de son organisation :

```dax
-- Filtre RLS pour Organizations
[OrganizationID] = 
  LOOKUPVALUE(
    Users[OrganizationID],
    Users[Email],
    USERPRINCIPALNAME()
  )
```

**2. Roles & Permissions**

| Role | Accès Données | Dashboards | Admin |
|------|---------------|------------|-------|
| Executive | Toutes orgs | Executive Summary | Non |
| PMO Director | Toutes orgs | Tous | Oui |
| PM | Son org | Operations, Agile | Non |
| Team Member | Ses projets | Agile uniquement | Non |
| External Partner | Projets assignés | Aucun | Non |

**3. Audit Trail**

Toutes les actions sont loggées :

```sql
CREATE TABLE AuditLog (
  LogID INT PRIMARY KEY,
  UserEmail VARCHAR(255),
  Action VARCHAR(50),
  EntityType VARCHAR(50),
  EntityID INT,
  OldValue TEXT,
  NewValue TEXT,
  Timestamp DATETIME DEFAULT GETDATE(),
  IPAddress VARCHAR(45)
);

-- Trigger sur UPDATE Projects
CREATE TRIGGER TR_Projects_Audit
ON Projects
AFTER UPDATE
AS
BEGIN
  INSERT INTO AuditLog (UserEmail, Action, EntityType, EntityID, OldValue, NewValue)
  SELECT 
    SYSTEM_USER,
    'UPDATE',
    'Project',
    i.ProjectID,
    (SELECT * FROM DELETED d WHERE d.ProjectID = i.ProjectID FOR JSON AUTO),
    (SELECT * FROM INSERTED i WHERE i.ProjectID = i.ProjectID FOR JSON AUTO)
  FROM INSERTED i;
END;
```

---

### RGPD & Compliance

**1. Données Personnelles**

| Données | Type | Consentement | Durée Conservation |
|---------|------|--------------|-------------------|
| Email | Identité | Oui (SSO) | Pendant emploi |
| Nom, Prénom | Identité | Oui | Pendant emploi |
| Satisfaction | Sensible | Anonyme | 3 ans |
| Logs Activité | Technique | Implicite | 1 an |

**2. Droits RGPD**

```sql
-- Droit à l'oubli (GDPR Article 17)
CREATE PROCEDURE sp_DeleteUserData
  @UserEmail VARCHAR(255)
AS
BEGIN
  BEGIN TRANSACTION;
  
  -- Anonymiser les données dans les logs
  UPDATE AuditLog
  SET UserEmail = 'DELETED_USER_' + CAST(NEWID() AS VARCHAR(36))
  WHERE UserEmail = @UserEmail;
  
  -- Supprimer les données personnelles
  DELETE FROM Users WHERE Email = @UserEmail;
  
  -- Garder les contributions (anonymisées)
  UPDATE Projects
  SET CreatedBy = 'DELETED_USER'
  WHERE CreatedBy = @UserEmail;
  
  COMMIT TRANSACTION;
END;

-- Droit d'accès (GDPR Article 15)
CREATE PROCEDURE sp_ExportUserData
  @UserEmail VARCHAR(255)
AS
BEGIN
  -- Exporter toutes les données de l'utilisateur
  SELECT * FROM Users WHERE Email = @UserEmail FOR JSON AUTO;
  SELECT * FROM Projects WHERE CreatedBy = @UserEmail FOR JSON AUTO;
  SELECT * FROM AuditLog WHERE UserEmail = @UserEmail FOR JSON AUTO;
END;
```

---

## ⚡ 7. Performance & Optimisation

### Stratégies d'Optimisation

**1. Incremental Refresh**

```powerquery
// M Query - Incremental Refresh
let
  Source = Sql.Database("server.database.windows.net", "PMO"),
  RangeStart = DateTime.From(RangeStart),
  RangeEnd = DateTime.From(RangeEnd),
  FilteredRows = Table.SelectRows(Source, 
    each [UpdatedAt] >= RangeStart and [UpdatedAt] < RangeEnd
  )
in
  FilteredRows
```

Configuration Incremental Refresh :
- Archive : Dernières 2 années
- Refresh : Derniers 7 jours
- Fréquence : Toutes les 2 heures

**2. Aggregations**

```dax
-- Table d'Agrégation pour accélérer les requêtes
CREATE TABLE AggProjectKPIs
AS
  SUMMARIZE(
    FactKPI,
    Projects[ProjectID],
    Projects[Name],
    Organizations[Name],
    DimDate[Year],
    DimDate[Quarter],
    "TotalBudget", SUM(FactKPI[PlannedBudget]),
    "TotalSpent", SUM(FactKPI[ActualBudget]),
    "AvgHealthScore", AVERAGE(FactKPI[HealthScore]),
    "TotalFTE", SUM(FactKPI[ActualFTE])
  )
```

**3. DirectQuery vs Import**

| Mode | Use Case | Pros | Cons |
|------|----------|------|------|
| Import | < 1M rows | Très rapide | Refresh nécessaire |
| DirectQuery | > 10M rows | Toujours à jour | Plus lent |
| Composite | Mix | Best of both | Complexe |

**Recommendation :**
- FactKPI (historique) : Import avec Incremental Refresh
- DimProjects (current) : DirectQuery
- Aggregations : Import

**4. Query Folding**

```powerquery
// ✅ GOOD - Query Folding activé
let
  Source = Sql.Database("server", "db"),
  Filtered = Table.SelectRows(Source, each [Status] = "Active"),
  Sorted = Table.Sort(Filtered, {{"CreatedDate", Order.Descending}})
in
  Sorted

// ❌ BAD - Query Folding cassé
let
  Source = Sql.Database("server", "db"),
  AddedColumn = Table.AddColumn(Source, "Custom", each [A] + [B]), // Casse le folding
  Filtered = Table.SelectRows(AddedColumn, each [Status] = "Active")
in
  Filtered
```

---

### Monitoring Performance

**1. DAX Studio - Analyse des Requêtes**

```dax
-- Query Plan Analysis
EVALUATE
  SUMMARIZECOLUMNS(
    Projects[Name],
    "TotalBudget", [Total Budget],
    "HealthScore", [Avg Health Score]
  )
ORDER BY [TotalBudget] DESC
```

**Métriques à Surveiller :**
- Query Duration : < 3 secondes
- SE CPU Time : < 1 seconde
- Storage Engine Scans : Minimiser
- Formula Engine Time : < 500ms

**2. Monitoring Power BI Service**

```javascript
// API Power BI - Activity Logs
const activities = await powerbi.admin.getActivityEvents({
  startDateTime: '2024-12-01T00:00:00Z',
  endDateTime: '2024-12-23T23:59:59Z'
});

// Analyser les dashboards les plus utilisés
const dashboardUsage = activities
  .filter(a => a.Activity === 'ViewReport')
  .reduce((acc, a) => {
    acc[a.ReportId] = (acc[a.ReportId] || 0) + 1;
    return acc;
  }, {});

console.log('Top 5 Dashboards:', 
  Object.entries(dashboardUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
);
```

**3. Alertes Automatiques**

```javascript
// Azure Function - Check Query Performance
module.exports = async function (context, timer) {
  const slowQueries = await db.query(`
    SELECT 
      QueryText,
      AVG(DurationMs) as AvgDuration,
      COUNT(*) as ExecutionCount
    FROM QueryLogs
    WHERE Timestamp >= DATEADD(hour, -1, GETDATE())
    GROUP BY QueryText
    HAVING AVG(DurationMs) > 5000
  `);
  
  if (slowQueries.length > 0) {
    await notifications.sendAlert({
      type: 'performance',
      severity: 'warning',
      message: `${slowQueries.length} slow queries detected`,
      details: slowQueries
    });
  }
};
```

---

## 💼 8. Cas d'Usage Réels

### Cas #1 : Groupe Bancaire - 200+ Projets

**Contexte :**
- 250 projets actifs simultanément
- 15 workstreams (CRM, Paiements, Crédit, Risk, etc.)
- 500+ utilisateurs Power BI
- 50+ dashboards différents

**Architecture Déployée :**

```
Power BI Premium P2 (16 v-cores)
    │
    ├─→ Dataset "Projets" (Import, 5M rows)
    │   └─→ Incremental Refresh: 2 ans archive, 7 jours refresh
    │
    ├─→ Dataset "Budget" (DirectQuery, Azure Synapse)
    │   └─→ Agrégations mensuelles (Import)
    │
    ├─→ Dataset "Ressources" (Import, 50k rows)
    │
    └─→ Dataset "Risques" (DirectQuery, Azure SQL)
```

**Dashboards Principaux :**
1. Executive Summary (COMEX) - 10 users
2. PMO Operations - 25 users
3. Budget Tracking (Finance) - 15 users
4. Resource Management (HR) - 20 users
5. Agile Metrics (Scrum Masters) - 50 users
6. Project Drill-Down - 400+ PMs

**Résultats :**
- ✅ **-70% temps de reporting** (de 50h à 15h/mois)
- ✅ **+55% décisions data-driven**
- ✅ **100% visibilité temps réel**
- ✅ **0 downtime** depuis 18 mois
- ✅ **€2.5M économisés** (efficacité)

---

### Cas #2 : Assurance - FinOps Cloud

**Contexte :**
- Dépenses Azure : €15M/an
- 80 souscriptions Azure
- Aucune visibilité par département
- Sur-dimensionnement massif

**Solution :**

**1. Data Pipeline**

```
Azure Cost Management API
    │
    ↓ (Ingestion quotidienne)
Azure Data Factory
    │
    ↓ (Transformation)
Azure Synapse Analytics
    │
    ↓ (Semantic Model)
Power BI Premium
    │
    ↓ (Dashboards)
FinOps Dashboards
```

**2. Dashboards FinOps**

**Dashboard #1 : Cost Overview**
- Budget total : €15M
- Consommé : €9.8M (65%)
- Forecast : €14.2M (sous budget 🟢)
- Top 5 cost centers

**Dashboard #2 : Cost Optimization**
- Ressources orphelines : €450k/an
- Right-sizing recommendations : €1.2M/an
- Reserved Instances : €800k/an
- Auto-scaling : €300k/an
- **Total Savings Potential : €2.75M/an**

**Dashboard #3 : Showback/Chargeback**
- Coûts par département (15 depts)
- Coûts par application (120 apps)
- Coûts par environnement (Prod, Preprod, Dev)
- Coûts par tag (project, owner, cost-center)

**Résultats :**
- ✅ **-28% coûts cloud** (€4.2M/an)
- ✅ **100% visibilité** par département
- ✅ **0 dépassement budgétaire** depuis 10 mois
- ✅ **+90% adoption gouvernance**
- ✅ **Dashboards temps réel** (refresh 1h)

---

## 📞 Contacts & Support

**🎯 Sales & Démos**
- Email : sales@powalyze.com
- Démo Power BI : [powalyze.com/demo-powerbi](https://powalyze.com/demo-powerbi)

**🛠️ Support Technique**
- Email : support@powalyze.com
- Documentation : [docs.powalyze.com](https://docs.powalyze.com)
- SLA : < 2h pour P1

**📚 Formation Power BI**
- Email : training@powalyze.com
- Académie : [academy.powalyze.com/powerbi](https://academy.powalyze.com/powerbi)
- Certification : DAX Expert, Power BI Advanced

---

**📄 Document Confidentiel - Usage Interne et Clients Powalyze Uniquement**

**© Powalyze 2024 - Tous droits réservés**

---

*Ce guide fait 2.8 MB une fois converti en PDF avec screenshots et diagrammes.*
