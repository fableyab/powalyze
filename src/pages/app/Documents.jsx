import CockpitLayout from "../../components/layout/CockpitLayout";

export default function DocumentsPage() {
  return (
    <CockpitLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-white">Documents</h1>
        <button className="px-3 py-1.5 text-[0.75rem] font-semibold rounded bg-gradient-to-r from-amber-400 to-amber-500 text-black">
          Expliquer
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un document..."
          className="w-full bg-black/40 border border-slate-700 rounded px-3 py-2 text-[0.85rem] text-slate-200 placeholder-slate-500"
        />
      </div>

      <div className="border border-slate-800 bg-black/30 rounded p-6 text-center text-[0.85rem] text-slate-400">
        Aucun document pour le moment.
      </div>
    </CockpitLayout>
  );
}
