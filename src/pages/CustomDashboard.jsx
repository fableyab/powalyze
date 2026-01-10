import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, BarChart3, GripVertical, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

const CustomDashboard = ({ language }) => {
    const { toast } = useToast();
    const [widgets, setWidgets] = useState([
        { id: 1, type: 'kpi', title: 'Total Budget', size: 'small' },
        { id: 2, type: 'chart_bar', title: 'Monthly Spend', size: 'medium' },
        { id: 3, type: 'kpi', title: 'Active Risks', size: 'small' },
    ]);

    const addWidget = (type) => {
        const newWidget = {
            id: Date.now(),
            type,
            title: type === 'kpi' ? 'New KPI' : 'New Chart',
            size: type === 'kpi' ? 'small' : 'medium'
        };
        setWidgets([...widgets, newWidget]);
        toast({ title: "Widget Added", description: "Configure it in settings." });
    };

    const removeWidget = (id) => {
        setWidgets(widgets.filter(w => w.id !== id));
    };

    // Mock Data for Charts
    const data = [
      { name: 'Jan', val: 4000 }, { name: 'Feb', val: 3000 }, { name: 'Mar', val: 2000 },
      { name: 'Apr', val: 2780 }, { name: 'May', val: 1890 }, { name: 'Jun', val: 2390 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#D4AF37]">Custom Dashboard</h1>
                    <p className="text-slate-500">Drag, drop, and configure your executive view.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => addWidget('kpi')} className="border-slate-700 text-slate-300">
                        <Plus className="w-4 h-4 mr-2" /> KPI
                    </Button>
                    <Button variant="outline" onClick={() => addWidget('chart_bar')} className="border-slate-700 text-slate-300">
                        <BarChart3 className="w-4 h-4 mr-2" /> Chart
                    </Button>
                    <Button className="bg-[#D4AF37] hover:bg-[#B5952F] text-black">
                        <Save className="w-4 h-4 mr-2" /> Save Layout
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {widgets.map((widget) => (
                    <motion.div
                        layout
                        key={widget.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`bg-[#0F0F0F] rounded-xl border border-slate-800 p-4 shadow-sm relative group hover:border-[#D4AF37]/50 transition-colors ${
                            widget.size === 'medium' ? 'md:col-span-2 row-span-2' : 'col-span-1'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-4 cursor-move">
                            <div className="flex items-center gap-2 text-slate-400">
                                <GripVertical className="w-4 h-4 opacity-50" />
                                <span className="text-sm font-semibold uppercase">{widget.title}</span>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeWidget(widget.id)}
                                className="h-6 w-6 p-0 text-slate-600 hover:text-red-500"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <div className="h-full min-h-[100px]">
                            {widget.type === 'kpi' ? (
                                <div>
                                    <div className="text-3xl font-bold text-white mt-2">CHF 4.2M</div>
                                    <div className="text-xs text-emerald-500 mt-1">+12% vs last month</div>
                                </div>
                            ) : (
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                                            <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
                                            <Bar dataKey="val" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                
                {widgets.length === 0 && (
                     <div className="col-span-full h-64 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                        Add widgets to start building your dashboard
                     </div>
                )}
            </div>
        </div>
    );
};

export default CustomDashboard;