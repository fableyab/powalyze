
import React from 'react';
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

// Simulated notification fetcher
const fetchNotifications = async () => {
    // In real app, this is a Supabase fetch
    return [
        { id: 1, type: 'critical', title: 'Budget Threshold Exceeded', message: 'Project "Cloud Migration" is 15% over budget.', time: '10m ago', read: false },
        { id: 2, type: 'warning', title: 'Risk Escalation', message: 'New High Risk detected in "CyberSec Initiative".', time: '1h ago', read: false },
        { id: 3, type: 'success', title: 'Export Ready', message: 'Your Q3 Financial Report is ready to download.', time: '2h ago', read: true },
    ];
};

const NotificationCenter = ({ isDarkMode }) => {
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications
    });

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-[#D4AF37] hover:bg-slate-800">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-[#0F0F0F]"></span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 bg-[#1A1A1A] border-slate-800 text-slate-200">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h4 className="font-semibold text-[#D4AF37]">Notifications</h4>
                    <span className="text-xs text-slate-500">{unreadCount} unread</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                    ) : (
                        notifications.map(n => (
                            <div key={n.id} className={cn("p-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer", !n.read && "bg-slate-800/10")}>
                                <div className="flex gap-3">
                                    <div className={cn("mt-1", 
                                        n.type === 'critical' ? "text-red-500" : 
                                        n.type === 'warning' ? "text-amber-500" : "text-emerald-500"
                                    )}>
                                        {n.type === 'critical' ? <AlertCircle className="w-4 h-4" /> : 
                                         n.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : 
                                         <CheckCircle className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">{n.title}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                                        <p className="text-[10px] text-slate-500 mt-2">{n.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 border-t border-slate-800 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs text-slate-400 hover:text-white">Mark all as read</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationCenter;
