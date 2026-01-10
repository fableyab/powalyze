import CockpitLayout from "../../components/layout/CockpitLayout";
import { LayoutDashboard, TrendingUp, Activity, Bell } from 'lucide-react';

export default function CockpitPage() {
  return (
    <CockpitLayout>
      <h1 className="text-2xl font-semibold text-white mb-3">Cockpit</h1>
      <p className="text-[0.9rem] text-slate-300 mb-6">
        Vue d'ensemble de vos initiatives, risques et décisions.
      </p>
      <div className="grid gap-4 md:grid-cols-3 text-[0.85rem]">
        <div className="border border-slate-800 bg-black/40 rounded p-4">
          <h2 className="text-sm font-semibold text-white">Portefeuilles</h2>
          <p className="mt-2 text-slate-300">
            Synthèse des initiatives en cours, priorités et avancement.
          </p>
        </div>
        <div className="border border-slate-800 bg-black/40 rounded p-4">
          <h2 className="text-sm font-semibold text-white">Risques</h2>
          <p className="mt-2 text-slate-300">
            Vue rapide des risques clés et de leurs plans d'action.
          </p>
        </div>
        <div className="border border-slate-800 bg-black/40 rounded p-4">
          <h2 className="text-sm font-semibold text-white">Décisions</h2>
          <p className="mt-2 text-slate-300">
            Historique des décisions prises dans vos rituels de gouvernance.
          </p>
        </div>
      </div>
    </CockpitLayout>
  );
}
