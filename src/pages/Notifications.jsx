
import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, CheckCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchNotifications();
    }, [user]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotifications(data || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this notification?")) return;
        try {
            const { error } = await supabase.from('notifications').delete().eq('id', id);
            if (error) throw error;
            
            setNotifications(prev => prev.filter(n => n.id !== id));
            toast({ title: "Deleted", description: "Notification removed." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const handleDeleteAll = async () => {
        if (notifications.length === 0) return;
        if (!window.confirm("Are you sure you want to delete ALL notifications?")) return;

        try {
            const { error } = await supabase.from('notifications').delete().eq('user_id', user.id);
            if (error) throw error;
            
            setNotifications([]);
            toast({ title: "Deleted", description: "All notifications cleared." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('id', id);
            
            if (error) throw error;

            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('user_id', user.id)
                .eq('read', false);
            
            if (error) throw error;

            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            toast({ title: "Updated", description: "All marked as read." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-[#4A9EFF]" /></div>;

    return (
        <div className="space-y-6 p-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Notifications</h1>
                    <p className="text-slate-500">Stay updated with your project activities</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
                        <CheckCheck className="w-4 h-4 mr-2" /> Mark All Read
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDeleteAll} className="border-slate-800 text-red-500 hover:text-red-400 hover:bg-red-900/10">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete All
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {notifications.length === 0 ? (
                    <div className="text-center p-12 bg-[#1A1A1A] border border-slate-800 rounded-xl">
                        <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-white font-medium">No Notifications</h3>
                        <p className="text-slate-500">You're all caught up!</p>
                    </div>
                ) : (
                    notifications.map(notif => (
                        <div 
                            key={notif.id} 
                            className={cn(
                                "bg-[#1A1A1A] border rounded-xl p-4 flex items-start gap-4 transition-all hover:border-slate-600",
                                notif.read ? "border-slate-800 opacity-70" : "border-[#4A9EFF]/50 bg-[#4A9EFF]/5"
                            )}
                        >
                            <div className={cn("p-2 rounded-full", notif.read ? "bg-slate-800 text-slate-500" : "bg-[#4A9EFF]/20 text-[#4A9EFF]")}>
                                <Bell className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={cn("font-bold text-sm", notif.read ? "text-slate-400" : "text-white")}>{notif.title}</h3>
                                    <span className="text-xs text-slate-600">{formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}</span>
                                </div>
                                <p className="text-slate-400 text-sm mt-1">{notif.message}</p>
                            </div>
                            <div className="flex gap-2 flex-col sm:flex-row">
                                {!notif.read && (
                                    <Button variant="ghost" size="icon" onClick={() => handleMarkAsRead(notif.id)} className="h-8 w-8 text-slate-400 hover:text-green-500" title="Mark as read">
                                        <Check className="w-4 h-4" />
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(notif.id)} className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-900/20" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
