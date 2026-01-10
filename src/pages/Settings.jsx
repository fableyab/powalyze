
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Trash2, Edit, Shield, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const EditMemberModal = ({ isOpen, onClose, member, onSave }) => {
    const [role, setRole] = useState(member?.role || 'Viewer');
    const [status, setStatus] = useState(member?.status || 'Active');

    const handleSave = () => {
        onSave({ ...member, role, status });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Edit Member</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <label className="text-sm text-slate-400">Name</label>
                        <Input value={member?.name} disabled className="bg-black border-slate-800 opacity-50" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Role</label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Analyst">Analyst</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
                    <Button onClick={handleSave} className="bg-[#4A9EFF] text-white">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const InviteMemberModal = ({ isOpen, onClose, onInvite }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Viewer');

    const handleInvite = () => {
        if(!email) return;
        onInvite({ id: Date.now(), name: name || email.split('@')[0], email, role, status: 'Pending', joined: new Date().toLocaleDateString() });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                         <label className="text-sm text-slate-400">Name</label>
                         <Input value={name} onChange={e => setName(e.target.value)} className="bg-black border-slate-800" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Email</label>
                        <Input value={email} onChange={e => setEmail(e.target.value)} className="bg-black border-slate-800" placeholder="jane@company.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Role</label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Analyst">Analyst</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
                    <Button onClick={handleInvite} className="bg-[#4A9EFF] text-white">Send Invite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const Settings = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [members, setMembers] = useState([
        { id: 1, name: 'Fabrice Fays', email: 'fabrice@powalyze.ch', role: 'Admin', status: 'Active', joined: '01/01/2024' },
        { id: 2, name: 'Elena Rossi', email: 'elena@powalyze.ch', role: 'Manager', status: 'Active', joined: '15/02/2024' },
    ]);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const handleUpdateMember = (updated) => {
        setMembers(members.map(m => m.id === updated.id ? updated : m));
        toast({title: "Success", description: "Member updated successfully"});
    };

    const handleRemoveMember = (id) => {
        if(window.confirm("Are you sure you want to remove this member?")) {
            setMembers(members.filter(m => m.id !== id));
            toast({title: "Removed", description: "Member removed from team"});
        }
    };

    return (
        <div className="space-y-6 p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-white">{t('settings.settings')}</h1>
            
            <Tabs defaultValue="team" className="w-full">
                <TabsList className="bg-[#1A1A1A] border border-slate-800 w-full justify-start h-12 p-1">
                    <TabsTrigger value="account" className="flex-1 max-w-[150px]">{t('settings.account')}</TabsTrigger>
                    <TabsTrigger value="team" className="flex-1 max-w-[150px]">{t('settings.team')}</TabsTrigger>
                    <TabsTrigger value="billing" className="flex-1 max-w-[150px]">{t('settings.billing')}</TabsTrigger>
                    <TabsTrigger value="notifications" className="flex-1 max-w-[150px]">{t('settings.notifications')}</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4 mt-6">
                    <div className="bg-[#1A1A1A] border border-slate-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white">Company Profile</h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Company Name</label>
                                <Input className="bg-black border-slate-800 text-white" defaultValue="Powalyze AG" />
                            </div>
                            <Button className="bg-[#4A9EFF] text-white w-fit">Save Changes</Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Team Members</h2>
                        <Button onClick={() => setIsInviteOpen(true)} className="bg-[#4A9EFF] text-white">
                            <Plus className="w-4 h-4 mr-2" /> Invite Member
                        </Button>
                    </div>

                    <div className="bg-[#1A1A1A] border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-black text-slate-300 font-medium">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {members.map(m => (
                                    <tr key={m.id} className="hover:bg-slate-800/50">
                                        <td className="p-4 font-medium text-white">{m.name}</td>
                                        <td className="p-4">{m.email}</td>
                                        <td className="p-4"><span className="flex items-center gap-1"><Shield className="w-3 h-3"/> {m.role}</span></td>
                                        <td className="p-4"><span className={`px-2 py-1 rounded text-xs ${m.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{m.status}</span></td>
                                        <td className="p-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                                    <DropdownMenuItem onClick={() => setEditingMember(m)}>Edit Role</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleRemoveMember(m.id)} className="text-red-500">Remove</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
                
                <TabsContent value="billing" className="mt-6">
                     <div className="bg-[#1A1A1A] border border-slate-800 rounded-xl p-12 text-center text-slate-500">
                        Billing portal integration coming soon.
                     </div>
                </TabsContent>
            </Tabs>

            <InviteMemberModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} onInvite={(m) => setMembers([...members, m])} />
            <EditMemberModal isOpen={!!editingMember} onClose={() => setEditingMember(null)} member={editingMember} onSave={handleUpdateMember} />
        </div>
    );
};

export default Settings;
