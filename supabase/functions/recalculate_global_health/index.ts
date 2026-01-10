import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Récupérer toutes les organisations
  const { data: orgs } = await supabase.from("organizations").select("id");

  if (!orgs) {
    return new Response("No organizations found", { status: 404 });
  }

  for (const org of orgs) {
    // Récupérer initiatives + risques
    const { data: initiatives } = await supabase
      .from("initiatives")
      .select("id, progress, status")
      .eq("organization_id", org.id);

    if (!initiatives || initiatives.length === 0) continue;

    const { data: risks } = await supabase
      .from("risks")
      .select("probability, impact")
      .in(
        "initiative_id",
        initiatives.map((i) => i.id)
      );

    const avgProgress =
      initiatives.reduce((a, b) => a + (b.progress || 0), 0) /
      (initiatives.length || 1);

    const commitments =
      (initiatives.filter((i) => i.status === "done").length /
        (initiatives.length || 1)) *
      100;

    const riskScore = risks && risks.length > 0
      ? risks.reduce((a, b) => a + (b.probability || 0) * (b.impact || 0) / 100, 0) /
        risks.length
      : 0;

    const globalScore =
      avgProgress * 0.3 + commitments * 0.3 + (100 - riskScore) * 0.4;

    // Stocker dans une table de cache
    await supabase.from("global_health_cache").upsert({
      organization_id: org.id,
      avg_progress: avgProgress,
      commitments,
      risk_score: riskScore,
      global_score: globalScore,
      updated_at: new Date().toISOString(),
    });
  }

  return new Response("OK", {
    headers: { "Content-Type": "application/json" },
  });
});
