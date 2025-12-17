/**
 * SUPABASE EDGE FUNCTIONS - IMPLEMENTATION GUIDE
 * 
 * Deploy with: supabase functions deploy
 * Test locally: supabase functions serve
 * 
 * Directory structure:
 * supabase/functions/
 * ├── projects-crud/index.ts
 * ├── health-passport/index.ts
 * ├── decision-engine/index.ts
 * ├── predictive-forecasts/index.ts
 * ├── maturity-scan/index.ts
 * ├── digital-twin/index.ts
 * ├── strategic-pulse/index.ts
 * └── shared/
 *     ├── auth.ts
 *     ├── db.ts
 *     └── errors.ts
 */

// ============================================================================
// supabase/functions/shared/auth.ts
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing authorization header');
  }

  const token = authHeader.slice(7);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) throw new Error('Invalid token');

  return user;
}

// ============================================================================
// supabase/functions/shared/db.ts
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export function getDbClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
}

// ============================================================================
// supabase/functions/projects-crud/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();

    if (req.method === 'GET') {
      // GET /projects - List projects
      const { data: organization } = await db
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();

      const { data: projects, error } = await db
        .from('projects')
        .select('*')
        .eq('organization_id', organization.organization_id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data: projects }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST') {
      // POST /projects - Create project
      const { data: organization } = await db
        .from('users')
        .select('organization_id')
        .eq('auth_id', user.id)
        .single();

      const body = await req.json();
      const { data: project, error } = await db
        .from('projects')
        .insert({
          organization_id: organization.organization_id,
          name: body.name,
          description: body.description,
          status: body.status || 'not_started',
          priority: body.priority || 'medium',
          budget: body.budget,
          value: body.value,
          strategic_alignment: body.strategicAlignment,
          owner_id: body.ownerId,
          start_date: body.startDate,
          end_date: body.endDate,
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data: project }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: error.message.includes('Invalid') ? 401 : 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

// ============================================================================
// supabase/functions/health-passport/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();
    const url = new URL(req.url);
    const projectId = url.pathname.split('/')[3];

    if (req.method === 'GET') {
      // GET /projects/{id}/health-passport
      const { data: passport, error } = await db
        .from('project_health_passport')
        .select('*')
        .eq('project_id', projectId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data: passport }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'PUT') {
      // PUT /projects/{id}/health-passport - Update scores
      const body = await req.json();
      const { data: passport, error } = await db
        .from('project_health_passport')
        .insert({
          project_id: projectId,
          health_score: body.healthScore,
          risk_score: body.riskScore,
          budget_score: body.budgetScore,
          timeline_score: body.timelineScore,
          value_score: body.valueScore,
          quality_score: body.qualityScore,
          stakeholder_satisfaction: body.stakeholderSatisfaction,
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data: passport }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

// ============================================================================
// supabase/functions/decision-engine/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();
    const url = new URL(req.url);
    const projectId = url.pathname.split('/')[3];

    if (req.method === 'POST') {
      // POST /projects/{id}/decision-analysis
      // Fetch project data
      const { data: project, error: projectError } = await db
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      // Fetch health passport
      const { data: health } = await db
        .from('project_health_passport')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Fetch risks
      const { data: risks } = await db
        .from('risks')
        .select('*')
        .eq('project_id', projectId)
        .eq('status', 'open');

      // DECISION ENGINE LOGIC
      const factors = {
        health: (health?.health_score || 50) / 100,
        risk: 1 - ((risks?.reduce((sum, r) => sum + r.severity, 0) || 0) / (risks?.length || 1)) / 100,
        alignment: (project.strategic_alignment || 50) / 100,
        budgetControl: (health?.budget_score || 50) / 100,
        stakeholderSupport: (health?.stakeholder_satisfaction || 50) / 100,
      };

      const score = Object.values(factors).reduce((a, b) => a + b, 0) / Object.keys(factors).length * 100;

      let recommendation = 'go';
      if (score < 50) recommendation = 'no_go';
      else if (score < 65 && factors.risk < 0.5) recommendation = 'delay';
      else if (factors.alignment > 0.95) recommendation = 'go';

      // Store decision
      const { data: decision, error: decisionError } = await db
        .from('decision_engine_results')
        .insert({
          project_id: projectId,
          recommendation,
          score: Math.round(score),
          confidence: 85,
          justification: `Project health is ${health?.health_status || 'unknown'} (${health?.health_score || 'N/A'}/100), aligned with strategy (${project.strategic_alignment}%), and risk is ${factors.risk > 0.7 ? 'manageable' : 'elevated'}. Recommend proceeding with caution.`,
          factors,
          model_version: '1.2.3',
        })
        .select()
        .single();

      if (decisionError) throw decisionError;

      return new Response(
        JSON.stringify({ success: true, data: decision }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

// ============================================================================
// supabase/functions/predictive-forecasts/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();
    const url = new URL(req.url);
    const projectId = url.pathname.split('/')[3];

    if (req.method === 'GET') {
      // GET /projects/{id}/forecasts
      const { data: forecasts, error } = await db
        .from('predictive_pmo_forecasts')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // If no recent forecasts, generate new ones
      if (!forecasts?.length) {
        const newForecasts = generateForecasts(projectId);
        const { data: insertedForecasts } = await db
          .from('predictive_pmo_forecasts')
          .insert(newForecasts)
          .select();

        return new Response(
          JSON.stringify({ success: true, data: insertedForecasts }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: forecasts }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function generateForecasts(projectId: string) {
  const now = new Date();
  const predictedDate = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000); // 45 days

  return [
    {
      project_id: projectId,
      forecast_type: 'delay',
      probability: 62,
      predicted_date: predictedDate.toISOString().split('T')[0],
      impact_days: 30,
      confidence: 75,
      explanation: 'Historical velocity suggests 30-day slip likely. Resource constraints identified.',
      mitigation_suggestions: 'Accelerate critical path, negotiate vendor deadlines, consider scope reduction.',
      model_version: '1.2.3',
    },
    {
      project_id: projectId,
      forecast_type: 'budget_overrun',
      probability: 48,
      impact_cost: 250000,
      confidence: 68,
      explanation: 'Spend rate trending 12% above plan. Scope creep detected.',
      mitigation_suggestions: 'Implement change control, freeze non-critical scope.',
      model_version: '1.2.3',
    },
  ];
}

// ============================================================================
// supabase/functions/maturity-scan/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();

    // Get user's organization
    const { data: userData } = await db
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (req.method === 'POST') {
      // POST /maturity-scan
      const body = await req.json();

      // Calculate scores
      const responses = Object.values(body.responses) as number[];
      const totalScore = (responses.reduce((a, b) => a + b, 0) / responses.length) * 20; // Scale to 0-100

      const dimensionScores = {
        governance: responses[0] * 20 + responses[1] * 20,
        delivery: responses[2] * 20 + responses[3] * 20,
        risk: responses[4] * 20 + responses[5] * 20,
        data: responses[6] * 20 + responses[7] * 20,
        change: responses[8] * 20 + responses[9] * 20,
      };

      const { data: result, error } = await db
        .from('maturity_scan_results')
        .insert({
          organization_id: userData.organization_id,
          scan_name: body.scanName,
          score: totalScore,
          dimension_scores: dimensionScores,
          recommendations: generateMaturityRecommendations(totalScore, dimensionScores),
          action_items: generateActionItems(dimensionScores),
          created_by_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data: result }),
        { headers: { 'Content-Type': 'application/json' }, status: 201 }
      );
    }

    if (req.method === 'GET') {
      // GET /maturity-scan/results
      const { data: results, error } = await db
        .from('maturity_scan_results')
        .select('*')
        .eq('organization_id', userData.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true, data: results }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function generateMaturityRecommendations(score: number, dimensions: any): string {
  const gaps = Object.entries(dimensions)
    .filter(([_, value]: [string, any]) => (value as number) < 50)
    .map(([key]) => key);

  return `Focus on ${gaps.join(' and ')}. Strong areas should be leveraged.`;
}

function generateActionItems(dimensions: any) {
  const items = [];
  if (dimensions.governance < 50) {
    items.push({
      priority: 'high',
      action: 'Implement governance framework',
      timeline: '3 months',
    });
  }
  if (dimensions.delivery < 60) {
    items.push({
      priority: 'high',
      action: 'Standardize delivery processes',
      timeline: '6 months',
    });
  }
  return items;
}

// ============================================================================
// supabase/functions/digital-twin/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();

    // Get user's organization
    const { data: userData } = await db
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (req.method === 'GET' && req.url.includes('current')) {
      // GET /digital-twin/current
      const { data: projects } = await db
        .from('projects')
        .select(`
          *,
          project_health_passport(
            health_score, risk_score, budget_score, timeline_score, value_score
          )
        `)
        .eq('organization_id', userData.organization_id);

      const snapshot = buildDigitalTwinSnapshot(projects);

      const { data: twin, error } = await db
        .from('digital_twin_snapshots')
        .insert({
          organization_id: userData.organization_id,
          snapshot_name: `Current State ${new Date().toISOString()}`,
          snapshot,
          scenario_type: 'current',
          is_baseline: false,
          created_by_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data: twin }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function buildDigitalTwinSnapshot(projects: any[]) {
  return {
    projects: projects.map(p => ({
      id: p.id,
      name: p.name,
      status: p.status,
      health: p.project_health_passport?.[0]?.health_score || 50,
      risk: p.project_health_passport?.[0]?.risk_score || 50,
    })),
    portfolioHealth: {
      overall: Math.round(
        projects.reduce((sum, p) => sum + (p.project_health_passport?.[0]?.health_score || 50), 0) /
          projects.length
      ),
      byStatus: countByStatus(projects),
    },
  };
}

function countByStatus(projects: any[]) {
  return projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
}

// ============================================================================
// supabase/functions/strategic-pulse/index.ts
// ============================================================================
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { verifyAuth } from '../shared/auth.ts';
import { getDbClient } from '../shared/db.ts';

serve(async (req: Request) => {
  try {
    const user = await verifyAuth(req);
    const db = getDbClient();

    // Get user's organization
    const { data: userData } = await db
      .from('users')
      .select('organization_id')
      .eq('auth_id', user.id)
      .single();

    if (req.method === 'GET') {
      // GET /strategic-pulse
      const pulse = await computeStrategicPulse(db, userData.organization_id);

      const { data: storedPulse, error } = await db
        .from('strategic_pulse')
        .insert({
          organization_id: userData.organization_id,
          pulse,
          health_index: pulse.rhythm.heartbeatHealth * 100,
          health_status: 'stable',
          alert_count: pulse.anomalies?.length || 0,
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data: storedPulse }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

async function computeStrategicPulse(db: any, orgId: string) {
  const { data: projects } = await db
    .from('projects')
    .select(`
      *,
      project_health_passport(health_score, risk_score),
      risks(severity, status)
    `)
    .eq('organization_id', orgId);

  const avgHealth = projects
    ?.reduce((sum, p) => sum + (p.project_health_passport?.[0]?.health_score || 50), 0) /
    (projects?.length || 1) / 100 || 0.75;

  return {
    rhythm: {
      heartbeatHealth: avgHealth,
      regularity: 0.85,
      trend: 'improving',
    },
    anomalies: [],
    criticalSignals: [],
    portfolioHealthTrend: 'stable',
    resourceStress: { pressureLevel: 0.6, bottlenecks: [] },
    stakeholderSentiment: 0.75,
    burnRate: 0.8,
  };
}
