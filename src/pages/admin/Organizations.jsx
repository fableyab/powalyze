import { useEffect, useState } from "react";
import { supabase } from "../../lib/customSupabaseClient";
import CockpitLayout from "../../components/layout/CockpitLayout";

export default function AdminOrganizations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setOrgs(data);
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
        <h1 className="text-2xl font-semibold text-white">Organisations</h1>
        <p className="mt-1 text-[0.85rem] text-slate-400">
          Gestion des organisations Powalyze
        </p>
      </div>

      <div className="space-y-3">
        {orgs.map((o) => (
          <div
            key={o.id}
            className="border border-slate-800 bg-black/40 rounded p-4"
          >
            <div className="text-lg text-white">{o.name}</div>
            <div className="text-[0.75rem] text-slate-400 mt-1">
              ID: {o.id}
            </div>
            <div className="text-[0.75rem] text-slate-500">
              Créée le {new Date(o.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
        {orgs.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-8">
            Aucune organisation trouvée
          </div>
        )}
      </div>
    </CockpitLayout>
  );
}
