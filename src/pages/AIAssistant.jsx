/**
 * PAGE AI ASSISTANT
 * Assistant IA pour préparation comités
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, Send, Calendar, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function AIAssistant() {
  const { workspaceId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // TODO: Intégrer appel API IA backend
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: `Je peux vous aider à préparer votre comité. Voici ce que je suggère basé sur l'analyse du portefeuille...`
      };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extralight mb-2">
            Assistant <span className="text-[#D4AF37]">IA</span>
          </h1>
          <p className="text-gray-400 font-light">
            Préparation intelligente de comités exécutifs
          </p>
        </div>

        {/* Suggestions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#0A1A2F] border border-gray-800 rounded-xl hover:border-[#D4AF37]/30 transition-colors text-left">
            <Calendar className="h-5 w-5 text-[#D4AF37] mb-2" />
            <p className="text-white font-light mb-1">Préparer le prochain COMEX</p>
            <p className="text-sm text-gray-400">Générer pack avec KPIs et top risques</p>
          </button>
          <button className="p-4 bg-[#0A1A2F] border border-gray-800 rounded-xl hover:border-[#D4AF37]/30 transition-colors text-left">
            <FileText className="h-5 w-5 text-[#4A9EFF] mb-2" />
            <p className="text-white font-light mb-1">Synthèse projets critiques</p>
            <p className="text-sm text-gray-400">Résumé initiatives à risque</p>
          </button>
          <button className="p-4 bg-[#0A1A2F] border border-gray-800 rounded-xl hover:border-[#D4AF37]/30 transition-colors text-left">
            <Brain className="h-5 w-5 text-emerald-400 mb-2" />
            <p className="text-white font-light mb-1">Recommandations budget</p>
            <p className="text-sm text-gray-400">Scénarios d'optimisation</p>
          </button>
        </div>

        {/* Chat */}
        <div className="bg-[#0A1A2F] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Brain className="h-16 w-16 text-gray-600 mb-4" />
                <p className="text-gray-500 font-light mb-2">
                  Posez-moi vos questions sur le portefeuille
                </p>
                <p className="text-sm text-gray-600">
                  Je peux vous aider à préparer des comités, analyser des risques, générer des rapports...
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[70%] p-4 rounded-xl
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black'
                    : 'bg-black/50 text-white border border-gray-800'
                  }
                `}>
                  <p className="font-light text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-black/50 border border-gray-800 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-light rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
