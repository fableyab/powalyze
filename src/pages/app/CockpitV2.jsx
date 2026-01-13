import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import CockpitLayout from '@/components/layout/CockpitLayout';
import BoardSelector from '@/components/cockpit/BoardSelector';
import ViewSelector from '@/components/cockpit/ViewSelector';
import BoardTableView from '@/components/cockpit/BoardTableView';
import BoardKanbanView from '@/components/cockpit/BoardKanbanView';
import CreateItemModal from '@/components/cockpit/CreateItemModal';
import EmptyState from '@/components/EmptyState';
import { useCockpitItems } from '@/hooks/useCockpitItems';
import { getBoardConfig, getBoardViews, getDefaultView, BOARDS_CONFIG } from '@/types/cockpit';
import { Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

/**
 * 🎯 NOUVEAU COCKPIT PMO - Type monday.com
 * 
 * Architecture:
 * - Boards (Initiatives, Risques, Décisions, Capacité)
 * - Vues (Table, Kanban, Timeline, Executive)
 * - Mode démo/prod transparent
 * - Actions toujours visibles
 */
export default function CockpitPageV2() {
  const { orgId } = useAuth();
  const { toast } = useToast();
  
  // État navigation
  const [activeBoard, setActiveBoard] = useState('initiatives');
  const [activeView, setActiveView] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Chargement données (avec mode démo/prod auto)
  const { items, loading, isDemoMode, createItem, updateItem, deleteItem } = useCockpitItems(orgId, activeBoard);

  // Config du board actif
  const boardConfig = useMemo(() => getBoardConfig(activeBoard), [activeBoard]);
  const availableViews = useMemo(() => getBoardViews(activeBoard), [activeBoard]);
  
  // Initialiser vue par défaut quand board change
  useEffect(() => {
    const defaultView = getDefaultView(activeBoard);
    setActiveView(defaultView?.id || null);
  }, [activeBoard]);

  // Vue config active
  const viewConfig = useMemo(
    () => availableViews.find(v => v.id === activeView),
    [availableViews, activeView]
  );

  // Compter items par board (pour badges)
  const itemCounts = useMemo(() => {
    // TODO: Charger counts de tous les boards en parallèle
    return {
      [activeBoard]: items.length
    };
  }, [activeBoard, items]);

  const handleItemClick = (item) => {
    // TODO: Ouvrir panneau détails
  };

  const handleItemCreate = async (itemData) => {
    try {
      await createItem(itemData);
      toast({
        title: "✅ Item créé",
        description: `${itemData?.title || 'Item'} a été ajouté avec succès`
      });
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Erreur création:', err);
      toast({
        title: "❌ Erreur",
        description: err.message || "Impossible de créer l'item",
        variant: "destructive"
      });
      throw err; // Repropager pour le modal
    }
  };

  const handleItemUpdate = async (itemId, updates) => {
    try {
      await updateItem(itemId, updates);
      toast({
        title: "✅ Mis à jour",
        description: "Modifications enregistrées"
      });
    } catch (err) {
      console.error('Erreur mise à jour:', err);
      toast({
        title: "❌ Erreur",
        description: "Impossible de mettre à jour",
        variant: "destructive"
      });
    }
  };

  const handleItemDelete = async (itemId) => {
    if (!confirm('Supprimer cet item ?')) return;
    
    try {
      await deleteItem(itemId);
      toast({
        title: "🗑️ Supprimé",
        description: "Item supprimé avec succès"
      });
    } catch (err) {
      console.error('Erreur suppression:', err);
      toast({
        title: "❌ Erreur",
        description: "Impossible de supprimer",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <CockpitLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-24 h-24 border-4 border-[#D4AF37]/20 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <Rocket className="absolute inset-0 m-auto w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>
            <div className="text-white/80 font-light">Chargement du cockpit...</div>
          </div>
        </div>
      </CockpitLayout>
    );
  }

  if (!boardConfig || !viewConfig) {
    return (
      <CockpitLayout>
        <EmptyState
          icon={Rocket}
          title="Configuration manquante"
          description="Le board ou la vue demandée n'existe pas"
          action={{ label: 'Retour', onClick: () => setActiveBoard('initiatives') }}
        />
      </CockpitLayout>
    );
  }

  return (
    <CockpitLayout>
      <div className="flex flex-col h-full">
        {/* Mode démo banner */}
        {isDemoMode && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2 text-center">
            <span className="text-amber-400 text-sm font-medium">
              📊 Mode Démo - Données fictives affichées
            </span>
          </div>
        )}

        {/* Board selector (tabs horizontal) */}
        <BoardSelector
          activeBoard={activeBoard}
          onBoardChange={setActiveBoard}
          itemCounts={itemCounts}
        />

        {/* View selector + actions bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">{boardConfig.name}</h2>
            <span className="text-sm text-white/60">{boardConfig.description}</span>
          </div>
          
          <ViewSelector
            views={availableViews}
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>

        {/* Vue principale (Table, Kanban, Timeline, Executive) */}
        <div className="flex-1 min-h-0">
          {viewConfig.type === 'table' && (
            <BoardTableView
              board={boardConfig}
              items={items}
              onItemClick={handleItemClick}
              onItemCreate={() => setIsCreateModalOpen(true)}
              onItemUpdate={handleItemUpdate}
              onItemDelete={handleItemDelete}
            />
          )}

          {viewConfig.type === 'kanban' && (
            <BoardKanbanView
              board={boardConfig}
              items={items}
              viewConfig={viewConfig.config}
              onItemClick={handleItemClick}
              onItemCreate={() => setIsCreateModalOpen(true)}
              onItemUpdate={handleItemUpdate}
            />
          )}

          {viewConfig.type === 'timeline' && (
            <div className="flex items-center justify-center h-full text-white/60">
              Vue Timeline - En développement
            </div>
          )}

          {viewConfig.type === 'executive' && (
            <div className="flex items-center justify-center h-full text-white/60">
              Vue Executive - En développement
            </div>
          )}
        </div>
      </div>

      {/* Modal création item */}
      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleItemCreate}
        itemType={boardConfig.item_type}
      />
    </CockpitLayout>
  );
}
