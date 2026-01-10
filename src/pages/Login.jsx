import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import SEO from '../components/SEO';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/app/cockpit', { replace: true });
    }
  }, [user, navigate]);

  // Afficher message de succès après signup
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    try {
      const { data, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre email avant de vous connecter');
        } else {
          setError(signInError.message || 'Une erreur est survenue');
        }
        setLoading(false);
        return;
      }
      
      if (data?.session) {
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/app/cockpit', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Une erreur est survenue lors de la connexion');
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Connexion - Powalyze Cockpit de Gouvernance"
        description="Accédez à votre cockpit de gouvernance stratégique Powalyze."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block text-2xl font-bold mb-4">
              <span className="text-white">Pow</span>
              <span className="text-[#D4AF37]">alyze</span>
            </Link>
            <h1 className="text-xl font-semibold text-white mb-2">Connexion au cockpit</h1>
            <p className="text-sm text-gray-400">Accédez à votre environnement de gouvernance</p>
          </div>

          {/* Card */}
          <div className="rounded-md border border-slate-800 bg-slate-950/80 p-6">
            {successMessage && (
              <div className="mb-4 p-3 bg-green-600/10 border border-green-600/30 rounded-md">
                <p className="text-xs text-green-400">{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-600/10 border border-red-600/30 rounded-md">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="nom@entreprise.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-blue-600 hover:bg-blue-700 py-2 text-xs font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-gray-400 text-center">
                Pas encore de compte ?{' '}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
