import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: orgs } = await supabase.from("organizations").select("id");

  if (!orgs) {
    return new Response("No organizations found", { status: 404 });
  }

  for (const org of orgs) {
    const { data: tensions } = await supabase
      .from("tensions")
      .select("domain, level")
      .eq("organization_id", org.id);

    if (!tensions || tensions.length === 0) continue;

    const grouped = tensions.reduce((acc: any, t: any) => {
      acc[t.domain] = acc[t.domain] || [];
      acc[t.domain].push(t.level);
      return acc;
    }, {});

    const results = Object.entries(grouped).map(([domain, levels]: [string, any]) => ({
      organization_id: org.id,
      domain,
      avg_level: levels.reduce((a: number, b: number) => a + b, 0) / (levels.length || 1),
    }));

    for (const r of results) {
      await supabase.from("tension_heatmap_cache").upsert(r);
    }
  }

  return new Response("OK", {
    headers: { "Content-Type": "application/json" },
  });
});
