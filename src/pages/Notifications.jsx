import React, { useState, useEffect, useCallback, useTransition } from 'react';
import CockpitLayout from '@/components/layout/CockpitLayout';
import { Bell, Check, Trash2, CheckCheck, Loader2, Mail, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock data for demo
    const mockNotifications = [
        {
            id: 1,
            type: 'alert',
            title: 'Critical Risk Detected',
            message: 'Budget deviation of 18% detected in Project Alpha',
            read: false,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            type: 'info',
            title: 'Portfolio Report Ready',
            message: 'Your Q1 2026 portfolio analysis is ready for review',
            read: false,
            created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            type: 'success',
            title: 'Decision Approved',
            message: 'Your budget reallocation request has been approved',
            read: true,
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            type: 'info',
            title: 'Team Member Invited',
            message: 'Sarah Johnson has been added to your workspace',
            read: true,
            created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
        }
    ];

    useEffect(() => {
        setNotifications(mockNotifications);
    }, []);

    const handleDelete = async (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        toast({ title: "Deleted", description: "Notification removed." });
    };

    const [isPending, startTransition] = useTransition();

    const handleDeleteAll = useCallback(async () => {
        if (notifications.length === 0) return;
        if (!window.confirm("Are you sure you want to delete ALL notifications?")) return;
        
        // Use transition to defer non-urgent UI update
        startTransition(() => {
            setNotifications([]);
        });
        
        // Use requestIdleCallback for toast to avoid blocking
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                toast({ title: "Deleted", description: "All notifications cleared." });
            });
        } else {
            setTimeout(() => {
                toast({ title: "Deleted", description: "All notifications cleared." });
            }, 0);
        }
    }, [notifications.length, toast]);

    const handleMarkAsRead = async (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleMarkAllRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        toast({ title: "Updated", description: "All marked as read." });
    };

    const getNotificationIcon = (type) => {
        switch(type) {
            case 'alert': return <AlertCircle className="w-5 h-5 text-rose-400" />;
            case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'info': return <Info className="w-5 h-5 text-blue-400" />;
            default: return <Bell className="w-5 h-5 text-[#D4AF37]" />;
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    if (loading) return <CockpitLayout><div className="p-8 flex justify-center"><Loader2 className="animate-spin text-[#D4AF37]" /></div></CockpitLayout>;

    return (
        <CockpitLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-extralight text-white tracking-tight mb-2">Notifications</h1>
                    <p className="text-xs text-white/40 tracking-[0.1em] uppercase">
                        {unreadCount > 0 ? `${unreadCount} Unread` : 'All Caught Up'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-xs text-white/60 hover:text-white hover:border-white/10 transition-all duration-500 disabled:opacity-30 flex items-center gap-2"
                    >
                        <CheckCheck className="w-3 h-3" />
                        Mark All Read
                    </button>
                    <button 
                        onClick={handleDeleteAll}
                        disabled={notifications.length === 0 || isPending}
                        className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-xs text-rose-400 hover:text-rose-300 hover:border-rose-500/20 transition-all duration-500 disabled:opacity-30 flex items-center gap-2"
                    >
                        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        {isPending ? 'Deleting...' : 'Delete All'}
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {notifications.length === 0 ? (
                    <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-16 text-center">
                        <Bell className="w-16 h-16 text-white/20 mx-auto mb-6" />
                        <h3 className="text-lg font-light text-white mb-2">No Notifications</h3>
                        <p className="text-sm text-white/40">You're all caught up!</p>
                    </div>
                ) : (
                    notifications.map(notif => (
                        <div 
                            key={notif.id} 
                            className={cn(
                                "bg-black/40 backdrop-blur-xl border rounded-[2px] p-6 flex items-start gap-4 transition-all duration-500",
                                notif.read 
                                    ? "border-white/5 hover:border-white/10 opacity-60" 
                                    : "border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:border-[#D4AF37]/50"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 border rounded-[2px] flex items-center justify-center flex-shrink-0",
                                notif.read ? "border-white/10" : "border-[#D4AF37]/30"
                            )}>
                                {getNotificationIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h3 className={cn(
                                        "text-sm font-light",
                                        notif.read ? "text-white/60" : "text-white"
                                    )}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs text-white/30 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm text-white/40 leading-relaxed">{notif.message}</p>
                            </div>
                            <div className="flex gap-2">
                                {!notif.read && (
                                    <button 
                                        onClick={() => handleMarkAsRead(notif.id)}
                                        className="w-8 h-8 border border-white/10 rounded-[2px] flex items-center justify-center text-white/40 hover:text-green-400 hover:border-green-400/30 transition-all duration-500"
                                        title="Mark as read"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                                <button 
                                    onClick={() => handleDelete(notif.id)}
                                    className="w-8 h-8 border border-white/10 rounded-[2px] flex items-center justify-center text-white/40 hover:text-rose-400 hover:border-rose-400/30 transition-all duration-500"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </CockpitLayout>
    );
};

export default Notifications;
