import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { adminService } from '@/lib/adminService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  Users,
  MoreVertical,
  Trash2,
  RefreshCw,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Mail
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Tableau de gestion des membres de l'équipe
 * Affiche tous les membres avec leurs statuts, rôles et actions
 */
const TeamTable = ({ refreshTrigger }) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Charger les membres
  const loadMembers = async () => {
    if (!profile?.tenant_id) return;

    try {
      setLoading(true);
      const data = await adminService.getTeamMembers(profile.tenant_id);
      setMembers(data);
    } catch (error) {
      console.error('Erreur chargement membres:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les membres",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [profile?.tenant_id, refreshTrigger]);

  // Supprimer un membre
  const handleDelete = async () => {
    if (!selectedMember) return;

    setActionLoading(true);
    try {
      await adminService.removeMember(selectedMember.id);
      toast({
        title: "✅ Membre supprimé",
        description: `${selectedMember.email} a été retiré de l'équipe`,
      });
      loadMembers();
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le membre",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
      setDeleteDialogOpen(false);
      setSelectedMember(null);
    }
  };

  // Renvoyer l'invitation
  const handleResendInvite = async (member) => {
    setActionLoading(true);
    try {
      await adminService.resendInvitation(member.email, profile.tenant_id);
      toast({
        title: "✅ Invitation renvoyée",
        description: `Un nouvel email a été envoyé à ${member.email}`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de renvoyer l'invitation",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Badge de statut
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      invited: {
        label: 'En attente',
        icon: Clock,
        className: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      },
      active: {
        label: 'Actif',
        icon: CheckCircle2,
        className: 'bg-green-500/10 text-green-400 border-green-500/20'
      },
      suspended: {
        label: 'Suspendu',
        icon: XCircle,
        className: 'bg-red-500/10 text-red-400 border-red-500/20'
      }
    };

    const config = statusConfig[status] || statusConfig.invited;
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  // Badge de rôle
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      admin: { label: 'Admin', className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      pmo: { label: 'PMO', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      manager: { label: 'Manager', className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
      contributor: { label: 'Contributeur', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
      viewer: { label: 'Lecteur', className: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
      auditor: { label: 'Auditeur', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }
    };

    const config = roleConfig[role] || roleConfig.viewer;

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card className="bg-[#1A1A1A] border-[#333333]">
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Chargement des membres...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-[#1A1A1A] border-[#333333]">
        <CardHeader className="border-b border-[#333333]">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5 text-[#4A9EFF]" />
              Membres de l'équipe
              <Badge variant="outline" className="ml-2 bg-[#4A9EFF]/10 text-[#4A9EFF] border-[#4A9EFF]/20">
                {members.length}
              </Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadMembers}
              className="text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#333333] hover:bg-transparent">
                  <TableHead className="text-slate-400">Nom</TableHead>
                  <TableHead className="text-slate-400">Email</TableHead>
                  <TableHead className="text-slate-400">Rôle</TableHead>
                  <TableHead className="text-slate-400">Statut</TableHead>
                  <TableHead className="text-slate-400">Invité le</TableHead>
                  <TableHead className="text-slate-400">Invité par</TableHead>
                  <TableHead className="text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      Aucun membre pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id} className="border-[#333333] hover:bg-[#0F0F0F]">
                      <TableCell className="font-medium text-white">
                        {member.name || 'Sans nom'}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {member.email}
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={member.role} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={member.status} />
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {member.invited_at ? formatDistanceToNow(new Date(member.invited_at), {
                          addSuffix: true,
                          locale: fr
                        }) : '-'}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {member.invited_by_name || 'Système'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#333333]">
                            <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[#333333]" />
                            
                            {member.status === 'invited' && (
                              <DropdownMenuItem
                                onClick={() => handleResendInvite(member)}
                                disabled={actionLoading}
                                className="text-slate-300 hover:bg-[#4A9EFF]/10 hover:text-white cursor-pointer"
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Renvoyer l'invitation
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedMember(member);
                                setDeleteDialogOpen(true);
                              }}
                              disabled={actionLoading}
                              className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#333333]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Supprimer ce membre ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Êtes-vous sûr de vouloir retirer{' '}
              <span className="font-semibold text-white">{selectedMember?.email}</span> de l'équipe ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#0F0F0F] border-[#333333] text-slate-300 hover:bg-[#1A1A1A]">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading ? 'Suppression...' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TeamTable;
