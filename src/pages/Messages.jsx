
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Messages = () => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'AI', text: "Hello! I'm your Powalyze AI Assistant. How can I help you optimize your strategic portfolio today?", time: 'Now' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const generateAIResponse = (userText) => {
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes('hello') || lowerText.includes('hi')) return "Hello there! Ready to work on your projects?";
        if (lowerText.includes('help')) return "I can assist with Reports, Tasks, Strategy, or Risk analysis. What do you need?";
        if (lowerText.includes('status')) return "Your portfolio is currently healthy. 3 Projects are on track, 1 is at risk.";
        if (lowerText.includes('report')) return "I can generate a PDF or Excel report for you. Please go to the Reports section.";
        if (lowerText.includes('task')) return "You have 5 pending tasks for this week. Would you like to see them?";
        
        return "I'm processing that request. Could you please specify if this relates to a specific project or report?";
    };

    const handleSend = () => {
        if(!input.trim()) return;
        
        const userMsg = { id: Date.now(), sender: 'Me', text: input, time: 'Now' };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const aiText = generateAIResponse(currentInput);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'AI', 
                text: aiText, 
                time: 'Now' 
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                 <h1 className="text-2xl font-bold text-white">{t('messages.title')}</h1>
                 <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> AI Online
                 </div>
            </div>

            <div className="flex-1 bg-[#1A1A1A] border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4 mb-4 shadow-inner">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-xl ${
                            msg.sender === 'Me' 
                            ? 'bg-[#4A9EFF] text-white rounded-tr-none' 
                            : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            {msg.sender === 'AI' && <Bot className="w-3 h-3 text-[#D4AF37]" />}
                            <span className="text-[10px] text-slate-500">{msg.sender === 'AI' ? t('messages.aiSender') : 'You'} • {msg.time}</span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-start">
                        <div className="bg-slate-800 p-3 rounded-xl rounded-tl-none border border-slate-700 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="flex gap-2">
                <Input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder={t('messages.typeMessage')} 
                    className="bg-[#1A1A1A] border-slate-800 text-white focus:ring-[#4A9EFF]" 
                    onKeyDown={e => e.key === 'Enter' && handleSend()} 
                />
                <Button onClick={handleSend} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default Messages;
