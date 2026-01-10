import CockpitLayout from "../../components/layout/CockpitLayout";

export default function PortfolioPage() {
  return (
    <CockpitLayout>
      <h1 className="text-2xl font-semibold text-white mb-3">Portfolio</h1>
      <p className="text-[0.9rem] text-slate-300 mb-6">
        Vue consolidée de vos portefeuilles d'initiatives et de leurs impacts.
      </p>
      <div className="border border-slate-800 bg-black/30 rounded p-4 text-sm text-slate-400">
        Aucun portefeuille configuré pour le moment.
      </div>
    </CockpitLayout>
  );
}
