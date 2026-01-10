
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Search, Mail, Trash2, Shield, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, ValidationError } from '@formspree/react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const InviteMemberModal = ({ isOpen, onClose, onInvite }) => {
    // Formspree integration
    const [state, handleSubmit] = useForm("xeoyznlq");
    const { user } = useAuth();
    
    // Local state for immediate UI feedback before Formspree confirms
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Viewer');
    
    // Wrapper to handle Formspree submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if(!email) return;

        // Create a FormData object to pass to Formspree hook
        // We can't directly use the hook's handleSubmit with custom data easily without a form element
        // So we use a hidden form approach or just rely on the event if attached to form
        
        // However, useForm handleSubmit expects a form event.
        // We will call onInvite immediately for UI optimism, then let Formspree handle the email.
        onInvite({ email, role }); 
        
        // Trigger the actual form submission
        handleSubmit(e);
    };
    
    React.useEffect(() => {
        if (state.succeeded) {
            onClose();
            setEmail('');
            // Success toast is handled in parent
        }
    }, [state.succeeded, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
                
                <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                    {/* Hidden fields for Formspree context */}
                    <input type="hidden" name="inviter_email" value={user?.email || ''} />
                    <input type="hidden" name="subject" value={`Invitation to join Powalyze Team from ${user?.email}`} />
                    <input type="hidden" name="role" value={role} />

                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Email</label>
                        <Input 
                            name="email"
                            type="email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="bg-black border-slate-800" 
                            placeholder="colleague@company.com" 
                            required
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Role</label>
                        <Select value={role} onValueChange={setRole} name="role_select">
                            <SelectTrigger className="bg-black border-slate-800 text-white"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Analyst">Analyst</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose} className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">Cancel</Button>
                        <Button type="submit" disabled={state.submitting} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
                            {state.submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Sending...</> : 'Send Invitation'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const Team = () => {
    const { toast } = useToast();
    const [members, setMembers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    ]);
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const handleInvite = ({ email, role }) => {
        // Optimistic update
        setMembers([...members, { id: Date.now(), name: email.split('@')[0], email, role, status: 'Pending' }]);
        toast({ title: "Invitation Sent", description: `Invitation email sent to ${email}.` });
    };

    const handleRemove = (id) => {
        if(window.confirm("Remove this member?")) {
            setMembers(members.filter(m => m.id !== id));
            toast({ title: "Removed", description: "Team member removed" });
        }
    };

    return (
        <div className="space-y-6 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Team Management</h1>
                    <p className="text-slate-500">Manage users and permissions</p>
                </div>
                <Button onClick={() => setIsInviteOpen(true)} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
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
                        {members.map(member => (
                            <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="p-4 font-medium text-white">{member.name}</td>
                                <td className="p-4">{member.email}</td>
                                <td className="p-4 flex items-center gap-2">
                                    <Shield className="w-3 h-3" /> {member.role}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${member.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <Button variant="ghost" size="sm" onClick={() => handleRemove(member.id)} className="text-red-500 hover:bg-red-900/20 hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <InviteMemberModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} onInvite={handleInvite} />
        </div>
    );
};

export default Team;
