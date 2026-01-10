
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PageActions from '@/components/PageActions';
import CreatePortfolioModal from '@/components/CreatePortfolioModal';
import { Search, Plus, Trash2, Edit, Eye, Briefcase } from 'lucide-react';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, [user]);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('common.confirmDelete'))) return;
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (!error) {
        setItems(items.filter(i => i.id !== id));
        toast({ title: t('common.success'), description: "Item deleted" });
    }
  };

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 space-y-6 flex-1">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('portfolio.title')}</h1>
                <p className="text-slate-400">Showcase your success stories</p>
            </div>
            <div className="flex items-center gap-2">
                <PageActions />
                <Button onClick={() => setIsModalOpen(true)} className="bg-[#4A9EFF] text-white"><Plus className="mr-2 h-4 w-4"/> {t('portfolio.new')}</Button>
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
            {filteredItems.map(item => (
                <div key={item.id} className="bg-[#1A1A1A] border border-slate-800 rounded-xl overflow-hidden hover:border-[#4A9EFF] transition-all group">
                    <div className="h-40 bg-slate-900 relative">
                        {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full"><Briefcase className="h-10 w-10 text-slate-700"/></div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button size="icon" variant="secondary" className="h-8 w-8"><Edit className="h-4 w-4"/></Button>
                            <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-white text-lg">{item.name}</h3>
                        <p className="text-slate-400 text-sm mb-2">{item.client}</p>
                        <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-slate-600">{item.status}</span>
                            <Button size="sm" variant="ghost" className="text-[#4A9EFF] hover:text-white"><Eye className="mr-2 h-4 w-4"/> {t('common.view')}</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <CreatePortfolioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onItemCreated={(item) => setItems([item, ...items])} />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
