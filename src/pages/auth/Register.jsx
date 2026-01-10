import { useState } from "react";
import { supabase } from "../../lib/customSupabaseClient";
import { useAuth } from "../../contexts/SupabaseAuthContext";
import { Navigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/app/cockpit" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg("Impossible de créer le compte. Vérifiez l'email.");
    } else {
      setInfoMsg("Compte créé. Vérifiez vos emails si la confirmation est activée.");
    }
  }

  return (
    <div className="min-h-screen bg-[#050509] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-slate-800 bg-black/50 rounded-md p-5">
        <h1 className="text-2xl font-semibold text-white">Créer un compte</h1>
        <p className="mt-2 text-[0.8rem] text-slate-400">
          Activez votre accès au cockpit Powalyze.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[0.7rem] text-slate-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-[0.8rem] text-slate-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[0.7rem] text-slate-400 mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-[0.8rem] text-slate-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="text-[0.75rem] text-red-400">{errorMsg}</p>
          )}
          {infoMsg && (
            <p className="text-[0.75rem] text-emerald-400">{infoMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[0.8rem] font-semibold py-2 rounded"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-4 text-[0.75rem] text-slate-400">
          Déjà un compte ?{" "}
          <Link to="/auth/login" className="text-amber-300 hover:text-amber-200">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
