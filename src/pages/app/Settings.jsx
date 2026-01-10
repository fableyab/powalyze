import CockpitLayout from "../../components/layout/CockpitLayout";

export default function SettingsPage() {
  return (
    <CockpitLayout>
      <h1 className="text-2xl font-semibold text-white mb-3">Paramètres</h1>
      <p className="text-[0.9rem] text-slate-300 mb-6">
        Préférences de votre espace Powalyze.
      </p>
      <div className="border border-slate-800 bg-black/30 rounded p-4 text-sm text-slate-400">
        Zone de réglages à compléter.
      </div>
    </CockpitLayout>
  );
}
