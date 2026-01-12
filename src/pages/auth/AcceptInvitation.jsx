import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import customSupabaseClient from '@/lib/customSupabaseClient';
import { acceptInvitation } from '@/lib/teamService';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signUp, signIn } = useAuth();
  
  const [token] = useState(searchParams.get('token'));
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('verify'); // 'verify', 'signup', 'login', 'success'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  // Vérifier le token au chargement
  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    if (!token) {
      setError('Token d\'invitation manquant');
      setLoading(false);
      return;
    }

    try {
      // Récupérer l'invitation
      const { data, error } = await customSupabaseClient
        .from('invitations')
        .select(`
          *,
          organization:organization_id (
            id,
            name
          ),
          inviter:invited_by_user_id (
            email,
            raw_user_meta_data
          )
        `)
        .eq('token', token)
        .single();

      if (error) throw error;

      if (!data) {
        setError('Invitation introuvable');
        setLoading(false);
        return;
      }

      if (data.status !== 'pending') {
        setError('Cette invitation n\'est plus valide');
        setLoading(false);
        return;
      }

      if (new Date(data.expires_at) < new Date()) {
        setError('Cette invitation a expiré');
        setLoading(false);
        return;
      }

      setInvitation(data);
      setFormData(prev => ({ ...prev, email: data.email }));

      // Si l'utilisateur est déjà connecté
      if (user) {
        if (user.email === data.email) {
          // Accepter directement
          await acceptInvite();
        } else {
          setError(`Vous êtes connecté avec ${user.email} mais l'invitation est pour ${data.email}. Veuillez vous déconnecter d'abord.`);
        }
      } else {
        // Vérifier si l'email existe déjà
        setStep('signup');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error verifying token:', err);
      setError('Erreur lors de la vérification de l\'invitation');
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      // Créer le compte
      const { data: authData, error: signUpError } = await signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.fullName
        }
      );

      if (signUpError) throw signUpError;

      if (authData?.user) {
        // Accepter l'invitation
        await acceptInvite(authData.user.id);
      }
    } catch (err) {
      console.error('Error signing up:', err);
      
      if (err.message?.includes('already registered')) {
        setError('Cet email est déjà enregistré. Veuillez vous connecter.');
        setStep('login');
      } else {
        setError(err.message || 'Erreur lors de la création du compte');
      }
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: signInError } = await signIn(
        formData.email,
        formData.password
      );

      if (signInError) throw signInError;

      if (authData?.user) {
        await acceptInvite(authData.user.id);
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message || 'Erreur de connexion');
      setLoading(false);
    }
  };

  const acceptInvite = async (userId = null) => {
    try {
      const userIdToUse = userId || user?.id;
      
      if (!userIdToUse) {
        throw new Error('Utilisateur non authentifié');
      }

      const { data, error } = await acceptInvitation(token, userIdToUse);

      if (error) throw error;

      setStep('success');
      
      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error accepting invitation:', err);
      setError(err.message || 'Erreur lors de l\'acceptation de l\'invitation');
      setLoading(false);
    }
  };

  const getRoleName = (role) => {
    const roles = {
      admin: 'Administrateur',
      manager: 'Manager',
      analyst: 'Analyste',
      viewer: 'Observateur'
    };
    return roles[role] || role;
  };

  if (loading && step === 'verify') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Vérification de l'invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#020713] border border-white/10 rounded-[2px] p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-white mb-4">Invitation invalide</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#D4AF37] text-black rounded-[2px] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#020713] border border-white/10 rounded-[2px] p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-white mb-4">Invitation acceptée !</h1>
          <p className="text-white/60 mb-2">
            Vous êtes maintenant membre de <strong>{invitation?.organization?.name}</strong>
          </p>
          <p className="text-white/40 text-sm">
            Redirection vers le dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extralight text-white mb-2 tracking-tight">
            POW<span className="text-[#D4AF37]">ALYZE</span>
          </h1>
          <p className="text-white/40 text-sm">Plateforme de pilotage stratégique</p>
        </div>

        {/* Invitation Info */}
        <div className="bg-[#020713] border border-white/10 rounded-[2px] p-6 mb-6">
          <h2 className="text-xl font-light text-white mb-4">Invitation reçue</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">Organisation:</span>
              <span className="text-white">{invitation?.organization?.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/40">Rôle:</span>
              <span className="text-[#D4AF37]">{getRoleName(invitation?.role)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-white/40">Invité par:</span>
              <span className="text-white">
                {invitation?.inviter?.raw_user_meta_data?.full_name || invitation?.inviter?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#020713] border border-white/10 rounded-[2px] p-8">
          {step === 'signup' && (
            <>
              <h3 className="text-lg font-light text-white mb-6">Créer votre compte</h3>
              
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white/60 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-[2px] p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#D4AF37] text-black rounded-[2px] text-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.1em] uppercase font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Création...
                    </>
                  ) : (
                    'Créer mon compte'
                  )}
                </button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('login')}
                    className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors"
                  >
                    Déjà un compte ? Se connecter
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 'login' && (
            <>
              <h3 className="text-lg font-light text-white mb-6">Connexion</h3>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white/60 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 uppercase tracking-[0.1em]">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#D4AF37]/30 focus:outline-none transition-all duration-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-[2px] p-3 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-[#D4AF37] text-black rounded-[2px] text-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.1em] uppercase font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('signup')}
                    className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors"
                  >
                    Créer un nouveau compte
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
