
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PageActions from '@/components/PageActions';
import CreateWorkspaceModal from '@/components/CreateWorkspaceModal';
import { Search, Plus, Trash2, Users, Eye } from 'lucide-react';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Workspaces = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWorkspaces();
  }, [user]);

  const fetchWorkspaces = async () => {
    const { data, error } = await supabase.from('workspaces').select('*').order('created_at', { ascending: false });
    if (!error) setWorkspaces(data || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('common.confirmDelete'))) return;
    const { error } = await supabase.from('workspaces').delete().eq('id', id);
    if (!error) {
        setWorkspaces(workspaces.filter(w => w.id !== id));
        toast({ title: t('common.success'), description: "Workspace deleted" });
    }
  };

  const filteredWorkspaces = workspaces.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 space-y-6 flex-1">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('workspaces.title')}</h1>
                <p className="text-slate-400">Collaborate with your team</p>
            </div>
            <div className="flex items-center gap-2">
                <PageActions />
                <Button onClick={() => setIsModalOpen(true)} className="bg-[#4A9EFF] text-white"><Plus className="mr-2 h-4 w-4"/> {t('workspaces.new')}</Button>
            </div>
        </div>

        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
                placeholder={t('common.search')} 
                className="pl-10 bg-[#1A1A1A] border-slate-800 text-white" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspaces.map(ws => (
                <div key={ws.id} className="bg-[#1A1A1A] border border-slate-800 rounded-xl p-6 hover:border-[#4A9EFF] transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center text-[#4A9EFF]">
                            <Users className="h-6 w-6"/>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button size="icon" variant="ghost" onClick={() => navigate(`/app/workspaces/${ws.id}`)}><Eye className="h-4 w-4 text-slate-400 hover:text-white"/></Button>
                             <Button size="icon" variant="ghost" onClick={() => handleDelete(ws.id)}><Trash2 className="h-4 w-4 text-red-500 hover:text-red-400"/></Button>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{ws.name}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{ws.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 text-xs">{ws.visibility}</span>
                        <span className="text-xs text-slate-500">{(ws.members || []).length} Members</span>
                    </div>
                </div>
            ))}
        </div>

        <CreateWorkspaceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onWorkspaceCreated={(w) => setWorkspaces([w, ...workspaces])} />
      </div>
      <Footer />
    </div>
  );
};

export default Workspaces;
