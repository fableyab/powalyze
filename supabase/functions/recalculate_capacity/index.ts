import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: teams } = await supabase
    .from("teams")
    .select("id, organization_id, name");

  if (!teams) {
    return new Response("No teams found", { status: 404 });
  }

  for (const team of teams) {
    const { data: caps } = await supabase
      .from("team_capacity")
      .select("capacity, used")
      .eq("team_id", team.id);

    if (!caps || caps.length === 0) continue;

    const totalCapacity = caps.reduce((a, b) => a + (b.capacity || 0), 0);
    const totalUsed = caps.reduce((a, b) => a + (b.used || 0), 0);

    const saturation = totalCapacity === 0 ? 0 : totalUsed / totalCapacity;

    await supabase.from("team_load_cache").upsert({
      team_id: team.id,
      organization_id: team.organization_id,
      name: team.name,
      capacity: totalCapacity,
      used: totalUsed,
      saturation,
      updated_at: new Date().toISOString(),
    });
  }

  return new Response("OK", {
    headers: { "Content-Type": "application/json" },
  });
});
