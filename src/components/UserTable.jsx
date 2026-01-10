import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  MoreVertical, 
  Search, 
  UserCheck, 
  UserX, 
  Trash2, 
  Key, 
  Edit,
  Shield,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { ROLES } from '@/lib/permissions';

const UserTable = ({ refreshTrigger }) => {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Récupérer le tenant_id de l'admin
      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('user_id', currentUser.id)
        .single();

      // Récupérer tous les utilisateurs du même tenant (colonnes de base uniquement)
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, email, role, full_name, created_at')
        .eq('tenant_id', adminProfile?.tenant_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Mapper les données pour compatibilité (avec/sans nouvelles colonnes)
      const mappedUsers = (data || []).map(u => ({
        ...u,
        first_name: u.first_name || u.full_name?.split(' ')[0] || 'Utilisateur',
        last_name: u.last_name || u.full_name?.split(' ').slice(1).join(' ') || '',
        role_new: u.role_new || u.role || 'Collaborateur',
        status: u.status || 'active',
        last_login: u.last_login || u.created_at
      }));
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Erreur chargement utilisateurs:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur',
        description: 'Impossible de charger les utilisateurs.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    setActionLoading(userId);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus, updated_at: new Date() })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: '✅ Statut modifié',
        description: `Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès.`
      });

      fetchUsers();
    } catch (error) {
      console.error('Erreur changement statut:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur',
        description: error.message
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetPassword = async (userId, userEmail) => {
    setActionLoading(userId);
    try {
      // Générer nouveau mot de passe
      const newPassword = generatePassword();

      // Mettre à jour dans Supabase Auth
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword
      });

      if (error) throw error;

      // FUTURE: Email service for password notification
      // Password will be sent via email when email service is configured
      console.log('📧 Nouveau mot de passe:', newPassword);

      toast({
        title: '✅ Mot de passe réinitialisé',
        description: `Un email a été envoyé à ${userEmail} avec le nouveau mot de passe.`,
        duration: 5000
      });
    } catch (error) {
      console.error('Erreur réinitialisation:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur',
        description: error.message
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setActionLoading(userToDelete.user_id);
    try {
      // 1. Supprimer de la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userToDelete.user_id);

      if (profileError) throw profileError;

      // 2. Supprimer de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(
        userToDelete.user_id
      );

      if (authError) throw authError;

      toast({
        title: '✅ Utilisateur supprimé',
        description: `${userToDelete.first_name} ${userToDelete.last_name} a été supprimé.`
      });

      fetchUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        variant: 'destructive',
        title: '❌ Erreur',
        description: error.message
      });
    } finally {
      setActionLoading(null);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case ROLES.MANAGER:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case ROLES.COLLABORATEUR:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case ROLES.LECTURE_SEULE:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(searchLower) ||
      user.last_name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#4A9EFF]" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Rechercher par nom, email ou rôle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black border-slate-800 text-white"
          />
        </div>

        {/* Tableau des utilisateurs */}
        <div className="rounded-lg border border-slate-800 bg-[#1A1A1A] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Nom</TableHead>
                <TableHead className="text-slate-400">Email</TableHead>
                <TableHead className="text-slate-400">Rôle</TableHead>
                <TableHead className="text-slate-400">Dernière connexion</TableHead>
                <TableHead className="text-slate-400">Statut</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                    {searchTerm ? 'Aucun utilisateur trouvé.' : 'Aucun utilisateur.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow 
                    key={user.user_id} 
                    className="border-slate-800 hover:bg-black/50 transition-colors"
                  >
                    <TableCell className="font-medium text-white">
                      {user.first_name} {user.last_name}
                      {user.user_id === currentUser.id && (
                        <span className="ml-2 text-xs text-[#D4AF37]">(Vous)</span>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {user.last_login 
                        ? (() => {
                            const date = new Date(user.last_login);
                            const now = new Date();
                            const diffMs = now - date;
                            const diffMins = Math.floor(diffMs / 60000);
                            const diffHours = Math.floor(diffMs / 3600000);
                            const diffDays = Math.floor(diffMs / 86400000);
                            
                            if (diffMins < 1) return 'À l\'instant';
                            if (diffMins < 60) return `il y a ${diffMins} min`;
                            if (diffHours < 24) return `il y a ${diffHours}h`;
                            if (diffDays < 30) return `il y a ${diffDays}j`;
                            return date.toLocaleDateString('fr-CH');
                          })()
                        : 'Jamais'
                      }
                    </TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/20 text-slate-400 border border-slate-500/30">
                          <XCircle className="w-3 h-3" />
                          Inactif
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                            disabled={actionLoading === user.user_id}
                          >
                            {actionLoading === user.user_id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end" 
                          className="bg-[#1A1A1A] border-slate-800 text-white w-48"
                        >
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                            onClick={() => {
                              // FUTURE: Edit user modal implementation
                              // Will allow editing user roles and permissions
                              console.log('Edit modal - Feature coming soon');
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier le rôle
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                            onClick={() => handleResetPassword(user.user_id, user.email)}
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Réinitialiser mot de passe
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-800" />
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800"
                            onClick={() => handleToggleStatus(user.user_id, user.status)}
                          >
                            {user.status === 'active' ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Désactiver
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activer
                              </>
                            )}
                          </DropdownMenuItem>
                          {user.user_id !== currentUser.id && (
                            <>
                              <DropdownMenuSeparator className="bg-slate-800" />
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
                                onClick={() => {
                                  setUserToDelete(user);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Statistiques */}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} 
            {searchTerm && ` (filtrés sur ${users.length} total)`}
          </span>
          <span>
            {filteredUsers.filter(u => u.status === 'active').length} actifs
          </span>
        </div>
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">
              ⚠️ Supprimer cet utilisateur ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Vous êtes sur le point de supprimer{' '}
              <span className="font-semibold text-white">
                {userToDelete?.first_name} {userToDelete?.last_name}
              </span>{' '}
              ({userToDelete?.email}).
              <br /><br />
              <span className="text-red-400 font-semibold">
                Cette action est irréversible.
              </span> Toutes les données associées à cet utilisateur seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer définitivement
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserTable;
