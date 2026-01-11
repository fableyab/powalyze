import { useEffect, useState } from "react";
import { supabase } from "../lib/customSupabaseClient";

export function useCockpitData(orgId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!orgId) {
        setLoading(false);
        return;
      }

      try {
        const [health, signal, milestones, tensions, capacity, decisions, focus, projects] = await Promise.all([
          supabase
            .from("global_health_view")
            .select("*")
            .eq("organization_id", orgId)
            .single(),
          
          supabase
            .from("global_signal")
            .select("*")
            .eq("organization_id", orgId)
            .single(),
          
          supabase
            .from("pulse_milestones")
            .select("*")
            .eq("organization_id", orgId)
            .order("due_date", { ascending: true }),
          
          supabase
            .from("tension_heatmap")
            .select("*")
            .eq("organization_id", orgId),
          
          supabase
            .from("team_load")
            .select("*")
            .eq("organization_id", orgId),
          
          supabase
            .from("priority_decisions")
            .select("*")
            .eq("organization_id", orgId),
          
          supabase
            .from("focus_items")
            .select("*")
            .eq("organization_id", orgId)
            .order("created_at", { ascending: false }),
          
          supabase
            .from("projects")
            .select("id, name, owner, budget, status, risk_level, strategic_priority")
            .eq("organization_id", orgId)
            .order("created_at", { ascending: false })
        ]);

        setData({
          health: health.data,
          signal: signal.data,
          milestones: milestones.data || [],
          tensions: tensions.data || [],
          capacity: capacity.data || [],
          decisions: decisions.data || [],
          focus: focus.data || [],
          projects: projects.data || [],
          timestamps: {
            lastUpdate: "il y a 5 min"
          }
        });
      } catch (error) {
        console.error("Error loading cockpit data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orgId]);

  return { data, loading };
}
