import React from 'react';
import Navbar from '@/components/landing/Navbar';
import AIChat from '@/components/AI/AIChat';
import InsightsPanel from '@/components/AI/InsightsPanel';
import SEO from '@/components/SEO';
import { useLanguage } from '@/context/LanguageContext';
import { Bot, Sparkles, Zap } from 'lucide-react';

// Mock data for initial insights
const DEMO_CONTEXT = {
  projects: 12,
  budget: 5000000,
  risks: ['High', 'Low', 'Medium'],
  delays: 2
};

const AIAssistantPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title="AI Strategic Assistant" 
        description="Interact with our advanced AI to gain insights into your project portfolio."
      />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
            <Sparkles size={12} /> Beta Feature
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            AI Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#BFA76A]">Assistant</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Leverage the power of artificial intelligence to analyze your data, predict trends, and optimize your portfolio performance in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
             <AIChat />
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-6">
             <InsightsPanel data={DEMO_CONTEXT} />
             
             <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                   <Zap size={20} className="text-yellow-500" /> Quick Actions
                </h3>
                <div className="space-y-2">
                   {['Generate Weekly Report', 'Analyze Cost Variance', 'Predict Resource Needs', 'Audit Risk Log'].map(action => (
                      <button 
                        key={action}
                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors border border-transparent hover:border-white/10"
                      >
                         {action}
                      </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistantPage;