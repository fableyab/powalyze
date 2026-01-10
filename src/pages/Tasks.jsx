
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileSpreadsheet, Edit, Trash2, Share2, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateTaskModal = ({ isOpen, onClose, onCreated }) => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        status: 'To Do',
        priority: 'Medium',
        due_date: ''
    });

    const handleSubmit = async () => {
        if (!formData.name) return toast({ variant: "destructive", title: t('common.error'), description: "Name is required" });
        
        try {
            const { data, error } = await supabase.from('tasks').insert({
                ...formData,
                user_id: user.id,
                created_at: new Date()
            }).select().single();

            if (error) throw error;
            onCreated(data);
            onClose();
            toast({ title: t('common.success'), description: "Task created" });
        } catch (error) {
            toast({ variant: "destructive", title: t('common.error'), description: error.message });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>{t('tasks.newTask')}</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <Input placeholder={t('common.name')} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black border-slate-800" />
                    <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                        <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                            <SelectItem value="To Do">{t('tasks.status.todo')}</SelectItem>
                            <SelectItem value="In Progress">{t('tasks.status.inProgress')}</SelectItem>
                            <SelectItem value="Done">{t('tasks.status.done')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={formData.priority} onValueChange={v => setFormData({...formData, priority: v})}>
                        <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                            <SelectItem value="Low">{t('tasks.priority.low')}</SelectItem>
                            <SelectItem value="Medium">{t('tasks.priority.medium')}</SelectItem>
                            <SelectItem value="High">{t('tasks.priority.high')}</SelectItem>
                            <SelectItem value="Critical">{t('tasks.priority.critical')}</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="date" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="bg-black border-slate-800 text-white" />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">{t('common.cancel')}</Button>
                    <Button onClick={handleSubmit} className="bg-[#4A9EFF] text-white">{t('common.create')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const Tasks = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
      if (!error) setTasks(data || []);
      setLoading(false);
  };

  const handleDelete = async (id) => {
      if (!window.confirm(t('common.confirmDelete'))) return;
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (!error) {
          setTasks(tasks.filter(t => t.id !== id));
          toast({ title: t('common.success'), description: "Task deleted" });
      }
  };

  const filteredTasks = tasks.filter(task => task.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const getPriorityColor = (p) => {
      if (p === 'Critical') return 'text-red-500 bg-red-900/20 border-red-900';
      if (p === 'High') return 'text-orange-500 bg-orange-900/20 border-orange-900';
      if (p === 'Medium') return 'text-yellow-500 bg-yellow-900/20 border-yellow-900';
      return 'text-green-500 bg-green-900/20 border-green-900';
  };

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-[#4A9EFF]/20 text-[#4A9EFF] p-1 rounded-full text-xs">✓</span>
            {t('tasks.title')}
          </h1>
          <p className="text-slate-500">Manage and track your daily tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> {t('tasks.importExcel')}
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
            <Plus className="w-4 h-4 mr-2" /> {t('tasks.newTask')}
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-slate-800 rounded-lg text-white focus:border-[#4A9EFF] focus:outline-none"
          />
        </div>
        <Button variant="outline" className="border-slate-800 bg-[#1A1A1A] text-white">
          <Filter className="w-4 h-4 mr-2" /> {t('common.filter')}
        </Button>
      </div>

      <div className="bg-[#1A1A1A] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-black text-slate-300 font-medium">
                <tr>
                    <th className="p-4">{t('common.name')}</th>
                    <th className="p-4">{t('common.status')}</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">{t('tasks.dueDate')}</th>
                    <th className="p-4 text-right">{t('common.actions')}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {filteredTasks.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-600">No tasks found.</td></tr>
                ) : (
                    filteredTasks.map(task => (
                        <tr key={task.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-medium text-white">{task.name}</td>
                            <td className="p-4">
                                <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">{task.status}</span>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                            </td>
                            <td className="p-4 flex items-center gap-2">
                                {task.due_date ? <><Calendar className="w-3 h-3" /> {task.due_date}</> : '-'}
                            </td>
                            <td className="p-4 text-right">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleDelete(task.id)}><Trash2 className="w-4 h-4" /></Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>

      <CreateTaskModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreated={task => setTasks([task, ...tasks])} />
    </div>
  );
};

export default Tasks;
