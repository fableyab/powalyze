import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import SEO from '../components/SEO';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/app/cockpit', { replace: true });
    }
  }, [user, navigate]);

  // Afficher message d'information si redirection depuis /login
  useEffect(() => {
    if (location.state?.message) {
      setInfoMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Créer le compte utilisateur
      const { data, error: signUpError } = await signUp(email, password, {
        full_name: fullName
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Un compte existe déjà avec cet email');
        } else {
          setError(signUpError.message || 'Une erreur est survenue');
        }
        setLoading(false);
        return;
      }

      // 2. Créer automatiquement une organisation par défaut
      if (data?.user) {
        setInfoMessage('Configuration de votre espace...');
        
        const { createOrganization } = await import('@/lib/organizationServiceSimple');
        const orgName = fullName 
          ? `Organisation ${fullName}` 
          : `Organisation ${email.split('@')[0]}`;
        
        const orgId = await createOrganization(data.user.id, email, orgName);
        
        if (!orgId) {
          console.error('Failed to create organization');
          // Continuer quand même - l'utilisateur pourra créer une org manuellement
        }
      }

      setSuccess(true);
      
      // 3. Redirection selon confirmation email
      if (data?.session) {
        // Auto-confirmé, redirect immédiatement
        setTimeout(() => {
          navigate('/app/cockpit', { replace: true });
        }, 1500);
      } else if (data?.user && !data?.session) {
        // Email envoyé, attendre confirmation
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Compte créé ! Veuillez vérifier votre email pour confirmer votre compte.' } 
          });
        }, 2000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Une erreur est survenue lors de la création du compte');
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Inscription - Powalyze Cockpit de Gouvernance"
        description="Créez votre compte et accédez à votre cockpit de gouvernance stratégique Powalyze."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block text-2xl font-bold mb-4">
              <span className="text-white">Pow</span>
              <span className="text-[#D4AF37]">alyze</span>
            </Link>
            <h1 className="text-xl font-semibold text-white mb-2">Créer un compte</h1>
            <p className="text-sm text-gray-400">Activez votre accès au cockpit de gouvernance</p>
          </div>

          {/* Card */}
          <div className="rounded-md border border-slate-800 bg-slate-950/80 p-6">
            {infoMessage && (
              <div className="mb-4 p-3 bg-blue-600/10 border border-blue-600/30 rounded-md">
                <p className="text-xs text-blue-400">{infoMessage}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-600/10 border border-green-600/30 rounded-md">
                <p className="text-xs text-green-400">
                  Compte créé avec succès ! Redirection...
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-600/10 border border-red-600/30 rounded-md">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Nom complet (optionnel)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Email professionnel</label>
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
                <label className="block text-xs text-gray-300 mb-1">Mot de passe (min. 8 caractères)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full rounded-sm bg-blue-600 hover:bg-blue-700 py-2 text-xs font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Création du compte...' : success ? 'Compte créé !' : 'Créer mon compte'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-gray-400 text-center">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Se connecter
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

export default SignUp;
