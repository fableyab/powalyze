import CockpitLayout from "../../components/layout/CockpitLayout";

export default function ProjectsPage() {
  return (
    <CockpitLayout>
      <h1 className="text-2xl font-semibold text-white mb-3">Projets</h1>
      <p className="text-[0.9rem] text-slate-300 mb-6">
        Liste de vos projets structurés par portefeuilles et priorités.
      </p>
      <div className="border border-slate-800 bg-black/30 rounded p-4 text-sm text-slate-400">
        Aucun projet configuré pour le moment.
      </div>
    </CockpitLayout>
  );
}
