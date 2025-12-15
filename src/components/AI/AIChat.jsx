import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '@/hooks/useAI';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AIChat = () => {
  const { chat, loading } = useAI();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help you analyze your portfolio or suggest optimizations. What would you like to know?', timestamp: new Date().toISOString() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMsg = { role: 'user', content: inputValue, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const response = await chat(inputValue, messages);
    if (response) {
      setMessages(prev => [...prev, response]);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-[#111] border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-[#1A1A1A] p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#BFA76A]/20 flex items-center justify-center">
          <Bot size={18} className="text-[#BFA76A]" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Powalyze Assistant</h3>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-blue-600/20 text-blue-400' : 'bg-[#BFA76A]/20 text-[#BFA76A]'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600/20 text-blue-100 rounded-tr-none' 
                : 'bg-white/5 text-gray-300 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-[#BFA76A]/20 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-[#BFA76A]" />
             </div>
             <div className="bg-white/5 p-3 rounded-xl rounded-tl-none">
                <Loader2 size={16} className="animate-spin text-gray-400" />
             </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-[#1A1A1A] border-t border-white/10 flex gap-2">
        <Input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about your projects..."
          className="bg-black border-white/20 text-white focus:border-[#BFA76A]"
        />
        <Button type="submit" disabled={loading || !inputValue.trim()} className="bg-[#BFA76A] text-black hover:bg-white">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default AIChat;