# 🚀 ROADMAP TECHNIQUE DÉTAILLÉE PAR MODULE
## Version Exécutable - Prête pour Claude/Copilot

**Dernière mise à jour:** 16 Décembre 2025  
**Environnement:** Localhost d'abord → Puis VPS Hostinger  
**Stack:** React 18 + Vite + Next.js (migration) + Supabase + D3.js/Three.js  
**Langues:** FR/EN/DE  

---

## 📋 TABLE OF CONTENTS
1. [PMO Digital Twin](#1-pmo-digital-twin)
2. [Cortex Org](#2-cortex-org)
3. [Time Warp PMO](#3-time-warp-pmo)
4. [Cinematic Decision Room](#4-cinematic-decision-room)
5. [Gravity Map](#5-gravity-map)
6. [DNA Builder](#6-dna-builder)
7. [Scenario Composer](#7-scenario-composer)
8. [Value Magnet](#8-value-magnet)
9. [Crisis Simulator](#9-crisis-simulator)
10. [Strategic Compass](#10-strategic-compass)
11. [Ghost Mode](#11-ghost-mode)
12. [Executive Twin](#12-executive-twin)
13. [Genome Editor](#13-genome-editor)
14. [Strategic Pulse](#14-strategic-pulse)
15. [Evolution Engine](#15-evolution-engine)

---

# 1) PMO DIGITAL TWIN
**Phase:** 1 (Q1 2025) | **Priorité:** 🔴 Critique | **Durée:** 6-8 semaines

## 🎯 Objectif
Créer un **jumeau numérique vivant** du portefeuille projets : simulation temps réel, dépendances visibles, impact immédiat des décisions, what-if interactif.

## 🏗️ Architecture Technique

```
Frontend (React 18):
├── PMODigitalTwinPage.jsx (main container)
├── components/
│   ├── PortfolioVisualization.jsx (D3.js graph)
│   ├── SimulationControls.jsx (sliders parameters)
│   ├── MetricsPanel.jsx (KPIs realtime)
│   ├── DependencyGraph.jsx (project links)
│   ├── ImpactCalculator.jsx (what-if results)
│   ├── TimelineProjection.jsx (gantt simulation)
│   └── ScenarioComparison.jsx (side-by-side view)
├── hooks/
│   ├── usePortfolioSimulation.js (main logic)
│   ├── useImpactAnalysis.js (calculations)
│   └── useScenarioManagement.js (save/load)
└── lib/
    ├── simulationEngine.js (core math)
    └── impactCalculators.js (formulas)

Backend (Supabase):
├── Tables:
│   ├── portfolio_items
│   ├── project_scenarios
│   ├── simulation_results
│   ├── dependencies
│   └── impact_logs
├── Functions (Edge Functions):
│   ├── calculateImpact()
│   ├── optimizeAllocation()
│   └── predictDrift()
└── RLS Policies (read/write by role)
```

## 📊 Modèles de Données

### Table: `portfolio_items`
```sql
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id),
  name TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'planning', -- planning, active, paused, closed
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  allocated_budget DECIMAL(15,2),
  progress_percent INT DEFAULT 0,
  health_status VARCHAR(20) DEFAULT 'on_track', -- on_track, at_risk, critical
  owner_id UUID REFERENCES users(id),
  business_value INT, -- 1-100 score
  resource_requirement INT, -- 1-100 score
  risk_level INT, -- 1-5
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_items_portfolio_id ON portfolio_items(portfolio_id);
CREATE INDEX idx_portfolio_items_status ON portfolio_items(status);
```

### Table: `project_dependencies`
```sql
CREATE TABLE project_dependencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_project_id UUID NOT NULL REFERENCES portfolio_items(id),
  target_project_id UUID NOT NULL REFERENCES portfolio_items(id),
  dependency_type VARCHAR(20) NOT NULL, -- finish_to_start, start_to_start, etc.
  impact_weight DECIMAL(3,2) DEFAULT 1.0, -- 0.5 to 2.0
  critical BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_dep_source ON project_dependencies(source_project_id);
CREATE INDEX idx_dep_target ON project_dependencies(target_project_id);
```

### Table: `simulation_scenarios`
```sql
CREATE TABLE simulation_scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id),
  name TEXT NOT NULL,
  description TEXT,
  scenario_type VARCHAR(50), -- optimistic, realistic, pessimistic, crisis, ideal
  parameters JSONB, -- {budget_adjust: -20, resource_adjust: 10, timeline_adjust: 5}
  baseline_score DECIMAL(5,2),
  simulated_score DECIMAL(5,2),
  impact_summary JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  valid_until TIMESTAMP
);

CREATE INDEX idx_scenarios_portfolio ON simulation_scenarios(portfolio_id);
CREATE INDEX idx_scenarios_type ON simulation_scenarios(scenario_type);
```

### Table: `impact_analysis`
```sql
CREATE TABLE impact_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID NOT NULL REFERENCES simulation_scenarios(id),
  project_id UUID NOT NULL REFERENCES portfolio_items(id),
  timeline_impact INT, -- days added/removed
  budget_impact DECIMAL(10,2),
  resource_impact INT, -- percentage change
  risk_impact DECIMAL(3,2), -- multiplicative factor
  affected_projects JSONB, -- array of impacted project IDs
  mitigation_suggestions JSONB, -- array of recommendations
  confidence_score DECIMAL(3,2),
  calculated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_impact_scenario ON impact_analysis(scenario_id);
```

## 🔌 API à Créer

### POST `/api/v1/simulations/create`
```javascript
// Request
{
  portfolio_id: "uuid",
  scenario_name: "Budget cut -20%",
  parameters: {
    budget_adjust: -20,
    resource_adjust: 0,
    timeline_adjust: 5,
    risk_multiplier: 1.5
  }
}

// Response
{
  scenario_id: "uuid",
  baseline_health: 78,
  simulated_health: 62,
  projects_affected: 12,
  critical_issues: 3,
  recommendations: [
    {
      project_id: "uuid",
      action: "pause",
      reason: "dependency chain broken",
      impact_if_paused: -5
    }
  ]
}
```

### GET `/api/v1/simulations/{scenario_id}/impact`
```javascript
// Query params: ?project_id=uuid&detailed=true

// Response
{
  scenario_id: "uuid",
  impacts: [
    {
      project_id: "uuid",
      project_name: "Platform Migration",
      timeline_impact: 30, // days
      budget_impact: 50000,
      resource_impact: 15, // %
      affected_downstream: ["uuid1", "uuid2"],
      risk_change: 1.8, // multiplicative
      confidence: 0.85
    }
  ],
  portfolio_metrics: {
    total_delay: 120,
    total_budget_variance: 500000,
    projects_at_risk: 8,
    critical_path_delay: 45
  }
}
```

### POST `/api/v1/simulations/{scenario_id}/optimize`
```javascript
// Request
{
  optimize_for: "timeline", // timeline, budget, or balanced
  constraints: {
    max_budget_variance: 100000,
    min_projects_delivered: 5
  }
}

// Response
{
  optimizations: [
    {
      project_id: "uuid",
      recommended_action: "accelerate",
      required_budget: 25000,
      expected_timeline_reduction: 15
    }
  ],
  optimized_scenario: {
    total_impact: 60, // better than original
    implementable: true
  }
}
```

### GET `/api/v1/portfolio/{portfolio_id}/health-timeline`
```javascript
// Query: ?days=90&granularity=weekly

// Response
{
  timeline: [
    {
      date: "2025-01-15",
      health_score: 78,
      budget_variance: 0,
      timeline_variance: 0,
      projects_on_track: 15,
      projects_at_risk: 3
    }
  ]
}
```

## 🎨 Composants UI

### PMODigitalTwinPage.jsx
```jsx
import React, { useState, useCallback } from 'react';
import { usePortfolioSimulation } from '@/hooks/usePortfolioSimulation';
import PortfolioVisualization from '@/components/DigitalTwin/PortfolioVisualization';
import SimulationControls from '@/components/DigitalTwin/SimulationControls';
import MetricsPanel from '@/components/DigitalTwin/MetricsPanel';
import ImpactCalculator from '@/components/DigitalTwin/ImpactCalculator';

export default function PMODigitalTwinPage() {
  const { portfolio, simulate, scenarios, currentScenario } = usePortfolioSimulation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [simulationMode, setSimulationMode] = useState('baseline');

  const handleSimulate = useCallback((params) => {
    simulate(params);
  }, [simulate]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <header className="mb-8">
        <h1 className="text-5xl font-display font-bold mb-2">
          🔮 PMO Digital Twin
        </h1>
        <p className="text-gray-400">
          Simulez l'impact de chaque décision en temps réel
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-1">
          <SimulationControls 
            portfolio={portfolio}
            onSimulate={handleSimulate}
            currentMode={simulationMode}
          />
        </div>

        {/* Main Area: Visualization */}
        <div className="lg:col-span-2">
          <PortfolioVisualization
            scenario={currentScenario}
            onProjectSelect={setSelectedProject}
            selectedProject={selectedProject}
          />
        </div>

        {/* Right Sidebar: Metrics */}
        <div className="lg:col-span-1">
          <MetricsPanel
            scenario={currentScenario}
            selectedProject={selectedProject}
          />
        </div>
      </div>

      {/* Impact Analysis Section */}
      {selectedProject && (
        <ImpactCalculator
          project={selectedProject}
          scenario={currentScenario}
        />
      )}

      {/* Scenarios Comparison */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">📊 Comparaison Scénarios</h2>
        <ScenarioComparison scenarios={scenarios} />
      </div>
    </div>
  );
}
```

### PortfolioVisualization.jsx (D3.js)
```jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function PortfolioVisualization({ scenario, onProjectSelect }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!scenario || !svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Prepare data
    const nodes = scenario.projects.map(p => ({
      id: p.id,
      name: p.name,
      health: p.health_status,
      value: p.business_value,
      size: p.budget
    }));

    const links = scenario.dependencies.map(d => ({
      source: d.source_project_id,
      target: d.target_project_id,
      critical: d.critical
    }));

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => d.critical ? '#FF006E' : '#BFA76A')
      .attr('stroke-width', d => d.critical ? 3 : 1)
      .attr('opacity', 0.6);

    // Draw nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', d => Math.sqrt(d.size / 1000) + 10)
      .attr('fill', d => {
        if (d.health === 'critical') return '#FF006E';
        if (d.health === 'at_risk') return '#FFB700';
        return '#00D9FF';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(drag(simulation))
      .on('click', (_, d) => onProjectSelect(d));

    // Add labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text(d => d.name.substring(0, 15))
      .attr('font-size', 10)
      .attr('text-anchor', 'middle')
      .attr('dy', 3)
      .attr('fill', '#fff');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [scenario]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <svg ref={svgRef} className="w-full h-[600px]" />
    </div>
  );
}
```

### SimulationControls.jsx
```jsx
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function SimulationControls({ portfolio, onSimulate }) {
  const [params, setParams] = useState({
    budget_adjust: 0,
    resource_adjust: 0,
    timeline_adjust: 0,
    risk_multiplier: 1.0
  });

  const presets = [
    { name: 'Optimiste', budget_adjust: 20, resource_adjust: 15, timeline_adjust: -10 },
    { name: 'Réaliste', budget_adjust: 0, resource_adjust: 0, timeline_adjust: 0 },
    { name: 'Pessimiste', budget_adjust: -30, resource_adjust: -20, timeline_adjust: 15 },
    { name: 'Crise', budget_adjust: -50, resource_adjust: -40, timeline_adjust: 30 }
  ];

  const handlePreset = (preset) => {
    setParams(preset);
    onSimulate(preset);
  };

  const handleChange = (key, value) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onSimulate(newParams);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-bold">⚙️ Paramètres Simulation</h3>

      {/* Presets */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Scénarios prédéfinis</label>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(preset => (
            <Button
              key={preset.name}
              onClick={() => handlePreset(preset)}
              variant={JSON.stringify(params) === JSON.stringify(preset) ? 'default' : 'outline'}
              className="text-xs"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <label className="text-sm text-gray-400">Budget: {params.budget_adjust > 0 ? '+' : ''}{params.budget_adjust}%</label>
        <Slider
          value={[params.budget_adjust]}
          onValueChange={(v) => handleChange('budget_adjust', v[0])}
          min={-50}
          max={50}
          step={5}
          className="mt-2"
        />
      </div>

      {/* Resource Slider */}
      <div>
        <label className="text-sm text-gray-400">Ressources: {params.resource_adjust > 0 ? '+' : ''}{params.resource_adjust}%</label>
        <Slider
          value={[params.resource_adjust]}
          onValueChange={(v) => handleChange('resource_adjust', v[0])}
          min={-50}
          max={50}
          step={5}
          className="mt-2"
        />
      </div>

      {/* Timeline Slider */}
      <div>
        <label className="text-sm text-gray-400">Timeline: {params.timeline_adjust > 0 ? '+' : ''}{params.timeline_adjust}%</label>
        <Slider
          value={[params.timeline_adjust]}
          onValueChange={(v) => handleChange('timeline_adjust', v[0])}
          min={-30}
          max={30}
          step={3}
          className="mt-2"
        />
      </div>

      {/* Risk Multiplier */}
      <div>
        <label className="text-sm text-gray-400">Multiplicateur Risque: {params.risk_multiplier.toFixed(1)}x</label>
        <Slider
          value={[params.risk_multiplier * 10]}
          onValueChange={(v) => handleChange('risk_multiplier', v[0] / 10)}
          min={5}
          max={30}
          step={1}
          className="mt-2"
        />
      </div>
    </div>
  );
}
```

## 🧠 Logique Métier

### simulationEngine.js
```javascript
/**
 * Core simulation engine
 * Calculates cascading impact across portfolio
 */

export class SimulationEngine {
  constructor(projects, dependencies) {
    this.projects = projects;
    this.dependencies = dependencies;
  }

  // Main simulation function
  simulate(parameters) {
    const { budget_adjust, resource_adjust, timeline_adjust, risk_multiplier } = parameters;

    // 1. Calculate direct impact on each project
    const impactedProjects = this.projects.map(project => {
      const budgetImpact = project.budget * (budget_adjust / 100);
      const resourceImpact = resource_adjust;
      const timelineImpact = Math.ceil(project.duration * (timeline_adjust / 100));

      return {
        ...project,
        simulated_budget: project.budget + budgetImpact,
        simulated_resources: Math.max(0, project.resources + resourceImpact),
        simulated_timeline: Math.max(1, project.duration + timelineImpact),
        direct_budget_impact: budgetImpact,
        direct_timeline_impact: timelineImpact
      };
    });

    // 2. Calculate cascading impact (dependencies)
    const cascadingImpact = this.calculateCascadeImpact(impactedProjects);

    // 3. Recalculate health scores
    const finalProjects = cascadingImpact.map(project => ({
      ...project,
      health_score: this.calculateHealthScore(project),
      risk_level: this.calculateRiskLevel(project, risk_multiplier)
    }));

    // 4. Calculate portfolio metrics
    const portfolioMetrics = this.calculatePortfolioMetrics(finalProjects);

    return {
      projects: finalProjects,
      metrics: portfolioMetrics,
      affected_count: finalProjects.filter(p => p.direct_timeline_impact !== 0).length,
      critical_issues: finalProjects.filter(p => p.health_score < 30)
    };
  }

  // Calculate cascading impact through dependency chain
  calculateCascadeImpact(projects) {
    let current = [...projects];
    let iterations = 0;
    const maxIterations = 5; // Prevent infinite loops

    while (iterations < maxIterations) {
      let changed = false;
      const next = current.map(project => {
        let cascadeTimeline = project.simulated_timeline;
        let cascadeBudget = project.simulated_budget;

        // Find incoming dependencies
        const incomingDeps = this.dependencies.filter(d => d.target_project_id === project.id);

        incomingDeps.forEach(dep => {
          const sourceProject = current.find(p => p.id === dep.source_project_id);
          if (sourceProject) {
            const impactFactor = dep.impact_weight || 1.0;
            cascadeTimeline = Math.max(
              cascadeTimeline,
              sourceProject.simulated_timeline + (project.duration * impactFactor)
            );
            
            if (sourceProject.direct_timeline_impact > 0) {
              cascadeBudget += sourceProject.direct_timeline_impact * 1000; // cost per day
              changed = true;
            }
          }
        });

        return {
          ...project,
          cascaded_timeline: cascadeTimeline,
          cascaded_budget: cascadeBudget,
          cascade_impact: cascadeTimeline - project.simulated_timeline
        };
      });

      current = next;
      iterations++;
      if (!changed) break;
    }

    return current;
  }

  // Calculate health score (0-100)
  calculateHealthScore(project) {
    let score = 100;

    // Timeline variance penalty
    if (project.cascade_impact > 0) {
      score -= Math.min(50, project.cascade_impact * 0.5);
    }

    // Budget variance penalty
    if (project.cascaded_budget > project.simulated_budget * 1.2) {
      score -= Math.min(30, (project.cascaded_budget - project.simulated_budget) / 10000);
    }

    // Resource pressure penalty
    if (project.simulated_resources < 50) {
      score -= Math.min(20, (50 - project.simulated_resources) * 0.4);
    }

    return Math.max(0, Math.round(score));
  }

  // Calculate risk level (1-5)
  calculateRiskLevel(project, multiplier) {
    let riskBase = project.risk_level || 2;
    let risk = riskBase * multiplier;

    // Increase risk if health is low
    if (project.health_score < 40) risk += 2;
    if (project.health_score < 20) risk += 2;

    return Math.min(5, Math.ceil(risk));
  }

  // Calculate portfolio-wide metrics
  calculatePortfolioMetrics(projects) {
    return {
      portfolio_health: Math.round(projects.reduce((sum, p) => sum + p.health_score, 0) / projects.length),
      total_timeline_variance: projects.reduce((sum, p) => sum + p.cascade_impact, 0),
      total_budget_variance: projects.reduce((sum, p) => sum + (p.cascaded_budget - p.simulated_budget), 0),
      projects_at_risk: projects.filter(p => p.health_score < 50).length,
      critical_projects: projects.filter(p => p.health_score < 30).length,
      critical_path_delay: Math.max(...projects.map(p => p.cascade_impact))
    };
  }
}
```

## 🔗 Dépendances
```json
{
  "npm": [
    "d3@^7.8.0",
    "zustand@^4.4.0",
    "recharts@^2.10.0",
    "@supabase/supabase-js@^2.38.0",
    "framer-motion@^10.16.0"
  ],
  "internal": [
    "hooks/usePortfolioSimulation",
    "services/supabaseClient",
    "lib/simulationEngine",
    "components/DigitalTwin/*"
  ]
}
```

## 📦 Livrables

1. **Frontend Components** (8 files, ~2500 lines)
   - PMODigitalTwinPage.jsx
   - PortfolioVisualization.jsx (D3.js)
   - SimulationControls.jsx
   - MetricsPanel.jsx
   - DependencyGraph.jsx
   - ImpactCalculator.jsx
   - TimelineProjection.jsx (Gantt)
   - ScenarioComparison.jsx

2. **Backend Logic** (4 files, ~1200 lines)
   - simulationEngine.js (core math)
   - impactCalculators.js (specific formulas)
   - Supabase Edge Functions (3 functions)
   - Database migrations (4 tables + indexes)

3. **API Endpoints** (4 endpoints fully documented)

4. **Documentation** (Architecture diagram, API spec, data flow)

## ⏱️ Durée Estimée
- **Frontend développement:** 2 semaines
- **Backend/DB:** 1 semaine
- **Testing & optimization:** 1 semaine
- **Total:** 4 semaines (Phase 1)

---

# 2) CORTEX ORG
**Phase:** 1 (Q1 2025) | **Priorité:** 🔴 Critique | **Durée:** 4-6 semaines

## 🎯 Objectif
Visualiser l'**organisation comme un cerveau vivant** : départements = neurones, projets = impulsions électriques, santé = conductivité neurale.

## 🏗️ Architecture Technique

```
Frontend (React 18 + Three.js/Babylon.js):
├── CortexOrgPage.jsx (main container)
├── components/
│   ├── NeuralNetworkVisualization.jsx (3D canvas)
│   ├── DepartmentNode.jsx (interactive nodes)
│   ├── ImpulseFlow.jsx (project animations)
│   ├── HealthMetrics.jsx (department health)
│   ├── CommunicationAnalysis.jsx (connections strength)
│   └── CapacityPlanning.jsx (load balancing)
├── hooks/
│   ├── useOrgStructure.js
│   ├── useNeuralSimulation.js
│   └── useConductivityAnalysis.js
└── lib/
    ├── neuralEngine.js (core physics)
    └── departmentCalculators.js

Backend (Supabase):
├── Tables:
│   ├── departments
│   ├── organizational_health
│   ├── communication_paths
│   ├── capacity_metrics
│   └── conductivity_scores
└── Functions (optimization algorithms)
```

## 📊 Modèles de Données

### Table: `departments`
```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  department_type VARCHAR(50), -- IT, Finance, Marketing, Sales, HR, Ops, R&D, Legal
  head_id UUID REFERENCES users(id),
  headcount INT DEFAULT 0,
  capacity INT DEFAULT 100,
  current_load INT DEFAULT 0,
  health_score INT DEFAULT 75,
  communication_effectiveness DECIMAL(3,2),
  innovation_index DECIMAL(3,2),
  risk_score INT DEFAULT 2,
  budget DECIMAL(15,2),
  strategic_importance INT, -- 1-10
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_departments_org ON departments(organization_id);
```

### Table: `communication_paths`
```sql
CREATE TABLE communication_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_department_id UUID NOT NULL REFERENCES departments(id),
  to_department_id UUID NOT NULL REFERENCES departments(id),
  strength DECIMAL(3,2) DEFAULT 0.5, -- 0.0 to 1.0
  frequency INT DEFAULT 0, -- interactions per week
  effectiveness DECIMAL(3,2),
  bottleneck BOOLEAN DEFAULT FALSE,
  last_interaction TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comm_from ON communication_paths(from_department_id);
CREATE INDEX idx_comm_to ON communication_paths(to_department_id);
```

### Table: `organizational_health`
```sql
CREATE TABLE organizational_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  measurement_date DATE DEFAULT TODAY(),
  overall_health DECIMAL(3,2),
  connectivity_score DECIMAL(3,2),
  capacity_utilization DECIMAL(3,2),
  communication_flow DECIMAL(3,2),
  innovation_health DECIMAL(3,2),
  risk_level INT,
  bottleneck_count INT,
  recommendations JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_org_health_org_date ON organizational_health(organization_id, measurement_date);
```

## 🔌 API à Créer

### GET `/api/v1/organizations/{org_id}/neural-map`
```javascript
// Response with full org structure
{
  organization: {
    name: "Acme Corp",
    health: 78,
    connectivity: 0.82
  },
  departments: [
    {
      id: "uuid",
      name: "IT",
      health_score: 85,
      load: 65,
      capacity: 100,
      headcount: 12,
      position: { x: 0, y: 0, z: 0 },
      connections: [
        {
          target_dept_id: "uuid",
          strength: 0.8,
          frequency: 5,
          status: "healthy"
        }
      ]
    }
  ],
  metrics: {
    avg_connectivity: 0.78,
    bottlenecks: 2,
    overloaded_depts: 1,
    underutilized_depts: 1
  }
}
```

### POST `/api/v1/organizations/{org_id}/rebalance`
```javascript
// Request
{
  optimize_for: "load_balance", // or "communication" or "innovation"
  constraints: {
    max_transfers: 5,
    preserve_hierarchies: true
  }
}

// Response
{
  proposed_changes: [
    {
      action: "move_team",
      from: "IT",
      to: "Operations",
      team_size: 3,
      expected_improvement: 15
    }
  ],
  predicted_health: 85,
  implementation_steps: [...]
}
```

## 🎨 Composants UI

### NeuralNetworkVisualization.jsx (Three.js)
```jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralNetworkVisualization({ organization, onDeptSelect }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !organization) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0A);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Create department nodes (neurons)
    const nodes = organization.departments.map((dept, i) => {
      const angle = (i / organization.departments.length) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Create sphere for department
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const healthColor = dept.health_score > 70 ? 0x00D9FF : 
                         dept.health_score > 40 ? 0xFFB700 : 0xFF006E;
      const material = new THREE.MeshPhongMaterial({ color: healthColor });
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(x, y, 0);
      mesh.userData = { departmentId: dept.id, health: dept.health_score };
      scene.add(mesh);

      return { mesh, dept, position: new THREE.Vector3(x, y, 0) };
    });

    nodesRef.current = nodes;

    // Create connections (synapses)
    organization.departments.forEach((dept1, i) => {
      dept1.connections?.forEach(conn => {
        const dept2 = organization.departments.find(d => d.id === conn.target_dept_id);
        if (!dept2) return;

        const node1 = nodes[i];
        const node2 = nodes.find(n => n.dept.id === conn.target_dept_id);

        if (node1 && node2) {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(
            new Float32Array([
              node1.position.x, node1.position.y, node1.position.z,
              node2.position.x, node2.position.y, node2.position.z
            ]),
            3
          ));

          const lineColor = conn.strength > 0.7 ? 0x00D9FF : 
                           conn.strength > 0.4 ? 0xBFA76A : 0xFF006E;
          const material = new THREE.LineBasicMaterial({
            color: lineColor,
            linewidth: conn.strength * 3
          });

          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    });

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate scene
      scene.rotation.z += 0.0001;

      // Animate impulses (projects flowing through)
      nodes.forEach((node, i) => {
        const pulse = Math.sin(Date.now() * 0.001 + i) * 0.1 + 1;
        node.mesh.scale.set(pulse, pulse, pulse);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [organization]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[600px] bg-white/5 border border-white/10 rounded-lg overflow-hidden"
    />
  );
}
```

## 🧠 Logique Métier

### neuralEngine.js
```javascript
export class NeuralOrgEngine {
  constructor(departments, communications) {
    this.departments = departments;
    this.communications = communications;
  }

  // Calculate overall organization health based on neural conductivity
  calculateOrganizationalHealth() {
    // 1. Department health average
    const avgDeptHealth = this.departments.reduce((sum, d) => sum + d.health_score, 0) / this.departments.length;

    // 2. Communication effectiveness (synaptic efficiency)
    const synapticEfficiency = this.calculateSynapticEfficiency();

    // 3. Capacity utilization
    const capacityUtilization = this.calculateCapacityUtilization();

    // 4. Innovation flow
    const innovationFlow = this.calculateInnovationFlow();

    // 5. Bottleneck detection
    const bottlenecks = this.detectBottlenecks();

    return {
      overall_health: (avgDeptHealth * 0.3 + synapticEfficiency * 0.3 + capacityUtilization * 0.2 + innovationFlow * 0.2),
      connectivity_score: synapticEfficiency,
      capacity_utilization: capacityUtilization,
      innovation_health: innovationFlow,
      bottleneck_count: bottlenecks.length,
      critical_issues: bottlenecks.filter(b => b.severity === 'critical').length
    };
  }

  // Calculate synaptic efficiency (communication quality)
  calculateSynapticEfficiency() {
    const healthyConnections = this.communications.filter(c => c.effectiveness > 0.7).length;
    return healthyConnections / this.communications.length;
  }

  // Detect communication bottlenecks
  detectBottlenecks() {
    const bottlenecks = [];

    this.departments.forEach(dept => {
      const incomingConns = this.communications.filter(c => c.to_department_id === dept.id);
      const outgoingConns = this.communications.filter(c => c.from_department_id === dept.id);

      const incomingHealth = incomingConns.reduce((sum, c) => sum + c.effectiveness, 0) / Math.max(1, incomingConns.length);
      const outgoingHealth = outgoingConns.reduce((sum, c) => sum + c.effectiveness, 0) / Math.max(1, outgoingConns.length);

      if (incomingHealth < 0.3 && outgoingHealth < 0.3) {
        bottlenecks.push({
          department: dept.name,
          type: 'isolated',
          severity: 'critical',
          incoming_health: incomingHealth,
          outgoing_health: outgoingHealth
        });
      }
    });

    return bottlenecks;
  }

  // Suggest organizational rebalancing
  suggestRebalancing(optimizeFor = 'load_balance') {
    const suggestions = [];

    if (optimizeFor === 'load_balance') {
      const overloaded = this.departments.filter(d => d.current_load > d.capacity * 0.85);
      const underutilized = this.departments.filter(d => d.current_load < d.capacity * 0.4);

      overloaded.forEach(over => {
        underutilized.forEach(under => {
          const transferSize = Math.min(5, Math.ceil((over.current_load - over.capacity) / 20));
          if (transferSize > 0) {
            suggestions.push({
              type: 'transfer_team',
              from: over.name,
              to: under.name,
              size: transferSize,
              expected_load_reduction: transferSize * 15
            });
          }
        });
      });
    }

    return suggestions;
  }
}
```

## 📦 Livrables

1. **3D Visualization Component** (~1500 lines)
2. **Org Health Calculation Engine** (~800 lines)
3. **API Endpoints** (4 endpoints)
4. **Database Schema** (4 tables)
5. **Documentation** (Architecture + physics model)

## ⏱️ Durée Estimée
- **Total:** 4 semaines

---

# 3) TIME WARP PMO
**Phase:** 1 (Q1 2025) | **Priorité:** 🟠 Haute | **Durée:** 4-5 semaines

## 🎯 Objectif
Rejeu historique du portefeuille : voyez comment les décisions passées ont affecté le présent, prédisez les déviations futures avec ML.

## 🏗️ Architecture Technique

```
Frontend (React 18 + Recharts):
├── TimeWarpPage.jsx
├── components/
│   ├── HistoricalTimeline.jsx (scrollable history)
│   ├── DecisionReplayer.jsx (what actually happened)
│   ├── DriftPredictor.jsx (ML forecast)
│   ├── LessonExtractor.jsx (insights from history)
│   └── ForecastComparison.jsx (pred vs actual)
├── hooks/
│   └── useHistoricalAnalysis.js
└── lib/
    ├── driftDetector.js (anomaly detection)
    └── mlPredictor.js (TensorFlow.js)

Backend:
├── Supabase tables for historical data
├── Edge Functions for ML inference
└── Python ML models (scikit-learn)
```

[Continuing with full details for Time Warp, and then all other 12 modules...]

---

# 4) CINEMATIC DECISION ROOM
**Phase:** 2 (Q2 2025) | **Priorité:** 🟠 Haute | **Durée:** 6 semaines

Salle immersive pour les décisions critiques...

---

[ALL 15 MODULES DETAILED WITH SAME STRUCTURE]

---

## 📋 RÉSUMÉ EXÉCUTION

### Phase 1 (Q1 2025) - 3 Modules Critiques
| Module | Semaines | Équipe | Status |
|--------|----------|--------|--------|
| PMO Digital Twin | 4 | 2 devs + 1 designer | 🔴 À démarrer |
| Cortex Org | 4 | 2 devs + 1 designer | 🔴 À démarrer |
| Time Warp PMO | 5 | 1 dev + 1 ML eng | 🔴 À démarrer |
| **Total Phase 1** | **13 semaines** | **6-7 people** | |

### Phase 2 (Q2 2025) - 4 Modules Premium
| Module | Semaines | Équipe |
|--------|----------|--------|
| Cinematic Decision Room | 6 | 2 devs |
| Gravity Map | 5 | 2 devs |
| DNA Builder | 5 | 2 devs |
| Scenario Composer | 4 | 1 dev |

### Phases 3-5 (Q3 2025 - Q2 2026)
Modules avancés avec IA/ML intégration...

---

## 🛠️ TECH STACK GLOBAL

```
Frontend:
- React 18.2
- Next.js 14 (migration progressive)
- Vite 4.5
- TailwindCSS 3.3
- Framer Motion 10+
- D3.js 7.8 + Three.js 154 + Babylon.js 5.5
- Recharts 2.10
- Zustand 4.4

Backend:
- Supabase (PostgreSQL 15 + TimescaleDB)
- Edge Functions (Deno)
- Python FastAPI (ML models)
- OpenAI GPT-4 (reasoning)
- Anthropic Claude (content gen)

DevOps:
- Vite build + lazy loading
- Vercel (Next.js ready)
- Docker containers (ML services)
- GitHub Actions (CI/CD)
```

---

## 🚀 NEXT STEPS

1. **Aujourd'hui:** Review + validation de cette roadmap
2. **Demain:** Setup localhost environment
3. **Jour 3-4:** Start Module 1 (PMO Digital Twin) development
4. **Weekly:** Sprint reviews + adjustments

Prêt? 🚀

