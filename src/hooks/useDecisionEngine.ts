/**
 * Decision Engine Hook
 * 
 * Hook React pour interagir avec l'API Decision Engine
 */

import { useState, useEffect } from 'react';
import type { DecisionEngineResult, DecisionEngineParams } from '@/types/decisionEngine';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useDecisionEngine(params: DecisionEngineParams) {
  const [data, setData] = useState<DecisionEngineResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({
          tenant_id: params.tenant_id,
          timeframe: params.timeframe || 'current',
          max_recommendations: String(params.max_recommendations || 5)
        });

        if (params.project_id) {
          queryParams.append('project_id', params.project_id);
        }

        const response = await fetch(
          `${API_BASE_URL}/api/decision-engine/recommendations?${queryParams}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Decision Engine Error:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (params.tenant_id) {
      fetchRecommendations();
    }
  }, [params.tenant_id, params.timeframe, params.max_recommendations, params.project_id]);

  return { data, loading, error };
}

export async function getProjectRecommendations(
  tenant_id: string,
  project_id: string
): Promise<DecisionEngineResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/decision-engine/project/${project_id}?tenant_id=${tenant_id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
