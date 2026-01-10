import { useAuth } from "../../contexts/SupabaseAuthContext";

export function TopBar() {
  const { signOut } = useAuth();

  return (
    <header className="h-12 border-b border-slate-800 bg-[#050509]/95 flex items-center justify-between px-4">
      <span className="text-[0.75rem] text-slate-400">
        Powalyze — Cockpit de gouvernance
      </span>
      <button
        onClick={signOut}
        className="text-[0.7rem] text-slate-300 hover:text-amber-300"
      >
        Déconnexion
      </button>
    </header>
  );
}

export default TopBar;
