import { useEffect, useState } from "react";
import { supabase } from "../lib/customSupabaseClient";
import { getCockpitDemoData, calculateRealCockpitData } from "../lib/cockpitDemoData";
import logger from "../lib/logger";

/**
 * Hook pour charger les données du Cockpit PMO
 * - Tente de charger données réelles depuis Supabase
 * - Active automatiquement le mode démo si tables manquantes
 * - Calcule métriques réelles depuis initiatives si disponibles
 * 
 * @param {string} orgId - ID de l'organisation
 * @returns {Object} { data, loading, isDemoMode }
 */
export function useCockpitData(orgId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    async function load() {
      if (!orgId) {
        setLoading(false);
        return;
      }

      try {
        // Tenter de charger initiatives réelles (table principale)
        const { data: initiatives, error: initiativesError } = await supabase
          .from("initiatives")
          .select("id, name, status, progress, budget, risk_level, organization_id, created_at")
          .eq("organization_id", orgId)
          .order("created_at", { ascending: false });

        // Si erreur ou pas de données → Mode démo
        if (initiativesError || !initiatives || initiatives.length === 0) {
          logger.warn('useCockpitData: Activation mode démo (pas de données réelles)', { 
            orgId, 
            error: initiativesError?.message,
            hasInitiatives: !!initiatives,
            count: initiatives?.length || 0
          });
          
          setIsDemoMode(true);
          setData(getCockpitDemoData(orgId));
          setLoading(false);
          return;
        }

        // Charger données complémentaires
        const [risksResult, decisionsResult] = await Promise.all([
          supabase
            .from("risks")
            .select("id, severity, status, title, organization_id")
            .eq("organization_id", orgId),
          
          supabase
            .from("decisions")
            .select("id, title, due_date, impact_level, status, organization_id")
            .eq("organization_id", orgId)
            .order("due_date", { ascending: true })
            .limit(10)
        ]);

        const risks = risksResult.data || [];
        const decisions = decisionsResult.data || [];

        // Calculer métriques réelles depuis données existantes
        const realData = await calculateRealCockpitData(initiatives, risks, decisions, orgId);
        
        setData(realData);
        setIsDemoMode(false);
        
        logger.info('useCockpitData: Données réelles chargées', {
          orgId,
          initiatives: initiatives.length,
          risks: risks.length,
          decisions: decisions.length
        });

      } catch (error) {
        logger.error('useCockpitData.load', error, { orgId });
        
        // Fallback mode démo en cas d'erreur
        setIsDemoMode(true);
        setData(getCockpitDemoData(orgId));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orgId]);

  return { data, loading, isDemoMode };
}
