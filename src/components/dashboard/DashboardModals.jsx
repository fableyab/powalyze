
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export const SaveConfigurationModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [saving, setSaving] = React.useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast({ title: "Success", description: "Dashboard configuration saved." });
            onClose();
        }, 1000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Save Configuration</DialogTitle></DialogHeader>
                <div className="py-4">
                    <p className="text-slate-400 text-sm mb-4">Save current layout, filters, and widget settings as your default view?</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
                    <Button onClick={handleSave} className="bg-[#4A9EFF] text-white">
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ExportStrategicModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();
    const [format, setFormat] = React.useState('pdf');

    const handleExport = () => {
        toast({ title: "Exporting...", description: `Generating ${format.toUpperCase()} report.` });
        setTimeout(() => {
            toast({ title: "Success", description: "Report downloaded." });
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Export Strategic Overview</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Format</label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="pdf">PDF Document</SelectItem>
                                <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                                <SelectItem value="xlsx">Excel Data</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Include</label>
                        <div className="flex items-center gap-2"><Checkbox defaultChecked id="kpi" /><label htmlFor="kpi">KPIs</label></div>
                        <div className="flex items-center gap-2"><Checkbox defaultChecked id="trends" /><label htmlFor="trends">Trends</label></div>
                        <div className="flex items-center gap-2"><Checkbox defaultChecked id="recs" /><label htmlFor="recs">Recommendations</label></div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
                    <Button onClick={handleExport} className="bg-[#4A9EFF] text-white">Export</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ShareStrategicModal = ({ isOpen, onClose }) => {
    const { toast } = useToast();

    const handleShare = () => {
        toast({ title: "Shared", description: "Strategic overview shared with selected members." });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
                <DialogHeader><DialogTitle>Share Strategic Overview</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <label className="text-sm text-slate-400">Recipients</label>
                        <Input placeholder="Enter email addresses..." className="bg-black border-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Permissions</label>
                        <Select defaultValue="view">
                            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                <SelectItem value="view">View Only</SelectItem>
                                <SelectItem value="edit">Can Edit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Message (Optional)</label>
                        <Textarea placeholder="Add a note..." className="bg-black border-slate-800" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
                    <Button onClick={handleShare} className="bg-[#4A9EFF] text-white">Share</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
