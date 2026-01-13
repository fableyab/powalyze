import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * 🛡️ Error Boundary - Attrape les erreurs React avant le crash
 * Protection contre "Cannot read properties of undefined"
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log uniquement en dev
    if (import.meta.env.DEV) {
      console.error('🔴 ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050509] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-black/40 border border-red-500/20 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-light text-white mb-3">
              Une erreur est survenue
            </h2>
            <p className="text-white/60 mb-6 text-sm">
              {import.meta.env.DEV 
                ? this.state.error?.message 
                : 'Impossible de charger cette page'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
