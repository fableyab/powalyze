import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNT } from '../contexts/AuthContext';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiPlay } from 'react-icons/fi';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginDemo } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/espace-pro/dashboard');
    } else {
      setError(result.error || 'Identifiants incorrects');
    }
    
    setLoading(false);
  };

  const handleDemoAccess = () => {
    loginDemo();
    navigate('/espace-pro/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">POW</span>
            <span className="text-[#BFA76A]">ALYZE</span>
          </h1>
          <p className="text-gray-400">Plateforme PMO Premium</p>
        </div>

        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-[#BFA76A]/20 to-purple-500/20 border border-[#BFA76A]/50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
              <FiPlay className="text-[#BFA76A]" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">Mode Démo Disponible</h3>
              <p className="text-sm text-gray-300 mb-3">
                Découvrez la plateforme avec un compte pré-configuré contenant des projets, tâches et dashboards démo.
              </p>
              <button
                onClick={handleDemoAccess}
                className="w-full flex items-center justify-center gap-2 bg-[#BFA76A] hover:bg-[#D4AF37] text-black font-bold py-3 px-4 rounded-lg transition-all"
              >
                <FiPlay />
                <span>Accéder à la Démo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-[#111] border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Connexion</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#BFA76A]/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#BFA76A]/50 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2">Identifiants démo :</p>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Email:</span>
                <code className="text-gray-300 font-mono">{DEMO_ACCOUNT.email}</code>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Password:</span>
                <code className="text-gray-300 font-mono">{DEMO_ACCOUNT.password}</code>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="/signup" className="block text-sm text-[#BFA76A] hover:text-[#D4AF37] transition-colors">
              Créer un compte
            </a>
            <a href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 Powalyze. Plateforme PMO Premium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
