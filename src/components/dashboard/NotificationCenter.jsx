import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !isSupabaseConfigured()) {
       // Mock notifications for demo
       setNotifications([
          { id: 1, message: 'Welcome to Powalyze Premium!', type: 'success', created_at: new Date().toISOString(), read: false },
          { id: 2, message: 'Your file "Sales_Q3.xlsx" was processed.', type: 'info', created_at: new Date(Date.now() - 3600000).toISOString(), read: true }
       ]);
       setUnreadCount(1);
       return;
    }

    const fetchNotifs = async () => {
       const { data } = await supabase
         .from('notifications')
         .select('*')
         .eq('user_id', user.id)
         .order('created_at', { ascending: false })
         .limit(10);
       
       if (data) {
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.is_read).length);
       }
    };

    fetchNotifs();

    // Real-time subscription
    const subscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, payload => {
        setNotifications(prev => [payload.new, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Browser Notification API could go here
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user]);

  const markRead = async (id) => {
    if (isSupabaseConfigured()) {
       await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    }
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
           <span className="absolute top-1 right-1 w-2 h-2 bg-[#BFA76A] rounded-full animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             className="absolute right-0 mt-2 w-80 bg-[#111] border border-[#333] rounded-xl shadow-2xl z-50 overflow-hidden"
           >
              <div className="p-4 border-b border-[#222] flex justify-between items-center">
                 <h3 className="font-bold text-white text-sm">Notifications</h3>
                 <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                 {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No notifications yet.</div>
                 ) : (
                    notifications.map(n => (
                       <div 
                         key={n.id} 
                         onClick={() => markRead(n.id)}
                         className={`p-4 border-b border-[#222] hover:bg-[#1C1C1C] cursor-pointer transition-colors ${!n.read && !n.is_read ? 'bg-[#1a1a1a]' : ''}`}
                       >
                          <div className="flex gap-3">
                             <div className={`mt-1 ${n.type === 'success' ? 'text-green-500' : n.type === 'error' ? 'text-red-500' : 'text-[#BFA76A]'}`}>
                                {n.type === 'success' ? <Check size={16} /> : n.type === 'error' ? <AlertTriangle size={16} /> : <Info size={16} />}
                             </div>
                             <div>
                                <p className={`text-sm ${!n.read && !n.is_read ? 'text-white font-medium' : 'text-gray-400'}`}>
                                   {n.message}
                                </p>
                                <p className="text-[10px] text-gray-600 mt-1">
                                   {new Date(n.created_at).toLocaleString()}
                                </p>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>
              <div className="p-2 border-t border-[#222] bg-[#0A0A0A] text-center">
                 <button className="text-xs text-[#BFA76A] hover:underline">Mark all as read</button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;