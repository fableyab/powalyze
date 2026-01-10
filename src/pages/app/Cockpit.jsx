import CockpitLayout from "../../components/layout/CockpitLayout";
import { useCockpitData } from "../../hooks/useCockpitData";
import { useAuth } from "../../contexts/SupabaseAuthContext";
import { signalColor, riskLevelColor, capacityBarGradient, impactLevelColor, statusDotColor } from "../../utils/cockpitColors";

export default function CockpitPage() {
  const { orgId } = useAuth();
  const { data, loading } = useCockpitData(orgId);

  if (loading) {
    return (
      <CockpitLayout>
        <div className="text-sm text-slate-400">Chargement du cockpit...</div>
      </CockpitLayout>
    );
  }

  if (!data || !data.health) {
    return (
      <CockpitLayout>
        <div className="text-sm text-slate-400">
          Aucune donnée disponible. Veuillez configurer votre organisation.
        </div>
      </CockpitLayout>
    );
  }

  const { health, signal, milestones, tensions, capacity, decisions, focus, timestamps } = data;

  return (
    <CockpitLayout>
      {/* Barre signal global */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Cockpit</h1>
          <p className="mt-1 text-[0.85rem] text-slate-400">
            Synthèse visuelle de vos enjeux, risques et décisions, en un coup d'œil.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {signal && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-[0.75rem] ${signalColor(
                signal.signal
              )}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  signal.signal === "critique"
                    ? "bg-red-400"
                    : signal.signal === "tension"
                    ? "bg-amber-300"
                    : "bg-emerald-300"
                }`}
              />
              <span>Signal global&nbsp;: {Math.round(signal.global_score)}%</span>
            </div>
          )}
          <span className="text-[0.7rem] text-slate-500">
            Mise à jour&nbsp;: {timestamps.lastUpdate}
          </span>
        </div>
      </div>

      {/* Ligne du haut */}
      <div className="grid gap-5 md:grid-cols-3 mb-6">
        {/* Bloc 1 : Santé globale */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Santé globale
          </h2>
          <div className="flex gap-3">
            {[
              { label: "Avancement", value: Math.round(health.avg_progress || 0), color: "from-sky-500 to-sky-300" },
              { label: "Risques", value: Math.round(health.risk_score || 0), color: "from-amber-500 to-amber-300" },
              { label: "Engagements", value: Math.round(health.commitments || 0), color: "from-emerald-500 to-emerald-300" },
            ].map((item) => (
              <div key={item.label} className="flex-1 text-center">
                <div className="relative mx-auto h-16 w-16">
                  <div className="absolute inset-0 rounded-full border border-slate-700" />
                  <div
                    className={`absolute inset-[3px] rounded-full bg-gradient-to-tr ${item.color} opacity-60`}
                  />
                  <div className="absolute inset-[8px] rounded-full bg-[#050509] flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-100">
                      {item.value}%
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-[0.7rem] text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bloc 2 : Pulse des enjeux */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Pulse des enjeux
          </h2>
          <div className="h-20 flex flex-col justify-between">
            <div className="flex justify-between text-[0.7rem] text-slate-400 mb-1">
              <span>Cette semaine</span>
              <span>Prochains jalons</span>
            </div>
            <div className="relative h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-700" />
              {milestones.slice(0, 4).map((m, idx) => {
                const pos = 20 + (idx * 20);
                return (
                  <div
                    key={m.id}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${pos}%` }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${statusDotColor(m.status)} shadow`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[0.65rem] text-slate-500">
              <span>Now</span>
              <span>+ 10 jours</span>
            </div>
          </div>
        </div>

        {/* Bloc 3 : Priorités du moment */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Priorités du moment
          </h2>
          <div className="space-y-2 text-[0.8rem]">
            {decisions.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border border-slate-700 bg-slate-950/60 px-3 py-2"
              >
                <div>
                  <div className="text-slate-100 text-[0.8rem]">{item.title}</div>
                  <div className="text-[0.65rem] text-slate-500">
                    {item.due_date ? new Date(item.due_date).toLocaleDateString() : "À définir"}
                  </div>
                </div>
                <span
                  className={`text-[0.6rem] px-2 py-0.5 rounded-full ${impactLevelColor(
                    item.impact_level
                  )}`}
                >
                  {item.impact_level}
                </span>
              </div>
            ))}
            {decisions.length === 0 && (
              <div className="text-[0.75rem] text-slate-500 text-center py-4">
                Aucune décision en attente
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="grid gap-5 md:grid-cols-3">\
        {/* Bloc 4 : Risques & tensions */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Risques & tensions
          </h2>
          <div className="grid grid-cols-3 gap-1 text-[0.7rem]">
            {["strategie", "execution", "ressources", "dependances", "qualite", "conformite"].map((domain) => {
              const tension = tensions.find((t) => t.domain === domain);
              const level = tension ? Math.round(tension.avg_level) : 0;
              
              return (
                <div
                  key={domain}
                  className={`h-12 rounded border text-center flex flex-col items-center justify-center ${riskLevelColor(
                    level
                  )}`}
                >
                  <span className="text-[0.6rem] capitalize">{domain}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bloc 5 : Capacité & charge */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Capacité & charge
          </h2>
          <div className="space-y-3 text-[0.75rem]">
            {capacity.slice(0, 3).map((t) => (
              <div key={t.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300">{t.name}</span>
                  <span className="text-slate-400">
                    {Math.round((t.saturation || 0) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${capacityBarGradient(
                      t.saturation || 0
                    )}`}
                    style={{ width: `${(t.saturation || 0) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {capacity.length === 0 && (
              <div className="text-[0.75rem] text-slate-500 text-center py-4">
                Aucune équipe configurée
              </div>
            )}
          </div>
        </div>

        {/* Bloc 6 : Focus du jour */}
        <div className="border border-slate-800 bg-black/40 rounded-md p-4">
          <h2 className="text-xs font-semibold text-slate-200 mb-3">
            Focus du jour
          </h2>
          <div className="space-y-2 text-[0.8rem]">
            {focus.slice(0, 3).map((f) => (
              <div
                key={f.id}
                className="rounded border border-slate-700 bg-slate-950/70 px-3 py-2"
              >
                <div className="text-[0.8rem] text-amber-300 font-semibold capitalize">
                  {f.type === "secure" ? "À sécuriser" : f.type === "accelerate" ? "À accélérer" : "À arbitrer"}
                </div>
                <div className="text-[0.75rem] text-slate-300 mt-1">
                  {f.description}
                </div>
              </div>
            ))}
            {focus.length === 0 && (
              <div className="text-[0.75rem] text-slate-500 text-center py-4">
                Aucun focus défini
              </div>
            )}
          </div>
        </div>
      </div>
    </CockpitLayout>
  );
}
