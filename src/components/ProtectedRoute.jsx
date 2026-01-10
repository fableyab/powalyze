import { useAuth } from "../contexts/SupabaseAuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("🛡️ [PROTECTED] Loading:", loading, "User:", !!user);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050509] text-slate-300 flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
