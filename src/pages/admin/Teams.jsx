import { useEffect, useState } from "react";
import { supabase } from "../../lib/customSupabaseClient";
import CockpitLayout from "../../components/layout/CockpitLayout";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("teams")
        .select("*, organizations(name)")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setTeams(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <CockpitLayout>
        <div className="text-sm text-slate-400">Chargement...</div>
      </CockpitLayout>
    );
  }

  return (
    <CockpitLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Équipes</h1>
        <p className="mt-1 text-[0.85rem] text-slate-400">
          Gestion des équipes par organisation
        </p>
      </div>

      <div className="space-y-3">
        {teams.map((t) => (
          <div
            key={t.id}
            className="border border-slate-800 bg-black/40 rounded p-4"
          >
            <div className="text-lg text-white">{t.name}</div>
            <div className="text-[0.75rem] text-slate-400 mt-1">
              Organisation : {t.organizations?.name || "N/A"}
            </div>
            <div className="text-[0.75rem] text-slate-500">
              ID: {t.id}
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-8">
            Aucune équipe trouvée
          </div>
        )}
      </div>
    </CockpitLayout>
  );
}
