import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const payload = await req.json();
  const user = payload.record;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // 1. Créer une organisation
  const { data: org } = await supabase
    .from("organizations")
    .insert({ name: `Organisation de ${user.email}` })
    .select()
    .single();

  if (!org) {
    return new Response("Failed to create organization", { status: 500 });
  }

  // 2. Lier l'utilisateur à l'organisation
  await supabase.from("user_organizations").insert({
    user_id: user.id,
    organization_id: org.id,
    role: "admin",
  });

  // 3. Créer des données initiales (exemple)
  await supabase.from("focus_items").insert([
    {
      organization_id: org.id,
      type: "secure",
      description: "Stabiliser les jalons critiques sous tension.",
    },
    {
      organization_id: org.id,
      type: "accelerate",
      description: "Lever les blocages sur les initiatives clés.",
    },
    {
      organization_id: org.id,
      type: "arbitrate",
      description: "Éclaircir les choix de priorisation.",
    },
  ]);

  return new Response(JSON.stringify({ success: true, org_id: org.id }), {
    headers: { "Content-Type": "application/json" },
  });
});
