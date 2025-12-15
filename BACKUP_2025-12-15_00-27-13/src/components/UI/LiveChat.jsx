import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, ChevronDown, Headphones as Headphones, Minus } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', created_at: new Date().toISOString() }
  ]);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let sid = localStorage.getItem('chat_session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(7);
      localStorage.setItem('chat_session_id', sid);
    }
    setSessionId(sid);

    if (isSupabaseConfigured()) {
      // Load previous messages
      const fetchMessages = async () => {
        const { data } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', sid)
          .order('created_at', { ascending: true });
        if (data && data.length > 0) setMessages(data);
      };
      fetchMessages();

      // Subscribe to real-time messages
      const subscription = supabase
        .channel('public:chat_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${sid}` }, payload => {
           setMessages(prev => {
             // Avoid duplicates if we inserted it locally
             if (prev.find(m => m.id === payload.new.id)) return prev;
             return [...prev, payload.new];
           });
           // Play notification sound
           const audio = new Audio('/notification.mp3'); 
           audio.play().catch(e => {}); // Silent catch if file missing
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: crypto.randomUUID(), // Temp ID
      session_id: sessionId,
      sender: 'user',
      message: inputText,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText("");

    if (isSupabaseConfigured()) {
      await supabase.from('chat_messages').insert([{
        session_id: sessionId,
        sender: 'user',
        message: newMsg.message
      }]);
    } else {
      // Simulate reply if no backend
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'agent',
          message: "Merci pour votre message. Nos experts sont actuellement indisponibles dans cette démo, mais nous vous répondrons par email.",
          created_at: new Date().toISOString()
        }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#BFA76A] rounded-full shadow-[0_4px_20px_rgba(191,167,106,0.5)] flex items-center justify-center cursor-pointer group hover:bg-[#a8925b] transition-colors"
          >
            <MessageSquare size={24} className="text-black" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1, height: isMinimized ? 'auto' : 500 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className={`fixed bottom-[100px] right-6 z-50 w-[350px] bg-[#0A0A0A] rounded-xl shadow-2xl border border-[#BFA76A]/20 flex flex-col overflow-hidden backdrop-blur-sm ${isMinimized ? '' : 'h-[500px]'}`}
          >
            {/* Header */}
            <div className="bg-[#111] p-4 flex justify-between items-center border-b border-[#BFA76A]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BFA76A]/20 flex items-center justify-center">
                  <Headphones size={16} className="text-[#BFA76A]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Support Powalyze</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-400">En ligne</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white"><Minus size={16}/></button>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><X size={16}/></button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-[#222] text-white rounded-tr-none' : 'bg-[#151515] text-gray-200 rounded-tl-none border border-[#BFA76A]/10'}`}>
                        {msg.message || msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-[#111] border-t border-[#BFA76A]/10">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Votre message..."
                      className="flex-1 bg-[#0A0A0A] text-white text-sm rounded px-3 py-2 border border-white/10 focus:border-[#BFA76A] focus:outline-none"
                    />
                    <button type="submit" className="bg-[#BFA76A] text-black p-2 rounded hover:bg-[#d4be83] transition-colors">
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;