import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-[#111] border border-red-900/30 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
             <AlertTriangle className="text-red-500" size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Something went wrong</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md">
            {this.state.error?.message || "An unexpected error occurred while rendering this component."}
          </p>
          <Button 
            onClick={this.handleReset}
            variant="outline"
            className="border-white/10 hover:bg-white/5 text-white"
          >
            <RefreshCw size={16} className="mr-2" /> Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;