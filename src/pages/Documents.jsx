import React, { useState, useEffect } from 'react';
import { FileText, Search, TrendingUp, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import UploadBox from '@/components/documents/UploadBox';
import DocumentsList from '@/components/documents/DocumentsList';

const Documents = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { toast } = useToast();
    
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [themeFilter, setThemeFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        if (user) {
            fetchDocuments();
        }
    }, [user]);

    const fetchDocuments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (!error) {
            setDocs(data || []);
        } else {
            console.error('Fetch documents error:', error);
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description: 'Impossible de charger les documents.',
            });
        }
        setLoading(false);
    };

    const handleUploadComplete = (newDoc) => {
        setDocs([newDoc, ...docs]);
    };

    const handleDocumentDeleted = (docId) => {
        setDocs(docs.filter(d => d.id !== docId));
    };

    const filteredDocs = docs.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.tags?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || doc.file_type?.includes(filterType);
        const matchesTheme = !themeFilter || doc.theme === themeFilter;
        const matchesType = !typeFilter || doc.type === typeFilter;
        return matchesSearch && matchesFilter && matchesTheme && matchesType;
    });

    // Extract unique themes and types from documents
    const availableThemes = React.useMemo(() => 
        Array.from(new Set(docs.map(d => d.theme).filter(Boolean))).sort(),
        [docs]
    );

    const availableTypes = React.useMemo(() => 
        Array.from(new Set(docs.map(d => d.type).filter(Boolean))).sort(),
        [docs]
    );

    const stats = {
        total: docs.length,
        totalSize: docs.reduce((acc, d) => acc + (d.file_size || 0), 0),
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t('documents.title')}</h1>
                    <p className="text-slate-400 mt-1">
                        Stockage sécurisé multi-tenant avec Supabase Storage
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-[#4A9EFF]/20">
                            <FileText className="w-5 h-5 text-[#4A9EFF]" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Documents</p>
                            <p className="text-2xl font-bold text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-purple-500/20">
                            <HardDrive className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Espace utilisé</p>
                            <p className="text-2xl font-bold text-white">
                                {(stats.totalSize / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-green-500/20">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">Ce mois</p>
                            <p className="text-2xl font-bold text-white">+{docs.filter(d => {
                                const docDate = new Date(d.created_at);
                                const now = new Date();
                                return docDate.getMonth() === now.getMonth() && 
                                       docDate.getFullYear() === now.getFullYear();
                            }).length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <UploadBox onUploadComplete={handleUploadComplete} />

            <div className="flex gap-4 flex-wrap">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                        placeholder="Rechercher (nom ou tags)..." 
                        className="pl-10 bg-slate-900 border-slate-800 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    value={themeFilter}
                    onChange={(e) => setThemeFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9EFF]"
                >
                    <option value="">Tous les thèmes</option>
                    {availableThemes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                    ))}
                </select>
                <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4A9EFF]"
                >
                    <option value="">Tous les types</option>
                    {availableTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <div className="flex gap-2">
                    <Button
                        variant={filterType === 'all' ? 'default' : 'outline'}
                        className={filterType === 'all' ? 'bg-[#4A9EFF]' : 'border-slate-800 text-slate-300'}
                        onClick={() => setFilterType('all')}
                    >
                        Tous
                    </Button>
                    <Button
                        variant={filterType === 'pdf' ? 'default' : 'outline'}
                        className={filterType === 'pdf' ? 'bg-[#4A9EFF]' : 'border-slate-800 text-slate-300'}
                        onClick={() => setFilterType('pdf')}
                    >
                        PDF
                    </Button>
                    <Button
                        variant={filterType === 'image' ? 'default' : 'outline'}
                        className={filterType === 'image' ? 'bg-[#4A9EFF]' : 'border-slate-800 text-slate-300'}
                        onClick={() => setFilterType('image')}
                    >
                        Images
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <p className="text-slate-400">Chargement des documents...</p>
                </div>
            ) : (
                <DocumentsList 
                    documents={filteredDocs} 
                    onDocumentDeleted={handleDocumentDeleted}
                />
            )}
        </div>
    );
};

export default Documents;
